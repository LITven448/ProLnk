import { useState } from "react";
import { trpc } from "@/lib/trpc";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, MessageSquare, ChevronRight, Star, Copy, CheckCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

const PLAYBOOKS = [
  {
    id: 1,
    trigger: "While on a roofing job",
    upsell: "Gutter Cleaning",
    avgUpsell: "$180",
    script: "Hey {name}, while I'm up here I noticed your gutters are packed with debris — that's actually what causes most of the water damage I see on roofs. I can clean them out today for $180. Takes about 45 minutes and saves you a much bigger headache down the road. Want me to add it?",
    successRate: "62%",
    category: "Roofing",
    difficulty: "Easy",
    tip: "Show them a photo of the full gutters from the roof. Visual proof closes this every time.",
  },
  {
    id: 2,
    trigger: "While on an HVAC tune-up",
    upsell: "Air Quality Test + UV Light",
    avgUpsell: "$340",
    script: "Mr./Ms. {name}, your system is running well but I noticed your air quality could be improved — especially important if anyone in the house has allergies or asthma. I can do a quick air quality test and install a UV light sanitizer for $340. It kills bacteria and mold in the ductwork. Want to see the numbers?",
    successRate: "41%",
    category: "HVAC",
    difficulty: "Medium",
    tip: "Ask about pets or allergies first. If they say yes, your close rate doubles.",
  },
  {
    id: 3,
    trigger: "Finishing any exterior job",
    upsell: "Exterior Caulking & Weatherstripping",
    avgUpsell: "$220",
    script: "Before I pack up — I noticed a few spots around your windows and doors where the caulking is cracked. That's where most of your heating and cooling escapes. I can seal everything up today for $220. Most homeowners save $30-50/month on their energy bill. Want me to take care of it?",
    successRate: "55%",
    category: "Exterior",
    difficulty: "Easy",
    tip: "Point to a specific crack or gap while you say this. Specificity builds credibility.",
  },
  {
    id: 4,
    trigger: "On any job at a home 10+ years old",
    upsell: "Full Home Maintenance Assessment",
    avgUpsell: "$150",
    script: "Hey {name}, since your home is [age] years old, a lot of systems are approaching the end of their typical lifespan. I offer a full home assessment — I walk through everything, give you a written report, and prioritize what needs attention now vs. later. It's $150 and most homeowners say it's the best money they spend. Want to schedule it before I leave?",
    successRate: "38%",
    category: "General",
    difficulty: "Medium",
    tip: "This works best when you can reference something you already noticed — 'I saw your water heater is from 2008...'",
  },
  {
    id: 5,
    trigger: "After completing a job with a 5-star rating",
    upsell: "Annual Maintenance Plan",
    avgUpsell: "$599/yr",
    script: "I'm really glad you're happy with the work! A lot of my customers sign up for my annual maintenance plan — it's $599/year and covers two seasonal visits, priority scheduling, and a 10% discount on any additional work. Given how well we work together, it might be a good fit. Want me to send you the details?",
    successRate: "29%",
    category: "Retention",
    difficulty: "Hard",
    tip: "Only pitch this after a 5-star experience. Timing is everything — ask right after they express satisfaction.",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

const CATEGORY_COLORS: Record<string, string> = {
  Roofing: "bg-blue-100 text-blue-700",
  HVAC: "bg-indigo-100 text-indigo-700",
  Exterior: "bg-amber-100 text-amber-700",
  General: "bg-slate-100 text-slate-600",
  Retention: "bg-violet-100 text-violet-700",
};

export default function UpsellPlaybook() {
  const [copied, setCopied] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(1);
  const { data: liveTips } = trpc.partnerTools.content.list.useQuery({ contentType: "playbook_tip" });

  const copyScript = (id: number, script: string) => {
    navigator.clipboard.writeText(script);
    setCopied(id);
    toast.success("Script copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  const totalAvgUpsell = PLAYBOOKS.reduce((sum, p) => {
    const val = parseFloat(p.avgUpsell.replace(/[$,/yr]/g, ""));
    return sum + val;
  }, 0);

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Upsell Playbook</h1>
          <p className="text-slate-500 mt-1">Word-for-word scripts to earn more on every job — no pressure selling</p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5 mb-6 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{PLAYBOOKS.length}</div>
              <div className="text-green-200 text-xs">Playbooks</div>
            </div>
            <div>
              <div className="text-2xl font-bold">47%</div>
              <div className="text-green-200 text-xs">Avg Close Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">+$280</div>
              <div className="text-green-200 text-xs">Avg Upsell/Job</div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-500/40 text-center text-green-100 text-sm">
            Partners who use these scripts earn <strong>40% more per job</strong> than those who don't
          </div>
        </div>

        {/* Live tips from admin */}
        {liveTips && liveTips.length > 0 && (
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-1"><Lightbulb className="w-4 h-4 text-amber-500" /> New Tips from ProLnk HQ</h2>
            <div className="space-y-2">
              {liveTips.map(tip => (
                <div key={tip.id} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-900">{tip.title}</p>
                  {tip.body && <p className="text-xs text-amber-700 mt-1">{tip.body}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Playbook Cards */}
        <div className="space-y-3">
          {PLAYBOOKS.map(p => (
            <Card key={p.id} className={`transition-all ${expanded === p.id ? "border-indigo-200" : ""}`}>
              <CardContent className="pt-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge className={`text-xs ${CATEGORY_COLORS[p.category]}`}>{p.category}</Badge>
                      <Badge className={`text-xs ${DIFFICULTY_COLORS[p.difficulty]}`}>{p.difficulty}</Badge>
                      <Badge className="text-xs bg-green-100 text-green-700">{p.successRate} close rate</Badge>
                    </div>
                    <div className="font-semibold text-slate-900">{p.trigger}</div>
                    <div className="text-sm text-green-600 font-medium mt-0.5">→ Upsell: {p.upsell} ({p.avgUpsell})</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expanded === p.id ? "rotate-90" : ""}`} />
                </div>

                {expanded === p.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    {/* Script */}
                    <div>
                      <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> Word-for-Word Script
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-700 italic leading-relaxed border">
                        "{p.script}"
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 text-xs"
                        onClick={() => copyScript(p.id, p.script)}
                      >
                        {copied === p.id ? <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> : <Copy className="w-3 h-3 mr-1" />}
                        {copied === p.id ? "Copied!" : "Copy Script"}
                      </Button>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <div className="text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" /> Pro Tip
                      </div>
                      <div className="text-xs text-amber-700">{p.tip}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
