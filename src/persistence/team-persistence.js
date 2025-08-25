import {supabaseClient} from "../../supabase";

export class TeamPersistence {
    static async createTeam(ranking_id, team_name, size) {
        const { data, error } = await supabaseClient
            .from('team')
            .insert({
                ranking_id,
                team_name,
                size
            })
            .select();
        return data[0];
    }

    static async addTeamMember(team_id, ranking_user_id) {
        const { error } = await supabaseClient
            .from('ranking_user_team')
            .insert(team_id, ranking_user_id);
    }
    static async getRankingTeamsWithMembers(ranking_id) {
        const { data, error } = await supabaseClient
            .from('team')
            .select('team_id, team_name, size, ranking_user_team(ranking_user(*))')
            .eq('ranking_id', ranking_id);
        return data;
    }
    static async getRankingTeams(ranking_id) {
        const { data, error } = await supabaseClient
            .from('team')
            .select('*')
            .eq('ranking_id', ranking_id);
        return data;
    }
    static async getRankingTeamCount(ranking_id) {
        const { count, error } = await supabaseClient
            .from('team')
            .select('*', {count: 'exact', head: true})
            .eq('ranking_id', ranking_id);
        return count;
    }
    static async getTeamMembers(team_id) {
        const { data, error } = await supabaseClient
            .from('ranking_user_team')
            .select('ranking_user(*)')
            .eq('team_id', team_id);
        return data;
    }
}


