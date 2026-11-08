"use client";
import { useState } from "react";
import {
  Textarea,
  Button,
  Result,
  CopyButton,
  Toast,
  FileDropzone,
  Tabs,
} from "../ui";
import { track } from "@/lib/analytics";
export default function Base64() {
  const [text, setText] = useState("Hello, world! 👋");
  const [mode, setMode] = useState("Encode");
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const run = () => {
    try {
      if (mode === "Encode") {
        const bytes = new TextEncoder().encode(text);
        let binary = "";
        for (const b of bytes) binary += String.fromCharCode(b);
        setOut(btoa(binary));
      } else {
        const data =
          text.includes(",") && text.startsWith("data:")
            ? text.slice(text.indexOf(",") + 1)
            : text;
        const bytes = Uint8Array.from(atob(data.replace(/\s/g, "")), (c) =>
          c.charCodeAt(0),
        );
        setOut(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
      }
      setError("");
    } catch {
      setError(
        "This is not valid Base64-encoded UTF-8 text. Binary files cannot be decoded as text.",
      );
      setOut("");
    }
  };
  const file = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (f.size >= 2 * 1024 * 1024) {
      setError("Choose a file smaller than 2 MB.");
      return;
    }
    const r = new FileReader();
    r.onload = () => {
      setOut(String(r.result));
      setError("");
      track("file_processed", "base64-encoder-decoder");
    };
    r.onerror = () => setError("The file could not be read. Please try again.");
    r.readAsDataURL(f);
  };
  return (
    <>
      <Tabs
        options={["Encode", "Decode", "File to data URI"]}
        value={mode}
        onChange={(v) => {
          setMode(v);
          setOut("");
          setError("");
        }}
      />
      {mode === "File to data URI" ? (
        <FileDropzone
          accept="*/*"
          onFiles={file}
          hint="Under 2 MB. No file is uploaded."
        />
      ) : (
        <>
          <Textarea
            label={mode === "Encode" ? "Text to encode" : "Base64 to decode"}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={run}>{mode} text</Button>
        </>
      )}
      <Toast error message={error} />
      {out && (
        <Result>
          <pre>{out}</pre>
          <CopyButton text={out} />
        </Result>
      )}
    </>
  );
}
