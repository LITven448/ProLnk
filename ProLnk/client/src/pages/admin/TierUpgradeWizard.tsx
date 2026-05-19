import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search, CheckCircle, AlertTriangle, User, Star, Briefcase,
  ChevronRight, Shield, Clock, ArrowRight, Layers,
} from "lucide-react";
import { toast } from "sonner";

type TierKey = "charter" | "founding" | "l3" | "l4";

interface TierInfo {
  key: TierKey;
  label: string;
  slots: number;
  commission: number;
  networkJob: string;
  subscription: string;
  monthlyFee: number;
  color: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
}

interface AuditEntry {
  admin: string;
  partnerName: string;
  fromTier: string;
  toTier: string;
  reason: string;
  date: string;
}

const TIERS: TierInfo[] = [
  {
    key: "charter",
    label: "Charter",
    slots: 25,
    commission: 72,
    networkJob: "7 / 4 / 2 / 1%",
    subscription: "12 / 6 / 3 / 1.5%",
    monthlyFee: 149,
    color: "teal",
    textColor: "#2DD4BF",
    borderColor: "#0D9488",
    bgColor: "rgba(13, 148, 136, 0.12)",
  },
  {
    key: "founding",
    label: "Founding",
    slots: 100,
    commission: 72,
    networkJob: "7 / 4 / 2 / 1%",
    subscription: "12 / 6 / 3 / 1.5%",
    monthlyFee: 149,
    color: "blue",
    textColor: "#60A5FA",
    borderColor: "#2563EB",
    bgColor: "rgba(37, 99, 235, 0.12)",
  },
  {
    key: "l3",
    label: "Level 3",
    slots: 400,
    commission: 72,
    networkJob: "7 / 4 / 2 / 1%",
    subscription: "12 / 6 / 3 / 1.5%",
    monthlyFee: 149,
    color: "purple",
    textColor: "#C084FC",
    borderColor: "#9333EA",
    bgColor: "rgba(147, 51, 234, 0.12)",
  },
  {
    key: "l4",
    label: "Level 4",
    slots: 1600,
    commission: 72,
    networkJob: "7 / 4 / 2 / 1%",
    subscription: "12 / 6 / 3 / 1.5%",
    monthlyFee: 149,
    color: "amber",
    textColor: "#FBBF24",
    borderColor: "#D97706",
    bgColor: "rgba(217, 119, 6, 0.12)",
  },
];

const UPGRADE_REASONS = [
  "Exceptional performance",
  "Contest winner",
  "Customer request",
  "Correction",
  "Other",
];

const AUDIT_LOG: AuditEntry[] = [
  { admin: "Ashley M.", partnerName: "Devon Clarke", fromTier: "Charter", toTier: "Founding", reason: "Contest winner", date: "May 12, 2026" },
  { admin: "Ashley M.", partnerName: "Priya Shah", fromTier: "Founding", toTier: "Level 3", reason: "Exceptional performance", date: "May 10, 2026" },
  { admin: "Brandon T.", partnerName: "James Okafor", fromTier: "Charter", toTier: "Founding", reason: "Correction", date: "May 8, 2026" },
  { admin: "Ashley M.", partnerName: "Kevin Wu", fromTier: "Level 3", toTier: "Level 4", reason: "Exceptional performance", date: "May 6, 2026" },
  { admin: "Brandon T.", partnerName: "Caitlin Ross", fromTier: "Charter", toTier: "Founding", reason: "Customer request", date: "May 3, 2026" },
];

const MOCK_PARTNER = {
  name: "Marcus Rivera",
  trade: "HVAC",
  tier: "Charter" as const,
  tierKey: "charter" as TierKey,
  jobs: 84,
  rating: 4.8,
  earned: 14847,
};

export default function TierUpgradeWizard() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [partnerFound, setPartnerFound] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null);
  const [confirmInput, setConfirmInput] = useState("");
  const [completed, setCompleted] = useState(false);

  function handleSearch() {
    if (searchQuery.trim().length < 2) return;
    setPartnerFound(true);
  }

  function handleConfirm() {
    if (confirmInput !== "CONFIRM") {
      toast.error("Type CONFIRM exactly to proceed");
      return;
    }
    setCompleted(true);
    toast.success("Tier upgrade applied and logged successfully");
  }

  const selectedTierInfo = TIERS.find(t => t.key === selectedTier);

  if (completed) {
    return (
      <AdminLayout>
        <div className="p-6 bg-[#0A1628] min-h-screen flex items-center justify-center">
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(13, 148, 136, 0.15)", border: "2px solid #0D9488",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <CheckCircle size={36} color="#2DD4BF" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", marginBottom: 8 }}>
              Upgrade Complete
            </h2>
            <p style={{ fontSize: 15, color: "#94A3B8", marginBottom: 24 }}>
              {MOCK_PARTNER.name} has been upgraded to {selectedTierInfo?.label}. Audit trail recorded.
            </p>
            <Button
              onClick={() => { setStep(1); setPartnerFound(false); setSearchQuery(""); setSelectedTier(null); setSelectedReason(""); setNotes(""); setConfirmInput(""); setCompleted(false); }}
              className="bg-teal-600 hover:bg-teal-500 text-white"
            >
              Run Another Upgrade
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-[#0A1628] min-h-screen">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="h-6 w-6 text-teal-400" />
            Tier Upgrade Wizard
          </h1>
          <p className="text-slate-400 mt-1">Manual tier adjustment with audit trail</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 4 }}>
          {[
            { n: 1, label: "Find Partner" },
            { n: 2, label: "Current Status" },
            { n: 3, label: "New Tier" },
            { n: 4, label: "Impact Preview" },
            { n: 5, label: "Confirm" },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                opacity: s.n > step ? 0.4 : 1,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: s.n < step ? "#0D9488" : s.n === step ? "#14B8A6" : "#1E293B",
                  border: s.n === step ? "2px solid #2DD4BF" : "2px solid transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                  color: s.n < step ? "#fff" : s.n === step ? "#fff" : "#64748B",
                }}>
                  {s.n < step ? <CheckCircle size={14} color="#fff" /> : s.n}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" as const,
                  color: s.n === step ? "#2DD4BF" : s.n < step ? "#94A3B8" : "#475569",
                }}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  flex: 1, height: 1, background: s.n < step ? "#0D9488" : "#1E293B",
                  margin: "0 8px",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Find Partner */}
        {step === 1 && (
          <Card className="bg-[#0F1F38] border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Search className="h-5 w-5 text-teal-400" />
                Step 1 — Find Partner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setPartnerFound(false); }}
                  placeholder="Partner name or ID..."
                  style={{
                    flex: 1, background: "#0A1628", border: "1px solid #334155",
                    borderRadius: 8, padding: "10px 14px", color: "#E2E8F0",
                    fontSize: 14, outline: "none",
                  }}
                />
                <Button onClick={handleSearch} className="bg-teal-600 hover:bg-teal-500 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {partnerFound && (
                <div style={{
                  background: "#0A1628", border: "1px solid #0D9488",
                  borderRadius: 12, padding: "16px 20px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: "linear-gradient(135deg, #0D9488, #2563EB)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, fontWeight: 700, color: "#fff",
                      }}>M</div>
                      <div>
                        <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 16 }}>{MOCK_PARTNER.name}</div>
                        <div style={{ display: "flex", gap: 10, fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                          <span>{MOCK_PARTNER.trade}</span>
                          <span>·</span>
                          <span style={{ color: "#2DD4BF" }}>{MOCK_PARTNER.tier} tier</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#94A3B8", textAlign: "right" as const }}>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9" }}>{MOCK_PARTNER.jobs}</div>
                        <div>jobs</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9" }}>{MOCK_PARTNER.rating}★</div>
                        <div>rating</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#34D399" }}>${MOCK_PARTNER.earned.toLocaleString()}</div>
                        <div>earned</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, textAlign: "right" as const }}>
                    <Button onClick={() => setStep(2)} className="bg-teal-600 hover:bg-teal-500 text-white">
                      Select This Partner
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2 — Current Status */}
        {step === 2 && (
          <Card className="bg-[#0F1F38] border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-teal-400" />
                Step 2 — Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div style={{
                background: "#0A1628", borderRadius: 12, padding: "16px 20px",
                border: "1px solid #1E293B",
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>Current Tier</div>
                  <div style={{ fontWeight: 700, color: "#2DD4BF", fontSize: 16 }}>{MOCK_PARTNER.tier}</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>25 founding spots</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>PPS Score</div>
                  <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 16 }}>87 / 100</div>
                  <div style={{ fontSize: 12, color: "#34D399" }}>Top performer</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>Partner ID</div>
                  <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 16 }}>#PRO-4821</div>
                  <div style={{ fontSize: 12, color: "#475569" }}>Active</div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                  Reason for manual upgrade
                </label>
                <select
                  value={selectedReason}
                  onChange={e => setSelectedReason(e.target.value)}
                  style={{
                    width: "100%", background: "#0A1628", border: "1px solid #334155",
                    borderRadius: 8, padding: "10px 14px", color: "#E2E8F0",
                    fontSize: 14, outline: "none",
                  }}
                >
                  <option value="">Select a reason...</option>
                  {UPGRADE_REASONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                  Admin notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add context for audit trail..."
                  rows={3}
                  style={{
                    width: "100%", background: "#0A1628", border: "1px solid #334155",
                    borderRadius: 8, padding: "10px 14px", color: "#E2E8F0",
                    fontSize: 14, outline: "none", resize: "vertical" as const,
                    boxSizing: "border-box" as const,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400">
                  Back
                </Button>
                <Button
                  disabled={!selectedReason}
                  onClick={() => setStep(3)}
                  className="bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40"
                >
                  Continue <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 — New Tier Selection */}
        {step === 3 && (
          <Card className="bg-[#0F1F38] border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-teal-400" />
                Step 3 — Select New Tier
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {TIERS.map(tier => {
                const selected = selectedTier === tier.key;
                return (
                  <div
                    key={tier.key}
                    onClick={() => setSelectedTier(tier.key)}
                    style={{
                      background: selected ? tier.bgColor : "#0A1628",
                      border: `1px solid ${selected ? tier.borderColor : "#1E293B"}`,
                      borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `2px solid ${selected ? tier.textColor : "#334155"}`,
                        background: selected ? tier.textColor : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 2, flexShrink: 0,
                      }}>
                        {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: selected ? tier.textColor : "#E2E8F0" }}>
                            {tier.label}
                          </span>
                          <span style={{ fontSize: 12, color: "#64748B" }}>{tier.slots} total slots</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                          {[
                            ["Commission", `${tier.commission}% keep`],
                            ["Network job", tier.networkJob],
                            ["Subscription", tier.subscription],
                            ["Monthly fee", `$${tier.monthlyFee}/mo`],
                          ].map(([label, value]) => (
                            <div key={label}>
                              <div style={{ fontSize: 11, color: "#64748B" }}>{label}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#CBD5E1" }}>{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-400">Back</Button>
                <Button
                  disabled={!selectedTier}
                  onClick={() => setStep(4)}
                  className="bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40"
                >
                  Preview Impact <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Impact Preview */}
        {step === 4 && selectedTierInfo && (
          <Card className="bg-[#0F1F38] border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <ArrowRight className="h-5 w-5 text-teal-400" />
                Step 4 — Impact Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#0A1628", borderRadius: 10, padding: "14px 18px",
                border: "1px solid #1E293B",
              }}>
                <div style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700,
                  background: "rgba(13, 148, 136, 0.15)", color: "#2DD4BF",
                }}>{MOCK_PARTNER.tier}</div>
                <ArrowRight size={18} color="#64748B" />
                <div style={{
                  padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700,
                  background: selectedTierInfo.bgColor, color: selectedTierInfo.textColor,
                }}>{selectedTierInfo.label}</div>
              </div>

              {[
                { label: "Partner commission rate", value: "72% → 72% (same at all tiers)", note: null },
                { label: "Network job override to recruits", value: "7/4/2/1% → 7/4/2/1% (unchanged)", note: null },
                { label: "Subscription override rate", value: "12/6/3/1.5% → 12/6/3/1.5% (unchanged)", note: null },
                { label: "Monthly platform fee", value: "$149/mo → $149/mo (locked at all tiers)", note: null },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: i < 3 ? "1px solid #1E293B" : "none",
                }}>
                  <span style={{ fontSize: 14, color: "#94A3B8" }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0", textAlign: "right" as const, maxWidth: "55%" }}>
                    {row.value}
                  </span>
                </div>
              ))}

              <div style={{
                background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.2)",
                borderRadius: 10, padding: "12px 16px",
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <AlertTriangle size={16} color="#818CF8" style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ fontSize: 13, color: "#A5B4FC" }}>
                  Admin note: This upgrade does not affect founding slot count or network tree position. It is a label change only with full audit documentation.
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setStep(3)} className="text-slate-400">Back</Button>
                <Button onClick={() => setStep(5)} className="bg-teal-600 hover:bg-teal-500 text-white">
                  Review & Confirm <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5 — Confirm */}
        {step === 5 && selectedTierInfo && (
          <Card className="bg-[#0F1F38] border-[#1E293B]">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-400" />
                Step 5 — Confirm Upgrade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div style={{
                background: "#0A1628", borderRadius: 12, padding: "16px 20px",
                border: "1px solid #1E293B",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748B", marginBottom: 12, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>
                  Upgrade Summary
                </div>
                {[
                  ["Partner", MOCK_PARTNER.name],
                  ["From tier", MOCK_PARTNER.tier],
                  ["To tier", selectedTierInfo.label],
                  ["Reason", selectedReason],
                  ["Admin", "Ashley M."],
                  ["Date", "May 15, 2026"],
                  ["Notes", notes || "—"],
                ].map(([label, value]) => (
                  <div key={label} style={{
                    display: "flex", gap: 16, padding: "6px 0",
                    borderBottom: "1px solid #1A2840",
                  }}>
                    <span style={{ fontSize: 13, color: "#64748B", minWidth: 100 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: 6 }}>
                  Type <span style={{ color: "#F87171", fontFamily: "monospace" }}>CONFIRM</span> to proceed
                </label>
                <input
                  value={confirmInput}
                  onChange={e => setConfirmInput(e.target.value)}
                  placeholder="CONFIRM"
                  style={{
                    width: "100%", background: "#0A1628", border: "1px solid #334155",
                    borderRadius: 8, padding: "10px 14px", color: "#E2E8F0",
                    fontSize: 14, outline: "none", boxSizing: "border-box" as const,
                    fontFamily: "monospace",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <Button variant="ghost" onClick={() => setStep(4)} className="text-slate-400">Back</Button>
                <Button
                  onClick={handleConfirm}
                  disabled={confirmInput !== "CONFIRM"}
                  className="bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audit Log */}
        <Card className="bg-[#0F1F38] border-[#1E293B]">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              Recent Manual Upgrades
            </CardTitle>
          </CardHeader>
          <CardContent style={{ padding: "0 24px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column" as const }}>
              {AUDIT_LOG.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "11px 0",
                    borderBottom: i < AUDIT_LOG.length - 1 ? "1px solid #1E293B" : "none",
                  }}
                >
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "rgba(13, 148, 136, 0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: "#2DD4BF",
                    }}>{entry.partnerName[0]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>{entry.partnerName}</div>
                      <div style={{ fontSize: 12, color: "#64748B" }}>
                        {entry.fromTier} → {entry.toTier} · {entry.reason}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>{entry.admin}</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{entry.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
