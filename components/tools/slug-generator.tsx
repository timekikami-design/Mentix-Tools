"use client";
import { useState } from "react";
import { Input, Select, Toggle, CopyButton, Result } from "../ui";
import { makeSlug } from "@/lib/calculations";
export default function Slug() {
  const [text, setText] = useState(
    "A better way to work, one little tool at a time",
  );
  const [lower, setLower] = useState(true);
  const [stop, setStop] = useState(false);
  const [max, setMax] = useState("80");
  const [sep, setSep] = useState("-");
  const output = makeSlug(
    text,
    lower,
    stop,
    Math.max(1, Math.min(500, Number(max) || 80)),
    sep,
  );
  return (
    <>
      <Input
        label="Title"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="form-grid">
        <Input
          label="Maximum length"
          type="number"
          min="1"
          max="500"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <Select
          label="Separator"
          value={sep}
          onChange={(e) => setSep(e.target.value)}
        >
          <option value="-">Hyphen (-)</option>
          <option value="_">Underscore (_)</option>
        </Select>
      </div>
      <div className="actions">
        <Toggle label="Lowercase" checked={lower} onChange={setLower} />
        <Toggle label="Remove stop words" checked={stop} onChange={setStop} />
      </div>
      <Result>
        <pre>{output}</pre>
        <CopyButton text={output} />
      </Result>
    </>
  );
}
