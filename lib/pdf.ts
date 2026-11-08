export type PdfInput = {
  id: string;
  file: File;
  bytes: Uint8Array<ArrayBuffer>;
  pages: number;
};
export async function readPdf(file: File): Promise<PdfInput> {
  if (file.size > 50 * 1024 * 1024)
    throw new Error("Choose PDFs under 50 MB each.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { PDFDocument } = await import("pdf-lib");
  try {
    const doc = await PDFDocument.load(bytes);
    if (doc.isEncrypted) throw new Error("encrypted");
    return { id: crypto.randomUUID(), file, bytes, pages: doc.getPageCount() };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "";
    if (/encrypt/i.test(msg))
      throw new Error(
        `${file.name} is encrypted. Unlock it with its owner’s permission before using this tool.`,
      );
    throw new Error(
      `${file.name} could not be read as a PDF. Try a different file.`,
    );
  }
}
export async function samplePdf(label = "Sample document", count = 3) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= count; i++) {
    const p = doc.addPage([595, 842]);
    p.drawRectangle({
      x: 0,
      y: 700,
      width: 595,
      height: 142,
      color: rgb(0.24, 0.29, 0.24),
    });
    p.drawText(label, {
      x: 48,
      y: 760,
      size: 26,
      font,
      color: rgb(0.98, 0.97, 0.95),
    });
    p.drawText(`Page ${i} of ${count}`, { x: 48, y: 650, size: 18, font });
    for (let j = 0; j < 14; j++)
      p.drawText("A small example, generated right here in your browser.", {
        x: 48,
        y: 600 - j * 28,
        size: 12,
        font,
      });
  }
  return readPdf(
    new File(
      [new Uint8Array(await doc.save())],
      `${label.toLowerCase().replace(/ /g, "-")}.pdf`,
      { type: "application/pdf" },
    ),
  );
}
export function pdfBlob(bytes: Uint8Array) {
  return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
}
