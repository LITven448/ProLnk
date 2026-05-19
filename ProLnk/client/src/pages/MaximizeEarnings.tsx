import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Camera, MapPin, Users, Home, Share2, Star, Clock, Zap, DollarSign, Award,
  ChevronDown, ChevronUp, TrendingUp, CheckCircle, Lock, Target, BarChart3,
  ArrowRight, Calendar, BookOpen, Layers, Network,
} from "lucide-react";
import { Link } from "wouter";

type Phase = "week1″ | "month1" | "month3" | "year1";

const PHASES: { id: Phase; label: string; subtitle: string; color: string; accent: string }[] = [
  { id: "week1″, label: "Week 1", subtitle: "Get Activated", color: "#22c55e", accent: "rgba(34,197,94,0.12)" },
  { id: "month1″, label: "Month 1", subtitle: "Build Momentum", color: "#3b82f6", accent: "rgba(59,130,246,0.12)" },
  { id: "month3″, label: "Month 3", subtitle: "Grow Your Network", color: "#a855f7", accent: "rgba(168,85,247,0.12)" },
  { id: "year1″, label: "Year 1", subtitle: "Passive Income", color: "#f59e0b", accent: "rgba(245,158,11,0.12)" },
];

interface Milestone {
  action: string;
  outcome: string;
  incomeIncrease: string;
  steps: string[];
}

const MILESTONES: Record<Phase, Milestone[]> = {
  week1: [
    {
      action: "Complete Your Profile (100%)",
      outcome: "3× more lead matches from day one",
      incomeIncrease: "+$200–$600/mo immediately",
      steps: [
        "Upload your license and insurance documents",
        "Add 5–10 photos of recent completed work",
        "Set your service area radius to 25–40 miles",
        "Write a 3-sentence bio that mentions your specialty and years of experience",
        "Add all service categories you actually perform (not just primary trade)",
      ],
    },
    {
      action: "Log Your First Job",
      outcome: "Unlocks your commission earning and starts your origination rights",
      incomeIncrease: "+1.5% permanent origination on that home",
      steps: [
        "Complete any job — even one you sourced yourself",
        "Go to Jobs → Log Job and enter the address and job value",
        "Take 2 before/after photos and attach them",
        "Request a review from the homeowner via the post-job SMS",
        "The home is now permanently attributed to you in the vault",
      ],
    },
    {
      action: "Share Your Referral Link",
      outcome: "Sets the foundation for passive network income",
      incomeIncrease: "$17.88/mo per recruit who activates",
      steps: [
        "Copy your referral link from Network → My Link",
        "Text it to 3 trade contacts with a personal message",
        "Post it once to a local contractor Facebook group",
        "Save it as a note in your phone for quick sharing",
        "Add it to your email signature",
      ],
    },
  ],
  month1: [
    {
      action: "Recruit 5 Colleagues",
      outcome: "Reach Charter tier eligibility and unlock higher override rates",
      incomeIncrease: "+$450–$900/mo in subscription overrides",
      steps: [
        "Text the recruiting script from the Playbook tab to 5 trade contacts",
        "Follow up anyone who didn't respond after 48 hours with a simple 'still interested?'",
        "Invite supply house reps — they know every contractor in the area",
        "Post your referral link in 2 local contractor Facebook groups",
        "Offer to walk recruits through setup on a 15-min call",
      ],
    },
    {
      action: "Complete 10 Jobs on Platform",
      outcome: "Qualifies you for Tier 2 commission rates (20% → from 12%)",
      incomeIncrease: "+8% on every matched job going forward",
      steps: [
        "Accept every lead that fits your trade and radius — be aggressive early",
        "Respond to all leads within 15 minutes (enable push notifications now)",
        "Log each job immediately after completion — don't let them pile up",
        "Document every home address for origination rights",
        "Hit Tier 2 at 10 logged jobs: commission rate moves to 20%",
      ],
    },
    {
      action: "Collect 5+ Reviews",
      outcome: "Boosts algorithm match priority by ~15% per 0.5 stars",
      incomeIncrease: "+15% lead volume at same cost",
      steps: [
        "Text homeowners within 24 hours of job completion",
        "Pre-fill the review link in your message template so they just tap and tap",
        "If they give 3 stars or fewer, call them before it goes public to resolve it",
        "Post a review thank-you to your Instagram — it generates word of mouth",
        "Aim for 4.7+ average before month-end — this is your pricing power score",
      ],
    },
  ],
  month3: [
    {
      action: "Build an L2 Network (Recruits Who Recruit)",
      outcome: "Earn 0.5% on every job your recruits' recruits complete — forever",
      incomeIncrease: "+$200–$800/mo from L2 overrides alone",
      steps: [
        "Coach your top 2 direct recruits on how to share their own referral link",
        "Share the recruiting script with them — make it easy",
        "Set a goal: 3 recruits per active member in your L1 network",
        "Message your L1 network monthly with a tip — keep them engaged and recruiting",
        "Track your network depth in the Network Tree view",
      ],
    },
    {
      action: "Reach Tier 3 (50 Jobs Logged)",
      outcome: "Commission rate jumps to 35% on matched jobs",
      incomeIncrease: "+15% on all matched job commissions (35% vs 20%)",
      steps: [
        "Log every job, even non-matched ones — it all counts toward tier",
        "Expand your service area temporarily if your pipeline slows",
        "Accept subcontract work from other ProLnk pros for platform credit",
        "Dedicate 1 hour/week to lead follow-up — convert warm leads",
        "Review your decline rate — reduce it to maximize match volume",
      ],
    },
    {
      action: "Originate 10+ Homes to the Vault",
      outcome: "Permanent revenue share from all future platform activity on those homes",
      incomeIncrease: "+$25–$150/home/yr (permanent, compounds with platform growth)",
      steps: [
        "Log every home you service with the address — takes 45 seconds",
        "Ask homeowners to claim their Home Health Vault entry via your link",
        "When you complete a job, snap a photo of the utility panel, water heater, and HVAC unit",
        "Each home you originate is a permanent asset — treat them like real estate",
        "10 homes originated = avg $80/mo passive in year two as platform grows",
      ],
    },
  ],
  year1: [
    {
      action: "Complete Your 4-Level Network",
      outcome: "Earning on L1, L2, L3, and L4 — compounding override income",
      incomeIncrease: "+$1,200–$3,500/mo in network overrides (projectable)",
      steps: [
        "Focus your L1 recruits on quality: 10 active L1s beat 50 inactive ones",
        "Establish a monthly 'pro group' call to keep your network engaged and recruiting",
        "Share wins from your network on social — it inspires recruiting down the tree",
        "At 100 L1s you hit Founding tier — subscription override doubles to 12%",
        "Build a simple tracking sheet: name, date joined, last job date, recruits count",
      ],
    },
    {
      action: "Run the Year-1 Income Projection",
      outcome: "See your full passive income potential across all 5 streams",
      incomeIncrease: "Avg Year-1 top partner: $48K–$102K total income",
      steps: [
        "Use the Earnings Calculator below to model your exact income",
        "Direct commissions: project 20–40 matched jobs/mo at Tier 3–4 rates",
        "Subscription overrides: 100 L1 recruits × $17.88/mo = $1,788/mo passive",
        "Job overrides (L1): 100 recruits × 4 jobs × $500 × 1% = $2,000/mo",
        "Origination rights: 100 homes × ~$0.80/mo avg = $80/mo growing to $400+",
      ],
    },
    {
      action: "Achieve Founding Tier + Lifetime Rate Lock",
      outcome: "$149/mo locked for life; highest commission rates, highest override rates",
      incomeIncrease: "Rate lock saves $3,000–$6,000/yr vs future standard pricing",
      steps: [
        "Founding tier requires 100 active recruits in your direct L1 network",
        "Rate lock activates automatically — no action required",
        "At Founding tier, subscription override is 12% ($17.88/mo per recruit)",
        "At Founding tier, job override L1 is 4% (vs 1% at Standard)",
        "This is the irreversible moat — every platform upgrade benefits you first",
      ],
    },
  ],
};

const INCOME_STREAMS = [
  { label: "Direct Commissions", desc: "From matched jobs you close", rates: ["Standard: 12%", "Tier 2: 20%", "Tier 3: 35%", "Tier 4: 50%", "Tier 5: 70%"], color: "#22c55e" },
  { label: "Subscription Overrides", desc: "Monthly recurring on every recruit's $149″, rates: ["Standard: 7%", "Charter: 12%", "Founding: 12%"], color: "#3b82f6" },
  { label: "Job Overrides (4-Level)", desc: "% of jobs completed by your network", rates: ["L1: 1%", "L2: 0.5%", "L3: 0.25%", "L4: 0.1%"], color: "#a855f7″ },
  { label: "Homeowner Origination", desc: "Per-lead fee on homeowners you source", rates: ["$25–$100 per qualified homeowner"], color: "#f59e0b" },
  { label: "Home Origination Rights", desc: "Permanent share of platform fees on vaulted homes", rates: ["1.5% of all future platform fees per home", "Permanent once logged"], color: "#ec4899″ },
];

const FIRST_30_STEPS = [
  { day: "Day 1″, action: "Complete profile to 100%", impact: "3× match rate", color: "#22c55e" },
  { day: "Day 2″, action: "Enable push notifications", impact: "15-min response = 60% conversion", color: "#22c55e" },
  { day: "Day 3″, action: "Send referral link to 3 contacts", impact: "$53.64/mo passive if all activate", color: "#3b82f6" },
  { day: "Day 4″, action: "Accept your first lead", impact: "Starts your job counter toward Tier 2", color: "#3b82f6" },
  { day: "Day 7″, action: "Log first home to vault", impact: "Permanent 1.5% origination right", color: "#a855f7" },
  { day: "Day 10″, action: "Request 3 homeowner reviews", impact: "+15% match volume per 0.5 stars", color: "#a855f7" },
  { day: "Day 20″, action: "Post referral link to Facebook group", impact: "Avg 1–2 signups per post", color: "#f59e0b" },
  { day: "Day 30″, action: "Track: jobs logged, recruits, homes vaulted", impact: "Sets your Month 2 baseline", color: "#f59e0b" },
];

function IncomeCalculator() {
  const [directJobs, setDirectJobs] = useState(15);
  const [avgJobValue, setAvgJobValue] = useState(800);
  const [directRate, setDirectRate] = useState(20);
  const [l1Count, setL1Count] = useState(10);
  const [l1JobsPerMo, setL1JobsPerMo] = useState(3);
  const [l2Count, setL2Count] = useState(30);
  const [l2JobsPerMo, setL2JobsPerMo] = useState(2);
  const [origHomes, setOrigHomes] = useState(20);

  const directIncome = directJobs * avgJobValue * (directRate / 100);
  const subOverride = l1Count * 149 * 0.07;
  const l1Override = l1Count * l1JobsPerMo * avgJobValue * 0.01;
  const l2Override = l2Count * l2JobsPerMo * avgJobValue * 0.005;
  const origIncome = origHomes * 0.80;
  const total = directIncome + subOverride + l1Override + l2Override + origIncome;

  return (
    <div style={{ background: "#1a1d27″, borderRadius: 16, border: "1px solid #1e2330", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <BarChart3 size={18} color="#22c55e" />
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>Your Pace Income Projection</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 18, marginBottom: 28 }}>
        <Slider label="Direct jobs/mo" value={directJobs} min={1} max={40} onChange={setDirectJobs} display={String(directJobs)} />
        <Slider label="Avg job value ($)" value={avgJobValue} min={200} max={5000} step={100} onChange={setAvgJobValue} display={`$${avgJobValue.toLocaleString()}`} />
        <Slider label="Your commission rate (%)" value={directRate} min={12} max={70} onChange={setDirectRate} display={`${directRate}%`} />
        <Slider label="Active L1 recruits" value={l1Count} min={0} max={200} onChange={setL1Count} display={String(l1Count)} />
        <Slider label="Avg jobs/mo per L1 recruit" value={l1JobsPerMo} min={1} max={10} onChange={setL1JobsPerMo} display={String(l1JobsPerMo)} />
        <Slider label="Active L2 recruits" value={l2Count} min={0} max={500} onChange={setL2Count} display={String(l2Count)} />
        <Slider label="Avg jobs/mo per L2 recruit" value={l2JobsPerMo} min={1} max={10} onChange={setL2JobsPerMo} display={String(l2JobsPerMo)} />
        <Slider label="Homes originated" value={origHomes} min={0} max={500} onChange={setOrigHomes} display={String(origHomes)} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
        <ResultCard label="Direct commissions" value={`$${Math.round(directIncome).toLocaleString()}`} color="#22c55e" />
        <ResultCard label="Subscription overrides" value={`$${Math.round(subOverride).toLocaleString()}`} color="#3b82f6″ />
        <ResultCard label="L1 job overrides" value={`$${Math.round(l1Override).toLocaleString()}`} color="#a855f7″ />
        <ResultCard label="L2 job overrides" value={`$${Math.round(l2Override).toLocaleString()}`} color="#8b5cf6″ />
        <ResultCard label="Origination rights" value={`$${Math.round(origIncome).toLocaleString()}`} color="#ec4899″ />
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.1) 100%)",
        border: "1px solid rgba(34,197,94,0.3)",
        borderRadius: 12, padding: "18px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <div style={{ color: "#6b7280″, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Projected Monthly Total</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#22c55e" }}>${Math.round(total).toLocaleString()}</div>
          <div style={{ color: "#4b5563″, fontSize: 11, marginTop: 2 }}>${Math.round(total * 12).toLocaleString()}/yr</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#6b7280″, fontSize: 12, marginBottom: 4 }}>Passive income (overrides + orig)</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#3b82f6″ }}>
            ${Math.round(subOverride + l1Override + l2Override + origIncome).toLocaleString()}/mo
          </div>
          <div style={{ color: "#4b5563″, fontSize: 11 }}>while you sleep</div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, display }: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; display: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#9ca3af", fontSize: 12 }}>{label}</span>
        <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 700 }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#22c55e" }} />
    </div>
  );
}

function ResultCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ background: "#141720″, borderRadius: 10, border: "1px solid #1e2330", padding: "14px 16px" }}>
      <div style={{ color: "#6b7280″, fontSize: 11, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
      <div style={{ color: "#374151″, fontSize: 10, marginTop: 2 }}>per month</div>
    </div>
  );
}

function MilestoneCard({ milestone, color, accent }: { milestone: Milestone; color: string; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#1a1d27″, border: `1px solid ${color}30`, borderRadius: 14, overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", padding: "18px 20px",
          background: "transparent", border: "none", cursor: "pointer",
          display: "flex", alignItems: "flex-start", gap: 14,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, marginTop: 5, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{milestone.action}</div>
          <div style={{ fontSize: 12, color: "#6b7280″, marginBottom: 6 }}>{milestone.outcome}</div>
          <span style={{
            display: "inline-block", fontSize: 12, fontWeight: 700,
            color, background: `${color}18`, borderRadius: 6, padding: "2px 10px",
          }}>
            {milestone.incomeIncrease}
          </span>
        </div>
        <div style={{ color: "#4b5563″, flexShrink: 0, marginTop: 2 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 20px 18px 44px", borderTop: `1px solid ${color}20` }}>
          <div style={{ paddingTop: 14 }}>
            <div style={{ color: "#6b7280″, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Action Steps</div>
            {milestone.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: `${color}18`, border: `1px solid ${color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 10, fontWeight: 700, color,
                }}>
                  {i + 1}
                </div>
                <span style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.55 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NetworkMultiplier() {
  const [recruits, setRecruits] = useState(10);
  const subOverride = recruits * 149 * 0.07;
  const jobOverride = recruits * 4 * 800 * 0.01;
  const l2Est = recruits * 3;
  const l2Override = l2Est * 3 * 800 * 0.005;
  const total = subOverride + jobOverride + l2Override;

  return (
    <div style={{ background: "#1a1d27″, borderRadius: 16, border: "1px solid rgba(168,85,247,0.3)", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Network size={18} color="#a855f7″ />
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#fff" }}>Network Multiplier</h3>
      </div>
      <p style={{ color: "#6b7280″, fontSize: 13, marginBottom: 24 }}>
        See exactly how adding recruits changes your passive income — independent of your own job volume.
      </p>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "#9ca3af", fontSize: 13 }}>Active L1 recruits</span>
          <span style={{ color: "#a855f7″, fontSize: 14, fontWeight: 800 }}>{recruits}</span>
        </div>
        <input type="range" min={1} max={100} value={recruits} onChange={e => setRecruits(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#a855f7″ }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ color: "#374151″, fontSize: 11 }}>1 recruit</span>
          <span style={{ color: "#374151″, fontSize: 11 }}>100 recruits</span>
        </div>
      </div>

      {/* Visual network diagram */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(168,85,247,0.2)", border: "2px solid #a855f7″,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, margin: "0 auto 4px",
          }}>You</div>
          <div style={{ fontSize: 10, color: "#6b7280″ }}>You</div>
        </div>
        <div style={{ color: "#374151″, fontSize: 18 }}>→</div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(59,130,246,0.15)", border: "2px solid #3b82f6″,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#3b82f6″, margin: "0 auto 4px",
          }}>{recruits}</div>
          <div style={{ fontSize: 10, color: "#6b7280″ }}>L1</div>
        </div>
        <div style={{ color: "#374151″, fontSize: 18 }}>→</div>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(34,197,94,0.15)", border: "2px solid #22c55e",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#22c55e", margin: "0 auto 4px",
          }}>{l2Est}</div>
          <div style={{ fontSize: 10, color: "#6b7280″ }}>L2 est.</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Subscription overrides", value: `$${Math.round(subOverride).toLocaleString()}`, color: "#3b82f6″, note: `${recruits} × $149 × 7%` },
          { label: "L1 job overrides", value: `$${Math.round(jobOverride).toLocaleString()}`, color: "#a855f7″, note: `${recruits} × 4 jobs × $800 × 1%` },
          { label: "L2 job overrides", value: `$${Math.round(l2Override).toLocaleString()}`, color: "#22c55e", note: `${l2Est} × 3 jobs × $800 × 0.5%` },
        ].map(s => (
          <div key={s.label} style={{ background: "#141720″, borderRadius: 10, border: "1px solid #1e2330", padding: "14px 16px" }}>
            <div style={{ color: "#6b7280″, fontSize: 11, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}/mo</div>
            <div style={{ color: "#374151″, fontSize: 10, marginTop: 4 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
        borderRadius: 12, padding: "16px 20px", textAlign: "center",
      }}>
        <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>Total passive income from {recruits} recruits</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: "#a855f7″ }}>${Math.round(total).toLocaleString()}/mo</div>
        <div style={{ color: "#6b7280″, fontSize: 12, marginTop: 4 }}>not counting your own direct job income</div>
      </div>
    </div>
  );
}

export default function MaximizeEarnings() {
  const [activePhase, setActivePhase] = useState<Phase>("week1″);

  const phase = PHASES.find(p => p.id === activePhase)!;
  const milestones = MILESTONES[activePhase];

  return (
    <>
      <Helmet>
        <title>The ProLnk Earnings Playbook | Partner Resources</title>
        <meta
          name="description"
          content="Step-by-step guide to maximizing your ProLnk income from Week 1 through Year 1. Track milestones, model your income, and build passive override earnings."
        />
      </Helmet>

      <div style={{ minHeight: "100vh", background: "#0f1117″, color: "#e5e7eb", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Link href="/resources" style={{ color: "#6b7280″, fontSize: 13, textDecoration: "none" }}>Resources</Link>
            <span style={{ color: "#374151″ }}>›</span>
            <span style={{ color: "#e5e7eb", fontSize: 13 }}>Earnings Playbook</span>
          </div>

          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)",
              borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#22c55e",
              fontWeight: 600, marginBottom: 16,
            }}>
              <BookOpen size={12} /> The ProLnk Earnings Playbook
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.2 }}>
              From Day 1 to $8,400/mo:<br />Your Step-by-Step Roadmap
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 15, maxWidth: 600, margin: 0, lineHeight: 1.65 }}>
              Select your phase below. Each milestone shows the exact action, the expected outcome, and the income increase you can project. Top partners combine every phase — average Year-1 income: $48K–$102K.
            </p>
          </div>

          {/* ── YOUR FIRST 30 DAYS ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Target size={18} color="#22c55e" /> Your First 30 Days — 8 Specific Actions
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12 }}>
              {FIRST_30_STEPS.map((step, i) => (
                <div key={i} style={{
                  background: "#1a1d27″, borderRadius: 12, border: `1px solid ${step.color}25`,
                  padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${step.color}15`, border: `1px solid ${step.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: step.color,
                  }}>
                    {step.day.replace("Day ", "D")}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#e5e7eb", marginBottom: 4 }}>{step.action}</div>
                    <div style={{ fontSize: 11, color: step.color, fontWeight: 600 }}>{step.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Phase Selector */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {PHASES.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: activePhase === p.id ? `1px solid ${p.color}` : "1px solid #1e2330″,
                  background: activePhase === p.id ? p.accent : "#1a1d27″,
                  color: activePhase === p.id ? p.color : "#6b7280″,
                  fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.15s",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
                }}
              >
                <span>{p.label}</span>
                <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>{p.subtitle}</span>
              </button>
            ))}
          </div>

          <div style={{
            background: phase.accent,
            border: `1px solid ${phase.color}30`,
            borderRadius: 12, padding: "16px 20px",
            marginBottom: 20,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <Calendar size={18} color={phase.color} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: phase.color }}>{phase.label}: {phase.subtitle}</div>
              <div style={{ fontSize: 12, color: "#6b7280″, marginTop: 2 }}>
                {activePhase === "week1″ && "3 milestones — complete all within your first 7 days to maximize early momentum"}
                {activePhase === "month1″ && "3 milestones — hit these to lock in Tier 2 rates and your first passive income stream"}
                {activePhase === "month3″ && "3 milestones — L2 network and origination rights compound your passive income"}
                {activePhase === "year1″ && "3 milestones — full network, passive income projection, and lifetime rate lock"}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {milestones.map((m, i) => (
              <MilestoneCard key={i} milestone={m} color={phase.color} accent={phase.accent} />
            ))}
          </div>

          {/* ── NETWORK MULTIPLIER ── */}
          <section style={{ marginBottom: 40 }}>
            <NetworkMultiplier />
          </section>

          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Layers size={18} color="#22c55e" /> Your 5 Income Streams
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12 }}>
              {INCOME_STREAMS.map((s, i) => (
                <div key={i} style={{ background: "#1a1d27″, borderRadius: 12, border: "1px solid #1e2330", padding: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{s.label}</div>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280″, marginBottom: 10 }}>{s.desc}</div>
                  {s.rates.map((r, ri) => (
                    <div key={ri} style={{ fontSize: 12, color: s.color, fontWeight: 600, marginBottom: 3 }}>• {r}</div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 40 }}>
            <IncomeCalculator />
          </section>

          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Zap size={18} color="#f59e0b" /> Fastest Wins Right Now
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12 }}>
              {[
                { icon: Clock, color: "#ef4444″, title: "Respond in 15 minutes", body: "Leads contacted within 15 min convert at 60% vs 17% after 1 hour. Enable push notifications now." },
                { icon: Camera, color: "#3b82f6″, title: "10+ work photos = 3× matches", body: "Pros with a full photo gallery get 3× more lead routes. Spend 20 minutes adding past project photos today." },
                { icon: Users, color: "#a855f7″, title: "One recruit text today", body: "The recruiting message that converts: tell a colleague you're getting leads from it and it’s $149/mo flat. Honest peer tone wins." },
                { icon: Star, color: "#f59e0b", title: "Text for reviews immediately", body: "Send a review request within 24 hours. Every 0.5 stars higher = 15% more matches. This compounds." },
                { icon: Home, color: "#22c55e", title: "Log every home address", body: "45 seconds after each job. Every home logged = permanent origination rights forever. Don't skip this." },
                { icon: TrendingUp, color: "#ec4899″, title: "Advance tier before month-end", body: "If you're 2–3 recruits from a tier upgrade, sprint to close it before the 28th. Locks in higher rates all next month." },
              ].map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div key={i} style={{ background: "#1a1d27″, borderRadius: 12, border: "1px solid #1e2330", padding: 18, display: "flex", gap: 14 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${tip.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={18} color={tip.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{tip.title}</div>
                      <div style={{ fontSize: 12, color: "#6b7280″, lineHeight: 1.55 }}>{tip.body}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div style={{
            background: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(59,130,246,0.08) 100%)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 18, padding: 36, textAlign: "center",
          }}>
            <Lock size={20} color="#22c55e" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
              Lock in Founding Rates While Spots Remain
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 24px", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              $149/mo locked for life. Founding Partners get the highest override rates, earliest territory access, and permanent rate protection as the platform scales.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/founding-partner">
                <button style={{
                  background: "#22c55e", color: "#fff", border: "none",
                  borderRadius: 10, padding: "13px 28px", fontSize: 14,
                  fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  Claim Your Founding Spot <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/resources/academy">
                <button style={{
                  background: "transparent", color: "#9ca3af",
                  border: "1px solid #374151″, borderRadius: 10,
                  padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}>
                  Go to ProLnk Academy
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
