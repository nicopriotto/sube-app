import * as RankingPersistenceClient from "@/persistence/ranking/ranking-persistence.client";
import {RankingTypes} from "@/persistence/ranking/types";

export function getRankingTypes() {
    return RankingTypes;
}
export async function getRankingConfigurationById(ranking_id) {
    return RankingPersistenceClient.getRankingConfigurationById(ranking_id);
}
export async function getRankingConfiguration(ranking_name, ranking_password) {
    return RankingPersistenceClient.getRankingConfiguration(ranking_name, ranking_password);
}

export async function getRankingsScore(ranking_id, page, pageSize) {
    return (await RankingPersistenceClient.getRankingsScore(ranking_id, page, pageSize)).map(entry => {
            return {
                id: entry.ranking_user_id,
                name: entry.ranking_user_name,
                avatar: "/avatar.png",
                points: entry.score,
            }
    });
}

export async function getRankingUsers(ranking_id) {
    return RankingPersistenceClient.getRankingUsers(ranking_id);
}
