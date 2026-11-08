"use client";
import { useState } from "react";
import { Input, CopyButton, Result } from "../ui";
export default function Color() {
  const [hex, setHex] = useState("#b5573b");
  const valid = /^#[0-9a-f]{6}$/i.test(hex);
  const [r, g, b] = valid
    ? [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
    : [181, 87, 59];
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255,
    max = Math.max(rn, gn, bn),
    min = Math.min(rn, gn, bn),
    delta = max - min;
  const light = (max + min) / 2;
  let hue = 0;
  if (delta)
    hue =
      max === rn
        ? ((gn - bn) / delta) % 6
        : max === gn
          ? (bn - rn) / delta + 2
          : (rn - gn) / delta + 4;
  hue = (hue * 60 + 360) % 360;
  const sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));
  const k = 1 - max;
  const c = k === 1 ? 0 : (1 - rn - k) / (1 - k),
    m = k === 1 ? 0 : (1 - gn - k) / (1 - k),
    y = k === 1 ? 0 : (1 - bn - k) / (1 - k);
  const values = {
    HEX: valid ? hex.toUpperCase() : "#B5573B",
    RGB: `rgb(${r}, ${g}, ${b})`,
    HSL: `hsl(${Math.round(hue)}, ${Math.round(sat * 100)}%, ${Math.round(light * 100)}%)`,
    CMYK: `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`,
  };
  return (
    <>
      <div className="form-grid">
        <Input
          label="Pick a color"
          type="color"
          value={valid ? hex : "#b5573b"}
          onChange={(e) => setHex(e.target.value)}
        />
        <Input
          label="HEX (six digits)"
          value={hex}
          maxLength={7}
          onChange={(e) => setHex(e.target.value)}
        />
      </div>
      {!valid && (
        <p role="alert">Enter a six-digit HEX color, such as #B5573B.</p>
      )}
      <div
        className="color-preview"
        style={{ background: valid ? hex : "#b5573b" }}
        role="img"
        aria-label="Selected color"
      />
      <Result>
        {Object.entries(values).map(([label, v]) => (
          <div className="copy-row" key={label}>
            <div>
              <small>{label}</small>
              <code>{v}</code>
            </div>
            <CopyButton text={v} />
          </div>
        ))}
      </Result>
      <h2>Five shades</h2>
      <div className="swatches">
        {[15, 30, 45, 60, 75].map((l) => {
          const v = `hsl(${Math.round(hue)}, ${Math.round(sat * 100)}%, ${l}%)`;
          return (
            <button
              key={l}
              className="swatch"
              style={{ background: v, color: l < 50 ? "#fff" : "#1f1f1f" }}
              onClick={() => {
                const a = sat * Math.min(l / 100, 1 - l / 100);
                const channel = (n: number) => {
                  const k = (n + hue / 30) % 12;
                  return Math.round(
                    255 *
                      (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))),
                  )
                    .toString(16)
                    .padStart(2, "0");
                };
                setHex("#" + channel(0) + channel(8) + channel(4));
              }}
              aria-label={`Select shade at ${l}% lightness`}
            >
              {l}%
            </button>
          );
        })}
      </div>
      <h2>Complementary color</h2>
      <div className="copy-row">
        <span
          className="color-dot"
          style={{
            background: `hsl(${(hue + 180) % 360}, ${sat * 100}%, ${light * 100}%)`,
          }}
        />
        <CopyButton
          text={`hsl(${Math.round((hue + 180) % 360)}, ${Math.round(sat * 100)}%, ${Math.round(light * 100)}%)`}
        />
      </div>
      <p className="muted">
        CMYK is an approximation, not a color-managed print proof.
      </p>
    </>
  );
}
