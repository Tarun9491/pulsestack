"use client";

import Navbar from "../../components/Navbar";
import profile from "../../components/ProfileData";
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Mail, 
  Phone, 
  Sparkles,
  Server,
  Cloud,
  Cpu
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/Icons";
import Link from "next/link";

export default function About() {
    return (
        <div className="min-h-screen bg-[#090a10] text-zinc-100 selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12 w-full">
                
                {/* Header */}
                <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                            Professional Background & Aspirations
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                            About Lakkoju Tarun
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">
                            B.Tech CSE (Data Science) • Java & Spring Boot Backend Developer • AI Automation Enthusiast
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/resume"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Resume</span>
                        </Link>
                        <Link
                            href="/chat"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold transition-all"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>AI Chat</span>
                        </Link>
                    </div>
                </div>

                {/* Narrative Summary */}
                <section className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Server className="w-4 h-4 text-cyan-400" /> Executive Profile
                    </h2>
                    <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                        {profile.summary}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                            <span className="font-bold text-white block">Backend Specialization</span>
                            <span className="text-zinc-400 mt-0.5 block">Java, Spring Boot, REST APIs, Hibernate</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                            <span className="font-bold text-white block">Intelligent Automation</span>
                            <span className="text-zinc-400 mt-0.5 block">n8n, AI Agents, LLM Integrations, Webhooks</span>
                        </div>
                        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
                            <span className="font-bold text-white block">Cloud Fundamentals</span>
                            <span className="text-zinc-400 mt-0.5 block">AWS EC2, S3, IAM & Cloud Architecture</span>
                        </div>
                    </div>
                </section>

                {/* Education Timeline */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-cyan-400" /> Academic Qualifications
                    </h2>

                    <div className="space-y-3">
                        {profile.education.map((edu, idx) => (
                            <div 
                                key={idx}
                                className="glass-card p-5 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white text-base">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm text-cyan-400/90 font-medium">
                                        {edu.college}
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                        Location: {edu.location}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right shrink-0">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                                        {edu.scoreType}: {edu.score}
                                    </span>
                                    <p className="text-xs text-zinc-400 mt-1">{edu.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Roles & Responsibilities */}
                <section className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" /> Technical Competencies & Engineering Roles
                    </h2>

                    <ul className="space-y-3 mt-3">
                        {profile.rolesAndResponsibilities.map((role, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{role}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Achievements & Soft Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="glass-card p-6 rounded-2xl space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Award className="w-4 h-4 text-emerald-400" /> Key Achievements
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                            {profile.achievements.map((ach, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-bold">•</span>
                                    <span>{ach}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass-card p-6 rounded-2xl space-y-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-indigo-400" /> Collaborative & Soft Skills
                        </h3>
                        <p className="text-xs text-zinc-400">
                            Essential competencies honed through collaborative engineering projects and academic leadership.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication Skills", "Time Management"].map((s, idx) => (
                                <span key={idx} className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/80 text-xs text-zinc-200 font-medium">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Contact Cards */}
                <div className="glass-card p-6 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-white">Ready to connect with Tarun?</h3>
                        <p className="text-xs text-zinc-400 mt-0.5">Reach out for internships, roles, or project collaborations.</p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all"
                        >
                            Email Tarun
                        </a>
                        <a
                            href={profile.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold transition-all"
                        >
                            LinkedIn Profile
                        </a>
                    </div>
                </div>

            </main>
        </div>
    );
}