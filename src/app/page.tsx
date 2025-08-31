"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!essay.trim()) {
      setFeedback("⚠️ Please paste or write your essay first.");
      return;
    }

    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3-2:latest",
          prompt: `You are an essay evaluation assistant. Analyze the following essay and provide constructive feedback in bullet points:\n\n${essay}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch feedback from Ollama");
      }

      const data = await response.json();
      setFeedback(data.response.trim());
    } catch (error) {
      console.error(error);
      setFeedback("❌ Error: Unable to get feedback. Make sure Ollama is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <motion.h1
          className="text-5xl font-extrabold text-blue-800 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Essay Feedback Tool
        </motion.h1>
        <p className="text-gray-700 mt-3 text-lg">
          Paste your essay and get instant, AI-powered feedback.
        </p>
      </header>

      {/* Input Area */}
      <motion.div
        className="w-full max-w-5xl bg-black rounded-2xl shadow-xl p-6 border border-gray-200"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <textarea
          className="w-full h-64 p-4 text-lg border rounded-xl resize-none focus:ring-4 focus:ring-blue-400 focus:outline-none"
          placeholder="Paste or type your essay here..."
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
        ></textarea>

        {/* Analyze Button with animation */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={22} /> Analyzing...
            </>
          ) : (
            <>
              <Send size={22} /> Get Feedback
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Feedback Display */}
      {feedback && (
        <motion.div
          className="w-full max-w-5xl mt-8 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-3">
            Your Feedback
          </h2>
          <pre className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed">{feedback}</pre>
        </motion.div>
      )}
    </main>
  );
}
