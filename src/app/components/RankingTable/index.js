"use client"

import "./rankingtable.css"
import Link from "next/link"
import UserRow from "../UserRow"
import SituationFeed from "../SituationFeed"
import NotificationToggle from "@/app/components/NotificationToggle";

function RankingTable({rankingId, title, description, users, situations, joined, rankingUserId}) {

  return (
    <main className="main-content">
      <div className="ranking-header">
        <div className="ranking-header-content">
          <div className={"flex"}><h1 className="ranking-title">{title}</h1> <NotificationToggle rankingId={rankingId} rankingUserId={rankingUserId}></NotificationToggle></div>
          <p className="ranking-subtitle">{description}</p>
        </div>
          <div className={"flex flex-col gap-1"}>
              { !joined && <Link href={`/ranking/${rankingId}/join`} className="propose-situation-btn">
                  Unirse al Ranking
              </Link>}
            <Link href={`/ranking/${rankingId}/situationForm`} className="propose-situation-btn">
              Proponer Situación
            </Link>
          </div>

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
