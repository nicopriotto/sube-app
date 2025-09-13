import RankingWrapper from "@/app/ranking/[rankingId]/client";
import {getJoinedToken} from "@/app/utils/tokenUtils";
import jwt from "jsonwebtoken";

export default async function RankingPage({params}) {
    const {rankingId} = await params;
    const token = await getJoinedToken();
    let rankingUserId;
    if (token) {
        try {
            rankingUserId = jwt.verify(token, process.env.JWT_SECRET)?.id;
        } catch {
            //await logoutAction();
            console.log("aura");
        }
    }
    return (
      <RankingWrapper rankingId={rankingId} joined={!!token} rankingUserId={rankingUserId}/>
    );
}