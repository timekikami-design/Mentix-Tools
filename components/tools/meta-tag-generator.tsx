"use client";
import { useState } from "react";
import { Input, Textarea, Result, CopyButton } from "../ui";
export default function MetaTags() {
  const [title, setTitle] = useState(
    "Small tools. Less friction. | Mentix Tools",
  );
  const [desc, setDesc] = useState(
    "Free tools for text, images, and everyday tasks. No sign-ups. Your files stay in your browser.",
  );
  const [url, setUrl] = useState("https://example.com");
  const [image, setImage] = useState("https://example.com/social-card.jpg");
  const [site, setSite] = useState("Mentix Tools");
  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    ...Object.entries({
      type: "website",
      title,
      description: desc,
      url,
      image,
      site_name: site,
    }).map(([k, v]) => `<meta property="og:${k}" content="${esc(v)}">`),
    ...Object.entries({
      card: "summary_large_image",
      title,
      description: desc,
      image,
    }).map(([k, v]) => `<meta name="twitter:${k}" content="${esc(v)}">`),
  ].join("\n");
  const valid = (s: string) => {
    try {
      return ["http:", "https:"].includes(new URL(s).protocol);
    } catch {
      return false;
    }
  };
  return (
    <>
      <Input
        label={`Page title · ${title.length}/60 characters`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {title.length > 60 && (
        <p className="notice">This title may be truncated.</p>
      )}
      <Textarea
        label={`Meta description · ${desc.length}/155 characters`}
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {desc.length > 155 && (
        <p className="notice">This description may be truncated.</p>
      )}
      <div className="form-grid">
        <Input
          label="Page URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Input
          label="Site name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
      </div>
      <Input
        label="Social image URL"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      {(!valid(url) || !valid(image)) && (
        <p role="alert" className="notice error">
          Use full https:// URLs for the page and image.
        </p>
      )}
      <div className="split-view">
        <section className="search-preview">
          <span className="eyebrow">Search preview</span>
          <small>{url}</small>
          <h3>{title}</h3>
          <p>{desc}</p>
        </section>
        <section className="social-preview">
          <span className="social-art">
            {site}
            <span>↗</span>
          </span>
          <small>{url}</small>
          <h3>{title}</h3>
          <p>{desc}</p>
          <small>Image URL: {image} (not fetched for your privacy)</small>
        </section>
      </div>
      <Result label="Copy into your document head">
        <pre>{tags}</pre>
        <CopyButton text={tags} />
      </Result>
    </>
  );
}
