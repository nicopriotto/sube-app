import {supabaseClient} from "../../../supabase.client";

export async function getRankingTeamsWithMembers(ranking_id) {
    const { data, error } = await supabaseClient
        .from('team')
        .select('team_id, team_name, size, ranking_user_team(ranking_user_view(*))')
        .eq('ranking_id', ranking_id);
    return data;
}
export async function getRankingTeams(ranking_id) {
    const { data, error } = await supabaseClient
        .from('team')
        .select('*')
        .eq('ranking_id', ranking_id);
    return data;
}
export async function getRankingTeamCount(ranking_id) {
    const { count, error } = await supabaseClient
        .from('team')
        .select('*', {count: 'exact', head: true})
        .eq('ranking_id', ranking_id);
    return count;
}
export async function getTeamMembers(team_id) {
    const { data, error } = await supabaseClient
        .from('ranking_user_team')
        .select("ranking_user_team(ranking_user_view (*))")
        .eq('team_id', team_id);
    return data;
}
