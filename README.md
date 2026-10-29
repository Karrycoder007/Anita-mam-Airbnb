# Casa Olivar: pool-view 3BHK, Calangute

Next.js 14 (App Router), TypeScript, Tailwind, GSAP + ScrollTrigger, Lenis.

    npm install
    npm run dev      # http://localhost:3000
    npm run build

## Customize
Everything lives in `lib/site.ts`: name, WhatsApp number, email, Airbnb link, price,
photos, rooms, amenities, nearby distances, reviews, FAQs, rules.
Photos are Unsplash placeholders. Replace with the client's own (put files in `public/`, use `/photo.jpg`).
Reviews are samples. Replace with real ones. Map is set to Calangute: swap the `q=` value in
`app/contact/page.tsx` for the exact address if the client wants it shown.
Colors: `tailwind.config.ts`. Fonts: Instrument Serif and Hanken Grotesk (`app/layout.tsx`).
