import {RankingPersistence} from "@/persistence/ranking-persistence";

export class RankingService {
    static async getRankingConfiguration() {
        return RankingPersistence.getRankingConfiguration();
    }
}
