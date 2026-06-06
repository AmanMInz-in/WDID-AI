"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const staticContent = (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-8 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Introducing Microsoft Foundry IQ Integration</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.15] mb-6">
          What Do I Do <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Next?</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto">
          An AI career reasoning agent that transforms goals into actionable roadmaps. Grounded in live industry data using Microsoft Foundry IQ retrieval.
        </p>

        {/* Action Buttons */}
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

        {/* Key Metrics Summary */}
        <div className="mt-20 sm:mt-28 border-t border-zinc-900 pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6 text-zinc-500 text-xs font-medium uppercase tracking-wider">
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
        </div>
      </div>
    </div>
  );

  if (!mounted) {
    return (
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-36 bg-[#030303]">
        {/* Background Grids & Glows */}
        <div className="absolute inset-0 grid-overlay -z-10" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full animated-glow-1 -z-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full animated-glow-2 -z-20" />
        
        {staticContent}
      </section>
    );
  }

  // Hydrated state: Animate elements into position with framer-motion
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-36 bg-[#030303]">
      {/* Background Grids & Glows */}
      <div className="absolute inset-0 grid-overlay -z-10" />
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full animated-glow-1 -z-20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full animated-glow-2 -z-20" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Introducing Microsoft Foundry IQ Integration</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.15] mb-6"
          >
            What Do I Do <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Next?</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto"
          >
            An AI career reasoning agent that transforms goals into actionable roadmaps. Grounded in live industry data using Microsoft Foundry IQ retrieval.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
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

          {/* Key Metrics Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 sm:mt-28 border-t border-zinc-900 pt-8 flex flex-wrap justify-center gap-x-12 gap-y-6 text-zinc-500 text-xs font-medium uppercase tracking-wider"
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
      </div>
    </section>
  );
}
