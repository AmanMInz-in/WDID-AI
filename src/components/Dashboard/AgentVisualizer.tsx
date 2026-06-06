"use client";

import { useRef, useEffect } from "react";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { Cpu, Terminal, CheckCircle2, Circle, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { id: "analyzing", name: "Profile & Goal Analysis", agents: ["Profile Analyzer", "Goal Interpreter"] },
  { id: "gaps", name: "Competency Gap Check", agents: ["Gap Analysis Agent"] },
  { id: "retrieving", name: "Foundry IQ Knowledge Search", agents: ["Knowledge Retrieval Agent"] },
  { id: "planning", name: "Roadmap & Project Synthesis", agents: ["Roadmap Planner", "Project Generator", "Resource Recommender"] },
  { id: "refining", name: "Feasibility Review", agents: ["Critic Agent"] }
];

export default function AgentVisualizer() {
  const { status, logs } = useRoadmapStore();
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const isActive = status !== "idle" && status !== "done" && status !== "error";

  if (!isActive && logs.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center h-[320px] text-zinc-500">
        <Cpu className="h-12 w-12 text-zinc-600 mb-4 animate-pulse-glow" />
        <p className="text-sm font-semibold">AI Reasoner Standby</p>
        <p className="text-xs max-w-xs mt-1 text-zinc-500 leading-relaxed">
          Submit your career profile to trigger the 8-agent reasoning pipeline and retrieve grounded knowledge.
        </p>
      </div>
    );
  }

  // Helper to determine the status icon/color of a stage
  const getStageState = (stageId: string) => {
    if (status === "done") return "completed";
    if (status === "error") return "error";
    
    const currentIndex = STAGES.findIndex(s => s.id === stageId);
    const activeIndex = STAGES.findIndex(s => s.id === status);
    
    if (currentIndex < activeIndex) return "completed";
    if (currentIndex === activeIndex) return "active";
    return "pending";
  };

  return (
    <div className="space-y-4">
      {/* Agent Nodes Visual Checklist */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-indigo-400" />
          Multi-Agent Processing Chain
        </h3>
        
        <div className="space-y-3">
          {STAGES.map((stage) => {
            const state = getStageState(stage.id);
            return (
              <div
                key={stage.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  state === "active"
                    ? "bg-indigo-500/5 border-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.05)]"
                    : state === "completed"
                    ? "bg-emerald-500/5 border-emerald-500/10 opacity-70"
                    : "bg-zinc-950/20 border-transparent opacity-40"
                }`}
              >
                {state === "active" && (
                  <Play className="h-4 w-4 text-indigo-400 mt-0.5 animate-pulse" />
                )}
                {state === "completed" && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                )}
                {state === "pending" && (
                  <Circle className="h-4 w-4 text-zinc-600 mt-0.5" />
                )}

                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${
                    state === "active" ? "text-indigo-300" : state === "completed" ? "text-emerald-400" : "text-zinc-400"
                  }`}>
                    {stage.name}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {stage.agents.map((agent) => (
                      <span
                        key={agent}
                        className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono border ${
                          logs.some(l => l.agent === agent)
                            ? "bg-zinc-800/80 text-zinc-300 border-zinc-700"
                            : "bg-zinc-900/30 text-zinc-600 border-transparent"
                        }`}
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Shell console box */}
      <div className="glass-panel p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/60 flex flex-col h-[280px]">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
            <Terminal className="h-3.5 w-3.5" />
            <span>agent_reasoning_core.sh</span>
          </div>
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-2 text-zinc-400 pr-1">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-1 leading-relaxed"
            >
              <span className="text-zinc-600 font-normal">[{log.timestamp}]</span>
              <span className="text-indigo-400 font-semibold flex-shrink-0">{log.agent}:</span>
              <span className={
                log.type === "success"
                  ? "text-emerald-400"
                  : log.type === "warning"
                  ? "text-amber-400"
                  : "text-zinc-300"
              }>
                {log.message}
              </span>
            </motion.div>
          ))}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
}
