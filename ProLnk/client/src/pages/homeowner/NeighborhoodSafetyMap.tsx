import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, CloudLightning, TrendingUp, Users, Activity, ChevronRight } from "lucide-react";

const RECENT_ACTIVITY = [
  { event: "Roof inspection completed", dist: "0.3mi", time: "2h ago", color: "text-teal-400″ },
  { event: "HVAC emergency dispatched", dist: "0.8mi", time: "5h ago", color: "text-red-400″ },
  { event: "Foundation check scheduled", dist: "1.2mi", time: "Yesterday", color: "text-blue-400″ },
  { event: "Window seal replacement", dist: "0.5mi", time: "Yesterday", color: "text-teal-400″ },
  { event: "Electrical panel inspection", dist: "1.8mi", time: "2 days ago", color: "text-amber-400″ },
];

const LOCAL_PROS = [
  { name: "Marcus T.", trade: "HVAC", rating: 4.9, jobs: 87, dist: "0.4mi" },
  { name: "Sarah K.", trade: "Plumbing", rating: 4.8, jobs: 134, dist: "0.7mi" },
  { name: "Darnell W.", trade: "Electrical", rating: 5.0, jobs: 62, dist: "1.1mi" },
];

const SAFETY_RATINGS = [
  { label: "Traffic Safety", value: "4.2″, display: "4.2★", color: "text-teal-400", stars: 4 },
  { label: "Flood Risk", value: "Low", display: "Low", color: "text-green-400″, stars: 5 },
  { label: "Crime Rate", value: "Below Avg", display: "Below Avg", color: "text-green-400″, stars: 4 },
  { label: "Natural Disaster", value: "Medium", display: "Medium — DFW hail", color: "text-amber-400″, stars: 3 },
];

const PINS = [
  { label: "Your Home", x: "48%", y: "45%", size: "w-5 h-5″, color: "bg-teal-400", ring: "ring-2 ring-teal-300", textColor: "text-teal-300" },
  { label: "HVAC Pro — 0.4mi", x: "62%", y: "32%", size: "w-3 h-3″, color: "bg-green-400", ring: "", textColor: "text-green-300" },
  { label: "Plumbing Pro — 0.7mi", x: "35%", y: "58%", size: "w-3 h-3″, color: "bg-green-400", ring: "", textColor: "text-green-300" },
  { label: "Electrical Pro — 1.1mi", x: "70%", y: "60%", size: "w-3 h-3″, color: "bg-green-400", ring: "", textColor: "text-green-300" },
  { label: "Storm damage — 0.9mi", x: "28%", y: "30%", size: "w-3 h-3″, color: "bg-red-500", ring: "ring-1 ring-red-400", textColor: "text-red-400" },
  { label: "Active deal — 1.3mi", x: "72%", y: "40%", size: "w-3 h-3″, color: "bg-yellow-400", ring: "", textColor: "text-yellow-300" },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5″>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < count ? "text-amber-400 fill-amber-400" : "text-slate-700"}`}
        />
      ))}
    </div>
  );
}

export default function NeighborhoodSafetyMap() {
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] p-4 md:p-6″>
        <div className="max-w-5xl mx-auto">

          <div className="mb-6″>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Neighborhood Overview</h1>
            <p className="text-slate-400 mt-1 text-sm">Know your area</p>
          </div>

          <div className="grid md:grid-cols-[1fr_300px] gap-4 mb-5″>
            <div
              className="relative rounded-2xl border border-slate-700/50 overflow-hidden"
              style={{
                background: "radial-gradient(ellipse at center, #0d1f38 0%, #0a1628 100%)",
                minHeight: 340,
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 rounded-full border border-teal-500/10″ />
                <div className="absolute w-32 h-32 rounded-full border border-teal-500/10″ />
              </div>
              {PINS.map((pin, i) => (
                <div
                  key={i}
                  className="absolute cursor-pointer group"
                  style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -50%)" }}
                  onClick={() => setActivePinIndex(activePinIndex === i ? null : i)}
                >
                  <div className={`${pin.size} rounded-full ${pin.color} ${pin.ring} transition-transform group-hover:scale-125`} />
                  {activePinIndex === i && (
                    <div className={`absolute left-5 top-0 whitespace-nowrap text-[10px] font-medium ${pin.textColor} bg-[#0F1E35] border border-slate-700/60 px-2 py-1 rounded-lg z-10 shadow-xl`}>
                      {pin.label}
                    </div>
                  )}
                </div>
              ))}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2″>
                {[
                  { color: "bg-teal-400″, label: "Your home" },
                  { color: "bg-green-400″, label: "TrustyPro" },
                  { color: "bg-red-500″, label: "Storm report" },
                  { color: "bg-yellow-400″, label: "Active deal" },
                ].map(l => (
                  <span key={l.label} className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-[#0A1628]/70 px-2 py-1 rounded-full">
                    <span className={`w-2 h-2 rounded-full ${l.color}`} />{l.label}
                  </span>
                ))}
              </div>
              <div className="absolute top-3 right-3 text-[10px] text-slate-600 font-mono">ZIP 75201 · DFW Metro</div>
            </div>

            <div className="grid grid-cols-2 gap-3″>
              {[
                { label: "Homes w/ TrustyPro", value: "23″, icon: <Users className="w-4 h-4" />, color: "text-teal-400", sub: "in your ZIP" },
                { label: "Active Deals", value: "2″, icon: <TrendingUp className="w-4 h-4" />, color: "text-amber-400", sub: "nearby" },
                { label: "Avg Health Score", value: "74″, icon: <Activity className="w-4 h-4" />, color: "text-green-400", sub: "out of 100" },
                { label: "Storm Risk", value: "Medium", icon: <CloudLightning className="w-4 h-4″ />, color: "text-orange-400", sub: "hail season" },
              ].map(card => (
                <div key={card.label} className="bg-[#0F1E35] rounded-xl border border-slate-700/50 p-3 flex flex-col gap-1″>
                  <div className={`${card.color}`}>{card.icon}</div>
                  <div className={`text-xl font-bold ${card.color}`}>{card.value}</div>
                  <div className="text-xs font-medium text-white leading-tight">{card.label}</div>
                  <div className="text-[10px] text-slate-500″>{card.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5″>
            <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4″>
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5″>
                <MapPin className="w-4 h-4 text-teal-400″ /> Recent Activity Near You
              </h2>
              <div className="flex flex-col gap-0″>
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0″>
                    <div>
                      <span className={`text-xs font-medium ${a.color}`}>{a.event}</span>
                      <span className="text-xs text-slate-500 ml-2″>— {a.dist}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 whitespace-nowrap ml-2″>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4″>
              <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5″>
                <Shield className="w-4 h-4 text-blue-400″ /> Safety Ratings
              </h2>
              <div className="flex flex-col gap-3″>
                {SAFETY_RATINGS.map(r => (
                  <div key={r.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-400″>{r.label}</span>
                    <div className="flex items-center gap-2″>
                      <StarRow count={r.stars} />
                      <span className={`text-xs font-medium ${r.color} min-w-[90px] text-right`}>{r.display}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0F1E35] rounded-2xl border border-slate-700/50 p-4 mb-5″>
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-1.5″>
              <Activity className="w-4 h-4 text-green-400″ /> Local Pros Active Now
            </h2>
            <div className="grid sm:grid-cols-3 gap-3″>
              {LOCAL_PROS.map(pro => (
                <div key={pro.name} className="bg-[#0A1628] rounded-xl border border-green-500/20 p-3″>
                  <div className="flex items-start justify-between mb-1″>
                    <span className="text-sm font-semibold text-white">{pro.name}</span>
                    <span className="text-[10px] font-semibold text-green-400 bg-green-500/15 px-1.5 py-0.5 rounded-full">Available Now</span>
                  </div>
                  <div className="text-xs text-teal-400 font-medium mb-1″>{pro.trade}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400″>
                    <span className="flex items-center gap-0.5″>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400″ /> {pro.rating}
                    </span>
                    <span>·</span>
                    <span>{pro.jobs} jobs</span>
                    <span>·</span>
                    <span>{pro.dist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-900/40 to-blue-900/30 rounded-2xl border border-teal-700/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3″>
            <div>
              <p className="text-sm font-bold text-white mb-0.5″>Get Your Full Neighborhood Report</p>
              <p className="text-xs text-slate-400″>Detailed analysis — permit history, contractor density, risk maps, price trends</p>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-sm whitespace-nowrap flex items-center gap-1.5 flex-shrink-0″>
              Get Full Report <ChevronRight className="w-4 h-4″ />
            </Button>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
