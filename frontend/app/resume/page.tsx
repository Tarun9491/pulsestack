"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import profile from "../../components/ProfileData";
import { 
  Printer, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Sparkles, 
  Mail, 
  Phone, 
  GraduationCap, 
  Code2, 
  Layers, 
  Briefcase, 
  Award,
  CheckCircle2
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/Icons";
import Link from "next/link";

export default function ResumePage() {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"all" | "experience" | "skills" | "education">("all");

    const copyContact = () => {
        const text = `Lakkoju Tarun | Backend & AI Engineer\nEmail: ${profile.contact.email}\nPhone: ${profile.contact.phone}\nLinkedIn: ${profile.contact.linkedin}\nGitHub: ${profile.contact.github}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#090a10] text-zinc-100 flex flex-col">
            <Navbar />

            {/* Page Header & Toolbar */}
            <div className="no-print max-w-5xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                Verified Official Resume
                            </span>
                            <span className="text-xs text-zinc-400">Updated Sept 2026</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-white">
                            Curriculum Vitae / Resume
                        </h1>
                        <p className="text-sm text-zinc-400 mt-0.5">
                            Lakkoju Tarun • B.Tech CSE (Data Science) • Java / Spring Boot / AI Automation
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                            onClick={copyContact}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:bg-zinc-800 text-xs font-semibold transition-all shadow-sm"
                        >
                            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-300" />}
                            <span>{copied ? "Copied to Clipboard!" : "Copy Contact"}</span>
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / Save PDF</span>
                        </button>

                        <Link
                            href="/chat"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Ask AI About Tarun</span>
                        </Link>
                    </div>
                </div>

                {/* View Tabs */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1 text-xs">
                    {[
                        { id: "all", label: "Complete Resume (ATS Document)" },
                        { id: "experience", label: "FinPulse & Experience" },
                        { id: "skills", label: "Technical Skills Matrix" },
                        { id: "education", label: "Academic Credentials" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                                activeTab === tab.id
                                    ? "bg-zinc-800 text-white border border-zinc-600"
                                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resume Main Document Card */}
            <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
                <article className="print-area glass-card bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 text-zinc-200">
                    
                    {/* Header Section */}
                    <div className="text-center border-b border-zinc-800/90 pb-8">
                        <h1 className="text-3xl sm:text-4xl font-black tracking-wider text-white uppercase">
                            {profile.name}
                        </h1>
                        <p className="text-sm sm:text-base text-cyan-400 font-medium mt-1">
                            {profile.role}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 mt-4 text-xs sm:text-sm text-zinc-300">
                            <a href={`tel:${profile.contact.phone}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{profile.contact.phone}</span>
                            </a>
                            <span className="text-zinc-600">•</span>
                            <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{profile.contact.email}</span>
                            </a>
                            <span className="text-zinc-600">•</span>
                            <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{profile.contact.linkedinUsername}</span>
                            </a>
                            <span className="text-zinc-600">•</span>
                            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                                <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{profile.contact.githubUsername}</span>
                            </a>
                        </div>
                    </div>

                    {/* Profile Summary */}
                    {(activeTab === "all" || activeTab === "experience") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Profile Summary
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-3 text-justify">
                                {profile.summary}
                            </p>
                        </section>
                    )}

                    {/* Education */}
                    {(activeTab === "all" || activeTab === "education") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> Education
                            </h2>
                            <div className="space-y-4 mt-4">
                                {profile.education.map((edu, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                                        <div>
                                            <h3 className="font-bold text-white text-base">
                                                {edu.college}
                                            </h3>
                                            <p className="text-sm text-zinc-300">
                                                {edu.degree}
                                            </p>
                                            <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                                                {edu.scoreType}: {edu.score}
                                            </span>
                                        </div>
                                        <div className="text-right sm:text-right text-xs text-zinc-400 font-medium whitespace-nowrap mt-2 sm:mt-0">
                                            <p className="text-zinc-300">{edu.location}</p>
                                            <p>{edu.year}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Technical Skills */}
                    {(activeTab === "all" || activeTab === "skills") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <Code2 className="w-4 h-4" /> Technical Skills
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {profile.skillCategories.map((cat, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                                            {cat.category}
                                        </h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map((s, sIdx) => (
                                                <span 
                                                    key={sIdx}
                                                    className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 font-medium"
                                                >
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Project Roles & Responsibilities */}
                    {(activeTab === "all" || activeTab === "experience") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <Layers className="w-4 h-4" /> Project Roles & Responsibilities
                            </h2>
                            <ul className="mt-4 space-y-2.5">
                                {profile.rolesAndResponsibilities.map((role, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{role}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Project Experience - FinPulse */}
                    {(activeTab === "all" || activeTab === "experience") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Project Experience
                            </h2>

                            <div className="space-y-6 mt-4">
                                {profile.projects.map((proj) => (
                                    <div key={proj.id} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-800/60 pb-3 mb-3">
                                            <div>
                                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                                    {proj.title}
                                                </h3>
                                                {proj.subtitle && (
                                                    <p className="text-xs text-blue-400">{proj.subtitle}</p>
                                                )}
                                            </div>
                                            <span className="px-2.5 py-0.5 text-xs rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-medium self-start sm:self-center">
                                                {proj.category}
                                            </span>
                                        </div>

                                        {proj.architecture && (
                                            <div className="mb-3 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                                                <span className="text-zinc-500 font-sans">Pattern:</span>
                                                <span>{proj.architecture}</span>
                                            </div>
                                        )}

                                        <ul className="space-y-2 mt-2">
                                            {proj.bullets.map((b, bIdx) => (
                                                <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                                                    <span className="text-cyan-400 font-bold">•</span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-2">
                                            <span className="text-xs text-zinc-400 font-semibold">Technologies:</span>
                                            {proj.tech.map((t, tIdx) => (
                                                <span key={tIdx} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Additional Information & Achievements */}
                    {(activeTab === "all" || activeTab === "education") && (
                        <section>
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800 flex items-center gap-2">
                                <Award className="w-4 h-4" /> Additional Information & Achievements
                            </h2>

                            <div className="mt-4 space-y-3">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-2">Key Achievements:</h3>
                                    <ul className="space-y-1.5">
                                        {profile.achievements.map((ach, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300">
                                                <span className="text-emerald-400 font-bold">✔</span>
                                                <span>{ach}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-2">
                                    <h3 className="text-sm font-bold text-white mb-2">Soft Skills:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication Skills", "Time Management"].map((s, idx) => (
                                            <span key={idx} className="px-3 py-1 text-xs rounded-full bg-indigo-950/40 text-indigo-300 border border-indigo-500/30">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                </article>
            </main>
        </div>
    );
}
