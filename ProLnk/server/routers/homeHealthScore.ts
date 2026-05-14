import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";

const IssueSchema = z.object({
  name: z.string(),
  severity: z.enum(["urgent", "moderate", "low"]),
  description: z.string(),
  tradeType: z.string(),
  estimatedCost: z.string(),
  confidence: z.number().optional(),
  offerTrack: z.enum(["repair", "transformation"]).optional(),
  transformationPrompt: z.string().optional(),
  transformationImageUrl: z.string().optional(),
  isInsuranceClaim: z.boolean().optional(),
});

function calculateHealthScore(issues: { severity: "urgent" | "moderate" | "low" }[]): number {
  if (issues.length === 0) return 95;
  const urgentPenalty = issues.filter(i => i.severity === "urgent").length * 20;
  const moderatePenalty = issues.filter(i => i.severity === "moderate").length * 10;
  const lowPenalty = issues.filter(i => i.severity === "low").length * 3;
  return Math.max(0, 100 - urgentPenalty - moderatePenalty - lowPenalty);
}

function scoreLabel(score: number): "Excellent" | "Good" | "Fair" | "Needs Attention" {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Attention";
}

export const homeHealthScoreRouter = router({
  calculate: publicProcedure
    .input(z.object({ issues: z.array(IssueSchema) }))
    .mutation(({ input }) => {
      const score = calculateHealthScore(input.issues);
      return {
        score,
        label: scoreLabel(score),
        urgentCount: input.issues.filter(i => i.severity === "urgent").length,
        moderateCount: input.issues.filter(i => i.severity === "moderate").length,
        lowCount: input.issues.filter(i => i.severity === "low").length,
      };
    }),
});
