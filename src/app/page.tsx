import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import LampSection from "@/components/LampSection";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import ChatDemo from "@/components/ChatDemo";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <LampSection />
      <Pricing />
      <Testimonials />
      <ChatDemo />
      <Footer />
    </main>
  );
}
