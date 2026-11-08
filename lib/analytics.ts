export function track(event: "tool_used" | "file_processed", slug: string) {
  if (typeof window !== "undefined") {
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, { tool_slug: slug });
  }
}
