import {MatchPersistence} from "@/persistence/match-persistence";
import {TeamService} from "@/services/team-service";
import {RankingPersistence} from "@/persistence/ranking-persistence";

export class MatchService {
    static async createRankingMatch(ranking_id, team_ids, team_limit, title, description) {
        const match = await MatchPersistence.createMatch(ranking_id, team_limit, title, description)
        const matchId = match.match_id;
        const joinPromises = []
        team_ids.forEach(team_id => joinPromises.push(MatchPersistence.joinMatch(matchId, team_id)));
        await Promise.all(joinPromises);
        return matchId;
    }

    static async createPastRankingMatch(ranking_id, teamsAndResults, team_limit, title, description) {
        const ranking = await RankingPersistence.getRankingConfigurationById(ranking_id);
        if (!ranking) {
            throw new Error('ranking not found');
        } else if (ranking.type === RankingPersistence.RankingTypes.VOTE) {
            throw new Error('operation not allowed for vote type rankings');
        }
        const teamPromises = []
        teamsAndResults.forEach(team => teamPromises.push(TeamService.createTeam(ranking_id, team.name, team.size, team.members)))
        const teamIds = await Promise.all(teamPromises);
        const matchId = await this.createRankingMatch(ranking_id, teamIds, team_limit, title, description);
        const resultPromises = []
        teamIds.forEach((teamId, index) =>
            MatchPersistence.setMatchResult(matchId,
                teamId, teamsAndResults[index].position,
                teamsAndResults[index].points)
        )
        await Promise.all(resultPromises)
        //@todo: updatear el ranking
    }

    static async getMatchList(ranking_id, page, pageSize, ended){
        return MatchService.getMatchList(ranking_id, page, pageSize, ended);
    }

    static async getMatch(match_id) {
        return MatchService.getMatch(match_id);
    }
}