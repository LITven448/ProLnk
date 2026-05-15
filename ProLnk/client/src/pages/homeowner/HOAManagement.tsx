import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Button } from "@/components/ui/button";
import {
  Building2, CheckCircle, Clock, AlertTriangle, Download,
  Phone, Calendar, FileText, DollarSign, Shield, ChevronRight,
} from "lucide-react";

const TEAL = "#0EA5E9";
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const DIM = "#8B91A8";
const BORDER = "#1E2A3A";
const CARD_BG = "#0F1D2E";
const BG = "#0A1628";

const approvalHistory = [
  { item: "Landscaping change",    status: "Approved", date: "Mar 2026",  icon: CheckCircle, color: GREEN },
  { item: "Fence painting",        status: "Pending",  date: "Submitted May 2026", icon: Clock, color: AMBER },
  { item: "Window replacement",    status: "Approved", date: "Nov 2024",  icon: CheckCircle, color: GREEN },
  { item: "HVAC unit replacement", status: "Approved", date: "Aug 2023",  icon: CheckCircle, color: GREEN },
];

const documents = [
  { name: "CC&Rs",                   updated: "Jan 2024" },
  { name: "Rules & Regulations",     updated: "Jan 2024" },
  { name: "2026 Annual Budget",      updated: "Feb 2026" },
  { name: "Meeting Minutes — Apr 2026", updated: "Apr 2026" },
];

function ComplianceRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-36 h-36">
        <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
          <circle cx="72" cy="72" r={r} fill="none" stroke="#1E2A3A" strokeWidth="10" />
          <circle
            cx="72" cy="72" r={r} fill="none"
            stroke={GREEN} strokeWidth="10"
            strokeDasharray={`${filled} ${circ - filled}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ color: GREEN }} className="text-3xl font-bold">{score}</span>
          <span style={{ color: DIM }} className="text-xs">/100</span>
        </div>
      </div>
      <span style={{ color: GREEN }} className="text-sm font-semibold">In Good Standing</span>
    </div>
  );
}

export default function HOAManagement() {
  const [replyOpen, setReplyOpen] = useState<string | null>(null);

  return (
    <HomeownerLayout>
      <div style={{ background: BG }} className="min-h-screen p-6 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">HOA Management</h1>
          <p style={{ color: DIM }} className="text-sm mt-0.5">Stay compliant, avoid fines</p>
        </div>

        {/* Overview + Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* HOA Overview */}
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Building2 size={16} style={{ color: TEAL }} />
              <span className="text-white font-semibold text-sm">Waterford Crossing HOA</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Monthly Dues",   value: "$185/mo" },
                { label: "Paid Through",   value: "Dec 2026" },
                { label: "Account #",      value: "HOA-48291" },
                { label: "Contact",        value: "972-555-0124" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ color: DIM }} className="text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 gap-1.5 text-xs"
              style={{ borderColor: BORDER, color: DIM }}
            >
              <Phone size={12} /> Call HOA Office
            </Button>
          </div>

          {/* Compliance Score */}
          <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-5 flex flex-col items-center justify-center">
            <p style={{ color: DIM }} className="text-xs mb-3">Compliance Score</p>
            <ComplianceRing score={94} />
          </div>
        </div>

        {/* Pending Action Items */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: AMBER }} />
            <span className="text-white font-semibold text-sm">Pending Action Items</span>
            <span style={{ background: "#F59E0B22", color: AMBER }} className="text-xs px-2 py-0.5 rounded-full ml-auto">2 items</span>
          </div>
          <div className="space-y-3">
            {[
              {
                id: "fence",
                title: "Fence painting approval needed",
                desc: "Submit ARC form before June 1 deadline",
                due: "June 1, 2026",
                daysLeft: 30,
                urgency: AMBER,
                action: "Submit ARC Form",
              },
              {
                id: "fee",
                title: "Annual inspection fee due",
                desc: "Covers HOA annual exterior inspection",
                due: "July 15, 2026",
                daysLeft: 75,
                urgency: TEAL,
                action: "Pay $75 Fee",
              },
            ].map((item) => (
              <div
                key={item.id}
                style={{ background: "#0A1628", border: `1px solid ${BORDER}` }}
                className="rounded-lg p-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p style={{ color: DIM }} className="text-xs mt-0.5">{item.desc}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={11} style={{ color: DIM }} />
                    <span style={{ color: DIM }} className="text-xs">Due {item.due}</span>
                    <span
                      style={{ background: `${item.urgency}22`, color: item.urgency }}
                      className="text-xs px-2 py-0.5 rounded-full"
                    >
                      {item.daysLeft} days
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="text-xs shrink-0"
                  style={{ background: item.urgency, color: "#0A1628" }}
                >
                  {item.action}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Approval Tracker */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={16} style={{ color: TEAL }} />
            <span className="text-white font-semibold text-sm">Approval Tracker</span>
          </div>
          <div className="space-y-2">
            {approvalHistory.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.item}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: `1px solid ${BORDER}` }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} style={{ color: row.color }} />
                    <span className="text-white text-sm">{row.item}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: DIM }} className="text-xs">{row.date}</span>
                    <span
                      style={{ background: `${row.color}22`, color: row.color }}
                      className="text-xs px-2 py-0.5 rounded-full"
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Vault */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} style={{ color: TEAL }} />
            <span className="text-white font-semibold text-sm">Document Vault</span>
          </div>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              >
                <div>
                  <p className="text-white text-sm">{doc.name}</p>
                  <p style={{ color: DIM }} className="text-xs mt-0.5">Updated {doc.updated}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs gap-1.5"
                  style={{ borderColor: BORDER, color: TEAL }}
                >
                  <Download size={12} /> Download
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Fine History */}
        <div
          style={{ background: "#22C55E0F", border: `1px solid #22C55E33` }}
          className="rounded-xl p-4 flex items-center gap-3"
        >
          <Shield size={18} style={{ color: GREEN }} />
          <div>
            <p style={{ color: GREEN }} className="text-sm font-semibold">No fines on record</p>
            <p style={{ color: DIM }} className="text-xs">Your account has a clean violation history since 2019</p>
          </div>
          <CheckCircle size={20} style={{ color: GREEN }} className="ml-auto" />
        </div>

        {/* Upcoming Meetings */}
        <div style={{ background: CARD_BG, border: `1px solid ${BORDER}` }} className="rounded-xl p-4 flex items-center gap-3">
          <Calendar size={18} style={{ color: TEAL }} />
          <div>
            <p className="text-white text-sm font-semibold">Annual Meeting</p>
            <p style={{ color: DIM }} className="text-xs mt-0.5">September 12, 2026 · Frisco Community Center</p>
          </div>
          <ChevronRight size={16} style={{ color: DIM }} className="ml-auto" />
        </div>

      </div>
    </HomeownerLayout>
  );
}
