import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  D, MetricCard, SectionHeader, DataTable, DonutChart,
  DCard, ActivityItem, ProgressBar, StatusBadge,
} from "@/components/DashboardShared";
import { Briefcase, Star, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const PENDING_COLS = [
  { key: "partner",      label: "Partner Name" },
  { key: "trade",        label: "Trade" },
  { key: "submitted",    label: "Submitted" },
  { key: "completeness", label: "Completeness",  align: "right" as const },
  { key: "reviewStatus", label: "Status",        align: "center" as const },
  { key: "actions",      label: "Actions",       align: "center" as const },
];

interface PendingRow {
  id: number;
  partner: string;
  trade: string;
  submitted: string;
  completenessPct: number;
  status: "pending" | "warning";
}

const PENDING_DATA: PendingRow[] = [
  { id: 1, partner: "Ray Daniels",   trade: "Roofing",    submitted: "May 12″, completenessPct: 88, status: "pending" },
  { id: 2, partner: "Yolanda Grant", trade: "HVAC",       submitted: "May 12″, completenessPct: 74, status: "pending" },
  { id: 3, partner: "Ben Hooper",    trade: "Plumbing",   submitted: "May 11″, completenessPct: 61, status: "warning" },
  { id: 4, partner: "Fatima Ali",    trade: "Electrical", submitted: "May 10″, completenessPct: 95, status: "pending" },
  { id: 5, partner: "Jerome Walsh",  trade: "Flooring",   submitted: "May 9″,  completenessPct: 52, status: "warning" },
];

const DONUT_SEGMENTS = [
  { label: "Complete (≥85%)",      value: 38, color: D.green  },
  { label: "Near Complete (50–84%)", value: 44, color: D.amber  },
  { label: "Incomplete (<50%)",    value: 18, color: D.red    },
];

const CHECKLIST = [
  { label: "Profile Photo",    value: 92, color: D.cyan   },
  { label: "License Upload",   value: 78, color: D.green  },
  { label: "Insurance Doc",    value: 71, color: D.teal   },
  { label: "Work Photos 5+",   value: 64, color: D.amber  },
  { label: "Reviews 3+",       value: 51, color: D.purple },
];

const RECENT_ACTIVITY = [
  { time: "1h ago",    message: "Approved: Fatima Ali (Electrical) — 95% completeness", type: "success" as const },
  { time: "3h ago",    message: "Rejected: Tom Reyes (Painting) — missing license + insurance", type: "error" as const },
  { time: "5h ago",    message: "Approved: Chen Wei (HVAC) — all docs verified", type: "success" as const },
  { time: "Yesterday", message: "Reminder sent: Jerome Walsh — briefcase 52% complete", type: "warning" as const },
  { time: "Yesterday", message: "Approved: Sandra King (Roofing) — manual override by admin", type: "success" as const },
];

export default function BriefcaseAdmin() {
  const [pending, setPending] = useState<PendingRow[]>(PENDING_DATA);
  const [showConfirm, setShowConfirm] = useState<"approveAll" | "remind" | null>(null);

  const handleApprove = (id: number, name: string) => {
    setPending(p => p.filter(r => r.id !== id));
    toast.success(`Approved: ${name}`);
  };

  const handleReject = (id: number, name: string) => {
    setPending(p => p.filter(r => r.id !== id));
    toast.error(`Rejected: ${name}`);
  };

  const handleApproveAll = () => {
    setPending([]);
    setShowConfirm(null);
    toast.success(`${pending.length} briefcases approved`);
  };

  const handleRemind = () => {
    setShowConfirm(null);
    toast.success(`Reminder emails sent to ${pending.length} partners`);
  };

  const tableRows = pending.map(r => ({
    partner:      r.partner,
    trade:        r.trade,
    submitted:    r.submitted,
    completeness: (
      <div className="flex items-center justify-end gap-2″>
        <div
          className="h-1.5 w-16 rounded-full overflow-hidden"
          style={{ background: D.border }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${r.completenessPct}%`,
              background: r.completenessPct >= 85 ? D.green : r.completenessPct >= 50 ? D.amber : D.red,
            }}
          />
        </div>
        <span className="text-xs font-semibold" style={{ color: D.text }}>{r.completenessPct}%</span>
      </div>
    ),
    reviewStatus: <StatusBadge status={r.status} />,
    actions: (
      <div className="flex items-center justify-center gap-1″>
        <button
          onClick={() => handleApprove(r.id, r.partner)}
          className="px-2 py-1 rounded-lg text-xs font-semibold"
          style={{ background: `${D.green}20`, color: D.green }}
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(r.id, r.partner)}
          className="px-2 py-1 rounded-lg text-xs font-semibold"
          style={{ background: `${D.red}20`, color: D.red }}
        >
          Reject
        </button>
      </div>
    ),
  }));

  return (
    <AdminLayout>
      <div className="space-y-6″ style={{ background: D.bg, minHeight: "100vh" }}>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Briefcase Admin</h1>
            <p className="text-sm mt-1″ style={{ color: D.muted }}>Review, approve, and track partner portfolio completeness</p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          <MetricCard label="Total Briefcases"  value="147″  sub="All submitted portfolios"       color={D.cyan}   icon={<Briefcase className="w-4 h-4" />}   trend={11}  />
          <MetricCard label="Pending Review"    value="12″   sub="Awaiting admin decision"         color={D.amber}  icon={<Clock className="w-4 h-4" />}       trend={-2}  />
          <MetricCard label="Avg Completeness"  value="71%"  sub="Up from 65% last month"          color={D.green}  icon={<Star className="w-4 h-4″ />}        trend={9}   />
          <MetricCard label="Featured Portfolios" value="24″ sub="Highlighted in directory"        color={D.purple} icon={<CheckCircle className="w-4 h-4" />} trend={20}  />
        </div>

        {/* Review Queue */}
        <DCard>
          <SectionHeader
            title="Review Queue"
            subtitle={`${pending.length} briefcase${pending.length !== 1 ? "s" : ""} awaiting decision`}
            action={
              <div className="flex gap-2″>
                <button
                  onClick={() => setShowConfirm("remind")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: `${D.amber}15`, color: D.amber, border: `1px solid ${D.amber}30` }}
                >
                  Send Reminder Emails
                </button>
                <button
                  onClick={() => setShowConfirm("approveAll")}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ background: `${D.green}15`, color: D.green, border: `1px solid ${D.green}30` }}
                >
                  Approve All Pending
                </button>
              </div>
            }
          />

          {/* Confirmation banners */}
          {showConfirm === "approveAll" && (
            <div
              className="mb-4 p-3 rounded-xl flex items-center justify-between gap-4″
              style={{ background: `${D.green}15`, border: `1px solid ${D.green}30` }}
            >
              <span className="text-xs font-semibold" style={{ color: D.green }}>
                Approve all {pending.length} pending briefcases?
              </span>
              <div className="flex gap-2″>
                <button
                  onClick={handleApproveAll}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: D.green, color: D.bg }}
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirm(null)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${D.muted}20`, color: D.muted }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showConfirm === "remind" && (
            <div
              className="mb-4 p-3 rounded-xl flex items-center justify-between gap-4″
              style={{ background: `${D.amber}15`, border: `1px solid ${D.amber}30` }}
            >
              <span className="text-xs font-semibold" style={{ color: D.amber }}>
                Send reminder emails to {pending.length} partners with incomplete briefcases?
              </span>
              <div className="flex gap-2″>
                <button
                  onClick={handleRemind}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: D.amber, color: D.bg }}
                >
                  Send
                </button>
                <button
                  onClick={() => setShowConfirm(null)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: `${D.muted}20`, color: D.muted }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {pending.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-3″ style={{ color: D.green }} />
              <p className="text-sm" style={{ color: D.muted }}>All briefcases are reviewed</p>
            </div>
          ) : (
            <DataTable columns={PENDING_COLS} rows={tableRows} accentCol="partner" />
          )}
        </DCard>

        {/* Donut + Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          <DCard>
            <SectionHeader title="Completeness Distribution" subtitle="All 147 briefcases" />
            <DonutChart segments={DONUT_SEGMENTS} size={120} />
          </DCard>

          <DCard>
            <SectionHeader title="Checklist Component Coverage" subtitle="% of partners with each item complete" />
            <div className="space-y-4 mt-2″>
              {CHECKLIST.map(item => (
                <ProgressBar
                  key={item.label}
                  value={item.value}
                  max={100}
                  color={item.color}
                  label={item.label}
                  showPct
                />
              ))}
            </div>
          </DCard>
        </div>

        {/* Recent Approvals */}
        <DCard>
          <SectionHeader title="Recent Decisions" subtitle="Latest approve/reject activity" />
          <div>
            {RECENT_ACTIVITY.map((a, i) => (
              <ActivityItem key={i} time={a.time} message={a.message} type={a.type} />
            ))}
          </div>
        </DCard>

      </div>
    </AdminLayout>
  );
}
