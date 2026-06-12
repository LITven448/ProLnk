import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  Users, DollarSign, Copy, Share2, TrendingUp, Star,
  Home, ArrowRight, Gift, Zap, ChevronRight, Check,
  ChevronDown, ChevronUp, Lightbulb, Network, Mail,
  MessageSquare, Linkedin, Trophy, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

// ─── Network Override Rates ───────────────────────────────────────────────────
const AVG_JOB_VALUE = 800;
const JOBS_PER_MONTH = 8;
const PLATFORM_FEE = 0.12;
const SUB_FEE = 149;

const OVERRIDE_RATES = [
  { level: "L1", jobRate: 0.07, subRate: 0.12 },
  { level: "L2", jobRate: 0.04, subRate: 0.06 },
  { level: "L3", jobRate: 0.02, subRate: 0.03 },
  { level: "L4", jobRate: 0.01, subRate: 0.015 },
];

function calcNetworkIncome(l1: number, l2: number, l3: number, l4: number): number {
  const counts = [l1, l2, l3, l4] as const;
  const feePerJob = AVG_JOB_VALUE * PLATFORM_FEE;
  return Math.round(
    counts.reduce((sum, count, i) => {
      const r = OVERRIDE_RATES[i] ?? OVERRIDE_RATES[0];
      return sum + count * JOBS_PER_MONTH * feePerJob * r.jobRate + count * SUB_FEE * r.subRate;
    }, 0)
  );
}

function calcOverrideBreakdown(prosCount: number, prosEarnings: number) {
  const feeBase = prosEarnings * PLATFORM_FEE;
  return [
    { level: "Level 1 (7%)", rate: 0.07, monthly: Math.round(prosCount * feeBase * JOBS_PER_MONTH * 0.07 / 12) },
    { level: "Level 2 (4%)", rate: 0.04, monthly: Math.round(prosCount * 2 * feeBase * JOBS_PER_MONTH * 0.04 / 12) },
    { level: "Level 3 (2%)", rate: 0.02, monthly: Math.round(prosCount * 4 * feeBase * JOBS_PER_MONTH * 0.02 / 12) },
    { level: "Level 4 (1%)", rate: 0.01, monthly: Math.round(prosCount * 8 * feeBase * JOBS_PER_MONTH * 0.01 / 12) },
  ];
}

const TIER_THRESHOLDS = [
  { label: "Charter", total: 25, color: "#F5E642" },
  { label: "Founding", total: 100, color: "#3b82f6" },
  { label: "Level 3", total: 400, color: "#22c55e" },
  { label: "Level 4", total: 1600, color: "#8b5cf6" },
];

const RECRUITING_TIPS = [
  "After every job, ask: 'Do you know any other contractors who'd benefit from ProLnk?'",
  "Target property managers, real estate agents, and insurance agents — they become L1 referrers who then recruit their own network.",
  "Share your referral link in DFW contractor Facebook groups for fast reach.",
];

const REFERRAL_PIPELINE = [
  {
    label: "Invited",
    count: 8,
    color: "border-slate-600 bg-slate-800",
    badgeColor: "text-slate-400",
    people: ["JM", "SR", "KL", "BW", "TD", "MP", "RA", "CG"],
  },
  {
    label: "Signed Up",
    count: 5,
    color: "border-teal-600/40 bg-teal-900/20",
    badgeColor: "text-teal-400",
    people: ["DH", "NF", "PC", "YL", "WB"],
  },
  {
    label: "Active",
    count: 2,
    color: "border-green-600/40 bg-green-900/20",
    badgeColor: "text-green-400",
    people: ["AM", "RK"],
  },
];

const VIRAL_POSTS = [
  {
    platform: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-400",
    text: "I've been using ProLnk for a few months and the passive income model is genuinely different. Every job I complete builds a permanent revenue stream — even after I move on. If you're a licensed contractor looking for smarter income, check it out. Limited founding partner spots left. prolnk.io/join?ref=partner123",
  },
  {
    platform: "Facebook",
    icon: Share2,
    color: "text-blue-500",
    text: "Hey [Trade] friends! Found a platform that actually pays you passive income from your photos. Called ProLnk — when you document a home, you're the originating pro FOREVER. Any future job at that address earns you a cut. Founding spots are almost gone. Use my link: prolnk.io/join?ref=partner123",
  },
  {
    platform: "SMS",
    icon: MessageSquare,
    color: "text-green-400",
    text: "Hey, thought of you — there's a new platform for contractors called ProLnk that pays passive income on every home you document. Founding partner rate is locked at $149/mo. Only a few spots left. Join with my link: prolnk.io/join?ref=partner123",
  },
];

interface ReferralStats {
  referralCode: string;
  partnersReferred: number;
  homesOriginated: number;
  overrideCommissionsEarned: number;
  referralCommissionsEarned: number;
  totalPassiveIncome: number;
  nextMilestone: number;
  nextMilestoneReward: string;
}

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: Home,
    color: "#17C1E8",
    title: "You Do the Job",
    desc: "Complete any job at a home address. Upload your photos through the ProLnk app or your FSM software.",
  },
  {
    step: 2,
    icon: Zap,
    color: "#82D616",
    title: "AI Builds the Profile",
    desc: "Our AI analyzes your photos and creates a home profile. You become the Originating Pro for that address — permanently.",
  },
  {
    step: 3,
    icon: DollarSign,
    color: "#FBB140",
    title: "Every Future Job Pays You",
    desc: "Any time another pro does a job at that address through TrustyPro, you earn a 1.5% override on the platform fee. Forever. No extra work.",
  },
  {
    step: 4,
    icon: Users,
    color: "#7928CA",
    title: "Refer Other Pros",
    desc: "When a pro you referred closes a job, you earn a network growth bonus on top of your origination override.",
  },
];

const MILESTONES = [
  { count: 5,  label: "5 Homes Originated",    reward: "Scout Badge + $25 bonus" },
  { count: 15, label: "15 Homes Originated",   reward: "Pro Badge + $75 bonus" },
  { count: 30, label: "30 Homes Originated",   reward: "Crew Badge + $150 bonus" },
  { count: 50, label: "50 Homes Originated",   reward: "Elite Badge + $300 bonus" },
  { count: 100,label: "100 Homes Originated",  reward: "Legend Badge + $750 bonus" },
];

export default function ReferralHub() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [copiedPost, setCopiedPost] = useState<string | null>(null);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [calcPros, setCalcPros] = useState("5");
  const [calcEarnings, setCalcEarnings] = useState("5000");

  const { data: partner } = trpc.partners.getMyProfile.useQuery(undefined, {
    enabled: !!user,
  });

  const email = user?.email ?? "";
  const { data: waitlist } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: !!email }
  );

  const referralCode = partner?.stats?.referralCode ?? waitlist?.referralCode ?? "";
  const referralLink = referralCode ? `prolnk.xyz/join/${referralCode}` : "prolnk.xyz/join";
  const fullReferralLink = referralCode
    ? `https://prolnk.xyz/join/${referralCode}`
    : "https://prolnk.xyz/join";
  const homeownerReferralLink = referralCode
    ? `https://trustypro.io/join/${referralCode}`
    : "https://trustypro.io/join";

  const personalize = (t: string) => t.replace(/prolnk\.io\/join\?ref=partner123/g, referralLink);

  const partnersReferred = partner?.stats?.partnersReferred ?? waitlist?.referralCount ?? 0;
  const homeownersReferred = waitlist?.homeownerReferralCount ?? 0;

  const stats: ReferralStats = {
    referralCode,
    partnersReferred,
    homesOriginated: homeownersReferred,
    overrideCommissionsEarned: 0,
    referralCommissionsEarned: parseFloat(partner?.stats?.totalCommissionEarned ?? "0"),
    totalPassiveIncome: parseFloat(partner?.stats?.totalCommissionEarned ?? "0"),
    nextMilestone: 5,
    nextMilestoneReward: "Scout Badge + $25 bonus",
  };

  const l1Count = stats.partnersReferred;
  const l2Count = 0;
  const l3Count = 0;
  const l4Count = 0;
  const totalNetworkSize = l1Count + l2Count + l3Count + l4Count;
  const monthlyNetworkIncome = calcNetworkIncome(l1Count, l2Count, l3Count, l4Count);

  const currentTotal = totalNetworkSize;
  const nextTier = TIER_THRESHOLDS.find(t => t.total > currentTotal) ?? TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  const prevTier = TIER_THRESHOLDS.filter(t => t.total <= currentTotal).pop();
  const tierProgress = prevTier
    ? ((currentTotal - prevTier.total) / (nextTier.total - prevTier.total)) * 100
    : (currentTotal / nextTier.total) * 100;
  const toNextTier = Math.max(0, nextTier.total - currentTotal);

  const nextMilestone = MILESTONES.find(m => m.count > stats.homesOriginated) ?? MILESTONES[MILESTONES.length - 1];
  const prevMilestone = MILESTONES.filter(m => m.count <= stats.homesOriginated).pop();
  const milestoneProgress = prevMilestone
    ? ((stats.homesOriginated - prevMilestone.count) / (nextMilestone.count - prevMilestone.count)) * 100
    : (stats.homesOriginated / nextMilestone.count) * 100;

  const prosNum = parseInt(calcPros) || 5;
  const earningsNum = parseInt(calcEarnings) || 5000;
  const overrideBreakdown = calcOverrideBreakdown(prosNum, earningsNum);
  const totalOverride = overrideBreakdown.reduce((s, r) => s + r.monthly, 0);

  function copyLink() {
    navigator.clipboard.writeText(fullReferralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function copyPost(platform: string, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedPost(platform);
      toast.success(`${platform} post copied!`);
      setTimeout(() => setCopiedPost(null), 2000);
    });
  }

  function shareLink() {
    if (navigator.share) {
      navigator.share({
        title: "Join ProLnk — Earn Passive Income on Every Job",
        text: "I'm using ProLnk to earn passive income from my job photos. Join with my link:",
        url: fullReferralLink,
      });
    } else {
      copyLink();
    }
  }

  function shareEmail() {
    const subject = encodeURIComponent("I found a passive income stream for contractors — ProLnk");
    const body = encodeURIComponent(`Hey,\n\nI've been using ProLnk to earn passive income from my contracting work — every home I document gives me a permanent revenue stake. Founding partner spots are almost gone.\n\nJoin with my link: ${fullReferralLink}\n\nLet me know if you have questions!`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  function shareSms() {
    const text = encodeURIComponent(`Hey! Check out ProLnk — pays contractors passive income on every home they document. Use my link: ${fullReferralLink}`);
    window.open(`sms:?body=${text}`);
  }

  function shareLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullReferralLink)}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-[#0A1628] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Referral Hub</h1>
          <p className="text-slate-400 mt-1">
            Your passive income engine — earn from every job at every home you've ever documented.
          </p>
        </div>

        {/* Network Worth Header Card */}
        <Card className="bg-slate-800 border-teal-500/30 shadow-lg shadow-teal-500/10">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-teal-400" />
                  <span className="text-slate-400 text-sm font-medium uppercase tracking-wide">Network Value</span>
                </div>
                <p className="text-3xl font-bold text-white">
                  You've referred{" "}
                  <span className="text-teal-400">{partnersReferred} {partnersReferred === 1 ? "pro" : "pros"}</span>
                  {homeownersReferred > 0 && (
                    <> &amp; <span style={{ color: "#C89B5A" }}>{homeownersReferred} {homeownersReferred === 1 ? "homeowner" : "homeowners"}</span></>
                  )}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  {partnersReferred + homeownersReferred > 0
                    ? "Every referral builds permanent network income."
                    : "Share your links below to start building your network."}
                </p>
              </div>
              {waitlist?.position ? (
                <div className="text-right shrink-0">
                  <p className="text-slate-500 text-xs mb-1">Waitlist position</p>
                  <p className="text-2xl font-bold text-teal-400">#{waitlist.position}</p>
                  <p className="text-slate-400 text-xs">{waitlist.tierLabel ?? waitlist.tier}</p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* ── Your Referral Impact ── */}
        <Card className="bg-slate-800 border-slate-700 overflow-hidden">
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#14b8a6,#7928CA)" }} />
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
              <Network className="w-4 h-4 text-teal-400" />
              Your Referral Impact
            </CardTitle>
            <p className="text-xs text-slate-400">
              Live network counts. L2–L4 populate as the pros you recruit start recruiting their own.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "L1 Direct", count: l1Count, color: "#14b8a6", rate: "7% job / 12% sub" },
                { label: "L2 Network", count: l2Count, color: "#22c55e", rate: "4% job / 6% sub" },
                { label: "L3 Network", count: l3Count, color: "#f59e0b", rate: "2% job / 3% sub" },
                { label: "L4 Network", count: l4Count, color: "#8b5cf6", rate: "1% job / 1.5% sub" },
              ].map(({ label, count, color, rate }) => (
                <div key={label} className="rounded-xl p-3 bg-slate-900 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">{label}</p>
                  <p className="text-2xl font-bold" style={{ color }}>{count}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{rate}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 rounded-xl p-4 border border-teal-500/30 bg-teal-500/10">
                <p className="text-xs text-teal-400 font-semibold uppercase tracking-wide mb-1">Total Network Size</p>
                <p className="text-3xl font-bold text-teal-300">{totalNetworkSize}</p>
                <p className="text-xs text-teal-500 mt-0.5">partners across all 4 levels</p>
              </div>
              <div className="flex-1 rounded-xl p-4 border border-purple-500/30 bg-purple-500/10">
                <p className="text-xs text-purple-400 font-semibold uppercase tracking-wide mb-1">Monthly Passive Income</p>
                <p className="text-3xl font-bold text-purple-300">
                  {totalNetworkSize > 0 ? `$${monthlyNetworkIncome.toLocaleString()}` : "—"}
                </p>
                <p className="text-xs text-purple-500 mt-0.5">estimated at avg 8 jobs/mo per pro</p>
              </div>
              <div className="flex-1 rounded-xl p-4 border border-amber-500/30 bg-amber-500/10">
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wide mb-1">Next Tier: {nextTier.label}</p>
                <p className="text-3xl font-bold text-amber-300">{toNextTier}</p>
                <p className="text-xs text-amber-500 mt-0.5">more partners to unlock</p>
                <Progress value={Math.min(tierProgress, 100)} className="h-1.5 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Homes Originated", value: stats.homesOriginated, icon: Home, color: "#14b8a6" },
            { label: "Pros Referred", value: stats.partnersReferred, icon: Users, color: "#82D616" },
            { label: "Override Income", value: `$${stats.overrideCommissionsEarned.toFixed(2)}`, icon: DollarSign, color: "#FBB140" },
            { label: "Total Passive", value: `$${stats.totalPassiveIncome.toFixed(2)}`, icon: TrendingUp, color: "#7928CA" },
          ].map(stat => (
            <Card key={stat.label} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${stat.color}18` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Shareable Link Card */}
        <Card className="bg-slate-800 border-teal-500/40 shadow-lg shadow-teal-500/10">
          <div className="h-1 w-full rounded-t-md" style={{ background: "linear-gradient(90deg,#14b8a6,#0EA5E9)" }} />
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
              <Gift className="w-4 h-4 text-teal-400" />
              Your Referral Link
            </CardTitle>
            <p className="text-xs text-slate-400">Share this link to grow your network and earn passive overrides.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-teal-400 font-semibold mb-1.5">Recruit pros · ProLnk</p>
              <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-4 py-3 border border-slate-700">
                <span className="font-mono text-teal-300 text-sm flex-1 truncate">{referralLink}</span>
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-xs shrink-0">
                  {partnersReferred} referred
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide font-semibold mb-1.5" style={{ color: "#C89B5A" }}>Recruit homeowners · TrustyPro</p>
              <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-4 py-3 border border-slate-700">
                <span className="font-mono text-sm flex-1 truncate" style={{ color: "#C89B5A" }}>{homeownerReferralLink.replace("https://", "")}</span>
                <Badge className="text-xs shrink-0" style={{ background: "rgba(200,155,90,0.18)", color: "#C89B5A", border: "1px solid rgba(200,155,90,0.4)" }}>
                  {homeownersReferred} referred
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={copyLink}
                variant="outline"
                className="flex-1 gap-2 h-10 text-sm border-slate-600 text-slate-200 hover:bg-slate-700">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Button onClick={shareEmail} variant="outline"
                className="flex-1 gap-2 h-10 text-sm border-slate-600 text-slate-200 hover:bg-slate-700">
                <Mail className="w-4 h-4 text-blue-400" />
                Email
              </Button>
              <Button onClick={shareSms} variant="outline"
                className="flex-1 gap-2 h-10 text-sm border-slate-600 text-slate-200 hover:bg-slate-700">
                <MessageSquare className="w-4 h-4 text-green-400" />
                SMS
              </Button>
              <Button onClick={shareLinkedIn}
                className="flex-1 gap-2 h-10 text-sm bg-blue-600 hover:bg-blue-700 text-white">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </div>
            <p className="text-xs text-slate-400 text-center">
              Every pro you recruit earns you 7% of their job overrides + 12% of their $149/mo subscription.
            </p>
          </CardContent>
        </Card>

        {/* Your Direct Referrals (real data) */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
              <Users className="w-4 h-4 text-teal-400" />
              Your Direct Referrals
              {(waitlist?.referrals?.length ?? 0) > 0 && (
                <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/40 text-xs ml-1">
                  {waitlist?.referrals?.length}
                </Badge>
              )}
            </CardTitle>
            <p className="text-xs text-slate-400">Pros who joined ProLnk through your link.</p>
          </CardHeader>
          <CardContent>
            {(waitlist?.referrals?.length ?? 0) === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm mb-1">No referrals yet</p>
                <p className="text-xs text-slate-500">Share your link above — each pro who joins shows up here.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {waitlist?.referrals?.map((r: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-slate-900 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-sm font-bold text-teal-300">
                      {r.firstName?.[0] ?? "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-white truncate">{r.firstName}</p>
                      <p className="text-xs text-slate-500 truncate">{r.trade}</p>
                    </div>
                    <Check className="w-4 h-4 text-teal-400 ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Commission Calculator */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
              <DollarSign className="w-4 h-4 text-green-400" />
              Commission Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Number of referrals earning</label>
                <Input
                  type="number"
                  value={calcPros}
                  onChange={(e) => setCalcPros(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white"
                  min={1}
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">Each earns per month ($)</label>
                <Input
                  type="number"
                  value={calcEarnings}
                  onChange={(e) => setCalcEarnings(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-white"
                  min={0}
                />
              </div>
            </div>
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 space-y-3">
              <p className="text-slate-400 text-sm">
                If {calcPros} of your referrals each earn ${parseInt(calcEarnings).toLocaleString()}/month, you earn:
              </p>
              {overrideBreakdown.map((row) => (
                <div key={row.level} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{row.level} override</span>
                  <span className="text-white font-semibold">${row.monthly.toLocaleString()}/mo</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                <span className="text-white font-bold">Total monthly passive</span>
                <span className="text-teal-400 font-bold text-xl">${totalOverride.toLocaleString()}/mo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Viral Content Kit */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Viral Content Kit
            </CardTitle>
            <p className="text-xs text-slate-400">Pre-written posts ready to share. Edit to add your personal touch.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {VIRAL_POSTS.map((post) => (
              <div key={post.platform} className="bg-slate-900 rounded-xl p-4 border border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <post.icon className={`w-4 h-4 ${post.color}`} />
                    <span className="text-white font-semibold text-sm">{post.platform}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyPost(post.platform, personalize(post.text))}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-7 gap-1"
                  >
                    {copiedPost === post.platform ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copiedPost === post.platform ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{personalize(post.text)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Two Column: Referral Link (legacy) + Milestone */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Milestone Progress */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                <Star className="w-4 h-4 text-amber-400" />
                Origination Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-medium">
                    {stats.homesOriginated} / {nextMilestone.count} homes
                  </span>
                  <span className="text-amber-400 font-semibold">{nextMilestone.reward}</span>
                </div>
                <Progress value={Math.min(milestoneProgress, 100)} className="h-2" />
                <p className="text-xs text-slate-500 mt-1">
                  {nextMilestone.count - stats.homesOriginated} more homes to unlock next reward
                </p>
              </div>
              <div className="space-y-2">
                {MILESTONES.map(m => {
                  const achieved = stats.homesOriginated >= m.count;
                  return (
                    <div key={m.count}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg ${achieved ? "bg-green-500/10 border border-green-500/20" : "bg-slate-900 border border-slate-700"}`}>
                      <div className="flex items-center gap-2">
                        {achieved
                          ? <Check className="w-4 h-4 text-green-400" />
                          : <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
                        }
                        <span className={`text-sm font-medium ${achieved ? "text-green-300" : "text-slate-400"}`}>
                          {m.label}
                        </span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${achieved ? "border-green-500/40 text-green-400" : "border-slate-600 text-slate-500"}`}>
                        {m.reward}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Share Script */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                <Gift className="w-4 h-4 text-teal-400" />
                Share Script
              </CardTitle>
              <p className="text-xs text-slate-400">Drop this into a text or DM — personalize as needed.</p>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "Hey! I'm building passive income through ProLnk — it pays me on every job at every home I've documented.
                  There are only {toNextTier > 0 ? toNextTier : "a few"} spots left at the {nextTier.label} level.
                  Sign up with my link: {referralLink}"
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyLink}
                  className="mt-3 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  Copy Script
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Every pro you recruit earns you 7% of their job overrides + 12% of their $149/mo subscription.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-white">How Passive Income Works</CardTitle>
            <p className="text-sm text-slate-400">Two streams. Zero extra work after the first job.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="relative">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}18` }}>
                      <step.icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Step {step.step}</p>
                      <p className="font-semibold text-white text-sm mb-1">{step.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:flex absolute top-6 -right-2 items-center">
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Recruiting Tips */}
        <Card className="bg-slate-800 border-slate-700">
          <button
            className="w-full text-left"
            onClick={() => setTipsOpen(prev => !prev)}
            type="button"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center justify-between gap-2 text-white">
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Quick Recruiting Tips
                </span>
                {tipsOpen
                  ? <ChevronUp className="w-4 h-4 text-slate-400" />
                  : <ChevronDown className="w-4 h-4 text-slate-400" />
                }
              </CardTitle>
              {!tipsOpen && (
                <p className="text-xs text-slate-400">Proven scripts and tactics to grow your L1 downline fast.</p>
              )}
            </CardHeader>
          </button>
          {tipsOpen && (
            <CardContent className="pt-0 space-y-3">
              {RECRUITING_TIPS.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-amber-300 leading-relaxed">{tip}</p>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Commission Breakdown Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-white">Commission Breakdown</CardTitle>
            <p className="text-sm text-slate-400">How the money flows on a $5,000 job</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Who</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Why</th>
                    <th className="text-right py-2 px-3 text-slate-400 font-medium">Amount</th>
                    <th className="text-right py-2 px-3 text-slate-400 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { who: "Receiving Pro", why: "Does the actual job", amount: "$4,400", rate: "88% of job value", color: "#14b8a6" },
                    { who: "Platform Fee", why: "ProLnk takes 12% of job value", amount: "$600", rate: "12%", color: "#7B809A" },
                    { who: "Referring Pro", why: "Whose photos triggered the lead", amount: "$288", rate: "48% of platform fee", color: "#82D616" },
                    { who: "Originating Pro", why: "First to document this address", amount: "$9", rate: "1.5% of platform fee", color: "#FBB140" },
                    { who: "ProLnk Net", why: "Platform keeps the rest", amount: "$303", rate: "~50% of platform fee", color: "#EA0606" },
                  ].map(row => (
                    <tr key={row.who} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="font-semibold" style={{ color: row.color }}>{row.who}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{row.why}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-white">{row.amount}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 text-xs">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <p className="text-xs text-amber-300">
                <strong>The compounding effect:</strong> If you originate 50 homes and each home averages 3 jobs/year at $3,000 each, your override income alone is{" "}
                <strong>$2,025/year</strong> — completely passive.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-white text-center"
          style={{ background: "linear-gradient(135deg, #14b8a6, #0EA5E9)" }}>
          <h3 className="text-xl font-bold mb-2">Start Originating Homes Today</h3>
          <p className="text-white/80 text-sm mb-4">
            Every job you do is a permanent stake in that address. The sooner you start, the bigger your passive stream grows.
          </p>
          <Button variant="outline" className="bg-white text-teal-600 hover:bg-white/90 border-0 gap-2"
            onClick={() => window.location.href = "/dashboard/jobs/new"}>
            Log a Job Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </div>
  );
}
