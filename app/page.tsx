"use client";

import { useState } from "react";

export default function Home() {
  const quotes = [
    "The best way to get started is to quit talking and begin doing. – Walt Disney",
    "Don’t let yesterday take up too much of today. – Will Rogers",
    "It’s not whether you get knocked down, it’s whether you get up. – Vince Lombardi",
    "If you are working on something exciting, it will keep you motivated. – Steve Jobs",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  ];

  // Declare a state variable called "quote" and a function "setQuote" to update it.
  // Initialize it with the first item from the "quotes" array.
  const [quote, setQuote] = useState(quotes[0]);

  // Define a function that selects a random quote from the list.
  const generateQuote = () => {
    // Generate a random index number between 0 and (quotes.length - 1)
    const randomIndex = Math.floor(Math.random() * quotes.length);

    // Update the "quote" state with the randomly selected quote.
    // This automatically triggers a re-render, showing the new quote in the UI.
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-10 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          Quote Generator
        </h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300 italic mb-10 transition-all duration-300">
          “{quote}”
        </p>
        <button
          onClick={generateQuote}
          className="rounded-full bg-black text-white dark:bg-white dark:text-black px-6 py-3 text-lg font-medium hover:opacity-80 transition-all"
        >
          New Quote
        </button>
      </main>
    </div>
  );
}
