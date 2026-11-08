"use client";
import { useState } from "react";
import { Input, Select, Toggle, Result, CopyButton } from "../ui";
const source =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
    " ",
  );
export default function Lorem() {
  const [count, setCount] = useState("3");
  const [unit, setUnit] = useState("Paragraphs");
  const [start, setStart] = useState(true);
  const n = Math.min(
    unit === "Words" ? 10000 : unit === "Sentences" ? 500 : 100,
    Math.max(1, Number(count) || 1),
  );
  const sentence = (i: number) => {
    const words = Array.from(
      { length: 18 },
      (_, j) => source[(i * 18 + j + (start ? 0 : 8)) % source.length],
    );
    return words.join(" ").replace(/^./, (s) => s.toUpperCase()) + ".";
  };
  const output =
    unit === "Words"
      ? Array.from(
          { length: n },
          (_, i) => source[(i + (start ? 0 : 8)) % source.length],
        ).join(" ")
      : unit === "Sentences"
        ? Array.from({ length: n }, (_, i) => sentence(i)).join(" ")
        : Array.from({ length: n }, (_, i) =>
            Array.from({ length: 4 }, (_, j) => sentence(i * 4 + j)).join(" "),
          ).join("\n\n");
  return (
    <>
      <div className="form-grid">
        <Input
          label="Count"
          type="number"
          min="1"
          max={unit === "Words" ? 10000 : unit === "Sentences" ? 500 : 100}
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <Select
          label="Generate"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {["Paragraphs", "Sentences", "Words"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
      </div>
      <Toggle
        label={"Start with “Lorem ipsum”"}
        checked={start}
        onChange={setStart}
      />
      <Result>
        <pre>{output}</pre>
        <CopyButton text={output} />
      </Result>
    </>
  );
}
