"use client";

import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth-service";

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    AuthService.getSession().then(({ data, error }) => {
      if (!mounted) return;
      setSession(data?.session ?? null);
      setLoading(false);
    });

    const { data } = AuthService.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    const subscription = data?.subscription;
    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}
