"use client";

import "./situationhistory.css";

function SituationHistory({ items = [] }) {
  return (
    <div className="history-container">
      <h2 className="history-title">Historial de Situaciones</h2>
      {items.length === 0 && (
        <p className="history-empty">No hay situaciones finalizadas todavía.</p>
      )}
      <div className="history-grid">
        {items.map((it) => (
          <div key={it.id} className="history-card">
            <div className="history-card-top">
              <h3 className="history-card-title">{it.title}</h3>
              <span className="history-points-badge">+{it.medianPoints} pts</span>
            </div>
            <p className="history-card-desc">{it.description}</p>
            <p className="history-involved">Involucrado: <strong>{it.involvedName}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SituationHistory;
