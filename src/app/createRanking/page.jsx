import RankingForm from "@/app/components/RankingForm/RankingForm";
import {redirect} from "next/navigation";
import * as RankingServiceServer from "@/services/ranking/ranking-service.server";

async function createRanking(prevState, queryData) {
    "use server"
    let rankingId = null;
    try {
        const rankingName = queryData.get("rankingName") ;
        const rankingPassword = queryData.get("rankingPassword");
        const rankingDescription = queryData.get("rankingDescription");
        const type = queryData.get("rankingType") ;
        const endsAt = queryData.get("endsAt");
        const endsAtDate = endsAt ? new Date(endsAt) : null;

        const defaultTeamLimit = 10;

        const ranking = await RankingServiceServer.createRanking(
            rankingName,
            rankingPassword,
            type,
            defaultTeamLimit,
            endsAtDate,
            rankingDescription,
        );
        rankingId = ranking.ranking_id;
    } catch (err) {
        console.error("Failed to create ranking", err);
        return {error: err};
    } finally {
        if (rankingId) {
            redirect("/ranking/" + rankingId)
        }
    }
}

export default function CreateRankingPage() {
    return (
        <RankingForm onSubmit={createRanking}/>
    );
}
