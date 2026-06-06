# WDID AI (What Do I Do?) — Agents League Hackathon Project 2026

WDID AI is a production-quality career reasoning agent designed for the **Microsoft Agents League Hackathon 2026**. It helps transitioners and developers answer one critical question: 

**"What should I do next to achieve my career goal?"**

By leveraging a structured multi-agent workflow grounded in **Microsoft Foundry IQ** search indexes, WDID AI translates vague career aspirations into verifiable, step-by-step 180-day roadmaps complete with portfolio project designs, learning resources, and next immediate steps—all backed by source citations.

---

## 🌟 Key Features

*   **Multi-Agent Reasoning Pipeline**: A sequenced workflow of 8 AI agents acting as analyzers, planners, and critics to refine and critique your career path.
*   **Microsoft Foundry IQ Integration**: Connects to the Azure AI Foundry index to retrieve real-world documentation and resource links.
*   **Zero-Hallucination Citations**: Provides inline source citations and match-scores directly linked to verified technical publishers.
*   **Startup-Class SaaS Aesthetic**: Apple-inspired dark mode UI featuring glowing state timelines, SVG feasibility gauges, and interactive terminal trace consoles mapping agent thinking.
*   **Grounded Offline Simulator**: Falls back automatically to a robust local grounded vector database if Azure credentials are not specified, enabling immediate local evaluation.

---

## 🤖 AI Reasoning Pipeline (8-Agent Chain)

WDID AI splits the complex problem of career mapping across 8 specialized AI agents:

```
[Profile Input]
      │
      ▼
┌─────────────────────────┐
│  1. Profile Analyzer    │ ──► Assesses skills, background, and availability
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  2. Goal Interpreter    │ ──► Mapped competency levels & hour constraints
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  3. Gap Analysis Agent  │ ──► Identifies critical missing competencies
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  4. Knowledge Agent     │ ──► Queries Microsoft Foundry IQ Vector Index
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  5. Roadmap Planner     │ ──► Designs 30-90-180 day milestone sequences
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  6. Project Generator   │ ──► Architects customized portfolio projects
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  7. Resource Recommender│ ──► Pairs learning plans with Foundry IQ citations
└─────────────────────────┘
      │
      ▼
┌─────────────────────────┐
│  8. Critic Agent        │ ──► Conducts feasibility checks & next actions
└─────────────────────────┘
      │
      ▼
[Dashboard Display]
```

1.  **Profile Analyzer**: Understands the user's current skills, experience, and educational level.
2.  **Goal Interpreter**: Translates target career objectives into industry standards and time frames.
3.  **Gap Analysis Agent**: Compares current assets with goal criteria to locate missing skills.
4.  **Knowledge Retrieval Agent**: Interfaces with Microsoft Foundry IQ to verify documents and get source URLs.
5.  **Roadmap Planner**: Constructs specific milestones for 30-day, 90-day, and 180-day plans.
6.  **Project Generator**: Suggests portfolio project descriptions with technology stacks and step-by-step milestones.
7.  **Resource Recommender**: Selects online courses and references, mapping them directly to retrieved citations.
8.  **Critic Agent**: Audits the roadmap, calculates a success feasibility score, and lists the Next Immediate Action.

---

## 🛠️ Tech Stack

*   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion
*   **State Management**: Zustand
*   **AI Integration**: Azure AI Projects JS SDK (`@azure/ai-projects`), `@azure/identity`
*   **Styling & Icons**: CSS-first Tailwind variables, Lucide React

---

## 💻 Local Setup & Installation

### Prerequisites

*   Node.js (v18.0.0 or higher)
*   npm (v9.0.0 or higher)

### 1. Clone & Install Dependencies

Clone the project repository and install packages:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```bash
# Azure OpenAI Credentials
AZURE_OPENAI_API_KEY=your-azure-api-key
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o

# Microsoft Foundry IQ Connection details
FOUNDRY_PROJECT_ENDPOINT=https://your-project-endpoint.services.ai.azure.com/api/projects/your-project-name
FOUNDRY_SEARCH_CONNECTION_ID=your-search-connection-id-from-connections-list
FOUNDRY_SEARCH_INDEX_NAME=your-grounded-career-index-name
```

> [!NOTE]
> **No Azure Credentials?** Leaving the `.env` values blank forces the application into **Offline Simulator Mode**, enabling immediate local usage with a high-fidelity local vector database for review.

### 3. Launch Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

### 4. Build for Production

Ensure the application compiles without errors:

```bash
npm run build
```

---

## 🚀 Deployment Instructions

### Vercel (Recommended)

1.  Connect your GitHub repository to your Vercel Dashboard.
2.  Add the environment variables listed in `.env.example` to Vercel's Environment Variables Settings.
3.  Deploy. Vercel automatically detects Next.js 15 and deploys it as serverless/edge functions.

### Azure App Service

1.  Create an App Service Instance in Azure with the Node.js runtime.
2.  Configure Environment Variables under **Settings > Configuration** in the Azure Portal.
3.  Deploy code via Local Git or GitHub Actions. Ensure build scripts run successfully.
