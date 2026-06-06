import { ShieldAlert, BookOpen, Compass, RotateCcw } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      icon: <Compass className="h-6 w-6 text-indigo-400" />,
      title: "Information Overwhelm",
      description: "Thousands of courses and blog posts make it impossible to determine what step to take next."
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-rose-400" />,
      title: "Hallucinated Advice",
      description: "Generic AI assistants suggest outdated libraries or courses that don't exist anymore."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-violet-400" />,
      title: "No Grounded Context",
      description: "Roadmaps generated without referencing verified documentation lead to massive skill gaps."
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-purple-400" />,
      title: "Lack of Adaptability",
      description: "Standard roadmaps are static and don't adjust to your weekly time commitment or prior knowledge."
    }
  ];

  return (
    <section className="py-20 border-t border-zinc-800/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">The Problem</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why traditional career plans fail.
          </p>
          <p className="mt-4 text-zinc-400">
            Generic roadmaps aren't designed for you. They don't know your schedule, your prior experience, or what libraries are actually relevant today.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none">
          {problems.map((prob, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-shrink-0 p-3 rounded-lg bg-zinc-800/40 h-fit">
                {prob.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{prob.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{prob.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
