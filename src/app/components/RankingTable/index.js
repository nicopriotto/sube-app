"use client"

import "./rankingtable.css"
import Link from "next/link"
import UserRow from "../UserRow"
import SituationFeed from "../SituationFeed"

function RankingTable({rankingId, title, description, users, situations, setUsers}) {

  return (
    <main className="main-content">
      <div className="ranking-header">
        <div className="ranking-header-content">
          <h1 className="ranking-title">{title}</h1>
          <p className="ranking-subtitle">{description}</p>
        </div>
        <Link href={`/ranking/${rankingId}/situationForm`} className="propose-situation-btn">
          Proponer Situación
        </Link>
      </div>

      <div className="board-columns">
        <div className="board-left">
          <div className="ranking-card">
            <div className="rankingTable">
              {(Array.isArray(users) ? [...users] : [])
                .sort((a, b) => (b?.points ?? 0) - (a?.points ?? 0))
                .map((user, idx) => (
                <UserRow
                  key={user.id}
                  rank={idx + 1}
                  username={user.name}
                  avatar={user.avatar}
                  points={user.points}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="board-right">
          <SituationFeed situations={situations || []} rankingId={rankingId} />
        </div>
      </div>
    </main>
  )
}

export default RankingTable
