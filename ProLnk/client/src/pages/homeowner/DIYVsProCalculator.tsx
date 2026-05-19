import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Hammer, Zap, Droplets, Wind, Shield, Leaf, Home, PenTool,
  Clock, DollarSign, AlertTriangle, CheckCircle, ChevronRight,
  Wrench, Star, Info
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectKey = "painting" | "drywall" | "flooring" | "plumbing" | "electrical" | "hvac" | "roofing" | "landscaping";

interface ProjectData {
  label: string;
  icon: React.ElementType;
  diy: {
    time: string;
    materialCost: string;
    skillLevel: "Beginner" | "Intermediate" | "Advanced";
    skillColor: string;
    riskLevel: "Low" | "Medium" | "High";
    riskColor: string;
    toolRental: string | null;
    mistakes: string[];
  };
  pro: {
    cost: string;
    timeToComplete: string;
    warranty: string;
  };
  recommendation: "diy" | "pro";
  recommendationText: string;
  requiresLicense: boolean;
  licenseNote?: string;
}

const PROJECTS: Record<ProjectKey, ProjectData> = {
  painting: {
    label: "Painting",
    icon: PenTool,
    diy: {
      time: "8–16 hours",
      materialCost: "$200–400",
      skillLevel: "Beginner",
      skillColor: "bg-emerald-500/20 text-emerald-400",
      riskLevel: "Low",
      riskColor: "text-emerald-400",
      toolRental: null,
      mistakes: ["Skipping primer on new drywall", "Using cheap rollers that leave texture", "Not taping edges properly"],
    },
    pro: { cost: "$800–1,400", timeToComplete: "1–2 days", warranty: "1-year labor warranty" },
    recommendation: "diy",
    recommendationText: "DIY-friendly — one of the easiest home projects with big visual impact.",
    requiresLicense: false,
  },
  drywall: {
    label: "Drywall",
    icon: Home,
    diy: {
      time: "6–12 hours",
      materialCost: "$150–300",
      skillLevel: "Intermediate",
      skillColor: "bg-yellow-500/20 text-yellow-400",
      riskLevel: "Medium",
      riskColor: "text-yellow-400",
      toolRental: "Drywall lift — $45/day at Home Depot",
      mistakes: ["Seams not offset between rows", "Overdriving screws and tearing paper", "Insufficient mud layers — rushing sanding"],
    },
    pro: { cost: "$600–1,200", timeToComplete: "1–2 days", warranty: "1-year labor warranty" },
    recommendation: "diy",
    recommendationText: "DIY-friendly if you have patience — mudding and sanding take practice.",
    requiresLicense: false,
  },
  flooring: {
    label: "Flooring",
    icon: Home,
    diy: {
      time: "10–20 hours",
      materialCost: "$300–800",
      skillLevel: "Intermediate",
      skillColor: "bg-yellow-500/20 text-yellow-400",
      riskLevel: "Low",
      riskColor: "text-emerald-400",
      toolRental: "Floor nailer — $55/day at Home Depot",
      mistakes: ["Not acclimating hardwood before install", "Skipping underlayment", "Misaligned starter row causing crooked layout"],
    },
    pro: { cost: "$1,200–3,000", timeToComplete: "1–3 days", warranty: "2-year labor warranty" },
    recommendation: "diy",
    recommendationText: "DIY-friendly for LVP and laminate — hardwood is harder but doable.",
    requiresLicense: false,
  },
  plumbing: {
    label: "Plumbing",
    icon: Droplets,
    diy: {
      time: "2–8 hours",
      materialCost: "$50–300",
      skillLevel: "Advanced",
      skillColor: "bg-red-500/20 text-red-400",
      riskLevel: "High",
      riskColor: "text-red-400",
      toolRental: null,
      mistakes: ["Cross-threading pipe fittings causing leaks", "Not shutting off water properly", "Incorrect pipe sizing for water pressure"],
    },
    pro: { cost: "$300–1,500", timeToComplete: "2–8 hours", warranty: "1-year labor warranty" },
    recommendation: "pro",
    recommendationText: "Recommend hiring a pro — plumbing in Texas requires a licensed plumber for anything beyond fixture swaps.",
    requiresLicense: true,
    licenseNote: "In Texas, plumbing work beyond basic fixture swaps requires a licensed plumber. DIY can void homeowner's insurance and fail inspection.",
  },
  electrical: {
    label: "Electrical",
    icon: Zap,
    diy: {
      time: "4–12 hours",
      materialCost: "$100–400",
      skillLevel: "Advanced",
      skillColor: "bg-red-500/20 text-red-400",
      riskLevel: "High",
      riskColor: "text-red-400",
      toolRental: null,
      mistakes: ["Overloading circuits without checking amperage", "Incorrect wire gauge for load", "Not pulling a permit — fails home inspection at sale"],
    },
    pro: { cost: "$500–2,000", timeToComplete: "4–16 hours", warranty: "1-year labor warranty" },
    recommendation: "pro",
    recommendationText: "Recommend hiring a licensed electrician — Texas law requires permits for most electrical work.",
    requiresLicense: true,
    licenseNote: "In Texas, electrical work requires a licensed electrician and permit. DIY electrical can void homeowner's insurance and is a fire risk.",
  },
  hvac: {
    label: "HVAC",
    icon: Wind,
    diy: {
      time: "8–24 hours",
      materialCost: "$400–1,200",
      skillLevel: "Advanced",
      skillColor: "bg-red-500/20 text-red-400",
      riskLevel: "High",
      riskColor: "text-red-400",
      toolRental: null,
      mistakes: ["Incorrect refrigerant handling (EPA 608 required)", "Undersized unit for square footage", "Poor ductwork sealing reducing efficiency 30%"],
    },
    pro: { cost: "$3,500–7,500", timeToComplete: "1–2 days", warranty: "5-year equipment + 1-year labor" },
    recommendation: "pro",
    recommendationText: "Hire a pro — HVAC requires EPA 608 certification and Texas HVAC license to handle refrigerants.",
    requiresLicense: true,
    licenseNote: "In Texas, HVAC work requires a licensed HVAC contractor. Handling refrigerants without EPA 608 certification is a federal violation.",
  },
  roofing: {
    label: "Roofing",
    icon: Shield,
    diy: {
      time: "16–40 hours",
      materialCost: "$1,000–3,000",
      skillLevel: "Advanced",
      skillColor: "bg-red-500/20 text-red-400",
      riskLevel: "High",
      riskColor: "text-red-400",
      toolRental: "Roofing nailer — $65/day at Home Depot",
      mistakes: ["Improper flashing at valleys and penetrations", "Nailing too high causing blow-off in wind", "Skipping ice/water shield in vulnerable zones"],
    },
    pro: { cost: "$6,000–14,000", timeToComplete: "1–3 days", warranty: "10-year manufacturer + 2-year labor" },
    recommendation: "pro",
    recommendationText: "Strongly recommend a pro — improper roofing voids most manufacturer warranties and homeowner's insurance claims.",
    requiresLicense: true,
    licenseNote: "In Texas, roofing contractors must be registered. DIY roofing often voids the manufacturer's warranty on shingles.",
  },
  landscaping: {
    label: "Landscaping",
    icon: Leaf,
    diy: {
      time: "4–20 hours",
      materialCost: "$200–800",
      skillLevel: "Beginner",
      skillColor: "bg-emerald-500/20 text-emerald-400",
      riskLevel: "Low",
      riskColor: "text-emerald-400",
      toolRental: "Sod cutter — $85/day, Tiller — $75/day at Home Depot",
      mistakes: ["Planting in wrong sun/shade zones", "Overwatering new sod", "Grading toward the house instead of away"],
    },
    pro: { cost: "$500–3,000", timeToComplete: "1–3 days", warranty: "Plant replacement guarantee (varies)" },
    recommendation: "diy",
    recommendationText: "DIY-friendly for most landscaping — great weekend project with high satisfaction.",
    requiresLicense: false,
  },
};

const SKILL_ORDER = { Beginner: 1, Intermediate: 2, Advanced: 3 };
const RISK_ORDER = { Low: 1, Medium: 2, High: 3 };

export default function DIYVsProCalculator() {
  const [selected, setSelected] = useState<ProjectKey | null>(null);

  const project = selected ? PROJECTS[selected] : null;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-teal-400 text-sm font-medium mb-3">
            <Wrench className="w-4 h-4" />
            <span>Home Projects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">DIY vs. Pro Calculator</h1>
          <p className="text-slate-400 text-lg">When to do it yourself, when to call someone</p>
        </div>

        {/* Project selector chips */}
        <div className="mb-8">
          <p className="text-slate-400 text-sm mb-4">Select a project type:</p>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(PROJECTS) as [ProjectKey, ProjectData][]).map(([key, p]) => {
              const Icon = p.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selected === key
                      ? "bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20"
                      : "bg-[#0F1E35] border-slate-700 text-slate-300 hover:border-teal-500/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty state */}
        {!project && (
          <div className="rounded-2xl border border-slate-700 bg-[#0F1E35] p-12 text-center">
            <Hammer className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Select a project above to see your DIY vs. Pro breakdown</p>
          </div>
        )}

        {/* Comparison columns */}
        {project && (
          <div className="space-y-6">
            {/* Recommendation card */}
            <div className={`rounded-2xl border p-5 flex items-start gap-4 ${
              project.recommendation === "diy"
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-amber-500/40 bg-amber-500/5"
            }`}>
              {project.recommendation === "diy"
                ? <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                : <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              }
              <div>
                <p className="font-semibold text-white mb-1">
                  {project.recommendation === "diy" ? "✅ DIY-friendly" : "⚠️ Recommend hiring a pro"}
                </p>
                <p className="text-slate-300 text-sm">{project.recommendationText}</p>
              </div>
            </div>

            {/* 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* DIY Card */}
              <div className="rounded-2xl border border-slate-700 bg-[#0F1E35] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Hammer className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-white text-lg">Do It Yourself</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4" /> Time required
                    </div>
                    <span className="text-white font-medium text-sm">{project.diy.time}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <DollarSign className="w-4 h-4" /> Material cost
                    </div>
                    <span className="text-white font-medium text-sm">{project.diy.materialCost}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Star className="w-4 h-4" /> Skill level
                    </div>
                    <Badge className={`text-xs ${project.diy.skillColor}`}>{project.diy.skillLevel}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <AlertTriangle className="w-4 h-4" /> Risk level
                    </div>
                    <span className={`font-medium text-sm ${project.diy.riskColor}`}>{project.diy.riskLevel}</span>
                  </div>
                  {project.diy.toolRental && (
                    <div className="flex justify-between items-start py-3 border-b border-slate-700/60">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Wrench className="w-4 h-4" /> Tool rental
                      </div>
                      <span className="text-teal-400 font-medium text-sm text-right max-w-[180px]">{project.diy.toolRental}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Common DIY mistakes</p>
                    <ul className="space-y-2">
                      {project.diy.mistakes.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Card */}
              <div className="rounded-2xl border border-teal-500/30 bg-[#0F1E35] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-white text-lg">Hire a Pro</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <DollarSign className="w-4 h-4" /> Professional cost
                    </div>
                    <span className="text-white font-medium text-sm">{project.pro.cost}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4" /> Time to complete
                    </div>
                    <span className="text-white font-medium text-sm">{project.pro.timeToComplete}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Shield className="w-4 h-4" /> Warranty
                    </div>
                    <span className="text-teal-400 font-medium text-sm text-right max-w-[180px]">{project.pro.warranty}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <CheckCircle className="w-4 h-4" /> Licensed + insured
                    </div>
                    <span className="text-emerald-400 font-medium text-sm">Yes</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <AlertTriangle className="w-4 h-4" /> Risk level
                    </div>
                    <span className="text-emerald-400 font-medium text-sm">Minimal</span>
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-teal-400 mt-0.5 flex-shrink-0">✓</span>
                      Work passes code inspection
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-teal-400 mt-0.5 flex-shrink-0">✓</span>
                      Homeowner insurance remains valid
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-teal-400 mt-0.5 flex-shrink-0">✓</span>
                      No permit headaches
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* License warning */}
            {project.requiresLicense && (
              <div className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-200 text-sm">{project.licenseNote}</p>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-2xl border border-slate-700 bg-[#0F1E35] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white mb-1">Ready to find a vetted pro?</p>
                <p className="text-slate-400 text-sm">Browse licensed, insured pros in your area — no per-lead fees charged to you.</p>
              </div>
              <Link href="/trustypro/book">
                <Button className="bg-teal-500 hover:bg-teal-400 text-white px-6 whitespace-nowrap">
                  Find a Pro <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
