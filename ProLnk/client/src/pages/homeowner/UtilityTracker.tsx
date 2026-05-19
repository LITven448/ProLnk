import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Zap, Flame, Droplets, Wifi, Trash2, Building2,
  CreditCard, Plus, X, ChevronDown, TrendingDown, TrendingUp,
  AlertCircle, CheckCircle,
} from "lucide-react";

interface Utility {
  id: number;
  name: string;
  provider: string;
  initial: string;
  initColor: string;
  accountMasked: string;
  monthlyAvg: number;
  lastBill: number;
  dueDate: string;
  autopay: boolean;
  payLink: string;
  icon: React.ReactNode;
}

const UTILITIES: Utility[] = [
  {
    id: 1,
    name: "Electric",
    provider: "Oncor",
    initial: "O",
    initColor: "#F59E0B",
    accountMasked: "***-4821″,
    monthlyAvg: 142,
    lastBill: 158,
    dueDate: "May 22″,
    autopay: true,
    payLink: "#",
    icon: <Zap size={20} color="#F59E0B" />,
  },
  {
    id: 2,
    name: "Gas",
    provider: "Atmos Energy",
    initial: "A",
    initColor: "#EF4444″,
    accountMasked: "***-7392″,
    monthlyAvg: 87,
    lastBill: 64,
    dueDate: "May 28″,
    autopay: true,
    payLink: "#",
    icon: <Flame size={20} color="#EF4444″ />,
  },
  {
    id: 3,
    name: "Water",
    provider: "City of Frisco",
    initial: "F",
    initColor: "#0EA5E9″,
    accountMasked: "***-1155″,
    monthlyAvg: 56,
    lastBill: 61,
    dueDate: "Jun 1″,
    autopay: false,
    payLink: "#",
    icon: <Droplets size={20} color="#0EA5E9″ />,
  },
  {
    id: 4,
    name: "Internet",
    provider: "Spectrum",
    initial: "S",
    initColor: "#8B5CF6″,
    accountMasked: "***-0044″,
    monthlyAvg: 79,
    lastBill: 79,
    dueDate: "May 19″,
    autopay: true,
    payLink: "#",
    icon: <Wifi size={20} color="#8B5CF6″ />,
  },
  {
    id: 5,
    name: "Trash",
    provider: "Republic Services",
    initial: "R",
    initColor: "#10B981″,
    accountMasked: "***-8830″,
    monthlyAvg: 38,
    lastBill: 38,
    dueDate: "Jun 5″,
    autopay: false,
    payLink: "#",
    icon: <Trash2 size={20} color="#10B981″ />,
  },
  {
    id: 6,
    name: "HOA",
    provider: "Frisco Lakes HOA",
    initial: "H",
    initColor: "#00B5B8″,
    accountMasked: "***-2200″,
    monthlyAvg: 185,
    lastBill: 185,
    dueDate: "Jun 1″,
    autopay: false,
    payLink: "#",
    icon: <Building2 size={20} color="#00B5B8″ />,
  },
];

const KWH_DATA = [
  { month: "Dec", kwh: 820 },
  { month: "Jan", kwh: 890 },
  { month: "Feb", kwh: 810 },
  { month: "Mar", kwh: 680 },
  { month: "Apr", kwh: 620 },
  { month: "May", kwh: 710 },
];

const CHART_W = 320;
const CHART_H = 80;
const MAX_KWH = 950;

function SparkLine() {
  const pts = KWH_DATA.map((d, i) => {
    const x = (i / (KWH_DATA.length - 1)) * (CHART_W - 24) + 12;
    const y = CHART_H - 12 - ((d.kwh / MAX_KWH) * (CHART_H - 24));
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={CHART_W} height={CHART_H} className="w-full">
      <polyline
        points={pts}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2″
        strokeLinejoin="round"
      />
      {KWH_DATA.map((d, i) => {
        const x = (i / (KWH_DATA.length - 1)) * (CHART_W - 24) + 12;
        const y = CHART_H - 12 - ((d.kwh / MAX_KWH) * (CHART_H - 24));
        return (
          <g key={d.month}>
            <circle cx={x} cy={y} r={3} fill="#F59E0B" />
            <text x={x} y={CHART_H - 1} textAnchor="middle" fontSize={9} fill="#64748B">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function UtilityTracker() {
  const [utilities, setUtilities] = useState<Utility[]>(UTILITIES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", provider: "", monthlyAvg: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const totalMonthly = utilities.reduce((s, u) => s + u.monthlyAvg, 0);
  const avgDfw = 624;
  const diff = avgDfw - totalMonthly;

  function addUtility() {
    if (!form.name.trim() || !form.provider.trim()) return;
    const u: Utility = {
      id: Date.now(),
      name: form.name,
      provider: form.provider,
      initial: form.provider[0]?.toUpperCase() ?? "U",
      initColor: "#64748B",
      accountMasked: "***-0000″,
      monthlyAvg: Number(form.monthlyAvg) || 0,
      lastBill: Number(form.monthlyAvg) || 0,
      dueDate: "—",
      autopay: false,
      payLink: "#",
      icon: <CreditCard size={20} color="#64748B" />,
    };
    setUtilities(prev => [...prev, u]);
    setForm({ name: "", provider: "", monthlyAvg: "" });
    setShowForm(false);
  }

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F1F5F9″, margin: 0 }}>Utility Tracker</h1>
          <p style={{ color: "#94A3B8″, marginTop: 4, fontSize: 14 }}>All your home utilities in one place</p>
        </div>

        {/* Summary banner */}
        <div style={{
          background: "linear-gradient(135deg, #0F2944 0%, #0A1F35 100%)",
          border: "1px solid #1E3A5F",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ color: "#94A3B8″, fontSize: 13, marginBottom: 4 }}>Monthly Utilities</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#F1F5F9″ }}>${totalMonthly}</div>
            <div style={{ color: "#94A3B8″, fontSize: 12, marginTop: 2 }}>estimate for your home size/ZIP</div>
          </div>
          <div style={{
            background: diff >= 0 ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${diff >= 0 ? "#10B981" : "#EF4444"}`,
            borderRadius: 10,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            {diff >= 0
              ? <TrendingDown size={22} color="#10B981″ />
              : <TrendingUp size={22} color="#EF4444″ />}
            <div>
              <div style={{ color: diff >= 0 ? "#10B981″ : "#EF4444", fontWeight: 700, fontSize: 15 }}>
                {diff >= 0 ? `$${diff} below` : `$${Math.abs(diff)} above`} average
              </div>
              <div style={{ color: "#94A3B8″, fontSize: 12 }}>Average DFW home pays ${avgDfw}/mo in utilities</div>
            </div>
          </div>
        </div>

        {/* Utility grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}>
          {utilities.map(u => (
            <div key={u.id} style={{
              background: "#0D1F35″,
              border: "1px solid #1E3A5F",
              borderRadius: 12,
              padding: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: u.initColor + "22″,
                  border: `1px solid ${u.initColor}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 16, color: u.initColor,
                }}>
                  {u.initial}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#F1F5F9″, fontWeight: 600, fontSize: 14 }}>{u.provider}</div>
                  <div style={{ color: "#64748B", fontSize: 12 }}>{u.name}</div>
                </div>
                {u.icon}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                <div style={{ background: "#0A1628″, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ color: "#64748B", fontSize: 11 }}>Account</div>
                  <div style={{ color: "#CBD5E1″, fontSize: 13, fontFamily: "monospace" }}>{u.accountMasked}</div>
                </div>
                <div style={{ background: "#0A1628″, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ color: "#64748B", fontSize: 11 }}>Monthly avg</div>
                  <div style={{ color: "#10B981″, fontSize: 13, fontWeight: 600 }}>${u.monthlyAvg}/mo</div>
                </div>
                <div style={{ background: "#0A1628″, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ color: "#64748B", fontSize: 11 }}>Last bill</div>
                  <div style={{ color: "#F1F5F9″, fontSize: 13 }}>${u.lastBill}</div>
                </div>
                <div style={{ background: "#0A1628″, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ color: "#64748B", fontSize: 11 }}>Due</div>
                  <div style={{ color: "#F59E0B", fontSize: 13 }}>{u.dueDate}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {u.autopay
                    ? <><CheckCircle size={13} color="#10B981″ /><span style={{ color: "#10B981", fontSize: 12 }}>Autopay on</span></>
                    : <><AlertCircle size={13} color="#F59E0B" /><span style={{ color: "#F59E0B", fontSize: 12 }}>Manual pay</span></>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <a
                    href={u.payLink}
                    style={{
                      fontSize: 12, fontWeight: 600, color: "#00B5B8″,
                      textDecoration: "none", padding: "4px 10px",
                      border: "1px solid #00B5B866″, borderRadius: 6,
                    }}
                  >
                    Pay Bill
                  </a>
                  <button
                    onClick={() => setEditId(editId === u.id ? null : u.id)}
                    style={{
                      fontSize: 12, fontWeight: 600, color: "#94A3B8″,
                      background: "#1E3A5F", border: "none", borderRadius: 6,
                      padding: "4px 10px", cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Energy usage trend */}
        <div style={{
          background: "#0D1F35″,
          border: "1px solid #1E3A5F",
          borderRadius: 12,
          padding: "20px 24px",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Zap size={18} color="#F59E0B" />
            <span style={{ color: "#F1F5F9″, fontWeight: 600, fontSize: 15 }}>Electric Usage Trend</span>
            <span style={{ color: "#64748B", fontSize: 12, marginLeft: "auto" }}>kWh — last 6 months</span>
          </div>
          <SparkLine />
          <div style={{ color: "#64748B", fontSize: 12, marginTop: 8 }}>
            Peaks expected July–August. Your HVAC accounts for ~62% of summer electric usage.
          </div>
        </div>

        {/* Add utility */}
        <div style={{ marginBottom: 16 }}>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#1E3A5F", border: "1px dashed #00B5B866″,
                borderRadius: 10, padding: "12px 20px", cursor: "pointer",
                color: "#00B5B8″, fontWeight: 600, fontSize: 14, width: "100%",
                justifyContent: "center",
              }}
            >
              <Plus size={16} />
              Add Utility
            </button>
          ) : (
            <div style={{
              background: "#0D1F35″, border: "1px solid #1E3A5F",
              borderRadius: 12, padding: "20px 24px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ color: "#F1F5F9″, fontWeight: 600 }}>Add Utility</span>
                <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 6 }}>Utility type</div>
                  <input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Electric, Gas, etc."
                    style={{
                      width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F",
                      borderRadius: 8, padding: "8px 12px", color: "#F1F5F9″, fontSize: 14,
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 6 }}>Provider name</div>
                  <input
                    value={form.provider}
                    onChange={e => setForm(f => ({ ...f, provider: e.target.value }))}
                    placeholder="Provider"
                    style={{
                      width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F",
                      borderRadius: 8, padding: "8px 12px", color: "#F1F5F9″, fontSize: 14,
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 6 }}>Monthly avg ($)</div>
                  <input
                    type="number"
                    value={form.monthlyAvg}
                    onChange={e => setForm(f => ({ ...f, monthlyAvg: e.target.value }))}
                    placeholder="0″
                    style={{
                      width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F",
                      borderRadius: 8, padding: "8px 12px", color: "#F1F5F9″, fontSize: 14,
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>
              <button
                onClick={addUtility}
                style={{
                  background: "#00B5B8″, border: "none", borderRadius: 8,
                  padding: "10px 24px", color: "#fff", fontWeight: 600, fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Add Utility
              </button>
            </div>
          )}
        </div>

      </div>
    </HomeownerLayout>
  );
}
