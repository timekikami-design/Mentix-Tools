"use client";
import { useState } from "react";
import { Input, Select, Result, CopyButton } from "../ui";
import { units, displayNumber } from "@/lib/calculations";
export default function Unit() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("Meters");
  const [to, setTo] = useState("Feet");
  const [value, setValue] = useState("1");
  const opts = Object.keys(units[category]);
  const result = (Number(value) * units[category][from]) / units[category][to];
  const output =
    value.trim() && Number.isFinite(result)
      ? `${displayNumber(result, 10)} ${to}`
      : "Enter a finite value.";
  return (
    <>
      <Select
        label="Measurement"
        value={category}
        onChange={(e) => {
          const c = e.target.value;
          setCategory(c);
          const o = Object.keys(units[c]);
          setFrom(o[0]);
          setTo(o[1]);
        }}
      >
        {Object.keys(units).map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
      <Input
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="form-grid">
        <Select
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {opts.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </Select>
        <Select label="To" value={to} onChange={(e) => setTo(e.target.value)}>
          {opts.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </Select>
      </div>
      <Result>
        <p className="big-result">{output}</p>
        <CopyButton text={output} />
      </Result>
      <p className="muted">
        Volume uses US customary units. KB/MB/GB are decimal; KiB/MiB/GiB are
        binary.
      </p>
    </>
  );
}
