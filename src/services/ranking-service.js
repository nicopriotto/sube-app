import {getRankingConfiguration} from "@/persistence/ranking-persistence";

export async function getRanking() {
    return getRankingConfiguration();
}