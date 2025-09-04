"use client"

import "./navbar.css"
import Link from "next/link"
import Image from "next/image"

function Navbar() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <Link href="/" className="nav-link">
          <span className="logo-icon">♦</span>
          <span className="logo-text">SubeApp</span>
          </Link>
        </div>
        <div className="user-profile">
          <Image src="/avatar.png" alt="User profile" width={40} height={40} />
        </div>
      </div>
    </header>
  )
}

export default Navbar
