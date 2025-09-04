"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./breadcrumbs.css";

function titleCase(str) {
  try {
    return decodeURIComponent(str)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return str;
  }
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = (pathname || "/").split("/").filter(Boolean);

  const crumbs = [{ name: "Inicio", href: "/" }];
  let path = "";
  for (let i = 0; i < segments.length; ) {
    const seg = segments[i];
    if (seg === "ranking" && i + 1 < segments.length) {
      const id = segments[i + 1];
      path += `/ranking/${id}`;
      crumbs.push({ name: "Ranking", href: path });
      i += 2;
      continue;
    }
    if (seg === "situationvote" && i + 1 < segments.length) {
      const id = segments[i + 1];
      path += `/situationvote/${id}`;
      crumbs.push({ name: "Votar", href: path });
      i += 2;
      continue;
    }
    if (seg === "history") {
      path += `/history`;
      crumbs.push({ name: "Historial", href: path });
      i += 1;
      continue;
    }
    path += `/${seg}`;
    crumbs.push({ name: titleCase(seg), href: path });
    i += 1;
  }

  if (crumbs.length <= 1) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((c, idx) => (
        <span key={c.href} className="crumb">
          {idx < crumbs.length - 1 ? (
            <Link href={c.href} className="crumb-link">{c.name}</Link>
          ) : (
            <span className="crumb-current">{c.name}</span>
          )}
          {idx < crumbs.length - 1 && <span className="crumb-sep">/</span>}
        </span>
      ))}
    </nav>
  );
}
