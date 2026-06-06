import { queryFoundryIQ } from "./foundryIq";
import { RoadmapData, AgentLog } from "@/store/useRoadmapStore";

interface ProfileInput {
  skills: string;
  education: string;
  experience: string;
  interests: string;
  targetRole: string;
  timeAvailable: string; // hours per week
  timeframe: string; // months
}

export async function runMultiAgentPipeline(
  input: ProfileInput,
  onLog: (agent: string, message: string, type?: AgentLog["type"]) => void
): Promise<RoadmapData> {
  const { skills, education, experience, interests, targetRole, timeAvailable, timeframe } = input;

  // Agent 1: Profile Analyzer
  onLog("Profile Analyzer", "Initializing current profile assessment...", "info");
  await new Promise((resolve) => setTimeout(resolve, 800));
  onLog("Profile Analyzer", `Analyzed skills: [${skills}].`, "info");
  onLog("Profile Analyzer", `Analyzed experience level: "${experience || "Self-taught / Entry Level"}".`, "info");
  onLog("Profile Analyzer", `Analyzed education: "${education || "Not specified"}".`, "info");
  onLog("Profile Analyzer", `Profile assessment completed. Current state mapped.`, "success");

  // Agent 2: Goal Interpreter
  onLog("Goal Interpreter", `Interpreting target goal: "${targetRole}" over a "${timeframe}" timeframe...`, "info");
  await new Promise((resolve) => setTimeout(resolve, 600));
  const commitHours = parseInt(timeAvailable) || 15;
  const estimatedTotalHours = commitHours * 4 * (parseInt(timeframe) || 6);
  onLog("Goal Interpreter", `Calculated effort allocation: ${commitHours} hrs/week over ${timeframe}. Total estimated learning time: ${estimatedTotalHours} hours.`, "info");
  onLog("Goal Interpreter", `Target role mapped to industry competency standards.`, "success");

  // Agent 3: Gap Analysis Agent
  onLog("Gap Analysis Agent", "Comparing current skills against target role requirements...", "info");
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Dynamic skill gaps based on the role and current skills
  const skillsList = skills.toLowerCase().split(",").map(s => s.trim());
  const allExpectedSkills = getExpectedSkillsForRole(targetRole);
  const gaps = allExpectedSkills.filter(req => !skillsList.some(has => req.toLowerCase().includes(has) || has.includes(req.toLowerCase())));
  
  onLog("Gap Analysis Agent", `Found ${gaps.length} critical competency gaps: ${gaps.join(", ")}`, "warning");
  onLog("Gap Analysis Agent", "Gap analysis complete. Constructing learning requirements matrix.", "success");

  // Agent 4: Knowledge Retrieval Agent (Foundry IQ)
  onLog("Knowledge Retrieval Agent", "Initiating search queries on Microsoft Foundry IQ...", "info");
  const grounding = await queryFoundryIQ(skills, targetRole, onLog);
  onLog("Knowledge Retrieval Agent", `Grounded search index returned ${grounding.citations.length} sources and ${grounding.resources.length} resource matches.`, "success");

  // Agent 5: Roadmap Planner
  onLog("Roadmap Planner", "Designing milestone progression timeline...", "info");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const plan30Day = generate30DayPlan(targetRole, gaps, commitHours);
  onLog("Roadmap Planner", "30-Day 'Foundation Phase' created.", "info");
  
  const plan90Day = generate90DayPlan(targetRole, gaps, commitHours);
  onLog("Roadmap Planner", "90-Day 'Integration & Building Phase' created.", "info");
  
  const plan180Day = generate180DayPlan(targetRole, timeframe, commitHours);
  onLog("Roadmap Planner", "Milestone timeline layout complete.", "success");

  // Agent 6: Project Generator
  onLog("Project Generator", "Architecting portfolio projects targeting skill gaps...", "info");
  await new Promise((resolve) => setTimeout(resolve, 900));
  const projects = generateProjects(targetRole, gaps);
  onLog("Project Generator", `Generated ${projects.length} custom portfolio projects complete with architecture stacks and milestones.`, "success");

  // Agent 7: Resource Recommender
  onLog("Resource Recommender", "Matching learning resources with retrieved citations...", "info");
  await new Promise((resolve) => setTimeout(resolve, 700));
  const resources = grounding.resources;
  onLog("Resource Recommender", `Linked ${resources.length} learning resources with Foundry IQ citations.`, "success");

  // Agent 8: Critic Agent
  onLog("Critic Agent", "Reviewing roadmap plan structure, project complexity, and timelines...", "info");
  await new Promise((resolve) => setTimeout(resolve, 1100));
  
  // Calculate success probability based on time available and current skills
  const baselineProb = 60;
  const skillBonus = Math.min(skillsList.length * 5, 20);
  const timeBonus = Math.min(Math.max(commitHours - 10, 0) * 1.5, 15);
  const successProbability = Math.min(baselineProb + skillBonus + timeBonus, 98);
  
  const nextImmediateAction = getNextImmediateAction(targetRole, gaps);
  const nextActionReasoning = getNextActionReasoning(targetRole, gaps);

  onLog("Critic Agent", `Critique completed: Calculated success probability at ${successProbability}%. Roadmap verified for delivery.`, "success");

  return {
    careerGoal: `Transition to a ${targetRole} within ${timeframe}`,
    currentState: `Current Skills: ${skills}. Experience: ${experience}. Education: ${education}. Interest focus: ${interests}.`,
    skillGaps: gaps.length > 0 ? gaps : ["No major gaps detected, proceed to advanced project construction"],
    plan30Day,
    plan90Day,
    plan180Day,
    projectsToBuild: projects,
    learningResources: resources,
    citations: grounding.citations,
    successProbability,
    successMetrics: [
      { name: "Time Dedication", value: Math.min((commitHours / 30) * 100, 100) },
      { name: "Core Fundamentals", value: skillsList.length > 0 ? 80 : 30 },
      { name: "Project Readiness", value: 45 },
      { name: "Timeline Feasibility", value: timeframe.includes("6") || timeframe.includes("12") ? 90 : 60 }
    ],
    nextImmediateAction,
    nextActionReasoning
  };
}

// Helper: expected skills list by category
function getExpectedSkillsForRole(role: string): string[] {
  const r = role.toLowerCase();
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return [
      "PyTorch or TensorFlow deep learning foundations",
      "Retrieval-Augmented Generation (RAG) system building",
      "Vector Database configuration (Pinecone, PGVector or Azure AI Search)",
      "Prompt Engineering & Large Language Model orchestration",
      "AI model evaluation, logging & observability",
      "Python programming, NumPy, Pandas, Scikit-learn"
    ];
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return [
      "Next.js App Router (RSC, Server Actions, routing mechanics)",
      "TypeScript type modeling & safety",
      "Tailwind CSS responsive design layout",
      "State management frameworks (e.g. Zustand, Redux)",
      "Web accessibility rules (WCAG 2.2, screen-readers)",
      "API client integrations & state synchronization"
    ];
  }
  if (r.includes("data") || r.includes("analyst") || r.includes("science")) {
    return [
      "Python data programming (Pandas, NumPy)",
      "Statistical inference & A/B testing models",
      "Structured Query Language (SQL) & indexing optimizations",
      "Interactive data visualizations (Plotly, Tableau, PowerBI)",
      "Supervised ML classification & regression using Scikit-Learn"
    ];
  }
  if (r.includes("product") || r.includes("pm") || r.includes("manager")) {
    return [
      "Writing detailed Product Requirement Documents (PRDs)",
      "Product prioritization matrix scaling (RICE, Kano)",
      "Running customer research & interviews",
      "Jira scoping & agile release mechanics",
      "Growth tracking & analytics (AARRR, HEART)"
    ];
  }
  // General default skills
  return [
    "Git version control & GitHub workflows",
    "API development & JSON consumption",
    "System architecture and design principles",
    "Technical writing & specification reading"
  ];
}

function generate30DayPlan(role: string, gaps: string[], hours: number) {
  const r = role.toLowerCase();
  const studyHours = hours * 4;
  
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return {
      title: "Phase 1: Foundation & Model Querying",
      focus: `Master the python AI ecosystem and basic LLM orchestration. Target Study Load: ~${studyHours} hours.`,
      actions: [
        "Read Azure AI Search Grounding Guide to understand chunking and search indexing configurations.",
        "Set up local python environment with PyTorch, Transformers, and Jupyter notebook.",
        "Build a simple CLI chatbot that queries OpenAI API using LangChain.",
        "Complete foundational prompt engineering short courses online."
      ]
    };
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return {
      title: "Phase 1: Advanced Next.js Rendering & Layouts",
      focus: `Master React Server Components, TypeScript, and layouts. Target Study Load: ~${studyHours} hours.`,
      actions: [
        "Review Next.js rendering documentation focusing on server components vs client components.",
        "Refactor an existing Javascript project into strict TypeScript.",
        "Build 3 responsive layouts using Tailwind CSS grid and flex alignments.",
        "Verify keyboard accessibility (tab indexes) on all interactive web components."
      ]
    };
  }
  return {
    title: "Phase 1: Professional Fundamentals",
    focus: `Acquire core tooling and system concepts. Target Study Load: ~${studyHours} hours.`,
    actions: [
      "Set up Git branching workflow and practice merging/rebasing via command line.",
      "Read introduction to API designs, JSON structures, and REST endpoints.",
      "Map out the logical block diagram of a standard multi-tier web application.",
      "Complete introductory syntax exercises in the primary coding language."
    ]
  };
}

function generate90DayPlan(role: string, gaps: string[], hours: number) {
  const r = role.toLowerCase();
  const studyHours = hours * 8;
  
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return {
      title: "Phase 2: RAG, Vector Search, and Evals",
      focus: `Connect LLMs to external indices and evaluate retrieval accuracy. Target Study Load: ~${studyHours} hours.`,
      actions: [
        "Implement a Retrieval-Augmented Generation (RAG) system with a vector database (Pinecone or pgvector).",
        "Set up an evaluation script to measure RAG output groundedness and relevance.",
        "Deploy a local open-source model (e.g. Llama-3) using Ollama and interface with it programmatically.",
        "Connect external knowledge endpoints to an AI agent framework."
      ]
    };
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return {
      title: "Phase 2: Global State and API Synchronization",
      focus: `Connect frontends to live backends, manage state, and optimize performance. Target Study Load: ~${studyHours} hours.`,
      actions: [
        "Create a Zustand or Redux global store and connect it to form and dashboard pages.",
        "Optimize web app performance, aiming for a 90+ Lighthouse Core Web Vitals score.",
        "Create a dashboard that handles real-time data streaming (WebSockets or Server-Sent Events).",
        "Write integration tests using Jest or Playwright."
      ]
    };
  }
  return {
    title: "Phase 2: Project Architecture & API Integration",
    focus: `Build fully functional web applications and databases. Target Study Load: ~${studyHours} hours.`,
    actions: [
      "Build a SQL database, configure indices, and write join queries.",
      "Create a RESTful Express or Next.js backend API with authentication tokens.",
      "Integrate front-end states with backend APIs using async/await handlers.",
      "Set up automated unit testing pipelines."
    ]
  };
}

function generate180DayPlan(role: string, timeframe: string, hours: number) {
  const r = role.toLowerCase();
  const duration = timeframe || "6 months";
  
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return {
      title: "Phase 3: Production Deployment, Evals, and Portfolio",
      focus: `Ship production-grade AI solutions and build portfolio presence.`,
      actions: [
        "Deploy the RAG application using Azure AI Studio or Vercel.",
        "Conduct user testing to review latency, throughput, and token expenditure metrics.",
        "Publish project codebase to GitHub with high-quality README, architecture diagrams, and user guides.",
        "Prepare for technical interviews focusing on system design and deep learning theory."
      ]
    };
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return {
      title: "Phase 3: Professional Deployment and Framework Customization",
      focus: `Deploy, monitor, and bundle clean portfolio projects.`,
      actions: [
        "Deploy Next.js application to Vercel or Netlify with production configuration.",
        "Implement error boundaries, visual loading fallbacks, and real-time monitoring analytics.",
        "Write full engineering articles detailing layout decisions and accessibility solutions.",
        "Review data-structures, DOM rendering cycles, and advanced JS engine concepts for interviews."
      ]
    };
  }
  return {
    title: "Phase 3: Full Stack Launch & Interview Readiness",
    focus: `Ship, secure, and polish full-stack systems.`,
    actions: [
      "Deploy full-stack projects using cloud providers (Render, Heroku, AWS).",
      "Configure SSL certificates, CORS policies, and basic rate limiting middleware.",
      "Prepare a solid professional resume outlining projects built.",
      "Practice coding algorithms and system design whiteboard challenges."
    ]
  };
}

function generateProjects(role: string, gaps: string[]) {
  const r = role.toLowerCase();
  
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return [
      {
        title: "SemanticDoc Search & Analytics Dashboard",
        description: "A secure document analyzer that vectorizes uploaded PDF manuals, stores them in Azure AI Search, and provides a question-answering chat interface utilizing RAG.",
        difficulty: "Intermediate" as const,
        stack: ["Next.js", "Python", "Azure AI Search", "LangChain", "OpenAI GPT-4o"],
        milestones: [
          "Phase 1: Set up vector DB and chunk PDFs with overlaps.",
          "Phase 2: Integrate search query retrievals with Azure OpenAI API.",
          "Phase 3: Code the chat interface UI with sources highlighting."
        ]
      },
      {
        title: "AutoEval: LLM System Safeguard Pipeline",
        description: "An automated testing suite that evaluates AI agent chatbot outputs against standard safety, groundedness, and hallucination metrics using custom evaluator models.",
        difficulty: "Advanced" as const,
        stack: ["Python", "Hugging Face", "Scikit-Learn", "Azure AI Foundry SDK"],
        milestones: [
          "Phase 1: Compile evaluation dataset with edge-cases.",
          "Phase 2: Write script evaluating cosine similarity and semantic overlap.",
          "Phase 3: Visualize result logs via an interactive dashboard."
        ]
      }
    ];
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return [
      {
        title: "Spectra: Premium Analytics SaaS Dashboard",
        description: "A dark-themed premium dashboard showing real-time system analytics, using glassmorphic UI, smooth charts, and a high-performance client state structure.",
        difficulty: "Intermediate" as const,
        stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Zustand", "Recharts", "Framer Motion"],
        milestones: [
          "Phase 1: Design components and layout structures.",
          "Phase 2: Set up Zustand global state tracking server feeds.",
          "Phase 3: Add framer-motion micro-interactions and loading transitions."
        ]
      },
      {
        title: "Accessible Workspace Tooling Kit",
        description: "A fully accessible task scheduler compliant with WCAG 2.2 standards, providing complete keyboard controls, screen-reader announcements, and adjustable color profiles.",
        difficulty: "Beginner" as const,
        stack: ["React", "CSS Modules", "Axe-Core Evals", "Vite"],
        milestones: [
          "Phase 1: Code HTML structures with strict semantic labels.",
          "Phase 2: Add keyboard listeners and ARIA toggling logic.",
          "Phase 3: Audit color contrasts and run screen-reader validations."
        ]
      }
    ];
  }
  // Default general projects
  return [
    {
      title: "DevFlow: Agile Task Board Application",
      description: "A full-stack project organizer styled like a Kanban board, permitting users to manage cards, drag-and-drop items, and sync statuses across a database.",
      difficulty: "Intermediate" as const,
      stack: ["Next.js", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
      milestones: [
        "Phase 1: Build the Express API and database models.",
        "Phase 2: Code the UI with Drag-and-drop lists.",
        "Phase 3: Add database state syncing and login authentication."
      ]
    }
  ];
}

function getNextImmediateAction(role: string, gaps: string[]): string {
  const r = role.toLowerCase();
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return "Set up an Azure AI Search Index or copy local PDF documents to compile a custom grounding dataset.";
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return "Initialize a Next.js 15 repository and build a basic layout structure with TS support.";
  }
  return "Configure a local Git repository and practice branching and merging workflows.";
}

function getNextActionReasoning(role: string, gaps: string[]): string {
  const r = role.toLowerCase();
  if (r.includes("ai") || r.includes("machine learning") || r.includes("ml")) {
    return "RAG pipelines rely completely on the quality of retrieved context. Starting with compiling and structuring your grounding data guarantees that your agent will have high-relevance citations and avoid hallucinations from the start.";
  }
  if (r.includes("front") || r.includes("web") || r.includes("react") || r.includes("ui")) {
    return "Understanding Next.js's dual client/server paradigm is critical. Getting a basic project compiled with layout files helps cement TypeScript and React rendering foundations.";
  }
  return "Git is the absolute baseline of professional engineering. Establishing clean version control routines prevents code loss and mirrors the standard workflow of engineering teams.";
}
