"use server"
import * as MatchPersistenceServer from "@/persistence/match/match-persistence.server";
import * as TeamServiceServer from "@/services/team/team-service.server";
import * as RankingPersistenceClient from "@/persistence/ranking/ranking-persistence.client";
import {RankingTypes} from "@/persistence/ranking/types";

export async function createRankingMatch(ranking_id, team_ids, team_limit, title, description) {
    const match = await MatchPersistenceServer.createMatch(ranking_id, team_limit, title, description)
    const matchId = match.match_id;
    const joinPromises = []
    team_ids.forEach(team_id => joinPromises.push(MatchPersistenceServer.joinMatch(matchId, team_id)));
    await Promise.all(joinPromises);
    return matchId;
}

export async function createPastRankingMatch(ranking_id, teamsAndResults, team_limit, title, description) {
    const ranking = await RankingPersistenceClient.getRankingConfigurationById(ranking_id);
    if (!ranking) {
        throw new Error('ranking not found');
    } else if (ranking.type === RankingTypes.VOTE) {
        throw new Error('operation not allowed for vote type rankings');
    }
    const teamPromises = []
    teamsAndResults.forEach(team => teamPromises.push(TeamServiceServer.createTeam(ranking_id, team.name, team.size, team.members)))
    const teamIds = await Promise.all(teamPromises);
    const matchId = await createRankingMatch(ranking_id, teamIds, team_limit, title, description);
    const resultPromises = []
    teamIds.forEach((teamId, index) =>
        MatchPersistenceServer.setMatchResult(matchId,
            teamId, teamsAndResults[index].position,
            teamsAndResults[index].points)
    )
    await Promise.all(resultPromises)
    
}