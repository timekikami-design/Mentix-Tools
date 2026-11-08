"use client";
import { useState, useEffect } from "react";
import { Slider, Toggle, Button, CopyButton, Result, Toast } from "../ui";
const alphabets: Record<string, string> = {
  Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Lowercase: "abcdefghijklmnopqrstuvwxyz",
  Numbers: "0123456789",
  Symbols: "!@#$%^&*()-_=+[]{};:,.?/~",
};
export default function Password() {
  const [length, setLength] = useState(20);
  const [enabled, setEnabled] = useState<string[]>([
    "Uppercase",
    "Lowercase",
    "Numbers",
    "Symbols",
  ]);
  const [exclude, setExclude] = useState(false);
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const groups = enabled.map((k) =>
    exclude ? alphabets[k].replace(/[O0oIl1|]/g, "") : alphabets[k],
  );
  const alphabet = groups.join("");
  const entropy = alphabet ? length * Math.log2(alphabet.length) : 0;
  const generate = () => {
    if (!groups.length) {
      setError("Select at least one character group.");
      setOut("");
      return;
    }
    const random = (n: number) => {
      const a = new Uint32Array(1);
      const limit = Math.floor(4294967296 / n) * n;
      do {
        crypto.getRandomValues(a);
      } while (a[0] >= limit);
      return a[0] % n;
    };
    let p = ""; // Rejection sampling keeps the distribution uniform among passwords meeting category rules.
    do {
      p = Array.from({ length }, () => alphabet[random(alphabet.length)]).join(
        "",
      );
    } while (!groups.every((g) => [...p].some((c) => g.includes(c))));
    setOut(p);
    setError("");
  };
  useEffect(() => {
    generate();
  }, []);
  return (
    <>
      <Slider
        label="Length"
        min="8"
        max="64"
        value={length}
        onChange={(e) => {
          setLength(Number(e.target.value));
          setOut("");
        }}
      />
      <div className="form-grid">
        {Object.keys(alphabets).map((k) => (
          <Toggle
            key={k}
            label={k}
            checked={enabled.includes(k)}
            onChange={(v) => {
              setEnabled(v ? [...enabled, k] : enabled.filter((x) => x !== k));
              setOut("");
            }}
          />
        ))}
      </div>
      <Toggle
        label="Exclude ambiguous characters (O, 0, l, I, 1)"
        checked={exclude}
        onChange={(v) => {
          setExclude(v);
          setOut("");
        }}
      />
      <Button onClick={generate}>Generate password</Button>
      <Toast error message={error} />
      {out && (
        <Result>
          <pre className="password-output">{out}</pre>
          <CopyButton text={out} />
          <meter
            min="0"
            max="128"
            value={Math.min(128, entropy)}
            aria-label="Password strength"
          />
          <p>
            {entropy.toFixed(0)} bits estimated ·{" "}
            {entropy >= 80
              ? "Strong"
              : entropy >= 60
                ? "Moderate"
                : "Use a longer password"}
          </p>
        </Result>
      )}
      <p className="muted">
        Generated with crypto.getRandomValues. Not stored or sent anywhere.
        Clipboard contents are outside this page’s control.
      </p>
    </>
  );
}
