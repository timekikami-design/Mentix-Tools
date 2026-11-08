"use client";
import { useEffect, useState } from "react";
import { Input, Textarea, Select, Toggle, Toast, Result } from "../ui";
type Match = {
  index: number;
  text: string;
  groups: (string | null)[];
  named: Record<string, string>;
};
const presets: Record<string, string> = {
  Email: "[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,}",
  URL: "https?:\\/\\/[^\\s]+",
  Phone: "\\+?[\\d][\\d ()-]{6,}[\\d]",
  Date: "\\b\\d{4}-\\d{2}-\\d{2}\\b",
  "Hex color": "#(?:[a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b",
};
export default function Regex() {
  const [pattern, setPattern] = useState(presets.Email);
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Write to hello@example.com or team@mentix-tools.dev.",
  );
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    setMatches([]);
    if (!pattern) return;
    const worker = new Worker(
      new URL("../../lib/regex.worker.ts", import.meta.url),
    );
    const timer = setTimeout(() => {
      worker.terminate();
      setError(
        "This pattern took too long. Simplify it to avoid excessive backtracking.",
      );
    }, 1500);
    worker.onmessage = (
      e: MessageEvent<{ matches?: Match[]; error?: string }>,
    ) => {
      clearTimeout(timer);
      setMatches(e.data.matches || []);
      setError(e.data.error || "");
      worker.terminate();
    };
    worker.onerror = () => {
      clearTimeout(timer);
      setError("Pattern worker could not start. Please refresh.");
    };
    worker.postMessage({ pattern, flags, text });
    return () => {
      clearTimeout(timer);
      worker.terminate();
    };
  }, [pattern, flags, text]);
  let last = 0;
  const highlighted = matches.map((m, i) => {
    const before = text.slice(last, m.index);
    last = m.index + m.text.length;
    return (
      <span key={i}>
        {before}
        <mark>{m.text || "∅"}</mark>
      </span>
    );
  });
  return (
    <>
      <Select
        label="Try a common pattern"
        defaultValue="Email"
        onChange={(e) => setPattern(presets[e.target.value])}
      >
        {Object.keys(presets).map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Input
        label="Pattern (without / delimiters)"
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />
      <div className="actions">
        {["g", "i", "m", "s", "u"].map((f) => (
          <Toggle
            key={f}
            label={f}
            checked={flags.includes(f)}
            onChange={(v) => setFlags(v ? flags + f : flags.replace(f, ""))}
          />
        ))}
      </div>
      <Textarea
        label="Test string"
        maxLength={50000}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Toast error message={error} />
      <Result label={`${matches.length} matches (maximum 2,000)`}>
        <pre>
          {highlighted}
          {text.slice(last)}
        </pre>
        {matches.some((m) => m.groups.length > 0) && (
          <pre>
            {JSON.stringify(
              matches.map((m) => ({
                match: m.text,
                groups: m.groups,
                named: m.named,
              })),
              null,
              2,
            )}
          </pre>
        )}
      </Result>
    </>
  );
}
