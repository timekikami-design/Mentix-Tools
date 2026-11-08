"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Type,
  Braces,
  Pipette,
  Check,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
const sample =
  "Good ideas deserve a clear first draft.\nMake a little room for yours.";
const modes = [
  { name: "Text", icon: Type },
  { name: "JSON", icon: Braces },
  { name: "Color", icon: Pipette },
];
export default function LiveWorkbench() {
  const [mode, setMode] = useState("Text");
  const [text, setText] = useState(sample);
  const [json, setJson] = useState(
    '{"aBetterWorkflow":true,"uploads":0,"cost":"free"}',
  );
  const [color, setColor] = useState("#d4e8af");
  const [message, setMessage] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const format = () => {
    try {
      setJson(JSON.stringify(JSON.parse(json), null, 2));
      setMessage("Valid JSON. Nicely formatted.");
    } catch {
      setMessage("Check the JSON syntax and try again.");
    }
  };
  return (
    <div className="workbench-wrap" data-reveal>
      <div className="workbench-label">
        <span className="status-dot" /> THE MENTIX WORKSPACE{" "}
        <span>LIVE PREVIEW</span>
      </div>
      <section
        className="live-workbench"
        aria-label="Try a tool without leaving the page"
      >
        <div className="workbench-top">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span>Something useful, right here.</span>
          <ShieldCheck size={15} />
        </div>
        <div className="workbench-tabs" role="group" aria-label="Preview type">
          {modes.map(({ name, icon: Icon }, i) => (
            <button
              key={name}
              aria-pressed={mode === name}
              onClick={() => {
                setMode(name);
                setMessage("");
              }}
            >
              <Icon size={15} />
              {name}
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <div className="workbench-content" key={mode}>
          {mode === "Text" ? (
            <>
              <div className="editor-label">
                <label htmlFor="live-draft">YOUR NEXT GREAT IDEA</label>
                <button
                  aria-label="Reset example text"
                  onClick={() => setText(sample)}
                >
                  <RotateCcw size={13} />
                </button>
              </div>
              <textarea
                id="live-draft"
                value={text}
                maxLength={5000}
                onChange={(e) => setText(e.target.value)}
                spellCheck={false}
              />
              <div className="live-stat-grid" aria-live="polite">
                <div>
                  <strong>{words.toString().padStart(2, "0")}</strong>
                  <span>Words</span>
                </div>
                <div>
                  <strong>{text.length}</strong>
                  <span>Characters</span>
                </div>
                <div>
                  <strong>
                    {Math.ceil((words / 238) * 60)}
                    <small>s</small>
                  </strong>
                  <span>Read time</span>
                </div>
              </div>
            </>
          ) : mode === "JSON" ? (
            <>
              <div className="editor-label">
                <label htmlFor="live-json">
                  A LITTLE STRUCTURE GOES A LONG WAY
                </label>
                <span>JSON</span>
              </div>
              <textarea
                id="live-json"
                className="json-live-input"
                value={json}
                onChange={(e) => {
                  setJson(e.target.value);
                  setMessage("");
                }}
                maxLength={5000}
                spellCheck={false}
              />
              <div className="live-json-bottom">
                <button className="studio-action" onClick={format}>
                  Format JSON <Braces size={14} />
                </button>
                <span role="status">
                  {message || "No servers. Just your browser."}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="editor-label">
                <label htmlFor="live-color">FIND YOUR NEXT ACCENT</label>
                <span>HEX</span>
              </div>
              <div className="live-color-stage" style={{ background: color }}>
                <span style={{ color: "#121a20", mixBlendMode: "difference" }}>
                  Aa.
                </span>
                <input
                  id="live-color"
                  aria-label="Preview color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="live-color-bottom">
                <code>{color.toUpperCase()}</code>
                <span>Click the swatch to change it.</span>
              </div>
            </>
          )}
        </div>
        <div className="workbench-bottom">
          <span>
            <span className="status-dot" /> Changes happen on your device
          </span>
          <Link
            href={`/tools/${mode === "Text" ? "word-counter" : mode === "JSON" ? "json-formatter" : "color-picker"}/`}
          >
            Open full tool <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
      <div className="workbench-footnote">
        <span>
          <Check size={14} /> Real tools. Not a product mockup.
        </span>
        <span className="workbench-bracket">[ TRY IT OUT ]</span>
      </div>
      <div className="workspace-stamp" aria-hidden="true">
        <ShieldCheck size={18} />
        <div>
          YOUR FILES.
          <br />
          <strong>STILL YOURS.</strong>
        </div>
      </div>
    </div>
  );
}
