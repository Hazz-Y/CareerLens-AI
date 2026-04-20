import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CareerLens AI — Student Career Intelligence Portal",
  description:
    "A premium placement-risk and career-readiness dashboard for students and lenders. Predict placement timelines, salary expectations, and get AI-powered career recommendations.",
  keywords: [
    "placement portal",
    "career readiness",
    "student dashboard",
    "AI career advisor",
    "placement risk",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
