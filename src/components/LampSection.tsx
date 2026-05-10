"use client";

// ── Adapted from lamp.tsx ─────────────────────────────────────────────────────
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center overflow-hidden bg-[#0D0D10] w-full z-0",
        className
      )}
    >
      {/* Lamp assembly pinned to top border */}
      <div className="absolute top-0 left-0 right-0 flex justify-center items-start h-56 pointer-events-none z-0">

        {/* Left beam fanning down */}
        <motion.div
          initial={{ opacity: 0.4, width: "15rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`, maskImage: "linear-gradient(to bottom, white 30%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, white 30%, transparent)" }}
          className="absolute top-0 right-1/2 h-48 w-[40rem] bg-gradient-conic from-[#FF3030] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-40 h-full left-0 bg-[#0D0D10] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right beam fanning down */}
        <motion.div
          initial={{ opacity: 0.4, width: "15rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`, maskImage: "linear-gradient(to bottom, white 30%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, white 30%, transparent)" }}
          className="absolute top-0 left-1/2 h-48 w-[40rem] bg-gradient-conic from-transparent via-transparent to-[#FF3030] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-full right-0 bg-[#0D0D10] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        </motion.div>

        {/* Lamp line at top border */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "60rem" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-50 h-[3px] bg-[#FF3030]"
          style={{ boxShadow: "0 0 20px rgba(255,48,48,1), 0 0 60px rgba(255,48,48,0.6), 0 0 120px rgba(255,48,48,0.3)" }}
        />

        {/* Wide glow — fades on left, right, and bottom */}
        <motion.div
          initial={{ width: "15rem", opacity: 0.4 }}
          whileInView={{ width: "70rem", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-10 h-64"
          style={{
            background: "radial-gradient(ellipse 100% 90% at 50% 0%, rgba(255,48,48,0.35) 0%, rgba(255,48,48,0.12) 50%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, black 20%, transparent 90%)",
            WebkitMaskComposite: "destination-in",
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent), linear-gradient(to bottom, black 20%, transparent 90%)",
            maskComposite: "intersect",
          }}
        />

        {/* Soft bloom — fades all edges */}
        <motion.div
          initial={{ width: "15rem", opacity: 0.3 }}
          whileInView={{ width: "70rem", opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-10 h-28 blur-xl"
          style={{
            background: "linear-gradient(to bottom, rgba(255,48,48,0.55), transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, black 10%, transparent 85%)",
            WebkitMaskComposite: "destination-in",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent), linear-gradient(to bottom, black 10%, transparent 85%)",
            maskComposite: "intersect",
          }}
        />
      </div>

      {/* Content below lamp */}
      <div className="relative z-50 flex flex-col items-center px-5 text-center mt-24 pb-20">
        {children}
      </div>
    </div>
  );
};

export default function LampSection() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.9, ease: "easeInOut" }}
        className="flex flex-col items-center gap-6"
      >
        <p
          className="text-[9px] tracking-[3px] uppercase mb-2"
          style={{ color: '#FF3030', fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Begin Your Legacy
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl text-center leading-tight"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
        >
          <span style={{ color: '#ECECEC', fontWeight: 400 }}>
            Preserve Your Story.
          </span>
          <br />
          <span style={{ color: '#FF3030', fontWeight: 700 }}>
            Forever.
          </span>
        </h2>
        <p
          className="text-lg max-w-xl text-center mt-2"
          style={{ color: 'rgba(236,236,236,0.35)', fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Every conversation you have, every memory you share, every laugh, becomes part of your eternal EchoSoul.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Free Today
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </LampContainer>
  );
}
