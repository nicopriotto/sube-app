import {supabaseClient} from "../../supabase";

export async function createMatch(ranking_id, team_limit, title, description) {
    const { data, error } = await supabaseClient
        .from('match')
        .insert({
            ranking_id,
            team_limit,
            title,
            description
        });
    return data;
}

export async function joinMatch(match_id, team_id) {
    const { data, error } = await supabaseClient
        .from('participates_match')
        .insert({
            match_id,
            team_id
        });
    return data;
}

export async function getMatchList(ranking_id, page, pageSize) {
    const { data, error } = await supabaseClient
        .from('match')
        .select()
        .eq('ranking_id', ranking_id)
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
    return data[0];
}

export async function getParticipatesMatches(match_id) {
    const { data, error } = await supabaseClient
        .from('participates_match')
        .select('team (*, team_member(*))')
        .eq('match_id', match_id);
    return data;
}
