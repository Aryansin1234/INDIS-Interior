# INDIS Interiors Implementation Track

## Stack

- Next.js App Router, React, TypeScript.
- GSAP + ScrollTrigger for purposeful scroll choreography.
- Framer Motion for mobile navigation and micro-interactions.
- Lucide icons.
- Global CSS variables in `app/globals.css` for colour, type, spacing, radius, shadows, timing, and layout sizing.

## Pages to keep complete

- `/` — immersive homepage.
- `/projects` and `/projects/[slug]` — data-driven portfolio placeholders ready for real INDIS photography.
- `/collections` and `/collections/[slug]` — Living, Bedroom, Dining, Kitchen, Accent.
- `/services` and `/services/[slug]` — Modular Kitchens, Wardrobes & Storage, Full Home Interiors, False Ceiling & Lighting, Custom Design Solutions.
- `/design-ideas` — inspiration hub.
- `/about` — studio identity and business details.
- `/journal` and `/journal/[slug]` — editorial article structure.
- `/contact` — enquiry, WhatsApp, email, office/factory details.

## Responsive rules tracked

- Desktop: cinematic hero, asymmetric compositions, pinned horizontal project gallery, richer hover states.
- Tablet: reduced pinning complexity, adjusted image proportions, touch-safe spacing.
- Mobile: vertical portfolio flow, no forced horizontal scroll, full-screen nav, prominent WhatsApp/contact CTAs, simplified motion.

## Asset note

No genuine INDIS project imagery or PDF was present in the workspace at scaffold time. All current photography references live in `data/site.ts`, are marked as conceptual placeholders, and should be replaced with real studio assets before production launch.
