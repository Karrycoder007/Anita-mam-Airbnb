"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/site";

// Staggered editorial layout (desktop). Single column on phones, in the same order.
const layout = [
  "md:col-span-7 aspect-[4/3]",
  "md:col-span-4 md:col-start-9 md:mt-28 aspect-[4/5]",
  "md:col-span-5 md:col-start-2 aspect-[4/5]",
  "md:col-span-5 md:col-start-8 md:mt-32 aspect-[4/3]",
  "md:col-span-7 aspect-[16/10]",
  "md:col-span-4 md:col-start-9 md:mt-20 aspect-[4/5]",
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const next = () => setOpen((i) => (i! + 1) % gallery.length);
  const prev = () => setOpen((i) => (i! - 1 + gallery.length) % gallery.length);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".gh-line", { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: ".gh-line", start: "top 88%" } });
      gsap.from(".gh-sub", { opacity: 0, y: 20, duration: 1, delay: 0.3, scrollTrigger: { trigger: ".gh-line", start: "top 88%" } });

      gsap.utils.toArray<HTMLElement>(".g-fig").forEach((fig) => {
        const frame = fig.querySelector(".g-frame");
        const im = fig.querySelector(".g-img");
        const cap = fig.querySelector(".g-cap");
        gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 88%" } })
          .fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" })
          .fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: "expo.out" }, 0)
          .fromTo(cap, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.6);
        gsap.fromTo(im, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root.current!);
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);

  return (
    <section ref={root} id="gallery" className="px-6 py-28 md:px-12 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <h2 className="font-display text-6xl leading-[0.95] md:text-8xl">
            <span className="h-mask"><span className="gh-line block">Photos of</span></span>
            <span className="h-mask"><span className="gh-line block italic text-olive">the home</span></span>
          </h2>
          <p className="gh-sub max-w-xs text-lg leading-relaxed text-moss">A walk through the rooms, the pool and the small details. Tap any photo to see it larger.</p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-12">
          {gallery.map((g, i) => (
            <figure key={g.src} className={`g-fig ${layout[i].replace(/aspect-\S+/, "")}`}>
              <button onClick={() => setOpen(i)} aria-label={`Open photo: ${g.alt}`} className={`g-frame group relative block w-full overflow-hidden rounded-[1.25rem] bg-sage ${layout[i].match(/aspect-\S+/)![0]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="lazy" className="g-img absolute -top-[6%] h-[112%] w-full object-cover" />
                <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-chalk/80 text-2xl text-forest backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-chalk">+</span>
              </button>
              <figcaption className="g-cap mt-4 font-display text-2xl text-forest">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" data-lenis-prevent className="fixed inset-0 z-[60] flex flex-col bg-forest/95 p-4 md:p-8" onClick={() => setOpen(null)}>
          <div className="flex items-center justify-between text-chalk">
            <p className="font-display text-2xl">{gallery[open].cap}</p>
            <button onClick={() => setOpen(null)} className="rounded-full border border-chalk/40 px-6 py-3 text-lg">Close</button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gallery[open].src} alt={gallery[open].alt} className="max-h-full max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          </div>
          <div className="flex justify-center gap-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} className="rounded-full bg-chalk px-8 py-3 text-lg text-forest">← Previous</button>
            <button onClick={next} className="rounded-full bg-chalk px-8 py-3 text-lg text-forest">Next →</button>
          </div>
        </div>
      )}
    </section>
  );
}