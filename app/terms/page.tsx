import { metadata as pageMetadata, contactEmail } from "@/lib/site";
export const metadata = pageMetadata(
  "Terms of Use — Clear Expectations",
  "Mentix Tools terms: free personal and commercial use, user responsibility for files, calculator limitations, and no warranty.",
  "/terms/",
  "terms",
);
export default function Terms() {
  return (
    <article className="reading-column prose-page">
      <span className="eyebrow">FAIR EXPECTATIONS</span>
      <h1>Terms of use.</h1>
      <p>
        Effective November 6, 2026. By using Mentix Tools, you agree to these
        terms. If you do not agree, please do not use the site. These terms
        require operator legal review before a public launch.
      </p>
      <h2>Free use</h2>
      <p>
        You may use the tools for lawful personal or commercial tasks. You
        retain your rights to your files, text, and generated output. We do not
        claim ownership of your content. Open-source dependencies retain their
        own licenses.
      </p>
      <h2>Your responsibility</h2>
      <p>
        You are responsible for having permission to process a file, checking
        results before relying on them, and keeping backup originals. Do not use
        the site to infringe rights, commit fraud, bypass document protection
        without authorization, or interfere with the service.
      </p>
      <h2>No professional advice</h2>
      <p>
        Financial estimates, health screening values, age calculations, exchange
        references, and other results are informational. They are not medical,
        legal, financial, or other professional advice. Obtain qualified advice
        for consequential decisions.
      </p>
      <h2>No warranty</h2>
      <p>
        The site and its output are provided “as is” and “as available,” without
        guarantees of accuracy, availability, fitness for a particular purpose,
        or preservation of document features. A PDF rebuild can remove
        signatures, forms, links, or accessibility information. Image exports
        can remove metadata. Verify output before sharing or deleting an
        original.
      </p>
      <h2>Limitations of liability</h2>
      <p>
        To the extent permitted by applicable law, the operator is not liable
        for indirect or consequential losses, lost data, lost profits, or
        decisions made in reliance on a tool. Nothing in these terms excludes
        liability or consumer rights that cannot lawfully be excluded.
      </p>
      <h2>Third-party services</h2>
      <p>
        Frankfurter supplies exchange references. Optional Google services and
        external links are subject to their own terms and policies. We do not
        control their availability or the actions of your browser, email
        provider, or operating system.
      </p>
      <h2>Availability and changes</h2>
      <p>
        We may change, suspend, or remove tools without a guarantee of ongoing
        service. Updated terms will appear here with a revised date. The
        operator must add any applicable governing-law and entity details after
        legal review.
      </p>
      <h2>Contact</h2>
      <p>
        Questions can be sent to{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Replace the
        example mailbox in the site configuration before launch.
      </p>
    </article>
  );
}
