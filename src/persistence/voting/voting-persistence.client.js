import {supabaseClient} from "../../../supabase.client";
export async function getMatchVotes(match_id) {
    const{data, error} = await supabaseClient
        .from('vote')
        .select('*, ranking_user_view(ranking_user_id, ranking_user_name)')
        .eq('match_id', match_id)
    return data;
}

export async function getMatchVoteCount(match_id) {
    const{count, error} = await supabaseClient
        .from('vote')
        .select('*', {count: 'exact', head: true})
        .eq('match_id', match_id)
    return count;
}
