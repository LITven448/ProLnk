/**
 * Tier Upgrade Success Page
 * Shown after Stripe checkout completes for a tier upgrade.
 * Reads ?tier= from query string to show tier-specific messaging.
 */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, Zap, Star, Award, Crown, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIER_CONFIG: Record<string, {
  name: string; color: string; bg: string; border: string; icon: typeof Zap;
  keepRate: number; headline: string; perks: string[];
}> = {
  pro: {
    name: "Pro",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: Zap,
    keepRate: 55,
    headline: "You're officially a Pro partner.",
    perks: [
      "Keep 55% of every commission",
      "Unlimited job logging",
      "Priority lead matching",
      "Field OS full access",
    ],
  },
  crew: {
    name: "Crew",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    icon: Star,
    keepRate: 65,
    headline: "Welcome to the Crew tier.",
    perks: [
      "Keep 65% of every commission",
      "Team sub-accounts (up to 5)",
      "Bulk job import",
      "Dedicated partner success manager",
    ],
  },
  company: {
    name: "Company",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: Award,
    keepRate: 72,
    headline: "Company tier -- built for scale.",
    perks: [
      "Keep 72% of every commission",
      "Unlimited team members",
      "White-label customer reports",
      "API access + webhook integrations",
    ],
  },
  enterprise: {
    name: "Enterprise",
    color: "text-[#82D616]",
    bg: "bg-[#82D616]/10",
    border: "border-[#82D616]/30",
    icon: Crown,
    keepRate: 78,
    headline: "Enterprise. The top of the network.",
    perks: [
      "Keep 78% of every commission",
      "Custom territory exclusivity",
      "Direct admin line",
      "Revenue share on referred partners",
    ],
  },
};

export default function UpgradeSuccess() {
  const [, navigate] = useLocation();
  const [tier, setTier] = useState<string>("pro");
  const [animIn, setAnimIn] = useState(false);

  const { data: profile } = trpc.partners.getMyProfile.useQuery();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tier") ?? (profile as any)?.partner?.tier ?? "pro";
    setTier(t);
    const timer = setTimeout(() => setAnimIn(true), 100);
    return () => clearTimeout(timer);
  }, [profile]);

  const cfg = TIER_CONFIG[tier] ?? TIER_CONFIG.pro;
  const Icon = cfg.icon;

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div
        className={`max-w-md w-full transition-all duration-700 ${animIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center mx-auto mb-4 relative`}>
            <Icon className={`w-9 h-9 ${cfg.color}`} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${cfg.bg} border ${cfg.border} mb-3`}>
            <Sparkles className={`w-3.5 h-3.5 ${cfg.color}`} />
            <span className={`text-xs font-bold ${cfg.color} uppercase tracking-wider`}>{cfg.name} Tier Activated</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-2">{cfg.headline}</h1>
          <p className="text-white/60 text-sm">
            Your account has been upgraded. All new features are active immediately.
          </p>
        </div>

        {/* Perks card */}
        <div className={`bg-white/5 border ${cfg.border} rounded-2xl p-5 mb-6`}>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">What you unlocked</p>
          <div className="space-y-2.5">
            {cfg.perks.map(perk => (
              <div key={perk} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle className={`w-3 h-3 ${cfg.color}`} />
                </div>
                <span className="text-white/80 text-sm">{perk}</span>
              </div>
            ))}
          </div>
          <div className={`mt-4 pt-4 border-t ${cfg.border}`}>
            <p className="text-white/40 text-xs">Commission keep rate</p>
            <p className={`text-3xl font-black ${cfg.color}`}>{cfg.keepRate}%</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-[#82D616] hover:bg-[#6ab810] text-[#0A1628] font-bold h-12 text-base"
            onClick={() => navigate("/field-os")}
          >
            Open Field OS <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            variant="outline"
            className="w-full border-white/20 text-white/70 hover:text-white hover:bg-white/5 h-11"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Questions? Contact support from your dashboard settings.
        </p>
      </div>
    </div>
  );
}
