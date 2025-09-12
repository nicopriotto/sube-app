"use client";

import "./navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logoutAction } from "@/services/auth-service";

function Navbar({ joined = false, username = null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <Link href="/" className="nav-link">
            <span className="logo-icon">♦</span>
            <span className="logo-text">SubeApp</span>
          </Link>
        </div>
        <div className="user-profile" ref={menuRef}>
          {joined && username && (
            <span className="greeting" aria-live="polite">Hola {username}!</span>
          )}
          <button
            type="button"
            className="user-avatar-button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Image src="/avatar.png" alt="User profile" width={40} height={40} />
          </button>
          {menuOpen && (
            <div className="user-menu-dropdown" role="menu">
              {joined ? (
                <form action={logoutAction}>
                  <button type="submit" className="dropdown-item" role="menuitem">
                    Log out
                  </button>
                </form>
              ) : (
                <Link href="/ranking/18/join" className="dropdown-item" role="menuitem">
                  Log in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
