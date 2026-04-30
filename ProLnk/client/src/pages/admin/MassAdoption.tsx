import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Shield, TrendingUp, Users, Zap, CheckCircle2, XCircle,
  Star, DollarSign, Clock, Target, AlertTriangle, BarChart3,
  MessageSquare, Gift, ArrowRight, Lightbulb
} from "lucide-react";
import { toast } from "sonner";

const BARRIERS = [
  {
    barrier: "\"I already use ServiceTitan / Jobber -- I don't want another app\"",
    solution: "Zero new workflow. ProLnk connects silently to their existing software. They do nothing different.",
    status: "solved",
    icon: Zap,
  },
  {
    barrier: "\"I don't take photos on the job\"",
    solution: "CompanyCam integration means if they use CompanyCam (150K+ contractors do), photos auto-sync. For others, the ProLnk Mobile App is a 3-tap, 60-second flow.",
    status: "solved",
    icon: Shield,
  },
  {
    barrier: "\"I don't trust that referrals will actually come in\"",
    solution: "30-day ROI guarantee: if a partner doesn't receive at least 3 qualified inbound leads in their first 30 days, they get a full refund. No questions asked.",
    status: "action_needed",
    icon: Star,
  },
  {
    barrier: "\"$99-$299/month is too expensive\"",
    solution: "The calculator shows a single closed job from a referral pays for 6+ months of the subscription. The math is undeniable -- but it needs to be shown, not told.",
    status: "solved",
    icon: DollarSign,
  },
  {
    barrier: "\"What if my competitor joins and gets my leads?\"",
    solution: "Exclusive zip code territories per service category. One HVAC company per zip code. First to join owns that territory.",
    status: "action_needed",
    icon: Target,
  },
  {
    barrier: "\"I'm too busy to set this up\"",
    solution: "5-minute onboarding wizard. If they connect CompanyCam or Jobber, setup is 2 clicks. White-glove onboarding call included for Gold tier.",
    status: "solved",
    icon: Clock,
  },
  {
    barrier: "\"What if the AI sends bad leads?\"",
    solution: "Partners rate every lead (thumbs up/down). After 3 bad leads, the AI retrains on their feedback. Quality improves automatically over time.",
    status: "in_progress",
    icon: BarChart3,
  },
  {
    barrier: "\"I don't want to share my customer photos with a third party\"",
    solution: "Photos are analyzed and immediately discarded. ProLnk stores only the opportunity signal (type, address, confidence score) -- never the photo itself.",
    status: "action_needed",
    icon: Shield,
  },
];

const TRUST_SIGNALS = [
  { label: "Founding Partner Badge", desc: "First 50 partners get a permanent Founding Partner badge and locked-in pricing forever", enabled: true },
  { label: "30-Day ROI Guarantee", desc: "3 qualified leads in 30 days or full refund -- no questions asked", enabled: false },
  { label: "Exclusive Territory Lock", desc: "First partner in a zip code per category owns that territory permanently", enabled: false },
  { label: "White-Glove Onboarding", desc: "1:1 setup call included for all Gold tier partners", enabled: true },
  { label: "Partner Success Manager", desc: "Dedicated contact for the first 90 days to ensure activation", enabled: false },
  { label: "Live Network Stats on Landing Page", desc: "Show real-time partner count, leads generated, and commissions paid to build social proof", enabled: true },
];

const GROWTH_LEVERS = [
  { lever: "Referral Program", desc: "Partners earn $50 credit for every new partner they refer who activates", impact: 92, effort: 20 },
  { lever: "Territory Scarcity Alerts", desc: "\"Only 2 HVAC spots left in your zip code\" -- urgency-driven outreach", impact: 88, effort: 15 },
  { lever: "First Lead Free", desc: "New partners get their first inbound lead free before billing starts", impact: 85, effort: 10 },
  { lever: "Co-marketing with CompanyCam", desc: "ProLnk listed as a recommended integration in CompanyCam's marketplace", impact: 95, effort: 40 },
  { lever: "Jobber App Marketplace", desc: "ProLnk listed in Jobber's app marketplace -- passive inbound from 200K+ Jobber users", impact: 90, effort: 35 },
  { lever: "DFW Trade Association Partnerships", desc: "Sponsor PHCC, ACCA, and NALP chapter meetings -- speak to 50+ contractors at once", impact: 78, effort: 50 },
];

const statusConfig = {
  solved: { label: "Solved", color: "bg-green-100 text-green-700" },
  action_needed: { label: "Action Needed", color: "bg-red-100 text-red-700" },
  in_progress: { label: "In Progress", color: "bg-yellow-100 text-yellow-700" },
};

export default function MassAdoption() {
  const [signals, setSignals] = useState(TRUST_SIGNALS);

  const toggleSignal = (idx: number) => {
    setSignals(prev => prev.map((s, i) => i === idx ? { ...s, enabled: !s.enabled } : s));
    toast.success("Trust signal updated");
  };

  const solved = BARRIERS.filter(b => b.status === "solved").length;
  const total = BARRIERS.length;

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mass Adoption Engine</h1>
              <p className="text-gray-500 text-sm">Eliminate every reason a home service operator would say no to ProLnk</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{solved}/{total}</p>
            <p className="text-xs text-gray-400">Barriers Solved</p>
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">Adoption Barrier Elimination Progress</span>
              <span className="text-gray-500">{Math.round((solved / total) * 100)}%</span>
            </div>
            <Progress value={(solved / total) * 100} className="h-2" />
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-500" />{solved} solved</span>
              <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-yellow-500" />{BARRIERS.filter(b => b.status === "in_progress").length} in progress</span>
              <span className="flex items-center gap-1"><XCircle className="h-3 w-3 text-red-500" />{BARRIERS.filter(b => b.status === "action_needed").length} need action</span>
            </div>
          </CardContent>
        </Card>

        {/* Barriers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              Objection Elimination Map
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {BARRIERS.map((item, idx) => {
              const Icon = item.icon;
              const status = statusConfig[item.status as keyof typeof statusConfig];
              return (
                <div key={idx}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-700 italic">{item.barrier}</p>
                        <Badge className={`text-xs shrink-0 ${status.color}`}>{status.label}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{item.solution}</p>
                    </div>
                  </div>
                  {idx < BARRIERS.length - 1 && <Separator className="mt-4" />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Trust Signals */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-gray-500" />
              Trust Signal Activation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {signals.map((signal, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-2">
                  {signal.enabled
                    ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : <XCircle className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                  }
                  <div>
                    <p className="text-sm font-medium text-gray-800">{signal.label}</p>
                    <p className="text-xs text-gray-500">{signal.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSignal(idx)}
                  className={`w-10 h-5 rounded-full transition-colors shrink-0 ${signal.enabled ? "bg-teal-500" : "bg-gray-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${signal.enabled ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Growth Levers */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-gray-500" />
              Growth Levers -- Ranked by Impact vs. Effort
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {GROWTH_LEVERS.sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort)).map((lever, idx) => (
              <div key={idx}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{lever.lever}</p>
                    <p className="text-xs text-gray-500">{lever.desc}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-xs text-gray-400">Impact: <span className="font-bold text-green-600">{lever.impact}</span></p>
                    <p className="text-xs text-gray-400">Effort: <span className="font-bold text-orange-500">{lever.effort}</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Impact</div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${lever.impact}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Effort</div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-300 rounded-full" style={{ width: `${lever.effort}%` }} />
                    </div>
                  </div>
                </div>
                {idx < GROWTH_LEVERS.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="border-teal-200 bg-teal-50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-4 w-4 text-teal-600" />
              <p className="font-semibold text-teal-800">Immediate Action Items (This Week)</p>
            </div>
            <div className="space-y-2">
              {[
                "Activate the 30-Day ROI Guarantee -- this single trust signal removes the biggest barrier to first-time sign-ups",
                "Add exclusive territory language to the landing page -- \"Only 1 HVAC partner per zip code\" creates urgency",
                "Register ProLnk on CompanyCam Marketplace -- passive inbound from 150K+ contractors",
                "Add a privacy statement to the photo upload flow -- \"Photos analyzed and immediately discarded\"",
              ].map((action, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-teal-700">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-teal-700">{action}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-teal-600 hover:bg-teal-700 gap-2" onClick={() => toast.success("Action plan saved")}>
              <Gift className="h-4 w-4" /> Activate All Trust Signals
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
