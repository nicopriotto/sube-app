"use server"

import {supabaseServer} from "../../../supabase.server";

export async function createRanking(ranking_name, ranking_password, type, default_team_limit, ends_at, ranking_description) {
    const { data, error } = await supabaseServer
        .from('ranking')
        .insert({
            ranking_name,
            ranking_password,
            type,
            default_team_limit,
            ends_at,
            ranking_description
        })
        .select()
        .single();
    if (error) {
        throw error;
    }
    return data;
}

export async function createRankingUser(ranking_id, ranking_user_name) {
    const { data, error } = await supabaseServer
        .from('ranking_user')
        .insert({
            ranking_id,
            ranking_user_name
        }).select();
    return data[0];
}

export async function updateRankingScore(ranking_id, ranking_user_id, score) {
    const { data, error } = await supabaseServer
        .from('ranking_user')
        .update({ score })
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_id', ranking_user_id);
    return data;
}

