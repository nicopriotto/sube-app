import {MatchPersistence} from "@/persistence/match/match-persistence";
import {TeamService} from "@/services/team-service";
import {RankingPersistenceClient} from "@/persistence/ranking/ranking-persistence.client";
import {VotingPersistence} from "@/persistence/voting-persistence";

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
        const ranking = await RankingPersistenceClient.getRankingConfigurationById(ranking_id);
        if (!ranking) {
            throw new Error('ranking not found');
        } else if (ranking.type === RankingPersistenceClient.RankingTypes.VOTE) {
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
        
    }

    static async getMatchList(ranking_id, page, pageSize, ended){
        return (await MatchPersistence.getMatchList(ranking_id, page, pageSize, ended)).map(match => {
            return {
                id: match.match_id,
                users: match.match_result.map(result => result.team?.team_name),
                title: match.title,
                description: match.description,
                teamLimit: match.team_limit,
                ended: match.ended,
            }
        });
    }

    static async getMatch(match_id) {
        return MatchPersistence.getMatch(match_id);
    }

    static async getMatchParticipants(match_id) {
        return MatchPersistence.getMatchParticipants(match_id);
    }

    static async getMatchVotes(match_id) {
        return (await VotingPersistence.getMatchVotes(match_id)).map(result => {
            return {
                points: result.points,
                username: result.ranking_user?.ranking_user_name,
                id: result.ranking_user?.ranking_user_id,
            }
        });
    }
}
