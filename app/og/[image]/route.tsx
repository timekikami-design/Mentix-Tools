import { ImageResponse } from "next/og";
import { tools, categories } from "@/lib/tools";
export const dynamic = "force-static";
export const dynamicParams = false;
const names: Record<string, string> = {
  home: "Your next task. Already easier.",
  tools: "Everyday work. Better done.",
  about: "Good tools get out of your way.",
  contact: "Let’s make it better.",
  "privacy-policy": "Your files. Still yours.",
  terms: "The details. In plain English.",
};
export function generateStaticParams() {
  return [
    ...Object.keys(names),
    ...tools.map((t) => t.slug),
    ...categories.map((c) => `category-${c.toLowerCase()}`),
  ].map((slug) => ({ image: `${slug}.png` }));
}
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params;
  const slug = image.replace(/\.png$/, "");
  const tool = tools.find((t) => t.slug === slug);
  const title =
    tool?.name || names[slug] || `${slug.replace("category-", "")} tools`;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#142326",
        display: "flex",
        flexDirection: "column",
        padding: "68px 76px",
        justifyContent: "space-between",
        color: "#f7f8f4",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#d4e8af",
              color: "#142326",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 32,
            }}
          >
            M
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: -1.4,
            }}
          >
            mentix tools.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 13,
            letterSpacing: 2,
            color: "#c3d2b7",
            border: "1px solid #52644c",
            borderRadius: 5,
            padding: "10px 14px",
          }}
        >
          FREE. LOCAL. USEFUL.
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 16,
            color: "#c3d2b7",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {tool?.category || "YOUR EVERYDAY WORKSPACE"}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 1010,
            fontWeight: 600,
            fontSize: title.length > 29 ? 67 : 80,
            letterSpacing: -4,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 25,
          borderTop: "1px solid #47604b",
        }}
      >
        <div style={{ display: "flex", fontSize: 21, color: "#c3d2b7" }}>
          No sign-ups. No file uploads. Just better done.
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#d4e8af" }}>↗</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
