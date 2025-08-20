import {supabaseClient} from "../../supabase";

export async function getRanking(id) {
    const { data, error } = await supabaseClient
        .from('ranking')
        .select()
        .eq('ranking_id', id)
        .single();
    return data;
}
