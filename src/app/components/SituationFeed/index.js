"use client";

import SituationCard from "../SituationCard";
import "./situationfeed.css";
import { useRouter } from "next/navigation";

function SituationFeed({ situations, users }) {
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
            image={situation.image}
            onVote={() => router.push("/situationVote")}
          />
        ))}
      </div>
    </div>
  );
}

export default SituationFeed;
