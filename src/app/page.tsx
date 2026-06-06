"use client";

import Link from "next/link";
import Hero from "@/components/Landing/Hero";
import Problem from "@/components/Landing/Problem";
import HowItWorks from "@/components/Landing/HowItWorks";
import Testimonials from "@/components/Landing/Testimonials";
import { Sparkles, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col selection:bg-indigo-500/30">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-500/30">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span>WDID <span className="text-indigo-400 font-medium">AI</span></span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/dashboard"
              className="text-xs font-semibold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Open Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <Problem />
        <HowItWorks />
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>WDID AI — Microsoft Agents League Hackathon Project 2026</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} WDID AI. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
