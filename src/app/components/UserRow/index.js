import "./userrow.css";
import Image from "next/image";

function UserRow({ rank, username, avatar, points }) {
  return (
    <div className="userRow">
      <div className="rank text-start">{rank}</div>
      <div className="username">{username}</div>
      <div className="avatar justify-center">
        <Image src={avatar || "./avatar.png"} alt={`${username}'s avatar`} fill={true} />
      </div>
      <div className="userPoints text-end">{points}</div>
    </div>
  )
}

export default UserRow
