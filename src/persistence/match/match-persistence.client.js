import {supabaseClient} from "../../../supabase.client";

export async function getMatchList(ranking_id, page, pageSize, ended) {
    let query = supabaseClient
        .from('match')
        .select('*, match_result(*, team(*))')
        .eq('ranking_id', ranking_id);
    if (ended !== undefined) {
        query.eq('ended', ended)
    }
    const { data, error } = await query
        .order('match_id', { ascending: false })
        .range(pageSize * (page - 1), page * pageSize + 1);

    return data;
}

export async function getMatch(match_id) {
    const { data, error } = await supabaseClient
        .from('match')
        .select()
        .eq('match_id', match_id)
        .single();
    return data;
}

export async function getMatchParticipants(match_id) {
    const { data, error } = await supabaseClient
        .from('match_result')
        .select('team (team_id, team_name, size, ranking_user_team(ranking_user_view(*)))')
        .eq('match_id', match_id);
    return data;
}

