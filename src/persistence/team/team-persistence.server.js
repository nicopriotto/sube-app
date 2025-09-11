"use server"
import {supabaseServer} from "../../../supabase.server";

export async function createTeam(ranking_id, team_name, size) {
    const { data, error } = await supabaseServer
        .from('team')
        .insert({
            ranking_id,
            team_name,
            size
        })
        .select();
    return data[0];
}

export async function addTeamMember(team_id, ranking_user_id) {
    console.log(team_id, ranking_user_id);
    const { error } = await supabaseServer
        .from('ranking_user_team')
        .insert({team_id, ranking_user_id});
    console.log(error)
}