"use client";
import { useEffect, useRef, useState } from "react";
import { FileDropzone, Button, DownloadButton, Toast } from "../ui";
import { readPdf, samplePdf, pdfBlob, type PdfInput } from "@/lib/pdf";
import { formatBytes } from "@/lib/image";
import { track } from "@/lib/analytics";
export default function PdfMerge() {
  const [docs, setDocs] = useState<PdfInput[]>([]);
  const [out, setOut] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const drag = useRef<number | null>(null);
  const example = async () => {
    setBusy(true);
    try {
      setDocs(
        await Promise.all([
          samplePdf("Sample chapter", 2),
          samplePdf("Sample appendix", 1),
        ]),
      );
      setOut(null);
      setError("");
    } catch {
      setError("Sample documents could not load. Try selecting your own PDF.");
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    void example();
  }, []);
  const load = async (files: File[]) => {
    setBusy(true);
    setOut(null);
    setError("");
    try {
      const added = await Promise.all(files.map(readPdf));
      setDocs((prev) => [...prev, ...added]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not read those documents.",
      );
    } finally {
      setBusy(false);
    }
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= docs.length) return;
    setDocs((prev) => {
      const a = [...prev];
      const [d] = a.splice(from, 1);
      a.splice(to, 0, d);
      return a;
    });
    setOut(null);
  };
  const merge = async () => {
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const output = await PDFDocument.create();
      for (const d of docs) {
        const input = await PDFDocument.load(d.bytes);
        for (const p of await output.copyPages(input, input.getPageIndices()))
          output.addPage(p);
      }
      setOut(pdfBlob(await output.save()));
      track("file_processed", "pdf-merge");
    } catch {
      setError(
        "These PDFs could not be merged. Encrypted or damaged documents are not supported.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <FileDropzone
        accept="application/pdf,.pdf"
        multiple
        onFiles={(fs) => {
          if (!busy) void load(fs);
        }}
        hint="Up to 50 MB per PDF. Drag the list to reorder."
      />
      <div className="actions">
        <Button secondary onClick={example} disabled={busy}>
          Load sample pair
        </Button>
        <Button
          secondary
          onClick={() => {
            setDocs([]);
            setOut(null);
          }}
          disabled={busy}
        >
          Clear list
        </Button>
      </div>
      <ol className="file-list">
        {docs.map((d, i) => (
          <li
            key={d.id}
            draggable={!busy}
            onDragStart={() => {
              drag.current = i;
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (drag.current !== null) move(drag.current, i);
              drag.current = null;
            }}
          >
            <span className="file-order">{i + 1}</span>
            <div>
              <strong>{d.file.name}</strong>
              <small>
                {d.pages} pages · {formatBytes(d.file.size)}
              </small>
            </div>
            <div className="actions">
              <Button
                secondary
                disabled={busy || i === 0}
                onClick={() => move(i, i - 1)}
                aria-label={`Move ${d.file.name} up`}
              >
                ↑
              </Button>
              <Button
                secondary
                disabled={busy || i === docs.length - 1}
                onClick={() => move(i, i + 1)}
                aria-label={`Move ${d.file.name} down`}
              >
                ↓
              </Button>
              <Button
                secondary
                disabled={busy}
                onClick={() => {
                  setDocs(docs.filter((x) => x.id !== d.id));
                  setOut(null);
                }}
                aria-label={`Remove ${d.file.name}`}
              >
                ×
              </Button>
            </div>
          </li>
        ))}
      </ol>
      <Button disabled={busy || docs.length < 2} onClick={merge}>
        {busy ? "Working…" : `Merge ${docs.length} PDFs`}
      </Button>
      <Toast error message={error} />
      {out && <DownloadButton blob={out} name="merged.pdf" />}
    </>
  );
}
