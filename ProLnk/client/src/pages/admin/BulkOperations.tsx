import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, DCard, SectionHeader, StatusBadge } from "@/components/DashboardShared";
import { Layers, Mail, Calculator, DollarSign, Download, Archive, RefreshCw, AlertTriangle, CheckCircle, Clock, Play } from "lucide-react";

type OpStatus = "success" | "running" | "error" | "idle";

interface BulkOp {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  duration: string;
  records: string;
  icon: typeof Mail;
  color: string;
  dangerous: boolean;
  status: OpStatus;
}

const OPERATIONS: BulkOp[] = [
  {
    id: "email-active",
    name: "Email All Active Partners",
    description: "Send a broadcast email to all 614 active partners. Uses Resend bulk send API.",
    lastRun: "May 12, 2026 · 9:14am",
    duration: "~2 min",
    records: "614 partners",
    icon: Mail,
    color: D.cyan,
    dangerous: false,
    status: "idle",
  },
  {
    id: "recalc-pps",
    name: "Recalculate All PPS Scores",
    description: "Recompute partner performance scores based on latest match history and ratings.",
    lastRun: "May 14, 2026 · 11:00pm",
    duration: "~8 min",
    records: "1,863 partners",
    icon: Calculator,
    color: D.purple,
    dangerous: false,
    status: "idle",
  },
  {
    id: "payout-sweep",
    name: "Trigger Payout Sweep",
    description: "Initiate Stripe payout transfers for all approved commissions above $50 threshold.",
    lastRun: "May 1, 2026 · 12:00am",
    duration: "~15 min",
    records: "$14,847 queued",
    icon: DollarSign,
    color: D.green,
    dangerous: true,
    status: "idle",
  },
  {
    id: "export-csv",
    name: "Export Partner List CSV",
    description: "Generate a full CSV export of all partner records including contact info and tier.",
    lastRun: "May 10, 2026 · 3:22pm",
    duration: "~30 sec",
    records: "1,863 rows",
    icon: Download,
    color: D.amber,
    dangerous: false,
    status: "idle",
  },
  {
    id: "archive-leads",
    name: "Archive Inactive Leads",
    description: "Move leads older than 60 days with no activity to archived status. Cannot be undone.",
    lastRun: "May 7, 2026 · 2:00am",
    duration: "~3 min",
    records: "247 leads",
    icon: Archive,
    color: D.orange,
    dangerous: true,
    status: "idle",
  },
  {
    id: "reset-lead-counts",
    name: "Reset Weekly Lead Counts",
    description: "Zero out weekly lead delivery counters for all active partners. Runs automatically Sunday midnight.",
    lastRun: "May 12, 2026 · 12:00am",
    duration: "~10 sec",
    records: "614 partners",
    icon: RefreshCw,
    color: D.teal,
    dangerous: true,
    status: "idle",
  },
];

const OPERATION_LOG = [
  { op: "Recalculate All PPS Scores",    ran: "May 14, 9:00pm",  status: "success" as const, duration: "7m 42s", records: "1,863″ },
  { op: "Email All Active Partners",      ran: "May 12, 9:14am",  status: "success" as const, duration: "1m 58s", records: "612″    },
  { op: "Archive Inactive Leads",         ran: "May 7, 2:03am",   status: "success" as const, duration: "2m 47s", records: "247″    },
  { op: "Trigger Payout Sweep",           ran: "May 1, 12:18am",  status: "success" as const, duration: "14m 2s", records: "147″    },
  { op: "Reset Weekly Lead Counts",       ran: "Apr 28, 12:01am", status: "success" as const, duration: "8s",     records: "601″    },
  { op: "Export Partner List CSV",        ran: "Apr 25, 3:22pm",  status: "success" as const, duration: "28s",    records: "1,841″  },
  { op: "Recalculate All PPS Scores",     ran: "Apr 21, 11:00pm", status: "success" as const, duration: "8m 11s", records: "1,841″  },
  { op: "Trigger Payout Sweep",           ran: "Apr 1, 12:09am",  status: "error"   as const, duration: "3m 14s", records: "0″      },
  { op: "Email All Active Partners",      ran: "Mar 30, 8:00am",  status: "success" as const, duration: "2m 3s",  records: "588″    },
  { op: "Archive Inactive Leads",         ran: "Mar 7, 2:01am",   status: "success" as const, duration: "3m 2s",  records: "193″    },
];

export default function BulkOperations() {
  const [confirming, setConfirming] = useState<string | null>(null);
  const [running, setRunning] = useState<string | null>(null);

  function handleRun(op: BulkOp) {
    if (op.dangerous && confirming !== op.id) {
      setConfirming(op.id);
      return;
    }
    setConfirming(null);
    setRunning(op.id);
    setTimeout(() => setRunning(null), 3000);
  }

  const dangerOps = OPERATIONS.filter(o => o.dangerous);
  const safeOps = OPERATIONS.filter(o => !o.dangerous);

  function OpCard({ op }: { op: BulkOp }) {
    const Icon = op.icon;
    const isRunning = running === op.id;
    const isConfirming = confirming === op.id;
    return (
      <div
        className="rounded-xl p-5 flex flex-col gap-3″
        style={{
          backgroundColor: op.dangerous ? `${D.red}08` : D.surface,
          border: `1px solid ${op.dangerous ? D.red + "30" : D.border}`,
        }}
      >
        <div className="flex items-start justify-between gap-2″>
          <div className="flex items-center gap-3″>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0″ style={{ backgroundColor: `${op.color}20` }}>
              <Icon className="w-4 h-4″ style={{ color: op.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2″>
                <span className="text-sm font-bold" style={{ color: D.text }}>{op.name}</span>
                {op.dangerous && <AlertTriangle className="w-3 h-3″ style={{ color: D.red }} />}
              </div>
              <p className="text-xs mt-0.5″ style={{ color: D.muted }}>{op.description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2″>
          {[
            { label: "Last run",  value: op.lastRun },
            { label: "Est. time", value: op.duration },
            { label: "Records",   value: op.records  },
          ].map(m => (
            <div key={m.label}>
              <div className="text-xs" style={{ color: D.dim }}>{m.label}</div>
              <div className="text-xs font-semibold mt-0.5″ style={{ color: D.muted }}>{m.value}</div>
            </div>
          ))}
        </div>
        {isConfirming ? (
          <div className="rounded-lg p-3 space-y-2″ style={{ backgroundColor: `${D.red}15`, border: `1px solid ${D.red}40` }}>
            <p className="text-xs font-bold" style={{ color: D.red }}>This action cannot be undone. Confirm?</p>
            <div className="flex gap-2″>
              <button
                onClick={() => handleRun(op)}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ backgroundColor: D.red, color: D.text }}
              >
                Confirm Run
              </button>
              <button
                onClick={() => setConfirming(null)}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{ backgroundColor: D.surface, color: D.muted, border: `1px solid ${D.border}` }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => handleRun(op)}
            disabled={isRunning}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all"
            style={{
              backgroundColor: isRunning ? `${op.color}20` : `${op.color}25`,
              color: isRunning ? D.muted : op.color,
              border: `1px solid ${isRunning ? op.color + "20" : op.color + "50"}`,
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5″ />
                Run
              </>
            )}
          </button>
        )}
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6″ style={{ backgroundColor: D.bg, minHeight: "100vh" }}>
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2″ style={{ color: D.text }}>
            <Layers className="w-6 h-6″ style={{ color: D.teal }} />
            Bulk Operations
          </h1>
          <p className="text-sm mt-1″ style={{ color: D.muted }}>Mass actions for partners, commissions, leads, and data exports</p>
        </div>

        <DCard>
          <SectionHeader title="Standard Operations" subtitle="Safe to run at any time without confirmation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4″>
            {safeOps.map(op => <OpCard key={op.id} op={op} />)}
          </div>
        </DCard>

        <DCard>
          <div className="flex items-center gap-2 mb-4″>
            <AlertTriangle className="w-4 h-4″ style={{ color: D.red }} />
            <SectionHeader title="Danger Zone" subtitle="Irreversible operations — require confirmation" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {dangerOps.map(op => <OpCard key={op.id} op={op} />)}
          </div>
        </DCard>

        <DCard>
          <SectionHeader title="Operation Log" subtitle="Last 10 bulk operations with outcome" />
          <div className="mt-3 overflow-x-auto rounded-xl" style={{ border: `1px solid ${D.border}` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}`, backgroundColor: D.surface }}>
                  {["Operation", "Ran", "Status", "Duration", "Records Affected"].map((h, i) => (
                    <th key={i} className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-left" style={{ color: D.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OPERATION_LOG.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < OPERATION_LOG.length - 1 ? `1px solid ${D.border}` : "none", backgroundColor: i % 2 === 0 ? D.card : D.surface }}>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: D.text }}>{row.op}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: D.muted }}>{row.ran}</td>
                    <td className="px-4 py-3″>
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: D.dim }}>
                      <span className="flex items-center gap-1″>
                        <Clock className="w-3 h-3″ />
                        {row.duration}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold" style={{ color: row.status === "error" ? D.red : D.text }}>
                      {row.status === "error" ? "Failed — 0 records" : `${row.records} records`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DCard>
      </div>
    </AdminLayout>
  );
}
