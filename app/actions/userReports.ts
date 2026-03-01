"use server";

import { prisma } from "@/prisma/src";

/**
 * Fetches all interview reports for a specific user ID.
 * @param userId The ID of the user whose reports to fetch
 */
export async function getUserInterviewReports(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to fetch reports");
  }

  try {
    const reports = await prisma.interviewReport.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reports;
  } catch (error) {
    console.error(`Error fetching interview reports for user ${userId}:`, error);
    throw new Error("Failed to fetch user interview reports");
  }
}

/**
 * Fetches a single interview report by its ID.
 * @param reportId The ID of the report to fetch
 */
export async function getInterviewReportById(reportId: string) {
  if (!reportId) {
    throw new Error("Report ID is required");
  }

  try {
    const report = await prisma.interviewReport.findUnique({
      where: {
        id: reportId,
      },
    });

    return report;
  } catch (error) {
    console.error(`Error fetching interview report ${reportId}:`, error);
    throw new Error("Failed to fetch interview report");
  }
}
