import { useState } from "react";
import {
  ShieldCheck, Upload, Download, AlertTriangle, CheckCircle,
  Clock, FileText, Zap, Info, X, ChevronDown,
} from "lucide-react";

type Credential = {
  id: string;
  title: string;
  detail: string;
  coverage?: string;
  expiry: string;
  daysUntil: number;
  status: "verified" | "expiring" | "expired";
  badge: string;
};

const CREDENTIALS: Credential[] = [
  {
    id: "license",
    title: "State Contractor License",
    detail: "TX-HVAC-48291",
    expiry: "Dec 2026",
    daysUntil: 230,
    status: "verified",
    badge: "Verified",
  },
  {
    id: "gl",
    title: "General Liability Insurance",
    detail: "$1M coverage",
    expiry: "Aug 2026",
    daysUntil: 77,
    status: "expiring",
    badge: "Expiring Soon",
  },
  {
    id: "wc",
    title: "Workers' Comp Insurance",
    detail: "$500K coverage",
    expiry: "Aug 2026",
    daysUntil: 77,
    status: "expiring",
    badge: "Expiring Soon",
  },
  {
    id: "bg",
    title: "Background Check",
    detail: "Clear",
    expiry: "May 2027",
    daysUntil: 365,
    status: "verified",
    badge: "Current",
  },
  {
    id: "cert",
    title: "Trade Certification",
    detail: "NATE Certified HVAC",
    expiry: "—",
    daysUntil: 999,
    status: "verified",
    badge: "Active",
  },
];

const CREDENTIAL_TYPES = [
  "State Contractor License",
  "General Liability Insurance",
  "Workers' Comp Insurance",
  "Background Check",
  "Trade Certification",
  "Bond / Surety Bond",
  "EPA Certification",
  "Other",
];

function StatusPill({ status, badge }: { status: Credential["status"]; badge: string }) {
  const styles = {
    verified: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    expiring: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    expired: "bg-red-500/15 text-red-300 border-red-500/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {status === "verified" && <CheckCircle className="w-3 h-3" />}
      {status === "expiring" && <AlertTriangle className="w-3 h-3" />}
      {status === "expired" && <X className="w-3 h-3" />}
      {badge}
    </span>
  );
}

function ComplianceRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-36 h-36">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 136 136">
          <circle cx="68" cy="68" r={r} fill="none" stroke="#1E3A5F" strokeWidth="10" />
          <circle
            cx="68" cy="68" r={r} fill="none"
            stroke="url(#ringGrad)" strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00B5B8" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
          <span className="text-slate-400 text-xs">/100</span>
        </div>
      </div>
      <span className="text-emerald-300 font-semibold text-sm mt-2">Well Verified</span>
      <span className="text-slate-400 text-xs mt-0.5">Compliance Score</span>
    </div>
  );
}

export default function CertificationsLicenses() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [credType, setCredType] = useState(CREDENTIAL_TYPES[0]);
  const [expiryDate, setExpiryDate] = useState("");

  const expiring = CREDENTIALS.filter(c => c.status === "expiring");

  return (
    <div className="min-h-screen bg-[#0A1628] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Credentials & Licenses</h1>
        <p className="text-slate-400 text-sm mt-1">Keep your profile verified and compliant</p>
      </div>

      {/* Score + Why it matters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0F2040] border border-slate-700/50 rounded-xl p-6 flex items-center justify-center">
          <ComplianceRing score={87} />
        </div>
        <div className="lg:col-span-2 bg-[#0F2040] border border-cyan-500/20 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="text-white font-semibold">Why This Matters</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-slate-300 text-sm">Fully verified partners receive <span className="text-cyan-300 font-bold">3x more leads</span> from the ProLnk matching engine</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-slate-300 text-sm">Verified profiles show a trust badge and achieve <span className="text-emerald-300 font-bold">94% higher conversion</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-slate-300 text-sm">Missing or expired credentials can <span className="text-red-300 font-bold">suspend your account</span> from receiving leads</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-slate-500 text-xs">All credentials are reviewed by our compliance team within 24 hours of upload</p>
          </div>
        </div>
      </div>

      {/* Expiring Alerts */}
      {expiring.length > 0 && (
        <div className="mb-6 flex flex-col gap-3">
          {expiring.map(c => (
            <div key={c.id} className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-amber-200 font-semibold text-sm">{c.title} expires in {c.daysUntil} days</p>
                  <p className="text-amber-400/70 text-xs mt-0.5">Renew now to avoid suspension from receiving leads</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold transition-colors shrink-0"
              >
                Renew Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Credential Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {CREDENTIALS.map(c => (
          <div
            key={c.id}
            className={`bg-[#0F2040] border rounded-xl p-5 flex flex-col gap-3 ${
              c.status === "expiring" ? "border-amber-500/30" : c.status === "expired" ? "border-red-500/30" : "border-slate-700/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <p className="text-white font-semibold text-sm">{c.title}</p>
              </div>
              <StatusPill status={c.status} badge={c.badge} />
            </div>
            <div>
              <p className="text-slate-300 text-sm font-medium">{c.detail}</p>
              {c.coverage && <p className="text-slate-400 text-xs mt-0.5">{c.coverage}</p>}
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{c.expiry === "—" ? "No expiry" : `Expires ${c.expiry}`}</span>
              {c.daysUntil < 120 && c.daysUntil < 999 && (
                <span className={`ml-1 font-medium ${c.daysUntil < 90 ? "text-amber-400" : "text-slate-400"}`}>
                  ({c.daysUntil} days)
                </span>
              )}
            </div>
            <div className="flex gap-2 pt-1 border-t border-slate-700/50">
              <button
                onClick={() => setShowUploadForm(true)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload New CTA */}
      <div className="mb-6">
        <button
          onClick={() => setShowUploadForm(v => !v)}
          className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload New Credential
          <ChevronDown className={`w-4 h-4 transition-transform ${showUploadForm ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Inline Upload Form */}
      {showUploadForm && (
        <div className="bg-[#0F2040] border border-cyan-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-semibold">Add New Credential</h3>
            <button onClick={() => setShowUploadForm(false)} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Credential Type</label>
              <div className="relative">
                <select
                  value={credType}
                  onChange={e => setCredType(e.target.value)}
                  className="w-full appearance-none bg-[#0A1628] border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm pr-8 focus:outline-none focus:border-cyan-500"
                >
                  {CREDENTIAL_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1.5">Expiration Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
                className="w-full bg-[#0A1628] border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div className="border-2 border-dashed border-slate-600 hover:border-cyan-500/50 rounded-xl p-8 text-center mb-5 cursor-pointer transition-colors group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
            <p className="text-slate-400 text-sm">Drop your file here or <span className="text-cyan-400">browse</span></p>
            <p className="text-slate-600 text-xs mt-1">PDF, JPG, or PNG · Max 10MB</p>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl text-sm transition-colors">
              Submit for Review
            </button>
            <button
              onClick={() => setShowUploadForm(false)}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
