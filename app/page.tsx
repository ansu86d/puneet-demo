
"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [sum, setSum] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    setError("");
    setSum(null);
    try {
      const res = await fetch("http://localhost:3001/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a, b }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setSum(data.sum);
    } catch (err: any) {
      setError(err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Simple Calculator</h1>
        <div className={styles.intro}>
          <label>
            Number A:
            <input
              type="number"
              value={a}
              onChange={e => setA(Number(e.target.value))}
              style={{ marginLeft: 8 }}
            />
          </label>
          <label>
            Number B:
            <input
              type="number"
              value={b}
              onChange={e => setB(Number(e.target.value))}
              style={{ marginLeft: 8 }}
            />
          </label>
          <button className={styles.primary} onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
          {sum !== null && <div>Sum: <b>{sum}</b></div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </main>
    </div>
  );
}
