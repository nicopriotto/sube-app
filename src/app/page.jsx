import Link from "next/link";

export default function Page() {
  return (
      <>
    <div className="hero-container">
      <h1 className="hero-title">Bienvenido a SubeApp</h1>
      <p className="hero-subtitle">
        Organiza competencias, registra resultados y sigue el ranking en tiempo real.
      </p>
      <Link href="/ranking/18" className="hero-button">
        Ir al Ranking
      </Link>
    </div>
      </>

  );
}
