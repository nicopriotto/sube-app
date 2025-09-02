"use client";

import "./navbar.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "../../hooks/useSession";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function Navbar() {
  const router = useRouter();
  const { user, loading } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const shortName = useMemo(() => {
    if (!user) return "";
    const meta = user.user_metadata || {};
    return meta.full_name || meta.name || (user.email ? user.email.split("@")[0] : "");
  }, [user]);

  async function handleLogout() {
    await AuthService.signOut();
    router.push("/");
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <Link href="/" className="nav-link">
            <span className="logo-icon">♦</span>
            <span className="logo-text">SubeApp</span>
          </Link>
        </div>
        <nav className="nav-links">
          <Link href="/" className="nav-link">
            Inicio
          </Link>
          <Link href="/createRanking" className="nav-link">
            Crear Ranking
          </Link>
          <Link href="/" className="nav-link">
            Invitar Amigos
          </Link>
        </nav>
        <div className="user-profile" onMouseLeave={() => setMenuOpen(false)}>
          {!loading && user ? (
            <>
              <button className="profile-trigger" onClick={() => setMenuOpen(v => !v)}>
                <Image src="/avatar.png" alt="User profile" width={32} height={32} />
                <span className="profile-name">{shortName}</span>
                <span className="caret">▾</span>
              </button>
              {menuOpen && (
                <div className="profile-menu">
                  <button className="menu-item" onClick={handleLogout}>Salir</button>
                </div>
              )}
            </>
          ) : (
            !loading && (
              <Link href="/login" className="login-button">Login</Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
