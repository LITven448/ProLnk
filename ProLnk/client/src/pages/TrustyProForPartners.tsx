import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Target, TrendingUp, ArrowRight, CheckCircle, Users, DollarSign, Brain } from "lucide-react";

interface Benefit {
  icon: typeof ShieldCheck;
  title: string;
  detail: string;
  color: string;
}

interface StatCard {
  value: string;
  label: string;
  sub: string;
  color: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Brain,
    title: "Pre-educated on home condition",
    detail: "TrustyPro homeowners have gone through a Home Health Vault scan. They already know what system is aging, what the AI flagged, and what maintenance is overdue. No convincing — just confirmation.",
    color: "#8B5CF6",
  },
  {
    icon: Target,
    title: "Pre-qualified for the exact service",
    detail: "AI detected the issue. The homeowner isn\'t calling you on a hunch — they have a specific, AI-confirmed finding. You know what you\'re walking into before you arrive.",
    color: "#3B82F6",
  },
  {
    icon: Zap,
    title: "Ready to book immediately",
    detail: "TrustyPro homeowners are in action mode. The AI scan motivated them. They\'re not shopping — they\'re booking. Expect shorter sales cycles and higher average ticket values.",
    color: "#F59E0B",
  },
  {
    icon: DollarSign,
    title: "Budget-aware from the TrueCostGuide",
    detail: "Every homeowner on TrustyPro has seen the TrueCostGuide for their service type. They know what the job costs in DFW. Price objections are minimal because expectations are already set.",
    color: "#10B981",
  },
];

const STATS: StatCard[] = [
  { value: "78%", label: "Close Rate", sub: "TrustyPro leads", color: "text-green-400" },
  { value: "42%", label: "Close Rate", sub: "typical cold leads", color: "text-red-400" },
  { value: "36pt", label: "Close Rate Gap", sub: "advantage per lead", color: "text-blue-400" },
  { value: "2.1×", label: "Higher Conversion", sub: "vs. marketplace average", color: "text-purple-400" },
];

const COMPARISON = [
  { attribute: "Homeowner education", trustypro: "Full AI scan complete", cold: "Starting from zero" },
  { attribute: "Service qualification", trustypro: "AI-confirmed need", cold: "Self-reported guess" },
  { attribute: "Budget awareness", trustypro: "TrueCostGuide reviewed", cold: "Sticker shock risk" },
  { attribute: "Motivation level", trustypro: "AI flagged urgency", cold: "Browsing/comparing" },
  { attribute: "Time to book", trustypro: "Same-day typical", cold: "Days to weeks" },
  { attribute: "Expected close rate", trustypro: "78%", cold: "42%" },
];

export default function TrustyProForPartners() {
  const [activeTab, setActiveTab] = useState<"why" | "comparison">("why");

  return (
    <div className="min-h-screen bg-white text-[#0A1628]">
      {/* Hero */}
      <div className="bg-[#0A1628] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">TrustyPro for Partners</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            The Homeowner Intelligence Platform That Feeds Your Pipeline
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            TrustyPro homeowners already know what they need. They\'ve been educated, their home has been scanned, and they\'re ready to book. <span className="text-yellow-400 font-semibold">This is the warmest lead you\'ll ever get.</span>
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Close Rate Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-8 text-center">The Conversion Difference</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">TrustyPro Lead</div>
                <div className="text-5xl font-bold text-green-600 mb-1">78%</div>
                <div className="text-sm text-green-700">close rate</div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <div className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Cold Lead</div>
                <div className="text-5xl font-bold text-red-500 mb-1">42%</div>
                <div className="text-sm text-red-600">close rate</div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-[#0A1628] text-white rounded-xl p-5 text-center">
            <div className="text-sm text-gray-400 mb-1">You close</div>
            <div className="text-3xl font-bold text-yellow-400">86% more TrustyPro leads</div>
            <div className="text-sm text-gray-400 mt-1">than equivalent cold opportunities</div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-16">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("why")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "why" ? "bg-[#0A1628] text-yellow-400" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Why TrustyPro Leads Convert
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "comparison" ? "bg-[#0A1628] text-yellow-400" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              Side-by-Side Comparison
            </button>
          </div>

          {activeTab === "why" && (
            <div className="space-y-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: b.color + "22" }}>
                    <b.icon size={20} style={{ color: b.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1628] mb-1">{b.title}</div>
                    <div className="text-gray-600 text-sm leading-relaxed">{b.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-[#0A1628] text-white text-xs font-semibold p-3">
                <div>Attribute</div>
                <div className="text-green-400">TrustyPro Lead</div>
                <div className="text-red-400">Cold Lead</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-3 p-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="font-medium text-[#0A1628] text-xs">{row.attribute}</div>
                  <div className="text-green-600 text-xs flex items-start gap-1">
                    <CheckCircle size={12} className="mt-0.5 flex-shrink-0" />
                    {row.trustypro}
                  </div>
                  <div className="text-gray-400 text-xs">{row.cold}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Partner Quote */}
        <section className="mb-16">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-8">
              <div className="text-4xl text-yellow-400 mb-3">"</div>
              <p className="text-[#0A1628] text-lg font-medium leading-relaxed mb-4">
                The homeowners I get through TrustyPro already understand their HVAC system better than most homeowners I meet in the field. They know the age, the service history, and what the AI recommended. My close rate on those leads is nearly double what I get anywhere else.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0A1628] flex items-center justify-center text-yellow-400 font-bold">M</div>
                <div>
                  <div className="font-bold text-[#0A1628]">Marcus T.</div>
                  <div className="text-sm text-gray-500">HVAC Technician, Frisco TX</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Join ProLnk to Receive TrustyPro-Sourced Leads</h2>
          <p className="text-gray-500 mb-7 max-w-md mx-auto">
            Apply to become a ProLnk partner and gain access to TrustyPro homeowner leads in your trade and service area.
          </p>
          <a href="/apply">
            <Button className="bg-[#0A1628] hover:bg-[#0d1e38] text-yellow-400 font-bold px-10 py-4 text-lg">
              Apply to Join ProLnk <ArrowRight size={18} className="ml-2" />
            </Button>
          </a>
          <p className="text-xs text-gray-400 mt-4">Charter partner spots are limited. Waitlist closes at 500 applications.</p>
        </div>
      </div>
    </div>
  );
}
