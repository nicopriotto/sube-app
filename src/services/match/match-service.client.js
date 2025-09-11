import * as MatchPersistenceClient from "@/persistence/match/match-persistence.client";
import * as VotingPersistenceClient from "@/persistence/voting/voting-persistence.client";

export async function getMatchList(ranking_id, page, pageSize, ended){
    return (await MatchPersistenceClient.getMatchList(ranking_id, page, pageSize, ended)).map(match => {
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

export async function getMatch(match_id) {
    return MatchPersistenceClient.getMatch(match_id);
}

export async function getMatchParticipants(match_id) {
    return MatchPersistenceClient.getMatchParticipants(match_id);
}

export async function getMatchVotes(match_id) {
    return (await VotingPersistenceClient.getMatchVotes(match_id)).map(result => {
        return {
            points: result.points,
            username: result.ranking_user_view?.ranking_user_name,
            id: result.ranking_user_view?.ranking_user_id,
        }
    });
}
