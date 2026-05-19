import React from 'react';
import { useState } from "react";
import {
  CheckCircle, Circle, Trophy, Users, Star, Camera,
  Smartphone, UserPlus, Target, TrendingUp, Award, Zap,
  ChevronRight, Lock,
} from "lucide-react";

type Phase = "week1″ | "month1" | "month2" | "month3";

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  icon: React.ElementType;
}

const PHASE_ITEMS: Record<Phase, ChecklistItem[]> = {
  week1: [
    { id: "w1_profile", label: "Complete your profile (100% completeness)", detail: "Trade, bio, service area, photo — all required for lead matching", icon: Star },
    { id: "w1_docs", label: "Upload license and insurance documents", detail: "Required before receiving leads. Processing takes < 24hrs", icon: CheckCircle },
    { id: "w1_area", label: "Set your service area (primary ZIP + 5 surrounding)", detail: "Broader area = more leads. You control what you accept", icon: Target },
    { id: "w1_lead", label: "Accept your first lead within 4 hours", detail: "Response speed is the #1 factor in lead quality scoring", icon: Zap },
    { id: "w1_job", label: "Complete your first job and request a review", detail: "Reviews unlock Tier 2 status and higher commission rates", icon: Trophy },
    { id: "w1_photos", label: "Upload 3 job site photos", detail: "Before/after photos increase your profile click-through by 47%", icon: Camera },
    { id: "w1_app", label: "Download the FieldOS mobile app", detail: "Manage leads, log jobs, and get paid faster from your phone", icon: Smartphone },
    { id: "w1_recruit", label: "Recruit 1 person to your network", detail: "Your network override pays you 1% of everything they earn — forever", icon: UserPlus },
  ],
  month1: [
    { id: "m1_jobs5″, label: "Complete 5 jobs total", detail: "Tier 2 unlocks at 10 completed jobs and boosts commission to 20%", icon: CheckCircle },
    { id: "m1_review3″, label: "Earn 3+ five-star reviews", detail: "Average rating is shown to homeowners before they request a pro", icon: Star },
    { id: "m1_recruit2″, label: "Recruit your 2nd and 3rd network member", detail: "3 active recruits = $149+ passive income monthly", icon: UserPlus },
    { id: "m1_streak", label: "Maintain 4-hour response streak for 30 days", detail: "Fast responders get first-look priority on inbound leads", icon: Zap },
    { id: "m1_photos10″, label: "Upload 10 job site photos total", detail: "Partners with photo portfolios get 2.1x more profile visits", icon: Camera },
    { id: "m1_niche", label: "Specialize in 1–2 high-value trade categories", detail: "HVAC, roofing, and electrical generate 68% of all platform revenue", icon: Target },
  ],
  month2: [
    { id: "m2_t2″, label: "Reach Tier 2 (10 completed jobs)", detail: "Tier 2 = 20% commission. On a $2,000 job, that's $400 vs $240″, icon: TrendingUp },
    { id: "m2_recruit5″, label: "Grow network to 5 active members", detail: "5 recruits averaging 2 jobs/mo each = ~$300/mo passive at your tier", icon: Users },
    { id: "m2_exchange", label: "Post your first Exchange job offer", detail: "Overflow jobs you can't take yourself = network income for you", icon: ChevronRight },
    { id: "m2_referral", label: "Share your referral link in 2 community groups", detail: "Facebook groups, Nextdoor, trade associations are top sources", icon: UserPlus },
    { id: "m2_stripe", label: "Connect Stripe payout account", detail: "Required for commissions above $500. Takes 2 minutes", icon: CheckCircle },
  ],
  month3: [
    { id: "m3_t3″, label: "On track for Tier 3 (50 completed jobs)", detail: "Tier 3 = 35% commission. The inflection point for real income", icon: Trophy },
    { id: "m3_network10″, label: "Network of 10+ active partners", detail: "10-person network at Tier 2 = $600–$1,200/mo in overrides", icon: Users },
    { id: "m3_origination", label: "Register 3+ homes in Home Health Vault", detail: "Origination rights = permanent share of platform fees for those homes", icon: Star },
    { id: "m3_spotlight", label: "Apply for Partner Spotlight feature", detail: "Featured partners get 5x profile visibility boost for 30 days", icon: Award },
    { id: "m3_coach", label: "Complete 90-Day Success Call with your coach", detail: "Review your metrics, unlock advanced strategies, set 6-month targets", icon: CheckCircle },
  ],
};

const PHASE_META: Record<Phase, { label: string; goal: string; commission: string }> = {
  week1: {
    label: "Week 1″,
    goal: "8 items",
    commission: "",
  },
  month1: {
    label: "Month 1″,
    goal: "5 completed jobs + 1 recruit",
    commission: "est. $840 in commissions",
  },
  month2: {
    label: "Month 2″,
    goal: "Tier 2 + 5 network recruits",
    commission: "est. $1,400 in commissions",
  },
  month3: {
    label: "Month 3″,
    goal: "On track for Tier 3 + 10-person network",
    commission: "est. $3,000+ in commissions",
  },
};

const PHASES: Phase[] = ["week1″, "month1", "month2", "month3"];

function progressPercent(checked: Record<string, boolean>, items: ChecklistItem[]) {
  const done = items.filter(i => checked[i.id]).length;
  return items.length === 0 ? 0 : Math.round((done / items.length) * 100);
}

function allPhaseProgress(checked: Record<string, boolean>) {
  const allItems = PHASES.flatMap(p => PHASE_ITEMS[p]);
  return progressPercent(checked, allItems);
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={88} height={88} className="-rotate-90″>
      <circle cx={44} cy={44} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
      <circle
        cx={44}
        cy={44}
        r={r}
        fill="none"
        stroke="#14b8a6″
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
    </svg>
  );
}

export default function PartnerSuccessChecklist() {
  const [activePhase, setActivePhase] = useState<Phase>("week1″);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const items = PHASE_ITEMS[activePhase];
  const phasePct = progressPercent(checked, items);
  const totalPct = allPhaseProgress(checked);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8″>
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Your Success Roadmap</h1>
          <p className="text-slate-400 text-sm mt-1″>First 90 days to your first $3,000</p>
        </div>

        {/* Progress + Pro Tip */}
        <div className="flex flex-col sm:flex-row gap-4″>
          <div className="bg-[#111C30] border border-white/10 rounded-xl p-5 flex items-center gap-5 flex-1″>
            <div className="relative">
              <ProgressRing pct={totalPct} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-white">{totalPct}%</span>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Overall Progress</div>
              <div className="text-slate-400 text-sm mt-0.5″>
                {PHASES.flatMap(p => PHASE_ITEMS[p]).filter(i => checked[i.id]).length} of{" "}
                {PHASES.flatMap(p => PHASE_ITEMS[p]).length} tasks complete
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-900/40 to-blue-900/30 border border-teal-500/30 rounded-xl p-5 flex-1″>
            <div className="flex items-start gap-3″>
              <TrendingUp size={18} className="text-teal-400 shrink-0 mt-0.5″ />
              <div>
                <div className="text-white font-semibold text-sm">Pro Tip</div>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                  Partners who complete the Week 1 checklist earn{" "}
                  <strong className="text-white">3.2x more</strong> in their first 90 days than those who don't.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Tabs */}
        <div className="bg-[#111C30] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex border-b border-white/10″>
            {PHASES.map((phase, idx) => {
              const pct = progressPercent(checked, PHASE_ITEMS[phase]);
              const isLocked = idx > 0 && progressPercent(checked, PHASE_ITEMS[PHASES[idx - 1]]) < 50;
              return (
                <button
                  key={phase}
                  onClick={() => !isLocked && setActivePhase(phase)}
                  className={`flex-1 flex flex-col items-center py-3 px-2 text-xs font-medium transition-colors relative ${
                    activePhase === phase
                      ? "bg-white/5 text-white border-b-2 border-teal-400″
                      : isLocked
                      ? "text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-slate-300″
                  }`}
                >
                  {isLocked && <Lock size={10} className="mb-0.5 text-slate-600″ />}
                  {PHASE_META[phase].label}
                  {pct > 0 && !isLocked && (
                    <div className="w-full mt-1.5 h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Phase Goal Banner */}
          {PHASE_META[activePhase].goal && (
            <div className="flex items-center justify-between px-5 py-3 bg-white/3 border-b border-white/5″>
              <span className="text-slate-400 text-xs">
                <span className="text-white font-medium">Goal:</span>{" "}
                {PHASE_META[activePhase].goal}
              </span>
              {PHASE_META[activePhase].commission && (
                <span className="text-green-400 text-xs font-medium">
                  {PHASE_META[activePhase].commission}
                </span>
              )}
            </div>
          )}

          {/* Checklist Items */}
          <div className="divide-y divide-white/5″>
            {items.map(item => {
              const Icon = item.icon;
              const done = !!checked[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-start gap-4 px-5 py-4 hover:bg-white/3 transition-colors text-left group"
                >
                  <div className={`mt-0.5 shrink-0 transition-colors ${done ? "text-teal-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                    {done ? <CheckCircle size={20} /> : <Circle size={20} />}
                  </div>
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0″>
                    <Icon size={15} className={done ? "text-teal-400″ : "text-slate-400"} />
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className={`text-sm font-medium transition-colors ${done ? "text-slate-400 line-through" : "text-white"}`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.detail}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Phase completion state */}
          {phasePct === 100 && (
            <div className="px-5 py-4 bg-teal-500/10 border-t border-teal-500/20 flex items-center gap-3″>
              <Trophy size={18} className="text-teal-400″ />
              <div>
                <div className="text-white font-semibold text-sm">Phase Complete!</div>
                <div className="text-teal-300 text-xs">
                  {activePhase === "week1″ && "You've unlocked Month 1. Keep the momentum going."}
                  {activePhase === "month1″ && "You've unlocked Month 2. Tier 2 is within reach."}
                  {activePhase === "month2″ && "You've unlocked Month 3. You’re in the top 20% of partners."}
                  {activePhase === "month3″ && "You've completed the 90-day roadmap. Your coach will reach out for your review call."}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Milestone Rewards */}
        <section>
          <h2 className="text-base font-semibold text-white mb-3″>Milestone Rewards</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
            {[
              { phase: "week1″, label: "Fast Starter", icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-500/20" },
              { phase: "month1″, label: "First Earner", icon: DollarSignIcon, color: "text-green-400", bg: "bg-green-400/10 border-green-500/20" },
              { phase: "month2″, label: "Tier 2 Pro", icon: Star, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-500/20" },
              { phase: "month3″, label: "90-Day Grad", icon: Trophy, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-500/20" },
            ].map(badge => {
              const Icon = badge.icon;
              const unlocked = progressPercent(checked, PHASE_ITEMS[badge.phase as Phase]) === 100;
              return (
                <div
                  key={badge.phase}
                  className={`border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${
                    unlocked ? badge.bg : "bg-white/3 border-white/10 opacity-50 grayscale"
                  }`}
                >
                  <Icon size={22} className={unlocked ? badge.color : "text-slate-600″} />
                  <span className="text-xs font-medium text-center text-white">{badge.label}</span>
                  {unlocked && <span className="text-xs text-teal-400″>Earned!</span>}
                  {!unlocked && <span className="text-xs text-slate-600″>Locked</span>}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function DollarSignIcon({ size, className }: { size: number; className?: string }) {
  return <TrendingUp size={size} className={className} />;
}
