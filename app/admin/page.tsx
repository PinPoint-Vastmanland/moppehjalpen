"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "admin", password: "" });

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => {
        if (res.ok) router.push("/admin");
      })
      .finally(() => setIsChecking(false));
  }, [router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "Felaktig inloggning.");
      return;
    }

    router.push("/admin");
  };

  if (isChecking) {
    return <main className="auth-shell"><p>Kontrollerar session...</p></main>;
  }

  return (
    <main className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin</p>
        <h1>Logga in</h1>
        <label>
          Användarnamn
          <input
            name="username"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            readOnly
          />
        </label>
        <label>
          Lösenord
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
        </label>
        {error ? <p className="form-status error">{error}</p> : null}
        <button className="btn btn-primary btn-full" type="submit">Logga in</button>
      </form>
    </main>
  );
}
