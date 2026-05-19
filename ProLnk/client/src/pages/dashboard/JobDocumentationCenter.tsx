import { useState } from "react";
import {
  Camera, FileText, FolderOpen, CheckCircle, AlertTriangle, XCircle,
  Image, Download, Upload, HardDrive, ChevronRight, Wrench,
  Calendar, MapPin, Hash, Archive,
} from "lucide-react";

const D = {
  bg: "#0A1628″,
  surface: "#0F1E35″,
  card: "#152035″,
  border: "#1E2E45″,
  text: "#F0F4FF",
  muted: "#7A8BA8″,
  dim: "#3A4E68″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  blue: "#3B82F6″,
  purple: "#A855F7″,
};

interface JobRecord {
  jobNum: string;
  date: string;
  address: string;
  service: string;
  photoCount: number;
  docs: string[];
}

interface ChecklistItem {
  label: string;
  pct: number;
  status: "good" | "warning" | "bad";
}

const JOB_RECORDS: JobRecord[] = [
  {
    jobNum: "JB-0847″,
    date: "May 12, 2026″,
    address: "4820 Oak Creek Dr, ****",
    service: "HVAC Replacement",
    photoCount: 14,
    docs: ["Contract", "Invoice", "Warranty"],
  },
  {
    jobNum: "JB-0846″,
    date: "May 8, 2026″,
    address: "2211 Ridgewood Ln, ****",
    service: "Electrical Panel Upgrade",
    photoCount: 9,
    docs: ["Contract", "Invoice"],
  },
  {
    jobNum: "JB-0845″,
    date: "May 4, 2026″,
    address: "7743 Sunrise Blvd, ****",
    service: "Roof Repair",
    photoCount: 22,
    docs: ["Contract", "Invoice", "Warranty"],
  },
  {
    jobNum: "JB-0844″,
    date: "Apr 30, 2026″,
    address: "1055 Parkview Ct, ****",
    service: "Plumbing — Water Heater",
    photoCount: 6,
    docs: ["Invoice"],
  },
  {
    jobNum: "JB-0843″,
    date: "Apr 26, 2026″,
    address: "3398 Elmwood Dr, ****",
    service: "Foundation Repair",
    photoCount: 18,
    docs: ["Contract", "Invoice"],
  },
];

const CHECKLIST: ChecklistItem[] = [
  { label: "Before photos", pct: 94, status: "good" },
  { label: "After photos", pct: 89, status: "good" },
  { label: "Signed contract", pct: 67, status: "warning" },
  { label: "Invoice copy", pct: 98, status: "good" },
  { label: "Warranty documentation", pct: 23, status: "bad" },
];

const DOC_COLORS: Record<string, string> = {
  Contract: "bg-blue-900/40 text-blue-400″,
  Invoice: "bg-green-900/40 text-green-400″,
  Warranty: "bg-purple-900/40 text-purple-400″,
};

function StatusIcon({ status }: { status: "good" | "warning" | "bad" }) {
  if (status === "good") return <CheckCircle style={{ color: D.green }} className="w-5 h-5 flex-shrink-0″ />;
  if (status === "warning") return <AlertTriangle style={{ color: D.amber }} className="w-5 h-5 flex-shrink-0″ />;
  return <XCircle style={{ color: D.red }} className="w-5 h-5 flex-shrink-0″ />;
}

function ChecklistBar({ pct, status }: { pct: number; status: "good" | "warning" | "bad" }) {
  const color = status === "good" ? D.green : status === "warning" ? D.amber : D.red;
  return (
    <div className="w-full rounded-full h-1.5″ style={{ backgroundColor: D.border }}>
      <div
        className="h-1.5 rounded-full transition-all duration-700″
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function JobDocumentationCenter() {
  const [uploadPrompted, setUploadPrompted] = useState(false);

  const storageUsedPct = (2.4 / 10) * 100;

  return (
    <div className="min-h-screen pb-12″ style={{ backgroundColor: D.bg }}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div
          className="rounded-2xl p-8″
          style={{
            background: `linear-gradient(135deg, #0F2A4A 0%, #152035 100%)`,
            border: `1px solid ${D.border}`,
          }}
        >
          <div className="flex items-center gap-3 mb-2″>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#00D4FF20″ }}>
              <FolderOpen className="w-5 h-5″ style={{ color: D.cyan }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: D.text }}>Job Documentation</h1>
              <p className="text-sm" style={{ color: D.cyan }}>Your work, on record</p>
            </div>
          </div>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: D.muted }}>
            Complete documentation protects you from disputes, supports warranty claims, and
            builds the trust that earns 5-star reviews.
          </p>
        </div>

        {/* Document Stats */}
        <div className="grid grid-cols-3 gap-4″>
          {[
            { label: "Jobs Documented", value: "84″, icon: FolderOpen, color: D.cyan },
            { label: "Photos Uploaded", value: "847″, icon: Camera, color: D.purple },
            { label: "Avg Photos/Job", value: "10.1″, icon: Image, color: D.green },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl p-5″ style={{ backgroundColor: D.card, border: `1px solid ${D.border}` }}>
                <div className="flex items-center justify-between mb-3″>
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: D.muted }}>{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: D.surface }}>
                    <Icon className="w-4 h-4″ style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Jobs */}
        <div className="rounded-2xl p-6″ style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
          <h2 className="text-lg font-semibold mb-5″ style={{ color: D.text }}>Recent Jobs</h2>
          <div className="space-y-4″>
            {JOB_RECORDS.map((job) => (
              <div
                key={job.jobNum}
                className="rounded-xl p-5″
                style={{ backgroundColor: D.card, border: `1px solid ${D.border}` }}
              >
                <div className="flex items-start justify-between mb-3″>
                  <div>
                    <div className="flex items-center gap-2 mb-1″>
                      <Hash className="w-3.5 h-3.5″ style={{ color: D.cyan }} />
                      <span className="font-semibold text-sm" style={{ color: D.cyan }}>{job.jobNum}</span>
                      <span className="text-xs" style={{ color: D.muted }}>·</span>
                      <Calendar className="w-3.5 h-3.5″ style={{ color: D.muted }} />
                      <span className="text-xs" style={{ color: D.muted }}>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1″>
                      <MapPin className="w-3.5 h-3.5″ style={{ color: D.muted }} />
                      <span className="text-sm" style={{ color: D.text }}>{job.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5″>
                      <Wrench className="w-3.5 h-3.5″ style={{ color: D.muted }} />
                      <span className="text-sm" style={{ color: D.muted }}>{job.service}</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-xs flex items-center gap-1 transition-opacity hover:opacity-80″
                    style={{ color: D.cyan }}
                  >
                    View docs
                    <ChevronRight className="w-3.5 h-3.5″ />
                  </a>
                </div>

                {/* Photo thumbnails */}
                <div className="flex items-center gap-2 mb-3″>
                  <div className="flex gap-1.5″>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: D.dim }}
                      >
                        <Image className="w-5 h-5″ style={{ color: D.muted }} />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs ml-1″ style={{ color: D.muted }}>
                    +{job.photoCount - 3} more · {job.photoCount} total
                  </span>
                </div>

                {/* Doc badges */}
                <div className="flex gap-2 flex-wrap">
                  {(["Contract", "Invoice", "Warranty"] as const).map((docType) => {
                    const has = job.docs.includes(docType);
                    return (
                      <span
                        key={docType}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          has
                            ? DOC_COLORS[docType]
                            : "text-slate-500″
                        }`}
                        style={has ? undefined : { backgroundColor: D.border + "80″ }}
                      >
                        {has ? "✓" : "✗"} {docType}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Checklist */}
        <div className="rounded-2xl p-6″ style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-3 mb-2″>
            <CheckCircle className="w-5 h-5″ style={{ color: D.green }} />
            <h2 className="text-lg font-semibold" style={{ color: D.text }}>Documentation Checklist</h2>
          </div>
          <p className="text-sm mb-5″ style={{ color: D.muted }}>
            For complete protection, each job should have:
          </p>
          <div className="space-y-4″>
            {CHECKLIST.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2″>
                  <div className="flex items-center gap-2″>
                    <StatusIcon status={item.status} />
                    <span className="text-sm" style={{ color: D.text }}>{item.label}</span>
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color:
                        item.status === "good" ? D.green
                        : item.status === "warning" ? D.amber
                        : D.red,
                    }}
                  >
                    {item.pct}% of jobs
                  </span>
                </div>
                <ChecklistBar pct={item.pct} status={item.status} />
              </div>
            ))}
          </div>

          <div
            className="mt-5 rounded-xl p-4 flex items-start gap-3″
            style={{ backgroundColor: D.amber + "15″, border: `1px solid ${D.amber}40` }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5″ style={{ color: D.amber }} />
            <div>
              <div className="text-sm font-semibold mb-1″ style={{ color: D.amber }}>
                23 jobs missing signed contracts
              </div>
              <p className="text-xs leading-relaxed" style={{ color: D.muted }}>
                Unsigned contracts expose you to dispute risk. Upload scanned or digital signatures for past jobs.
              </p>
            </div>
          </div>

          <button
            onClick={() => setUploadPrompted(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-colors"
            style={{
              backgroundColor: uploadPrompted ? D.green + "20″ : D.cyan + "20",
              color: uploadPrompted ? D.green : D.cyan,
              border: `1px solid ${uploadPrompted ? D.green : D.cyan}40`,
            }}
          >
            <Upload className="w-4 h-4″ />
            {uploadPrompted ? "Upload dialog opened" : "Upload Missing Docs"}
          </button>
        </div>

        {/* Storage + Export */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4″>
          {/* Storage */}
          <div className="rounded-2xl p-6″ style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
            <div className="flex items-center gap-3 mb-4″>
              <HardDrive className="w-5 h-5″ style={{ color: D.blue }} />
              <h2 className="text-base font-semibold" style={{ color: D.text }}>Storage</h2>
            </div>
            <div className="flex items-end gap-2 mb-3″>
              <span className="text-3xl font-black" style={{ color: D.blue }}>2.4 GB</span>
              <span className="text-sm mb-1″ style={{ color: D.muted }}>of 10 GB</span>
            </div>
            <div className="w-full rounded-full h-3 mb-2″ style={{ backgroundColor: D.border }}>
              <div
                className="h-3 rounded-full transition-all duration-700″
                style={{ width: `${storageUsedPct}%`, backgroundColor: D.blue }}
              />
            </div>
            <div className="text-xs" style={{ color: D.muted }}>
              {(10 - 2.4).toFixed(1)} GB available · {Math.round(storageUsedPct)}% used
            </div>
          </div>

          {/* Export */}
          <div className="rounded-2xl p-6 flex flex-col justify-between" style={{ backgroundColor: D.surface, border: `1px solid ${D.border}` }}>
            <div className="flex items-center gap-3 mb-4″>
              <Archive className="w-5 h-5″ style={{ color: D.purple }} />
              <h2 className="text-base font-semibold" style={{ color: D.text }}>Export Records</h2>
            </div>
            <p className="text-sm mb-4″ style={{ color: D.muted }}>
              Download all job documentation as a ZIP archive — photos, contracts, invoices, and warranties.
            </p>
            <button
              className="w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-colors"
              style={{
                backgroundColor: D.purple + "20″,
                color: D.purple,
                border: `1px solid ${D.purple}40`,
              }}
            >
              <Download className="w-4 h-4″ />
              Export All Records (ZIP)
            </button>
            <div className="flex items-center gap-1.5 mt-3 justify-center">
              <FileText className="w-3 h-3″ style={{ color: D.muted }} />
              <span className="text-xs" style={{ color: D.muted }}>84 jobs · 847 photos · ~2.4 GB</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
