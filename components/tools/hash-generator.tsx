"use client";
import { useState } from "react";
import {
  Textarea,
  Select,
  Button,
  Result,
  CopyButton,
  Toast,
  FileDropzone,
} from "../ui";
import { track } from "@/lib/analytics";
export default function Hash() {
  const [text, setText] = useState("A little integrity goes a long way.");
  const [algo, setAlgo] = useState("SHA-256");
  const [file, setFile] = useState<File | null>(null);
  const [out, setOut] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const run = async () => {
    setBusy(true);
    setError("");
    setOut("");
    try {
      const buffer = file
        ? await file.arrayBuffer()
        : new TextEncoder().encode(text).buffer;
      if (algo === "MD5") {
        const { default: CryptoJS } = await import("crypto-js");
        setOut(
          CryptoJS.MD5(
            CryptoJS.lib.WordArray.create(buffer as ArrayBuffer),
          ).toString(),
        );
      } else {
        const bytes = await crypto.subtle.digest(algo, buffer as ArrayBuffer);
        setOut(
          Array.from(new Uint8Array(bytes), (b) =>
            b.toString(16).padStart(2, "0"),
          ).join(""),
        );
      }
      if (file) track("file_processed", "hash-generator");
    } catch {
      setError(
        "The checksum could not be calculated. Try a smaller file in a secure browser context.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <Textarea
        label="Text (or choose a file below)"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFile(null);
          setOut("");
        }}
      />
      <FileDropzone
        accept="*/*"
        onFiles={(fs) => {
          if (fs[0]?.size >= 50 * 1024 * 1024) {
            setError("Choose a file smaller than 50 MB.");
            return;
          }
          setFile(fs[0] || null);
          setOut("");
          setError("");
        }}
        hint="Files under 50 MB. Checksum calculated locally."
      />
      {file && (
        <p>
          Selected: {file.name} · {(file.size / 1024).toFixed(1)} KB{" "}
          <button
            className="text-button"
            onClick={() => {
              setFile(null);
              setOut("");
            }}
          >
            Use text instead
          </button>
        </p>
      )}
      <Select
        label="Algorithm"
        value={algo}
        onChange={(e) => {
          setAlgo(e.target.value);
          setOut("");
        }}
      >
        {["MD5", "SHA-1", "SHA-256", "SHA-512"].map((v) => (
          <option key={v}>{v}</option>
        ))}
      </Select>
      <Button onClick={run} disabled={busy}>
        {busy ? "Calculating…" : "Calculate hash"}
      </Button>
      <Toast error message={error} />
      {out && (
        <Result label={algo}>
          <pre>{out}</pre>
          <CopyButton text={out} />
        </Result>
      )}
      <p className="muted">
        MD5 and SHA-1 are for legacy checksums, not security. Never use these
        fast hashes for password storage.
      </p>
    </>
  );
}
