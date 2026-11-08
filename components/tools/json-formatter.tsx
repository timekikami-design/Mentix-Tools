"use client";
import { useState } from "react";
import {
  Textarea,
  Select,
  Button,
  CopyButton,
  Result,
  Toast,
  download,
} from "../ui";
export default function JsonFormatter() {
  const [text, setText] = useState(
    '{"project":"Mentix Tools","free":true,"tools":["text","images","pdf"]}',
  );
  const [indent, setIndent] = useState("2");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const run = (mode: string) => {
    try {
      const parsed: unknown = JSON.parse(text);
      const result = JSON.stringify(
        parsed,
        null,
        mode === "Minify"
          ? undefined
          : indent === "tab"
            ? "\t"
            : Number(indent),
      );
      setOut(result);
      setError("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const m = msg.match(/position (\d+)/);
      const pos = m ? Number(m[1]) : text.length;
      const before = text.slice(0, pos);
      const line = before.split("\n").length;
      const column = pos - before.lastIndexOf("\n");
      setError(`${msg} (line ${line}, column ${column})`);
      setOut("");
    }
  };
  return (
    <>
      <Textarea
        label="JSON input"
        className="mono"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setOut("");
          setError("");
        }}
      />
      <Select
        label="Indentation"
        value={indent}
        onChange={(e) => setIndent(e.target.value)}
      >
        <option value="2">2 spaces</option>
        <option value="4">4 spaces</option>
        <option value="tab">Tab</option>
      </Select>
      <div className="actions">
        <Button onClick={() => run("Format")}>Format JSON</Button>
        <Button secondary onClick={() => run("Minify")}>
          Minify
        </Button>
        <Button secondary onClick={() => run("Validate")}>
          Validate
        </Button>
      </div>
      <Toast error message={error} />
      {out && (
        <Result label="Valid JSON">
          <pre>{out}</pre>
          <div className="actions">
            <CopyButton text={out} />
            <Button
              secondary
              onClick={() =>
                download(
                  new Blob([out], { type: "application/json" }),
                  "formatted.json",
                )
              }
            >
              Download JSON
            </Button>
          </div>
        </Result>
      )}
    </>
  );
}
