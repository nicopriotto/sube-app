import {supabaseClient} from "../../../supabase.client";

export async function getRankingConfigurationById(id) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .select()
        .eq('ranking_id', id)
        .single();
    return data;
}
export async function getRankingConfiguration(ranking_name, ranking_password) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .select()
        .eq('ranking_name', ranking_name)
        .eq('ranking_password', ranking_password)
        .single();
    return data;
}
export async function getRankingsScore(ranking_id, page, pageSize) {
    const { data, error } = await supabaseClient
        .from('ranking_user_view')
        .select()
        .range(pageSize * (page - 1), page * pageSize + 1)
        .eq('ranking_id', ranking_id);
    return data;
}
export async function getRankingUsers(ranking_id) {
    const { data, error } = await supabaseClient
        .from('ranking_user_view')
        .select()
        .eq('ranking_id', ranking_id)
    return data;
}
export async function getRankingScore(ranking_id, ranking_user_id) {
    const { data, error } = await supabaseClient
        .from('ranking_user')
        .select('score')
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_id', ranking_user_id)
        .single();
    return data.score;
}

