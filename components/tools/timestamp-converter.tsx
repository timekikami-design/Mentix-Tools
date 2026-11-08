"use client";
import { useEffect, useState } from "react";
import { Input, Select, Result, CopyButton, Stats } from "../ui";
export default function Timestamp() {
  const [now, setNow] = useState<number | null>(null);
  const [value, setValue] = useState("1735689600");
  const [unit, setUnit] = useState("Seconds");
  const [date, setDate] = useState("2025-01-01T12:00");
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const d = new Date(Number(value) * (unit === "Seconds" ? 1000 : 1));
  const valid = value.trim() !== "" && Number.isFinite(d.getTime());
  const reverse = new Date(date);
  return (
    <>
      <section className="live-clock">
        <span className="status-dot" /> Current Unix seconds{" "}
        <strong>{now ? Math.floor(now / 1000) : "—"}</strong>
      </section>
      <div className="form-grid">
        <Input
          label="Unix timestamp"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Select
          label="Input unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option>Seconds</option>
          <option>Milliseconds</option>
        </Select>
      </div>
      <Result>
        {valid ? (
          <>
            <p>
              <strong>UTC:</strong> {d.toISOString()}
            </p>
            <p>
              <strong>Local:</strong>{" "}
              {now ? d.toString() : "Loading your time zone…"}
            </p>
            <CopyButton text={d.toISOString()} />
          </>
        ) : (
          <p role="alert">
            Enter a valid timestamp within the supported date range.
          </p>
        )}
      </Result>
      <Input
        label="Convert a local date to Unix time"
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {now && date && Number.isFinite(reverse.getTime()) && (
        <Stats
          items={{
            Seconds: Math.floor(reverse.getTime() / 1000),
            Milliseconds: reverse.getTime(),
          }}
        />
      )}
      <p className="muted">
        The date picker uses your local time zone. A local time during a
        daylight saving transition may be adjusted by your browser.
      </p>
    </>
  );
}
