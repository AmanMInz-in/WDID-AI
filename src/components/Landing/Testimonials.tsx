import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      body: "I was trying to pivot to AI Engineering for months. WDID gave me a clear 180-day roadmap. In 5 months, I secured an internship using the exact projects recommended by the system.",
      author: "Sarah Chen",
      role: "AI Engineering Intern @ Scale AI",
      avatar: "SC"
    },
    {
      body: "The integration of Foundry IQ citations means I don't waste time on broken tutorials. The resource recommender gives me actual links to working docs.",
      author: "Alex Kowalski",
      role: "Career Pivoter & Full Stack Dev",
      avatar: "AK"
    }
  ];

  return (
    <section className="py-20 border-t border-zinc-800/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Success Stories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pivot with confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-2 mb-20">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <p className="text-zinc-300 italic text-sm leading-relaxed">
                "{t.body}"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-800/60 pt-4">
                <div className="h-10 w-10 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.author}</h4>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mx-auto max-w-5xl">
          <div className="relative isolate overflow-hidden bg-zinc-900/40 border border-zinc-800/60 rounded-3xl px-6 py-16 sm:px-16 md:py-20 text-center flex flex-col items-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stop guessing your career path.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Get an AI-designed, grounded roadmap. Find out exactly what skills you lack, what to build, and what resources to study.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all duration-200"
              >
                Launch App
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
