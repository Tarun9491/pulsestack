import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PULSESTACK | Lakkoju Tarun - Backend & AI Automation Engineer",
  description: "PULSESTACK: Interactive portfolio and ATS-compliant resume of Lakkoju Tarun. Specializing in Java, Spring Boot, MySQL, RESTful APIs, AWS, and n8n AI agent workflows.",
  keywords: [
    "Lakkoju Tarun",
    "Java Developer",
    "Spring Boot Developer",
    "Backend Developer",
    "FinPulse Banking App",
    "AI Agent Automation",
    "n8n Workflow Automation",
    "Vel Tech University",
    "Portfolio",
    "Resume"
  ],
  authors: [{ name: "Lakkoju Tarun" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090a10] text-zinc-100 antialiased min-h-screen selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}