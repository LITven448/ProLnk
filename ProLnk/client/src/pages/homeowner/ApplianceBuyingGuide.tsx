import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart, Calendar, CheckCircle, XCircle, AlertTriangle,
  Thermometer, Refrigerator, Wind, Droplets, Zap, Star, ExternalLink,
} from "lucide-react";

const SEASONS = [
  {
    month: "January",
    emoji: "❄️",
    headline: "Best prices on last year's models",
    detail: "Retailers slash inventory 20–30% to make room for new model year arrivals. Best window for premium refrigerators and ranges.",
    savings: "20–30% off",
    color: "#3B82F6",
  },
  {
    month: "May–June",
    emoji: "🌸",
    headline: "Memorial Day — biggest appliance sale season",
    detail: "Industry's largest promotional window. Every major retailer runs deep discounts on full appliance suites. Best for bundling.",
    savings: "Up to 40% off",
    color: "#10B981",
  },
  {
    month: "September",
    emoji: "🍂",
    headline: "Labor Day deals on refrigerators & dishwashers",
    detail: "Second-largest sale season. New models hit showrooms so last season's refrigerators and dishwashers get clearance pricing.",
    savings: "15–25% off",
    color: "#F59E0B",
  },
  {
    month: "Black Friday",
    emoji: "🛍️",
    headline: "Best time for washers & dryers",
    detail: "Doorbuster deals on laundry pairs. Retailers compete aggressively. Stack rebates with manufacturer mail-ins for maximum savings.",
    savings: "25–35% off",
    color: "#8B5CF6",
  },
];

const CHECKLIST = [
  { label: "Measure opening and doorways", status: "ok" as const },
  { label: "Check utility connections (gas / electric / water)", status: "ok" as const },
  { label: "Verify delivery and installation included", status: "ok" as const },
  { label: "Check return policy (30+ days)", status: "warn" as const },
  { label: "Read reviews for reliability", status: "ok" as const },
  { label: "Compare energy costs over 10 years", status: "bad" as const },
];

const RELIABILITY = [
  { category: "Dishwasher", icon: Droplets, brands: ["Bosch", "Miele", "KitchenAid"], color: "#06B6D4" },
  { category: "Refrigerator", icon: Refrigerator, brands: ["LG", "Samsung", "Whirlpool"], color: "#3B82F6" },
  { category: "Washer / Dryer", icon: Wind, brands: ["Speed Queen", "Maytag", "LG"], color: "#8B5CF6" },
  { category: "HVAC", icon: Thermometer, brands: ["Carrier", "Trane", "Lennox"], color: "#10B981" },
  { category: "Water Heater", icon: Zap, brands: ["Rheem", "Bradford White", "AO Smith"], color: "#F59E0B" },
];

const STATUS_ICON = {
  ok:   <CheckCircle size={18} className="text-emerald-400" />,
  warn: <AlertTriangle size={18} className="text-amber-400" />,
  bad:  <XCircle size={18} className="text-red-400" />,
};

export default function ApplianceBuyingGuide() {
  const [activeMonth, setActiveMonth] = useState(0);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#F8FAFC] pb-16">

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)" }}
          className="px-6 py-10 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart size={28} className="text-cyan-400" />
              <h1 className="text-3xl font-bold">Appliance Buying Guide</h1>
            </div>
            <p className="text-slate-300 text-lg">Buy smart, install right</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-10 pt-8">

          {/* Best Time to Buy */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-slate-600" />
              <h2 className="text-xl font-bold text-slate-800">Best Time to Buy</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEASONS.map((s, i) => (
                <button
                  key={s.month}
                  onClick={() => setActiveMonth(i)}
                  className="text-left rounded-2xl p-5 border-2 transition-all"
                  style={{
                    borderColor: activeMonth === i ? s.color : "#E2E8F0",
                    background: activeMonth === i ? `${s.color}10` : "#FFFFFF",
                    boxShadow: activeMonth === i ? `0 0 0 3px ${s.color}30` : "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{s.emoji}</span>
                    <Badge style={{ background: s.color, color: "#fff", border: "none" }}>
                      {s.savings}
                    </Badge>
                  </div>
                  <p className="font-semibold text-slate-800">{s.month}</p>
                  <p className="text-sm text-slate-500 mt-1">{s.headline}</p>
                  {activeMonth === i && (
                    <p className="text-sm text-slate-600 mt-3 border-t border-slate-200 pt-3">{s.detail}</p>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-1">Appliance Buying Checklist</h2>
            <p className="text-slate-500 text-sm mb-4">Before you buy</p>
            <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
              {CHECKLIST.map((item) => (
                <div key={item.label} className="flex items-center gap-4 px-5 py-4">
                  {STATUS_ICON[item.status]}
                  <span className="text-slate-700 text-sm flex-1">{item.label}</span>
                  {item.status === "warn" && (
                    <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                      Verify
                    </span>
                  )}
                  {item.status === "bad" && (
                    <span className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                      Often Skipped
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Reliability Rankings */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-slate-600" />
              <h2 className="text-xl font-bold text-slate-800">Reliability Rankings</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RELIABILITY.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.category}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${cat.color}18` }}>
                        <Icon size={20} style={{ color: cat.color }} />
                      </div>
                      <span className="font-semibold text-slate-800">{cat.category}</span>
                    </div>
                    <div className="space-y-1.5">
                      {cat.brands.map((b, i) => (
                        <div key={b} className="flex items-center gap-2">
                          <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ background: i === 0 ? cat.color : i === 1 ? `${cat.color}99` : `${cat.color}55` }}>
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-700">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl p-6 text-white text-center"
            style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)" }}>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
              <Zap size={24} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Ready to install your new appliance?</h3>
            <p className="text-slate-300 text-sm mb-5">
              Get TrustyPro to install it — licensed and insured pros in your area.
            </p>
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-2 rounded-xl gap-2">
              <ExternalLink size={16} />
              Find an Installer on TrustyPro
            </Button>
          </section>

        </div>
      </div>
    </HomeownerLayout>
  );
}
