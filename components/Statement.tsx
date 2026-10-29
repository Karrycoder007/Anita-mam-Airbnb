"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Statement({ text }: { text: string }) {
  const el = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(".w", { opacity: 0.16 }, {
        opacity: 1, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: el.current, start: "top 82%", end: "bottom 50%", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={el} className="font-display text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] tracking-[-0.01em]">
      {text.split(" ").map((w, i) => (<span key={i} className="w inline-block pr-[0.26em]">{w}</span>))}
    </p>
  );
}
