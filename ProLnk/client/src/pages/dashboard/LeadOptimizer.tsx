import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import {
  Zap, Clock, TrendingUp, Camera, Bell, Target,
  CheckCircle, ChevronRight, Star, MessageSquare,
  Calendar, MapPin, AlertCircle,
} from "lucide-react";

const TEAL = "#00B5B8";
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const BLUE = "#3B82F6";
const DIM = "#8B91A8";
const BORDER = "#1E2A3A";
const CARD = "#0F1D2E";
const BG = "#0A1628";

const WIN_RATE_DATA = [
  { band: "< 2 min", winRate: 91, color: GREEN },
  { band: "2–5 min", winRate: 78, color: TEAL },
  { band: "5–10 min", winRate: 54, color: AMBER },
  { band: "10–30 min", winRate: 31, color: "#F97316" },
  { band: "30+ min", winRate: 12, color: RED },
];

interface Insight {
  id: string;
  icon: typeof Camera;
  iconColor: string;
  text: string;
  metric: string;
  metricColor: string;
}

const INSIGHTS: Insight[] = [
  {
    id: "photos",
    icon: Camera,
    iconColor: TEAL,
    text: "Your photo bids win significantly more — always upload 2+ photos",
    metric: "2.3× win rate",
    metricColor: TEAL,
  },
  {
    id: "tuesday",
    icon: Calendar,
    iconColor: GREEN,
    text: "Leads accepted on Tuesday have the highest completion rate",
    metric: "94% completion",
    metricColor: GREEN,
  },
  {
    id: "zip",
    icon: MapPin,
    iconColor: AMBER,
    text: "Jobs in ZIP 75034 avg higher commission than your other ZIPs",
    metric: "+18% commission",
    metricColor: AMBER,
  },
  {
    id: "morning",
    icon: Clock,
    iconColor: BLUE,
    text: "Respond within 3 minutes during 8am–10am for highest win rate",
    metric: "Peak window",
    metricColor: BLUE,
  },
  {
    id: "message",
    icon: MessageSquare,
    iconColor: "#A855F7",
    text: "Bids with a personalized first message win significantly more",
    metric: "41% more wins",
    metricColor: "#A855F7",
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1A2A3A", border: `1px solid ${BORDER}`,
      borderRadius: 8, padding: "10px 14px",
    }}>
      <p style={{ color: DIM, fontSize: 12, margin: "0 0 4px" }}>{label}</p>
      <p style={{ color: GREEN, fontSize: 16, fontWeight: 700, margin: 0 }}>
        {payload[0].value}% win rate
      </p>
    </div>
  );
}

export default function LeadOptimizer() {
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [practicing, setPracticing] = useState(false);

  return (
    <div style={{ background: BG, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px 60px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `linear-gradient(135deg, ${TEAL}33, ${TEAL}66)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${TEAL}44`,
            }}>
              <Zap size={22} color={TEAL} />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F0F2FF", margin: 0 }}>Lead Optimizer</h1>
              <p style={{ fontSize: 14, color: DIM, margin: 0 }}>AI insights to win more jobs</p>
            </div>
          </div>
        </div>

        {/* Your Response Profile */}
        <div style={{
          background: CARD, border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Target size={16} color={TEAL} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F0F2FF" }}>Your Response Profile</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {[
              { label: "Best response time", value: "2.1 min", sub: "personal best", color: GREEN },
              { label: "Average response time", value: "4.2 min", sub: "last 30 days", color: TEAL },
              { label: "Win rate < 5 min", value: "82%", sub: "vs 31% at > 10 min", color: GREEN },
              { label: "Win rate > 10 min", value: "31%", sub: "urgency matters", color: RED },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: `${stat.color}11`, border: `1px solid ${stat.color}33`,
                borderRadius: 12, padding: "14px 16px",
              }}>
                <p style={{ fontSize: 11, color: DIM, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 24, fontWeight: 700, color: stat.color, margin: "0 0 2px" }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 11, color: DIM, margin: 0 }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Win Rate by Response Time Chart */}
        <div style={{
          background: CARD, border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <TrendingUp size={16} color={TEAL} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F0F2FF" }}>Win Rate vs Response Time</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WIN_RATE_DATA} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
              <XAxis
                dataKey="band"
                tick={{ fill: DIM, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: DIM, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="winRate" radius={[6, 6, 0, 0]}>
                {WIN_RATE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Winning Bid Patterns */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Star size={16} color={AMBER} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F0F2FF" }}>Winning Bid Patterns</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: TEAL,
              background: `${TEAL}22`, padding: "2px 8px", borderRadius: 20,
              border: `1px solid ${TEAL}44`,
            }}>AI analysis</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {INSIGHTS.map((ins) => {
              const Icon = ins.icon;
              return (
                <div key={ins.id} style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: 12, padding: "14px 18px",
                  display: "flex", alignItems: "center", gap: 14,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${ins.iconColor}22`, border: `1px solid ${ins.iconColor}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    minWidth: 36,
                  }}>
                    <Icon size={16} color={ins.iconColor} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, color: "#D0D5EA", margin: 0, lineHeight: 1.4 }}>{ins.text}</p>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: ins.metricColor,
                    background: `${ins.metricColor}22`, padding: "4px 10px",
                    borderRadius: 20, whiteSpace: "nowrap",
                    border: `1px solid ${ins.metricColor}44`,
                  }}>
                    {ins.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Scoring Preview */}
        <div style={{
          background: `linear-gradient(135deg, #1D4ED822, #7C3AED22)`,
          border: `1px solid #3B82F644`,
          borderRadius: 16, padding: "18px 22px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${BLUE}33, #7C3AED33)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            minWidth: 48,
          }}>
            <AlertCircle size={22} color={BLUE} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, color: DIM, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>
              Next lead prediction
            </p>
            <p style={{ fontSize: 15, color: "#E0E8FF", margin: "0 0 4px", lineHeight: 1.5 }}>
              Your next lead is likely a <strong style={{ color: BLUE }}>roofing inspection</strong>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                height: 6, borderRadius: 3, overflow: "hidden",
                background: BORDER, flex: 1, maxWidth: 120,
              }}>
                <div style={{ height: "100%", width: "73%", background: BLUE, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 12, color: BLUE, fontWeight: 600 }}>73% probability</span>
              <span style={{ fontSize: 11, color: DIM }}>based on recent storm activity</span>
            </div>
          </div>
        </div>

        {/* Notification Optimizer */}
        <div style={{
          background: CARD, border: `1px solid ${notifEnabled ? `${GREEN}44` : BORDER}`,
          borderRadius: 16, padding: "18px 22px", marginBottom: 20,
          transition: "border-color 0.3s",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: `${AMBER}22`, border: `1px solid ${AMBER}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                minWidth: 40,
              }}>
                <Bell size={18} color={AMBER} />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#F0F2FF", margin: "0 0 4px" }}>
                  Notification Optimizer
                </p>
                <p style={{ fontSize: 13, color: DIM, margin: 0, lineHeight: 1.5 }}>
                  Turn on instant push notifications to cut your avg response from{" "}
                  <span style={{ color: AMBER, fontWeight: 600 }}>4.2 min</span> to{" "}
                  <span style={{ color: GREEN, fontWeight: 600 }}>2.1 min</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifEnabled(v => !v)}
              style={{
                padding: "8px 18px", borderRadius: 8, border: "none",
                background: notifEnabled ? GREEN : TEAL,
                color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
                display: "flex", alignItems: "center", gap: 6,
                minWidth: 100, justifyContent: "center",
                transition: "background 0.2s",
              }}
            >
              {notifEnabled ? <><CheckCircle size={14} /> Enabled</> : <>Enable</>}
            </button>
          </div>
        </div>

        {/* Practice Scenario */}
        <div style={{
          background: CARD, border: `1px solid ${BORDER}`,
          borderRadius: 16, padding: "20px 24px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Zap size={16} color="#A855F7" />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#F0F2FF" }}>Practice Scenario</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: "#A855F7",
              background: "#A855F722", padding: "2px 8px", borderRadius: 20,
            }}>Simulation</span>
          </div>
          <div style={{
            background: "#0A1628", border: `1px solid ${BORDER}`,
            borderRadius: 12, padding: "16px 18px", marginBottom: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 13, color: DIM, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>
                  Incoming lead
                </p>
                <p style={{ fontWeight: 700, fontSize: 17, color: "#F0F2FF", margin: "0 0 4px" }}>
                  HVAC Repair — Frisco, TX 75034
                </p>
                <p style={{ fontSize: 13, color: DIM, margin: 0 }}>
                  "AC stopped cooling last night. 3BR house, 2,400 sqft. Need someone today."
                </p>
              </div>
              <div style={{
                background: `${GREEN}22`, border: `1px solid ${GREEN}44`,
                borderRadius: 10, padding: "8px 14px", textAlign: "center", minWidth: 70,
              }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: GREEN, margin: 0 }}>94</p>
                <p style={{ fontSize: 10, color: DIM, margin: 0 }}>Lead score</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { icon: Clock, label: "Posted 2 min ago", color: AMBER },
                { icon: MapPin, label: "3.2 mi away", color: TEAL },
                { icon: Star, label: "$280–$420 est.", color: GREEN },
              ].map((tag) => {
                const TagIcon = tag.icon;
                return (
                  <div key={tag.label} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    fontSize: 12, color: tag.color,
                    background: `${tag.color}22`, padding: "4px 10px",
                    borderRadius: 20, border: `1px solid ${tag.color}33`,
                  }}>
                    <TagIcon size={12} />
                    {tag.label}
                  </div>
                );
              })}
            </div>
          </div>
          {!practicing ? (
            <button
              onClick={() => setPracticing(true)}
              style={{
                width: "100%", padding: "12px", borderRadius: 10, border: "none",
                background: `linear-gradient(135deg, #7C3AED, #A855F7)`,
                color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              Practice responding to this lead
              <ChevronRight size={18} />
            </button>
          ) : (
            <div>
              <textarea
                placeholder="Write your response to this homeowner... (Tip: personalize it!)"
                style={{
                  width: "100%", background: "#0A1628", border: `1px solid ${BORDER}`,
                  borderRadius: 10, padding: "12px 14px", color: "#F0F2FF", fontSize: 14,
                  resize: "vertical", minHeight: 100, outline: "none", boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
                  style={{
                    flex: 1, padding: "10px", borderRadius: 8, border: "none",
                    background: TEAL, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14,
                  }}
                >
                  Submit Practice Bid
                </button>
                <button
                  onClick={() => setPracticing(false)}
                  style={{
                    padding: "10px 18px", borderRadius: 8, border: `1px solid ${BORDER}`,
                    background: "transparent", color: DIM, cursor: "pointer", fontSize: 14,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
