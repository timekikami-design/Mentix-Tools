"use client";
import { useState } from "react";
import {
  FileDropzone,
  Slider,
  Input,
  Button,
  DownloadButton,
  Toast,
  Stats,
} from "../ui";
import { useImage, useBlobUrl, formatBytes } from "@/lib/image";
import { track } from "@/lib/analytics";
export default function ImageCompressor() {
  const im = useImage();
  const [quality, setQuality] = useState(75);
  const [max, setMax] = useState("1920");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const out = useBlobUrl(blob);
  const run = async () => {
    if (!im.file) return;
    setBusy(true);
    im.setError("");
    try {
      if (im.file.type === "image/gif")
        throw new Error(
          "For GIF, use Image Format Converter to extract a frame first.",
        );
      const width = Number(max);
      if (!Number.isFinite(width) || width < 1 || width > 10000)
        throw new Error("Choose a maximum width from 1 to 10,000.");
      const { default: compress } = await import("browser-image-compression");
      const output = await compress(im.file, {
        maxSizeMB: Math.max(0.01, im.file.size / 1048576),
        maxWidthOrHeight: Math.max(
          1,
          Math.round(
            Math.min(1, width / im.size.width) *
              Math.max(im.size.width, im.size.height),
          ),
        ),
        initialQuality: quality / 100,
        alwaysKeepResolution: false,
        useWebWorker: false,
        libURL: "",
        fileType: im.file.type,
        maxIteration: 5,
      });
      setBlob(output);
      track("file_processed", "image-compressor");
    } catch (e) {
      im.setError(
        e instanceof Error
          ? e.message
          : "Compression failed. Try a smaller image.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <FileDropzone
        accept="image/jpeg,image/png,image/webp"
        onFiles={(fs) => {
          setBlob(null);
          if (fs[0]) void im.load(fs[0]);
        }}
      />
      <div className="form-grid">
        <Slider
          label="Quality"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => {
            setQuality(Number(e.target.value));
            setBlob(null);
          }}
        />
        <Input
          label="Maximum width (px)"
          type="number"
          min="1"
          max="10000"
          value={max}
          onChange={(e) => {
            setMax(e.target.value);
            setBlob(null);
          }}
        />
      </div>
      {im.src && (
        <div className="image-comparison">
          <figure>
            <img src={im.src} alt="Original image preview" />
            <figcaption>
              Original · {formatBytes(im.file?.size || 0)}
            </figcaption>
          </figure>
          {out && (
            <figure>
              <img src={out} alt="Compressed image preview" />
              <figcaption>
                Compressed · {formatBytes(blob?.size || 0)}
              </figcaption>
            </figure>
          )}
        </div>
      )}
      <Button onClick={run} disabled={busy || !im.file}>
        {busy ? "Compressing…" : "Compress image"}
      </Button>
      <Toast error message={im.error} />
      {blob && im.file && (
        <>
          <Stats
            items={{
              Before: formatBytes(im.file.size),
              After: formatBytes(blob.size),
              Saved: `${((1 - blob.size / im.file.size) * 100).toFixed(1)}%`,
            }}
          />
          <DownloadButton
            blob={blob}
            name={`compressed.${blob.type.split("/")[1] || "jpg"}`}
          />
        </>
      )}
    </>
  );
}
