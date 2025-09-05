import {UserPersistence} from "@/persistence/user-persistence";

export class UserService {
    static async createRankingUser(rankingId, rankingUserName, rankingPassword, userId) {
        return UserPersistence.createRankingUser()
    }

    static async joinRanking(rankingId, rankingUserName, rankingPassword, userId) {
        let rankingUserId = (await UserPersistence.getRankingUser(rankingId, rankingUserName, rankingPassword))?.ranking_user_id;
        if (!rankingUserId) {
            rankingUserId = (await UserPersistence.createRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
        }
        return rankingUserId;
    }
}