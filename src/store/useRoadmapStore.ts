import { create } from "zustand";

export interface AgentLog {
  agent: string;
  message: string;
  timestamp: string;
  type: "info" | "success" | "warning";
}

export interface Project {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  stack: string[];
  milestones: string[];
}

export interface LearningResource {
  title: string;
  type: "Course" | "Documentation" | "Book" | "Tutorial";
  provider: string;
  url: string;
  citationId: string;
  relevance: string;
}

export interface Citation {
  id: string;
  title: string;
  source: string;
  snippet: string;
  url: string;
}

export interface PlanPhase {
  title: string;
  focus: string;
  actions: string[];
}

export interface RoadmapData {
  careerGoal: string;
  currentState: string;
  skillGaps: string[];
  plan30Day: PlanPhase;
  plan90Day: PlanPhase;
  plan180Day: PlanPhase;
  projectsToBuild: Project[];
  learningResources: LearningResource[];
  citations: Citation[];
  successProbability: number;
  successMetrics: { name: string; value: number }[];
  nextImmediateAction: string;
  nextActionReasoning: string;
}

interface RoadmapStore {
  // Input fields
  skills: string;
  education: string;
  experience: string;
  interests: string;
  targetRole: string;
  timeAvailable: string; // hours/week
  timeframe: string; // duration in months

  // Execution states
  status: "idle" | "analyzing" | "retrieving" | "planning" | "refining" | "done" | "error";
  error: string | null;
  logs: AgentLog[];
  roadmap: RoadmapData | null;

  // Actions
  setField: (field: string, value: string) => void;
  setStatus: (status: RoadmapStore["status"]) => void;
  setError: (error: string | null) => void;
  addLog: (agent: string, message: string, type?: AgentLog["type"]) => void;
  clearLogs: () => void;
  setRoadmap: (roadmap: RoadmapData | null) => void;
  resetForm: () => void;
  submitProfile: () => Promise<void>;
}

export const useRoadmapStore = create<RoadmapStore>((set, get) => ({
  skills: "",
  education: "",
  experience: "",
  interests: "",
  targetRole: "",
  timeAvailable: "15",
  timeframe: "6 months",

  status: "idle",
  error: null,
  logs: [],
  roadmap: null,

  setField: (field, value) => set({ [field]: value }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  
  addLog: (agent, message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    set((state) => ({
      logs: [...state.logs, { agent, message, timestamp, type }],
    }));
  },
  
  clearLogs: () => set({ logs: [] }),
  setRoadmap: (roadmap) => set({ roadmap }),
  
  resetForm: () => set({
    skills: "",
    education: "",
    experience: "",
    interests: "",
    targetRole: "",
    timeAvailable: "15",
    timeframe: "6 months",
    status: "idle",
    error: null,
    logs: [],
    roadmap: null
  }),

  submitProfile: async () => {
    const { skills, education, experience, interests, targetRole, timeAvailable, timeframe } = get();
    
    if (!skills || !targetRole) {
      set({ error: "Please enter your current skills and target career goal." });
      return;
    }

    set({ status: "analyzing", error: null, logs: [], roadmap: null });

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills,
          education,
          experience,
          interests,
          targetRole,
          timeAvailable,
          timeframe,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process roadmap. Please try again.");
      }

      // Read stream for agent logs and final output
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error("ReadableStream not supported by browser.");
      }

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        
        // Save the last partial line back to the buffer
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (!line.trim()) continue;
          
          try {
            const data = JSON.parse(line);
            
            if (data.type === "log") {
              set((state) => ({
                status: data.status,
                logs: [...state.logs, {
                  agent: data.agent,
                  message: data.message,
                  timestamp: new Date().toLocaleTimeString(),
                  type: data.logType || "info"
                }]
              }));
            } else if (data.type === "result") {
              set({
                status: "done",
                roadmap: data.roadmap
              });
            } else if (data.type === "error") {
              set({
                status: "error",
                error: data.message
              });
            }
          } catch (e) {
            console.error("Error parsing stream line:", e);
          }
        }
      }
    } catch (err: any) {
      set({ status: "error", error: err.message || "An unexpected error occurred." });
    }
  },
}));
