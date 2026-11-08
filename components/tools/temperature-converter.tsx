"use client";
import { useState } from "react";
import { Input, Select, Result } from "../ui";
import { displayNumber } from "@/lib/calculations";
export default function Temperature() {
  const [value, setValue] = useState("20");
  const [from, setFrom] = useState("Celsius");
  const [to, setTo] = useState("Fahrenheit");
  const n = Number(value);
  const c =
    from === "Celsius"
      ? n
      : from === "Fahrenheit"
        ? ((n - 32) * 5) / 9
        : n - 273.15;
  const result =
    to === "Celsius" ? c : to === "Fahrenheit" ? (c * 9) / 5 + 32 : c + 273.15;
  const formulas: Record<string, string> = {
    "Celsius-Fahrenheit": "°F = °C × 9/5 + 32",
    "Fahrenheit-Celsius": "°C = (°F − 32) × 5/9",
    "Celsius-Kelvin": "K = °C + 273.15",
    "Kelvin-Celsius": "°C = K − 273.15",
    "Fahrenheit-Kelvin": "K = (°F − 32) × 5/9 + 273.15",
    "Kelvin-Fahrenheit": "°F = (K − 273.15) × 9/5 + 32",
  };
  const valid = value.trim() && Number.isFinite(result) && c >= -273.15;
  return (
    <>
      <Input
        label="Temperature"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="form-grid">
        <Select
          label="From scale"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {["Celsius", "Fahrenheit", "Kelvin"].map((u) => (
            <option key={u}>{u}</option>
          ))}
        </Select>
        <Select
          label="To scale"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {["Celsius", "Fahrenheit", "Kelvin"].map((u) => (
            <option key={u}>{u}</option>
          ))}
        </Select>
      </div>
      <Result>
        {valid ? (
          <>
            <p className="big-result">
              {displayNumber(result)}{" "}
              {to === "Kelvin" ? "K" : to === "Celsius" ? "°C" : "°F"}
            </p>
            <code>
              {formulas[`${from}-${to}`] || "Same scale: output = input"}
            </code>
          </>
        ) : (
          <p role="alert">
            Enter a finite temperature at or above absolute zero (−273.15 °C).
          </p>
        )}
      </Result>
    </>
  );
}
