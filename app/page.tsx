"use client";

import { useState } from "react";

export default function Home() {
  // Stores the fetched quote text
  const [quote, setQuote] = useState("");
  // Stores the author of the current quote
  const [author, setAuthor] = useState("");
  // Indicates whether the quote is currently being fetched
  const [loading, setLoading] = useState(false);
  // Stores error messages for display
  const [error, setError] = useState("");

  // Fetches a quote from the API endpoint
  const fetchQuote = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api");
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      // Only update state if at least one quote is returned
      if (data.length > 0) {
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      } else {
        setError("No quote found.");
      }
    } catch (err) {
      // Handles network or API errors
      setError("Failed to fetch quote.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    // Full-screen animated gradient background container
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_#7e22ce,_#db2777,_#eab308,_#2563eb)] bg-[length:200%_200%] animate-gradientMove transition-colors duration-700 font-sans">
      {/* Main card container */}
      <main className="relative flex flex-col items-center justify-center w-full max-w-2xl p-10 backdrop-blur-2xl bg-white/10 dark:bg-black/30 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.1)] border border-white/20 text-center overflow-hidden">

        {/* Soft glowing overlay for visual effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-fuchsia-500 via-purple-400 to-yellow-300 text-transparent bg-clip-text drop-shadow-sm">
          Quote Generator
        </h1>

        {/* Decorative separator */}
        <div className="w-24 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-400 to-yellow-300 rounded-full mb-8 animate-pulse" />

        {/* Error message, shown only when an error exists */}
        {error && (
          <p className="text-red-400 mb-4 animate-pulse">{error}</p>
        )}

        {/* Quote display section */}
        {loading ? (
          // Loading indicator text
          <p className="text-lg text-zinc-200 italic mb-10 animate-pulse">
            Gathering words of wisdom...
          </p>
        ) : quote ? (
          // Displayed when a quote exists
          <div className="transition-all duration-500 transform hover:scale-[1.02]">
            <p className="text-2xl text-white/90 italic mb-4 leading-relaxed drop-shadow-sm">
              “{quote}”
            </p>

            {/* Author is shown only if available */}
            {author && (
              <p className="text-md text-white/70 mb-10">— {author}</p>
            )}
          </div>
        ) : (
          // Shown before any quote is fetched
          <p className="text-lg text-white/70 italic mb-10">
            Click below to reveal some inspiration
          </p>
        )}

        {/* Button that triggers the quote fetch */}
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-yellow-400 text-white px-8 py-3 text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          {loading ? (
            // Loading spinner inside the button
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Fetching...</span>
            </>
          ) : (
            // Normal button state
            <>
              <span>New Quote</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </button>
      </main>
    </div>
  );
}
