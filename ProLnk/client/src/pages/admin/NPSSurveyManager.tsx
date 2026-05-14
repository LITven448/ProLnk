import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DonutChart, BarChart, DCard, StatusBadge } from "@/components/DashboardShared";
import { MessageSquare, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";

const WEEKLY_RESPONSES = [
  { label: "Apr 7",  value: 34 },
  { label: "Apr 14", value: 41 },
  { label: "Apr 21", value: 38 },
  { label: "Apr 28", value: 52 },
  { label: "May 5",  value: 47 },
  { label: "May 12", value: 61 },
  { label: "May 19", value: 55 },
  { label: "May 26", value: 63 },
];

const VERBATIMS = [
  { score: 10, date: "May 13", role: "Partner",    sentiment: "success",  text: "ProLnk has completely changed how I find new clients. The match quality is incredible and I trust the leads." },
  { score: 9,  date: "May 12", role: "Homeowner",  sentiment: "success",  text: "Found a great plumber within hours. The whole process was smooth and the contractor was professional." },
  { score: 7,  date: "May 11", role: "Partner",    sentiment: "warning",  text: "Good platform overall but the onboarding steps could be clearer. Took me a while to figure out." },
  { score: 5,  date: "May 10", role: "Homeowner",  sentiment: "warning",  text: "The service was okay but I expected faster response times. The contractor took 2 days to reply." },
  { score: 3,  date: "May 9",  role: "Partner",    sentiment: "error",    text: "Lead quality has dropped this month. Getting a lot of homeowners who don't respond after match." },
];

const SURVEY_SETTINGS = [
  { key: "after_job",  label: "Send after job completion", desc: "Triggers 24h post job close",    defaultOn: true  },
  { key: "monthly_pro",label: "Monthly partner digest",    desc: "Sent 1st of each month to pros", defaultOn: true  },
  { key: "quarterly_hw",label:"Quarterly homeowner survey",desc: "Every 90 days to homeowners",    defaultOn: false },
];

function NPSGauge({ score }: { score: number }) {
  const normalized = (score + 100) / 200;
  const angle = normalized * 180 - 90;
  const gaugeColor = score >= 50 ? D.green : score >= 0 ? D.amber : D.red;
  const cx = 100, cy = 100, r = 75;
  const startAngle = -180;
  const endAngle = 0;

  function polarToCartesian(angle: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, color: string) {
    const s = polarToCartesian(start);
    const e = polarToCartesian(end);
    const large = end - start > 180 ? 1 : 0;
    return (
      <path
        d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`}
        fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
      />
    );
  }

  const needleTip = polarToCartesian(startAngle + normalized * 180);

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 70 200 100">
        {arcPath(-180, -120, D.red)}
        {arcPath(-120, -60,  D.amber)}
        {arcPath(-60,  0,    D.green)}
        <line
          x1={cx} y1={cy}
          x2={needleTip.x} y2={needleTip.y}
          stroke={D.text} strokeWidth="3" strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill={D.text} />
        <text x={cx} y={cy + 28} textAnchor="middle" fontSize="22" fontWeight="900" fill={gaugeColor}>{score}</text>
        <text x={cx} y={cy + 44} textAnchor="middle" fontSize="9" fill={D.muted}>NPS SCORE</text>
        <text x="28" y={cy + 16} fontSize="8" fill={D.red} textAnchor="middle">-100</text>
        <text x="100" y="78" fontSize="8" fill={D.amber} textAnchor="middle">0</text>
        <text x="172" y={cy + 16} fontSize="8" fill={D.green} textAnchor="middle">+100</text>
      </svg>
    </div>
  );
}

export default function NPSSurveyManager() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(SURVEY_SETTINGS.map(s => [s.key, s.defaultOn]))
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div>
          <h1 className="text-2xl font-black" style={{ color: D.text }}>NPS Survey Manager</h1>
          <p className="text-sm mt-1" style={{ color: D.muted }}>Net Promoter Score tracking and feedback management</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="NPS Score"       value="72"    sub="Excellent"           trend={4}  color={D.green}  />
          <MetricCard label="Response Rate"   value="34.2%" sub="Industry avg: 28%"   trend={6}  color={D.cyan}   />
          <MetricCard label="Total Responses" value="391"   sub="Last 30 days"        trend={12} color={D.purple} />
          <MetricCard label="Avg Score"       value="8.6"   sub="out of 10"           trend={2}  color={D.amber}  />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* NPS Gauge + Donut */}
          <DCard>
            <SectionHeader title="Score Overview" subtitle="Current NPS and response breakdown" />
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <NPSGauge score={72} />
              <DonutChart
                size={120}
                segments={[
                  { label: "Promoters (9-10)",  value: 62, color: D.green },
                  { label: "Passives (7-8)",    value: 24, color: D.amber },
                  { label: "Detractors (0-6)",  value: 14, color: D.red },
                ]}
              />
            </div>
          </DCard>

          {/* Weekly response chart */}
          <DCard>
            <SectionHeader title="Weekly Responses" subtitle="Survey completions over last 8 weeks" />
            <BarChart data={WEEKLY_RESPONSES} color={D.cyan} height={160} />
          </DCard>
        </div>

        {/* Recent verbatims */}
        <DCard>
          <SectionHeader title="Recent Verbatims" subtitle="Latest text responses with sentiment" />
          <div className="space-y-3">
            {VERBATIMS.map((v, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex gap-4"
                style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{
                    backgroundColor: v.score >= 9 ? `${D.green}20` : v.score >= 7 ? `${D.amber}20` : `${D.red}20`,
                    color: v.score >= 9 ? D.green : v.score >= 7 ? D.amber : D.red,
                  }}
                >
                  {v.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold" style={{ color: D.muted }}>{v.role}</span>
                    <span className="text-xs" style={{ color: D.dim }}>{v.date}</span>
                    <StatusBadge status={v.sentiment} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: D.text }}>
                    "{v.text.length > 120 ? v.text.slice(0, 120) + "…" : v.text}"
                  </p>
                </div>
                <MessageSquare className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: D.dim }} />
              </div>
            ))}
          </div>
        </DCard>

        {/* Survey settings */}
        <DCard>
          <SectionHeader title="Survey Settings" subtitle="Toggle automated survey triggers" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SURVEY_SETTINGS.map(s => {
              const on = settings[s.key];
              return (
                <div
                  key={s.key}
                  className="rounded-xl p-4 flex items-start justify-between gap-3 cursor-pointer transition-all"
                  style={{
                    backgroundColor: on ? `${D.cyan}10` : D.surface,
                    border: `1px solid ${on ? D.cyan + "40" : D.border}`,
                  }}
                  onClick={() => setSettings(prev => ({ ...prev, [s.key]: !prev[s.key] }))}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: D.text }}>{s.label}</p>
                    <p className="text-xs mt-1" style={{ color: D.muted }}>{s.desc}</p>
                  </div>
                  {on
                    ? <ToggleRight className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: D.cyan }} />
                    : <ToggleLeft  className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: D.dim }} />
                  }
                </div>
              );
            })}
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
