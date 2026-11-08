import type { Metadata } from "next";
export const siteName = "Mentix Tools";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
).replace(/\/$/, "");
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";
export function metadata(
  title: string,
  description: string,
  path = "/",
  imageSlug = "home",
  keywords?: string[],
): Metadata {
  const full = `${title} | ${siteName}`;
  return {
    title: full,
    description,
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: full,
      description,
      url: `${siteUrl}${path}`,
      siteName,
      type: "website",
      images: [
        {
          url: `${siteUrl}/og/${imageSlug}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [`${siteUrl}/og/${imageSlug}.png`],
    },
  };
}
