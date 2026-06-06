"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Terminal,
  Play,
  RotateCcw,
  UserCheck,
  Compass,
  Search,
  Clock,
  Cpu,
  BookOpen,
  ShieldAlert,
  Award,
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

    // Particle class definition
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
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Magnet attraction to cursor
        if (mousePosRef.current) {
          const mX = mousePosRef.current.x;
          const mY = mousePosRef.current.y;
          if (mX > 0 && mY > 0) {
            const dx = mX - this.x;
            const dy = mY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              this.x += dx * 0.006;
              this.y += dy * 0.006;
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
    const particleCount = Math.min(45, Math.floor((width * height) / 28000));
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
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mousePosRef.current) {
          const mX = mousePosRef.current.x;
          const mY = mousePosRef.current.y;
          if (mX > 0 && mY > 0) {
            const dx = particles[i].x - mX;
            const dy = particles[i].y - mY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.2;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mX, mY);
              ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
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

const SIMULATED_AGENTS = [
  { name: "Profile Analyzer", icon: UserCheck, color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" },
  { name: "Goal Interpreter", icon: Compass, color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
  { name: "Grounding Agent", icon: Search, color: "text-purple-400 border-purple-500/20 bg-purple-500/5" },
  { name: "Timeline Planner", icon: Clock, color: "text-pink-400 border-pink-500/20 bg-pink-500/5" },
  { name: "Project Architect", icon: Cpu, color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" },
  { name: "Resource Curator", icon: BookOpen, color: "text-violet-400 border-violet-500/20 bg-violet-500/5" },
  { name: "Gap Evaluator", icon: ShieldAlert, color: "text-rose-400 border-rose-500/20 bg-rose-500/5" },
  { name: "Critic Agent", icon: Award, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" },
];

const SIM_LOG_STAGES = [
  [
    { text: "SYSTEM: Booting career reasoning pipeline...", type: "system" },
    { text: "PROFILE_ANALYZER: Parsing inputs: Target: [AI Engineer], Skills: [React, JS, CSS].", type: "info" },
    { text: "PROFILE_ANALYZER: Target profile mapped. Initial analysis completed successfully.", type: "success" }
  ],
  [
    { text: "GOAL_INTERPRETER: Mapping transition path. Evaluating current industry skill demands.", type: "info" },
    { text: "GOAL_INTERPRETER: Core gaps identified: Python, LLM APIs, Vector Embeddings, RAG.", type: "warning" }
  ],
  [
    { text: "GROUNDING_AGENT: Connecting to Microsoft Foundry IQ Vector indexes...", type: "info" },
    { text: "GROUNDING_AGENT: Found 12 verified course matches & official reference document citations.", type: "success" }
  ],
  [
    { text: "TIMELINE_PLANNER: Establishing 180-day milestone phases...", type: "info" },
    { text: "TIMELINE_PLANNER: Day 30 (AI Foundations), Day 90 (RAG Deployments), Day 180 (Custom Agentic Apps).", type: "info" }
  ],
  [
    { text: "PROJECT_ARCHITECT: Formulating tailored portfolio project blueprint.", type: "info" },
    { text: "PROJECT_ARCHITECT: Blueprint generated: [Source-Grounded Doc Agent] using LangChain & Pinecone.", type: "success" }
  ],
  [
    { text: "RESOURCE_CURATOR: Verifying URL schemas and matching course relevance metrics.", type: "info" },
    { text: "RESOURCE_CURATOR: Linked 4 documentation repositories and 2 interactive courses.", type: "success" }
  ],
  [
    { text: "GAP_EVALUATOR: Performing dependency checks on compiled roadmap milestones...", type: "info" },
    { text: "GAP_EVALUATOR: Logical sequences checked. No redundant learning blocks found.", type: "success" }
  ],
  [
    { text: "CRITIC_AGENT: Evaluating overall roadmap structure and feasibility against standard benchmarks.", type: "info" },
    { text: "CRITIC_AGENT: Execution path approved. Confidence score: 94%. No hallucinations detected.", type: "success" },
    { text: "SYSTEM: Pipeline execution completed. Rendering roadmap output.", type: "system" }
  ]
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [simState, setSimState] = useState<"idle" | "running" | "completed">("idle");
  const [activeAgentIndex, setActiveAgentIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<Array<{ time: string; text: string; type: string }>>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000 });
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Auto-start agent simulation after a small delay
    const initialStart = setTimeout(() => {
      startSimulation();
    }, 1200);
    return () => clearTimeout(initialStart);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (simState !== "running") return;

    let timer: NodeJS.Timeout;
    const runStep = (stepIndex: number) => {
      if (stepIndex >= SIMULATED_AGENTS.length) {
        setSimState("completed");
        setActiveAgentIndex(-1);
        return;
      }

      setActiveAgentIndex(stepIndex);
      const stepLogs = SIM_LOG_STAGES[stepIndex] || [];
      const timestamp = new Date().toLocaleTimeString();

      setLogs((prev) => [
        ...prev,
        ...stepLogs.map((log) => ({
          time: timestamp,
          text: log.text,
          type: log.type,
        })),
      ]);

      timer = setTimeout(() => {
        runStep(stepIndex + 1);
      }, 1300);
    };

    runStep(0);

    return () => {
      clearTimeout(timer);
    };
  }, [simState]);

  const startSimulation = () => {
    setLogs([]);
    setSimState("running");
  };

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

  const staticContent = (
    <div className="mx-auto max-w-6xl px-6 relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-8 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Created by Aman Minz • 8-Agent Pipeline</span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.15] mb-6">
          What Do I Do <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Next?</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto">
          An AI career reasoning agent that transforms goals into actionable roadmaps. Grounded in live industry data using Microsoft Foundry IQ retrieval.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto group relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black rounded-lg bg-white hover:bg-zinc-200 shadow-md transition-all duration-200 cursor-pointer"
          >
            Start Your Roadmap
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white rounded-lg border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 transition-all duration-200"
          >
            See How It Works
          </a>
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <section className="relative isolate overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="absolute inset-0 bg-[#030303] -z-40 pointer-events-none" />
        <div 
          className="absolute inset-0 -z-30 pointer-events-none bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 -z-25 pointer-events-none bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507]/80" />
        <div className="absolute inset-0 grid-overlay -z-10" />
        {staticContent}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 transition-all duration-300"
    >
      {/* Background Solid Color Layer at -z-40 */}
      <div className="absolute inset-0 bg-[#030303] -z-40 pointer-events-none" />

      {/* Background Image with Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 -z-30 pointer-events-none bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 -z-25 pointer-events-none bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507]/80" />

      {/* Background Canvas Particles */}
      <CanvasBackground mousePosRef={mousePosRef} />

      {/* Grid overlay & spotlights */}
      <div className="absolute inset-0 grid-overlay -z-10 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full animated-glow-1 -z-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full animated-glow-2 -z-20 pointer-events-none" />

      {/* Ambient background glow behind text */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-20 opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 100%)",
          filter: "blur(60px)",
        }}
      />

      {/* Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(99, 102, 241, 0.06), transparent 80%)`,
        }}
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and Action items */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-8 backdrop-blur-sm animate-pulse-glow"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Created by Aman Minz</span>
              <span className="text-indigo-500/30">•</span>
              <span>8-Agent Pipeline</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.15] mb-6"
            >
              What Do I Do <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Next?</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed text-zinc-400 max-w-xl"
            >
              An AI career reasoning agent that transforms goals into actionable roadmaps. Grounded in live industry data using Microsoft Foundry IQ retrieval.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/dashboard"
                className="w-full sm:w-auto group relative flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black rounded-lg bg-white hover:bg-zinc-200 shadow-md transition-all duration-200 cursor-pointer"
              >
                Start Your Roadmap
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              
              <a
                href="#how-it-works"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3.5 text-sm font-semibold text-zinc-300 hover:text-white rounded-lg border border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 transition-all duration-200"
              >
                See How It Works
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Agent Simulator Console */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass-card border border-zinc-800/80 bg-zinc-950/75 p-5 rounded-2xl relative overflow-hidden w-full max-w-[450px] shadow-2xl backdrop-blur-xl flex flex-col"
            >
              {/* Header block simulating terminal tabs */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 ml-2">wdid-agent-pipeline.sh</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${simState === "running" ? "bg-amber-400 animate-pulse" : simState === "completed" ? "bg-emerald-400" : "bg-zinc-500"}`} />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-mono">
                    {simState === "running" ? "Running" : simState === "completed" ? "Ready" : "Idle"}
                  </span>
                </div>
              </div>

              {/* Agents flow container */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {SIMULATED_AGENTS.map((agent, idx) => {
                  const Icon = agent.icon;
                  const isActive = activeAgentIndex === idx;
                  const isCompleted = simState === "completed" || (simState === "running" && idx < activeAgentIndex);
                  
                  return (
                    <div
                      key={agent.name}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] text-indigo-300"
                          : isCompleted
                          ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                          : "border-zinc-900 bg-zinc-950/20 text-zinc-600"
                      }`}
                    >
                      {/* Connection lines simulator */}
                      {idx < SIMULATED_AGENTS.length - 1 && (
                        <div
                          className={`absolute top-1/2 left-[calc(100%-4px)] w-[8px] h-[1px] -translate-y-1/2 z-0 hidden xs:block ${
                            isCompleted ? "bg-emerald-500/30" : "bg-zinc-900"
                          }`}
                        />
                      )}
                      
                      <div className={`p-1.5 rounded-lg border mb-1.5 transition-colors ${
                        isActive 
                          ? "border-indigo-400 bg-indigo-500/20" 
                          : isCompleted 
                          ? "border-emerald-500/20 bg-emerald-500/10" 
                          : "border-zinc-800/40 bg-zinc-900/40"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[8px] font-semibold text-center leading-tight tracking-tight max-w-[55px] font-sans truncate-2-lines">
                        {agent.name.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Inner log monitor console */}
              <div ref={logContainerRef} className="flex-grow bg-black/60 rounded-xl p-3.5 border border-zinc-900 min-h-[140px] max-h-[160px] overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1.5 relative select-none">
                {logs.length === 0 && (
                  <div className="h-full flex items-center justify-center text-zinc-600 italic">
                    Pipeline idle. Awaiting simulation command.
                  </div>
                )}
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-1.5 ${
                      log.type === "system"
                        ? "text-indigo-400 font-bold"
                        : log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "warning"
                        ? "text-amber-400"
                        : "text-zinc-300"
                    }`}
                  >
                    <span className="text-zinc-600 text-[9px] shrink-0">[{log.time}]</span>
                    <span className="break-all">{log.text}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Bottom Controls & Result Card */}
              <div className="mt-4 pt-3.5 border-t border-zinc-900 flex flex-col justify-end min-h-[56px]">
                <AnimatePresence mode="wait">
                  {simState === "idle" && (
                    <motion.button
                      key="idle-btn"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      onClick={startSimulation}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/20 text-xs font-semibold text-white transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Simulate Agent Pipeline
                    </motion.button>
                  )}

                  {simState === "running" && (
                    <motion.div
                      key="running-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2.5 py-2 text-xs text-zinc-400 italic"
                    >
                      <div className="relative h-4 w-4 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-indigo-500/20 border-t-indigo-400 animate-spin" />
                      </div>
                      <span>Debating agent inputs, querying Microsoft Foundry IQ...</span>
                    </motion.div>
                  )}

                  {simState === "completed" && (
                    <motion.div
                      key="result-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-500/[0.02] border border-indigo-500/10 rounded-xl p-3 flex flex-col gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>Generated Roadmap Preview</span>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                          94% Match
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[10px] text-zinc-400 font-sans">
                        <div className="flex justify-between border-b border-zinc-900 pb-1">
                          <span className="font-semibold text-zinc-300">Timeline Outline:</span>
                          <span>Day 30, 90, 180 Milestone Plan</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-900 pb-1">
                          <span className="font-semibold text-zinc-300">Portfolio Build:</span>
                          <span>Grounded Vector Search Agent App</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-zinc-300">Live Citations:</span>
                          <span>12 Verified Foundry IQ Links</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={startSimulation}
                          className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-[10px] font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Re-run
                        </button>
                        
                        <Link
                          href="/dashboard"
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-[10px] font-bold text-black transition-colors cursor-pointer"
                        >
                          Start Real Roadmap
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Metrics Summary Bar (bottom) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 sm:mt-24 border-t border-zinc-900 pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6 text-zinc-500 text-xs font-medium uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>No Hallucinated Resources</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>8-Agent Pipeline</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-purple-400" />
            <span>180-Day Milestones</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
