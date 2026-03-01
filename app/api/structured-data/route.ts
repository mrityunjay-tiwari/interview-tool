import { streamObject } from "ai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { InterviewReportSchema } from "./schema";
import { INTERVIEW_EVALUATOR_SYSTEM_PROMPT } from "@/utils/system-prompt";

export async function POST(req: Request) {
  try {
    const { questions } = await req.json();

    console.log({ questions });

    const result = streamObject({
      model: openrouter("qwen/qwen3-235b-a22b-thinking-2507"),
      schema: InterviewReportSchema,
      prompt: INTERVIEW_EVALUATOR_SYSTEM_PROMPT,
    });

    console.log("The result : ", result);
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error generating recipe:", error);
    return new Response("Failed to generate recipe", { status: 500 });
  }
}