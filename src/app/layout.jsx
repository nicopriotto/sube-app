import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"
import Breadcrumbs from "./components/Breadcrumbs"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("joinToken")?.value;
  let joined = !!token;
  let username = null;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      username = payload?.username || null;
    } catch (e) {
      joined = false;
      username = null;
    }
  }
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

          <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar joined={joined} username={username} />
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
