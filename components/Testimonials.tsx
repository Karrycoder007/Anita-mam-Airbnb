"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "@/lib/site";

const small = (url: string) => url.replace("w=1800", "w=400");

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLElement>(null);
  const go = (n: number) => setI((n + reviews.length) % reviews.length);

  // auto-advance every few seconds; stops while hovering and for reduced-motion users
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(i + 1), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);

  useEffect(() => {
    if (!box.current) return;
    gsap.fromTo(box.current.children, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" });
  }, [i]);

  const r = reviews[i];

  return (
    <section className="px-6 py-24 md:px-12 md:py-36" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-5xl leading-none md:text-7xl">What guests say</h2>

        <figure ref={box} key={i} className="mt-14 flex min-h-[23rem] flex-col items-center md:min-h-[25rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={small(r.photo)} alt={r.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-sage" />
          <div className="mt-5 flex gap-1 text-olive" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={18} fill="currentColor" strokeWidth={0} />)}
          </div>
          <blockquote className="mt-6 font-display text-3xl leading-snug md:text-4xl">“{r.q}”</blockquote>
          <figcaption className="mt-6 text-lg">
            <span className="font-medium">{r.name}</span>
            <span className="text-moss">, {r.place}</span>
          </figcaption>
        </figure>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button onClick={() => go(i - 1)} aria-label="Previous review" className="grid h-12 w-12 place-items-center rounded-full border border-moss/30 transition-colors hover:bg-sage">
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-1">
            {reviews.map((_, n) => (
              <button key={n} onClick={() => go(n)} aria-label={`Show review ${n + 1}`} className="grid h-8 place-items-center px-1">
                <span className={`block h-2.5 rounded-full transition-all duration-500 ${n === i ? "w-8 bg-olive" : "w-2.5 bg-moss/25"}`} />
              </button>
            ))}
          </div>
          <button onClick={() => go(i + 1)} aria-label="Next review" className="grid h-12 w-12 place-items-center rounded-full border border-moss/30 transition-colors hover:bg-sage">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}