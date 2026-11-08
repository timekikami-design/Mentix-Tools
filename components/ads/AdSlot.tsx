"use client";
import { useEffect, useRef } from "react";
export default function AdSlot({ slot }: { slot: string }) {
  const sent = useRef(false);
  const enabled =
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true" &&
    !!process.env.NEXT_PUBLIC_ADSENSE_ID &&
    !!slot;
  useEffect(() => {
    if (!enabled || sent.current) return;
    const push = () => {
      try {
        if (localStorage.getItem("mentix-tools-consent") !== "yes") return;
        const w = window as Window & { adsbygoogle?: object[] };
        (w.adsbygoogle ||= []).push({});
        sent.current = true;
      } catch {
        /* Storage restrictions or ad blockers must not interrupt a tool. */
      }
    };
    push();
    window.addEventListener("optional-consent-granted", push);
    return () => window.removeEventListener("optional-consent-granted", push);
  }, [enabled]);
  if (!enabled) return null;
  return (
    <aside className="ad-slot" aria-label="Advertisement">
      <small>Advertisement</small>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
