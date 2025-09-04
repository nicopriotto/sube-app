"use client";

import "./rankingview.css";
import RankingTable from "../RankingTable";
import SituationFeed from "../SituationFeed";

function RankingView({ rankingId, title, description, users, situations }) {
  return (
    <section className="ranking-view">
      <div className="ranking-view-header">
        <div className="ranking-view-header-content">
          <h1 className="ranking-title">{title}</h1>
          <p className="ranking-subtitle">{description}</p>
        </div>
        <a href={`/ranking/${rankingId}/situationForm`} className="propose-situation-btn">
          Proponer Situación
        </a>
      </div>

      <div className="ranking-columns">
        <div className="ranking-left">
          <RankingTable rankingId={rankingId} users={users} />
        </div>
        <div className="ranking-right">
          <SituationFeed situations={situations} />
        </div>
      </div>
    </section>
  );
}

export default RankingView;

