import * as TeamPersistenceClient from "@/persistence/team/team-persistence.client";

export async function getRankingTeamsWithMembers(ranking_id) {
    return TeamPersistenceClient.getRankingTeamsWithMembers(ranking_id);
}

export async function getRankingTeams(ranking_id) {
    return TeamPersistenceClient.getRankingTeams(ranking_id);
}

export async function getRankingTeamCount(ranking_id) {
    return TeamPersistenceClient.getRankingTeamCount(ranking_id);
}
