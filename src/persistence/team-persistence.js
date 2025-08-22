import {supabaseClient} from "../../supabase";

export class TeamPersistence {
    static async getRankingTeams(ranking_id) {
        const { data, error } = await supabaseClient
            .from('team')
            .select()
            .eq('ranking_id', ranking_id);
        return data;
    }
    static async getTeamMembers(team_id) {
        const { data, error } = await supabaseClient
            .from('team_member')
            .select()
            .eq('team_id', team_id);
        return data;
    }
    static async createTeam(ranking_id, team_name, size) {
        const { data, error } = await supabaseClient
            .from('team')
            .insert({
                ranking_id,
                team_name,
                size
            });
        return data;
    }
    static async createTeamMember(team_id,team_member_name) {
        const { data, error } = await supabaseClient
            .from('team_member')
            .insert({
                team_id,
                team_member_name
            });
        return data;
    }
}


