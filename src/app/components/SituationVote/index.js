import Image from "next/image";
import "./situationvote.css";

function SituationVote({ image, title, description, users }) {
  return (
    <div className="vote-container">
      <h2 className="vote-title">Votación en curso</h2>

      {/* Situation header */}
      <div className="vote-header">
        <div className="vote-image">
          <Image src={image} alt={title} width={240} height={120} />
        </div>
        <div className="vote-info">
          <h3 className="vote-situation-title">{title}</h3>
          <p className="vote-description">{description}</p>
        </div>
      </div>

      {/* Users */}
      <div className="vote-users">
        <h4 className="vote-subtitle">Asignar puntos</h4>
        {users.map((user) => (
          <div key={user.id} className="vote-user">
            <div className="vote-user-info">
              <img src={user.avatar} alt={user.name} className="vote-user-avatar" />
              <div>
                <p className="vote-user-name">{user.name}</p>
                <p className="vote-user-points">Puntos asignados: {user.points}</p>
              </div>
            </div>
            <div className="vote-user-score">{user.points}</div>
          </div>
        ))}
      </div>

      {/* Footer buttons */}
      <div className="vote-footer">
        <button className="cancel-button">Cancelar</button>
        <button className="submit-button">Enviar votos</button>
      </div>
    </div>
  );
}

export default SituationVote;
