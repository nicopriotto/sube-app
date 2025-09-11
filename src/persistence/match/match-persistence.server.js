"use server"

import {supabaseServer} from "../../../supabase.server";

export async function createMatch(ranking_id, team_limit, title, description) {
    const { data, error } = await supabaseServer
        .from('match')
        .insert({
            ranking_id,
            team_limit,
            title,
            description
        })
        .select();
    return data[0];
}

export async function joinMatch(match_id, team_id) {
    const { data, error } = await supabaseServer
        .from('match_result')
        .insert({
            match_id,
            team_id
        })
        .select();
    if (error) throw new Error(error.message);
    return data[0];
}

export async function setEnded(match_id, ended = true) {
    const { data, error } = await supabaseServer
        .from('match')
        .update({ ended })
        .eq('match_id', match_id)
        .select();
    if (error) throw new Error(error.message);
    return data;
}

export async function setMatchResult(match_id, team_id, position, points) {
    const {data, error} = await supabaseServer
        .from('match_result')
        .update({
          position,
          points
        })
        .eq('match_id', match_id)
        .eq('team_id', team_id);
    return data;
}

