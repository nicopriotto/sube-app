import {supabaseClient} from "../../supabase";

export class MatchPersistence {
    static async createMatch(ranking_id, team_limit, title, description) {
        const { data, error } = await supabaseClient
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

    static async joinMatch(match_id, team_id) {
        const { data, error } = await supabaseClient
            .from('match_result')
            .insert({
                match_id,
                team_id
            })
            .select();
        return data[0];
    }

    static async getMatchList(ranking_id, page, pageSize, ended) {
        let query = supabaseClient
            .from('match')
            .select()
            .eq('ranking_id', ranking_id);
        if (ended !== undefined) {
            query.eq('ended', ended)
        }
        const { data, error } = await query
            .order('match_id', { ascending: false })
            .range(pageSize * (page - 1), page * pageSize + 1);

        return data;
    }

    static async getMatch(match_id) {
        const { data, error } = await supabaseClient
            .from('match')
            .select()
            .eq('match_id', match_id)
            .single();
        return data[0];
    }

    static async getMatchParticipants(match_id) {
        const { data, error } = await supabaseClient
            .from('match_result')
            .select('team (team_id, team_name, size, ranking_user_team(ranking_user(*)))')
            .eq('match_id', match_id);
        return data;
    }

    static async setMatchResult(match_id, team_id, position, points) {
        const {data, error} = await supabaseClient
            .from('match_result')
            .update({
              position,
              points
            })
            .eq('match_id', match_id)
            .eq('team_id', team_id);
        return data;
    }

}

