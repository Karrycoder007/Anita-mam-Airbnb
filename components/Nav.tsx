"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#story", label: "The stay" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/contact", label: "Contact" },
];

const ease = "ease-[cubic-bezier(.76,0,.24,1)]";

// Text that rolls up and is replaced by a copy on hover
function Roll({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className={`block transition-transform duration-500 ${ease} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}>{children}</span>
      <span aria-hidden className={`absolute inset-0 block translate-y-full transition-transform duration-500 ${ease} group-hover:translate-y-0 group-focus-visible:translate-y-0`}>{children}</span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > last && y > 500);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  // light text over the hero photo; dark text everywhere else
  const light = open || (pathname === "/" && !scrolled);

  return (
    <>
      <header
        className={`fixed inset-x-4 top-4 z-50 transition-transform duration-500 ${ease} md:inset-x-8 md:top-6 ${hidden && !open ? "-translate-y-[150%]" : "translate-y-0"}`}
      >
        <div
          className={`flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-colors duration-500 md:px-8 md:py-3.5 ${
            light ? "border-chalk/25 bg-chalk/10 text-chalk" : "border-forest/10 bg-chalk/70 text-forest shadow-[0_8px_30px_-12px_rgba(30,40,27,.25)]"
          }`}
        >
          <Link href="/" className="font-display text-[1.7rem] leading-none md:text-3xl">{site.name}</Link>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="group text-[15px]">
                <Roll>{l.label}</Roll>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`group rounded-full px-6 py-2.5 text-[15px] transition-colors duration-500 ${light ? "bg-chalk text-forest" : "bg-moss text-chalk"}`}
            >
              <Roll>Book your stay</Roll>
            </Link>
          </nav>

          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden">
            <span className={`h-px w-7 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-7 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 flex flex-col justify-end bg-forest px-6 pb-12 pt-28 text-chalk transition-transform duration-700 ${ease} md:hidden ${open ? "translate-y-0" : "-translate-y-full"}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-chalk/15 py-4 font-display text-5xl">
            {l.label}
          </Link>
        ))}
        <p className="mt-8 text-sm text-chalk/60">{site.area}</p>
      </div>
    </>
  );
}