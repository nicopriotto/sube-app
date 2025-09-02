"use client";

import { useEffect, useMemo, useState } from "react";
import SituationFeed from "../SituationFeed";
import RankingTable from "../RankingTable"; 
import { sortUsers } from "../../utils/sortUsers"
import "./home.css";
import { useSession } from "../../hooks/useSession";
import { RankingService } from "@/services/ranking-service";
import Link from "next/link";

function Home() {
  const { user } = useSession();
  const [myRankings, setMyRankings] = useState([]);
  const [loadingRankings, setLoadingRankings] = useState(false);
  const displayName = useMemo(() => {
    if (!user) return null;
    const meta = user.user_metadata || {};
    const name = meta.full_name || meta.name;
    if (name && typeof name === "string") return name;
    if (user.email) return user.email.split("@")[0];
    return "";
  }, [user]);

  useEffect(() => {
    async function load() {
      if (!displayName) return;
      setLoadingRankings(true);
      try {
        const rows = await RankingService.getUserRankingsByName(displayName);
        setMyRankings(rows);
      } catch (e) {
        setMyRankings([]);
      } finally {
        setLoadingRankings(false);
      }
    }
    load();
  }, [displayName]);

  const situations = [
    {
      title: "Beach Cleanup",
      description: "Help clean the beach this weekend.",
      users: ["Alice"],
      image: "/avatar.png"
    },
    {
      title: "Tree Planting",
      description: "Join us to plant trees in the park.",
      users: ["Bob"],
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
        {user && (
          <div className="greeting">Hola {displayName} 👋</div>
        )}
        {user && (
          <div className="my-rankings">
            <div className="my-rankings-header">
              <h3>Mis Rankings</h3>
              {loadingRankings && <span className="subtle">Cargando...</span>}
            </div>
            {(!loadingRankings && myRankings.length === 0) && (
              <div className="empty">No estás en ningún ranking todavía.</div>
            )}
            <ul className="ranking-list">
              {myRankings.map(r => (
                <li key={r.id} className="ranking-item">
                  <div className="ranking-main">
                    <div className="ranking-title">{r.name}</div>
                    {r.description && (
                      <div className="ranking-desc">{r.description}</div>
                    )}
                  </div>
                  <Link className="ranking-link" href={`/ranking/${r.id}`}>Ver</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <RankingTable title={"Ranking gaga"} description={"Ranking de gagueadas 2025"} users={users} setUsers={setUsers} />
      </div>
      <div className="situations-section">
        <SituationFeed situations={situations}/>
      </div>
    </div>
  );
}

export default Home;
