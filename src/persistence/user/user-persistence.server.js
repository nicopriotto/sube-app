"use server"

import {supabaseServer} from "../../../supabase.server";
import {supabaseClient} from "../../../supabase.client";

export async function createRankingUser(ranking_id, ranking_user_name, password, user_id) {
    const {data, error} = await supabaseServer
        .from('ranking_user')
        .insert({
            ranking_id,
            ranking_user_name,
            password,
            user_id,
        })
        .select('ranking_user_id')
        .single();
    return data;
}

export async function updateRankingUser(ranking_id, ranking_user_name, password, user_id) {
    const { data, error} = await supabaseServer
        .from('ranking_user')
        .update({
            ranking_user_name,
            password,
            user_id,
        })
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_name', ranking_user_name)
        .select('ranking_user_id');
    return data;
}
export async function getRankingUser(ranking_id, ranking_user_name) {
    const {data, error} = await supabaseClient
        .from('ranking_user')
        .select()
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_name', ranking_user_name)
        .single();
    return data;
}


