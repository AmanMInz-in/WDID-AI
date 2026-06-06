"use client";

import { useState } from "react";
import { useRoadmapStore, Project, LearningResource, Citation } from "@/store/useRoadmapStore";
import { 
  Calendar, 
  Briefcase, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle,
  ExternalLink,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export default function RoadmapDisplay() {
  const { roadmap } = useRoadmapStore();
  const [activeTab, setActiveTab] = useState<"timeline" | "projects" | "resources" | "evaluation">("timeline");
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);

  if (!roadmap) return null;

  const {
    careerGoal,
    currentState,
    skillGaps,
    plan30Day,
    plan90Day,
    plan180Day,
    projectsToBuild,
    learningResources,
    citations,
    successProbability,
    successMetrics,
    nextImmediateAction,
    nextActionReasoning
  } = roadmap;

  const tabs = [
    { id: "timeline", name: "Roadmap Timeline", icon: <Calendar className="h-4 w-4" /> },
    { id: "projects", name: "Portfolio Projects", icon: <Briefcase className="h-4 w-4" /> },
    { id: "resources", name: "Grounded Resources", icon: <BookOpen className="h-4 w-4" /> },
    { id: "evaluation", name: "Critic Review", icon: <TrendingUp className="h-4 w-4" /> }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header Goals card */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 font-mono text-xs text-zinc-600">
          grounded_retrieval_v1.0
        </div>
        <div className="max-w-xl">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Target Objective</span>
          <h2 className="text-2xl font-bold text-white mt-1">{careerGoal}</h2>
          <p className="text-xs text-zinc-400 mt-2 font-mono line-clamp-1">{currentState}</p>
        </div>

        {/* Skill Gaps badges */}
        <div className="mt-4 pt-4 border-t border-zinc-800/60">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Identified Skill Gaps</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {skillGaps.map((gap, idx) => (
              <span 
                key={idx} 
                className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium"
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Next Immediate Action Banner */}
      <div className="accent-border rounded-2xl overflow-hidden bg-indigo-600/5 p-6 border border-indigo-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            Next Immediate Action Step
          </span>
          <h3 className="text-base font-semibold text-white">{nextImmediateAction}</h3>
          <p className="text-xs text-zinc-400 max-w-2xl">{nextActionReasoning}</p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-zinc-800/80 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 pb-4 text-xs font-semibold uppercase tracking-wider relative transition-colors duration-200 cursor-pointer ${
              activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.icon}
            {tab.name}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Contents */}
      <div className="min-h-[350px]">
        {/* Timeline Tab */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            {[plan30Day, plan90Day, plan180Day].map((phase, idx) => {
              const days = idx === 0 ? "Days 1 - 30" : idx === 1 ? "Days 31 - 90" : "Days 91 - 180";
              const borderColors = idx === 0 ? "border-indigo-500/30" : idx === 1 ? "border-violet-500/30" : "border-purple-500/30";
              return (
                <div key={idx} className={`glass-card p-6 rounded-2xl border-l-4 ${borderColors}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 font-mono">{days}</span>
                      <h4 className="text-base font-semibold text-white mt-1">{phase.title}</h4>
                      <p className="text-xs text-indigo-300/80 mt-1">{phase.focus}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2.5 text-xs text-zinc-400">
                    {phase.actions.map((act, aIdx) => (
                      <li key={aIdx} className="flex gap-2.5 items-start">
                        <CheckCircle className="h-4 w-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsToBuild.map((proj, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-base font-semibold text-white leading-snug">{proj.title}</h4>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium border ${
                      proj.difficulty === "Advanced"
                        ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                        : proj.difficulty === "Intermediate"
                        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                        : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                    }`}>
                      {proj.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Milestone Checklist</span>
                    <ul className="space-y-1.5 text-xs text-zinc-400">
                      {proj.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="flex gap-2 items-start">
                          <span className="text-[9px] font-mono text-zinc-600 mt-0.5">{mIdx + 1}.</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/40">
                    {proj.stack.map((tech) => (
                      <span key={tech} className="text-[9px] px-2 py-0.5 bg-zinc-950/60 rounded-md border border-zinc-800 text-zinc-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Resources List */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Grounded learning materials</span>
                <span className="text-[9px] text-zinc-600 font-mono">Foundry IQ Retrieval Index</span>
              </div>
              
              <div className="space-y-3">
                {learningResources.map((res, idx) => (
                  <div key={idx} className="glass-card p-4 rounded-xl flex flex-col justify-between space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">{res.provider} • {res.type}</span>
                        <h4 className="text-xs font-semibold text-white mt-0.5">{res.title}</h4>
                      </div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal italic">
                      "{res.relevance}"
                    </p>
                    <div className="flex justify-between items-center pt-2 border-t border-zinc-900/60">
                      <button
                        onClick={() => {
                          const cite = citations.find(c => c.id === res.citationId);
                          if (cite) setSelectedCitation(cite);
                        }}
                        className="text-[9px] font-mono text-zinc-500 hover:text-indigo-400 cursor-pointer flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        Source Citation: {res.citationId}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citations Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-800/60">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Source Grounding</span>
              </div>
              
              {selectedCitation ? (
                <div className="glass-panel p-4 rounded-xl space-y-3 border-indigo-500/20 bg-zinc-950/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono text-indigo-300 font-bold">{selectedCitation.id}</span>
                      <h4 className="text-xs font-semibold text-white leading-tight mt-0.5">{selectedCitation.title}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Publisher: {selectedCitation.source}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCitation(null)}
                      className="text-[10px] font-semibold text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono leading-relaxed text-zinc-400 italic">
                    "{selectedCitation.snippet}"
                  </div>
                  <a
                    href={selectedCitation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
                  >
                    View Source Document
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ) : (
                <div className="glass-panel p-6 rounded-xl text-center text-zinc-600 text-xs flex flex-col items-center justify-center h-[200px]">
                  <Info className="h-6 w-6 text-zinc-700 mb-2" />
                  <span>Select a source citation on a resource card to view verified indexing details.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Evaluation Tab */}
        {activeTab === "evaluation" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Probability Circle Gauge */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-6">Success Probability</span>
              
              <div className="relative h-40 w-40 flex items-center justify-center">
                {/* SVG Radial Gauge */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-zinc-900 fill-none"
                    strokeWidth="10"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r="68"
                    className="stroke-indigo-500 fill-none"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 68}
                    initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - successProbability / 100) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-white tracking-tight">{successProbability}%</span>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Feasible</span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 max-w-xs mt-6 leading-relaxed">
                Probability is calculated by the Critic Agent using target timeframe scale, weekly commitment level, and baseline fundamentals.
              </p>
            </div>

            {/* Critique metrics */}
            <div className="md:col-span-2 space-y-5">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block border-b border-zinc-800/60 pb-2">
                Feasibility Analysis Scores
              </span>
              
              <div className="space-y-4">
                {successMetrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-zinc-300">
                      <span>{metric.name}</span>
                      <span className="font-mono text-indigo-400">{metric.value}/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
