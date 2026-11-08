"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { Button } from "./ui";
export default function Consent() {
  const [consent, setConsent] = useState<string | null>("pending");
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ads = process.env.NEXT_PUBLIC_ADSENSE_ID;
  useEffect(() => {
    try {
      setConsent(localStorage.getItem("mentix-tools-consent"));
    } catch {
      setConsent(null);
    }
    const open = () => setConsent(null);
    window.addEventListener("privacy-settings", open);
    return () => window.removeEventListener("privacy-settings", open);
  }, []);
  if (!ga && !ads) return null;
  const choose = (v: string) => {
    setConsent(v);
    try {
      localStorage.setItem("mentix-tools-consent", v);
    } catch {
      /* Consent can remain in tab memory when storage is blocked. */
    }
    if (v === "yes")
      window.dispatchEvent(new Event("optional-consent-granted"));
    if (v === "no") window.location.reload();
  };
  return (
    <>
      {consent === null && (
        <section className="consent" aria-label="Privacy preferences">
          <p>
            Optional analytics and advertising use third-party cookies. Your
            tool inputs are never included.
          </p>
          <Button onClick={() => choose("yes")}>Allow optional cookies</Button>
          <Button secondary onClick={() => choose("no")}>
            Essential only
          </Button>
        </section>
      )}
      {consent === "yes" && (
        <>
          {ga && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`}
                strategy="afterInteractive"
              />
              <Script
                id="ga-config"
                strategy="afterInteractive"
              >{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(ga)},{anonymize_ip:true});`}</Script>
            </>
          )}
          {ads && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ads)}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}
        </>
      )}
    </>
  );
}
