import RankingWrapper from "@/app/ranking/[rankingId]/client";
import {getJoinedToken} from "@/app/utils/tokenUtils";


export default async function RankingPage({params}) {
    const {rankingId} = await params;
    const joined = !!(await getJoinedToken());
    return (
      <RankingWrapper rankingId={rankingId} joined={joined} />
    );
}