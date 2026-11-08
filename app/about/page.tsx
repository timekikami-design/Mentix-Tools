import Link from "next/link";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About — A Simpler Everyday Toolbox",
  "About Mentix Tools: 30 free browser-based tools, built to reduce busywork while keeping your text and files on your device.",
  "/about/",
  "about",
);
export default function About() {
  return (
    <article className="reading-column prose-page">
      <span className="eyebrow">A SMALL IDEA, MADE USEFUL</span>
      <h1>A little less busywork.</h1>
      <p>
        Some tasks should take a minute, not an afternoon. Resize a picture.
        Count a draft. Combine a few PDFs. Mentix Tools puts those everyday jobs
        in one calm place.
      </p>
      <h2>What this site is for</h2>
      <p>
        This is a collection of thirty focused tools for writers, developers,
        designers, and anyone with a file to finish or a number to check. You do
        not need an account. You can start with the example, change the
        settings, and take the result with you.
      </p>
      <h2>How the tools work</h2>
      <p>
        Your browser does the processing. Text is analyzed in JavaScript. Images
        are drawn to a local canvas. PDFs are read and rebuilt on your device.
        Your source files are not uploaded to a processing server. Currency
        conversion is the one tool that asks an outside service, Frankfurter,
        for reference rates; the amount is calculated locally.
      </p>
      <h2>Who built it</h2>
      <p>
        Mentix Tools is an independently maintained web project, built with
        TypeScript, Next.js, and open-source browser libraries. We prefer clear
        controls and honest limitations over inflated promises. The operator’s
        legal identity is listed in the privacy policy and must be configured
        before a public launch.
      </p>
      <h2>A note about “free”</h2>
      <p>
        These tools have no subscription or account fee. Optional advertising
        may support the site if enabled by its operator and accepted in cookie
        preferences. Optional analytics never include file names, text, or file
        contents.
      </p>
      <p>
        <Link href="/tools/">Find a tool</Link> or{" "}
        <Link href="/contact/">tell us what could be better</Link>.
      </p>
    </article>
  );
}
