import {supabaseClient} from "../../supabase";

export class VotingPersistence {
    static async voteMatchResult(match_id, team_member_id, points) {
        const {data, error} = await supabaseClient
            .from('vote')
            .insert({
                match_id,
                team_member_id,
                points
            })
    }
}