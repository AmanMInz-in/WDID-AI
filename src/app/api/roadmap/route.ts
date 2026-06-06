import { runMultiAgentPipeline } from "@/services/agents";

export const dynamic = "force-dynamic";

function getStatusFromAgent(agent: string): string {
  switch (agent) {
    case "Profile Analyzer":
      return "analyzing";
    case "Goal Interpreter":
      return "analyzing";
    case "Gap Analysis Agent":
      return "analyzing";
    case "Knowledge Retrieval Agent":
      return "retrieving";
    case "Roadmap Planner":
      return "planning";
    case "Project Generator":
      return "planning";
    case "Resource Recommender":
      return "planning";
    case "Critic Agent":
      return "refining";
    default:
      return "analyzing";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Quick validation
    if (!body.skills || !body.targetRole) {
      return Response.json(
        { error: "Skills and target role are required inputs." },
        { status: 400 }
      );
    }
    
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        const sendLog = (agent: string, message: string, type: "info" | "success" | "warning" = "info") => {
          const payload = JSON.stringify({
            type: "log",
            agent,
            message,
            logType: type,
            status: getStatusFromAgent(agent),
          });
          controller.enqueue(encoder.encode(payload + "\n"));
        };
        
        try {
          const roadmap = await runMultiAgentPipeline(body, sendLog);
          
          // Small final sleep for UX spacing
          await new Promise(resolve => setTimeout(resolve, 500));
          
          controller.enqueue(encoder.encode(JSON.stringify({
            type: "result",
            roadmap
          }) + "\n"));
        } catch (error: any) {
          controller.enqueue(encoder.encode(JSON.stringify({
            type: "error",
            message: error.message || "Failed to generate roadmap plan."
          }) + "\n"));
        } finally {
          controller.close();
        }
      }
    });
    
    return new Response(stream, {
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      }
    });
    
  } catch (err: any) {
    return Response.json(
      { error: "Invalid request format." },
      { status: 400 }
    );
  }
}
