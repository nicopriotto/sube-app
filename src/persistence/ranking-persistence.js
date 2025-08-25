import {supabaseClient} from "../../supabase";

export class RankingPersistence {
    static RankingTypes = {
        VOTE: 'vote',
    }
    static async createRanking(ranking_name, ranking_password, type, default_team_limit, ends_at) {
        const { data, error } = await supabaseClient
            .from('ranking')
            .insert({
                ranking_name,
                ranking_password,
                type,
                default_team_limit,
                ends_at
            })
            .select();
        if (error) {
            throw error;
        }
        return data[0];
    }

    static async createRankingUser(ranking_id, ranking_user_name) {
        const { data, error } = await supabaseClient
            .from('ranking_user')
            .insert({
                ranking_id,
                ranking_user_name
            }).select();
        return data[0];
    }

    static async joinRanking(ranking_id, ranking_user_id) {
        const { data, error } = await supabaseClient
            .from('ranking_score')
            .insert({
                ranking_id,
                ranking_user_id,
            });
        if (error) {
            throw error;
        }
        return data;
    }

    static async getRankingConfigurationById(id) {
        const { data, error } = await supabaseClient
            .from('ranking')
            .select()
            .eq('ranking_id', id)
            .single();
        return data[0];
    }
    static async getRankingConfiguration(ranking_name, ranking_password) {
        const { data, error } = await supabaseClient
            .from('ranking')
            .select()
            .eq('ranking_name', ranking_name)
            .eq('ranking_password', ranking_password)
            .single();
        return data[0];
    }
    static async getRankingsScore(ranking_id, page, pageSize) {
        const { data, error } = await supabaseClient
            .from('ranking_score')
            .select('score, ranking_user(*)')
            .range(pageSize * (page - 1), page * pageSize + 1);
        return data;
    }
    static async getRankingUsers(ranking_id) {
        const { data, error } = await supabaseClient
            .from('ranking_user')
            .select()
            .eq('ranking_id', ranking_id)
        return data;
    }
    static async updateRankingScore(ranking_id, ranking_user_id, score) {
        const { data, error } = await supabaseClient
            .from('ranking_score')
            .update({
                ranking_id,
                ranking_user_id,
                score
            });
        return data;
    }
    static async getRankingScore(ranking_id, ranking_user_id) {
        const { data, error } = await supabaseClient
            .from('ranking_score')
            .select('score')
            .eq('ranking_id', ranking_id)
            .eq('ranking_user_id', ranking_user_id)
            .single();
        return data[0].score;
    }
}


