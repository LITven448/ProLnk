import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, DFONT, MetricCard, DataTable } from "@/components/DashboardShared";
import {
  Scale, Clock, CheckCircle, Star, ChevronDown, ChevronUp,
  AlertTriangle, CreditCard, UserX, HelpCircle, Shield,
  TrendingUp, MessageSquare, ThumbsUp, ThumbsDown, Split,
} from "lucide-react";

interface TimelineEvent {
  time: string;
  text: string;
}

interface Dispute {
  id: string;
  dateOpened: string;
  homeowner: string;
  pro: string;
  issueType: "Quality dispute" | "Payment dispute" | "No-show" | "Other";
  amountInDispute: number;
  status: "Under Review" | "Awaiting Response" | "Pending Payment";
  timeline: TimelineEvent[];
}

interface ResolvedDispute {
  id: string;
  homeowner: string;
  pro: string;
  issueType: string;
  outcome: string;
  amount: number;
  daysToResolve: number;
  homeownerSat: number;
  proSat: number;
}

const ISSUE_ICONS: Record<string, typeof Scale> = {
  "Quality dispute": Star,
  "Payment dispute": CreditCard,
  "No-show": UserX,
  "Other": HelpCircle,
};

const STATUS_COLORS: Record<string, string> = {
  "Under Review": D.amber,
  "Awaiting Response": D.blue,
  "Pending Payment": D.purple,
};

const DISPUTES: Dispute[] = [
  {
    id: "DSP-2847",
    dateOpened: "May 12, 2026",
    homeowner: "Patricia M.",
    pro: "Aaron HVAC Solutions",
    issueType: "Quality dispute",
    amountInDispute: 340,
    status: "Under Review",
    timeline: [
      { time: "May 12 9:14am", text: "Homeowner filed dispute — AC unit not cooling after $340 service" },
      { time: "May 12 11:30am", text: "Pro notified via email and SMS" },
      { time: "May 13 2:45pm", text: "Pro responded: 'System was working at departure, issue may be thermostat'" },
      { time: "May 14 8:00am", text: "Admin assigned for review" },
    ],
  },
  {
    id: "DSP-2851",
    dateOpened: "May 13, 2026",
    homeowner: "Robert K.",
    pro: "FastFix Plumbing",
    issueType: "No-show",
    amountInDispute: 0,
    status: "Awaiting Response",
    timeline: [
      { time: "May 13 10:00am", text: "Homeowner reports pro never arrived for 9am appointment" },
      { time: "May 13 10:15am", text: "Pro contacted via platform — no response yet" },
      { time: "May 13 12:00pm", text: "Auto-escalated: no pro response after 2 hours" },
    ],
  },
  {
    id: "DSP-2858",
    dateOpened: "May 14, 2026",
    homeowner: "Sandra T.",
    pro: "DFW Electric Pro",
    issueType: "Payment dispute",
    amountInDispute: 180,
    status: "Pending Payment",
    timeline: [
      { time: "May 14 3:22pm", text: "Homeowner disputes $180 charge — says scope of work was not completed" },
      { time: "May 14 4:00pm", text: "Pro uploaded invoice and job photos as evidence" },
      { time: "May 14 5:30pm", text: "Both parties notified of review process" },
    ],
  },
];

const RESOLVED: ResolvedDispute[] = [
  { id: "DSP-2831", homeowner: "James L.", pro: "Roof Pro DFW", issueType: "Quality dispute", outcome: "Side with Homeowner", amount: 620, daysToResolve: 3, homeownerSat: 5, proSat: 3 },
  { id: "DSP-2820", homeowner: "Maria C.", pro: "AllPro HVAC", issueType: "Payment dispute", outcome: "Split decision", amount: 200, daysToResolve: 2, homeownerSat: 4, proSat: 4 },
  { id: "DSP-2815", homeowner: "Tom B.", pro: "QuickPlumb", issueType: "No-show", outcome: "Side with Homeowner", amount: 0, daysToResolve: 1, homeownerSat: 5, proSat: 2 },
  { id: "DSP-2801", homeowner: "Linda H.", pro: "Elite Electric", issueType: "Quality dispute", outcome: "Side with Pro", amount: 450, daysToResolve: 4, homeownerSat: 3, proSat: 5 },
  { id: "DSP-2797", homeowner: "Carlos M.", pro: "DrainMaster TX", issueType: "Payment dispute", outcome: "Split decision", amount: 310, daysToResolve: 2, homeownerSat: 4, proSat: 4 },
  { id: "DSP-2790", homeowner: "Susan P.", pro: "SkyRoof", issueType: "Other", outcome: "Request more info", amount: 0, daysToResolve: 5, homeownerSat: 4, proSat: 3 },
  { id: "DSP-2784", homeowner: "David R.", pro: "CoolAir DFW", issueType: "Quality dispute", outcome: "Side with Homeowner", amount: 780, daysToResolve: 3, homeownerSat: 5, proSat: 2 },
  { id: "DSP-2775", homeowner: "Amy S.", pro: "PowerUp Electric", issueType: "No-show", outcome: "Side with Homeowner", amount: 0, daysToResolve: 1, homeownerSat: 5, proSat: 3 },
  { id: "DSP-2770", homeowner: "Brian T.", pro: "PipeMaster Pro", issueType: "Payment dispute", outcome: "Side with Pro", amount: 225, daysToResolve: 3, homeownerSat: 3, proSat: 5 },
  { id: "DSP-2762", homeowner: "Nicole W.", pro: "Foundation Fix TX", issueType: "Quality dispute", outcome: "Split decision", amount: 1200, daysToResolve: 4, homeownerSat: 4, proSat: 4 },
];

const RESOLVED_COLUMNS = [
  { key: "id", label: "Dispute #" },
  { key: "homeowner", label: "Homeowner" },
  { key: "pro", label: "Pro" },
  { key: "issueType", label: "Type" },
  { key: "outcome", label: "Outcome" },
  { key: "amountFmt", label: "Amount" },
  { key: "daysFmt", label: "Days" },
  { key: "hoSatFmt", label: "HO Sat" },
  { key: "proSatFmt", label: "Pro Sat" },
];

const RESOLVED_ROWS = RESOLVED.map(r => ({
  id: r.id,
  homeowner: r.homeowner,
  pro: r.pro,
  issueType: r.issueType,
  outcome: r.outcome,
  amountFmt: r.amount > 0 ? `$${r.amount.toLocaleString()}` : "—",
  daysFmt: `${r.daysToResolve}d`,
  hoSatFmt: `${r.homeownerSat}/5`,
  proSatFmt: `${r.proSat}/5`,
}));

function IssueTypeBadge({ type }: { type: string }) {
  const Icon = ISSUE_ICONS[type] || HelpCircle;
  const colors: Record<string, { bg: string; text: string }> = {
    "Quality dispute": { bg: D.gradAmber, text: D.amber },
    "Payment dispute": { bg: D.gradPurple, text: D.purple },
    "No-show": { bg: D.gradRed, text: D.red },
    "Other": { bg: D.gradBlue, text: D.blue },
  };
  const c = colors[type] || colors["Other"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text,
      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    }}>
      <Icon size={12} />
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || D.muted;
  return (
    <span style={{
      display: "inline-block",
      background: `${color}22`, color, border: `1px solid ${color}44`,
      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    }}>
      {status}
    </span>
  );
}

function ResolutionButton({
  icon: Icon, label, color, onClick,
}: {
  icon: typeof ThumbsUp;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: `${color}18`, border: `1px solid ${color}55`,
        color, borderRadius: 8, padding: "7px 14px",
        fontSize: 13, fontWeight: 600, cursor: "pointer",
        fontFamily: DFONT,
      }}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}

function DisputeCard({ dispute }: { dispute: Dispute }) {
  const [expanded, setExpanded] = useState(false);
  const [resolved, setResolved] = useState<string | null>(null);

  return (
    <div style={{
      background: D.card, border: `1px solid ${D.border}`,
      borderRadius: 14, padding: "20px 24px", marginBottom: 16,
      opacity: resolved ? 0.6 : 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: D.text }}>{dispute.id}</span>
            <IssueTypeBadge type={dispute.issueType} />
            <StatusBadge status={dispute.status} />
          </div>
          <div style={{ fontSize: 14, color: D.muted }}>
            Opened {dispute.dateOpened} &bull;{" "}
            <span style={{ color: D.cyan }}>{dispute.homeowner}</span>
            <span style={{ color: D.dim }}> vs </span>
            <span style={{ color: D.green }}>{dispute.pro}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: dispute.amountInDispute > 0 ? D.amber : D.dim }}>
            {dispute.amountInDispute > 0 ? `$${dispute.amountInDispute}` : "—"}
          </div>
          <div style={{ fontSize: 11, color: D.dim }}>in dispute</div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          marginTop: 14, background: "none", border: "none",
          color: D.muted, fontSize: 13, cursor: "pointer", fontFamily: DFONT, padding: 0,
        }}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? "Hide" : "Show"} timeline
      </button>

      {expanded && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${D.border}`, paddingTop: 12 }}>
          {dispute.timeline.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: D.cyan, marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, color: D.dim, marginBottom: 2 }}>{ev.time}</div>
                <div style={{ fontSize: 13, color: D.muted }}>{ev.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {resolved ? (
        <div style={{
          marginTop: 14, padding: "8px 14px", borderRadius: 8,
          background: `${D.green}18`, border: `1px solid ${D.green}44`,
          color: D.green, fontSize: 13, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <CheckCircle size={14} />
          Resolution applied: {resolved}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          <ResolutionButton icon={ThumbsUp} label="Side with Homeowner" color={D.cyan} onClick={() => setResolved("Side with Homeowner")} />
          <ResolutionButton icon={ThumbsDown} label="Side with Pro" color={D.green} onClick={() => setResolved("Side with Pro")} />
          <ResolutionButton icon={Split} label="Split decision" color={D.purple} onClick={() => setResolved("Split decision")} />
          <ResolutionButton icon={MessageSquare} label="Request more info" color={D.amber} onClick={() => setResolved("Request more info")} />
        </div>
      )}
    </div>
  );
}

export default function DisputeResolutionCenter() {
  return (
    <AdminLayout
      title="Dispute Resolution"
      subtitle="Fair outcomes for everyone"
    >
      <div style={{ fontFamily: DFONT, padding: "0 0 48px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <MetricCard label="Active Disputes" value="3" trend={0} color={D.amber} gradient={D.gradAmber} icon={<Scale size={18} color={D.amber} />} />
          <MetricCard label="Resolved This Month" value="8" trend={14} color={D.green} gradient={D.gradGreen} icon={<CheckCircle size={18} color={D.green} />} />
          <MetricCard label="Avg Resolution Time" value="2.4 days" sub="target: 5 days" trend={8} color={D.cyan} gradient={D.gradCyan} icon={<Clock size={18} color={D.cyan} />} />
          <MetricCard label="Customer Satisfaction" value="4.7 / 5" trend={3} color={D.purple} gradient={D.gradPurple} icon={<Star size={18} color={D.purple} />} />
        </div>

        {/* Active Disputes */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <AlertTriangle size={18} color={D.amber} />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: D.text }}>Active Disputes</h2>
            <span style={{
              background: `${D.amber}22`, color: D.amber, border: `1px solid ${D.amber}44`,
              borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700,
            }}>3 open</span>
          </div>
          {DISPUTES.map(d => <DisputeCard key={d.id} dispute={d} />)}
        </div>

        {/* Pattern Analysis */}
        <div style={{
          background: `${D.purple}12`, border: `1px solid ${D.purple}33`,
          borderRadius: 14, padding: "16px 20px", marginBottom: 32,
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <TrendingUp size={20} color={D.purple} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: D.purple, marginBottom: 4 }}>Pattern Analysis</div>
            <div style={{ fontSize: 14, color: D.muted }}>
              Q2 2026: Quality disputes up 12% in HVAC category — coaching action recommended.
              Consider triggering the Partner Performance Coach agent for all active HVAC pros with 2+ disputes.
            </div>
          </div>
        </div>

        {/* Resolution History */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <CheckCircle size={18} color={D.green} />
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: D.text }}>Resolution History</h2>
            <span style={{ fontSize: 13, color: D.muted }}>Last 10 resolved</span>
          </div>
          <DataTable columns={RESOLVED_COLUMNS} rows={RESOLVED_ROWS} />
        </div>

        {/* Policy Card */}
        <div style={{
          background: `${D.cyan}10`, border: `1px solid ${D.cyan}33`,
          borderRadius: 14, padding: "18px 22px",
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <Shield size={22} color={D.cyan} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: D.cyan, marginBottom: 6 }}>ProLnk Dispute Policy</div>
            <div style={{ fontSize: 14, color: D.muted, lineHeight: 1.6 }}>
              All disputes resolved within <strong style={{ color: D.text }}>5 business days</strong>.
              Homeowner protection up to <strong style={{ color: D.text }}>$500</strong> per incident.
              Both parties receive outcome notification and satisfaction survey within 24 hours of resolution.
              Platform holds disputed funds in escrow until decision is final.
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
