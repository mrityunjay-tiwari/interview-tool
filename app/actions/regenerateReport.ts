"use server";

import {auth} from "@/utils/auth";
import {prisma} from "@/prisma/src";
import {generateAndSaveReportForDraft} from "@/utils/report-generation";
import {revalidatePath} from "next/cache";
import {Prisma} from "@/src/generated/client";
import type {InterviewDraft} from "@/src/generated/client";

function isMissingInterviewDraftTableError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return error.code === "P2021" || error.code === "P2022";
  }

  return error instanceof Error &&
    /InterviewDraft|table.*does not exist|current database/i.test(error.message);
}

/**
 * Regenerates the report for a FAILED (or stuck PROCESSING) draft using the
 * transcript already stored in our DB — no dependency on the backend still
 * remembering the session. Ownership-checked.
 */
export async function regenerateReport(draftId: string) {
  if (!draftId) {
    return {success: false, error: "Draft ID is required"} as const;
  }

  const session = await auth();
  if (!session?.user?.id) {
    return {success: false, error: "Not authenticated"} as const;
  }

  let draft: InterviewDraft | null;
  try {
    draft = await prisma.interviewDraft.findUnique({where: {id: draftId}});
  } catch (error) {
    if (isMissingInterviewDraftTableError(error)) {
      return {
        success: false,
        error: "Draft storage is not available yet. Please try again after the database migration completes.",
      } as const;
    }
    throw error;
  }

  if (!draft || draft.userId !== session.user.id) {
    return {success: false, error: "Draft not found"} as const;
  }

  if (draft.status === "READY" && draft.reportId) {
    return {success: true, reportId: draft.reportId, alreadyDone: true} as const;
  }

  if (draft.error === "no_segments" || !draft.transcript) {
    return {
      success: false,
      error: "This interview wasn't captured, so a report can't be generated.",
    } as const;
  }

  try {
    await prisma.interviewDraft.update({
      where: {id: draftId},
      data: {status: "PROCESSING"},
    });

    const {reportId} = await generateAndSaveReportForDraft(draft);
    revalidatePath("/dashboard");
    return {success: true, reportId} as const;
  } catch (error) {
    if (isMissingInterviewDraftTableError(error)) {
      return {
        success: false,
        error: "Draft storage is not available yet. Please try again after the database migration completes.",
      } as const;
    }

    await prisma.interviewDraft
      .update({
        where: {id: draftId},
        data: {
          status: "FAILED",
          error: error instanceof Error ? error.message : String(error),
          attempts: {increment: 1},
        },
      })
      .catch(() => {});
    return {
      success: false,
      error: "Report generation failed. Please try again.",
    } as const;
  }
}
