import { useState } from "react";
import Editor from "../../components/Editor";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    feedback?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit({
    text,
    focus,
  }: {
    text: string;
    focus: string;
  }) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, focus }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Request failed. Check console." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Essay Feedback Tool</h1>
      <Editor onSubmit={handleSubmit} loading={loading} />
      <section className="output">
        {loading && <p>Analyzing…</p>}
        {result?.error && <pre className="error">{result.error}</pre>}
        {result?.feedback && (
          <>
            <h2>Suggestions</h2>
            <pre className="feedback">{result.feedback}</pre>
          </>
        )}
      </section>
    </main>
  );
}
