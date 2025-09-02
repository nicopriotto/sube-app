"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import { AuthService } from "../../services/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await AuthService.signInWithEmail(email, password);
    setLoading(false);

    if (error) {
      setError(error.message || "Login failed");
      return;
    }

    router.push("/");
  }

  return (
    <div className={`app-form-background ${styles.container}`}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="app-form">
        <div className="app-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="app-form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className={styles.helperText}>
        ¿No tenés cuenta? <Link href="/register">Crear cuenta</Link>
      </p>
    </div>
  );
}
