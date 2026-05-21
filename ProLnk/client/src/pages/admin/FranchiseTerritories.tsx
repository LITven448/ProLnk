import React from 'react';
import type React from "react";
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  MapPin, Plus, ChevronRight, Users, DollarSign, Activity, Grid, X, AlertCircle,
} from "lucide-react";

const CARD: React.CSSProperties = {
  backgroundColor: T.card,
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: "20px 24px",
};

const LABEL: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: T.muted,
  fontFamily: FONT,
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: T.card,
  border: "none",
  borderRadius: "10px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  color: T.text,
  fontFamily: FONT,
  fontSize: 12,
};

const axisStyle = { fill: T.muted, fontSize: 11, fontFamily: FONT };

const PARTNERS = [
  "Smith Home Services",
  "ProFix Dallas",
  "Reliable Pro Group",
  "TrustHome FW",
  "ProLnk FW West",
  "Premier Home Alliance",
  "Unassigned",
];

interface Territory {
  id: number;
  name: string;
  zipRange: string;
  zips: string[];
  franchise: string;
  status: "Active" | "Available" | "Reserved";
  monthlyRevenue: number;
  partnerCount: number;
  monthlyLeads: number;
  color: string;
}

const TERRITORIES: Territory[] = [
  { id: 1, name: "DFW North",           zipRange: "75001–75030", zips: ["75001","75002","75010","75013","75019","75023","75024","75025"], franchise: "Smith Home Services",   status: "Active",    monthlyRevenue: 18400, partnerCount: 12, monthlyLeads: 94,  color: "#3b82f6" },
  { id: 2, name: "DFW Central",         zipRange: "75201–75250", zips: ["75201","75204","75206","75214","75218","75228"],                 franchise: "ProFix Dallas",        status: "Active",    monthlyRevenue: 24100, partnerCount: 18, monthlyLeads: 131, color: "#10b981" },
  { id: 3, name: "DFW South",           zipRange: "75040–75070", zips: ["75041","75043","75048","75051","75060","75062","75063"],         franchise: "Reliable Pro Group",   status: "Active",    monthlyRevenue: 16700, partnerCount: 11, monthlyLeads: 82,  color: "#f59e0b" },
  { id: 4, name: "Fort Worth East",      zipRange: "76001–76030", zips: ["76001","76002","76010","76011","76012"],                         franchise: "TrustHome FW",         status: "Active",    monthlyRevenue: 12300, partnerCount: 8,  monthlyLeads: 67,  color: "#ec4899" },
  { id: 5, name: "Fort Worth West",      zipRange: "76100–76140", zips: ["76102","76107","76109","76116","76119","76120"],                 franchise: "ProLnk FW West",       status: "Active",    monthlyRevenue: 9800,  partnerCount: 6,  monthlyLeads: 51,  color: "#8b5cf6" },
  { id: 6, name: "Garland / Mesquite",   zipRange: "75040–75150", zips: ["75040","75041","75042","75043","75150"],                        franchise: "Smith Home Services",   status: "Active",    monthlyRevenue: 11200, partnerCount: 7,  monthlyLeads: 58,  color: "#06b6d4" },
  { id: 7, name: "Irving / Grand Prairie",zipRange: "75060–75062",zips: ["75060","75061","75062"],                                        franchise: "ProFix Dallas",        status: "Active",    monthlyRevenue: 9900,  partnerCount: 6,  monthlyLeads: 48,  color: "#f97316" },
  { id: 8, name: "Denton / Lewisville",  zipRange: "76201–76210", zips: ["76201","76205","76207","76208","76210"],                        franchise: "Reliable Pro Group",   status: "Active",    monthlyRevenue: 7100,  partnerCount: 4,  monthlyLeads: 36,  color: "#a855f7" },
  { id: 9, name: "Plano / Allen",        zipRange: "75070–75095", zips: [],                                                               franchise: "—",                    status: "Available", monthlyRevenue: 0,     partnerCount: 0,  monthlyLeads: 0,   color: "#6b7280" },
  { id: 10,name: "Frisco / McKinney",    zipRange: "75033–75069", zips: [],                                                               franchise: "—",                    status: "Available", monthlyRevenue: 0,     partnerCount: 0,  monthlyLeads: 0,   color: "#6b7280" },
  { id: 11,name: "Rockwall / Rowlett",   zipRange: "75032–75089", zips: [],                                                               franchise: "—",                    status: "Available", monthlyRevenue: 0,     partnerCount: 0,  monthlyLeads: 0,   color: "#6b7280" },
  { id: 12,name: "Arlington / Mansfield",zipRange: "76001–76063", zips: [],                                                               franchise: "Premier Home Alliance", status: "Reserved",  monthlyRevenue: 0,     partnerCount: 0,  monthlyLeads: 0,   color: "#f97316" },
];

const revenueData = TERRITORIES.filter(t => t.monthlyRevenue > 0).map(t => ({
  name: t.name.split(" ")[0],
  revenue: t.monthlyRevenue,
}));

const statusColor: Record<string, string> = { Active: T.green, Available: T.blue, Reserved: T.amber };
const statusBg:    Record<string, string> = { Active: `${T.green}18`, Available: `${T.blue}18`, Reserved: `${T.amber}18` };

export default function FranchiseTerritories() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", partner: PARTNERS[0], zipRange: "" });
  const selected = TERRITORIES.find(t => t.id === selectedId);

  const active    = TERRITORIES.filter(t => t.status === "Active").length;
  const coveredZips = TERRITORIES.filter(t => t.status === "Active").reduce((acc, t) => acc + t.zips.length, 0);
  const activeRevenues = TERRITORIES.filter(t => t.monthlyRevenue > 0).map(t => t.monthlyRevenue);
  const avgRevenue = activeRevenues.length ? Math.round(activeRevenues.reduce((a, b) => a + b, 0) / activeRevenues.length) : 0;

  return (
    <AdminLayout>
      <div style={{ padding: "24px 32px 40px", fontFamily: FONT }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <MapPin style={{ width: 22, height: 22, color: T.amber }} />
              <h1 style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: T.text, margin: 0 }}>Franchise Territories</h1>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, color: T.muted, margin: 0 }}>DFW metro territory assignments, coverage, and revenue tracking.</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 10,
              padding: "10px 20px", fontFamily: FONT, fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(26,115,232,0.35)",
            }}
          >
            <Plus style={{ width: 14, height: 14 }} /> Create Territory
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Active Territories",  value: String(active),                           icon: Activity,     gradient: BADGE_GRADIENTS.green  },
            { label: "Covered ZIPs",        value: String(coveredZips),                      icon: Grid,         gradient: BADGE_GRADIENTS.blue   },
            { label: "Revenue / Territory", value: `$${avgRevenue.toLocaleString()}/mo`,     icon: DollarSign,   gradient: BADGE_GRADIENTS.orange },
            { label: "Uncovered ZIPs",      value: "253",                                    icon: AlertCircle,  gradient: BADGE_GRADIENTS.cyan   },
          ].map(({ label, value, icon: Icon, gradient }) => (
            <div key={label} style={{ ...CARD, paddingTop: 28, position: "relative" }}>
              <div style={{
                position: "absolute", top: -16, left: 20, width: 52, height: 52, borderRadius: "12px",
                background: gradient, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}>
                <Icon style={{ width: 22, height: 22, color: "#fff" }} />
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={LABEL}>{label}</div>
                <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22, color: T.text }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, marginBottom: 20 }}>
          <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
            <div style={{ ...LABEL, padding: "14px 20px 0" }}>DFW Metro Map</div>
            <div style={{
              margin: 16, borderRadius: 10, overflow: "hidden", background: "#1a1a2e", height: 300,
              position: "relative", display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 6, padding: 12,
            }}>
              {TERRITORIES.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}
                  style={{
                    borderRadius: 8,
                    background: selectedId === t.id ? t.color : `${t.color}55`,
                    border: `2px solid ${t.color}`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.15s", padding: "4px 3px",
                  }}
                >
                  <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 9, color: "#fff", textAlign: "center", lineHeight: 1.2 }}>{t.name}</div>
                  <div style={{
                    marginTop: 3, fontSize: 8, fontFamily: FONT, fontWeight: 700,
                    background: statusBg[t.status], color: statusColor[t.status], borderRadius: 4, padding: "1px 4px",
                  }}>{t.status}</div>
                </div>
              ))}
              <div style={{ position: "absolute", bottom: 8, right: 12, fontFamily: FONT, fontSize: 9, color: "#666" }}>Click to select</div>
            </div>
          </div>

          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 16 }}>Monthly Revenue by Territory</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={revenueData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: `${T.accent}11` }} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill={T.amber} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 320px" : "1fr", gap: 20 }}>
          <div style={CARD}>
            <div style={{ ...LABEL, marginBottom: 16 }}>Territory Assignments</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT, fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Territory", "ZIP Range", "Lead Partner", "ZIPs", "Partners", "Monthly Rev", "Status", ""].map(h => (
                      <th key={h} style={{
                        textAlign: ["ZIPs","Partners","Monthly Rev",""].includes(h) ? "right" : "left",
                        padding: "8px 12px", color: T.muted, fontWeight: 700, fontSize: 11,
                        borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TERRITORIES.map(t => (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}
                      style={{ cursor: "pointer", background: selectedId === t.id ? `${t.color}0D` : "transparent", borderBottom: `1px solid ${T.border}` }}
                    >
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: T.text }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: t.color, flexShrink: 0 }} />
                          {t.name}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px", fontFamily: MONO, fontSize: 12, color: T.muted }}>{t.zipRange}</td>
                      <td style={{ padding: "10px 12px", color: T.text }}>{t.franchise}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: T.text }}>{t.zips.length || "—"}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", color: T.text }}>{t.partnerCount || "—"}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: MONO, color: T.green, fontWeight: 700 }}>
                        {t.monthlyRevenue ? `$${(t.monthlyRevenue ?? 0).toLocaleString()}` : "—"}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ background: statusBg[t.status], color: statusColor[t.status], fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{t.status}</span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        {t.status === "Available" && (
                          <button
                            onClick={e => e.stopPropagation()}
                            style={{ background: BADGE_GRADIENTS.blue, color: "#fff", border: "none", borderRadius: 7, padding: "4px 12px", fontFamily: FONT, fontWeight: 700, fontSize: 11, cursor: "pointer" }}
                          >Claim</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selected && (
            <div style={{ ...CARD, border: `1.5px solid ${selected.color}55` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: T.text }}>{selected.name}</div>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: T.muted }}>{selected.franchise}</div>
                </div>
                <button onClick={() => setSelectedId(null)} style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: FONT, fontSize: 12, color: T.muted }}>✕</button>
              </div>
              {[
                { label: "Status",          value: selected.status,                                                   chip: true  },
                { label: "ZIP Range",       value: selected.zipRange,                                                 chip: false },
                { label: "Monthly Revenue", value: selected.monthlyRevenue ? `$${(selected.monthlyRevenue ?? 0).toLocaleString()}` : "—", chip: false },
                { label: "Partner Count",   value: String(selected.partnerCount || "—"),                              chip: false },
                { label: "Monthly Leads",   value: String(selected.monthlyLeads || "—"),                              chip: false },
              ].map(({ label, value, chip }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ fontFamily: FONT, fontSize: 12, color: T.muted }}>{label}</div>
                  {chip
                    ? <span style={{ background: statusBg[value as string], color: statusColor[value as string], fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "2px 8px", fontFamily: FONT }}>{value}</span>
                    : <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: T.text }}>{value}</div>
                  }
                </div>
              ))}
              {selected.zips.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ ...LABEL, marginBottom: 8 }}>ZIP Codes</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.zips.map(z => (
                      <span key={z} style={{ background: `${selected.color}18`, color: selected.color, fontFamily: MONO, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "3px 8px" }}>{z}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {showCreate && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
            <div style={{ ...CARD, width: 440, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: T.text }}>Create Territory</div>
                <button onClick={() => setShowCreate(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: T.muted }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
              {[
                { label: "Territory Name", key: "name", placeholder: "e.g. McKinney North" },
                { label: "ZIP Range",      key: "zipRange", placeholder: "e.g. 75070–75080" },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={{ ...LABEL, display: "block", marginBottom: 6 }}>{field.label}</label>
                  <input
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%", padding: "10px 14px", borderRadius: 10,
                      border: `1.5px solid ${T.border}`, background: T.surface,
                      color: T.text, fontFamily: FONT, fontSize: 13, boxSizing: "border-box" as const,
                    }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ ...LABEL, display: "block", marginBottom: 6 }}>Lead Partner</label>
                <select
                  value={form.partner}
                  onChange={e => setForm(prev => ({ ...prev, partner: e.target.value }))}
                  style={{
                    width: "100%", padding: "10px 14px", borderRadius: 10,
                    border: `1.5px solid ${T.border}`, background: T.surface,
                    color: T.text, fontFamily: FONT, fontSize: 13,
                  }}
                >
                  {PARTNERS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${T.border}`, background: "transparent", color: T.muted, fontFamily: FONT, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", background: BADGE_GRADIENTS.blue, color: "#fff", fontFamily: FONT, fontWeight: 700, cursor: "pointer" }}>Create Territory</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
