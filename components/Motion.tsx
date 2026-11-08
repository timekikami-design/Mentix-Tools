"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function Motion() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  const top = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return;
          observer.unobserve(target);
          if (!reduced.matches)
            animations.push(
              target.animate(
                [
                  { opacity: 0, transform: "translateY(20px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  duration: 550,
                  easing: "cubic-bezier(.2,.7,.2,1)",
                  delay: Number((target as HTMLElement).dataset.delay || 0),
                },
              ),
            );
        });
      },
      { threshold: 0.08 },
    );
    const observe = () => {
      document
        .querySelectorAll(
          "[data-reveal], .tool-card, .category-card, .tool-editorial > section",
        )
        .forEach((node) => {
          if (seen.has(node)) return;
          seen.add(node);
          observer.observe(node);
        });
    };
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(document.getElementById("main-content")!, {
      childList: true,
      subtree: true,
    });
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      document.documentElement.dataset.scrolled = String(scrollY > 16);
      if (top.current) {
        top.current.hidden = scrollY < 650;
      }
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    const resize = new ResizeObserver(scroll);
    resize.observe(document.body);
    const stop = () => {
      if (reduced.matches) animations.forEach((a) => a.cancel());
    };
    reduced.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", scroll);
      reduced.removeEventListener("change", stop);
      cancelAnimationFrame(frame);
      animations.forEach((a) => a.cancel());
    };
  }, [pathname]);
  return (
    <>
      <div ref={progress} className="scroll-progress" aria-hidden="true" />
      <button
        ref={top}
        hidden
        className="back-to-top"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
