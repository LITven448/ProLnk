import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Target, TrendingUp, Bell, Camera, MessageSquare,
  ChevronRight, Clock, AlertTriangle, Trophy,
  BarChart2,
} from "lucide-react";

const WIN_TREND = [
  { week: "Mar 24", rate: 54 },
  { week: "Apr 1",  rate: 57 },
  { week: "Apr 8",  rate: 61 },
  { week: "Apr 14", rate: 59 },
  { week: "Apr 21", rate: 63 },
  { week: "Apr 28", rate: 66 },
  { week: "May 5",  rate: 65 },
  { week: "May 12", rate: 68 },
];

const FACTORS = [
  { label: "Response time <4 min",   win: 82, color: "#00E676" },
  { label: "Photos included",         win: 78, color: "#00D4FF" },
  { label: "Personalized message",    win: 71, color: "#A855F7" },
  { label: "Standard bid",            win: 61, color: "#FFB300" },
  { label: "Late response (>10 min)", win: 31, color: "#FF4444" },
];

const QUICK_WINS = [
  { icon: Bell,           title: "Enable instant push notifications",            impact: "+8%",  color: "#00D4FF" },
  { icon: Camera,         title: "Always attach 2+ photos to bids",              impact: "+12%", color: "#A855F7" },
  { icon: MessageSquare,  title: "Use homeowner's first name in first message",  impact: "+7%",  color: "#00E676" },
];

const LOST_REASONS = [
  { reason: "Responded after 10 min",  count: 12, color: "#FF4444" },
  { reason: "No photos attached",       count: 8,  color: "#FFB300" },
  { reason: "Generic message",          count: 6,  color: "#8B91A8" },
];

const MOCK_LEAD = {
  homeowner: "Sarah M.",
  address: "2847 Oak Lane, Austin TX",
  service: "HVAC Inspection",
  urgency: "This week",
  budget: "$150–$250",
};

export default function WinRateOptimizer() {
  const [practice, setPractice] = useState(false);
  const [bid, setBid] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 24px", fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#00D4FF22,#00D4FF44)", border: "1px solid #00D4FF40", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Target size={22} color="#00D4FF" />
          </div>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#F0F2FF", margin: 0 }}>Win Rate Optimizer</h1>
            <p style={{ fontSize: 13, color: "#8B91A8", margin: 0 }}>Win more without lowering your prices</p>
          </div>
        </div>
      </div>

      {/* Win rate hero card */}
      <div style={{ background: "linear-gradient(135deg,#00D4FF12,#00D4FF22)", border: "1px solid #00D4FF30", borderRadius: 16, padding: 24, marginBottom: 20, display: "flex", alignItems: "center", gap: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#00D4FF", lineHeight: 1 }}>68%</div>
          <div style={{ fontSize: 12, color: "#8B91A8", marginTop: 4 }}>Your Win Rate</div>
        </div>
        <div style={{ width: 1, height: 80, background: "#252A3A" }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <TrendingUp size={16} color="#00E676" />
            <span style={{ fontSize: 14, color: "#00E676", fontWeight: 600 }}>14% above DFW average</span>
          </div>
          <div style={{ fontSize: 13, color: "#8B91A8" }}>DFW average win rate: <strong style={{ color: "#F0F2FF" }}>54%</strong></div>
          <div style={{ fontSize: 13, color: "#8B91A8", marginTop: 4 }}>You won <strong style={{ color: "#F0F2FF" }}>68 of 100</strong> bids this month</div>
        </div>
      </div>

      {/* Win Rate by Factor */}
      <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <BarChart2 size={16} color="#8B91A8" />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", margin: 0 }}>Win Rate by Factor</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FACTORS.map((f) => (
            <div key={f.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#F0F2FF" }}>{f.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: f.color }}>{f.win}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "#1A1E2A", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${f.win}%`, background: f.color, borderRadius: 3, transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Losing Bid Analysis */}
      <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <AlertTriangle size={16} color="#FF4444" />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", margin: 0 }}>Losing Bid Analysis</p>
        </div>
        <p style={{ fontSize: 12, color: "#8B91A8", marginBottom: 14 }}>You lost 32% of bids. Top reasons:</p>
        <div style={{ display: "flex", gap: 12 }}>
          {LOST_REASONS.map((l) => (
            <div key={l.reason} style={{ flex: 1, padding: "12px 14px", borderRadius: 10, background: "#1A1E2A", textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: l.color }}>{l.count}</div>
              <div style={{ fontSize: 11, color: "#8B91A8", marginTop: 3, lineHeight: 1.4 }}>{l.reason}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Wins */}
      <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", marginBottom: 14 }}>Quick Wins</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {QUICK_WINS.map((q) => {
            const Icon = q.icon;
            return (
              <div key={q.title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: "#1A1E2A", cursor: "default" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${q.color}18`, border: `1px solid ${q.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={16} color={q.color} />
                </div>
                <span style={{ flex: 1, fontSize: 13, color: "#F0F2FF" }}>{q.title}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#00E676" }}>{q.impact}</span>
                <ChevronRight size={14} color="#555B72" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Win Rate Trend */}
      <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", marginBottom: 16 }}>Win Rate — Last 8 Weeks</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={WIN_TREND} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#252A3A" />
            <XAxis dataKey="week" tick={{ fill: "#555B72", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[45, 75]} tick={{ fill: "#555B72", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#8B91A8" }}
              itemStyle={{ color: "#00D4FF" }}
              formatter={(v: number) => [`${v}%`, "Win Rate"]}
            />
            <Line type="monotone" dataKey="rate" stroke="#00D4FF" strokeWidth={2} dot={{ fill: "#00D4FF", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Competitor Benchmark */}
      <div style={{ display: "flex", gap: 12, padding: 16, borderRadius: 12, background: "#A855F712", border: "1px solid #A855F730", marginBottom: 20, alignItems: "center" }}>
        <Trophy size={20} color="#A855F7" style={{ flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#A855F7", margin: "0 0 3px" }}>Competitor Benchmark</p>
          <p style={{ fontSize: 12, color: "#8B91A8", margin: 0 }}>Top 10% of DFW HVAC pros win <strong style={{ color: "#F0F2FF" }}>89%</strong> of bids. Gap to close: <strong style={{ color: "#FFB300" }}>21%</strong></p>
        </div>
      </div>

      {/* Practice a Winning Bid */}
      {!practice ? (
        <button
          onClick={() => setPractice(true)}
          style={{ width: "100%", padding: "14px 20px", borderRadius: 12, background: "linear-gradient(135deg,#00D4FF,#A855F7)", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
        >
          Practice a Winning Bid
        </button>
      ) : (
        <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", marginBottom: 14 }}>Practice Bid</p>
          <div style={{ background: "#1A1E2A", borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["Homeowner", MOCK_LEAD.homeowner],
                ["Address",   MOCK_LEAD.address],
                ["Service",   MOCK_LEAD.service],
                ["Urgency",   MOCK_LEAD.urgency],
                ["Budget",    MOCK_LEAD.budget],
              ].map(([k, v]) => (
                <div key={k}>
                  <span style={{ fontSize: 10, color: "#555B72", textTransform: "uppercase" }}>{k}</span>
                  <div style={{ fontSize: 13, color: "#F0F2FF", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <textarea
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            placeholder={`Hi ${MOCK_LEAD.homeowner}, I'd love to help with your ${MOCK_LEAD.service}...`}
            rows={4}
            style={{ width: "100%", background: "#1A1E2A", border: "1px solid #252A3A", borderRadius: 8, padding: "10px 12px", color: "#F0F2FF", fontSize: 13, resize: "vertical", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={() => { setBid(""); setPractice(false); }} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "#1A1E2A", color: "#8B91A8", fontSize: 13, fontWeight: 600, border: "1px solid #252A3A", cursor: "pointer" }}>
              Cancel
            </button>
            <button style={{ flex: 2, padding: "10px", borderRadius: 8, background: "#00D4FF", color: "#0A1628", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Submit Practice Bid
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
