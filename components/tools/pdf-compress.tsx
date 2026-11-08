"use client";
import { useState, useEffect, useRef } from "react";
import {
  FileDropzone,
  Select,
  Button,
  DownloadButton,
  Stats,
  Toast,
} from "../ui";
import { readPdf, samplePdf, pdfBlob, type PdfInput } from "@/lib/pdf";
import { canvasBlob, formatBytes } from "@/lib/image";
import { track } from "@/lib/analytics";
export default function PdfCompress() {
  const [doc, setDoc] = useState<PdfInput | null>(null);
  const [quality, setQuality] = useState("Medium");
  const [out, setOut] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [busy, setBusy] = useState(false);
  const cancel = useRef(false);
  useEffect(() => {
    samplePdf()
      .then(setDoc)
      .catch(() => setError("Choose a PDF to start."));
    return () => {
      cancel.current = true;
    };
  }, []);
  const load = async (fs: File[]) => {
    if (!fs[0]) return;
    setOut(null);
    try {
      setDoc(await readPdf(fs[0]));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open PDF.");
    }
  };
  const run = async () => {
    if (!doc) return;
    setBusy(true);
    setOut(null);
    setError("");
    cancel.current = false;
    let source: import("pdfjs-dist").PDFDocumentProxy | null = null;
    try {
      const [pdfjs, { PDFDocument }] = await Promise.all([
        import("pdfjs-dist"),
        import("pdf-lib"),
      ]);
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      source = await pdfjs.getDocument({
        data: doc.bytes.slice(),
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise;
      const output = await PDFDocument.create();
      const options =
        quality === "Low"
          ? { dpi: 72, q: 0.45 }
          : quality === "High"
            ? { dpi: 150, q: 0.85 }
            : { dpi: 110, q: 0.65 };
      for (let i = 1; i <= source.numPages; i++) {
        if (cancel.current) throw new Error("Compression cancelled.");
        setProgress(`Rendering page ${i} of ${source.numPages}…`);
        const p = await source.getPage(i);
        const base = p.getViewport({ scale: 1 });
        const v = p.getViewport({ scale: options.dpi / 72 });
        if (v.width * v.height > 24000000)
          throw new Error(
            "A page is too large to render safely. Select a lower quality setting.",
          );
        const c = document.createElement("canvas");
        c.width = Math.ceil(v.width);
        c.height = Math.ceil(v.height);
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("Canvas is not available.");
        await p.render({
          canvasContext: ctx,
          viewport: v,
          background: "#ffffff",
        }).promise;
        const jpeg = await canvasBlob(c, "image/jpeg", options.q);
        const image = await output.embedJpg(await jpeg.arrayBuffer());
        const page = output.addPage([base.width, base.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: base.width,
          height: base.height,
        });
        p.cleanup();
        c.width = 0;
        c.height = 0;
        await new Promise((r) => setTimeout(r, 0));
      }
      setOut(pdfBlob(await output.save()));
      track("file_processed", "pdf-compress");
      setProgress("Compression complete.");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Compression failed. Try a smaller file.",
      );
      setProgress("");
    } finally {
      await source?.destroy();
      setBusy(false);
    }
  };
  return (
    <>
      <p className="notice">
        This mode turns every page into an image. Text becomes non-selectable.
        Links, forms, accessibility structure, and signatures are not retained.
        Text-only PDFs may become larger.
      </p>
      <FileDropzone
        accept="application/pdf,.pdf"
        onFiles={(fs) => {
          if (!busy) void load(fs);
        }}
      />
      {doc && (
        <p>
          {doc.file.name} · {doc.pages} pages · {formatBytes(doc.file.size)}
        </p>
      )}
      <Select
        label="Quality"
        disabled={busy}
        value={quality}
        onChange={(e) => {
          setQuality(e.target.value);
          setOut(null);
        }}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </Select>
      <div className="actions">
        <Button disabled={busy || !doc} onClick={run}>
          {busy ? "Compressing…" : "Compress PDF"}
        </Button>
        {busy && (
          <Button
            secondary
            onClick={() => {
              cancel.current = true;
            }}
          >
            Cancel
          </Button>
        )}
      </div>
      <Toast message={progress} />
      <Toast error message={error} />
      {out && doc && (
        <>
          <Stats
            items={{
              Original: formatBytes(doc.file.size),
              New: formatBytes(out.size),
              Change: `${((1 - out.size / doc.file.size) * 100).toFixed(1)}% saved`,
            }}
          />
          <DownloadButton blob={out} name="compressed.pdf" />
        </>
      )}
    </>
  );
}
