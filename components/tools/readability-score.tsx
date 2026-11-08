"use client";
import { useState } from "react";
import { Textarea, Stats, Result } from "../ui";
import { readability } from "@/lib/calculations";
export default function Readability() {
  const [text, setText] = useState(
    "Good writing makes a clear point. Keep your sentences short. Choose words your reader knows. A little care goes a long way.",
  );
  const r = readability(text);
  const label = !r
    ? "Add some text"
    : r.ease >= 80
      ? "Easy to read"
      : r.ease >= 60
        ? "Plain English"
        : r.ease >= 30
          ? "Fairly difficult"
          : "Very difficult";
  return (
    <>
      <Textarea
        label="English text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Result>
        <h2>{label}</h2>
        <meter
          min="0"
          max="100"
          value={r ? Math.max(0, Math.min(100, r.ease)) : 0}
          aria-label="Flesch Reading Ease"
        />
        {r && (
          <Stats
            items={{
              "Flesch Reading Ease": r.ease.toFixed(1),
              "Flesch-Kincaid grade": Math.max(0, r.grade).toFixed(1),
              Syllables: r.syllables,
            }}
          />
        )}
        <p>
          English syllables are estimated with a pronunciation-rule algorithm.
          Names, abbreviations, and unusual words may differ. Scores are
          guidance, not an editorial judgment.
        </p>
      </Result>
    </>
  );
}
