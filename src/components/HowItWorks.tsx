"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Infinity } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Mic className="w-8 h-8" />,
    title: "Capture",
    subtitle: "Record Every Moment",
    description: "AI continuously tracks your voice recordings, writings, daily reactions, and cherished memories, building a rich, living archive of who you truly are.",
  },
  {
    number: "02",
    icon: <Brain className="w-8 h-8" />,
    title: "Learn",
    subtitle: "Map Your Essence",
    description: "Our neural engine deep-maps your personality patterns, unique tone of voice, sense of humor, beliefs, and the way you see the world.",
    highlight: true,
  },
  {
    number: "03",
    icon: <Infinity className="w-8 h-8" />,
    title: "Transcend",
    subtitle: "Live Forever",
    description: "After you're gone, your EchoSoul lives on, allowing family and friends to have real conversations with you, forever.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative w-full py-[100px] overflow-hidden bg-[#0D0D10]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3030]/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#FF3030]/20 mb-6">
            <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "#FF3030", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              The Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            How It Works
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Three profound steps from living person to eternal presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }}
              className={step.highlight ? "p-px rounded-[17px]" : ""}
              style={step.highlight ? { background: "linear-gradient(135deg, #FF3030, rgba(255,48,48,0.2))" } : {}}>
              <div className="relative p-8 rounded-2xl h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: step.highlight ? "rgba(13,13,16,0.97)" : "rgba(255,255,255,0.025)",
                  border: step.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: step.highlight ? "0 0 40px rgba(255,48,48,0.1)" : "none",
                  borderRadius: step.highlight ? "16px" : "16px",
                }}>
                <span className="absolute top-6 right-6 text-4xl font-black opacity-[0.06] text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {step.number}
                </span>

                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,48,48,0.08)", border: "1px solid rgba(255,48,48,0.15)", color: "#FF3030" }}>
                  {step.icon}
                </div>

                <div className="space-y-3">
                  <p className="text-[9px] tracking-[3px] uppercase" style={{ color: "#FF3030", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    Step {step.number}: {step.title}
                  </p>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {step.subtitle}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: "rgba(236,236,236,0.4)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10" style={{ color: "rgba(236,236,236,0.2)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
