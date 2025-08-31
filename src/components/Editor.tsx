import { useState } from "react";

interface EditorProps {
  onSubmit: (data: { text: string; focus: string }) => void;
  loading: boolean;
}

export default function Editor({ onSubmit, loading }: EditorProps) {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState("grammar");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit({ text, focus });
      }}
      className="editor"
    >
      <label>
        Essay
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          placeholder="Paste your essay here..."
        />
      </label>

      <label className="inline">
        Feedback Focus
        <select value={focus} onChange={(e) => setFocus(e.target.value)}>
          <option value="grammar">Grammar & Spelling</option>
          <option value="structure">Structure & Flow</option>
          <option value="tone">Tone & Professionalism</option>
          <option value="all">All of the above</option>
        </select>
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Analyzing..." : "Get Feedback"}
      </button>
    </form>
  );
}
