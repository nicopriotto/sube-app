"use server"
import * as TeamPersistenceServer from "@/persistence/team/team-persistence.server";

export async function createTeam(ranking_id, team_name, size, members) {
    const team = await TeamPersistenceServer.createTeam(ranking_id, team_name, size);
    const teamId = team.team_id;
    const participantsPromises = []
    members.forEach(participant => participantsPromises.push(TeamPersistenceServer.addTeamMember(teamId, participant)))
    await Promise.all(members)
    return teamId
}