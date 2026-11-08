"use client";
import { useState } from "react";
import { Tabs, Input, Result } from "../ui";
export default function BMI() {
  const [mode, setMode] = useState("Metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const kg = Number(weight) * (mode === "Imperial" ? 0.45359237 : 1),
    meters = Number(height) * (mode === "Imperial" ? 0.0254 : 0.01);
  const bmi = kg / (meters * meters);
  const valid =
    weight.trim() &&
    height.trim() &&
    kg > 0 &&
    meters > 0 &&
    Number.isFinite(bmi);
  const label =
    bmi < 18.5
      ? "Underweight"
      : bmi < 25
        ? "Healthy range"
        : bmi < 30
          ? "Overweight"
          : "Obesity range";
  return (
    <>
      <Tabs
        options={["Metric", "Imperial"]}
        value={mode}
        onChange={(v) => {
          setMode(v);
          setWeight(v === "Metric" ? "70" : "154");
          setHeight(v === "Metric" ? "175" : "69");
        }}
      />
      <div className="form-grid">
        <Input
          label={`Weight (${mode === "Metric" ? "kg" : "lb"})`}
          type="number"
          min="0.1"
          step="any"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Input
          label={`Height (${mode === "Metric" ? "cm" : "inches"})`}
          type="number"
          min="1"
          step="any"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <Result>
        {valid ? (
          <>
            <p className="big-result">{bmi.toFixed(1)}</p>
            <h2>{label}</h2>
            <div className="bmi-scale">
              <span>Under 18.5</span>
              <span>18.5–24.9</span>
              <span>25–29.9</span>
              <span>30+</span>
            </div>
            <p>Adult screening categories. BMI = weight (kg) ÷ height² (m).</p>
          </>
        ) : (
          <p role="alert">Enter a positive weight and height.</p>
        )}
      </Result>
      <p className="notice">
        A general guide, not medical advice. Not intended for children,
        pregnancy, or individual diagnosis. Speak to a qualified clinician about
        your health.
      </p>
    </>
  );
}
