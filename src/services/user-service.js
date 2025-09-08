import {UserPersistence} from "@/persistence/user-persistence";

export class UserService {
    static async createRankingUser(rankingId, rankingUserName, rankingPassword, userId) {
        return UserPersistence.createRankingUser()
    }

    static async joinRanking(rankingId, rankingUserName, rankingPassword, userId) {
        const user = (await UserPersistence.getRankingUser(rankingId, rankingUserName));
        let rankingUserId;
        console.log(user)
        if (!user) {
            rankingUserId = (await UserPersistence.createRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
        } else if(!user.password) {
            rankingUserId = (await UserPersistence.updateRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
        } else if (user?.password !== rankingPassword) {
            return -1;
        } else {
            rankingUserId = user.ranking_user_id;
        }
        return rankingUserId;
    }
}