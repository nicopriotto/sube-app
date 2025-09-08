import {supabaseClient} from "../../supabase";
import {data} from "framer-motion/m";

export class UserPersistence {
    static async createRankingUser(ranking_id, ranking_user_name, password, user_id) {
        const {data, error} = await supabaseClient
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

    static async updateRankingUser(ranking_id, ranking_user_name, password, user_id) {
        const { data, error} = await supabaseClient
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

    static async getRankingUser(ranking_id, ranking_user_name) {
        const {data, error} = await supabaseClient
            .from('ranking_user')
            .select()
            .eq('ranking_id', ranking_id)
            .eq('ranking_user_name', ranking_user_name)
            .single();
        return data;
    }
}