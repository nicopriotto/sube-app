"use client";

import { useState } from "react";
import SituationFeed from "../SituationFeed";
import RankingTable from "../RankingTable"; 
import { sortUsers } from "../../utils/sortUsers"
import "./home.css";

function Home() {
  const situations = [
    {
      title: "Beach Cleanup",
      description: "Help clean the beach this weekend.",
      user: "Alice",
      image: "/avatar.png"
    },
    {
      title: "Tree Planting",
      description: "Join us to plant trees in the park.",
      user: "Bob",
      image: "/avatar.png"
    }
  ];

    const [users, setUsers] = useState(
      sortUsers([
        { id: 1, name: "Rome", points: 1250, avatar: "/avatar.png" },
        { id: 2, name: "Nico", points: 1180, avatar: "/avatar.png" },
        { id: 3, name: "Juani", points: 1120, avatar: "/avatar.png" },
        { id: 4, name: "Pepo", points: 1050, avatar: "/avatar.png" },
        { id: 5, name: "Conra", points: 980, avatar: "/avatar.png" },
        { id: 6, name: "Ini", points: 150, avatar: "/avatar.png" },
        { id: 7, name: "Jose", points: 1180, avatar: "/avatar.png" },
        { id: 8, name: "Pipo", points: 1120, avatar: "/avatar.png" },
        { id: 9, name: "Gus", points: 1050, avatar: "/avatar.png" },
        { id: 10, name: "Fede", points: 980, avatar: "/avatar.png" },
      ]),
    )

  return (
    <div className="home">
      <div className="ranking-section">
        <RankingTable users={users} setUsers={setUsers} />
      </div>
      <div className="situations-section">
        <SituationFeed situations={situations}/>
      </div>
    </div>
  );
}

export default Home;
