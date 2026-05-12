import { useLocation } from "wouter";
import { CloudLightning, Zap, Home, Bell } from "lucide-react";

const ACTIVE_ALERTS = [
  { type: "Severe Thunderstorm Watch", area: "Dallas County, TX", severity: "Severe", issued: "May 11, 2026 · 2:30 PM CDT" },
  { type: "High Wind Warning", area: "Tarrant County, TX", severity: "Extreme", issued: "May 11, 2026 · 1:00 PM CDT" },
  { type: "Flash Flood Watch", area: "Collin County, TX", severity: "Moderate", issued: "May 11, 2026 · 11:00 AM CDT" },
];

const SEVERITY_BADGE: Record<string, string> = {
  Extreme: "bg-red-500 text-white",
  Severe: "bg-amber-500 text-white",
  Moderate: "bg-yellow-400 text-black",
};

const HOW_IT_WORKS = [
  {
    icon: <CloudLightning className="w-6 h-6 text-amber-400" />,
    title: "Storm Detected",
    desc: "ProLnk monitors NOAA's real-time alert feed 24/7. The moment a severe weather event is issued for any active service area, the Storm Agent activates.",
  },
  {
    icon: <Home className="w-6 h-6 text-amber-400" />,
    title: "AI Matches to Documented Homes",
    desc: "The system cross-references affected zip codes against the Home Health Vault — surfacing properties with documented roofing, drainage, or structural vulnerabilities.",
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    title: "Partners Get Instant Lead Alerts",
    desc: "ProLnk partners in the affected area receive emergency lead notifications within minutes — ranked by urgency, pre-qualified, and ready to act.",
  },
];

export default function StormAlert() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Nav bar */}
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <button onClick={() => navigate("/")} className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          ProLnk
        </button>
        <button
          onClick={() => navigate("/apply")}
          className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black transition-colors"
        >
          Apply as a Pro
        </button>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30">
            <CloudLightning className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Live Monitoring</span>
            <h1 className="text-3xl font-bold leading-tight">Storm Watch — DFW Active Alerts</h1>
          </div>
        </div>

        <p className="text-gray-400 text-base leading-relaxed max-w-2xl mb-10">
          ProLnk monitors NOAA severe weather data in real time across all active service territories. When storms hit, our AI instantly surfaces affected homes and routes emergency leads to approved service professionals — so pros can respond in minutes, not days.
        </p>

        {/* Active alerts */}
        <div className="space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Current NOAA Alerts — Texas</p>
          {ACTIVE_ALERTS.map((alert, i) => (
            <div key={i} className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/8 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-pulse" />
                <div>
                  <p className="text-sm font-semibold text-white">{alert.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{alert.area} · {alert.issued}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${SEVERITY_BADGE[alert.severity] ?? "bg-gray-600 text-white"}`}>
                {alert.severity}
              </span>
            </div>
          ))}
          <p className="text-xs text-gray-600 pt-1">Sample data for illustration. Live alerts sourced from <span className="text-gray-500">api.weather.gov</span>.</p>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-bold text-white">Are you a service professional?</p>
              <p className="text-sm text-gray-300 mt-0.5">Apply to ProLnk and get instant leads the moment storms hit your area. First 500 spots only.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/apply")}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Apply to ProLnk →
          </button>
        </div>

        {/* How It Works */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">How It Works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 rounded-full w-5 h-5 flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm font-bold text-white">{step.title}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">ProLnk — Storm-responsive home service network</p>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-white transition-colors">Home</button>
            <button
              onClick={() => navigate("/apply")}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              Apply as a Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
