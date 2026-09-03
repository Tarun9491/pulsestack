"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import profile, { ProjectItem } from "../../components/ProfileData";
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Server, 
  Cpu, 
  Database,
  PlusCircle,
  X,
  Check
} from "lucide-react";
import { GithubIcon } from "../../components/Icons";
import Link from "next/link";

export default function Projects() {
    const [projects, setProjects] = useState<ProjectItem[]>(profile.projects);
    const [loading, setLoading] = useState(true);
    const [activeCat, setActiveCat] = useState("All");
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

    // Fetch projects from backend
    useEffect(() => {
        fetch("/api/projects")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                }
            })
            .catch((err) => {
                console.log("Using local profile data fallback:", err);
                // Fallback already set to profile.projects
            })
            .finally(() => setLoading(false));
    }, []);

    const categories = ["All", "Backend / Java", "AI & Automation", "Full-Stack"];

    const filtered = activeCat === "All" 
        ? projects 
        : projects.filter(p => p.category === activeCat);

    return (
        <div className="min-h-screen bg-[#090a10] text-zinc-100 selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10 w-full">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span>Full-Stack Engineering & AI Systems</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                            Featured Projects & Architectures
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
                            Scalable backend platforms, automated AI workflows, and cloud-backed architectures.
                        </p>
                    </div>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold shadow hover:opacity-90 transition-all self-start md:self-auto"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Ask AI about these Projects</span>
                    </Link>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                                activeCat === cat
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:bg-zinc-800"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((proj) => (
                        <div 
                            key={proj.id}
                            className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-5 border border-zinc-800 hover:border-zinc-700 transition-all"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                            {proj.category}
                                        </span>
                                        <h2 className="text-xl font-bold text-white mt-0.5">
                                            {proj.title}
                                        </h2>
                                        {proj.subtitle && (
                                            <p className="text-xs text-zinc-400 mt-0.5">{proj.subtitle}</p>
                                        )}
                                    </div>
                                    <span className="px-2.5 py-1 text-[11px] rounded-full bg-zinc-800 text-zinc-300 font-medium whitespace-nowrap">
                                        Active
                                    </span>
                                </div>

                                <p className="text-sm text-zinc-300 leading-relaxed">
                                    {proj.description}
                                </p>

                                {/* Architecture Pattern Box */}
                                {proj.architecture && (
                                    <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-cyan-300 space-y-1">
                                        <div className="text-[10px] text-zinc-500 font-sans uppercase font-bold flex items-center gap-1">
                                            <Layers className="w-3 h-3 text-blue-400" /> Layered Flow
                                        </div>
                                        <div className="truncate">{proj.architecture}</div>
                                    </div>
                                )}

                                {/* Key Highlights (First 3) */}
                                {proj.bullets && proj.bullets.length > 0 && (
                                    <ul className="space-y-1.5 text-xs text-zinc-300">
                                        {proj.bullets.slice(0, 3).map((b, bIdx) => (
                                            <li key={bIdx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Footer / Tech & Actions */}
                            <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                                <div className="flex flex-wrap gap-1.5">
                                    {(Array.isArray(proj.tech) ? proj.tech : String(proj.tech).split(",")).map((t, tIdx) => (
                                        <span key={tIdx} className="px-2 py-0.5 text-[11px] rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
                                            {typeof t === "string" ? t.trim() : t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between gap-3 pt-1">
                                    <button
                                        onClick={() => setSelectedProject(proj)}
                                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                    >
                                        <span>Full Details</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </button>

                                    <div className="flex gap-2">
                                        {proj.github && (
                                            <a
                                                href={proj.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                                            >
                                                <GithubIcon className="w-3.5 h-3.5" />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                        {proj.demo && (
                                            <a
                                                href={proj.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
                                            >
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Project Modal */}
                {selectedProject && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-zinc-950 border border-zinc-800 max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                                    {selectedProject.category}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    {selectedProject.title}
                                </h3>
                                {selectedProject.subtitle && (
                                    <p className="text-sm text-blue-400">{selectedProject.subtitle}</p>
                                )}
                            </div>

                            <p className="text-sm text-zinc-300 leading-relaxed">
                                {selectedProject.description}
                            </p>

                            {selectedProject.architecture && (
                                <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs text-cyan-300 space-y-1.5">
                                    <div className="text-[11px] font-sans font-bold text-zinc-400 uppercase tracking-wider">
                                        Architectural Topology
                                    </div>
                                    <div className="leading-relaxed">{selectedProject.architecture}</div>
                                </div>
                            )}

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                                    Key Engineering Deliverables & Implementation
                                </h4>
                                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                                    {(selectedProject.bullets || []).map((b, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-2 border-t border-zinc-800 flex justify-end gap-3">
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold hover:bg-zinc-800"
                                    >
                                        <GithubIcon className="w-4 h-4" />
                                        <span>View Code on GitHub</span>
                                    </a>
                                )}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}