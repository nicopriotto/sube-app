"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MatchService } from "@/services/match-service";
import { RankingService } from "@/services/ranking-service";
import SituationVote from "@/app/components/SituationVote";
import "@/app/components/SituationVote/situationvote.css";
import {
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader, ClockLoader, FadeLoader, GridLoader, HashLoader,
  MoonLoader, PacmanLoader, PropagateLoader,
  PuffLoader,
  RingLoader,
  RiseLoader, RotateLoader, ScaleLoader, SyncLoader
} from "react-spinners";
import {delay} from "framer-motion";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

export default function SituationVoteWrapper({id}) {
    console.log(id);
  const { rankingId, matchId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [match, setMatch] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [rankingUsers, setRankingUsers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [expectedVotes, setExpectedVotes] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [m, parts, users, vts] = await Promise.all([
          MatchService.getMatch(matchId),
          MatchService.getMatchParticipants(matchId),
          RankingService.getRankingUsers(rankingId),
          MatchService.getMatchVotes(matchId),
        ]);
        setMatch(m);
        setParticipants(parts || []);
        const u = users || [];
        setRankingUsers(u);
        const allowedIds = new Set(u.map(x => x.ranking_user_id));
        setVotes((vts || []).filter(v => allowedIds.has(v.ranking_user_id)));
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
  }, [rankingId, matchId]);

  async function submitVote({ rankingUserId, points }) {
    try {
      await RankingService.vote(Number(matchId), Number(rankingUserId), Number(points));
      const vts = await MatchService.getMatchVotes(matchId);
      const allowedIds = new Set((rankingUsers || []).map(x => x.ranking_user_id));
      setVotes((vts || []).filter(v => allowedIds.has(v.ranking_user_id)));
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

  if (loading) return <LoadingSpinner/>;
  if (error) return <div style={{padding: 16}}>⚠️ {error}</div>;

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
