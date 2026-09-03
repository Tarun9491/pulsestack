"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import profile from "../components/ProfileData";
import { 
  Sparkles, 
  FileText, 
  ArrowRight, 
  FolderGit2, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Send, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Server,
  Database,
  Cpu
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/Icons";

export default function Home() {
    const [activeSkillCat, setActiveSkillCat] = useState("All");
    const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [contactMsg, setContactMsg] = useState("");

    const skillCategories = ["All", ...profile.skillCategories.map(c => c.category)];

    const allSkills = profile.skillCategories.flatMap(c => 
        c.skills.map(s => ({ ...s, category: c.category }))
    );

    const filteredSkills = activeSkillCat === "All" 
        ? allSkills 
        : allSkills.filter(s => s.category === activeSkillCat);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setContactStatus("success");
                setContactMsg(data.message || "Message sent successfully!");
                setContactForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setContactStatus("error");
                setContactMsg(data.error || "Failed to send message. Please try again.");
            }
        } catch (err: any) {
            setContactStatus("error");
            setContactMsg("Network error. Backend might be unreachable: " + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#090a10] text-zinc-100 selection:bg-cyan-500/30">
            <Navbar />

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full"></div>
                <div className="absolute top-96 right-0 w-[500px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
                
                {/* 1. HERO SECTION */}
                <section className="flex flex-col items-center text-center pt-6 sm:pt-12">
                    
                    {/* Available Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/80 shadow-inner mb-6">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-zinc-300">
                            Vel Tech University • B.Tech CSE (Data Science)
                        </span>
                    </div>

                    {/* Avatar with Glow Rings */}
                    <div className="relative group">
                        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative rounded-full p-1 bg-zinc-950">
                            <Image
                                src="/tarun.png"
                                alt="Lakkoju Tarun"
                                width={150}
                                height={150}
                                priority
                                className="rounded-full object-cover border-2 border-zinc-700/80 shadow-2xl"
                            />
                        </div>
                        <span className="absolute bottom-1 right-2 px-2.5 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold tracking-wide uppercase shadow-md text-white border border-blue-400/40">
                            Java & AI
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mt-6 text-white max-w-3xl">
                        Hello, I'm <span className="gradient-text">{profile.name}</span>
                    </h1>

                    <p className="text-lg sm:text-xl font-semibold text-cyan-400 mt-2 max-w-2xl">
                        {profile.role}
                    </p>

                    <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed font-normal text-zinc-300/90">
                        {profile.summary}
                    </p>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
                        <Link
                            href="/resume"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
                        >
                            <FileText className="w-4 h-4" />
                            <span>View Full Resume</span>
                        </Link>

                        <Link
                            href="/chat"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-cyan-600/25 transition-all hover:scale-[1.02]"
                        >
                            <Sparkles className="w-4 h-4 text-cyan-300" />
                            <span>Talk to My AI Assistant</span>
                        </Link>

                        <Link
                            href="/projects"
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-semibold text-sm transition-all"
                        >
                            <FolderGit2 className="w-4 h-4 text-zinc-400" />
                            <span>Explore Projects</span>
                        </Link>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-14">
                        {profile.stats.map((stat, idx) => (
                            <div key={idx} className="glass-card p-4 sm:p-5 rounded-2xl text-center">
                                <div className="text-2xl sm:text-3xl font-black text-white gradient-text">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-bold text-zinc-200 mt-1">
                                    {stat.label}
                                </div>
                                <div className="text-[11px] text-zinc-400 mt-0.5">
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. FEATURED PROJECT: FINPULSE */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                                Featured Engineering Project
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                                FinPulse – Real-Time Banking Platform
                            </h2>
                        </div>
                        <Link 
                            href="/projects" 
                            className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                        >
                            <span>View All Projects</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Left Description & Highlights */}
                            <div className="lg:col-span-2 space-y-4">
                                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                                    FinPulse is a full-stack online banking system engineered with a <strong>Java & Spring Boot</strong> backend, Android client, and <strong>MySQL JPA/Hibernate</strong> persistence. It implements secure banking operations with high relational consistency.
                                </p>

                                {/* Architecture Pattern Pill */}
                                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-cyan-300 space-y-1">
                                    <div className="text-zinc-400 font-sans font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-blue-400" /> Layered Software Architecture
                                    </div>
                                    <div className="text-cyan-400">
                                        Controller ➔ Service ➔ Repository ➔ JPA/Hibernate ➔ MySQL Database
                                    </div>
                                </div>

                                {/* Key Project Bullets */}
                                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>Designed and implemented RESTful APIs for account management, transaction processing, and balance auditing.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>Normalized relational schema ensuring strict ACID compliance for financial integrity.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>Integrated real-time transaction updates and secure authentication.</span>
                                    </li>
                                </ul>

                                {/* Tech Pills */}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {["Java", "Spring Boot", "Android", "MySQL", "Hibernate / JPA", "RESTful APIs", "Postman"].map((t, idx) => (
                                        <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700/80">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Metric Box */}
                            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between space-y-4">
                                <div>
                                    <h3 className="text-xs uppercase font-bold tracking-wider text-zinc-400">
                                        Project Specifications
                                    </h3>
                                    <div className="mt-3 space-y-2.5 text-xs text-zinc-300">
                                        <div className="flex justify-between py-1 border-b border-zinc-900">
                                            <span className="text-zinc-400">Role</span>
                                            <span className="font-semibold text-white">Full-Stack Backend Lead</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-zinc-900">
                                            <span className="text-zinc-400">Backend Framework</span>
                                            <span className="font-semibold text-white">Spring Boot (Java)</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-zinc-900">
                                            <span className="text-zinc-400">Database</span>
                                            <span className="font-semibold text-white">MySQL (JPA/Hibernate)</span>
                                        </div>
                                        <div className="flex justify-between py-1 border-b border-zinc-900">
                                            <span className="text-zinc-400">API Verification</span>
                                            <span className="font-semibold text-emerald-400">Postman Tested ✔</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Link
                                        href="/projects"
                                        className="w-full block text-center py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all"
                                    >
                                        View Full Architecture & Code
                                    </Link>
                                    <a
                                        href={profile.contact.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-all"
                                    >
                                        <GithubIcon className="w-3.5 h-3.5" />
                                        <span>Tarun's GitHub Profile</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 3. SKILLS MATRIX */}
                <section className="space-y-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                            Core Competencies
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            Technical Skills & Tooling
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                            Filter across backend development, AI agents, cloud, databases, and programming languages
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {skillCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveSkillCat(cat)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                                    activeSkillCat === cat
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                        : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {filteredSkills.map((s, idx) => (
                            <div 
                                key={idx}
                                className="glass-card p-3.5 rounded-xl flex flex-col justify-between gap-1.5 group"
                            >
                                <span className="font-semibold text-sm text-zinc-100 group-hover:text-cyan-300 transition-colors">
                                    {s.name}
                                </span>
                                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                                    <span>{s.category}</span>
                                    {s.level && (
                                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                                            {s.level}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. CONTACT & RECRUITER FORM */}
                <section className="glass-card p-6 sm:p-10 rounded-3xl border border-zinc-800/80 relative overflow-hidden" id="contact">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        
                        {/* Left Details */}
                        <div className="space-y-5">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                                    Connect Directly
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                                    Let's Discuss Opportunities
                                </h2>
                                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                                    I am actively seeking Software Engineer, Java Backend Developer, and AI Automation opportunities. Feel free to send a message or contact me directly through email and phone.
                                </p>
                            </div>

                            <div className="space-y-3 text-sm text-zinc-300">
                                <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-zinc-400 font-medium">Email Address</div>
                                        <div className="font-semibold text-white text-xs sm:text-sm">{profile.contact.email}</div>
                                    </div>
                                </a>

                                <a href={`tel:${profile.contact.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-[11px] text-zinc-400 font-medium">Direct Phone</div>
                                        <div className="font-semibold text-white text-xs sm:text-sm">{profile.contact.phone}</div>
                                    </div>
                                </a>

                                <div className="flex gap-3 pt-2">
                                    <a 
                                        href={profile.contact.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold text-zinc-200"
                                    >
                                        <LinkedinIcon className="w-4 h-4 text-blue-400" />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a 
                                        href={profile.contact.github} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold text-zinc-200"
                                    >
                                        <GithubIcon className="w-4 h-4 text-zinc-300" />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Form */}
                        <form onSubmit={handleContactSubmit} className="space-y-4 bg-zinc-950/80 p-6 rounded-2xl border border-zinc-800/80 shadow-xl">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Send className="w-4 h-4 text-cyan-400" /> Send a Direct Inquiry
                            </h3>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name</label>
                                <input
                                    required
                                    value={contactForm.name}
                                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                    placeholder="e.g. Alex (Recruiter / Engineering Lead)"
                                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1">Your Email</label>
                                <input
                                    required
                                    type="email"
                                    value={contactForm.email}
                                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                    placeholder="name@company.com"
                                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1">Subject</label>
                                <input
                                    value={contactForm.subject}
                                    onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                                    placeholder="e.g. Backend Developer Opportunity / Interview Request"
                                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1">Message</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={contactForm.message}
                                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder="Describe your role, company, or message..."
                                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                                />
                            </div>

                            {contactStatus === "success" && (
                                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>{contactMsg}</span>
                                </div>
                            )}

                            {contactStatus === "error" && (
                                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                                    {contactMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={contactStatus === "loading"}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50"
                            >
                                {contactStatus === "loading" ? "Sending Message..." : "Submit Inquiry to Backend"}
                            </button>
                        </form>

                    </div>
                </section>

            </div>
        </div>
    );
}