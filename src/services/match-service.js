import {MatchPersistence} from "@/persistence/match-persistence";

export class MatchService {
    static async createRankingMatch(ranking_id, team_ids, team_limit, title, description) {
        const match = await MatchPersistence.createMatch(ranking_id, team_limit, title, description)
        const matchId = match.match_id;
        const joinPromises = []
        team_ids.forEach(team_id => joinPromises.push(MatchPersistence.joinMatch(matchId, team_id)));
        await Promise.all(joinPromises);
    }

    static async getMatchList(ranking_id, page, pageSize, ended){
        return MatchService.getMatchList(ranking_id, page, pageSize, ended);
    }

    static async getMatch(match_id) {
        return MatchService.getMatch(match_id);
    }
}