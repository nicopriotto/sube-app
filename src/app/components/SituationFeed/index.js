"use client";

import SituationCard from "../SituationCard";
import "./situationfeed.css";
import { useRouter } from "next/navigation";

function SituationFeed({ situations, users, rankingId }) {
  const router = useRouter();

  return (
    <div className="situation-container">
      <div className="situation-header">
        <h2>Situaciones para Votar</h2>
      </div>
      <div className="situation-feed">
        {situations.map((situation, idx) => (
          <SituationCard
            key={idx}
            title={situation.title}
            description={situation.description}
            user={situation.users[0]}
            onVote={() => router.push(`/ranking/${rankingId}/situationvote/${situation.id}`)}
          />
        ))}
        {rankingId && (
          <button
            className="vote-button"
            style={{marginTop: '12px'}}
            onClick={() => router.push(`/ranking/${rankingId}/history`)}
          >
            Ver historial de situaciones
          </button>
        )}
      </div>
    </div>
  );
}

export default SituationFeed;
