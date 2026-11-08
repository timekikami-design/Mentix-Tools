"use client";
import { useState } from "react";
import { Input, Select, Result } from "../ui";
import { displayNumber } from "@/lib/calculations";
export default function Percentage() {
  const [mode, setMode] = useState("X% of Y");
  const [x, setX] = useState("20");
  const [y, setY] = useState("150");
  const a = Number(x),
    b = Number(y);
  const valid = x.trim() && y.trim() && Number.isFinite(a + b);
  const result =
    mode === "X% of Y"
      ? (a * b) / 100
      : mode === "X is what % of Y"
        ? (a / b) * 100
        : ((b - a) / Math.abs(a)) * 100;
  const zero =
    mode === "X is what % of Y"
      ? b === 0
      : mode === "Percentage change"
        ? a === 0
        : false;
  const formula =
    mode === "X% of Y"
      ? `${x} ÷ 100 × ${y}`
      : mode === "X is what % of Y"
        ? `${x} ÷ ${y} × 100`
        : `(${y} − ${x}) ÷ |${x}| × 100`;
  return (
    <>
      <Select
        label="Calculation"
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        {["X% of Y", "X is what % of Y", "Percentage change"].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <div className="form-grid">
        <Input
          label={mode === "Percentage change" ? "Starting value (X)" : "X"}
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <Input
          label={mode === "Percentage change" ? "Ending value (Y)" : "Y"}
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>
      <Result>
        {!valid || zero ? (
          <p role="alert">
            {zero
              ? "The reference value is zero, so this percentage is undefined."
              : "Enter two finite numbers."}
          </p>
        ) : (
          <>
            <p className="big-result">
              {displayNumber(result)}
              {mode !== "X% of Y" ? "%" : ""}
            </p>
            <code>{formula}</code>
            {mode === "Percentage change" && a < 0 && (
              <p>
                Uses the absolute starting value as the denominator. Interpret
                changes from a negative baseline carefully.
              </p>
            )}
          </>
        )}
      </Result>
    </>
  );
}
