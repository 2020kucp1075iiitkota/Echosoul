"use client";

import { motion } from "framer-motion";

const EchoSoulLogoSmall = () => (
  <svg width="32" height="32" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="19.5" stroke="#FF3030" strokeWidth="0.5" strokeOpacity="0.3" />
    <path d="M22 6C15.4 6 10 11.4 10 18C10 22.5 12.4 26.4 16 28.6V34C16 34.6 16.4 35 17 35H27C27.6 35 28 34.6 28 34V28.6C31.6 26.4 34 22.5 34 18C34 11.4 28.6 6 22 6Z"
      fill="rgba(255,48,48,0.06)" stroke="rgba(255,48,48,0.35)" strokeWidth="1" />
    <circle cx="22" cy="13" r="1.5" fill="#FF3030" />
    <circle cx="17" cy="17" r="1.2" fill="#ECECEC" />
    <circle cx="27" cy="17" r="1.2" fill="#ECECEC" />
    <circle cx="19" cy="22" r="1.2" fill="#FF3030" />
    <circle cx="25" cy="22" r="1.2" fill="#FF3030" />
    <circle cx="22" cy="27" r="1.5" fill="#ECECEC" />
    <line x1="22" y1="13" x2="17" y2="17" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.6" />
    <line x1="22" y1="13" x2="27" y2="17" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.6" />
    <line x1="17" y1="17" x2="19" y2="22" stroke="#ECECEC" strokeWidth="0.7" strokeOpacity="0.4" />
    <line x1="27" y1="17" x2="25" y2="22" stroke="#ECECEC" strokeWidth="0.7" strokeOpacity="0.4" />
    <line x1="19" y1="22" x2="22" y2="27" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.6" />
    <line x1="25" y1="22" x2="22" y2="27" stroke="#FF3030" strokeWidth="0.7" strokeOpacity="0.6" />
  </svg>
);

const footerLinks = {
  Product: ["How It Works", "Features", "Pricing", "Security"],
  Company: ["About", "Careers", "Ethics Charter", "Press"],
  Support: ["Contact", "Help Center", "Privacy Policy", "Terms of Service"],
  Community: ["Stories", "Research", "Blog", "Newsletter"],
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#080809] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,48,48,0.3), rgba(255,48,48,0.5), rgba(255,48,48,0.3), transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }} className="flex flex-col gap-5">
              <a href="#" className="flex items-center gap-3 w-fit">
                <EchoSoulLogoSmall />
                <span className="text-lg font-bold tracking-widest text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  EchoSoul
                </span>
              </a>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Your Mind. Immortalized. Bridging life and legacy through the power of AI.
              </p>
              <p className="text-xs italic" style={{ color: "rgba(236,236,236,0.2)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                EchoSoul Inc. Bridging life and legacy through AI
              </p>
              <div className="flex gap-3 mt-2">
                {["X", "Li", "Gh", "Yt"].map((icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium transition-colors duration-200"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#FF3030")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(236,236,236,0.35)")}
                    aria-label={icon}>
                    {icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {Object.entries(footerLinks).map(([category, links], colIndex) => (
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: colIndex * 0.1 }} className="lg:col-span-1">
              <h4 className="text-[9px] font-semibold tracking-[3px] uppercase mb-5"
                style={{ color: "rgba(236,236,236,0.3)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors duration-200"
                      style={{ color: "rgba(236,236,236,0.4)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#FF3030")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(236,236,236,0.4)")}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(236,236,236,0.25)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            © {new Date().getFullYear()} EchoSoul Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3030] animate-pulse" />
            <span className="text-xs" style={{ color: "rgba(236,236,236,0.25)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              All systems operational
            </span>
          </div>
          <div className="flex gap-5">
            {["Privacy Policy", "Ethics Charter", "Terms"].map((link) => (
              <a key={link} href="#" className="text-xs transition-colors"
                style={{ color: "rgba(236,236,236,0.25)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FF3030")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(236,236,236,0.25)")}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
