import {RankingPersistence} from "@/persistence/ranking-persistence";

export class RankingService {
    static async getRankingConfigurationById(ranking_id) {
        return RankingPersistence.getRankingConfigurationById(ranking_id);
    }
    static async getRankingConfiguration(ranking_name, ranking_password) {
        return RankingPersistence.getRankingConfiguration(ranking_name, ranking_password);
    }
    static async createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt) {
        return RankingPersistence.createRanking(ranking_name, ranking_password, type, defaultTeamLimit, endsAt);
    }

    static async vote(match_id, team_member_id, points) {

    }
}
