import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DonutChart, BarChart, DCard, StatusBadge } from "@/components/DashboardShared";
import { MessageSquare, ToggleLeft, ToggleRight, Send, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const NPS_TREND = [
  { month: "Dec",  score: 54 },
  { month: "Jan",  score: 61 },
  { month: "Feb",  score: 58 },
  { month: "Mar",  score: 65 },
  { month: "Apr",  score: 69 },
  { month: "May",  score: 72 },
];

const RESPONSES = [
  { score: 10, name: "James Holbrook",   partner: "Smith Home Services", date: "May 13", comment: "ProLnk has completely changed how I find clients. Match quality is outstanding." },
  { score: 9,  name: "Linda Parrish",    partner: "Homeowner",           date: "May 12", comment: "Found a great plumber within hours. The process was seamless and professional." },
  { score: 9,  name: "Carlos Medina",    partner: "ProFix Dallas",       date: "May 12", comment: "Commission payouts are always on time. Best platform I\'ve used in 10 years." },
  { score: 8,  name: "Stacy Wu",         partner: "Homeowner",           date: "May 11", comment: "Easy to use, great selection of contractors. Would recommend to friends." },
  { score: 7,  name: "Tom Ashford",      partner: "Reliable Pro Group",  date: "May 11", comment: "Good platform overall but onboarding steps could be clearer." },
  { score: 7,  name: "Rachel Kim",       partner: "Homeowner",           date: "May 10", comment: "Service was okay. Expected faster initial response times from contractors." },
  { score: 5,  name: "Marcus Bell",      partner: "TrustHome FW",        date: "May 10", comment: "Lead volume is lower than expected this month. Hope it picks up." },
  { score: 4,  name: "Donna Fletcher",   partner: "Homeowner",           date: "May 9",  comment: "Had trouble finding a licensed electrician in my area. Limited availability." },
  { score: 3,  name: "Neil Patel",       partner: "ProLnk FW West",      date: "May 9",  comment: "Lead quality dropped this month — too many homeowners not responding." },
  { score: 2,  name: "Cynthia Brooks",   partner: "Homeowner",           date: "May 8",  comment: "No contractor responded within 48h. Very frustrating experience." },
];

const SURVEY_SETTINGS = [
  { key: "after_job",    label: "Send after job completion", desc: "Triggers 24h post job close",      defaultOn: true  },
  { key: "monthly_pro",  label: "Monthly partner digest",    desc: "Sent 1st of each month to pros",   defaultOn: true  },
  { key: "quarterly_hw", label: "Quarterly homeowner check", desc: "Every 90 days to homeowners",      defaultOn: false },
];

const DELAYS = [3, 7, 14];

function scoreColor(s: number) {
  if (s >= 9) return D.green;
  if (s >= 7) return D.amber;
  return D.red;
}

function scoreCategory(s: number): string {
  if (s >= 9) return "Promoter";
  if (s >= 7) return "Passive";
  return "Detractor";
}

function NPSGauge({ score }: { score: number }) {
  const normalized = (score + 100) / 200;
  const cx = 100, cy = 100, r = 75;

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

  const needleTip = polarToCartesian(-180 + normalized * 180);
  const gaugeColor = score >= 50 ? D.green : score >= 0 ? D.amber : D.red;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 70 200 100">
        {arcPath(-180, -120, D.red)}
        {arcPath(-120, -60, D.amber)}
        {arcPath(-60, 0, D.green)}
        <line x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y} stroke={D.text} strokeWidth="3" strokeLinecap="round" />
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
  const [delay, setDelay] = useState(7);
  const [bulkSent, setBulkSent] = useState(false);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6" style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>NPS Survey Manager</h1>
            <p className="text-sm mt-1" style={{ color: D.muted }}>Net Promoter Score tracking, verbatim responses, and automated survey settings</p>
          </div>
          <button
            onClick={() => setBulkSent(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: bulkSent ? `${D.green}20` : D.cyan,
              color: bulkSent ? D.green : "#fff",
              border: bulkSent ? `1px solid ${D.green}40` : "none",
            }}
          >
            <Send className="w-4 h-4" />
            {bulkSent ? "Surveys Sent!" : "Send to All Active Partners"}
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="NPS Score"       value="72"    sub="Excellent — top 15%"   trend={4}  color={D.green}  />
          <MetricCard label="Responses / Mo"  value="147"   sub="Up from 118 last mo"   trend={12} color={D.cyan}   />
          <MetricCard label="Promoters"        value="68%"   sub="Score 9-10"            trend={3}  color={D.purple} />
          <MetricCard label="Detractors"       value="8%"    sub="Score 0-6"             trend={-2} color={D.red}    />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DCard>
            <SectionHeader title="Score Overview" subtitle="Current NPS gauge and segment breakdown" />
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <NPSGauge score={72} />
              <DonutChart
                size={130}
                segments={[
                  { label: "Promoters (9-10)", value: 68, color: D.green },
                  { label: "Passives (7-8)",   value: 24, color: D.amber },
                  { label: "Detractors (0-6)", value: 8,  color: D.red   },
                ]}
              />
            </div>
          </DCard>

          <DCard>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" style={{ color: D.cyan }} />
              <span className="font-bold text-sm" style={{ color: D.text }}>NPS Trend — Last 6 Months</span>
            </div>
            <p className="text-xs mb-4" style={{ color: D.muted }}>Monthly NPS score trajectory</p>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={NPS_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke={D.border} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[40, 80]}
                  tick={{ fill: D.muted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: D.surface, border: "none", borderRadius: 10, color: D.text, fontSize: 12 }}
                  formatter={(v: number) => [v, "NPS"]}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke={D.cyan}
                  strokeWidth={2.5}
                  dot={{ fill: D.cyan, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </DCard>
        </div>

        <DCard>
          <SectionHeader title="Recent Responses" subtitle="Last 10 survey submissions with score, comment, and respondent" />
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Score", "Category", "Respondent", "Partner / Role", "Date", "Comment"].map(h => (
                    <th key={h} style={{
                      textAlign: "left", padding: "8px 12px",
                      color: D.muted, fontWeight: 700, fontSize: 11,
                      borderBottom: `1px solid ${D.border}`,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RESPONSES.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${D.border}` }}>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black"
                        style={{ background: `${scoreColor(r.score)}20`, color: scoreColor(r.score) }}
                      >{r.score}</span>
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-lg"
                        style={{
                          background: `${scoreColor(r.score)}18`,
                          color: scoreColor(r.score),
                        }}
                      >{scoreCategory(r.score)}</span>
                    </td>
                    <td style={{ padding: "10px 12px", color: D.text, fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: "10px 12px", color: D.muted }}>{r.partner}</td>
                    <td style={{ padding: "10px 12px", color: D.dim, whiteSpace: "nowrap" }}>{r.date}</td>
                    <td style={{ padding: "10px 12px", color: D.text, maxWidth: 360 }}>
                      <span style={{ opacity: 0.85 }}>"{r.comment.length > 90 ? r.comment.slice(0, 90) + "…" : r.comment}"</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DCard>
            <SectionHeader title="Automated Triggers" subtitle="Toggle which events fire a survey" />
            <div className="space-y-3">
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
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 flex-shrink-0" style={{ color: on ? D.cyan : D.dim }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: D.text }}>{s.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: D.muted }}>{s.desc}</p>
                      </div>
                    </div>
                    {on
                      ? <ToggleRight className="w-6 h-6 flex-shrink-0" style={{ color: D.cyan }} />
                      : <ToggleLeft  className="w-6 h-6 flex-shrink-0" style={{ color: D.dim }} />
                    }
                  </div>
                );
              })}
            </div>
          </DCard>

          <DCard>
            <SectionHeader title="Send Delay" subtitle="Days after job completion before survey fires" />
            <div className="flex gap-3 mt-2">
              {DELAYS.map(d => (
                <button
                  key={d}
                  onClick={() => setDelay(d)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: delay === d ? D.cyan : D.surface,
                    color: delay === d ? "#fff" : D.muted,
                    border: `1.5px solid ${delay === d ? D.cyan : D.border}`,
                  }}
                >
                  {d} Days
                </button>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: D.muted }}>
              Currently set to <strong style={{ color: D.cyan }}>{delay} days</strong> post job-close. Applies to all auto-trigger surveys.
            </p>
          </DCard>
        </div>
      </div>
    </AdminLayout>
  );
}
