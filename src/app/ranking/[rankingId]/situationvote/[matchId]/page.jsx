import "@/app/components/SituationVote/situationvote.css";
import SituationVoteWrapper from "@/app/ranking/[rankingId]/situationvote/[matchId]/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {redirect} from "next/navigation";

export default async function RankingSituationVotePage({params}) {
    const {rankingId, matchId} = await params
    const token =(await cookies()).get("authToken")?.value;
    if (!token) redirect(`/ranking/${rankingId}/join?redirect=/ranking/${rankingId}/situationvote/${matchId}`);
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect(`/rankingId/${rankingId}/join?redirect=/ranking/${rankingId}/situationvote/${matchId}`)
    }
    return (
        <SituationVoteWrapper id={payload.id}/>
    );
}
