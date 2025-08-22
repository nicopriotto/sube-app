"use client"

import "./rankingtable.css"
import { useState } from "react"
import { sortUsers } from "../../utils/sortUsers"
import Link from "next/link"
import UserRow from "../UserRow"

function RankingTable() {
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

  function updatePoints(id, delta) {
    setUsers((prevUsers) =>
      sortUsers(
        prevUsers.map((user) => (user.id === id ? { ...user, points: Math.max(0, user.points + delta) } : user)),
      ),
    )
  }

  return (
    <main className="main-content">
      <div className="ranking-card">

        {/* Header */}
        <div className="ranking-header">
          <div className="ranking-header-content">
            <h1 className="ranking-title">Ranking Gaga</h1>
            <p className="ranking-subtitle">Tabla de posiciones de gagueadas 2025</p>
          </div>
          <Link href="/situationForm" className="propose-situation-btn">
            Proponer Situación
          </Link>
        </div>

        {/* Rows */}
        <div className="rankingTable">

          {/* Header Row */}
          <div className="headerRow userRow">
            <div className="header">Posición</div>
            <div className="header">Nombre</div>
            <div className="header text-center">Avatar</div>
            <div className="header text-end">Puntos</div>
          </div>

          {/* User Rows */}
          {users.map((user) => {
            return (
                <UserRow
                  key={user.id}
                  rank={users.indexOf(user) + 1}
                  username={user.name}
                  avatar={user.avatar}
                  points={user.points}
                />
            )
          })}

        </div>
      </div>
    </main>
  )
}

export default RankingTable
