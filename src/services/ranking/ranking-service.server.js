"use server"
import {MatchPersistence} from "@/persistence/match/match-persistence";
import {VotingPersistence} from "@/persistence/voting-persistence";
import {TeamService} from "@/services/team-service";
import * as RankingPersistenceServer from "@/persistence/ranking/ranking_persistance.server";
import {RankingTypes} from "@/persistence/ranking/types";
import * as RankingPersistenceClient from "@/persistence/ranking/ranking-persistence.client";

export async function createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt, rankingDescription) {
    return RankingPersistenceServer.createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt, rankingDescription);
}

export async function createRankingUser(ranking_id, ranking_user_name) {
    const [user, ranking] = await Promise.all([RankingPersistenceServer.createRankingUser(ranking_id, ranking_user_name), RankingPersistenceClient.getRankingConfigurationById(ranking_id)]);
    if (ranking && ranking.type === RankingTypes.VOTE) {
        await TeamService.createTeam(ranking_id, ranking_user_name, 1, user.ranking_user_id)
    }
    return user;
}

export async function vote(match_id, ranking_user_id, points) {
    const match = await MatchPersistence.getMatch(match_id)
    const [rankingConfiguration, rankingUsers, votes, participants] = await Promise.all([
        RankingPersistenceClient.getRankingConfigurationById(match.ranking_id),
        RankingPersistenceClient.getRankingUsers(match.ranking_id),
        VotingPersistence.getMatchVotes(match_id),
        MatchPersistence.getMatchParticipants(match_id)
    ]);
    if (rankingConfiguration.type !== RankingTypes.VOTE){
        return;
    }
    if (points < 0 || points > 10) {
        return;
    }
    if ((votes || []).some(v => Number(v.ranking_user_id) === Number(ranking_user_id))) {
        return;
    }
    const firstParticipant = participants?.[0]?.team;
    const involvedUserId = firstParticipant?.ranking_user_team?.[0]?.ranking_user?.ranking_user_id;
    if (involvedUserId && Number(ranking_user_id) === Number(involvedUserId)) {
        return;
    }
    const eligibleCount = Math.max(0, (rankingUsers?.length || 0) - (involvedUserId ? 1 : 0));
    const voteCount = votes.length;
    if (voteCount >= eligibleCount) {
        return;
    }
    if (voteCount === eligibleCount - 1) {
        const allPoints = votes.map(v => v.points).concat([points]).sort((a,b)=>a-b);
        const mid = Math.floor(allPoints.length / 2);
        const median = (allPoints.length % 2 === 0)
            ? Math.round((allPoints[mid - 1] + allPoints[mid]) / 2)
            : allPoints[mid];
        const currentScore = await RankingPersistenceClient.getRankingScore(match.ranking_id, involvedUserId).catch(() => 0);
        const nextScore = (currentScore || 0) + median;
        await Promise.all([
            VotingPersistence.voteMatchResult(match_id, ranking_user_id, points),
            RankingPersistenceServer.updateRankingScore(match.ranking_id, involvedUserId, nextScore),
            MatchPersistence.setEnded(match_id, true)
        ])
    } else {
        await VotingPersistence.voteMatchResult(match_id, ranking_user_id, points);
    }
}
