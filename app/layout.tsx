import type { Metadata } from "next";
import { DM_Sans, Public_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Menu, ArrowRight } from "lucide-react";
import { siteUrl } from "@/lib/site";
import Consent from "@/components/Consent";
import PrivacySettings from "@/components/PrivacySettings";
import Motion from "@/components/Motion";
import "./globals.css";
const display = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mentix Tools — Make room for better work",
  description:
    "30 free browser-based tools for text, images, PDFs, and everyday calculations.",
  icons: { icon: "/favicon.svg" },
};
function Brand() {
  return (
    <>
      <span className="brand-mark" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 18V6h4.5L12 13l4.5-7H21v12h-4V12l-5 7-5-7v6H3Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span>
        mentix<span className="brand-suffix">tools</span>
        <span className="brand-dot">.</span>
      </span>
    </>
  );
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="announcement">
          <span className="status-dot" /> A better way to get the everyday done.
          <Link href="/tools/">
            Meet your new toolbox <ArrowRight size={12} />
          </Link>
        </div>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand" aria-label="Mentix Tools home">
              <Brand />
            </Link>
            <nav aria-label="Main navigation">
              <Link href="/tools/">
                All tools <span className="nav-count">30</span>
              </Link>
              <Link href="/tools/category/pdf/" className="desktop-nav">
                PDF
              </Link>
              <Link href="/tools/category/image/" className="desktop-nav">
                Images
              </Link>
              <Link href="/about/" className="about-nav">
                Our approach
              </Link>
            </nav>
            <Link className="header-cta" href="/tools/">
              Find your tool <ArrowUpRight size={16} />
            </Link>
            <details className="mobile-menu">
              <summary aria-label="Open navigation">
                <Menu size={23} />
              </summary>
              <nav aria-label="Mobile navigation">
                <Link href="/tools/">Browse all 30 tools</Link>
                <Link href="/tools/category/pdf/">PDF tools</Link>
                <Link href="/tools/category/image/">Image tools</Link>
                <Link href="/about/">Our approach</Link>
                <Link href="/contact/">Contact</Link>
              </nav>
            </details>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-top">
            <div>
              <Link href="/" className="brand" aria-label="Mentix Tools home">
                <Brand />
              </Link>
              <p>
                Good tools get out of your way.
                <br />
                Go make something that matters.
              </p>
              <span className="privacy-note">
                <ShieldCheck size={15} /> Your workspace. Your data. Your
                business.
              </span>
            </div>
            <div>
              <h2>The toolbox</h2>
              <Link href="/tools/">
                All 30 tools <ArrowUpRight size={12} />
              </Link>
              <Link href="/tools/category/text/">Text & writing</Link>
              <Link href="/tools/category/developer/">Development</Link>
              <Link href="/tools/category/image/">Images & design</Link>
              <Link href="/tools/category/pdf/">PDF documents</Link>
            </div>
            <div>
              <h2>Good to know</h2>
              <Link href="/about/">About Mentix</Link>
              <Link href="/contact/">Get in touch</Link>
              <Link href="/privacy-policy/">Privacy policy</Link>
              <Link href="/terms/">Terms of use</Link>
              <PrivacySettings />
            </div>
          </div>
          <div className="shell footer-bottom">
            <span>
              © {new Date().getFullYear()} Mentix Tools. Made for the way you
              work.
            </span>
            <span>
              <span className="status-dot" /> All tools free. Always.
            </span>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            mentix.
          </div>
        </footer>
        <Motion />
        <Consent />
      </body>
    </html>
  );
}
