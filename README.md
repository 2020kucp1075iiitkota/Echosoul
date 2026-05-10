# EchoSoul — Your Mind. Immortalized.

> EchoSoul captures who you are — so the people you love never have to say goodbye.

A complete futuristic Next.js website for EchoSoul, an AI service that tracks a living person's memories, voice, personality, and behavior patterns throughout their lifetime. After they pass away, an AI agent replicates their mind — allowing family and friends to have real conversations with the deceased forever.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (IcosahedronGeometry with noise displacement shaders)
- **UI Primitives**: Radix UI Slot + Class Variance Authority
- **Icons**: Lucide React
- **Fonts**: Orbitron (headings) + Inter (body) via Google Fonts

## Sections

1. **Navbar** — Glassmorphism, sticky, with EchoSoul SVG logo
2. **Hero** — Floating neural shapes + particle canvas + brain SVG illustration
3. **How It Works** — 3-step process: Capture → Learn → Transcend
4. **Features** — 6 feature cards with glassmorphism + neon hover glow
5. **Lamp Section** — Animated cyan/violet lamp CTA (from lamp.tsx)
6. **Pricing** — 3 tiers with rotating gradient on "Soul" (Most Popular) card
7. **Testimonials** — 3 family testimonials with glowing circular avatars
8. **Chat Demo** — Live Three.js wireframe sphere + toggleable chat widget (Marcus Reed Echo)
9. **Footer** — Links, tagline, particle background

## Design Tokens

```
--bg-primary: #0A0A0F
--color-cyan:  #00F0FF
--color-violet: #7B2FFF
--color-pink:  #FF2FA0
--color-text:  #E8E8F0
--color-muted: #6B6B80
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Component Source Mapping

| EchoSoul Component | Adapted From |
|---|---|
| `Button.tsx` | `button.tsx` |
| `Card.tsx` | `card.tsx` |
| `ParticleCanvas.tsx` | `hero-futuristic.tsx` (simplified to canvas 2D) |
| `Hero.tsx` | `shape-landing-hero.tsx` |
| `HowItWorks.tsx` | `feature-sections-demo.tsx` |
| `Features.tsx` | `feature-sections.tsx` + `card.tsx` |
| `LampSection.tsx` | `lamp.tsx` |
| `Pricing.tsx` | `rotating-gradient-right.tsx` + `card.tsx` |
| `Testimonials.tsx` | `card.tsx` |
| `ChatDemo.tsx` | `anomalous-matter-hero.tsx` |
