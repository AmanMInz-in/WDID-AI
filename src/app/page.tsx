"use client";

import { useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Landing/Hero";
import Problem from "@/components/Landing/Problem";
import HowItWorks from "@/components/Landing/HowItWorks";
import Testimonials from "@/components/Landing/Testimonials";
import { Terminal } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    document.title = "WDID AI - What Do I Do Next? | AI Career Reasoning Agent";
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col selection:bg-indigo-500/30">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/40 h-20">
        <div className="mx-auto max-w-6xl px-6 h-full flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center border border-indigo-500/30">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="font-sans text-sm tracking-tight">WDID <span className="text-indigo-400 font-medium">AI</span></span>
          </Link>
          
          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            <Link 
              href="/dashboard"
              className="text-xs font-medium tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
            >
              DASHBOARD
            </Link>
            <a 
              href="#how-it-works"
              className="text-xs font-medium tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
            >
              HOW IT WORKS
            </a>
            <Link 
              href="/about"
              className="text-xs font-medium tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
            >
              ABOUT CREATOR
            </Link>
          </nav>

          {/* Action button on Right */}
          <div className="flex items-center gap-4">
            <Link 
              href="/about"
              className="md:hidden text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              href="/dashboard"
              className="border border-white/20 bg-transparent text-white font-semibold uppercase tracking-wider text-xs px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-200"
            >
              Launch App
            </Link>
          </div>
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
      <Footer />
    </div>
  );
}
