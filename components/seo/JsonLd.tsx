import { siteUrl } from "@/lib/site";
import type { Tool } from "@/lib/tools";
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function ToolJsonLd({ tool }: { tool: Tool }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            name: tool.name,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any modern web browser",
            url: `${siteUrl}/tools/${tool.slug}/`,
            description: tool.metaDescription,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
          {
            "@type": "FAQPage",
            mainEntity: tool.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "All tools",
                item: `${siteUrl}/tools/`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: tool.name,
                item: `${siteUrl}/tools/${tool.slug}/`,
              },
            ],
          },
        ],
      }}
    />
  );
}
