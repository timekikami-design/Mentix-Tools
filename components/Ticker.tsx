"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
export default function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="ticker" aria-label="Less busywork. More momentum.">
      <div
        className="ticker-track"
        aria-hidden="true"
        style={{ animationPlayState: paused ? "paused" : undefined }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            LESS BUSYWORK <span>↗</span> MORE MOMENTUM <span>✳</span>
          </span>
        ))}
      </div>
      <button
        className="ticker-toggle"
        type="button"
        aria-label={paused ? "Resume scrolling text" : "Pause scrolling text"}
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
    </section>
  );
}
