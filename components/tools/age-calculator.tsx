"use client";
import { useEffect, useState } from "react";
import { Input, Result, Stats } from "../ui";
import { ageParts } from "@/lib/calculations";
export default function Age() {
  const [birth, setBirth] = useState("1995-06-15");
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => {
    setToday(new Date());
    const id = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const age = today ? ageParts(birth, today) : null;
  return (
    <>
      <Input
        label="Date of birth"
        type="date"
        min="1900-01-01"
        max={
          today
            ? `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
            : undefined
        }
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />
      <Result>
        {age ? (
          <>
            <p className="big-result">
              {age.years} years, {age.months} months, {age.days} days
            </p>
            <Stats
              items={{
                "Total days": age.total.toLocaleString(),
                "Next birthday": `${age.countdown} days`,
                "Born on a": age.weekday,
              }}
            />
          </>
        ) : (
          <p>
            {today
              ? "Choose a valid birthdate from 1900 through today."
              : "Reading your local date…"}
          </p>
        )}
      </Result>
      <p className="muted">
        February 29 birthdays use February 28 in non-leap years. Legal
        conventions may differ.
      </p>
    </>
  );
}
