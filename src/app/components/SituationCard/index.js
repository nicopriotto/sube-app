function SituationCard({ title, description, user }) {
  return (
    <div className="situation-card">
        <div className="situation-card-header">
          <h3>{title}</h3>
        </div>
        <div className="situation-card-body">
          <p>{description}</p>
        </div>
        <div className="situation-card-user">
          <p>{user}</p>
        </div>
    </div>
  )
}
