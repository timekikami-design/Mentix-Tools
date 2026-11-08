"use client";
import { useState } from "react";
import {
  FileDropzone,
  Select,
  Slider,
  Button,
  DownloadButton,
  Toast,
} from "../ui";
import { useImage, drawImage, useBlobUrl, formatBytes } from "@/lib/image";
import { track } from "@/lib/analytics";
export default function ImageFormat() {
  const im = useImage();
  const [format, setFormat] = useState("png");
  const [quality, setQuality] = useState(85);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const out = useBlobUrl(blob);
  const run = async () => {
    setBusy(true);
    im.setError("");
    try {
      const b = await drawImage(
        im.src,
        im.size.width,
        im.size.height,
        `image/${format}`,
        quality / 100,
      );
      if (b.type !== `image/${format}`)
        throw new Error(
          "Your browser does not support that export format. Try PNG.",
        );
      setBlob(b);
      track("file_processed", "image-format-converter");
    } catch (e) {
      im.setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <FileDropzone
        accept="image/jpeg,image/png,image/webp,image/gif"
        onFiles={(fs) => {
          setBlob(null);
          if (fs[0]) void im.load(fs[0]);
        }}
      />
      <Select
        label="Output format"
        value={format}
        onChange={(e) => {
          setFormat(e.target.value);
          setBlob(null);
        }}
      >
        <option value="png">PNG · transparency supported</option>
        <option value="jpeg">JPG · white background</option>
        <option value="webp">WebP</option>
      </Select>
      {format !== "png" && (
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
      )}
      <p className="muted">
        Animated GIF input is exported as its first frame only. Metadata is not
        retained.
      </p>
      {im.src && (
        <img
          className="image-preview"
          src={out || im.src}
          alt="Image format conversion preview"
        />
      )}
      <div className="actions">
        <Button onClick={run} disabled={busy || !im.src}>
          {busy ? "Converting…" : "Convert image"}
        </Button>
        {blob && (
          <DownloadButton
            blob={blob}
            name={`converted.${format === "jpeg" ? "jpg" : format}`}
          />
        )}
      </div>
      {blob && <p role="status">{formatBytes(blob.size)}</p>}
      <Toast error message={im.error} />
    </>
  );
}
