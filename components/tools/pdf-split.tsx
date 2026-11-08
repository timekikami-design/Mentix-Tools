"use client";
import { useEffect, useState } from "react";
import {
  FileDropzone,
  Input,
  Toggle,
  Button,
  DownloadButton,
  Toast,
} from "../ui";
import { readPdf, samplePdf, pdfBlob, type PdfInput } from "@/lib/pdf";
import { parseRanges } from "@/lib/calculations";
import { track } from "@/lib/analytics";
export default function PdfSplit() {
  const [doc, setDoc] = useState<PdfInput | null>(null);
  const [range, setRange] = useState("1-2");
  const [all, setAll] = useState(false);
  const [out, setOut] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    samplePdf()
      .then(setDoc)
      .catch(() => setError("Choose a PDF to start."));
  }, []);
  const load = async (fs: File[]) => {
    if (!fs[0]) return;
    setBusy(true);
    setOut(null);
    try {
      const d = await readPdf(fs[0]);
      setDoc(d);
      setRange(d.pages > 1 ? "1-2" : "1");
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open PDF.");
    } finally {
      setBusy(false);
    }
  };
  const run = async () => {
    if (!doc) return;
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const source = await PDFDocument.load(doc.bytes);
      if (all) {
        const { default: JSZip } = await import("jszip");
        const zip = new JSZip();
        for (let i = 0; i < doc.pages; i++) {
          const d = await PDFDocument.create();
          const [p] = await d.copyPages(source, [i]);
          d.addPage(p);
          zip.file(
            `page-${String(i + 1).padStart(3, "0")}.pdf`,
            await d.save(),
          );
        }
        setOut(await zip.generateAsync({ type: "blob" }));
      } else {
        const indices = parseRanges(range, doc.pages);
        const d = await PDFDocument.create();
        for (const p of await d.copyPages(source, indices)) d.addPage(p);
        setOut(pdfBlob(await d.save()));
      }
      track("file_processed", "pdf-split");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Extraction failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <FileDropzone
        accept="application/pdf,.pdf"
        onFiles={(fs) => {
          if (!busy) void load(fs);
        }}
      />
      {doc && (
        <p>
          <strong>{doc.file.name}</strong> · {doc.pages} pages
        </p>
      )}
      <Input
        label="Page ranges (example: 1-3, 5, 8-10)"
        disabled={all}
        value={range}
        onChange={(e) => {
          setRange(e.target.value);
          setOut(null);
        }}
      />
      <Toggle
        label="Split every page into a ZIP of individual PDFs"
        checked={all}
        onChange={(v) => {
          setAll(v);
          setOut(null);
        }}
      />
      <Button disabled={busy || !doc} onClick={run}>
        {busy ? "Extracting…" : all ? "Split all pages" : "Extract pages"}
      </Button>
      <Toast error message={error} />
      {out && (
        <DownloadButton
          blob={out}
          name={all ? "split-pages.zip" : "extracted.pdf"}
        />
      )}
    </>
  );
}
