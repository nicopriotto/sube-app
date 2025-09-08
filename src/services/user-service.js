import {UserPersistence} from "@/persistence/user-persistence";
import {RankingPersistence} from "@/persistence/ranking-persistence";
import {TeamService} from "@/services/team-service";

export class UserService {
    static async createRankingUser(rankingId, rankingUserName, rankingPassword, userId) {
        return UserPersistence.createRankingUser()
    }

    static async joinRanking(rankingId, rankingUserName, rankingPassword, userId) {
        const user = (await UserPersistence.getRankingUser(rankingId, rankingUserName));
        let rankingUserId;
        if (!user) {
            const ranking = await RankingPersistence.getRankingConfigurationById(rankingId);
            rankingUserId = (await UserPersistence.createRankingUser(rankingId, rankingUserName, rankingPassword, userId))?.ranking_user_id;
            if (ranking && ranking.type === RankingPersistence.RankingTypes.VOTE) {
                await TeamService.createTeam(rankingId, rankingUserName, 1, [rankingUserId])
            }
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