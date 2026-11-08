"use client";
import {
  useId,
  useRef,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";
import { Copy, Check, Upload, ArrowDownToLine } from "lucide-react";
export function Button({
  children,
  secondary,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }) {
  return (
    <button
      type="button"
      className={`button ${secondary ? "secondary" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`panel ${className}`}>{children}</section>;
}
export function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} {...props} />
    </label>
  );
}
export function Textarea({
  label,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} rows={7} maxLength={500000} {...props} />
    </label>
  );
}
export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {children}
      </select>
    </div>
  );
}
export function Slider({
  label,
  value,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <Input type="range" label={`${label}: ${value}`} value={value} {...props} />
  );
}
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return (
    <>
      <Button
        secondary
        disabled={!text}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("Copied");
          } catch {
            setState("Clipboard blocked. Select and copy the output manually.");
          }
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setState(""), 2500);
        }}
      >
        {state === "Copied" ? <Check size={16} /> : <Copy size={16} />}{" "}
        {state === "Copied" ? "Copied" : "Copy"}
      </Button>
      <span role="status" className="sr-only">
        {state}
      </span>
      {state.startsWith("Clipboard") && <p role="alert">{state}</p>}
    </>
  );
}
export function Toast({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return message ? (
    <p
      role={error ? "alert" : "status"}
      className={`notice ${error ? "error" : ""}`}
    >
      {message}
    </p>
  ) : null;
}
export function Tabs({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="tabs" role="group" aria-label="Mode">
      {options.map((o) => (
        <button
          type="button"
          key={o}
          aria-pressed={o === value}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
export function FileDropzone({
  accept,
  multiple = false,
  onFiles,
  hint = "Files stay on your device.",
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  hint?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <div
      className={`dropzone ${over ? "over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onFiles(
          Array.from(e.dataTransfer.files).slice(0, multiple ? undefined : 1),
        );
      }}
    >
      <Upload size={28} />
      <strong>Drop {multiple ? "files" : "a file"} here</strong>
      <span>or choose from your device</span>
      <Button secondary onClick={() => input.current?.click()}>
        Choose {multiple ? "files" : "file"}
      </Button>
      <input
        ref={input}
        type="file"
        accept={accept}
        multiple={multiple}
        aria-label="Choose files"
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) onFiles(Array.from(e.target.files));
          e.target.value = "";
        }}
      />
      <small>{hint}</small>
    </div>
  );
}
export function Result({
  children,
  label = "Result",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <section className="result" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">{label}</span>
      {children}
    </section>
  );
}
export function Stats({ items }: { items: Record<string, string | number> }) {
  return (
    <dl className="stats" aria-live="polite">
      {Object.entries(items).map(([k, v]) => (
        <div key={k}>
          <dd>{v}</dd>
          <dt>{k}</dt>
        </div>
      ))}
    </dl>
  );
}
export function DownloadButton({
  blob,
  name,
}: {
  blob: Blob | null;
  name: string;
}) {
  return (
    <Button
      disabled={!blob}
      onClick={() => {
        if (blob) download(blob, name);
      }}
    >
      <ArrowDownToLine size={16} /> Download
    </Button>
  );
}
export function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
