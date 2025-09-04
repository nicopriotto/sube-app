import "./situationvote.css";
import { useMemo, useState } from "react";

function SituationVote({ title, description, involvedName, rankingUsers, votes, expectedVotes = 0, finished = false, involvedUserId, onSubmit, onCancel }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [points, setPoints] = useState(5);

  const votersById = useMemo(() => {
    const map = {};
    (rankingUsers || []).forEach(u => { map[u.ranking_user_id] = u.ranking_user_name; });
    return map;
  }, [rankingUsers]);

  const alreadyVotedIds = useMemo(() => new Set((votes || []).map(v => v.ranking_user_id)), [votes]);

  const selectableUsers = useMemo(() => (rankingUsers || []).filter(u => !alreadyVotedIds.has(u.ranking_user_id) && Number(u.ranking_user_id) !== Number(involvedUserId)), [rankingUsers, alreadyVotedIds, involvedUserId]);

  function handleSubmit(e){
    e.preventDefault();
    if (!selectedUser) return;
    onSubmit?.({ rankingUserId: Number(selectedUser), points: Number(points) });
  }

  return (
    <div className="vote-container">
      <h2 className="vote-title">Votación en curso</h2>

      
      <form onSubmit={handleSubmit} className="vote-form">
        <div className="vote-form-row">
          <div className="vote-slider">
            <label htmlFor="points">Puntos: <span className="points-value">{points}</span></label>
            <input id="points" type="range" min="0" max="10" step="1" value={points} onChange={(e)=>setPoints(e.target.value)} disabled={finished} />
          </div>
          <div className="vote-selector">
            <label htmlFor="voter">Tu usuario</label>
            <select id="voter" value={selectedUser} onChange={(e)=>setSelectedUser(e.target.value)} disabled={finished}>
              <option value="">Selecciona tu usuario</option>
              {selectableUsers.map(u => (
                <option key={u.ranking_user_id} value={u.ranking_user_id}>{u.ranking_user_name}</option>
              ))}
            </select>
          </div>
          <div className="vote-actions">
            <button type="submit" className="submit-button" disabled={finished}>Enviar voto</button>
          </div>
        </div>
      </form>

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
        {(votes || []).map((v, idx) => (
          <div key={idx} className="vote-user">
            <div className="vote-user-info">
              <div>
                <p className="vote-user-name">{votersById[v.ranking_user_id] || `Usuario ${v.ranking_user_id}`}</p>
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
