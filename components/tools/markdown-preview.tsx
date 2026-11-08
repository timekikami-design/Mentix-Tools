"use client";
import { useEffect, useState } from "react";
import { Textarea, CopyButton, Tabs, Toast } from "../ui";
export default function Markdown() {
  const [text, setText] = useState(
    "## A little clarity\n\nWrite **something useful**.\n\n- Keep it simple\n- Make it yours\n\n[Explore a new idea](https://example.com)",
  );
  const [html, setHtml] = useState("");
  const [mode, setMode] = useState("Preview");
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    Promise.all([import("marked"), import("dompurify")])
      .then(async ([{ marked }, { default: purify }]) => {
        const result = purify.sanitize(await marked.parse(text), {
          USE_PROFILES: { html: true },
          FORBID_TAGS: [
            "img",
            "video",
            "audio",
            "iframe",
            "style",
            "form",
            "input",
            "button",
            "source",
            "link",
            "object",
            "embed",
          ],
          FORBID_ATTR: ["style", "src", "srcset", "poster", "background"],
        });
        if (live) {
          setHtml(result);
          setError("");
        }
      })
      .catch(() => {
        if (live)
          setError("Preview could not load. Please refresh and try again.");
      });
    return () => {
      live = false;
    };
  }, [text]);
  return (
    <>
      <div className="split-view">
        <Textarea
          label="Markdown source"
          rows={14}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <section>
          <Tabs options={["Preview", "HTML"]} value={mode} onChange={setMode} />
          {mode === "Preview" ? (
            <article
              className="markdown-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="code-output">{html}</pre>
          )}
        </section>
      </div>
      <Toast error message={error} />
      <CopyButton text={html} />
      <p className="muted">
        Remote images are disabled to keep your preview private.
      </p>
    </>
  );
}
