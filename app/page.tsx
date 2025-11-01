"use client";

import { useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch quote from API Ninjas
  const fetchQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api");

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      if (data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        setError("No quote found.");
      }
    } catch (err) {
      setError("Failed to fetch quote.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          Quote Generator
        </h1>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-lg text-zinc-500 italic mb-10">Loading...</p>
        ) : quote ? (
          <p className="text-xl text-zinc-700 dark:text-zinc-300 italic mb-2 transition-all duration-300">
            “{quote}”
          </p>
        ) : (
          <p className="text-lg text-zinc-500 italic mb-10">
            Click the button to get a quote!
          </p>
        )}

        {author && (
          <p className="text-md text-zinc-600 dark:text-zinc-400 mb-10">
            — {author}
          </p>
        )}

        <button
          onClick={fetchQuote}
          disabled={loading}
          className="rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-lg font-medium hover:opacity-80 transition-all disabled:opacity-50"
        >
          {loading ? "Fetching..." : "New Quote"}
        </button>
      </main>
    </div>
  );
}
