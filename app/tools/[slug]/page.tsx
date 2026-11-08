import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight } from "lucide-react";
import { tools, getTool } from "@/lib/tools";
import { metadata as pageMetadata } from "@/lib/site";
import ToolRenderer from "@/components/tools/ToolRenderer";
import ToolCard from "@/components/ToolCard";
import ToolIcon from "@/components/ToolIcon";
import { ToolJsonLd } from "@/components/seo/JsonLd";
import AdSlot from "@/components/ads/AdSlot";
import AffiliateCard from "@/components/ads/AffiliateCard";
export const dynamicParams = false;
export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTool(slug);
  return t
    ? pageMetadata(
        t.seoTitle,
        t.metaDescription,
        `/tools/${slug}/`,
        slug,
        t.keywords,
      )
    : {};
}
export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  return (
    <div className="shell tool-page">
      <ToolJsonLd tool={tool} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight size={12} />
        <Link href="/tools/">All tools</Link>
        <ChevronRight size={12} />
        <span>{tool.name}</span>
      </nav>
      <header className="tool-heading">
        <span className={`icon-tile category-${tool.category.toLowerCase()}`}>
          <ToolIcon name={tool.icon} size={28} />
        </span>
        <Link
          className="eyebrow"
          href={`/tools/category/${tool.category.toLowerCase()}/`}
        >
          {tool.category} tools
        </Link>
        <h1>{tool.name}</h1>
        <p>{tool.intro}</p>
        <span className="privacy-note">
          <ShieldCheck size={15} /> Local processing · No account needed ·
          Always free
        </span>
      </header>
      <ToolRenderer slug={slug} />
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_1 || ""} />
      <div className="reading-column tool-editorial">
        <section>
          <h2>How to use {tool.name.toLowerCase()}</h2>
          <ol className="steps">
            {tool.steps.map((s, i) => (
              <li key={s}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </section>
        <section>
          <span className="eyebrow">THE DETAILS</span>
          <h2>Why it matters</h2>
          {tool.why.split("\n\n").map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <section>
          <h2>Frequently asked questions</h2>
          {tool.faq.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <span>+</span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </section>
      </div>
      <AdSlot slot={process.env.NEXT_PUBLIC_AD_SLOT_2 || ""} />
      {["PDF", "Image"].includes(tool.category) &&
        process.env.NEXT_PUBLIC_AFFILIATE_URL && (
          <AffiliateCard
            title={
              process.env.NEXT_PUBLIC_AFFILIATE_TITLE || "For your next project"
            }
            description={
              process.env.NEXT_PUBLIC_AFFILIATE_DESCRIPTION ||
              "An optional resource from a supporting partner."
            }
            link={process.env.NEXT_PUBLIC_AFFILIATE_URL}
          />
        )}
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">KEEP THINGS MOVING</span>
            <h2>Keep your workflow moving.</h2>
          </div>
          <Link className="inline-link" href="/tools/">
            All tools →
          </Link>
        </div>
        <div className="tools-grid">
          {tool.related.map((s) => {
            const t = getTool(s);
            return t ? <ToolCard key={s} tool={t} /> : null;
          })}
        </div>
      </section>
    </div>
  );
}
