import {supabaseClient} from "../../supabase";

export async function createRankingConfiguration(ranking_name, ranking_password) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .insert({
            ranking_name,
            ranking_password
        });
    return data;
}

export async function getRankingConfigurationById(id) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .select()
        .eq('ranking_id', id)
        .single();
    return data[0];
}
export async function getRankingConfiguration(ranking_name, ranking_password) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .select()
        .eq('ranking_name', ranking_name)
        .eq('ranking_password', ranking_password)
        .single();
    return data[0];
}
export async function getRankingsScore(ranking_id, page, pageSize) {
    const { data, error } = await supabaseClient
        .from('ranking_score')
        .select()
        .range(pageSize * (page - 1), page * pageSize + 1);
    return data;
}
export async function updateRankingScore(ranking_id, team_member_id, score) {
    const { data, error } = await supabaseClient
        .from('ranking_score')
        .upsert({
            ranking_id,
            team_member_id,
            score
        });
    return data;
}
export async function getRankingScore(ranking_id, team_member_id) {
    const { data, error } = await supabaseClient
        .from('ranking_score')
        .select('score')
        .eq('ranking_id', ranking_id)
        .eq('team_member_id', team_member_id)
        .single();
    return data[0].score;
}

