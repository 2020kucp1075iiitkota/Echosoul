import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EchoSoul: Your Mind. Immortalized.",
  description:
    "EchoSoul captures who you are so the people you love never have to say goodbye. AI-powered digital immortality.",
  keywords: ["AI", "digital immortality", "memory preservation", "voice cloning", "legacy"],
  openGraph: {
    title: "EchoSoul: Your Mind. Immortalized.",
    description: "EchoSoul captures who you are so the people you love never have to say goodbye.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#0D0D10", color: "#ECECEC" }}
      >
        {children}
      </body>
    </html>
  );
}
