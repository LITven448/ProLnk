import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DataTable, ProgressBar } from "@/components/DashboardShared";
import {
  FlaskConical, Play, CheckCircle, Clock, TrendingUp,
  Plus, ChevronRight, Award, Target, BarChart2, AlertTriangle,
} from "lucide-react";

const ACTIVE_TESTS = [
  {
    id: 1,
    name: "Onboarding CTA Button",
    hypothesis: "Urgency-framed CTAs will increase founding partner signups by 15%",
    variantA: "Join ProLnk Network",
    variantB: "Claim Your Founding Spot",
    sampleSize: 2840,
    daysRunning: 12,
    winner: "B",
    confidence: 68,
    metric: "CTA Click-through Rate",
    rateA: 6.4,
    rateB: 8.1,
    status: "running",
  },
  {
    id: 2,
    name: "Lead Notification SMS",
    hypothesis: "Urgency framing in SMS will increase lead acceptance rate by 10%",
    variantA: "Standard: \"New lead available in your area\"",
    variantB: "Urgency: \"Hot lead — 3 pros competing, respond now\"",
    sampleSize: 1120,
    daysRunning: 8,
    winner: null,
    confidence: 41,
    metric: "Lead Acceptance Rate",
    rateA: 22.3,
    rateB: 24.1,
    status: "running",
  },
  {
    id: 3,
    name: "Partner Profile Completeness Nudge",
    hypothesis: "In-app nudges outperform email for profile completion tasks",
    variantA: "Email reminder sequence (3-day drip)",
    variantB: "In-app banner with progress bar",
    sampleSize: 3560,
    daysRunning: 21,
    winner: "B",
    confidence: 81,
    metric: "Profile Completion Rate",
    rateA: 34.2,
    rateB: 51.7,
    status: "running",
  },
];

const COMPLETED_TESTS = [
  { name: "Founding Tier Landing Page Hero", winner: "Variant B", lift: "+22%", date: "Apr 28, 2026″, applied: true },
  { name: "Pro Waitlist Form Fields", winner: "Variant A", lift: "+9%", date: "Apr 15, 2026″, applied: true },
  { name: "Email Subject: Welcome Flow", winner: "Variant B", lift: "+31%", date: "Apr 2, 2026″, applied: true },
  { name: "Homeowner Signup CTA Color", winner: "Variant A", lift: "+14%", date: "Mar 22, 2026″, applied: true },
  { name: "Admin Dashboard Layout", winner: "Variant A", lift: "+7%", date: "Mar 10, 2026″, applied: false },
  { name: "Commission Tooltip Copy", winner: "Variant B", lift: "+18%", date: "Feb 28, 2026″, applied: true },
  { name: "Network Tree Visualization", winner: "Variant B", lift: "+44%", date: "Feb 14, 2026″, applied: true },
  { name: "Mobile Nav Placement", winner: "Variant A", lift: "+11%", date: "Jan 30, 2026″, applied: true },
];

const COMPONENTS = [
  "Landing Page — Hero",
  "Landing Page — CTA",
  "Signup Form",
  "Email Template",
  "SMS Template",
  "Dashboard Widget",
  "Onboarding Step",
  "Partner Profile",
  "Notification Banner",
  "Pricing Display",
];

const METRICS = [
  "Signup Conversion Rate",
  "CTA Click-through Rate",
  "Email Open Rate",
  "SMS Response Rate",
  "Profile Completion Rate",
  "Lead Acceptance Rate",
  "Session Duration",
  "Day-7 Retention",
];

function ConfidenceBar({ confidence, winner }: { confidence: number; winner: string | null }) {
  const color =
    confidence >= 95 ? D.green :
    confidence >= 80 ? D.cyan :
    confidence >= 60 ? D.amber :
    D.muted;

  const label =
    confidence >= 95 ? "Statistically significant" :
    confidence >= 80 ? "Likely significant — monitor" :
    confidence >= 60 ? "Trending — too early to conclude" :
    "Too early to call";

  return (
    <div className="space-y-1.5″>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color }}>{confidence}% confidence</span>
        <span className="text-xs" style={{ color: D.muted }}>{label}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: D.border }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${confidence}%`, background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  );
}

function StatSigCalc() {
  const [rateA, setRateA] = useState("6.4″);
  const [rateB, setRateB] = useState("8.1″);
  const [nA, setNA] = useState("1420″);
  const [nB, setNB] = useState("1420″);

  const calculate = () => {
    const ra = parseFloat(rateA) / 100;
    const rb = parseFloat(rateB) / 100;
    const na = parseInt(nA);
    const nb = parseInt(nB);
    if (isNaN(ra) || isNaN(rb) || isNaN(na) || isNaN(nb) || na < 1 || nb < 1) return null;
    const pooled = (ra * na + rb * nb) / (na + nb);
    if (pooled <= 0 || pooled >= 1) return null;
    const se = Math.sqrt(pooled * (1 - pooled) * (1 / na + 1 / nb));
    if (se === 0) return null;
    const z = Math.abs(rb - ra) / se;
    const pApprox = Math.max(0, Math.min(1, 1 - Math.exp(-0.717 * z - 0.416 * z * z)));
    const confidence = Math.round(pApprox * 100);
    const lift = ra > 0 ? Math.round(((rb - ra) / ra) * 100) : 0;
    return { z: z.toFixed(2), confidence, lift, significant: confidence >= 95 };
  };

  const result = calculate();

  return (
    <div className="rounded-2xl p-6 space-y-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
      <div className="flex items-center gap-3 mb-1″>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${D.purple}20` }}>
          <BarChart2 className="w-5 h-5″ style={{ color: D.purple }} />
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: D.text }}>Statistical Significance Calculator</p>
          <p className="text-xs" style={{ color: D.muted }}>Enter conversion rates and sample sizes to evaluate significance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4″>
        <div className="space-y-1.5″>
          <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>Variant A rate (%)</label>
          <input
            type="number"
            value={rateA}
            onChange={e => setRateA(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm"
            style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
            placeholder="6.4″
          />
        </div>
        <div className="space-y-1.5″>
          <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>Variant B rate (%)</label>
          <input
            type="number"
            value={rateB}
            onChange={e => setRateB(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm"
            style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
            placeholder="8.1″
          />
        </div>
        <div className="space-y-1.5″>
          <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>Sample A</label>
          <input
            type="number"
            value={nA}
            onChange={e => setNA(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm"
            style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
            placeholder="1420″
          />
        </div>
        <div className="space-y-1.5″>
          <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>Sample B</label>
          <input
            type="number"
            value={nB}
            onChange={e => setNB(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-sm"
            style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
            placeholder="1420″
          />
        </div>
      </div>

      {result && (
        <div
          className="rounded-xl p-4 space-y-2″
          style={{
            background: result.significant ? `${D.green}10` : `${D.amber}10`,
            border: `1px solid ${result.significant ? D.green : D.amber}40`,
          }}
        >
          <div className="flex items-center gap-2″>
            {result.significant
              ? <CheckCircle className="w-4 h-4″ style={{ color: D.green }} />
              : <AlertTriangle className="w-4 h-4″ style={{ color: D.amber }} />
            }
            <span className="text-sm font-bold" style={{ color: result.significant ? D.green : D.amber }}>
              {result.significant
                ? "Statistically significant at 95% confidence"
                : `Not yet significant — ${result.confidence}% confidence`}
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: D.muted }}>
            <span>Z-score: <span style={{ color: D.text }}>{result.z}</span></span>
            <span>Lift: <span style={{ color: result.lift > 0 ? D.green : D.red }}>{result.lift > 0 ? "+" : ""}{result.lift}%</span></span>
            <span>Confidence: <span style={{ color: D.cyan }}>{result.confidence}%</span></span>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateTestForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "", component: "", variantA: "", variantB: "", metric: "", sampleTarget: "",
  });

  const field = (key: keyof typeof form, label: string, placeholder: string, type = "text") => (
    <div className="space-y-1.5″>
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.muted }}>{label}</label>
      {key === "component" ? (
        <select
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl text-sm"
          style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
        >
          <option value="">Select component…</option>
          {COMPONENTS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      ) : key === "metric" ? (
        <select
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl text-sm"
          style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
        >
          <option value="">Select metric…</option>
          {METRICS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl text-sm"
          style={{ background: D.surface, border: `1px solid ${D.borderHi}`, color: D.text }}
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="rounded-2xl p-6 space-y-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3″>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${D.cyan}20` }}>
            <Plus className="w-5 h-5″ style={{ color: D.cyan }} />
          </div>
          <p className="font-bold text-sm" style={{ color: D.text }}>Create New Test</p>
        </div>
        <button onClick={onClose} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: D.surface, color: D.muted }}>
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4″>
        {field("name", "Test Name", "e.g. Homepage Hero CTA")}
        {field("component", "Page / Component", "")}
        {field("variantA", "Variant A Description", "Control — current version")}
        {field("variantB", "Variant B Description", "Challenger — proposed change")}
        {field("metric", "Primary Metric", "")}
        {field("sampleTarget", "Sample Size Target", "e.g. 2000″, "number")}
      </div>

      <button
        className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
        style={{ background: `linear-gradient(135deg, ${D.cyan}cc, ${D.purple}cc)`, color: "#fff" }}
        onClick={() => onClose()}
      >
        Launch Test
      </button>
    </div>
  );
}

export default function ABTestingCenter() {
  const [showCreate, setShowCreate] = useState(false);

  const completedRows = COMPLETED_TESTS.map(t => ({
    name: t.name,
    winner: <span style={{ color: D.cyan }}>{t.winner}</span>,
    lift: <span style={{ color: D.green, fontWeight: 600 }}>{t.lift}</span>,
    date: t.date,
    applied: t.applied
      ? <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${D.green}20`, color: D.green }}>Applied</span>
      : <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${D.amber}20`, color: D.amber }}>Pending</span>,
  }));

  return (
    <AdminLayout>
      <div className="min-h-screen p-6 space-y-8″ style={{ background: D.bg, fontFamily: "'Inter', sans-serif" }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4″>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${D.cyan}30, ${D.purple}30)`, border: `1px solid ${D.cyan}40` }}
            >
              <FlaskConical className="w-6 h-6″ style={{ color: D.cyan }} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: D.text }}>A/B Testing Center</h1>
              <p className="text-sm" style={{ color: D.muted }}>Optimize every touchpoint with data</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: `linear-gradient(135deg, ${D.cyan}cc, ${D.purple}cc)`, color: "#fff" }}
            onClick={() => setShowCreate(!showCreate)}
          >
            <Plus className="w-4 h-4″ />
            New Test
          </button>
        </div>

        {/* Impact banner */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4″
          style={{ background: `linear-gradient(135deg, ${D.green}12, ${D.cyan}12)`, border: `1px solid ${D.green}30` }}
        >
          <TrendingUp className="w-5 h-5 flex-shrink-0″ style={{ color: D.green }} />
          <p className="text-sm" style={{ color: D.text }}>
            <span className="font-bold" style={{ color: D.green }}>A/B tests have improved platform conversion by an estimated 34% this year.</span>
            {" "}8 completed tests, 6 applied to production.
          </p>
        </div>

        {/* Metric row */}
        <div className="grid grid-cols-4 gap-4″>
          <MetricCard label="Active Tests" value="3″ sub="Running now" color={D.cyan} icon={<Play className="w-4 h-4" />} />
          <MetricCard label="Completed" value="8″ sub="All time" color={D.green} icon={<CheckCircle className="w-4 h-4" />} />
          <MetricCard label="Avg Confidence" value="63%" sub="Across active tests" color={D.amber} icon={<Target className="w-4 h-4″ />} />
          <MetricCard label="Avg Lift (Won)" value="+19%" sub="Applied tests" color={D.purple} icon={<Award className="w-4 h-4″ />} />
        </div>

        {/* Create form */}
        {showCreate && <CreateTestForm onClose={() => setShowCreate(false)} />}

        {/* Active tests */}
        <div>
          <SectionHeader
            title="Active Tests"
            subtitle="3 experiments currently running"
            action={
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${D.cyan}20`, color: D.cyan }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: D.cyan }} />
                Live
              </div>
            }
          />
          <div className="space-y-4″>
            {ACTIVE_TESTS.map(test => (
              <div
                key={test.id}
                className="rounded-2xl p-6 space-y-5″
                style={{ background: D.card, border: `1px solid ${D.border}` }}
              >
                {/* Test header */}
                <div className="flex items-start justify-between gap-4″>
                  <div className="flex-1″>
                    <div className="flex items-center gap-2 mb-1″>
                      <span className="text-base font-bold" style={{ color: D.text }}>{test.name}</span>
                      {test.confidence >= 80 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${D.amber}20`, color: D.amber }}>
                          {test.confidence >= 95 ? "Declare Winner?" : "Ready to Conclude?"}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: D.muted }}>{test.hypothesis}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: D.muted }}>
                    <Clock className="w-3.5 h-3.5″ />
                    {test.daysRunning} days
                  </div>
                </div>

                {/* Variants */}
                <div className="grid grid-cols-2 gap-3″>
                  {[
                    { label: "A", desc: test.variantA, rate: test.rateA, isWinner: test.winner === "A" },
                    { label: "B", desc: test.variantB, rate: test.rateB, isWinner: test.winner === "B" },
                  ].map(v => (
                    <div
                      key={v.label}
                      className="rounded-xl p-4 space-y-2″
                      style={{
                        background: D.surface,
                        border: `1px solid ${v.isWinner && test.winner ? D.cyan : D.border}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Variant {v.label}</span>
                        {v.isWinner && test.winner && (
                          <span className="text-xs font-bold" style={{ color: D.cyan }}>Leading</span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: D.text }}>{v.desc}</p>
                      <p className="text-xl font-black" style={{ color: v.isWinner && test.winner ? D.cyan : D.text }}>
                        {v.rate}%
                      </p>
                      <p className="text-xs" style={{ color: D.muted }}>{test.metric}</p>
                    </div>
                  ))}
                </div>

                {/* Confidence + sample */}
                <div className="space-y-3″>
                  <ConfidenceBar confidence={test.confidence} winner={test.winner} />
                  <div className="flex items-center justify-between text-xs" style={{ color: D.muted }}>
                    <span>Sample size: <span style={{ color: D.text }}>{test.sampleSize.toLocaleString()}</span></span>
                    {test.winner
                      ? <span>Variant <span style={{ color: D.cyan }}>{test.winner}</span> currently leading</span>
                      : <span>Too early to call</span>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistical significance calculator */}
        <StatSigCalc />

        {/* Completed tests */}
        <div>
          <SectionHeader title="Completed Tests" subtitle="Historical test results and applied learnings" />
          <DataTable
            columns={[
              { key: "name", label: "Test Name" },
              { key: "winner", label: "Winner" },
              { key: "lift", label: "Lift", align: "center" },
              { key: "date", label: "Concluded", align: "center" },
              { key: "applied", label: "Status", align: "center" },
            ]}
            rows={completedRows}
            accentCol="name"
          />
        </div>

      </div>
    </AdminLayout>
  );
}
