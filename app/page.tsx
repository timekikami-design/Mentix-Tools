import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Zap,
  Type,
  ImageDown,
  Braces,
  Files,
  Pipette,
  ArrowLeftRight,
  Calculator,
  LockKeyhole,
  HardDrive,
  MousePointer2,
  MoveDown,
} from "lucide-react";
import { metadata as pageMetadata, siteUrl, siteName } from "@/lib/site";
import { tools, categories } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import ToolSearch from "@/components/ToolSearch";
import LiveWorkbench from "@/components/LiveWorkbench";
import Ticker from "@/components/Ticker";
import { JsonLd } from "@/components/seo/JsonLd";
export const metadata = pageMetadata(
  "30 Free Online Tools for Everyday Work",
  "Free online tools for PDFs, images, text, code, and calculations. No sign-ups. No file uploads. Meet your new everyday workspace.",
  "/",
);
const categoryIcons = [
  Type,
  Braces,
  ImageDown,
  Pipette,
  Files,
  ArrowLeftRight,
  Calculator,
];
const featureSlugs = [
  "word-counter",
  "image-compressor",
  "pdf-merge",
  "json-formatter",
  "qr-code-generator",
  "password-generator",
];
const categoryDescriptions: Record<string, string> = {
  Text: "Make every word work.",
  Developer: "Less debugging. More building.",
  Image: "Make a smaller, sharper impression.",
  Design: "Good details make the difference.",
  PDF: "Get your documents in order.",
  Converters: "A different unit. The same clarity.",
  Calculators: "Take the guesswork out.",
};
export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          description:
            "Free online utilities for PDFs, images, text, and everyday calculations.",
        }}
      />
      <section className="hero shell">
        <div className="hero-copy">
          <span className="hero-label">
            <span className="status-dot" /> YOUR EVERYDAY WORK, UPGRADED
          </span>
          <h1>
            Your next task.
            <br />
            <span>Already easier.</span>
          </h1>
          <p className="hero-description">
            The PDF to merge. The image to shrink. The idea to finish.
            <br className="desktop-break" /> Thirty thoughtfully made tools. One
            less thing in your way.
          </p>
          <div className="hero-actions">
            <Link href="/tools/" className="button">
              Explore the tools <ArrowUpRight size={17} />
            </Link>
            <a href="#popular-tools" className="hero-secondary">
              Find your everyday essentials <MoveDown size={15} />
            </a>
          </div>
          <ToolSearch />
          <div className="hero-benefits">
            <span>
              <Check size={14} /> Free. Not a free trial.
            </span>
            <span>
              <Check size={14} /> No sign-up
            </span>
            <span>
              <ShieldCheck size={14} /> Files stay with you
            </span>
          </div>
        </div>
        <LiveWorkbench />
      </section>
      <div className="trust-strip">
        <div className="shell">
          <span>
            <ShieldCheck size={17} /> PRIVATE BY DESIGN
          </span>
          <p>
            Works in your browser.{" "}
            <strong>Not on someone else’s server.</strong>
          </p>
          <span>
            <span className="status-dot" /> No uploads. No waiting room.
          </span>
        </div>
      </div>
      <section className="section shell" id="popular-tools">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <span>01 /</span> THE DAILY ROTATION
            </span>
            <h2>
              Less effort.
              <br className="mobile-break" /> Better done.
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Small jobs shouldn’t take up your whole day.
              <br />
              Start with the essentials.
            </p>
            <Link href="/tools/" className="inline-link">
              View all 30 tools <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="tools-grid featured-tools">
          {featureSlugs.map((slug) => (
            <ToolCard key={slug} tool={tools.find((t) => t.slug === slug)!} />
          ))}
        </div>
        <div className="collection-note" data-reveal>
          <span>
            <LockKeyhole size={15} /> No files are uploaded. No account is
            required.
          </span>
          <Link href="/privacy-policy/">
            A refreshingly short privacy story <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <section className="category-section">
        <div className="shell section">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">
                <span>02 /</span> FIND YOUR FLOW
              </span>
              <h2>Whatever’s on your list.</h2>
            </div>
            <p>
              Seven categories.
              <br />A shortcut for the everyday.
            </p>
          </div>
          <div className="category-grid">
            {categories.map((c, i) => {
              const Icon = categoryIcons[i];
              return (
                <Link
                  className="category-card"
                  key={c}
                  href={`/tools/category/${c.toLowerCase()}/`}
                >
                  <div className="category-top">
                    <span className="category-index">0{i + 1}</span>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>
                    {c === "Converters"
                      ? "Converters"
                      : c === "Calculators"
                        ? "Calculators"
                        : `${c} tools`}
                  </h3>
                  <p>{categoryDescriptions[c]}</p>
                  <div className="category-bottom">
                    <span>
                      {tools.filter((t) => t.category === c).length} tools
                    </span>
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              );
            })}
            <div className="category-card category-note">
              <MousePointer2 size={25} />
              <h3>
                Right tool.
                <br />
                Right now.
              </h3>
              <Link href="/tools/" className="inline-link">
                Find yours <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="shell section process-section">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow">
              <span>03 /</span> NO LEARNING CURVE
            </span>
            <h2>Open. Do. Done.</h2>
          </div>
          <p>That really is the whole process.</p>
        </div>
        <div className="process-grid">
          {[
            {
              n: "01",
              title: "Pick what you need.",
              text: "A file to finish or a number to check. Find the tool that fits.",
              icon: MousePointer2,
            },
            {
              n: "02",
              title: "Make it yours.",
              text: "Drop a file, paste your text, or adjust a setting. See what changes.",
              icon: Zap,
            },
            {
              n: "03",
              title: "Get on with your day.",
              text: "Copy or download your result. No email gates. No hidden final step.",
              icon: Check,
            },
          ].map(({ n, title, text, icon: Icon }) => (
            <article key={n} data-reveal>
              <div>
                <span>{n}</span>
                <Icon size={21} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="privacy-section" data-reveal>
        <div className="shell privacy-inner">
          <div>
            <span className="eyebrow">
              <span>LOCAL FIRST. ALWAYS.</span>
            </span>
            <h2>
              Your files don’t need
              <br />
              to go on a field trip.
            </h2>
            <p>
              Work with your documents, photos, and ideas without handing them
              over. Mentix does the processing on your device. We think that’s
              how it should be.
            </p>
            <Link href="/privacy-policy/" className="inline-link">
              Privacy without the fine-print feeling <ArrowUpRight size={16} />
            </Link>
            <p className="privacy-fine">
              Currency reference rates come from Frankfurter. Optional analytics
              and advertising require your consent.
            </p>
          </div>
          <div className="privacy-diagram">
            <div className="diagram-header">
              <span>THE SHORT VERSION</span>
              <LockKeyhole size={16} />
            </div>
            <div className="diagram-source">
              <HardDrive size={25} />
              <div>
                <strong>Your device</strong>
                <span>Where your files belong.</span>
              </div>
              <span className="diagram-badge">LOCAL</span>
            </div>
            <div className="diagram-path">
              <span />
              <small>Processed right here</small>
              <span />
            </div>
            <div className="diagram-result">
              <Check size={20} />
              <span>Your result. Ready to go.</span>
            </div>
            <div className="diagram-footer">
              <ShieldCheck size={14} /> No upload servers in the middle.
            </div>
          </div>
        </div>
      </section>
      <Ticker />
      <section className="bottom-note shell" data-reveal>
        <span className="eyebrow">KEEP A GOOD THING HANDY</span>
        <h2>
          Meet your new
          <br />
          <span>“I have a tool for that.”</span>
        </h2>
        <p>Free to use. Easy to come back to.</p>
        <Link href="/tools/" className="button">
          Find your next shortcut <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
