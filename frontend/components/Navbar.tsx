"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, 
  User, 
  FileText, 
  FolderGit2, 
  Bot, 
  Menu, 
  X, 
  Sparkles,
  Zap
} from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/about", label: "About", icon: User },
        { href: "/resume", label: "Resume", icon: FileText, highlight: true },
        { href: "/projects", label: "Projects", icon: FolderGit2 },
        { href: "/chat", label: "AI Recruiter Chat", icon: Bot },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass-nav border-b border-zinc-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Innovative Brand: PULSESTACK / Tarun Lakkoju */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                        <Zap className="w-5 h-5 text-white fill-white/20" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-lg tracking-wider text-white flex items-center gap-1">
                            PULSE<span className="text-cyan-400">STACK</span>
                            <span className="relative flex h-2 w-2 ml-0.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium tracking-tight -mt-1">
                            Tarun Lakkoju • Backend & AI
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/60 shadow-inner">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                    isActive
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25"
                                        : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                                } ${link.highlight && !isActive ? "text-cyan-300" : ""}`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Status Pill & CTA */}
                <div className="hidden lg:flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Open to Roles
                    </div>

                    <Link
                        href="/chat"
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 hover:opacity-90 transition-opacity"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI Assistant</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <Link
                        href="/resume"
                        className="px-2.5 py-1 text-xs rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 font-medium"
                    >
                        Resume
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-1.5 transition-all">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                        : "text-zinc-300 hover:bg-zinc-900"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{link.label}</span>
                            </Link>
                        );
                    })}
                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs px-2 text-zinc-400">
                        <span>Status: <strong className="text-emerald-400">Available</strong></span>
                        <a href="mailto:tarunlakkoju925@gmail.com" className="text-cyan-400 underline">tarunlakkoju925@gmail.com</a>
                    </div>
                </div>
            )}
        </header>
    );
}