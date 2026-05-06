import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import {
  Users, DollarSign, Copy, Share2, TrendingUp, Star,
  Home, ArrowRight, Gift, Zap, ChevronRight, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// ─── Types ───────────────────────────────────────────────────────────────────
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

// ─── How It Works Steps ───────────────────────────────────────────────────────
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

// ─── Milestone Tiers ─────────────────────────────────────────────────────────
const MILESTONES = [
  { count: 5,  label: "5 Homes Originated",    reward: "Scout Badge + $25 bonus" },
  { count: 15, label: "15 Homes Originated",   reward: "Pro Badge + $75 bonus" },
  { count: 30, label: "30 Homes Originated",   reward: "Crew Badge + $150 bonus" },
  { count: 50, label: "50 Homes Originated",   reward: "Elite Badge + $300 bonus" },
  { count: 100,label: "100 Homes Originated",  reward: "Legend Badge + $750 bonus" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReferralHub() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Fetch partner data
  const { data: partner } = trpc.partner.getMyProfile.useQuery(undefined, {
    enabled: !!user,
  });

  const referralCode = partner?.referralCode ?? "PRO-XXXXXX";
  const referralLink = `${window.location.origin}/apply?ref=${referralCode}`;

  const stats: ReferralStats = {
    referralCode,
    partnersReferred: partner?.partnersReferred ?? 0,
    homesOriginated: 0, // will come from homeProfiles query
    overrideCommissionsEarned: 0,
    referralCommissionsEarned: parseFloat(partner?.totalCommissionEarned ?? "0"),
    totalPassiveIncome: parseFloat(partner?.totalCommissionEarned ?? "0"),
    nextMilestone: 5,
    nextMilestoneReward: "Scout Badge + $25 bonus",
  };

  // Determine next milestone
  const nextMilestone = MILESTONES.find(m => m.count > stats.homesOriginated) ?? MILESTONES[MILESTONES.length - 1];
  const prevMilestone = MILESTONES.filter(m => m.count <= stats.homesOriginated).pop();
  const milestoneProgress = prevMilestone
    ? ((stats.homesOriginated - prevMilestone.count) / (nextMilestone.count - prevMilestone.count)) * 100
    : (stats.homesOriginated / nextMilestone.count) * 100;

  function copyLink() {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareLink() {
    if (navigator.share) {
      navigator.share({
        title: "Join ProLnk — Earn Passive Income on Every Job",
        text: "I'm using ProLnk to earn passive income from my job photos. Join with my link:",
        url: referralLink,
      });
    } else {
      copyLink();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Referral Hub</h1>
          <p className="text-gray-500 mt-1">
            Your passive income engine — earn from every job at every home you've ever documented.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Homes Originated", value: stats.homesOriginated, icon: Home, color: "#17C1E8", suffix: "" },
            { label: "Pros Referred", value: stats.partnersReferred, icon: Users, color: "#82D616", suffix: "" },
            { label: "Override Income", value: `$${stats.overrideCommissionsEarned.toFixed(2)}`, icon: DollarSign, color: "#FBB140", suffix: "" },
            { label: "Total Passive", value: `$${stats.totalPassiveIncome.toFixed(2)}`, icon: TrendingUp, color: "#7928CA", suffix: "" },
          ].map(stat => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${stat.color}18` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column: Referral Link + Milestone */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Referral Link Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Gift className="w-4 h-4 text-cyan-500" />
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Your unique code</p>
                <p className="font-mono font-bold text-gray-900 text-lg">{referralCode}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 break-all">
                <p className="text-xs text-gray-400 mb-1">Shareable link</p>
                <p className="text-sm text-gray-700 font-mono">{referralLink}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyLink} variant="outline" className="flex-1 gap-2">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
                <Button onClick={shareLink} className="flex-1 gap-2 bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                When a pro signs up with your link, you earn a network growth bonus on every job they close.
              </p>
            </CardContent>
          </Card>

          {/* Milestone Progress */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Origination Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">
                    {stats.homesOriginated} / {nextMilestone.count} homes
                  </span>
                  <span className="text-amber-600 font-semibold">{nextMilestone.reward}</span>
                </div>
                <Progress value={Math.min(milestoneProgress, 100)} className="h-2" />
                <p className="text-xs text-gray-400 mt-1">
                  {nextMilestone.count - stats.homesOriginated} more homes to unlock next reward
                </p>
              </div>
              <div className="space-y-2">
                {MILESTONES.map(m => {
                  const achieved = stats.homesOriginated >= m.count;
                  return (
                    <div key={m.count}
                      className="flex items-center justify-between py-2 px-3 rounded-lg"
                      style={{ backgroundColor: achieved ? "#F0FDF4" : "#F9FAFB" }}>
                      <div className="flex items-center gap-2">
                        {achieved
                          ? <Check className="w-4 h-4 text-green-500" />
                          : <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                        }
                        <span className={`text-sm font-medium ${achieved ? "text-green-700" : "text-gray-600"}`}>
                          {m.label}
                        </span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${achieved ? "border-green-300 text-green-700" : "text-gray-400"}`}>
                        {m.reward}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">How Passive Income Works</CardTitle>
            <p className="text-sm text-gray-500">Two streams. Zero extra work after the first job.</p>
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
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Step {step.step}</p>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{step.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:flex absolute top-6 -right-2 items-center">
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Commission Breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Commission Breakdown</CardTitle>
            <p className="text-sm text-gray-500">How the money flows on a $5,000 job</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Who</th>
                    <th className="text-left py-2 px-3 text-gray-500 font-medium">Why</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Amount</th>
                    <th className="text-right py-2 px-3 text-gray-500 font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { who: "Receiving Pro", why: "Does the actual job", amount: "$4,400", rate: "88% of job value", color: "#17C1E8" },
                    { who: "Platform Fee", why: "ProLnk takes 12% of job value", amount: "$600", rate: "12%", color: "#7B809A" },
                    { who: "Referring Pro", why: "Whose photos triggered the lead", amount: "$288", rate: "48% of platform fee", color: "#82D616" },
                    { who: "Originating Pro", why: "First to document this address", amount: "$9", rate: "1.5% of platform fee", color: "#FBB140" },
                    { who: "ProLnk Net", why: "Platform keeps the rest", amount: "$303", rate: "~50% of platform fee", color: "#EA0606" },
                  ].map(row => (
                    <tr key={row.who} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 px-3">
                        <span className="font-semibold" style={{ color: row.color }}>{row.who}</span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500">{row.why}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-gray-900">{row.amount}</td>
                      <td className="py-2.5 px-3 text-right text-gray-400 text-xs">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-700">
                <strong>The compounding effect:</strong> If you originate 50 homes and each home averages 3 jobs/year at $3,000 each, your override income alone is{" "}
                <strong>$2,025/year</strong> — completely passive. That number grows every time you do a new job.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-white text-center"
          style={{ background: "linear-gradient(135deg, #17C1E8, #0EA5E9)" }}>
          <h3 className="text-xl font-bold mb-2">Start Originating Homes Today</h3>
          <p className="text-white/80 text-sm mb-4">
            Every job you do is a permanent stake in that address. The sooner you start, the bigger your passive stream grows.
          </p>
          <Button variant="outline" className="bg-white text-cyan-600 hover:bg-white/90 border-0 gap-2"
            onClick={() => window.location.href = "/dashboard/jobs/new"}>
            Log a Job Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </div>
  );
}
