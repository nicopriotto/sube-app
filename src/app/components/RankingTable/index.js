"use client"

import "./rankingtable.css"
import { sortUsers } from "../../utils/sortUsers"
import Link from "next/link"
import UserRow from "../UserRow"

function RankingTable({title, description, users, setUsers}) {

  return (
    <main className="main-content">
      <div className="ranking-card">

        {/* Header */}
        <div className="ranking-header">
          <div className="ranking-header-content">
            <h1 className="ranking-title">{title}</h1>
            <p className="ranking-subtitle">{description}</p>
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
