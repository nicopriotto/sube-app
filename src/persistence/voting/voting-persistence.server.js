"use server"

import {supabaseServer} from "../../../supabase.server";

export async function voteMatchResult(match_id, ranking_user_id, points) {
    const {data, error} = await supabaseServer
        .from('vote')
        .insert({
            match_id,
            ranking_user_id,
            points
        })
}