import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Server, RefreshCw, AlertTriangle, CheckCircle, Clock, Activity, Wifi } from "lucide-react";
import { BarChart, SectionHeader, D } from "@/components/DashboardShared";

type ServiceStatus = "up" | "degraded" | "down";

type Service = {
  name: string;
  status: ServiceStatus;
  uptime: string;
  latency: string;
  lastCheck: string;
};

const SERVICES: Service[] = [
  { name: "API Gateway",         status: "up",       uptime: "100%",   latency: "42ms",  lastCheck: "12s ago" },
  { name: "Database TiDB",       status: "up",       uptime: "99.99%", latency: "18ms",  lastCheck: "15s ago" },
  { name: "Stripe Payments",     status: "up",       uptime: "100%",   latency: "340ms", lastCheck: "18s ago" },
  { name: "Resend Email",        status: "up",       uptime: "100%",   latency: "210ms", lastCheck: "21s ago" },
  { name: "Twilio SMS",          status: "up",       uptime: "100%",   latency: "180ms", lastCheck: "9s ago"  },
  { name: "Cloudflare CDN",      status: "up",       uptime: "100%",   latency: "8ms",   lastCheck: "6s ago"  },
  { name: "Photo AI Pipeline",   status: "up",       uptime: "99.8%",  latency: "1.2s",  lastCheck: "30s ago" },
  { name: "Lead Router",         status: "up",       uptime: "100%",   latency: "88ms",  lastCheck: "11s ago" },
  { name: "Storm Intelligence",  status: "up",       uptime: "100%",   latency: "2.1s",  lastCheck: "44s ago" },
  { name: "n8n Automation",      status: "degraded", uptime: "99.5%",  latency: "—",     lastCheck: "2m ago"  },
  { name: "Inngest Jobs",        status: "up",       uptime: "100%",   latency: "—",     lastCheck: "1m ago"  },
  { name: "Qdrant Vector DB",    status: "up",       uptime: "100%",   latency: "24ms",  lastCheck: "17s ago" },
];

const INCIDENTS = [
  { id: 1, title: "n8n webhook queue delay",          started: "May 13, 02:14″,  resolved: "May 13, 02:41",  duration: "27 min", impact: "Delayed automation triggers for 3 workflows",   severity: "minor"  },
  { id: 2, title: "Photo AI pipeline timeout spike",  started: "May 11, 18:05″,  resolved: "May 11, 18:22",  duration: "17 min", impact: "14 photo analysis jobs queued; no data loss",    severity: "minor"  },
  { id: 3, title: "TiDB connection pool exhaustion",  started: "May 09, 11:42″,  resolved: "May 09, 11:55",  duration: "13 min", impact: "Elevated API error rate (4.2%) for 13 minutes",  severity: "minor"  },
];

const API_LATENCY_24H = [42, 38, 45, 51, 39, 44, 47, 40, 36, 43, 48, 52, 44, 39, 41, 46, 43, 38, 44, 47, 41, 39, 43, 42];

const STATUS_STYLE: Record<ServiceStatus, { color: string; label: string; badgeBg: string; badgeText: string }> = {
  up:       { color: "#00E676″, label: "Operational",  badgeBg: "bg-green-500/20", badgeText: "text-green-400"  },
  degraded: { color: "#FFB300″, label: "Degraded",     badgeBg: "bg-amber-500/20", badgeText: "text-amber-400"  },
  down:     { color: "#FF4444″, label: "Down",          badgeBg: "bg-red-500/20",   badgeText: "text-red-400"    },
};

export default function SystemHealthDashboard() {
  const [checking, setChecking] = useState(false);
  const [lastRefresh, setLastRefresh] = useState("just now");
  const [services, setServices] = useState<Service[]>(SERVICES);

  function runHealthCheck() {
    setChecking(true);
    setTimeout(() => {
      setServices([...SERVICES]);
      setLastRefresh("just now");
      setChecking(false);
    }, 2400);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(prev => {
        const n = parseInt(prev) || 0;
        return `${n + 30}s ago`;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const allUp      = services.every(s => s.status === "up");
  const degraded   = services.filter(s => s.status === "degraded").length;
  const down       = services.filter(s => s.status === "down").length;

  const overallLabel = down > 0 ? "Major Incident" : degraded > 0 ? "Partial Degradation" : "All Systems Operational";
  const overallColor = down > 0 ? "#FF4444″ : degraded > 0 ? "#FFB300" : "#00E676";
  const overallBg    = down > 0 ? "bg-red-500/10 border-red-500/30″ : degraded > 0 ? "bg-amber-500/10 border-amber-500/30" : "bg-green-500/10 border-green-500/30";

  return (
    <AdminLayout>
      <div className="space-y-6″ style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3″>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00E67620, #00D4FF20)", border: "1px solid #00E67640″ }}>
              <Server className="w-6 h-6″ style={{ color: "#00E676" }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">System Health</h1>
              <p className="text-sm mt-0.5″ style={{ color: "#8B91A8" }}>Last refreshed: {lastRefresh}</p>
            </div>
          </div>
          <button
            onClick={runHealthCheck}
            disabled={checking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-60″
            style={{ background: "linear-gradient(135deg, #00E67620, #00D4FF20)", border: "1px solid #00E67640″, color: "#F0F2FF" }}
          >
            <RefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} style={{ color: "#00E676″ }} />
            {checking ? "Checking…" : "Run Health Check"}
          </button>
        </div>

        {/* Overall status banner */}
        <div className={`rounded-2xl p-4 flex items-center gap-3 border ${overallBg}`}>
          {allUp
            ? <CheckCircle className="w-5 h-5 flex-shrink-0″ style={{ color: overallColor }} />
            : <AlertTriangle className="w-5 h-5 flex-shrink-0″ style={{ color: overallColor }} />
          }
          <div>
            <p className="text-sm font-bold" style={{ color: overallColor }}>{overallLabel}</p>
            <p className="text-xs mt-0.5″ style={{ color: "#8B91A8" }}>
              {services.length} services monitored — {services.filter(s => s.status === "up").length} operational
              {degraded > 0 ? `, ${degraded} degraded` : ""}
              {down > 0 ? `, ${down} down` : ""}
            </p>
          </div>
        </div>

        {/* Service grid */}
        <div>
          <SectionHeader title="Service Status" subtitle={`${services.length} monitored services`} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4″>
            {services.map(svc => {
              const st = STATUS_STYLE[svc.status];
              return (
                <div
                  key={svc.name}
                  className="rounded-2xl p-4 flex flex-col gap-3″
                  style={{ background: "#1A1E2A", border: `1px solid ${svc.status === "up" ? "#252A3A" : st.color + "40"}` }}
                >
                  {/* Row 1 */}
                  <div className="flex items-center justify-between gap-2″>
                    <div className="flex items-center gap-2.5″>
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0″ style={{ backgroundColor: st.color }} />
                      <p className="text-sm font-semibold" style={{ color: "#F0F2FF" }}>{svc.name}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${st.badgeBg} ${st.badgeText}`}>
                      {st.label}
                    </span>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2″>
                    {[
                      { label: "Uptime",     value: svc.uptime  },
                      { label: "Latency",    value: svc.latency },
                      { label: "Checked",    value: svc.lastCheck },
                    ].map(m => (
                      <div key={m.label} className="rounded-lg p-2″ style={{ background: "#13161E" }}>
                        <p className="text-xs" style={{ color: "#555B72″ }}>{m.label}</p>
                        <p className="text-xs font-bold mt-0.5″ style={{ color: m.label === "Uptime" ? st.color : "#F0F2FF" }}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom row: response time chart + incident log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>

          {/* API Gateway response time chart */}
          <div className="rounded-2xl p-5″ style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}>
            <SectionHeader
              title="API Gateway — Last 24h Response Time"
              subtitle="Average latency per hour (ms)"
              action={<Activity className="w-4 h-4″ style={{ color: "#00D4FF" }} />}
            />
            <BarChart
              data={API_LATENCY_24H.map((v, i) => ({ label: `${i}:00`, value: v }))}
              color={D.cyan}
              height={140}
              showLabels
            />
          </div>

          {/* Incident log */}
          <div className="rounded-2xl p-5″ style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}>
            <SectionHeader title="Recent Incidents" subtitle="Last 7 days — all resolved" />
            <div className="space-y-3″>
              {INCIDENTS.map(inc => (
                <div key={inc.id} className="rounded-xl p-4″ style={{ background: "#13161E", border: "1px solid #252A3A" }}>
                  <div className="flex items-start justify-between gap-2 mb-2″>
                    <div className="flex items-center gap-2″>
                      <CheckCircle className="w-4 h-4 flex-shrink-0″ style={{ color: "#00E676" }} />
                      <p className="text-sm font-semibold" style={{ color: "#F0F2FF" }}>{inc.title}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 flex-shrink-0″>Resolved</span>
                  </div>
                  <p className="text-xs mb-2″ style={{ color: "#8B91A8" }}>{inc.impact}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "#555B72″ }}>
                    <span className="flex items-center gap-1″><Clock className="w-3 h-3" />{inc.duration}</span>
                    <span>{inc.started} → {inc.resolved}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
