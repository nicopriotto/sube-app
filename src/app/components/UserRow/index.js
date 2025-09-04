import "./userrow.css";
import Image from "next/image";

function UserRow({ rank, username, avatar, points }) {
  const rankClass = rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronze" : "";

  return (
    <div className="userRow">
      <div className="avatar">
        <Image src={avatar || "/avatar.png"} alt={`${username}'s avatar`} fill={true} />
      </div>
      <div className="userInfo">
        <div className="username">{username}</div>
        <div className="userPoints">{points} pts</div>
      </div>
      <div className={`rank ${rankClass}`}>#{rank}</div>
    </div>
  );
}

export default UserRow
