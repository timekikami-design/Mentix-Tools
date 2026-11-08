"use client";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { tools, categories } from "@/lib/tools";
import ToolCard from "./ToolCard";
export default function ToolDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All tools");
  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") || "");
  }, []);
  const results = tools
    .filter(
      (t) =>
        (category === "All tools" || t.category === category) &&
        (t.name + " " + t.description + " " + t.keywords.join(" "))
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <div className="directory-search">
        <Search size={20} />
        <label htmlFor="directory-search" className="sr-only">
          Search tools
        </label>
        <input
          id="directory-search"
          placeholder="Search by name or what you want to do…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={18} />
          </button>
        )}
        <span>⌕</span>
      </div>
      <div className="filter-bar" role="group" aria-label="Filter by category">
        {["All tools", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="directory-count" role="status">
        <span>
          {results.length} useful {results.length === 1 ? "tool" : "tools"}
        </span>
        <span>Sorted A–Z</span>
      </div>
      {results.length ? (
        <div className="tools-grid">
          {results.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <h2>No tools found</h2>
          <p>Try a shorter search, or choose another category.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All tools");
            }}
          >
            Show all tools
          </button>
        </section>
      )}
    </>
  );
}
