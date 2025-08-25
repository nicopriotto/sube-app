import {TeamPersistence} from "@/persistence/team-persistence";


export class TeamService {
    static async createTeam(ranking_id, team_name, size, members) {
        const team = await TeamPersistence.createTeam(ranking_id, team_name, size);
        const teamId = team.team_id;
        const participantsPromises = []
        members.forEach(participant => participantsPromises.push(TeamPersistence.addTeamMember(teamId, participant)))
        await Promise.all(members)
        return teamId
    }

    static async getRankingTeamsWithMembers(ranking_id) {
        return TeamPersistence.getRankingTeamsWithMembers(ranking_id);
    }

    static async getRankingTeams(ranking_id) {
        return TeamPersistence.getRankingTeams(ranking_id);
    }
}