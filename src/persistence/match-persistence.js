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
            });
        return data;
    }

    static async joinMatch(match_id, team_id) {
        const { data, error } = await supabaseClient
            .from('participates_match')
            .insert({
                match_id,
                team_id
            });
        return data;
    }

    static async getMatchList(ranking_id, page, pageSize) {
        const { data, error } = await supabaseClient
            .from('match')
            .select()
            .eq('ranking_id', ranking_id)
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

    //@todo: ver si nos quedamos con participates o result
    static async getParticipatesMatches(match_id) {
        const { data, error } = await supabaseClient
            .from('participates_match')
            .select('team (*, team_member(*))')
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

