import Link from "next/link";
import Head from "next/head";

export const metadata = {
    title: "Sube App",
    description: "Ranking gaga clausura 2025.",
    openGraph: {
        title: "Gagaengineering",
        description: "Ranking gaga clausura 2025.",
        url: "https://sube-app.vercel.app",
        siteName: "Sube App",
        images: [
            {
                url: "https://sube-app.vercel.app/avatar.png",
                width: 1200,
                height: 630,
                alt: "Sube App Preview",
            },
        ],
        type: "website",
    },
};
export default function Page() {
  return (
      <>
          <Head>
              <title>Sube App</title>
              <meta property="og:title" content="Gagaengineering" />
              <meta
                  property="og:description"
                  content="Ranking gaga clausura 2025."
              />
              <meta
                  property="og:image"
                  content="https://sube-app.vercel.app/avatar.png"
              />
              <meta property="og:url" content="https://sube-app.vercel.app" />
              <meta property="og:type" content="website" />
          </Head>
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
