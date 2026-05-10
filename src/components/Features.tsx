"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Archive, Sparkles, Mic2, Heart, Mail, ShieldCheck } from "lucide-react";

const features = [
  { icon: Archive, title: "Memory Vault", description: "Stores every conversation, voice note, and precious memory in an encrypted digital archive that lasts forever." },
  { icon: Sparkles, title: "Personality Mirror", description: "Replicates your unique tone, humor, emotional range, and the subtle quirks that make you unmistakably you." },
  { icon: Mic2, title: "Voice Cloning", description: "Advanced neural voice synthesis ensures your EchoSoul responds in your actual voice, warm, familiar, real." },
  { icon: Heart, title: "Grief Companion", description: "Helps loved ones navigate loss through meaningful connection, providing comfort, closure, and continued presence." },
  { icon: Mail, title: "Legacy Letters", description: "Automatically sends personalized messages on birthdays, anniversaries, and milestones, even decades later." },
  { icon: ShieldCheck, title: "Secure & Private", description: "End-to-end encrypted. Your family controls access, permissions, and visibility, always and forever." },
];

export default function Features() {
  return (
    <section id="features" className="relative w-full py-14 md:py-[100px] overflow-hidden bg-[#0D0D10]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF3030]/[0.015] via-transparent to-[#FF3030]/[0.015] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#FF3030]/20 mb-6">
            <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "#FF3030", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Everything You Need to
            <br />
            <span style={{ color: "#FF3030" }}>Live Forever</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Six powerful features working together to capture, preserve, and perpetuate your unique human essence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative">
                <div
                  className={cn("relative p-7 rounded-xl h-full transition-all duration-300 hover:-translate-y-1.5 cursor-default")}
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(255,48,48,0.1)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,48,48,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "rgba(255,48,48,0.08)", border: "1px solid rgba(255,48,48,0.15)", color: "#FF3030" }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(236,236,236,0.4)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    {feature.description}
                  </p>
                  <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,48,48,0.4), transparent)" }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
