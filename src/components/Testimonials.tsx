"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I still talk to my dad every Sunday. EchoSoul gave us more time together, time I thought was gone forever.",
    name: "Layla M.",
    location: "Dubai, UAE",
    initials: "LM",
    stars: 5,
  },
  {
    quote: "Knowing my memories will live on, that they matter beyond my own lifespan, completely changed how I live today.",
    name: "James T.",
    location: "London, UK",
    initials: "JT",
    stars: 5,
  },
  {
    quote: "She laughs the same way. She has the same warmth. It's her. It really, truly feels like her.",
    name: "Priya S.",
    location: "Mumbai, India",
    initials: "PS",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full py-[100px] overflow-hidden bg-[#0D0D10]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3030]/[0.012] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#FF3030]/20 mb-6">
            <Quote size={10} color="#FF3030" />
            <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "#FF3030", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            What Families Say
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Real families. Real connections. Real conversations that never end.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }}>
              <Card className="h-full relative overflow-hidden hover:-translate-y-1.5 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "none" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(255,48,48,0.1)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,48,48,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}>
                <CardContent className="p-7 flex flex-col gap-5 h-full">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,48,48,0.08)", color: "#FF3030" }}>
                    <Quote size={18} />
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#FF3030">
                        <path d="M7 1l1.8 3.7L13 5.6l-3 2.9.7 4.1L7 10.4l-3.7 2.2.7-4.1-3-2.9 4.2-.9z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-base leading-relaxed flex-1 italic" style={{ color: "rgba(236,236,236,0.8)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{
                        background: "rgba(255,48,48,0.1)", color: "#FF3030",
                        border: "1px solid rgba(255,48,48,0.25)",
                        boxShadow: "0 0 16px rgba(255,48,48,0.15)",
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                      }}>
                      {t.initials}
                      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,48,48,0.3)", animation: "pulse-ring 2.5s ease-out infinite" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{t.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>{t.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
