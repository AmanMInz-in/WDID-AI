"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Terminal,
  Sparkles,
  UserCheck,
  Compass,
  Search,
  Clock,
  Cpu,
  BookOpen,
  ShieldAlert,
  Award,
  Shield,
  CheckCircle2,
} from "lucide-react";

// Canvas Background Particle Network Component
function CanvasBackground({ mousePosRef }: { mousePosRef: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    const handleResize = () => {
      if (!canvas || !parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(parent);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mousePosRef.current) {
          const mX = mousePosRef.current.x;
          const mY = mousePosRef.current.y;
          if (mX > 0 && mY > 0) {
            const dx = mX - this.x;
            const dy = mY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              this.x += dx * 0.005;
              this.y += dy * 0.005;
            }
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(129, 140, 248, ${this.alpha})`;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(30, Math.floor((width * height) / 35000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [mousePosRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none -z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default function About() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    setMounted(true);
    document.title = "About Creator | WDID AI";
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePosRef.current = { x, y };
    section.style.setProperty("--mouse-x", `${x}px`);
    section.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    mousePosRef.current = { x: -1000, y: -1000 };
  };

  const pipelineAgents = [
    { name: "Profile Analyzer", icon: UserCheck, desc: "Extracts skill sets, professional context, and study availability parameters." },
    { name: "Goal Interpreter", icon: Compass, desc: "Maps target trajectories and evaluates specific knowledge-level skill gaps." },
    { name: "Grounding Agent", icon: Search, desc: "Directs vector queries to Microsoft Foundry IQ indexes to retrieve real sources." },
    { name: "Timeline Planner", icon: Clock, desc: "Structures personalized timelines across 30, 90, and 180-day milestone phases." },
    { name: "Project Architect", icon: Cpu, desc: "Designs custom hands-on portfolio build guides matching target timelines." },
    { name: "Resource Curator", icon: BookOpen, desc: "Verifies online learning courses, videos, and documentation links." },
    { name: "Gap Evaluator", icon: ShieldAlert, desc: "Audits plan dependencies to ensure prerequisites align in proper sequences." },
    { name: "Critic Agent", icon: Award, desc: "Validates accuracy, flags hallucinations, and computes success probability scores." },
  ];

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col selection:bg-indigo-500/30 relative overflow-hidden"
    >
      {/* Background Canvas Particles */}
      <CanvasBackground mousePosRef={mousePosRef} />

      {/* Grid overlay & ambient glow spotlights */}
      <div className="absolute inset-0 grid-overlay -z-10 pointer-events-none opacity-40" />
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] rounded-full animated-glow-1 -z-20 pointer-events-none" />
      
      {/* Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(99, 102, 241, 0.05), transparent 80%)`,
        }}
      />

      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-500/30">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <span>WDID <span className="text-indigo-400 font-medium">AI</span></span>
            </Link>
            
            <Link 
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-white text-black font-bold uppercase tracking-widest text-[9px] px-5 py-2.5 hover:bg-zinc-200 transition-all duration-300 shadow-md"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Page Body Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6 sm:p-8 lg:p-12 space-y-16 relative z-10">
        
        {/* Intro Section */}
        <section className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>Microsoft Agents League Hackathon Project 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">WDID AI</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            <strong>WDID AI</strong> (What Do I Do Next?) is a grounded career reasoning engine. Standard roadmaps are static and generic; they fail to consider personal weekly commitments, skill deficits, or official resource changes. WDID AI solves this through a multi-agent debate architecture backed by real-time indexes.
          </p>
        </section>

        {/* 8-Agent Pipeline Grid Section */}
        <section className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <span>Multi-Agent Architecture</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">A coordinated chain of 8 expert agents managing your career compilation flow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineAgents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <div 
                  key={index}
                  className="glass-card border border-zinc-900 bg-zinc-950/20 p-5 rounded-xl hover:border-indigo-500/20 transition-all duration-300"
                >
                  <div className="p-2 w-fit rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-200">{agent.name}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1.5 leading-relaxed">{agent.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Microsoft Foundry IQ Grounding Block */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-950/40 border border-zinc-900 p-6 sm:p-8 rounded-2xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none rounded-tr-2xl" />
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Shield className="h-4 w-4" />
              <span>Grounded Knowledge Core</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Zero Hallucinations with Foundry IQ</h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Standard LLM-generated paths tend to suggest tutorials that don't exist anymore or point to outdated library versions. WDID AI uses Microsoft Foundry IQ vector retrieval to index real-world curriculum sources, developer documentation, and tutorials—ensuring that every link recommended is fully validated.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl text-center space-y-2 max-w-[200px] w-full">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <div className="text-xl font-bold text-white">100%</div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Link Validity</div>
            </div>
          </div>
        </section>

        {/* Creator Section: Aman Minz Profile */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white">About The Creator</h2>
            <p className="text-xs text-zinc-500 mt-1">The engineer behind the project.</p>
          </div>

          <div className="glass-card border border-zinc-800/80 bg-zinc-950/60 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center max-w-4xl shadow-xl">
            {/* Avatar block with glow ring */}
            <div className="relative shrink-0 h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/10 flex items-center justify-center">
              <div className="h-full w-full rounded-full bg-zinc-950 overflow-hidden relative">
                <img 
                  src="/aman-minz.png" 
                  alt="Aman Minz" 
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full border border-indigo-400/25 animate-ping opacity-25 pointer-events-none" />
            </div>

            {/* Profile description */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-lg font-bold text-white">Aman Minz</h3>
                <p className="text-xs text-indigo-400 font-medium mt-0.5">Full Stack Engineer & UI/UX Designer</p>
              </div>
              
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                Aman Minz designs high-end UI/UX and engineers agentic workflows. Built as an elite developer project, <strong>WDID AI</strong> illustrates the power of multi-agent debate loops integrated alongside grounded vector embeddings.
              </p>

              {/* Social Links matching request */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://github.com/AmanMInz-in"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 hover:border-indigo-500/30 bg-zinc-900/40 text-zinc-400 hover:text-white transition-all duration-300 group"
                  title="GitHub Profile"
                >
                  <svg className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com/in/amanminz"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 hover:border-indigo-500/30 bg-zinc-900/40 text-zinc-400 hover:text-white transition-all duration-300 group"
                  title="LinkedIn Profile"
                >
                  <svg className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href="https://instagram.com/amannminz"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-zinc-800 hover:border-indigo-500/30 bg-zinc-900/40 text-zinc-400 hover:text-white transition-all duration-300 group"
                  title="Instagram Profile"
                >
                  <svg className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
