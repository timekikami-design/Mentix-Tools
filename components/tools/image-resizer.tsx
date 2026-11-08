"use client";
import { useState } from "react";
import {
  FileDropzone,
  Tabs,
  Input,
  Toggle,
  Button,
  DownloadButton,
  Toast,
} from "../ui";
import { useImage, drawImage, useBlobUrl } from "@/lib/image";
import { track } from "@/lib/analytics";
export default function ImageResizer() {
  const im = useImage();
  const [mode, setMode] = useState("Pixels");
  const [w, setW] = useState("600");
  const [h, setH] = useState("400");
  const [percent, setPercent] = useState("50");
  const [keep, setKeep] = useState(true);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const out = useBlobUrl(blob);
  const width =
    mode === "Percentage"
      ? Math.round((im.size.width * Number(percent)) / 100)
      : Number(w);
  const height =
    mode === "Percentage"
      ? Math.round((im.size.height * Number(percent)) / 100)
      : keep
        ? Math.round((width * im.size.height) / im.size.width)
        : Number(h);
  const run = async () => {
    setBusy(true);
    im.setError("");
    try {
      setBlob(await drawImage(im.src, width, height, "image/png", 1));
      track("file_processed", "image-resizer");
    } catch (e) {
      im.setError(e instanceof Error ? e.message : "Resize failed.");
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
      <Tabs
        options={["Pixels", "Percentage"]}
        value={mode}
        onChange={(v) => {
          setMode(v);
          setBlob(null);
        }}
      />
      {mode === "Pixels" ? (
        <>
          <div className="form-grid">
            <Input
              label="Width (px)"
              type="number"
              min="1"
              max="10000"
              value={w}
              onChange={(e) => {
                setW(e.target.value);
                setBlob(null);
              }}
            />
            <Input
              label="Height (px)"
              type="number"
              min="1"
              max="10000"
              disabled={keep}
              value={keep ? height : h}
              onChange={(e) => {
                setH(e.target.value);
                setBlob(null);
              }}
            />
          </div>
          <Toggle
            label="Keep aspect ratio"
            checked={keep}
            onChange={(v) => {
              setKeep(v);
              setBlob(null);
            }}
          />
        </>
      ) : (
        <Input
          label="Percentage"
          type="number"
          min="1"
          max="1000"
          value={percent}
          onChange={(e) => {
            setPercent(e.target.value);
            setBlob(null);
          }}
        />
      )}
      <p>
        {im.size.width} × {im.size.height} → {width} × {height} pixels
      </p>
      {im.src && (
        <img
          className="image-preview"
          src={out || im.src}
          alt={out ? "Resized image preview" : "Original image preview"}
        />
      )}
      <div className="actions">
        <Button disabled={busy || !im.src} onClick={run}>
          {busy ? "Resizing…" : "Resize image"}
        </Button>
        {blob && <DownloadButton blob={blob} name="resized.png" />}
      </div>
      <Toast error message={im.error} />
    </>
  );
}
