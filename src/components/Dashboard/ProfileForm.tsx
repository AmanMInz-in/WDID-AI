"use client";

import { useRoadmapStore } from "@/store/useRoadmapStore";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function ProfileForm() {
  const {
    skills,
    education,
    experience,
    interests,
    targetRole,
    timeAvailable,
    timeframe,
    status,
    error,
    setField,
    submitProfile
  } = useRoadmapStore();

  const isSubmitting = status !== "idle" && status !== "done" && status !== "error";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProfile();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-6 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
      
      <div>
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          Career Parameters
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Tell us about your background and what you want to achieve.
        </p>
      </div>

      {error && (
        <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Target Role & Timeframe */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="targetRole" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Target Career Goal / Role
          </label>
          <input
            id="targetRole"
            type="text"
            required
            disabled={isSubmitting}
            value={targetRole}
            onChange={(e) => setField("targetRole", e.target.value)}
            placeholder="e.g. AI Engineer Internship"
            className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="timeframe" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Target Timeframe
          </label>
          <select
            id="timeframe"
            disabled={isSubmitting}
            value={timeframe}
            onChange={(e) => setField("timeframe", e.target.value)}
            className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          >
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="12 months">12 Months</option>
          </select>
        </div>
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="skills" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
          Current Skills
        </label>
        <textarea
          id="skills"
          required
          rows={2}
          disabled={isSubmitting}
          value={skills}
          onChange={(e) => setField("skills", e.target.value)}
          placeholder="e.g. Python, SQL, Git basics, HTML/CSS"
          className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 resize-none transition-colors"
        />
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="experience" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Experience Level
          </label>
          <input
            id="experience"
            type="text"
            disabled={isSubmitting}
            value={experience}
            onChange={(e) => setField("experience", e.target.value)}
            placeholder="e.g. Self-taught for 6 months"
            className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="education" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Education Level
          </label>
          <input
            id="education"
            type="text"
            disabled={isSubmitting}
            value={education}
            onChange={(e) => setField("education", e.target.value)}
            placeholder="e.g. B.S. in Computer Science (Student)"
            className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          />
        </div>
      </div>

      {/* Interests & Study Hours */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="interests" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Specific Interests
          </label>
          <input
            id="interests"
            type="text"
            disabled={isSubmitting}
            value={interests}
            onChange={(e) => setField("interests", e.target.value)}
            placeholder="e.g. NLP, web design, automation"
            className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="timeAvailable" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
            Study Commitment ({timeAvailable} hrs/week)
          </label>
          <input
            id="timeAvailable"
            type="range"
            min="5"
            max="40"
            step="5"
            disabled={isSubmitting}
            value={timeAvailable}
            onChange={(e) => setField("timeAvailable", e.target.value)}
            className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-4 disabled:opacity-50"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono">
            <span>5 hrs</span>
            <span>20 hrs</span>
            <span>40 hrs</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
            Analyzing Profile...
          </>
        ) : (
          <>
            Run Career Reasoner
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
