import { metadata as pageMetadata } from "@/lib/site";
import ToolDirectory from "@/components/ToolDirectory";
export const metadata = pageMetadata(
  "All Free Online Tools — A–Z",
  "Browse all 30 free online tools for text, development, images, design, PDFs, conversions, and everyday calculations.",
  "/tools/",
  "tools",
);
export default function Tools() {
  return (
    <div className="shell page-section">
      <header className="page-heading">
        <span className="eyebrow">THE MENTIX COLLECTION</span>
        <h1>All the tools. None of the hassle.</h1>
        <p>
          Thirty practical tools for the work between the work. Find yours, get
          it done, and move on.
        </p>
      </header>
      <ToolDirectory />
    </div>
  );
}
