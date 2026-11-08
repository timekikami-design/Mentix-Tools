"use client";
import { useState } from "react";
import { Textarea, Select, Result, CopyButton } from "../ui";
export default function CaseConverter() {
  const [text, setText] = useState("A little change makes a big difference");
  const [mode, setMode] = useState("Title Case");
  const words =
    text.replace(/([a-z])([A-Z])/g, "$1 $2").match(/[\p{L}\p{N}]+/gu) || [];
  const lower = words.map((w) => w.toLowerCase());
  const title = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
  const output =
    mode === "UPPERCASE"
      ? text.toUpperCase()
      : mode === "lowercase"
        ? text.toLowerCase()
        : mode === "Title Case"
          ? text
              .toLowerCase()
              .replace(
                /(^|[^\p{L}\p{N}])([\p{L}])/gu,
                (_, a: string, b: string) => a + b.toUpperCase(),
              )
          : mode === "Sentence case"
            ? text
                .toLowerCase()
                .replace(
                  /(^\s*|[.!?]\s+)([\p{L}])/gu,
                  (_, a: string, b: string) => a + b.toUpperCase(),
                )
            : mode === "camelCase"
              ? lower.map((w, i) => (i ? title(w) : w)).join("")
              : lower.join(mode === "snake_case" ? "_" : "-");
  return (
    <>
      <Textarea
        label="Your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Select
        label="Convert to"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        {[
          "UPPERCASE",
          "lowercase",
          "Title Case",
          "Sentence case",
          "camelCase",
          "snake_case",
          "kebab-case",
        ].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Result>
        <pre>{output}</pre>
        <CopyButton text={output} />
      </Result>
    </>
  );
}
