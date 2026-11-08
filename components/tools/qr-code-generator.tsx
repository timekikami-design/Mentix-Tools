"use client";
import { useEffect, useState } from "react";
import { Textarea, Input, Select, Button, Toast, download } from "../ui";
export default function QR() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState("512");
  const [fg, setFg] = useState("#1f1f1f");
  const [bg, setBg] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [png, setPng] = useState("");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    setPng("");
    setSvg("");
    setError("");
    const timer = setTimeout(async () => {
      try {
        if (!text) throw new Error("Enter text or a URL.");
        if (Number(size) < 128 || Number(size) > 2048)
          throw new Error("Choose a size from 128 to 2,048 pixels.");
        const qr = await import("qrcode");
        const options = {
          width: Number(size),
          margin: 4,
          errorCorrectionLevel: level,
          color: { dark: fg, light: bg },
        };
        const [p, s] = await Promise.all([
          qr.toDataURL(text, options),
          qr.toString(text, { ...options, type: "svg" }),
        ]);
        if (live) {
          setPng(p);
          setSvg(s);
        }
      } catch (e) {
        if (live)
          setError(
            e instanceof Error
              ? e.message
              : "The code could not be created. Use shorter text.",
          );
      }
    }, 200);
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [text, size, fg, bg, level]);
  return (
    <>
      <Textarea
        label="Text or URL"
        rows={3}
        maxLength={2000}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="form-grid">
        <Input
          label="Size (px)"
          type="number"
          min="128"
          max="2048"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Select
          label="Error correction"
          value={level}
          onChange={(e) => setLevel(e.target.value as typeof level)}
        >
          {["L", "M", "Q", "H"].map((v) => (
            <option key={v}>{v}</option>
          ))}
        </Select>
        <Input
          label="Foreground"
          type="color"
          value={fg}
          onChange={(e) => setFg(e.target.value)}
        />
        <Input
          label="Background"
          type="color"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />
      </div>
      <Toast error message={error} />
      {png && (
        <>
          <img
            className="qr-preview"
            src={png}
            width="256"
            height="256"
            alt="Generated QR code for your text"
          />
          <div className="actions">
            <Button
              onClick={async () =>
                download(await (await fetch(png)).blob(), "qr-code.png")
              }
            >
              Download PNG
            </Button>
            <Button
              secondary
              onClick={() =>
                download(
                  new Blob([svg], { type: "image/svg+xml" }),
                  "qr-code.svg",
                )
              }
            >
              Download SVG
            </Button>
          </div>
        </>
      )}
      <p className="muted">
        Test the downloaded code before printing. Use a dark foreground and a
        light background for reliable scanning.
      </p>
    </>
  );
}
