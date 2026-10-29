"use client";
import { useState } from "react";
import { spaces } from "@/lib/site";

export default function Spaces() {
  const [a, setA] = useState(0);
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-3xl bg-moss">
          {spaces.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.name} src={s.img} alt={s.name} className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ${a === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
          ))}
        </div>
      </div>
      <ul>
        {spaces.map((s, i) => (
          <li key={s.name} onMouseEnter={() => setA(i)} onFocus={() => setA(i)} tabIndex={0} className="border-t border-moss/20 py-10 outline-none first:border-t-0 first:pt-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.img} alt={s.name} className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover lg:hidden" />
            <h3 className={`font-display text-4xl transition-colors md:text-5xl ${a === i ? "text-forest" : "text-forest/40"}`}>{s.name}</h3>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-moss">{s.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
