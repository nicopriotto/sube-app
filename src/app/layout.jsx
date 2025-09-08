import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"
import Breadcrumbs from "./components/Breadcrumbs"

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/avatar.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Breadcrumbs />
        {children}
      </body>
    </html>
  );
}
