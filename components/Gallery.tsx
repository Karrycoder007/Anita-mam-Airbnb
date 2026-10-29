"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/site";

// Desktop: section pins and photos travel sideways as you scroll. Mobile: swipeable row.
const widths = ["md:w-[34vw]", "md:w-[26vw]", "md:w-[30vw]", "md:w-[40vw]", "md:w-[30vw]", "md:w-[34vw]"];
const heights = ["md:h-[48vh]", "md:h-[60vh]", "md:h-[52vh]", "md:h-[62vh]", "md:h-[50vh]", "md:h-[58vh]"];
const aligns = ["md:self-start", "md:self-end", "md:self-start", "md:self-end", "md:self-start", "md:self-end"];

export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const t = track.current!;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      const tween = gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            setActive(Math.round(self.progress * (gallery.length - 1)));
          },
        },
      });
      gsap.utils.toArray<HTMLElement>(".g-img").forEach((im) => {
        gsap.fromTo(im, { xPercent: -7 }, {
          xPercent: 7, ease: "none",
          scrollTrigger: { trigger: im.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);

  return (
    <section ref={section} id="gallery" className="relative bg-forest py-24 text-chalk md:flex md:h-screen md:flex-col md:overflow-hidden md:py-0">
      <div className="flex items-end justify-between px-6 md:px-12 md:pt-36">
        <h2 className="font-display text-5xl leading-none md:text-7xl">A look around</h2>
        <p className="hidden text-chalk/70 md:block">{gallery[active].cap}</p>
      </div>

      <div className="md:min-h-0 md:flex-1">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 py-10 [scrollbar-width:none] md:h-full md:w-max md:snap-none md:items-center md:gap-8 md:overflow-visible md:px-12 md:py-0"
        >
          {gallery.map((g, i) => (
            <figure key={g.src} className={`w-[78vw] shrink-0 snap-center ${widths[i]} ${aligns[i]}`}>
              <button
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${g.alt}`}
                className={`relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-moss md:aspect-auto ${heights[i]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="lazy" draggable={false} className="g-img absolute -left-[10%] top-0 h-full w-[120%] max-w-none object-cover" />
              </button>
              <figcaption className="mt-3 text-[15px] text-chalk/70 md:hidden">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="hidden items-center gap-6 px-12 pb-10 md:flex">
        <span className="text-sm text-chalk/60">Scroll to explore</span>
        <div className="h-px flex-1 bg-chalk/20"><div ref={bar} className="h-px origin-left scale-x-0 bg-chalk" /></div>
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/95 p-4 md:p-12" onClick={() => setOpen(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[open].src} alt={gallery[open].alt} className="max-h-full max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-chalk/80">{gallery[open].cap}</p>
          <button className="absolute right-5 top-5 text-chalk" onClick={() => setOpen(null)}>Close</button>
          <button className="absolute left-4 top-1/2 px-3 py-6 text-3xl text-chalk" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + gallery.length) % gallery.length); }}>‹</button>
          <button className="absolute right-4 top-1/2 px-3 py-6 text-3xl text-chalk" aria-label="Next" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % gallery.length); }}>›</button>
        </div>
      )}
    </section>
  );
}