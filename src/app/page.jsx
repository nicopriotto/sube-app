import Link from "next/link";
import Head from "next/head";

export default function Page() {
  return (
      <>
    <div className="hero-container">
      <h1 className="hero-title">Bienvenido a SubeApp</h1>
      <p className="hero-subtitle">
        Organiza competencias, registra resultados y sigue el ranking en tiempo real.
      </p>
      <Link href="/ranking/9" className="hero-button">
        Ir al Ranking
      </Link>
    </div>
      </>

  );
}
