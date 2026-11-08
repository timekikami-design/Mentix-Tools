import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  QrCode,
  Check,
  ImageDown,
  LockKeyhole,
} from "lucide-react";
import ToolIcon from "./ToolIcon";
import type { Tool } from "@/lib/tools";
function Preview({ slug }: { slug: string }) {
  if (slug === "word-counter")
    return (
      <div className="card-preview preview-words" aria-hidden="true">
        <span>
          Make every
          <br />
          <strong>word count.</strong>
        </span>
        <div>
          <b>Aa</b>
          <small>Less noise. More meaning.</small>
        </div>
      </div>
    );
  if (slug === "image-compressor")
    return (
      <div className="card-preview preview-compression" aria-hidden="true">
        <div className="compression-landscape">
          <i />
          <span />
          <b />
        </div>
        <div className="compression-readout">
          <ImageDown size={22} />
          <span>A little lighter.</span>
          <div>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  if (slug === "pdf-merge")
    return (
      <div className="card-preview preview-pdf" aria-hidden="true">
        <div className="paper paper-one">
          <FileText size={24} />
          <span>01</span>
        </div>
        <span className="paper-plus">+</span>
        <div className="paper paper-two">
          <FileText size={24} />
          <span>02</span>
        </div>
        <ArrowUpRight size={24} />
        <div className="paper paper-final">
          <Check size={24} />
          <span>DONE</span>
        </div>
      </div>
    );
  if (slug === "json-formatter")
    return (
      <div className="card-preview preview-code" aria-hidden="true">
        <span>
          workspace.json <i />
        </span>
        <pre>
          <span>{"{"} </span>
          {"\n"} <b>"aBetterWorkflow"</b>: <em>true</em>,{"\n"}{" "}
          <b>"unnecessarySteps"</b>: <em>0</em>
          {"\n"}
          <span>{"}"}</span>
        </pre>
      </div>
    );
  if (slug === "qr-code-generator")
    return (
      <div className="card-preview preview-qr" aria-hidden="true">
        <span>
          From here.
          <br />
          <strong>To anywhere.</strong>
        </span>
        <div>
          <QrCode size={80} strokeWidth={1.3} />
        </div>
      </div>
    );
  if (slug === "password-generator")
    return (
      <div className="card-preview preview-password" aria-hidden="true">
        <LockKeyhole size={24} />
        <span>•••• •••• ••••</span>
        <div>
          <i />
          <i />
          <i />
          <i />
          <span>STRONGER BY DESIGN</span>
        </div>
      </div>
    );
  return null;
}
export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      className={`tool-card category-${tool.category.toLowerCase()}`}
      href={`/tools/${tool.slug}/`}
    >
      <Preview slug={tool.slug} />
      <div className="tool-card-content">
        <div className="card-top">
          <span className="icon-tile">
            <ToolIcon name={tool.icon} size={20} />
          </span>
          <span className="category-label">{tool.category}</span>
        </div>
        <h3>{tool.name}</h3>
        <p>{tool.description}</p>
        <div className="card-footer">
          <span>Open tool</span>
          <ArrowUpRight size={18} className="card-arrow" />
        </div>
      </div>
    </Link>
  );
}
