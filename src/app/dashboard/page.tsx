"use client";

import Link from "next/link";
import ProfileForm from "@/components/Dashboard/ProfileForm";
import AgentVisualizer from "@/components/Dashboard/AgentVisualizer";
import RoadmapDisplay from "@/components/Dashboard/RoadmapDisplay";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { Terminal, Shield, ArrowLeft, RefreshCw, Cpu, Award } from "lucide-react";

export default function Dashboard() {
  const { status, roadmap, resetForm } = useRoadmapStore();

  const isGenerating = status !== "idle" && status !== "done" && status !== "error";
  const hasRoadmap = !!roadmap;

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-500/30">
                <Terminal className="h-4 w-4 text-white" />
              </div>
              <span>WDID <span className="text-indigo-400 font-medium">AI</span></span>
            </Link>
            
            <Link 
              href="/"
              className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {hasRoadmap && (
              <button
                onClick={resetForm}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 text-xs text-zinc-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Plan
              </button>
            )}
            
            <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              <Shield className="h-3.5 w-3.5" />
              <span>Grounded Engine</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Left column (inputs and running state) */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-6">
          <ProfileForm />
          
          {/* Always display active running agent state or logs console under form */}
          {(isGenerating || hasRoadmap || status === "error") && (
            <AgentVisualizer />
          )}
        </div>

        {/* Right column (empty state, loading overlay, or complete roadmap output) */}
        <div className="flex-1 min-w-0">
          {status === "idle" && (
            <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[450px]">
              <div className="h-16 w-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Cpu className="h-8 w-8 text-indigo-400 animate-pulse-glow" />
              </div>
              <h2 className="text-xl font-bold text-white">Your Career Roadmap Workspace</h2>
              <p className="text-xs text-zinc-400 max-w-sm mt-2 leading-relaxed">
                Fill out the parameter form on the left to activate the reasoning pipeline. The system will consult Microsoft Foundry IQ vector indexes to generate a tailored career path.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mt-10 text-left">
                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 flex gap-3">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-indigo-400 h-fit">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Verified Citations</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Every resource recommendation is indexed from real publisher documents with verified URLs.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/40 border border-zinc-900 flex gap-3">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-indigo-400 h-fit">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Multi-Agent Critique</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-normal">8 distinct agents analyze, search, plan, architect projects, and critique feasibility to maximize roadmap accuracy.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isGenerating && !hasRoadmap && (
            <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[450px] relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/[0.01] animate-pulse" />
              
              <div className="space-y-4 max-w-sm">
                <div className="relative h-12 w-12 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
                  <Cpu className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Synthesizing Career Roadmap</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Executing multi-agent debate chain. Querying grounding databases and auditing planning steps for hallucination checks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasRoadmap && (
            <RoadmapDisplay />
          )}

          {status === "error" && !hasRoadmap && (
            <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[450px] border-rose-500/20">
              <div className="h-12 w-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Pipeline Execution Interrupted</h3>
              <p className="text-xs text-zinc-400 max-w-sm mt-2 leading-relaxed">
                An error occurred while running the agents. Please check the terminal log below or review your network connectivity.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
