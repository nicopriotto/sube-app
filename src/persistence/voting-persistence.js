import {supabaseClient} from "../../supabase";

export class VotingPersistence {
    static async voteMatchResult(match_id, ranking_user_id, points) {
        const {data, error} = await supabaseClient
            .from('vote')
            .insert({
                match_id,
                ranking_user_id,
                points
            })
    }

    static async getMatchVotes(match_id) {
        const{data, error} = await supabaseClient
            .from('vote')
            .select()
            .eq('match_id', match_id)
        return data;
    }

    static async getMatchVoteCount(match_id) {
        const{count, error} = await supabaseClient
            .from('vote')
            .select('*', {count: 'exact', head: true})
            .eq('match_id', match_id)
        return count;
    }
}