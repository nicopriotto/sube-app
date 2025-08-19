import '../styles/ranking.css';

function UserRow({username, points, updatePoints, className}) {

    return (
        <div className={`userRow ${className}`}>
            <div className="username">{username}</div>
            <div className="userPoints">{points}</div>
            <div className="buttons">
                <button onClick={() => updatePoints(1)}>SUBE!</button>
                <button onClick={() => updatePoints(-1)}>BAJA!</button>
            </div>
        </div>
    );
}

export default UserRow;