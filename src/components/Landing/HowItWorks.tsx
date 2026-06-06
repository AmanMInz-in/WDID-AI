import { UserCheck, Search, Cpu, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <UserCheck className="h-5 w-5 text-indigo-400" />,
      title: "Input Context",
      description: "Provide your current skills, background, target role, and weekly hours. The Profile Analyzer and Goal Interpreter parse your data."
    },
    {
      num: "02",
      icon: <Search className="h-5 w-5 text-violet-400" />,
      title: "Foundry IQ Grounding",
      description: "The Knowledge Retrieval Agent queries Microsoft Foundry IQ indexes to retrieve current documentation, tools, and learning resource citations."
    },
    {
      num: "03",
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      title: "Agent Reasoning",
      description: "Dedicated agents generate timelines, design target portfolio projects, select resources, and check gaps. The Critic Agent checks the entire plan for feasibility."
    },
    {
      num: "04",
      icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
      title: "Actionable Path",
      description: "Receive your probability of success score, a 30-90-180 day roadmap, portfolio project architectures, and your next immediate action step."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-zinc-800/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">The Technology</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Multi-Agent reasoning in action.
          </p>
          <p className="mt-4 text-zinc-400">
            WDID AI operates a structured chain of 8 expert agents, validating every recommendation through grounded search checks.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl relative flex flex-col justify-between">
              <div>
                <span className="absolute top-4 right-4 text-3xl font-mono font-bold text-zinc-800/50">
                  {step.num}
                </span>
                <div className="p-2 rounded-lg bg-zinc-800/40 w-fit mb-4">
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
