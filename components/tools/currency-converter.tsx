"use client";
import { useState } from "react";
import { Input, Select, Button, Toast, Result } from "../ui";
import { displayNumber } from "@/lib/calculations";
type Rates = { date: string; rates: Record<string, number> };
const cache = new Map<string, Rates>();
const codes = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];
export default function Currency() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [out, setOut] = useState<{ rate: number; date: string } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const convert = async () => {
    setError("");
    setOut(null);
    if (!amount.trim() || !Number.isFinite(Number(amount))) {
      setError("Enter a valid amount.");
      return;
    }
    if (from === to) {
      setOut({ rate: 1, date: "Same currency — no exchange needed" });
      return;
    }
    setBusy(true);
    try {
      let data = cache.get(from);
      if (!data) {
        const response = await fetch(
          `https://api.frankfurter.app/latest?from=${from}`,
          { signal: AbortSignal.timeout(12000), credentials: "omit" },
        );
        if (!response.ok) throw new Error();
        const json: unknown = await response.json();
        if (
          typeof json !== "object" ||
          json === null ||
          !("rates" in json) ||
          !("date" in json)
        )
          throw new Error();
        data = json as Rates;
        cache.set(from, data);
      }
      const rate = data.rates[to];
      if (!Number.isFinite(rate)) throw new Error();
      setOut({ rate, date: data.date });
    } catch {
      setError(
        "Reference rates are unavailable right now. Check your connection or try again. No invented or fallback rate is shown.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setOut(null);
        }}
      />
      <div className="form-grid">
        <Select
          label="From currency"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            setOut(null);
          }}
        >
          {codes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Select
          label="To currency"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            setOut(null);
          }}
        >
          {codes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>
      <Button disabled={busy} onClick={convert}>
        {busy ? "Fetching reference rate…" : "Convert currency"}
      </Button>
      <Toast error message={error} />
      {out && (
        <Result>
          <p className="big-result">
            {displayNumber(Number(amount) * out.rate, 2)} {to}
          </p>
          <p>
            1 {from} = {displayNumber(out.rate)} {to}
          </p>
          <small>Rate date: {out.date} · Frankfurter</small>
        </Result>
      )}
      <p className="muted">
        Reference rates, not trading quotes. Provider fees are not included.
        Only currency codes leave your browser; the amount stays local.
      </p>
    </>
  );
}
