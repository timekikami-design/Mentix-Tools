import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";
import { metadata as pageMetadata } from "@/lib/site";
import ToolCard from "@/components/ToolCard";
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.toLowerCase() }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return pageMetadata(
    `Free ${category.charAt(0).toUpperCase() + category.slice(1)} Tools`,
    `Free ${category} tools that run in your browser. No account needed. Find the right tool for your next task.`,
    `/tools/category/${category}/`,
    `category-${category}`,
  );
}
export default async function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = categories.find((c) => c.toLowerCase() === category);
  if (!name) notFound();
  return (
    <section className="shell page-section">
      <header className="page-heading">
        <span className="eyebrow">THE MENTIX COLLECTION</span>
        <h1>{name} tools.</h1>
        <p>
          Practical help for your next {name.toLowerCase()} task. All free. All
          in your browser.
        </p>
      </header>
      <div className="tools-grid">
        {tools
          .filter((t) => t.category === name)
          .map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
      </div>
    </section>
  );
}
