import "./situationcard.css";

function SituationCard({ title, description, user, onVote }) {
  return (
    <div className="situation-card">
      <div className="situation-card-content">
        <div className="situation-card-header">
          <h3>{title} - {user}</h3>
        </div>
        <div className="situation-card-body">
          <p>{description}</p>
        </div>
        <div className="situation-card-footer">
          <button className="vote-button" onClick={onVote}>
            Votar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SituationCard;
