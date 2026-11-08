"use client";
import { useState, useEffect, useRef } from "react";
export function canvasBlob(
  canvas: HTMLCanvasElement,
  type = "image/png",
  quality = 0.85,
): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) =>
        b ? resolve(b) : reject(new Error("The image could not be exported.")),
      type,
      quality,
    ),
  );
}
export async function sampleImage() {
  const c = document.createElement("canvas");
  c.width = 1200;
  c.height = 800;
  const x = c.getContext("2d");
  if (!x) throw new Error("Canvas unavailable.");
  x.fillStyle = "#e9e3d7";
  x.fillRect(0, 0, 1200, 800);
  x.fillStyle = "#b5573b";
  x.beginPath();
  x.arc(820, 280, 160, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = "#3e4a3d";
  x.beginPath();
  x.moveTo(0, 800);
  x.lineTo(450, 200);
  x.lineTo(1000, 800);
  x.fill();
  x.fillStyle = "#faf7f2";
  x.font = "64px Georgia";
  x.fillText("A little perspective.", 80, 700);
  return new File([await canvasBlob(c)], "mentix-tools-sample.png", {
    type: "image/png",
  });
}
export function useImage() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [size, setSize] = useState({ width: 1200, height: 800 });
  const [error, setError] = useState("");
  const version = useRef(0);
  const load = async (f: File) => {
    const v = ++version.current;
    try {
      if (!/^image\/(jpeg|png|webp|gif)$/.test(f.type))
        throw new Error("Choose a JPG, PNG, WebP, or GIF image.");
      if (f.size > 50 * 1024 * 1024)
        throw new Error("Choose an image under 50 MB.");
      const url = URL.createObjectURL(f);
      const image = new Image();
      image.src = url;
      try {
        await image.decode();
        if (image.width * image.height > 40000000)
          throw new Error("Choose an image below 40 megapixels.");
        if (v !== version.current) {
          URL.revokeObjectURL(url);
          return;
        }
        let preview = url;
        if (f.type === "image/gif") {
          const bitmap = await createImageBitmap(f);
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas unavailable.");
          ctx.drawImage(bitmap, 0, 0);
          bitmap.close();
          preview = URL.createObjectURL(await canvasBlob(canvas));
          URL.revokeObjectURL(url);
        }
        setFile(f);
        setSize({ width: image.width, height: image.height });
        setSrc(preview);
        setError("");
      } catch (e) {
        URL.revokeObjectURL(url);
        throw e;
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "This image could not be opened.",
      );
    }
  };
  useEffect(() => {
    sampleImage()
      .then(load)
      .catch(() => setError("Choose an image to start."));
    return () => {
      version.current++;
    };
  }, []);
  useEffect(
    () => () => {
      if (src) URL.revokeObjectURL(src);
    },
    [src],
  );
  return { file, src, size, error, setError, load };
}
export async function drawImage(
  src: string,
  width: number,
  height: number,
  type: string,
  quality: number,
) {
  if (
    !Number.isFinite(width + height) ||
    width < 1 ||
    height < 1 ||
    width > 10000 ||
    height > 10000 ||
    width * height > 40000000
  )
    throw new Error(
      "Use dimensions between 1 and 10,000 pixels, below 40 megapixels.",
    );
  const image = new Image();
  image.src = src;
  await image.decode();
  const c = document.createElement("canvas");
  c.width = Math.round(width);
  c.height = Math.round(height);
  const x = c.getContext("2d");
  if (!x) throw new Error("Canvas is not supported.");
  if (type === "image/jpeg") {
    x.fillStyle = "#fff";
    x.fillRect(0, 0, c.width, c.height);
  }
  x.drawImage(image, 0, 0, c.width, c.height);
  return canvasBlob(c, type, quality);
}
export function useBlobUrl(blob: Blob | null) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!blob) {
      setUrl("");
      return;
    }
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);
  return url;
}
export const formatBytes = (n: number) =>
  n < 1024
    ? `${n} B`
    : n < 1048576
      ? `${(n / 1024).toFixed(1)} KB`
      : `${(n / 1048576).toFixed(2)} MB`;
