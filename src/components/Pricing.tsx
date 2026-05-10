"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Spark",
    price: "Free",
    period: "",
    tagline: "Start your journey",
    buttonVariant: "ghost" as const,
    buttonLabel: "Get Started Free",
    highlight: false,
    features: [
      "Basic memory tracking",
      "1 GB memory vault",
      "Limited Echo access (5 sessions/month)",
      "Text-only responses",
      "Community support",
    ],
  },
  {
    name: "Soul",
    price: "$29",
    period: "/mo",
    tagline: "Most Popular",
    buttonVariant: "default" as const,
    buttonLabel: "Choose Soul",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Full memory & behavior tracking",
      "50 GB memory vault",
      "Voice cloning included",
      "1 Echo activation (post-passing)",
      "Unlimited family sessions",
      "Priority AI processing",
    ],
  },
  {
    name: "Eternal",
    price: "$99",
    period: "/mo",
    tagline: "For your entire legacy",
    buttonVariant: "outline" as const,
    buttonLabel: "Go Eternal",
    highlight: false,
    features: [
      "Unlimited memory tracking",
      "Unlimited vault storage",
      "Advanced voice cloning + emotion",
      "Unlimited Echo activations",
      "Legacy Letters (birthdays, anniversaries)",
      "Dedicated Echo agent",
      "White-glove family onboarding",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative w-full py-14 md:py-[100px] overflow-hidden bg-[#0D0D10]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF3030]/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-[#FF3030]/20 mb-6">
            <Zap size={10} color="#FF3030" />
            <span className="text-[9px] tracking-[3px] uppercase" style={{ color: "#FF3030", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Choose Your Eternity
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Start for free. Upgrade when you're ready to make your presence permanent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative">
              {plan.highlight && (
                <div className="absolute -inset-[1px] rounded-[22px] overflow-hidden z-0">
                  <div className="absolute inset-0 rounded-[22px]"
                    style={{ background: "conic-gradient(from 0deg, #FF3030, #FF8080, #FF3030, #CC0000, #FF3030)", animation: "spin 6s linear infinite" }} />
                </div>
              )}

              <Card className="relative z-10 h-full rounded-[20px] overflow-hidden"
                style={{
                  background: plan.highlight ? "rgba(13,13,16,0.97)" : "rgba(255,255,255,0.025)",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: plan.highlight ? "none" : "none",
                }}>
                <CardContent className="p-7 flex flex-col h-full gap-6">
                  <div>
                    {plan.badge && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                        style={{ background: "rgba(255,48,48,0.1)", color: "#FF3030", border: "1px solid rgba(255,48,48,0.2)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#FF3030]" />
                        {plan.badge}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm" style={{ color: plan.highlight ? "#FF3030" : "rgba(236,236,236,0.4)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold" style={{ color: plan.highlight ? "#FF3030" : "#ECECEC", fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-lg" style={{ color: "rgba(236,236,236,0.35)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>{plan.period}</span>
                    )}
                  </div>

                  <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.07)", overflow: "hidden", borderRadius: "9999px" }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: index === 0 ? "30%" : index === 1 ? "70%" : "100%",
                        background: "linear-gradient(90deg, #FF3030, rgba(255,48,48,0.4))",
                      }} />
                  </div>

                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm" style={{ color: "rgba(236,236,236,0.7)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                        <Check size={15} className="mt-0.5 flex-shrink-0" color="#FF3030" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.buttonVariant} size="lg" className="w-full mt-2">
                    {plan.buttonLabel}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-sm mt-10" style={{ color: "rgba(236,236,236,0.25)", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          All plans include secure end-to-end encryption. Cancel anytime. No hidden fees.
        </motion.p>
      </div>
    </section>
  );
}
