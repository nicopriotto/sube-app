"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as MatchServiceClient from "@/services/match/match-service.client";
import SituationHistory from "@/app/components/SituationHistory";

export default function RankingHistoryPage() {
  const { rankingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const matches = await MatchServiceClient.getMatchList(rankingId, 1, 100, true);
        const details = await Promise.all(
          (matches || []).map(async (m) => {
            const [votes, participants] = await Promise.all([
              MatchServiceClient.getMatchVotes(m.id),
              MatchServiceClient.getMatchParticipants(m.id),
            ]);
            const points = (votes || []).map(v => v.points).sort((a,b)=>a-b);
            const mid = Math.floor(points.length / 2);
            const median = points.length ? (points.length % 2 === 0 ? Math.round((points[mid-1] + points[mid]) / 2) : points[mid]) : 0;
            const team = participants?.[0]?.team;
            const involved = team?.ranking_user_team?.[0]?.ranking_user?.ranking_user_name || team?.team_name;
            return {
              id: m.id,
              title: m.title,
              description: m.description,
              involvedName: involved || "Participante",
              medianPoints: median,
              votes: votes || [],
            };
          })
        );
        setItems(details);
      } catch (e) {
        console.error(e);
        setError("No se pudo cargar el historial");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [rankingId]);

  if (loading) return <div style={{padding: 16}}>Cargando...</div>;
  if (error) return <div style={{padding: 16}}>⚠️ {error}</div>;

  return <SituationHistory items={items} />;
}

