"use client";
import { useState } from "react";
import { Input, Select, Result, Stats } from "../ui";
import { loan, displayNumber } from "@/lib/calculations";
export default function Loan() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("10");
  const [unit, setUnit] = useState("Years");
  const p = Number(principal);
  const l =
    principal.trim() && rate.trim() && term.trim()
      ? loan(p, Number(rate), Number(term) * (unit === "Years" ? 12 : 1))
      : null;
  return (
    <>
      <div className="form-grid">
        <Input
          label="Loan principal"
          type="number"
          min="1"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <Input
          label="Annual interest (%)"
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <Input
          label="Tenor"
          type="number"
          min="1"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Select
          label="Tenor unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option>Years</option>
          <option>Months</option>
        </Select>
      </div>
      <Result>
        {l ? (
          <>
            <Stats
              items={{
                "Monthly EMI": displayNumber(l.emi, 2),
                "Total interest": displayNumber(l.interest, 2),
                "Total payment": displayNumber(l.total, 2),
              }}
            />
            <svg
              role="img"
              aria-label={`Principal ${displayNumber(p, 2)}, interest ${displayNumber(l.interest, 2)}`}
              viewBox="0 0 600 48"
              className="loan-chart"
            >
              <rect width="600" height="48" rx="6" fill="#b5573b" />
              <rect
                width={(600 * p) / l.total}
                height="48"
                rx="6"
                fill="#3e4a3d"
              />
            </svg>
            <p className="chart-legend">
              <span>● Principal</span>
              <span>● Interest</span>
            </p>
            <div className="table-scroll">
              <table>
                <caption>
                  Yearly amortization · same currency as your input
                </caption>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Principal paid</th>
                    <th>Interest paid</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {l.years.map((y) => (
                    <tr key={y.year}>
                      <th>{y.year}</th>
                      <td>{displayNumber(y.principal, 2)}</td>
                      <td>{displayNumber(y.interest, 2)}</td>
                      <td>{displayNumber(y.balance, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p role="alert">
            Enter a positive principal, a nonnegative rate, and 1–1,200 whole
            months.
          </p>
        )}
      </Result>
      <p className="muted">
        Fixed rate and monthly payments assumed. Excludes fees, insurance,
        taxes, and early repayment charges. Not financial advice.
      </p>
    </>
  );
}
