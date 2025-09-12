"use server"
import * as UserPersistenceServer from "@/persistence/user/user-persistence.server";
import * as RankingPersistenceClient from "@/persistence/ranking/ranking-persistence.client";
import * as TeamServiceServer from "@/services/team/team-service.server";
import {RankingTypes} from "@/persistence/ranking/types";

export async function createRankingUser(rankingId, rankingUserName, rankingPassword, userId) {
    return UserPersistenceServer.createRankingUser(rankingId, rankingUserName, rankingPassword, userId);
}

export async function joinRanking(rankingId, rankingUserName, rankingPassword, userId) {
    const user = (await UserPersistenceServer.getRankingUser(rankingId, rankingUserName));
    let rankingUserId;
    if (!user) {
        const ranking = await RankingPersistenceClient.getRankingConfigurationById(rankingId);
        rankingUserId = (await UserPersistenceServer.createRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
        if (ranking && ranking.type === RankingTypes.VOTE) {
            await TeamServiceServer.createTeam(rankingId, rankingUserName, 1, [rankingUserId])
        }
    } else if(!user.password) {
        rankingUserId = (await UserPersistenceServer.updateRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
    } else if (user?.password !== rankingPassword) {
        return -1;
    } else {
        rankingUserId = user.ranking_user_id;
    }
    return rankingUserId;
}
