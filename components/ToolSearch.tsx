"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { tools } from "@/lib/tools";
export default function ToolSearch() {
  const [query, setQuery] = useState("");
  const found = query.trim()
    ? tools
        .filter((t) =>
          (t.name + " " + t.keywords.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 5)
    : [];
  return (
    <div className="hero-search">
      <form action="/tools/" role="search">
        <Search size={20} />
        <label className="sr-only" htmlFor="home-search">
          Find a tool
        </label>
        <input
          id="home-search"
          name="q"
          autoComplete="off"
          placeholder="What do you need a hand with?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search all tools">
          <ArrowUpRight size={22} />
        </button>
      </form>
      {query && (
        <div className="search-suggestions">
          {found.length ? (
            found.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}/`}>
                {t.name}
                <ArrowUpRight size={16} />
              </Link>
            ))
          ) : (
            <p>No exact match. Try “image” or “PDF”.</p>
          )}
        </div>
      )}
      <p>
        Try <Link href="/tools/image-compressor/">compress an image</Link>,{" "}
        <Link href="/tools/word-counter/">count words</Link>, or{" "}
        <Link href="/tools/pdf-merge/">merge PDFs</Link>
      </p>
    </div>
  );
}
