import { z } from "zod";

export const InterviewReportSchema = z.object({
  technicalKnowledge: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  problemSolving: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  communication: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  confidence: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  depthOfUnderstanding: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  behavioralImpression: z.object({
    score: z.number().min(0).max(10),
    analysis: z.string(),
  }),
  strengths: z.array(z.string()).length(3),
  improvementAreas: z.array(z.string()).length(3),
  overallScore: z.number().min(0).max(10),
  finalSummary: z.string(),
});