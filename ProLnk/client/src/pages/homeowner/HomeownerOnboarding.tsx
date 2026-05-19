import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin, Wrench, Wind, Droplets, Home, Sun,
  Zap, Shield, Wifi, Sprout, ChevronRight, ChevronLeft,
  CheckCircle, Star, DollarSign, Heart, AlertTriangle,
  Camera, Search, Bell, ChevronDown,
} from "lucide-react";

const STEP_TITLES = [
  "Your Home",
  "Home Systems",
  "Service History",
  "What Matters Most",
  "All Set!",
];

const HOME_SYSTEMS = [
  { id: "hvac",     label: "HVAC",           icon: Wind },
  { id: "pool",     label: "Pool",           icon: Droplets },
  { id: "septic",   label: "Well / Septic",  icon: Sprout },
  { id: "solar",    label: "Solar",          icon: Sun },
  { id: "smart",    label: "Smart Home",     icon: Wifi },
  { id: "gen",      label: "Generator",      icon: Zap },
  { id: "sprinkler",label: "Sprinkler",      icon: Droplets },
  { id: "security", label: "Security System",icon: Shield },
];

const SERVICE_HISTORY_ITEMS = [
  { id: "hvac",     label: "HVAC Last Service" },
  { id: "roof",     label: "Roof Last Inspected" },
  { id: "plumbing", label: "Plumbing Last Service" },
];

const SERVICE_AGE_OPTIONS = [
  "Within 1 year",
  "1-3 years",
  "3+ years",
  "Never / Unknown",
];

const PRIORITIES = [
  { id: "cost",      label: "Cost Savings",           icon: DollarSign, desc: "Find the best value pros and avoid overpaying", color: "#10B981″ },
  { id: "emergency", label: "Emergency Preparedness", icon: AlertTriangle, desc: "Fast response pros when things break",          color: "#EF4444″ },
  { id: "value",     label: "Home Value",             icon: Star,         desc: "Improvements that increase resale price",       color: "#F59E0B" },
  { id: "prevent",   label: "Preventive Care",        icon: Heart,        desc: "Stay ahead of maintenance before issues arise", color: "#8B5CF6″ },
];

type ServiceHistoryState = Record<string, string>;
type PriorityRank = Record<string, number>;

export default function HomeownerOnboarding() {
  const [step, setStep] = useState(1);

  // Step 1
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("3″);
  const [baths, setBaths] = useState("2″);
  const [sqft, setSqft] = useState("1800″);
  const [yearBuilt, setYearBuilt] = useState("1995″);

  // Step 2
  const [systems, setSystems] = useState<Set<string>>(new Set(["hvac"]));

  // Step 3
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryState>({
    hvac: SERVICE_AGE_OPTIONS[0],
    roof: SERVICE_AGE_OPTIONS[1],
    plumbing: SERVICE_AGE_OPTIONS[0],
  });

  // Step 4
  const [priorityRanks, setPriorityRanks] = useState<PriorityRank>({});
  const nextRank = Math.max(0, ...Object.values(priorityRanks)) + 1;

  function toggleSystem(id: string) {
    setSystems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function setHistory(id: string, val: string) {
    setServiceHistory((prev) => ({ ...prev, [id]: val }));
  }

  function togglePriority(id: string) {
    setPriorityRanks((prev) => {
      if (prev[id]) {
        const removed = prev[id];
        const updated: PriorityRank = {};
        for (const [k, v] of Object.entries(prev)) {
          if (k !== id) updated[k] = v > removed ? v - 1 : v;
        }
        return updated;
      }
      return { ...prev, [id]: nextRank };
    });
  }

  const pct = ((step - 1) / (STEP_TITLES.length - 1)) * 100;

  return (
    <HomeownerLayout>
      <div className="max-w-xl mx-auto px-4 py-8″>
        {/* Progress */}
        <div className="mb-8″>
          <div className="flex justify-between text-xs text-white/50 mb-2″>
            {STEP_TITLES.map((t, i) => (
              <span
                key={t}
                className={`${i + 1 === step ? "text-[#00B5B8] font-medium" : i + 1 < step ? "text-white/70" : ""}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00B5B8] rounded-full transition-all duration-500″
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-white/50 mt-2 text-center">
            Step {step} of {STEP_TITLES.length} — {STEP_TITLES[step - 1]}
          </p>
        </div>

        {/* Step 1: Your Home */}
        {step === 1 && (
          <div className="space-y-5″>
            <div>
              <h2 className="text-2xl font-bold mb-1″>Your Home</h2>
              <p className="text-white/50 text-sm">Tell us where you live so we can match you with local pros.</p>
            </div>
            <div>
              <Label className="text-white/70 text-sm">Home Address</Label>
              <div className="relative mt-1″>
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40″ />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Dallas TX 75201″
                  className="bg-white/5 border-white/10 text-white pl-9″
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3″>
              <div>
                <Label className="text-white/70 text-sm">Bedrooms</Label>
                <Input value={beds} onChange={(e) => setBeds(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1″ />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Bathrooms</Label>
                <Input value={baths} onChange={(e) => setBaths(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1″ />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Square Feet</Label>
                <Input value={sqft} onChange={(e) => setSqft(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1″ />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Year Built</Label>
                <Input value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} className="bg-white/5 border-white/10 text-white mt-1″ />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Home Systems */}
        {step === 2 && (
          <div className="space-y-5″>
            <div>
              <h2 className="text-2xl font-bold mb-1″>Home Systems</h2>
              <p className="text-white/50 text-sm">Check all systems your home has. We'll track maintenance for each.</p>
            </div>
            <div className="grid grid-cols-2 gap-3″>
              {HOME_SYSTEMS.map((s) => {
                const Icon = s.icon;
                const active = systems.has(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSystem(s.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-colors ${
                      active
                        ? "bg-[#00B5B8]/15 border-[#00B5B8] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30″
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-[#00B5B8]" : ""}`} />
                    <span className="text-sm font-medium">{s.label}</span>
                    {active && <CheckCircle className="w-4 h-4 text-[#00B5B8] ml-auto" />}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-white/40″>{systems.size} systems selected</p>
          </div>
        )}

        {/* Step 3: Service History */}
        {step === 3 && (
          <div className="space-y-5″>
            <div>
              <h2 className="text-2xl font-bold mb-1″>Service History</h2>
              <p className="text-white/50 text-sm">When were these last serviced? We'll set reminders based on your answers.</p>
            </div>
            <div className="space-y-4″>
              {SERVICE_HISTORY_ITEMS.map((item) => (
                <div key={item.id}>
                  <Label className="text-white/70 text-sm">{item.label}</Label>
                  <div className="relative mt-1″>
                    <select
                      value={serviceHistory[item.id]}
                      onChange={(e) => setHistory(item.id, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-[#00B5B8]"
                    >
                      {SERVICE_AGE_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0D1F3C]">{o}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Priorities */}
        {step === 4 && (
          <div className="space-y-5″>
            <div>
              <h2 className="text-2xl font-bold mb-1″>What Matters Most?</h2>
              <p className="text-white/50 text-sm">Tap to rank your top priorities. We'll personalize your experience.</p>
            </div>
            <div className="space-y-3″>
              {PRIORITIES.map((p) => {
                const Icon = p.icon;
                const rank = priorityRanks[p.id];
                const selected = !!rank;
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePriority(p.id)}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border text-left transition-colors ${
                      selected
                        ? "border-opacity-60 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/30″
                    }`}
                    style={selected ? { background: `${p.color}12`, borderColor: `${p.color}60` } : {}}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0″
                      style={{ background: `${p.color}20` }}
                    >
                      <Icon className="w-5 h-5″ style={{ color: p.color }} />
                    </div>
                    <div className="flex-1 min-w-0″>
                      <p className="font-medium text-sm">{p.label}</p>
                      <p className="text-xs text-white/50″>{p.desc}</p>
                    </div>
                    {selected && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0″
                        style={{ background: p.color }}
                      >
                        {rank}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Complete */}
        {step === 5 && (
          <div className="text-center space-y-6 py-4″>
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#00B5B8]/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#00B5B8]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2″>Your home is in the vault!</h2>
              <p className="text-white/50 text-sm">We've saved your home profile. Here’s what you can do next.</p>
            </div>
            <div className="space-y-3 text-left">
              {[
                {
                  icon: Camera,
                  label: "Get your first scan",
                  desc: "AI-powered home health analysis in minutes",
                  href: "/my-home/scan",
                  color: "#00B5B8″,
                },
                {
                  icon: Search,
                  label: "Find trusted pros",
                  desc: "Browse verified professionals in your area",
                  href: "/find-pros",
                  color: "#8B5CF6″,
                },
                {
                  icon: Bell,
                  label: "Set maintenance reminders",
                  desc: "Never miss a service date again",
                  href: "/my-home/reminders",
                  color: "#F59E0B",
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.label}
                    href={card.href}
                    className="flex items-center gap-4 px-4 py-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0″
                      style={{ background: `${card.color}20` }}
                    >
                      <Icon className="w-5 h-5″ style={{ color: card.color }} />
                    </div>
                    <div className="flex-1 min-w-0″>
                      <p className="font-medium text-sm">{card.label}</p>
                      <p className="text-xs text-white/50″>{card.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/30 shrink-0″ />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10″>
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="border-white/20 text-white hover:bg-white/10 gap-2 disabled:opacity-30″
            >
              <ChevronLeft className="w-4 h-4″ />
              Back
            </Button>
            <Button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="bg-[#00B5B8] hover:bg-[#00a0a3] text-white gap-2″
            >
              {step === 4 ? "Finish" : "Next"}
              <ChevronRight className="w-4 h-4″ />
            </Button>
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
