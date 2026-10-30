"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spaces } from "@/lib/site";

// Same arched-photo look as before, in one swipeable row instead of a long vertical list.
export default function Spaces() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [prog, setProg] = useState(0);

  const update = () => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setProg(max > 0 ? t.scrollLeft / max : 0);
  };
  const move = (d: 1 | -1) => {
    const t = track.current!;
    const card = t.querySelector("li") as HTMLElement;
    t.scrollBy({ left: d * (card.offsetWidth + 24), behavior: "smooth" });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: track.current, start: "top 82%" } });
      tl.fromTo(".sp-frame", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", stagger: 0.12 })
        .fromTo(".sp-h, .sp-p", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.05 }, 0.5);
    }, root.current!);
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <ul
        ref={track}
        onScroll={update}
        data-lenis-prevent
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {spaces.map((s) => (
          <li key={s.name} className="group shrink-0 basis-[80%] snap-start sm:basis-[46%] lg:basis-[30%]">
            <div className="sp-frame relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-moss">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt={s.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
            </div>
            <h3 className="sp-h mt-6 font-display text-4xl leading-none">{s.name}</h3>
            <div className="my-4 h-px w-16 bg-olive" />
            <p className="sp-p text-lg leading-relaxed text-moss">{s.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-center gap-6">
        <p className="hidden text-moss sm:block">Swipe or use the arrows</p>
        <div className="h-px flex-1 bg-moss/25"><div className="h-px origin-left bg-olive transition-transform duration-300" style={{ transform: `scaleX(${Math.max(0.12, prog)})` }} /></div>
        <div className="flex gap-3">
          <button onClick={() => move(-1)} disabled={prog <= 0.01} aria-label="Previous room" className="grid h-12 w-12 place-items-center rounded-full border border-moss/35 transition-colors hover:bg-chalk disabled:opacity-35"><ChevronLeft /></button>
          <button onClick={() => move(1)} disabled={prog >= 0.99} aria-label="Next room" className="grid h-12 w-12 place-items-center rounded-full border border-moss/35 transition-colors hover:bg-chalk disabled:opacity-35"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
}