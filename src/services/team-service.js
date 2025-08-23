import {TeamPersistence} from "@/persistence/team-persistence";


export class TeamService {
    static async createTeam(ranking_id, team_name, size, participants) {
        const team = await TeamPersistence.createTeam(ranking_id, team_name, size);
        const teamId = team.team_id;
        const participantsPromises = []
        participants.forEach(participant => participantsPromises.push(TeamPersistence.createTeamMember(teamId, participant)))
        await Promise.all(participants)
    }

    static async getRankingTeams(ranking_id) {
        return TeamPersistence.getRankingTeams(ranking_id);
    }
}