import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ClipboardList, Plus, ChevronDown, ChevronUp,
  Phone, ExternalLink, CheckCircle, Clock, AlertCircle,
  XCircle, Calendar, Building2, User, X,
} from "lucide-react";

const TEAL = "#0EA5E9″;
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const RED = "#EF4444″;
const DIM = "#8B91A8″;
const BORDER = "#1E2A3A";
const CARD_BG = "#0F1D2E";
const BG = "#0A1628″;

type PermitStatus = "Issued" | "Under Review" | "Final Inspection Needed" | "Closed";

interface ActivePermit {
  id: string;
  type: string;
  number: string;
  issuedBy: string;
  issueDate: string;
  expirationDate: string;
  status: PermitStatus;
  pro?: string;
}

const activePermits: ActivePermit[] = [
  {
    id: "p1″,
    type: "HVAC Replacement",
    number: "FRS-2026-04821″,
    issuedBy: "City of Frisco",
    issueDate: "Apr 3, 2026″,
    expirationDate: "Oct 3, 2026″,
    status: "Final Inspection Needed",
    pro: "AirPro HVAC — Mike Castillo",
  },
  {
    id: "p2″,
    type: "Electrical Panel Upgrade",
    number: "PLN-2026-01134″,
    issuedBy: "City of Plano",
    issueDate: "May 1, 2026″,
    expirationDate: "Nov 1, 2026″,
    status: "Under Review",
    pro: "Texas Elite Electric — Jason Webb",
  },
];

const pastPermits = [
  { type: "Roof Replacement", year: 2024, cost: "$350″, inspector: "B. Nguyen", result: "Passed" },
  { type: "Water Heater", year: 2023, cost: "$75″, inspector: "C. Torres", result: "Passed" },
  { type: "Bathroom Addition", year: 2022, cost: "$600″, inspector: "D. Marsh", result: "Passed" },
  { type: "Garage Door", year: 2021, cost: "$125″, inspector: "A. Singh", result: "Passed" },
  { type: "Fence", year: 2020, cost: "$90″, inspector: "R. Patel", result: "Failed" },
];

const permitCategories = [
  { label: "Electrical work", answer: "Yes — always", icon: "⚡", color: GREEN, required: true },
  { label: "HVAC replacement", answer: "Yes — required", icon: "🌡️", color: GREEN, required: true },
  { label: "Roof replacement", answer: "Sometimes", icon: "🏠", color: AMBER, required: null },
  { label: "Interior painting", answer: "No — not needed", icon: "🖌️", color: DIM, required: false },
  { label: "Landscaping", answer: "Rarely — check city", icon: "🌿", color: AMBER, required: null },
  { label: "Adding a room", answer: "Always required", icon: "🏗️", color: GREEN, required: true },
];

function statusConfig(status: PermitStatus) {
  switch (status) {
    case "Issued":
      return { color: GREEN, bg: "#22C55E18″, border: "#22C55E44", icon: <CheckCircle size={13} /> };
    case "Under Review":
      return { color: AMBER, bg: "#F59E0B18″, border: "#F59E0B44", icon: <Clock size={13} /> };
    case "Final Inspection Needed":
      return { color: "#F97316″, bg: "#F9731618", border: "#F9731644", icon: <AlertCircle size={13} /> };
    case "Closed":
      return { color: DIM, bg: "#8B91A818″, border: "#8B91A844", icon: <XCircle size={13} /> };
  }
}

function StatusBadge({ status }: { status: PermitStatus }) {
  const cfg = statusConfig(status);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 20, padding: "3px 10px", color: cfg.color,
      fontSize: 12, fontWeight: 600,
    }}>
      {cfg.icon} {status}
    </span>
  );
}

function AddPermitForm({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ backgroundColor: "#0D1A2A", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "#F0F2FF", fontWeight: 700, fontSize: 15 }}>Add New Permit</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: DIM }}>
          <X size={18} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { id: "ptype", label: "Permit Type" },
          { id: "pnum", label: "Permit Number" },
          { id: "pissuedby", label: "Issued By (City)" },
          { id: "pissue", label: "Issue Date" },
          { id: "pexp", label: "Expiration Date" },
          { id: "ppro", label: "Associated Pro (optional)" },
        ].map(f => (
          <div key={f.id}>
            <Label htmlFor={f.id} style={{ color: DIM, fontSize: 12, marginBottom: 4, display: "block" }}>{f.label}</Label>
            <Input
              id={f.id}
              placeholder={f.label}
              style={{ backgroundColor: "#0A1628″, border: `1px solid ${BORDER}`, color: "#F0F2FF", fontSize: 13 }}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Button style={{ backgroundColor: TEAL, color: "#fff", fontSize: 13, height: 36 }}>Save Permit</Button>
        <Button variant="outline" onClick={onClose} style={{ border: `1px solid ${BORDER}`, color: DIM, fontSize: 13, height: 36, backgroundColor: "transparent" }}>Cancel</Button>
      </div>
    </div>
  );
}

export default function PermitTracker() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <ClipboardList size={22} color={TEAL} />
            <h1 style={{ color: "#F0F2FF", fontSize: 22, fontWeight: 700, margin: 0 }}>
              Permit Tracker
            </h1>
          </div>
          <p style={{ color: DIM, margin: 0, fontSize: 14 }}>
            Keep records of all work permits
          </p>
        </div>

        {/* Active Permits */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: DIM, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Active Permits ({activePermits.length})
            </span>
            <button
              onClick={() => setShowAddForm(v => !v)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                backgroundColor: TEAL, border: "none", borderRadius: 8,
                padding: "7px 14px", color: "#fff", fontSize: 13,
                fontWeight: 600, cursor: "pointer",
              }}
            >
              <Plus size={14} /> Add Permit
            </button>
          </div>

          {showAddForm && <AddPermitForm onClose={() => setShowAddForm(false)} />}

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: showAddForm ? 16 : 0 }}>
            {activePermits.map(permit => (
              <div key={permit.id} style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ color: "#F0F2FF", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                      {permit.type}
                    </div>
                    <div style={{ color: DIM, fontSize: 12, fontFamily: "monospace", letterSpacing: 0.5, marginBottom: 8 }}>
                      #{permit.number}
                    </div>
                    <StatusBadge status={permit.status} />
                  </div>
                  {permit.status === "Final Inspection Needed" && (
                    <button style={{
                      backgroundColor: "#F9731618″, border: "1px solid #F9731644",
                      borderRadius: 8, padding: "7px 14px", color: "#F97316″,
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                    }}>
                      Request Final Inspection
                    </button>
                  )}
                </div>

                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {[
                    { icon: <Building2 size={13} />, label: "Issued by", value: permit.issuedBy },
                    { icon: <Calendar size={13} />, label: "Issue date", value: permit.issueDate },
                    { icon: <Calendar size={13} />, label: "Expires", value: permit.expirationDate },
                    { icon: <User size={13} />, label: "Pro", value: permit.pro ?? "—" },
                  ].map(item => (
                    <div key={item.label} style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: DIM, fontSize: 11, marginBottom: 4 }}>
                        {item.icon}
                        <span style={{ textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</span>
                      </div>
                      <div style={{ color: "#F0F2FF", fontSize: 12, fontWeight: 500 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permit History */}
        <div style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px", marginTop: 24, marginBottom: 24 }}>
          <div style={{ color: DIM, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>
            Permit History
          </div>
          <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 80px 80px 140px 80px", backgroundColor: "#0A1628″, padding: "10px 14px", borderBottom: `1px solid ${BORDER}` }}>
              {["Type", "Year", "Cost", "Inspector", "Result"].map(h => (
                <div key={h} style={{ color: DIM, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.7 }}>{h}</div>
              ))}
            </div>
            {pastPermits.map((p, i) => (
              <div
                key={p.type + p.year}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 80px 80px 140px 80px",
                  padding: "12px 14px",
                  borderBottom: i < pastPermits.length - 1 ? `1px solid ${BORDER}` : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ color: "#F0F2FF", fontSize: 13 }}>{p.type}</div>
                <div style={{ color: DIM, fontSize: 13 }}>{p.year}</div>
                <div style={{ color: DIM, fontSize: 13 }}>{p.cost}</div>
                <div style={{ color: DIM, fontSize: 13 }}>{p.inspector}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  color: p.result === "Passed" ? GREEN : RED,
                  fontSize: 12, fontWeight: 600,
                }}>
                  {p.result === "Passed" ? <CheckCircle size={13} /> : <XCircle size={13} />}
                  {p.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What needs a permit accordion */}
        <div style={{ backgroundColor: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px", marginBottom: 24 }}>
          <div style={{ color: DIM, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>
            What Needs a Permit?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {permitCategories.map((cat, i) => (
              <div key={cat.label} style={{ border: `1px solid ${BORDER}`, borderRadius: 8, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "12px 14px",
                    backgroundColor: "transparent", border: "none", cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    <span style={{ color: "#F0F2FF", fontSize: 14, fontWeight: 500 }}>{cat.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: cat.color, fontSize: 12, fontWeight: 600 }}>{cat.answer}</span>
                    {openAccordion === i ? <ChevronUp size={14} color={DIM} /> : <ChevronDown size={14} color={DIM} />}
                  </div>
                </button>
                {openAccordion === i && (
                  <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${BORDER}`, backgroundColor: "#0A1628″ }}>
                    <p style={{ color: DIM, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                      {cat.required === true &&
                        `A permit is required for ${cat.label.toLowerCase()} in most Texas cities. Contact your local building department before work begins. Unpermitted work may need to be torn out or could affect your home sale.`}
                      {cat.required === false &&
                        `${cat.label} typically does not require a permit in Texas. Always check your local city ordinances if in doubt.`}
                      {cat.required === null &&
                        `Whether a permit is required for ${cat.label.toLowerCase()} depends on your city, scope, and HOA rules. Check with Frisco or Plano building services before proceeding.`}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* City contact */}
        <div style={{ backgroundColor: "#0E3A5A", border: `1px solid #0EA5E944`, borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ color: "#F0F2FF", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
              Frisco Building Permits
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: DIM, fontSize: 13 }}>
              <Phone size={13} />
              <span>972-292-5320</span>
              <span style={{ margin: "0 4px", color: BORDER }}>·</span>
              <a href="https://ePermits.frisco.gov" target="_blank" rel="noopener noreferrer"
                style={{ color: TEAL, display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                ePermits.frisco.gov <ExternalLink size={11} />
              </a>
            </div>
          </div>
          <div style={{ color: DIM, fontSize: 12 }}>
            Mon–Fri 8am–5pm CT
          </div>
        </div>

      </div>
    </HomeownerLayout>
  );
}
