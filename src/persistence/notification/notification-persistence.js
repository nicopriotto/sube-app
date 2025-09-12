import {supabaseServer} from "../../../supabase.server";

export async function subscribeRankingUser(ranking_id, ranking_user_id, subscription) {
    const {error} = await supabaseServer
        .from('ranking_notification_subscription')
        .insert({
            ranking_id,
            ranking_user_id,
            subscription
        })
    return { success: !!error };
}

export async function unsubscribeUser(ranking_id, ranking_user_id) {
    const { error } = await supabaseServer
        .from('ranking_notification_subscription')
        .delete()
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_id', ranking_user_id)
    return { success: !!error }
}

export async function getRankingUserSubscription(ranking_id, ranking_user_id) {
    const { data, error } = await supabaseServer
        .from('ranking_notification_subscription')
        .select('subscription')
        .eq('ranking_id', ranking_id)
        .eq('ranking_user_id', ranking_user_id)
        .single()

    return data?.subscription
}