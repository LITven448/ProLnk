import { useState } from "react";
import { Link } from "wouter";
import {
  Bell, Camera, CheckCircle, ChevronRight, Clock,
  DollarSign, MapPin, Star, TrendingUp, Upload,
  Zap, Calendar, AlertCircle, MessageSquare, Eye,
  Flame, Shield, Phone,
} from "lucide-react";

const PRIORITY_FEED = [
  {
    id: 1,
    dot: "#EF4444″,
    tag: "New Lead",
    title: "HVAC emergency at 1234 Oak Creek Dr, Frisco",
    meta: "2.3 miles away · $150–350 job",
    actions: [
      { label: "Accept",  variant: "teal",  href: "#" },
      { label: "Decline", variant: "ghost", href: "#" },
    ],
    icon: Zap,
  },
  {
    id: 2,
    dot: "#F59E0B",
    tag: "Quote Pending",
    title: "John M. hasn't responded in 48h",
    meta: "Sent May 12 · Roof repair · $620 est.",
    actions: [
      { label: "Follow Up", variant: "amber", href: "#" },
    ],
    icon: MessageSquare,
  },
  {
    id: 3,
    dot: "#10B981″,
    tag: "Job Complete",
    title: "Review payment for job #4821″,
    meta: "$312 commission ready to claim",
    actions: [
      { label: "View Payout", variant: "green", href: "#" },
    ],
    icon: CheckCircle,
  },
  {
    id: 4,
    dot: "#3B82F6″,
    tag: "Scan Result",
    title: "Your photo upload generated 2 leads at 75034″,
    meta: "Uploaded today · AI confidence 84%",
    actions: [
      { label: "View Leads", variant: "blue", href: "#" },
    ],
    icon: Eye,
  },
];

const SCHEDULE = [
  {
    time: "9:00 AM",
    address: "892 Maple Ridge Ln, Plano",
    homeowner: "Sandra K.",
    service: "HVAC Tune-Up",
    value: "$185″,
    status: "confirmed",
  },
  {
    time: "1:00 PM",
    address: "4417 Windhaven Pkwy, Allen",
    homeowner: "David R.",
    service: "Duct Cleaning",
    value: "$310″,
    status: "confirmed",
  },
  {
    time: "3:00 PM",
    address: "231 Creekside Blvd, McKinney",
    homeowner: "Priya M.",
    service: "AC Refrigerant",
    value: "$270″,
    status: "pending",
  },
];

const BTN_STYLES: Record<string, string> = {
  teal:  "background:#14B8A6;color:#fff;",
  ghost: "background:transparent;border:1px solid #2E3450;color:#8B91A8;",
  amber: "background:#D97706;color:#fff;",
  green: "background:#059669;color:#fff;",
  blue:  "background:#3B82F6;color:#fff;",
};

export default function ProDashboardHome() {
  const [favorites, setFavorites] = useState<number[]>([]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A1628″,
        color: "#F0F2FF",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "24px 20px 80px",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0 }}>
              Good morning, Marcus
            </h1>
            <p style={{ color: "#8B91A8″, margin: "4px 0 0", fontSize: 14 }}>
              Thursday, May 15, 2026
            </p>
          </div>
          <div
            style={{
              background: "#14B8A620″,
              border: "1px solid #14B8A640″,
              borderRadius: 24,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "#14B8A6″,
            }}
          >
            <Bell size={14} />
            3 new leads today
          </div>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginBottom: 32,
        }}
      >
        {[
          { label: "Active Leads",    value: "3″,    color: "#14B8A6", icon: Zap,         sub: "+1 since yesterday" },
          { label: "Jobs Scheduled",  value: "2″,    color: "#3B82F6", icon: Calendar,    sub: "Today" },
          { label: "Pending Quotes",  value: "5″,    color: "#F59E0B", icon: Clock,       sub: "2 expiring soon" },
          { label: "Week Earnings",   value: "$847″, color: "#10B981", icon: DollarSign,  sub: "↑ 14% vs last week" },
        ].map(({ label, value, color, icon: Icon, sub }) => (
          <div
            key={label}
            style={{
              background: "#13192B",
              border: "1px solid #1E2A40″,
              borderRadius: 14,
              padding: "18px 20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#8B91A8″, fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
                  {label}
                </p>
                <p style={{ fontSize: 30, fontWeight: 700, margin: "6px 0 4px", color }}>
                  {value}
                </p>
                <p style={{ fontSize: 12, color: "#555B72″, margin: 0 }}>{sub}</p>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: color + "22″,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color={color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Feed */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 14px", color: "#F0F2FF" }}>
          Priority Feed
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {PRIORITY_FEED.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#13192B",
                border: `1px solid ${item.dot}30`,
                borderLeft: `3px solid ${item.dot}`,
                borderRadius: 12,
                padding: "16px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: 1 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: item.dot + "22″,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={16} color={item.dot} />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: item.dot,
                      textTransform: "uppercase",
                      letterSpacing: 0.8,
                    }}
                  >
                    {item.tag}
                  </span>
                  <p style={{ margin: "3px 0 2px", fontWeight: 500, fontSize: 14, color: "#F0F2FF" }}>
                    {item.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#8B91A8″ }}>{item.meta}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {item.actions.map((a) => (
                  <button
                    key={a.label}
                    style={{
                      padding: "7px 14px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      ...Object.fromEntries(
                        BTN_STYLES[a.variant].split(";").filter(Boolean).map((s) => {
                          const [k, v] = s.split(":");
                          const camel = k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                          return [camel, v.trim()];
                        })
                      ),
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Today's Schedule</h2>
          <Link href="/pro/schedule">
            <span style={{ fontSize: 13, color: "#14B8A6″, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              Full calendar <ChevronRight size={14} />
            </span>
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCHEDULE.map((job) => (
            <div
              key={job.time}
              style={{
                background: "#13192B",
                border: "1px solid #1E2A40″,
                borderRadius: 12,
                padding: "14px 16px",
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  minWidth: 64,
                  textAlign: "center",
                  background: "#0A1628″,
                  borderRadius: 8,
                  padding: "8px 4px",
                }}
              >
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#14B8A6″ }}>{job.time}</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{job.service}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                  <MapPin size={12} color="#8B91A8″ />
                  <span style={{ fontSize: 12, color: "#8B91A8″ }}>{job.address}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
                  <Phone size={12} color="#8B91A8″ />
                  <span style={{ fontSize: 12, color: "#8B91A8″ }}>{job.homeowner}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: 700, color: "#10B981″, fontSize: 16 }}>{job.value}</p>
                <span
                  style={{
                    fontSize: 11,
                    padding: "2px 8px",
                    borderRadius: 20,
                    background: job.status === "confirmed" ? "#05966920″ : "#D9780620",
                    color: job.status === "confirmed" ? "#10B981″ : "#F59E0B",
                  }}
                >
                  {job.status === "confirmed" ? "Confirmed" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          background: "#13192B",
          border: "1px solid #1E2A40″,
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 28,
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 16px", color: "#8B91A8″, textTransform: "uppercase", letterSpacing: 1 }}>
          Your Performance
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          <div
            style={{
              background: "#FF970020″,
              border: "1px solid #FF970040″,
              borderRadius: 12,
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <Flame size={16} color="#F97316″ />
              <span style={{ fontSize: 12, color: "#F97316″, fontWeight: 600 }}>Scanning Streak</span>
            </div>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#F0F2FF" }}>7 jobs</p>
            <p style={{ margin: "3px 0 0″, fontSize: 12, color: "#8B91A8" }}>In a row — keep it up!</p>
          </div>
          <div style={{ padding: "14px 0″ }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#8B91A8″ }}>Acceptance Rate</p>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#14B8A6″ }}>87%</p>
            <div style={{ marginTop: 6, background: "#1E2A40″, borderRadius: 4, height: 4 }}>
              <div style={{ width: "87%", background: "#14B8A6″, height: 4, borderRadius: 4 }} />
            </div>
          </div>
          <div style={{ padding: "14px 0″ }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#8B91A8″ }}>Avg Response Time</p>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#10B981″ }}>4.2 min</p>
            <p style={{ margin: "3px 0 0″, fontSize: 12, color: "#8B91A8" }}>Top 15% of pros</p>
          </div>
          <div style={{ padding: "14px 0″ }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#8B91A8″ }}>Pro Rating</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#FFB300″ }}>4.9</p>
              <Star size={16} color="#FFB300″ fill="#FFB300" />
            </div>
            <p style={{ margin: "3px 0 0″, fontSize: 12, color: "#8B91A8" }}>Based on 41 reviews</p>
          </div>
        </div>
      </div>

      {/* Upload CTA */}
      <button
        style={{
          width: "100%",
          padding: "18px 24px",
          background: "linear-gradient(135deg, #14B8A6, #0D9488)",
          border: "none",
          borderRadius: 14,
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 16,
          fontWeight: 700,
          boxShadow: "0 8px 24px #14B8A630″,
        }}
        onClick={() => {}}
      >
        <Upload size={20} />
        Upload Job Photos
        <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.85 }}>· AI generates leads for you</span>
      </button>
    </div>
  );
}
