import { useState } from "react";
import { useLocation } from "wouter";
import {
  Search, Home, CheckCircle, ArrowRight, Upload, Calendar,
  Shield, Star, Award, TrendingUp, Loader2, ChevronRight, X,
} from "lucide-react";

const PURPLE = "#8B5CF6";
const BG = "#0A1628";
const CARD = "#0F1F3D";
const BORDER = "#1E3A5F";

const MOCK_PROPERTIES: Record<string, {
  address: string; sqft: number; yearBuilt: number; lastService: string; healthScore: number; rooms: number;
}> = {
  "123 main": {
    address: "123 Main St, Frisco, TX 75034",
    sqft: 2840, yearBuilt: 2008, lastService: "Mar 12, 2026", healthScore: 87, rooms: 4,
  },
  "456 oak": {
    address: "456 Oak Ave, Plano, TX 75023",
    sqft: 3200, yearBuilt: 2001, lastService: "Jan 5, 2026", healthScore: 72, rooms: 5,
  },
  "789 elm": {
    address: "789 Elm Blvd, McKinney, TX 75069",
    sqft: 2100, yearBuilt: 2015, lastService: "Apr 20, 2026", healthScore: 94, rooms: 3,
  },
};

function scoreColor(score: number) {
  if (score >= 85) return "#10B981";
  if (score >= 65) return "#F59E0B";
  return "#EF4444";
}

type Step = "search" | "preview" | "verify" | "success";

interface Property {
  address: string; sqft: number; yearBuilt: number; lastService: string; healthScore: number; rooms: number;
}

function StepSearch({ onFound }: { onFound: (p: Property) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setTimeout(() => {
      const key = Object.keys(MOCK_PROPERTIES).find((k) =>
        query.toLowerCase().includes(k)
      );
      if (key) {
        onFound(MOCK_PROPERTIES[key]);
      } else {
        onFound({
          address: query.trim(),
          sqft: 2450, yearBuilt: 2006, lastService: "Never recorded",
          healthScore: 61, rooms: 4,
        });
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-8">
      <div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
          style={{ backgroundColor: `${PURPLE}20`, color: PURPLE, border: `1px solid ${PURPLE}40` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Pro Portfolio Tool
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Claim a Home to Your Portfolio</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
          Search any property you've serviced. Claim it to earn origination rights, lock in future lead priority, and build a permanent service history on the home.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="123 Main St, Frisco, TX 75034"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSearch()}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-slate-500 border focus:outline-none focus:ring-2 focus:ring-violet-500"
            style={{ backgroundColor: CARD, borderColor: BORDER }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: PURPLE }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Search</>}
        </button>
      </div>

      <div
        className="rounded-2xl border p-5 space-y-3"
        style={{ backgroundColor: CARD, borderColor: BORDER }}
      >
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Why claim homes?</p>
        <div className="space-y-3">
          {[
            { icon: TrendingUp, color: PURPLE, title: "Earn origination rights", desc: "Get a permanent share of platform revenue from every future job on this home." },
            { icon: Star, color: "#F59E0B", title: "Get future lead priority", desc: "When this homeowner needs a pro, you show up first — every time." },
            { icon: Shield, color: "#10B981", title: "Build home history", desc: "Your service record follows the home. It proves your work quality permanently." },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPreview({ property, onClaim, onBack }: { property: Property; onClaim: () => void; onBack: () => void }) {
  const sc = scoreColor(property.healthScore);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Property Found</p>
          <h2 className="text-xl font-black text-white">Confirm the property</h2>
        </div>
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ backgroundColor: CARD, borderColor: BORDER }}
      >
        <div
          className="h-32 flex items-center justify-center relative"
          style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #312e81 100%)" }}
        >
          <Home className="w-16 h-16 text-white/10" />
          <div className="absolute bottom-3 left-4">
            <p className="text-white font-black text-sm leading-tight">{property.address}</p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-2 gap-4">
          {[
            { label: "Square Feet", value: property.sqft.toLocaleString() },
            { label: "Year Built", value: property.yearBuilt },
            { label: "Last Service", value: property.lastService },
            { label: "Bedrooms", value: `${property.rooms} bd` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-slate-500">{label}</p>
              <p className="text-sm font-bold text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          <div
            className="rounded-xl p-4 flex items-center justify-between"
            style={{ backgroundColor: `${sc}15`, border: `1px solid ${sc}30` }}
          >
            <div>
              <p className="text-xs text-slate-400">Home Health Score</p>
              <p className="text-2xl font-black mt-0.5" style={{ color: sc }}>{property.healthScore}</p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border-4"
              style={{ borderColor: sc }}
            >
              <span className="text-lg font-black" style={{ color: sc }}>{property.healthScore}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClaim}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: PURPLE }}
      >
        Claim This Home <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepVerify({ property, onDone, onBack }: { property: Property; onDone: () => void; onBack: () => void }) {
  const [serviceDate, setServiceDate] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!serviceDate || !confirmed) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onDone(); }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verify Service</p>
          <h2 className="text-xl font-black text-white">Confirm you serviced this home</h2>
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-3 flex items-center gap-2 border"
        style={{ backgroundColor: `${PURPLE}15`, borderColor: `${PURPLE}30` }}
      >
        <Home className="w-4 h-4 flex-shrink-0" style={{ color: PURPLE }} />
        <p className="text-sm text-violet-300 truncate">{property.address}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Service Date <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="date"
              value={serviceDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setServiceDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-white border focus:outline-none focus:ring-2 focus:ring-violet-500"
              style={{ backgroundColor: CARD, borderColor: BORDER }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            Proof Photo (optional but recommended)
          </label>
          <div
            onClick={() => setHasPhoto(true)}
            className="rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors"
            style={{
              borderColor: hasPhoto ? PURPLE : BORDER,
              backgroundColor: hasPhoto ? `${PURPLE}10` : "transparent",
            }}
          >
            {hasPhoto ? (
              <>
                <CheckCircle className="w-6 h-6" style={{ color: PURPLE }} />
                <p className="text-sm font-semibold" style={{ color: PURPLE }}>Photo uploaded</p>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 text-slate-500" />
                <p className="text-sm text-slate-400">Click to upload before/after photos</p>
                <p className="text-xs text-slate-600">JPG, PNG up to 10 MB</p>
              </>
            )}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => setConfirmed(!confirmed)}
            className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors cursor-pointer"
            style={{
              backgroundColor: confirmed ? PURPLE : "transparent",
              borderColor: confirmed ? PURPLE : "#374151",
            }}
          >
            {confirmed && <CheckCircle className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-slate-400 leading-snug">
            I confirm I personally performed service at this property and my records are accurate.
          </span>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!serviceDate || !confirmed || loading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: PURPLE }}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Claim <ArrowRight className="w-4 h-4" /></>}
      </button>
    </div>
  );
}

function StepSuccess({ property }: { property: Property }) {
  const [, navigate] = useLocation();

  return (
    <div className="text-center space-y-6">
      <div className="relative inline-block">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
          style={{ background: `radial-gradient(circle, ${PURPLE}40 0%, ${PURPLE}10 100%)`, border: `2px solid ${PURPLE}` }}
        >
          <Award className="w-12 h-12" style={{ color: PURPLE }} />
        </div>
        <div
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2"
          style={{ backgroundColor: "#10B981", borderColor: BG }}
        >
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-2">Home Claimed!</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
          You've earned origination rights on <span className="text-white font-semibold">{property.address}</span>.
          You'll get lead priority and a share of platform fees — permanently.
        </p>
      </div>

      <div
        className="rounded-2xl border p-5 text-left space-y-3"
        style={{ backgroundColor: CARD, borderColor: BORDER }}
      >
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">What you've unlocked</p>
        {[
          { icon: TrendingUp, color: PURPLE, text: "Origination rights active — you earn from every future job here" },
          { icon: Star, color: "#F59E0B", text: "Lead priority set — you're first in line when this home needs service" },
          { icon: Shield, color: "#10B981", text: "Service record logged — visible to future homeowners" },
        ].map(({ icon: Icon, color, text }) => (
          <div key={text} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <p className="text-sm text-slate-300">{text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/trustypro/gallery")}
          className="flex-1 py-3 rounded-xl text-sm font-bold border transition-colors hover:border-violet-500 text-white"
          style={{ borderColor: BORDER }}
        >
          View Portfolio
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: PURPLE }}
        >
          Claim Another Home
        </button>
      </div>
    </div>
  );
}

export default function ClaimHome() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<Step>("search");
  const [property, setProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG, fontFamily: "'Inter', sans-serif" }}>
      <nav
        className="sticky top-0 z-40 border-b backdrop-blur-sm"
        style={{ backgroundColor: "rgba(10,22,40,0.95)", borderColor: BORDER }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/trustypro/partner-dashboard")}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PURPLE }}>TrustyPro™</p>
              <p className="text-sm font-black text-white leading-tight">Claim Home</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(["search", "preview", "verify", "success"] as Step[]).map((s, i) => {
              const steps: Step[] = ["search", "preview", "verify", "success"];
              const cur = steps.indexOf(step);
              const idx = steps.indexOf(s);
              return (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ backgroundColor: idx <= cur ? PURPLE : "#1E3A5F" }}
                  />
                  {i < 3 && <div className="w-6 h-px" style={{ backgroundColor: idx < cur ? PURPLE : "#1E3A5F" }} />}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-12">
        {step === "search" && (
          <StepSearch onFound={(p) => { setProperty(p); setStep("preview"); }} />
        )}
        {step === "preview" && property && (
          <StepPreview
            property={property}
            onClaim={() => setStep("verify")}
            onBack={() => setStep("search")}
          />
        )}
        {step === "verify" && property && (
          <StepVerify
            property={property}
            onDone={() => setStep("success")}
            onBack={() => setStep("preview")}
          />
        )}
        {step === "success" && property && (
          <StepSuccess property={property} />
        )}
      </div>
    </div>
  );
}
