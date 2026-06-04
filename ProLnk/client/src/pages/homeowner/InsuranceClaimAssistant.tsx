import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import {
  FileCheck, Phone, Copy, CheckCircle, ExternalLink, AlertTriangle,
  Droplets, Wind, Flame, ShieldAlert, HelpCircle, Upload, ChevronRight,
  ChevronLeft, Star, Zap, Camera, BarChart2, FileText, Send,
  Clock, DollarSign, Users, TrendingUp, Circle
} from "lucide-react";

type ClaimType = "storm" | "water" | "fire" | "other";
type Severity = "minor" | "moderate" | "severe" | "total";

const CLAIM_TYPES: Record<ClaimType, { label: string; icon: typeof Droplets; color: string; bg: string; border: string; range: string }> = {
  storm: {
    label: "Storm / Wind",
    icon: Wind,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    range: "$5,000 – $50,000",
  },
  water: {
    label: "Water / Flood",
    icon: Droplets,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    range: "$3,000 – $75,000",
  },
  fire: {
    label: "Fire / Smoke",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    range: "$15,000 – $300,000+",
  },
  other: {
    label: "Other",
    icon: HelpCircle,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    range: "Varies",
  },
};

const SEVERITY_LEVELS: { key: Severity; label: string; color: string; bg: string; pct: number; multiplier: string }[] = [
  { key: "minor",    label: "Minor",      color: "text-green-400",  bg: "bg-green-500",  pct: 20,  multiplier: "< $5K" },
  { key: "moderate", label: "Moderate",   color: "text-yellow-400", bg: "bg-yellow-500", pct: 50,  multiplier: "$5K – $25K" },
  { key: "severe",   label: "Severe",     color: "text-orange-400", bg: "bg-orange-500", pct: 75,  multiplier: "$25K – $100K" },
  { key: "total",    label: "Total Loss", color: "text-red-400",    bg: "bg-red-500",    pct: 100, multiplier: "$100K+" },
];

const CLAIM_STAGES = [
  { label: "Filed",        icon: FileText, done: true },
  { label: "Under Review", icon: Clock,    done: true },
  { label: "Approved",     icon: CheckCircle, done: false },
  { label: "Paid",         icon: DollarSign,  done: false },
];

const MOCK_PHOTOS = [
  { id: 1, name: "front_damage.jpg",    size: "2.4 MB" },
  { id: 2, name: "roof_impact.jpg",     size: "1.8 MB" },
  { id: 3, name: "interior_water.jpg",  size: "3.1 MB" },
];

const AI_FINDINGS = [
  "Structural damage detected on northwest corner — consistent with wind impact",
  "Water infiltration pattern visible across ceiling and upper wall (approx. 140 sq ft)",
  "Roof decking exposure confirmed — immediate weatherproofing recommended",
  "Interior contents damage estimated at $4,200 – $7,800 replacement value",
];

export default function InsuranceClaimAssistant() {
  const [step, setStep] = useState(0);
  const [claimType, setClaimType] = useState<ClaimType | null>(null);
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [photos, setPhotos] = useState<typeof MOCK_PHOTOS>([]);
  const [aiDone, setAiDone] = useState(false);
  const [aiRunning, setAiRunning] = useState(false);
  const [incidentDate, setIncidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const typeInfo = claimType ? CLAIM_TYPES[claimType] : null;
  const severityInfo = severity ? SEVERITY_LEVELS.find(s => s.key === severity) : null;

  const runAi = () => {
    setAiRunning(true);
    setPhotos(MOCK_PHOTOS);
    setTimeout(() => {
      setAiRunning(false);
      setAiDone(true);
    }, 2200);
  };

  const claimSummary = () => {
    if (!claimType || !incidentDate || !description) return "";
    const t = CLAIM_TYPES[claimType].label;
    const s = severity ? ` Damage is assessed as ${severity}.` : "";
    return `On ${incidentDate}, my property sustained ${t.toLowerCase()} damage.${s} ${description.trim()} I am requesting a claim inspection and adjuster visit. Full photo documentation and AI damage assessment report are attached.`;
  };

  const handleCopy = () => {
    const s = claimSummary();
    if (!s) return;
    navigator.clipboard.writeText(s);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    const s = claimSummary();
    if (s) navigator.clipboard.writeText(s);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const canAdvance = [
    !!claimType,
    photos.length > 0,
    aiDone,
    !!(incidentDate && description && severity),
  ][step];

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-2xl mx-auto p-4 pb-20 space-y-5">

          <div className="pt-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">Insurance Claim Assistant</h1>
                  <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-bold">Preview</span>
                </div>
                <p className="text-sm text-slate-400">AI-powered claim documentation in 4 steps — preview of an upcoming feature</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-0">
            {["Incident", "Photos", "AI Assessment", "Report"].map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <button onClick={() => i < step && setStep(i)}
                  className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-teal-500 text-white" :
                    i === step ? "bg-teal-500/20 border-2 border-teal-400 text-teal-400" :
                    "bg-slate-800 border border-slate-700 text-slate-600"
                  }`}>
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold hidden sm:block ${i === step ? "text-teal-400" : i < step ? "text-slate-400" : "text-slate-600"}`}>{s}</span>
                </button>
                {i < 3 && (
                  <div className={`h-px flex-1 mx-1 ${i < step ? "bg-teal-500" : "bg-slate-700"}`} />
                )}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                <p className="text-sm font-bold text-white mb-3">What type of incident occurred?</p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(CLAIM_TYPES) as ClaimType[]).map(key => {
                    const t = CLAIM_TYPES[key];
                    const Icon = t.icon;
                    const active = claimType === key;
                    return (
                      <button key={key} onClick={() => setClaimType(key)}
                        className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all text-center ${
                          active ? `${t.bg} ${t.border}` : "bg-slate-900/50 border-slate-700 hover:border-slate-600"
                        }`}>
                        <Icon className={`w-7 h-7 ${active ? t.color : "text-slate-500"}`} />
                        <span className={`text-sm font-bold ${active ? "text-white" : "text-slate-400"}`}>{t.label}</span>
                        {active && <span className="text-xs text-teal-400">{t.range}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {claimType && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-3">
                  <p className="text-sm font-bold text-white">Incident details</p>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Date of incident</label>
                    <input type="date" value={incidentDate} onChange={e => setIncidentDate(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Describe what happened</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                      placeholder="Brief description of the incident and what was damaged..."
                      className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-teal-500 transition-colors resize-none placeholder:text-slate-600" />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-5 h-5 text-teal-400" />
                  <p className="text-sm font-bold text-white">Upload damage photos</p>
                </div>
                <button onClick={runAi}
                  className="w-full flex flex-col items-center gap-3 p-8 rounded-xl border-2 border-dashed border-slate-600 hover:border-teal-500/50 transition-all text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                    <Upload className="w-7 h-7 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Tap to upload or drag photos here</p>
                    <p className="text-xs text-slate-500">JPG, PNG, HEIC — up to 20 MB each</p>
                  </div>
                  <span className="px-4 py-2 rounded-xl bg-teal-500/15 text-teal-400 text-sm font-semibold border border-teal-500/20">
                    Select Photos
                  </span>
                </button>
              </div>

              {photos.length > 0 && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Uploaded ({photos.length})</p>
                  <div className="space-y-2">
                    {photos.map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-2.5 bg-slate-900/50 rounded-xl">
                        <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                          <Camera className="w-4 h-4 text-teal-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.size}</p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {!aiDone && !aiRunning && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-teal-400" />
                  </div>
                  <p className="text-base font-bold text-white mb-2">AI Damage Assessment</p>
                  <p className="text-sm text-slate-400 mb-5 max-w-xs mx-auto">Our AI will analyze your photos and generate a damage assessment report for your claim.</p>
                  <button onClick={runAi}
                    className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm transition-colors">
                    Run Assessment
                  </button>
                </div>
              )}

              {aiRunning && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500/30 flex items-center justify-center mx-auto mb-4 relative">
                    <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-base font-bold text-white mb-2">Analyzing {photos.length} photos…</p>
                  <p className="text-sm text-slate-500">Identifying damage patterns and estimating repair costs</p>
                  <div className="flex justify-center gap-1.5 mt-4">
                    {[0, 0.2, 0.4].map(d => (
                      <div key={d} className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              )}

              {aiDone && (
                <div className="space-y-4">
                  <div className="bg-teal-900/20 border border-teal-500/30 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-teal-400" />
                      <span className="text-sm font-bold text-teal-300">AI Assessment Complete</span>
                    </div>
                    <div className="space-y-2">
                      {AI_FINDINGS.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-slate-300">{f}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                    <p className="text-sm font-bold text-white mb-4">Damage Severity Assessment</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Minor</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                        <span>Total Loss</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 transition-all duration-700"
                          style={{ width: "68%" }} />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        {SEVERITY_LEVELS.map(sl => (
                          <button key={sl.key} onClick={() => setSeverity(sl.key)}
                            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                              severity === sl.key ? `bg-slate-700 ring-2 ring-teal-400` : "hover:bg-slate-800"
                            }`}>
                            <span className={`text-xs font-bold ${sl.color}`}>{sl.label}</span>
                            <span className="text-[10px] text-slate-500">{sl.multiplier}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-white">Estimated Repair Costs</p>
                      <span className="text-xs text-slate-500">AI estimate</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Structural repairs", low: 8500, high: 14200 },
                        { label: "Water / smoke remediation", low: 3200, high: 6800 },
                        { label: "Interior restoration", low: 4100, high: 9500 },
                        { label: "Contents replacement", low: 4200, high: 7800 },
                      ].map(r => (
                        <div key={r.label} className="flex items-center justify-between py-1.5 border-b border-slate-700/50 last:border-0">
                          <span className="text-sm text-slate-300">{r.label}</span>
                          <span className="text-sm font-bold text-white">${r.low.toLocaleString()} – ${r.high.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-bold text-white">Total Estimate</span>
                        <span className="text-base font-black text-teal-400">$20,000 – $38,300</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-bold text-white">Auto-Generated Claim Summary</span>
                </div>
                <div className="p-5">
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {claimType && incidentDate && description
                        ? claimSummary()
                        : "Complete the previous steps to generate your claim summary."}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={handleCopy}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-colors">
                      {copied ? <CheckCircle className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Text"}
                    </button>
                    <button onClick={handleSend}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors">
                      {sent ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                      {sent ? "Copied — send to your carrier" : "Copy for Insurance"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                <p className="text-sm font-bold text-white mb-4">Claim Progress Timeline</p>
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-700" />
                  <div className="space-y-4">
                    {CLAIM_STAGES.map((stage, i) => {
                      const Icon = stage.icon;
                      const active = i === 1;
                      return (
                        <div key={stage.label} className="flex items-center gap-4 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            stage.done
                              ? active
                                ? "bg-teal-500 ring-4 ring-teal-500/20"
                                : "bg-teal-500/30"
                              : "bg-slate-800 border border-slate-700"
                          }`}>
                            <Icon className={`w-3.5 h-3.5 ${stage.done ? (active ? "text-white" : "text-teal-400") : "text-slate-600"}`} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-bold ${stage.done ? "text-white" : "text-slate-600"}`}>{stage.label}</p>
                            {active && <p className="text-xs text-teal-400">In progress — 3–5 business days</p>}
                          </div>
                          {stage.done && !active && <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5">
                <p className="text-sm font-bold text-white mb-3">Common Carrier Claims Hotlines</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { name: "State Farm", phone: "1-800-732-5246" },
                    { name: "Allstate",   phone: "1-800-255-7828" },
                    { name: "USAA",       phone: "1-800-531-8722" },
                    { name: "Nationwide", phone: "1-800-421-3535" },
                  ].map(c => (
                    <div key={c.name} className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-xl">
                      <span className="text-sm text-white">{c.name}</span>
                      <a href={`tel:${c.phone.replace(/-/g, "")}`} className="flex items-center gap-1 text-teal-400 text-xs font-mono hover:underline">
                        <Phone className="w-3 h-3" /> {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-900/20 border border-teal-500/30 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-bold">Find Restoration Pros</p>
                    <p className="text-slate-400 text-sm mt-0.5">TrustyPro-verified contractors ready to document and restore your home.</p>
                  </div>
                  <Link href="/my-home/request-pro">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm transition-colors whitespace-nowrap">
                      <ExternalLink className="w-4 h-4" />
                      Find Pros
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-semibold disabled:opacity-40 hover:bg-slate-700 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canAdvance}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold disabled:opacity-40 transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSend}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors">
                {sent ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />} {sent ? "Copied to clipboard" : "Copy Claim Summary"}
              </button>
            )}
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
