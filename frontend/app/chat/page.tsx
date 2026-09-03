"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import profile from "../../components/ProfileData";
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Cpu, 
  HelpCircle,
  Copy,
  Check
} from "lucide-react";
import Link from "next/link";

interface Message {
    role: "user" | "bot";
    content: string;
    source?: string;
    time?: string;
}

export default function Chat() {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [chat, setChat] = useState<Message[]>([
        {
            role: "bot",
            content: `Hello! I am **Tarun's AI Recruiter Assistant**. \n\nI have complete knowledge of Tarun Lakkoju's resume, including his **Java & Spring Boot** backend development, **FinPulse** online banking system, **n8n AI agent workflows**, **MySQL JPA/Hibernate** database modeling, **AWS fundamentals**, and **Vel Tech B.Tech credentials** (CGPA: 7.28).\n\nHow can I help you evaluate Tarun today?`,
            source: "Tarun Knowledge Engine",
            time: "Just now"
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat, loading]);

    const suggestedPrompts = [
        "Tell me about the FinPulse banking system",
        "What are Tarun's skills in Java & Spring Boot?",
        "Does Tarun have experience with n8n and AI agents?",
        "What is Tarun's educational background and CGPA?",
        "How can I contact Tarun for an internship or job?"
    ];

    const sendMessage = async (promptText?: string) => {
        const textToSend = promptText || msg;
        if (!textToSend.trim() || loading) return;

        const userMsg: Message = {
            role: "user",
            content: textToSend,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };

        setChat((prev) => [...prev, userMsg]);
        if (!promptText) setMsg("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textToSend }),
            });

            if (!res.ok) throw new Error("Server responded with error");

            const data = await res.json();
            const botMsg: Message = {
                role: "bot",
                content: data.reply || "Sorry, I could not generate a response. Please try again.",
                source: data.source === "groq_cloud" ? "Groq (Llama 3 Cloud)" : "Tarun Knowledge Engine",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };
            setChat((prev) => [...prev, botMsg]);
        } catch (err: any) {
            // Intelligent local fallback if fetch completely fails
            const botMsg: Message = {
                role: "bot",
                content: `Tarun Lakkoju is a Computer Science Engineering undergraduate at Vel Tech University (CGPA 7.28/10). He is skilled in Java, Spring Boot, RESTful APIs, MySQL, AWS, and n8n automation. His main project is FinPulse (a full-stack banking app). You can contact him at ${profile.contact.email} or ${profile.contact.phone}.`,
                source: "Local Offline Knowledge Engine",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };
            setChat((prev) => [...prev, botMsg]);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const resetChat = () => {
        setChat([
            {
                role: "bot",
                content: `Chat reset. Feel free to ask any question regarding Tarun's skills, projects, or credentials!`,
                source: "Tarun Knowledge Engine",
                time: "Just now"
            }
        ]);
    };

    return (
        <div className="min-h-screen bg-[#090a10] text-zinc-100 selection:bg-cyan-500/30 flex flex-col">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col w-full">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                Tarun's AI Portfolio Assistant
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                    Dual-Engine Active
                                </span>
                            </h1>
                            <p className="text-xs text-zinc-400">
                                Trained on Lakkoju Tarun's complete resume and engineering portfolio
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={resetChat}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
                        title="Reset conversation"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 min-h-[350px] max-h-[550px]">
                    {chat.map((c, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${c.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {c.role === "bot" && (
                                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                                    <Bot className="w-4 h-4" />
                                </div>
                            )}

                            <div
                                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                                    c.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20"
                                        : "glass-card bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none"
                                }`}
                            >
                                <div className="whitespace-pre-line">
                                    {c.content}
                                </div>

                                <div className="flex items-center justify-between gap-4 mt-2.5 pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-400">
                                    <span>{c.source || (c.role === "user" ? "You" : "AI Assistant")} • {c.time}</span>
                                    {c.role === "bot" && (
                                        <button
                                            onClick={() => handleCopy(c.content, i)}
                                            className="hover:text-cyan-300 flex items-center gap-1"
                                        >
                                            {copiedIndex === i ? (
                                                <span className="text-emerald-400 flex items-center gap-0.5">
                                                    <Check className="w-3 h-3" /> Copied
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-0.5">
                                                    <Copy className="w-3 h-3" /> Copy
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {c.role === "user" && (
                                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                                    <User className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {loading && (
                        <div className="flex gap-3 justify-start items-center">
                            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                                <Bot className="w-4 h-4 animate-bounce" />
                            </div>
                            <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-none text-xs text-zinc-400 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-200"></span>
                                </div>
                                <span>Tarun's AI is analyzing resume & portfolio context...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Starter Prompts */}
                <div className="mb-3 space-y-1.5">
                    <div className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-cyan-400" /> Suggested Quick Questions:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {suggestedPrompts.map((p, idx) => (
                            <button
                                key={idx}
                                onClick={() => sendMessage(p)}
                                disabled={loading}
                                className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all text-left disabled:opacity-50"
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Input Bar */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                    className="flex gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl focus-within:border-cyan-500/60 transition-colors"
                >
                    <input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Ask anything about Tarun's skills, FinPulse, n8n, or credentials..."
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!msg.trim() || loading}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/25 transition-all disabled:opacity-40"
                    >
                        <Send className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Send</span>
                    </button>
                </form>

            </main>
        </div>
    );
}