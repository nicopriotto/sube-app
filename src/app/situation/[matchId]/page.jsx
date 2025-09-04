"use client";
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MatchService } from "@/services/match-service";
import { RankingService } from "@/services/ranking-service";
import SituationVote from "@/app/components/SituationVote";
import "@/app/components/SituationVote/situationvote.css";

export default function SituationDetailsPage() {
  const { matchId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [rankingUsers, setRankingUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [expectedVotes, setExpectedVotes] = useState(0);

  const rankingId = match?.ranking_id;

  useEffect(() => {
    async function load() {
      try {
        const m = await MatchService.getMatch(matchId);
        setMatch(m);
        const [parts, users, vts] = await Promise.all([
          MatchService.getMatchParticipants(matchId),
          RankingService.getRankingUsers(m.ranking_id),
          MatchService.getMatchVotes(matchId),
        ]);
        setParticipants(parts || []);
        const u = users || [];
        setRankingUsers(u);
        const allowedIds = new Set(u.map(x => x.ranking_user_id));
        const filteredVotes = (vts || []).filter(v => allowedIds.has(v.ranking_user_id));
        setVotes(filteredVotes);
        const involvedId = parts?.[0]?.team?.ranking_user_team?.[0]?.ranking_user?.ranking_user_id;
        setExpectedVotes(Math.max(0, u.length - (involvedId ? 1 : 0)));
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar la situación");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [matchId]);

  async function submitVote({ rankingUserId, points }) {
    try {
      await RankingService.vote(Number(matchId), Number(rankingUserId), Number(points));
      
      const vts = await MatchService.getMatchVotes(matchId);
      const allowedIds = new Set((rankingUsers || []).map(x => x.ranking_user_id));
      const filteredVotes = (vts || []).filter(v => allowedIds.has(v.ranking_user_id));
      setVotes(filteredVotes);
    } catch (e) {
      console.error(e);
      setError("No se pudo enviar el voto");
    }
  }

  const { involvedName, involvedUserId } = useMemo(() => {
    const t = participants?.[0]?.team;
    const ru = t?.ranking_user_team?.[0]?.ranking_user;
    return {
      involvedName: ru?.ranking_user_name || t?.team_name || "Participante",
      involvedUserId: ru?.ranking_user_id,
    };
  }, [participants]);

  if (loading) return <div style={{padding: 16}}>Cargando...</div>;
  if (error) return <div style={{padding: 16}}>Error: {error}</div>;

  const finished = (votes || []).length >= expectedVotes && expectedVotes > 0;

  return (
    <SituationVote
      title={match?.title || "Situación"}
      description={match?.description}
      involvedName={involvedName}
      involvedUserId={involvedUserId}
      rankingUsers={rankingUsers}
      votes={votes}
      expectedVotes={expectedVotes}
      finished={finished}
      onSubmit={submitVote}
      onCancel={() => router.back()}
    />
  );
}
