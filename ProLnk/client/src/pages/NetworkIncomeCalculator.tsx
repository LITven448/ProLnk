import { useState, useMemo } from "react";
import {
  Network, DollarSign, Users, TrendingUp, ChevronRight, Zap,
} from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0A1628″,
  surface: "#0F1E35″,
  card: "#162540″,
  border: "#1E3050″,
  text: "#F0F2FF",
  muted: "#7A8BA8″,
  dim: "#3A5070″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  teal: "#14B8A6″,
  blue: "#3B82F6″,
  purple: "#A855F7″,
};

function Slider({
  min, max, value, onChange, color = D.cyan, step = 1,
}: {
  min: number; max: number; value: number; onChange: (v: number) => void;
  color?: string; step?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="relative h-6 flex items-center">
      <div className="absolute inset-x-0 h-1.5 rounded-full" style={{ background: D.dim }} />
      <div className="absolute left-0 h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
        style={{ height: "24px" }}
      />
      <div
        className="absolute w-5 h-5 rounded-full shadow-lg"
        style={{ left: `calc(${pct}% - 10px)`, background: color, border: "2px solid #0A1628″, pointerEvents: "none" }}
      />
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

const PLATFORM_FEE = 0.10;
const KEEP_RATE = 0.72;

const LEVELS = [
  { label: "Level 1″,  rate: 0.07, color: D.cyan,   desc: "Your direct recruits" },
  { label: "Level 2″,  rate: 0.04, color: D.blue,   desc: "Their recruits" },
  { label: "Level 3″,  rate: 0.02, color: D.purple, desc: "Level 3 network" },
  { label: "Level 4″,  rate: 0.01, color: D.teal,   desc: "Level 4 network" },
];

export default function NetworkIncomeCalculator() {
  const [l1Recruits, setL1Recruits] = useState(5);
  const [l1Jobs, setL1Jobs]         = useState(8);
  const [avgJob, setAvgJob]         = useState(3000);
  const [l2Recruits, setL2Recruits] = useState(15);
  const [l2Jobs, setL2Jobs]         = useState(5);

  const calc = useMemo(() => {
    const feePerJob = avgJob * PLATFORM_FEE;
    const l1 = l1Recruits * l1Jobs * feePerJob * KEEP_RATE * LEVELS[0].rate;
    const l2 = l2Recruits * l2Jobs * feePerJob * KEEP_RATE * LEVELS[1].rate;
    const l3 = l2Recruits * 2 * l2Jobs * 0.8 * feePerJob * KEEP_RATE * LEVELS[2].rate;
    const l4 = l2Recruits * 4 * l2Jobs * 0.5 * feePerJob * KEEP_RATE * LEVELS[3].rate;
    const total = l1 + l2 + l3 + l4;
    return { l1, l2, l3, l4, total, annual: total * 12 };
  }, [l1Recruits, l1Jobs, avgJob, l2Recruits, l2Jobs]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: D.bg, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Nav bar */}
      <div className="flex items-center justify-between px-6 py-4″ style={{ borderBottom: `1px solid ${D.border}` }}>
        <div className="flex items-center gap-2″>
          <Network className="w-5 h-5″ style={{ color: D.cyan }} />
          <span className="text-sm font-black" style={{ color: D.text }}>ProLnk</span>
          <span className="text-sm" style={{ color: D.dim }}>/ Network Income Calculator</span>
        </div>
        <Link href="/founding-partner">
          <div className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: D.cyan, color: "#0A1628″ }}>
            Join Now <ChevronRight className="w-3.5 h-3.5″ />
          </div>
        </Link>
      </div>

      {/* Hero */}
      <div className="text-center pt-12 pb-10 px-6″>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold"
          style={{ background: `${D.cyan}15`, color: D.cyan, border: `1px solid ${D.cyan}30` }}>
          <Zap className="w-3.5 h-3.5″ /> Passive Income Engine
        </div>
        <h1 className="text-4xl font-black mb-3″ style={{ color: D.text }}>
          Network Income Calculator
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: D.muted }}>
          What does your network pay you?
        </p>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8″>

        {/* Left: Inputs */}
        <div className="space-y-6″>
          <div className="rounded-2xl p-6″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <div className="flex items-center gap-2 mb-6″>
              <Users className="w-5 h-5″ style={{ color: D.cyan }} />
              <h2 className="text-base font-bold" style={{ color: D.text }}>Your Network</h2>
            </div>

            <div className="space-y-6″>

              {/* L1 Recruits */}
              <div>
                <div className="flex items-center justify-between mb-2″>
                  <label className="text-sm font-semibold" style={{ color: D.text }}>Your direct recruits</label>
                  <span className="text-lg font-black" style={{ color: D.cyan }}>{l1Recruits}</span>
                </div>
                <Slider min={1} max={20} value={l1Recruits} onChange={setL1Recruits} color={D.cyan} />
                <div className="flex justify-between mt-1″>
                  <span className="text-xs" style={{ color: D.dim }}>1</span>
                  <span className="text-xs" style={{ color: D.dim }}>20</span>
                </div>
              </div>

              {/* Avg jobs */}
              <div>
                <div className="flex items-center justify-between mb-2″>
                  <label className="text-sm font-semibold" style={{ color: D.text }}>Their avg monthly jobs</label>
                  <span className="text-lg font-black" style={{ color: D.blue }}>{l1Jobs}</span>
                </div>
                <Slider min={1} max={20} value={l1Jobs} onChange={setL1Jobs} color={D.blue} />
                <div className="flex justify-between mt-1″>
                  <span className="text-xs" style={{ color: D.dim }}>1</span>
                  <span className="text-xs" style={{ color: D.dim }}>20</span>
                </div>
              </div>

              {/* Avg job value */}
              <div>
                <div className="flex items-center justify-between mb-2″>
                  <label className="text-sm font-semibold" style={{ color: D.text }}>Avg job value</label>
                  <span className="text-lg font-black" style={{ color: D.amber }}>${avgJob.toLocaleString()}</span>
                </div>
                <Slider min={1000} max={20000} value={avgJob} onChange={setAvgJob} color={D.amber} step={500} />
                <div className="flex justify-between mt-1″>
                  <span className="text-xs" style={{ color: D.dim }}>$1K</span>
                  <span className="text-xs" style={{ color: D.dim }}>$20K</span>
                </div>
              </div>

              {/* L2 recruits */}
              <div>
                <div className="flex items-center justify-between mb-2″>
                  <label className="text-sm font-semibold" style={{ color: D.text }}>Level 2 recruits (total)</label>
                  <span className="text-lg font-black" style={{ color: D.purple }}>{l2Recruits}</span>
                </div>
                <Slider min={0} max={50} value={l2Recruits} onChange={setL2Recruits} color={D.purple} />
                <div className="flex justify-between mt-1″>
                  <span className="text-xs" style={{ color: D.dim }}>0</span>
                  <span className="text-xs" style={{ color: D.dim }}>50</span>
                </div>
              </div>

              {/* L2 avg jobs */}
              <div>
                <div className="flex items-center justify-between mb-2″>
                  <label className="text-sm font-semibold" style={{ color: D.text }}>Level 2 avg monthly jobs</label>
                  <span className="text-lg font-black" style={{ color: D.teal }}>{l2Jobs}</span>
                </div>
                <Slider min={1} max={15} value={l2Jobs} onChange={setL2Jobs} color={D.teal} />
                <div className="flex justify-between mt-1″>
                  <span className="text-xs" style={{ color: D.dim }}>1</span>
                  <span className="text-xs" style={{ color: D.dim }}>15</span>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="rounded-2xl p-5″ style={{ background: `${D.cyan}08`, border: `1px solid ${D.cyan}20` }}>
            <p className="text-xs font-bold mb-3″ style={{ color: D.cyan }}>HOW IT CALCULATES</p>
            <p className="text-xs leading-relaxed" style={{ color: D.muted }}>
              Each job flows 10% platform fee → you keep 72% → then network override applies by level.
              {" "}<strong style={{ color: D.text }}>L1 = 7% of the fee pool</strong>, L2 = 4%, L3 = 2%, L4 = 1%.
              Your passive income compounds as your recruits recruit.
            </p>
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-5″>

          {/* Total passive income */}
          <div className="rounded-2xl p-6 text-center" style={{
            background: `linear-gradient(135deg, ${D.cyan}10, ${D.teal}10)`,
            border: `1px solid ${D.cyan}40`,
          }}>
            <p className="text-sm font-semibold mb-2″ style={{ color: D.muted }}>Total Passive Monthly Income</p>
            <div className="text-6xl font-black mb-1″ style={{ color: D.cyan }}>
              {fmt(calc.total)}
            </div>
            <p className="text-sm" style={{ color: D.muted }}>
              <strong style={{ color: D.green }}>{fmt(calc.annual)}</strong> annually from your network alone
            </p>
          </div>

          {/* Level breakdown */}
          <div className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <div className="px-5 py-3″ style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>Income Breakdown by Level</span>
            </div>
            <div className="divide-y" style={{ borderColor: D.border }}>
              {LEVELS.map((lv, i) => {
                const income = [calc.l1, calc.l2, calc.l3, calc.l4][i];
                const pct = calc.total > 0 ? Math.round((income / calc.total) * 100) : 0;
                return (
                  <div key={lv.label} className="px-5 py-4″>
                    <div className="flex items-center justify-between mb-2″>
                      <div>
                        <span className="text-sm font-bold" style={{ color: lv.color }}>{lv.label}</span>
                        <span className="text-xs ml-2″ style={{ color: D.muted }}>{lv.desc}</span>
                        <span className="text-xs ml-1″ style={{ color: D.dim }}>({(lv.rate * 100).toFixed(0)}% rate)</span>
                      </div>
                      <span className="text-base font-black" style={{ color: lv.color }}>{fmt(income)}/mo</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${lv.color}15` }}>
                      <div className="h-full rounded-full transition-all duration-500″ style={{ width: `${pct}%`, background: lv.color }} />
                    </div>
                    <p className="text-xs mt-1 text-right" style={{ color: D.dim }}>{pct}% of total</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Annual projection */}
          <div className="grid grid-cols-2 gap-4″>
            {[
              { label: "Monthly passive",  value: fmt(calc.total),  color: D.cyan,  icon: DollarSign },
              { label: "Annual passive",   value: fmt(calc.annual), color: D.green, icon: TrendingUp },
            ].map(stat => (
              <div key={stat.label} className="rounded-2xl p-4 flex flex-col gap-2″
                style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}25` }}>
                <stat.icon className="w-4 h-4″ style={{ color: stat.color }} />
                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs" style={{ color: D.muted }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Benchmark */}
          <div className="rounded-2xl p-4 flex items-start gap-3″ style={{ background: `${D.amber}08`, border: `1px solid ${D.amber}25` }}>
            <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0″ style={{ color: D.amber }} />
            <div>
              <p className="text-sm font-bold mb-0.5″ style={{ color: D.amber }}>Top Performer Benchmark</p>
              <p className="text-xs" style={{ color: D.muted }}>
                Top 10% of ProLnk Charter members earn <strong style={{ color: D.text }}>$4,200+/month</strong> from their network alone — before counting their own direct commissions.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${D.cyan}12, ${D.blue}12)`, border: `1px solid ${D.cyan}35` }}>
            <Network className="w-10 h-10 mx-auto mb-3″ style={{ color: D.cyan }} />
            <h3 className="text-lg font-black mb-1″ style={{ color: D.text }}>Build This Network</h3>
            <p className="text-sm mb-5″ style={{ color: D.muted }}>
              Charter spots are limited to 25 total. Lock in your position and start recruiting before launch.
            </p>
            <Link href="/founding-partner">
              <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-bold cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: D.cyan, color: "#0A1628″ }}>
                Join as Charter Partner
                <ChevronRight className="w-4 h-4″ />
              </div>
            </Link>
            <p className="text-xs mt-3″ style={{ color: D.dim }}>$149/mo — locked for life at Charter rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
