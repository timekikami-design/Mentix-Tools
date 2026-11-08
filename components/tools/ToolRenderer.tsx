"use client";
import dynamic from "next/dynamic";
import { Component, type ReactNode, type ComponentType } from "react";
import { track } from "@/lib/analytics";
const loading = () => (
  <p role="status" className="tool-loading">
    Getting your tool ready…
  </p>
);
const components: Record<string, ComponentType> = {
  "word-counter": dynamic(() => import("./word-counter"), {
    loading,
    ssr: false,
  }),
  "case-converter": dynamic(() => import("./case-converter"), {
    loading,
    ssr: false,
  }),
  "lorem-ipsum-generator": dynamic(() => import("./lorem-ipsum-generator"), {
    loading,
    ssr: false,
  }),
  "readability-score": dynamic(() => import("./readability-score"), {
    loading,
    ssr: false,
  }),
  "slug-generator": dynamic(() => import("./slug-generator"), {
    loading,
    ssr: false,
  }),
  "markdown-preview": dynamic(() => import("./markdown-preview"), {
    loading,
    ssr: false,
  }),
  "regex-tester": dynamic(() => import("./regex-tester"), {
    loading,
    ssr: false,
  }),
  "meta-tag-generator": dynamic(() => import("./meta-tag-generator"), {
    loading,
    ssr: false,
  }),
  "json-formatter": dynamic(() => import("./json-formatter"), {
    loading,
    ssr: false,
  }),
  "base64-encoder-decoder": dynamic(() => import("./base64-encoder-decoder"), {
    loading,
    ssr: false,
  }),
  "hash-generator": dynamic(() => import("./hash-generator"), {
    loading,
    ssr: false,
  }),
  "timestamp-converter": dynamic(() => import("./timestamp-converter"), {
    loading,
    ssr: false,
  }),
  "password-generator": dynamic(() => import("./password-generator"), {
    loading,
    ssr: false,
  }),
  "image-compressor": dynamic(() => import("./image-compressor"), {
    loading,
    ssr: false,
  }),
  "image-resizer": dynamic(() => import("./image-resizer"), {
    loading,
    ssr: false,
  }),
  "image-format-converter": dynamic(() => import("./image-format-converter"), {
    loading,
    ssr: false,
  }),
  "qr-code-generator": dynamic(() => import("./qr-code-generator"), {
    loading,
    ssr: false,
  }),
  "color-picker": dynamic(() => import("./color-picker"), {
    loading,
    ssr: false,
  }),
  "css-gradient-generator": dynamic(() => import("./css-gradient-generator"), {
    loading,
    ssr: false,
  }),
  "pdf-merge": dynamic(() => import("./pdf-merge"), { loading, ssr: false }),
  "pdf-split": dynamic(() => import("./pdf-split"), { loading, ssr: false }),
  "pdf-compress": dynamic(() => import("./pdf-compress"), {
    loading,
    ssr: false,
  }),
  "unit-converter": dynamic(() => import("./unit-converter"), {
    loading,
    ssr: false,
  }),
  "currency-converter": dynamic(() => import("./currency-converter"), {
    loading,
    ssr: false,
  }),
  "temperature-converter": dynamic(() => import("./temperature-converter"), {
    loading,
    ssr: false,
  }),
  "percentage-calculator": dynamic(() => import("./percentage-calculator"), {
    loading,
    ssr: false,
  }),
  "age-calculator": dynamic(() => import("./age-calculator"), {
    loading,
    ssr: false,
  }),
  "bmi-calculator": dynamic(() => import("./bmi-calculator"), {
    loading,
    ssr: false,
  }),
  "loan-emi-calculator": dynamic(() => import("./loan-emi-calculator"), {
    loading,
    ssr: false,
  }),
  "pomodoro-timer": dynamic(() => import("./pomodoro-timer"), {
    loading,
    ssr: false,
  }),
};
class ToolBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <section role="alert">
        <h2>This tool needs a fresh start.</h2>
        <p>
          Your input has not been uploaded. Try a smaller file or refresh this
          page.
        </p>
        <button className="button" onClick={() => window.location.reload()}>
          Reload tool
        </button>
      </section>
    ) : (
      this.props.children
    );
  }
}
export default function ToolRenderer({ slug }: { slug: string }) {
  const Tool = components[slug];
  return (
    <ToolBoundary>
      <div
        className="tool-workspace"
        onChangeCapture={() => track("tool_used", slug)}
        onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("button"))
            track("tool_used", slug);
        }}
      >
        {Tool ? <Tool /> : <p>Tool unavailable.</p>}
      </div>
    </ToolBoundary>
  );
}
