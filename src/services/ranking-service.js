import {RankingPersistence} from "@/persistence/ranking-persistence";
import {MatchPersistence} from "@/persistence/match-persistence";
import {TeamPersistence} from "@/persistence/team-persistence";
import {VotingPersistence} from "@/persistence/voting-persistence";
import {TeamService} from "@/services/team-service";

export class RankingService {
    static getRankingTypes() {
        return RankingPersistence.RankingTypes;
    }
    static async getRankingConfigurationById(ranking_id) {
        return RankingPersistence.getRankingConfigurationById(ranking_id);
    }
    static async getRankingConfiguration(ranking_name, ranking_password) {
        return RankingPersistence.getRankingConfiguration(ranking_name, ranking_password);
    }
    static async createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt, rankingDescription) {
        return RankingPersistence.createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt, rankingDescription);
    }

    static async createRankingUser(ranking_id, ranking_user_name) {
        const [user, ranking] = await Promise.all([RankingPersistence.createRankingUser(ranking_id, ranking_user_name), RankingPersistence.getRankingConfigurationById(ranking_id)]);
        if (ranking && ranking.type === RankingPersistence.RankingTypes.VOTE) {
            await TeamService.createTeam(ranking_id, ranking_user_name, 1, user.ranking_user_id)
        }
        return user;
    }

    static async getRankingsScore(ranking_id, page, pageSize) {
        return (await RankingPersistence.getRankingsScore(ranking_id, page, pageSize)).map(entry => {
                return {
                    id: entry.ranking_user?.ranking_user_id,
                    name: entry.ranking_user?.ranking_user_name,
                    avatar: "/avatar.png",
                    points: entry.score,
                }
        });
    }

    static async getRankingUsers(ranking_id) {
        return RankingPersistence.getRankingUsers(ranking_id);
    }

    static async vote(match_id, ranking_user_id, points) {
        const match = await MatchPersistence.getMatch(match_id)
        const [rankingConfiguration, rankingUsers, votes, participants] = await Promise.all([
            RankingPersistence.getRankingConfigurationById(match.ranking_id),
            RankingPersistence.getRankingUsers(match.ranking_id),
            VotingPersistence.getMatchVotes(match_id),
            MatchPersistence.getMatchParticipants(match_id)
        ]);
        if (rankingConfiguration.type !== RankingPersistence.RankingTypes.VOTE){
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
            const currentScore = await RankingPersistence.getRankingScore(match.ranking_id, involvedUserId).catch(() => 0);
            const nextScore = (currentScore || 0) + median;
            await Promise.all([
                VotingPersistence.voteMatchResult(match_id, ranking_user_id, points),
                RankingPersistence.updateRankingScore(match.ranking_id, involvedUserId, nextScore),
                MatchPersistence.setEnded(match_id, true)
            ])
        } else {
            await VotingPersistence.voteMatchResult(match_id, ranking_user_id, points);
        }
    }
}
