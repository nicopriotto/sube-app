import {RankingPersistence} from "@/persistence/ranking-persistence";
import {MatchPersistence} from "@/persistence/match-persistence";
import {TeamPersistence} from "@/persistence/team-persistence";
import {VotingPersistence} from "@/persistence/voting-persistence";

export class RankingService {
    static getRankingTypes() {
        return RankingPersistence.RankingTypes;
    }
    static async getRankingConfigurationById(ranking_id) {
        return RankingPersistence.getRankingConfigurationById(ranking_id);
    }
    static async getRankingConfiguration(ranking_name, ranking_password) {
        return RankingPersistence.getRankingConfiguration(ranking_name, ranking_password);
    }
    static async createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt) {
        return RankingPersistence.createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt);
    }

    static async getRankingsScore(ranking_id, page, pageSize) {
        return RankingPersistence.getRankingsScore(ranking_id, page, pageSize);
    }

    static async vote(match_id, team_member_id, points) {
        const match = await MatchPersistence.getMatch(match_id)
        const [rankingConfiguration, teamCount, votes, participants] = Promise.all([
            RankingPersistence.getRankingConfigurationById(match.ranking_id),
            TeamPersistence.getRankingTeamCount(match.ranking_id),
            VotingPersistence.getMatchVotes(match_id),
            MatchPersistence.getMatchParticipants(match_id)
        ]);
        const voteCount = votes.length;
        if (rankingConfiguration.type !== RankingPersistence.RankingTypes.VOTE){
            return;
        }
        if (voteCount >= teamCount) {
            return;
        }
        if (voteCount === teamCount - 1) {
            let avg = 0;
            votes.forEach(vote => avg += vote.points);
            avg = Math.floor((avg + points) / votes.length + 1);
            await Promise.all([
                VotingPersistence.voteMatchResult(match_id, team_member_id, points),
                RankingPersistence.updateRankingScore(match.ranking_id, participants[0].team_members[0].team_member_id, avg)
            ])
        } else {
            await VotingPersistence.voteMatchResult(match_id, team_member_id, points);
        }
    }
}
