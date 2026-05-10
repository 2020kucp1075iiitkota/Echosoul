"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const EchoSoulLogo = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF3030" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#FF3030" stopOpacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    <circle cx="22" cy="22" r="20" fill="url(#haloGrad)" />
    <circle cx="22" cy="22" r="19.5" stroke="#FF3030" strokeWidth="0.5" strokeOpacity="0.3" />
    <path
      d="M22 6C15.4 6 10 11.4 10 18C10 22.5 12.4 26.4 16 28.6V34C16 34.6 16.4 35 17 35H27C27.6 35 28 34.6 28 34V28.6C31.6 26.4 34 22.5 34 18C34 11.4 28.6 6 22 6Z"
      fill="rgba(255,48,48,0.06)" stroke="rgba(255,48,48,0.4)" strokeWidth="1"
    />
    <g filter="url(#glow)">
      <circle cx="22" cy="13" r="1.5" fill="#FF3030" />
      <circle cx="17" cy="17" r="1.2" fill="#ECECEC" />
      <circle cx="27" cy="17" r="1.2" fill="#ECECEC" />
      <circle cx="19" cy="22" r="1.2" fill="#FF3030" />
      <circle cx="25" cy="22" r="1.2" fill="#FF3030" />
      <circle cx="22" cy="27" r="1.5" fill="#ECECEC" />
      <line x1="22" y1="13" x2="17" y2="17" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.7" />
      <line x1="22" y1="13" x2="27" y2="17" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.7" />
      <line x1="17" y1="17" x2="19" y2="22" stroke="#ECECEC" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="27" y1="17" x2="25" y2="22" stroke="#ECECEC" strokeWidth="0.7" strokeOpacity="0.5" />
      <line x1="19" y1="22" x2="22" y2="27" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.7" />
      <line x1="25" y1="22" x2="22" y2="27" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.7" />
    </g>
  </svg>
);

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Talk to an Echo", href: "#chat-demo" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 0.86, 0.39, 0.96] }}
      className="fixed top-0 left-0 right-0 z-[200] transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(13,13,16,0.92)"
          : "rgba(13,13,16,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid rgba(255,48,48,0.08)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#FF3030]/10 blur-md scale-150 group-hover:scale-[1.8] transition-transform duration-500" />
              <EchoSoulLogo />
            </div>
            <span className="text-xl font-bold tracking-widest text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              EchoSoul
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="text-sm transition-colors duration-200 tracking-wide"
                style={{ color: "rgba(236,236,236,0.45)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FF3030")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(236,236,236,0.45)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="default" size="default"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}>
              Start Free
            </Button>
          </div>

          <button className="md:hidden text-[#ECECEC] p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0D0D10]/95 backdrop-blur-[16px] border-b border-white/[0.05]">
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href}
                  className="text-base transition-colors"
                  style={{ color: "rgba(236,236,236,0.45)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Button variant="default" size="default" className="w-full mt-2">Start Free</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
