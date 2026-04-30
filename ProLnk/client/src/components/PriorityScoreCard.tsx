/**
 * PriorityScoreCard
 * Displays a partner's Partner Priority Score (PPS) with a full signal breakdown.
 * Used on the partner dashboard (own score) and admin dashboard (any partner's score).
 */
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Zap, Camera, Star, Users, Clock, TrendingUp, CheckCircle } from "lucide-react";

interface Signal {
  label: string;
  icon: React.ReactNode;
  earned: number;
  max: number;
  raw: string;
  tip: string;
}

function ScoreGauge({ score }: { score: number }) {
  const pct = Math.min((score / 105) * 100, 100);
  const color =
    score >= 85 ? "text-emerald-400" :
    score >= 65 ? "text-amber-400" :
    score >= 40 ? "text-orange-400" : "text-red-400";
  const label =
    score >= 85 ? "Elite" :
    score >= 65 ? "Strong" :
    score >= 40 ? "Growing" : "New";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-5xl font-black tabular-nums ${color}`}>{score}</div>
      <div className="text-xs text-muted-foreground">/ 105</div>
      <Badge
        variant="outline"
        className={`text-xs font-semibold mt-1 ${
          score >= 85 ? "border-emerald-500 text-emerald-400" :
          score >= 65 ? "border-amber-500 text-amber-400" :
          score >= 40 ? "border-orange-500 text-orange-400" :
          "border-red-500 text-red-400"
        }`}
      >
        {label}
      </Badge>
    </div>
  );
}

function SignalRow({ signal }: { signal: Signal }) {
  const pct = Math.round((signal.earned / signal.max) * 100);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-5 h-5 text-muted-foreground shrink-0">{signal.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-foreground font-medium truncate">{signal.label}</span>
                <span className="text-xs text-muted-foreground ml-2 shrink-0">
                  {signal.earned}/{signal.max} pts
                </span>
              </div>
              <Progress value={pct} className="h-1.5" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs text-xs">
          <p className="font-semibold mb-1">{signal.label}</p>
          <p className="text-muted-foreground">{signal.tip}</p>
          <p className="mt-1 font-medium">Current: {signal.raw}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/** Partner's own score card -- fetches via trpc.partner.getMyPriorityScore */
export function MyPriorityScoreCard() {
  const { data, isLoading } = trpc.partners.getMyPriorityScore.useQuery();

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader><CardTitle className="text-sm">Priority Score</CardTitle></CardHeader>
        <CardContent><div className="h-32 bg-muted rounded" /></CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const signals: Signal[] = [
    {
      label: "Subscription Tier",
      icon: <Zap className="w-4 h-4" />,
      earned: data.tier,
      max: 30,
      raw: data.tierName.charAt(0).toUpperCase() + data.tierName.slice(1),
      tip: "Higher subscription tiers earn more base points. Enterprise=30, Company=24, Crew=18, Pro=12, Scout=6.",
    },
    {
      label: "Lead Close Rate",
      icon: <CheckCircle className="w-4 h-4" />,
      earned: data.closeRate,
      max: 20,
      raw: `${data.closeRateRaw}% close rate`,
      tip: "Percentage of accepted leads you successfully close into paid jobs. Higher close rate = more points.",
    },
    {
      label: "Lead Acceptance Rate",
      icon: <TrendingUp className="w-4 h-4" />,
      earned: data.acceptanceRate,
      max: 15,
      raw: `${data.acceptanceRateRaw}% acceptance rate`,
      tip: "Percentage of leads you accept when they're sent to you. Declining leads reduces your score.",
    },
    {
      label: "Job Photos Uploaded",
      icon: <Camera className="w-4 h-4" />,
      earned: data.photoScore,
      max: 15,
      raw: `${data.photosUploaded} photos (max 50 for full score)`,
      tip: "Upload job completion photos to earn points. Each photo contributes to the AI referral network. Max 50 photos for full 15 points.",
    },
    {
      label: "Customer Reviews",
      icon: <Star className="w-4 h-4" />,
      earned: data.reviewScore,
      max: 10,
      raw: `${data.avgRating.toFixed(1)} avg (${data.reviewCount} reviews)`,
      tip: "Average customer rating weighted by review count. Need 10+ reviews for full weight. Higher rating = more points.",
    },
    {
      label: "Network Referrals",
      icon: <Users className="w-4 h-4" />,
      earned: data.networkReferrals,
      max: 5,
      raw: `${data.partnersReferredCount} partners referred (max 5 for full score)`,
      tip: "Partners you've recruited to the ProLnk network. Each referral earns 1 point, up to 5 points.",
    },
    {
      label: "Response Speed",
      icon: <Clock className="w-4 h-4" />,
      earned: data.responseSpeed,
      max: 5,
      raw: `${data.avgResponseHours.toFixed(1)}h avg response time`,
      tip: "How quickly you accept leads. Under 2h=5pts, under 6h=4pts, under 12h=3pts, under 24h=1pt, 24h+=0pts.",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Priority Score</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs text-xs">
                <p className="font-semibold mb-1">What is Priority Score?</p>
                <p className="text-muted-foreground">
                  Your score (0-105) determines your position in the lead routing queue.
                  Higher score = first look at inbound leads in your service area.
                  Scores are recalculated nightly.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6">
          <ScoreGauge score={Math.round(data.total)} />
          <div className="flex-1 text-xs text-muted-foreground space-y-1">
            <p>Your score determines how early you see new leads in your area.</p>
            {data.foundingBonus > 0 && (
              <p className="text-amber-400 font-medium"> +5 Founding Partner bonus applied</p>
            )}
          </div>
        </div>
        <div className="space-y-3 pt-2 border-t border-border">
          {signals.map(s => <SignalRow key={s.label} signal={s} />)}
        </div>
      </CardContent>
    </Card>
  );
}

/** Admin view -- fetches score for a specific partner by ID */
export function AdminPartnerScoreCard({ partnerId }: { partnerId: number }) {
  const { data, isLoading } = trpc.admin.getPartnerPriorityScore.useQuery({ partnerId });

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader><CardTitle className="text-sm">Priority Score</CardTitle></CardHeader>
        <CardContent><div className="h-32 bg-muted rounded" /></CardContent>
      </Card>
    );
  }

  if (!data) return <Card><CardContent className="pt-6 text-sm text-muted-foreground">No score data yet.</CardContent></Card>;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">
          Priority Score -- {data.tierName.charAt(0).toUpperCase() + data.tierName.slice(1)} Tier
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScoreGauge score={Math.round(data.total)} />
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border">
          <div className="flex justify-between"><span className="text-muted-foreground">Tier</span><span>{data.tier}/30</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Close Rate</span><span>{data.closeRate}/20 ({data.closeRateRaw}%)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Acceptance</span><span>{data.acceptanceRate}/15 ({data.acceptanceRateRaw}%)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Photos</span><span>{data.photoScore}/15 ({data.photosUploaded} photos)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span>{data.reviewScore}/10 ({data.avgRating.toFixed(1)})</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Referrals</span><span>{data.networkReferrals}/5 ({data.partnersReferredCount} partners)</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Speed</span><span>{data.responseSpeed}/5 ({data.avgResponseHours.toFixed(1)}h avg)</span></div>
          {data.foundingBonus > 0 && (
            <div className="flex justify-between col-span-2 text-amber-400"><span>Founding Partner Bonus</span><span>+{data.foundingBonus}</span></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
