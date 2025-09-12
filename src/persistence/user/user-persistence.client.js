import {supabaseClient} from "../../../supabase.client";

export async function getRankingUser(ranking_id, ranking_user_name) {
    const {data, error} = await supabaseClient
        .from('ranking_user_view')
        .select()
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_name', ranking_user_name)
        .single();
    return data;
}
