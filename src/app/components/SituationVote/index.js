import "./situationvote.css";
import { useMemo, useState } from "react";

function SituationVote({ title, description, involvedName, canVote, votes, expectedVotes = 0, finished = false, involvedUserId, onSubmit, onCancel }) {
  const [points, setPoints] = useState(5);
  function handleSubmit(e){
    e.preventDefault();
    onSubmit?.({ points: Number(points) });
  }

  return (
    <div className="vote-container">
      <h2 className="vote-title">Votación en curso</h2>

        {
            canVote && <form onSubmit={handleSubmit} className="vote-form">
                <div className="vote-form-row">
                    <div className="vote-slider">
                        <label htmlFor="points">Puntos: <span className="points-value">{points}</span></label>
                        <input id="points" type="range" min="0" max="10" step="1" value={points} onChange={(e)=>setPoints(e.target.value)} disabled={finished} />
                    </div>
                    <div className="vote-actions">
                        <button type="submit" className="submit-button" disabled={finished}>Enviar voto</button>
                    </div>
                </div>
            </form>
        }


      <div className="vote-info">
        <h3 className="vote-situation-title">{title}</h3>
        <p className="vote-description">{description}</p>
        <p className="vote-description" style={{marginTop: 6, color: "#6b7280"}}>Involucrado: <strong>{involvedName}</strong></p>
      </div>

      <div className="vote-users">
        <h4 className="vote-subtitle">Votos recibidos ({(votes||[]).length}{expectedVotes ? ` / ${expectedVotes}` : ""})</h4>
        {finished && (
          <div className="vote-finished">Votación finalizada</div>
        )}
        {(votes || []).map((v) => (
          <div key={v.id} className="vote-user">
            <div className="vote-user-info">
              <div>
                <p className="vote-user-name">{v.username || `Usuario ${v.ranking_user_id}`}</p>
                <p className="vote-user-points">Puntos: {v.points}</p>
              </div>
            </div>
            <div className="vote-user-score">{v.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SituationVote;
