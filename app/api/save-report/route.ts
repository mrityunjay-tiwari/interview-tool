import { prisma } from "@/prisma/src";


export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { report, userId, role, postureStats } = data;

    console.log("📥 [API] save-report received request for user:", userId);
    console.log("📄 [API] Report Data:", JSON.stringify(report, null, 2));
    console.log("📈 [API] Posture Stats:", postureStats);

    try {
      const savedReport = await prisma.interviewReport.create({
        data: {
          userId,
          role,

          technicalScore: report.technicalScore,
          problemSolvingScore: report.problemSolvingScore,
          communicationScore: report.communicationScore,
          confidenceScore: report.confidenceScore,
          behavioralScore: report.behavioralScore,
          overallScore: report.overallScore,

          strengths: report.strengths,
          improvementAreas: report.improvementAreas,
          finalSummary: report.finalSummary,

          postureMin: postureStats.min,
          postureMax: postureStats.max,
          postureAvg: postureStats.avg,
        },
      });
      
      console.log("✅ [API] Report successfully saved to DB with ID:", savedReport.id);
      return Response.json({ success: true, id: savedReport.id });

    } catch (prismaError: unknown) {
      const errorMessage = prismaError instanceof Error ? prismaError.message : "Unknown database error";
      console.error("❌ [API] Prisma Error details:", prismaError);
      return new Response(`Database save failed: ${errorMessage}`, { status: 500 });
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ [API] Final catch error:", error);
    return new Response(`Save failed: ${errorMessage}`, { status: 500 });
  }
}