import RankingWrapper from "@/app/ranking/[rankingId]/client";
import {getJoinedToken} from "@/app/utils/tokenUtils";
import jwt from "jsonwebtoken";

export default async function RankingPage({params}) {
    const {rankingId} = await params;
    const token = await getJoinedToken();
    let rankingUserName;
    if (token) {
        try {
            rankingUserName = jwt.verify(token, process.env.JWT_SECRET)?.username;
        } catch {
            //await logoutAction();
            console.log("aura");
        }
    }
    return (
      <RankingWrapper rankingId={rankingId} joined={!!token} rankingUserName={rankingUserName}/>
    );
}