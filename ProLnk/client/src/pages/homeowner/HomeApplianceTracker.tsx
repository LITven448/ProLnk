import React from 'react';
import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Wind, Droplets, Utensils, ShoppingCart,
  WashingMachine, CarFront, Microwave, Flame,
  AlertTriangle, Plus, X, CheckCircle, Calendar,
  Shield, Wrench,
} from "lucide-react";

interface Appliance {
  id: number;
  name: string;
  brand: string;
  installYear: number;
  warrantyExpiry: number;
  lastService: string;
  nextService: string;
  health: "green" | "yellow" | "red";
}

const APPLIANCES: Appliance[] = [
  { id: 1, name: "HVAC", brand: "Carrier 5-ton", installYear: 2018, warrantyExpiry: 2028, lastService: "Oct 2024", nextService: "Apr 2025", health: "green" },
  { id: 2, name: "Water Heater", brand: "Rheem 50gal", installYear: 2015, warrantyExpiry: 2021, lastService: "Mar 2023", nextService: "Mar 2025", health: "red" },
  { id: 3, name: "Dishwasher", brand: "Bosch 500 Series", installYear: 2020, warrantyExpiry: 2025, lastService: "Never", nextService: "Jun 2025", health: "yellow" },
  { id: 4, name: "Refrigerator", brand: "Samsung 28cf", installYear: 2019, warrantyExpiry: 2024, lastService: "Jan 2024", nextService: "Jan 2026", health: "green" },
  { id: 5, name: "Washer/Dryer", brand: "LG WashTower", installYear: 2021, warrantyExpiry: 2026, lastService: "Never", nextService: "Aug 2025", health: "yellow" },
  { id: 6, name: "Garage Door", brand: "Chamberlain 1.25hp", installYear: 2016, warrantyExpiry: 2022, lastService: "May 2022", nextService: "May 2025", health: "red" },
  { id: 7, name: "Microwave", brand: "Panasonic Inverter", installYear: 2022, warrantyExpiry: 2024, lastService: "Never", nextService: "N/A", health: "green" },
  { id: 8, name: "Range", brand: "GE Profile Gas", installYear: 2019, warrantyExpiry: 2024, lastService: "Feb 2024", nextService: "Feb 2026", health: "green" },
];

const ICONS: Record<string, React.ReactNode> = {
  "HVAC": <Wind size={18} color="#0D9488" />,
  "Water Heater": <Droplets size={18} color="#0D9488" />,
  "Dishwasher": <Utensils size={18} color="#0D9488" />,
  "Refrigerator": <ShoppingCart size={18} color="#0D9488" />,
  "Washer/Dryer": <WashingMachine size={18} color="#0D9488" />,
  "Garage Door": <CarFront size={18} color="#0D9488" />,
  "Microwave": <Microwave size={18} color="#0D9488" />,
  "Range": <Flame size={18} color="#0D9488" />,
};

const HEALTH = {
  green:  { bg: "#10B981", label: "Good" },
  yellow: { bg: "#F59E0B", label: "Service Due" },
  red:    { bg: "#EF4444", label: "Attention" },
};

const now = 2025;

export default function HomeApplianceTracker() {
  const [appliances, setAppliances] = useState<Appliance[]>(APPLIANCES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", installYear: "", warrantyExpiry: "" });

  const active = appliances.filter(a => a.warrantyExpiry >= now).length;
  const due = appliances.filter(a => a.health !== "green").length;

  function addAppliance() {
    if (!form.name.trim()) return;
    setAppliances(prev => [...prev, {
      id: Date.now(),
      name: form.name,
      brand: form.brand,
      installYear: Number(form.installYear) || now,
      warrantyExpiry: Number(form.warrantyExpiry) || now + 1,
      lastService: "Never",
      nextService: "TBD",
      health: "green",
    }]);
    setForm({ name: "", brand: "", installYear: "", warrantyExpiry: "" });
    setShowForm(false);
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-2xl mx-auto px-4 py-6 pb-20">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black">Appliance Tracker</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              Never miss a maintenance deadline
            </p>
          </div>

          {/* Recall Alert */}
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-3 mb-5"
            style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <AlertTriangle size={16} color="#F59E0B" className="shrink-0" />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              <span className="font-bold text-white">1 of your appliances</span> may be affected by a recall —{" "}
              <span className="underline cursor-pointer" style={{ color: "#F59E0B" }}>check recall.gov</span>
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Tracked", value: appliances.length, color: "#0D9488" },
              { label: "Warranties Active", value: active, color: "#10B981" },
              { label: "Service Due", value: due, color: "#EF4444" },
            ].map(s => (
              <div
                key={s.label}
                className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="text-2xl font-black" style={{ color: s.color }}>{s.value}</span>
                <span className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Appliance Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {appliances.map(a => {
              const age = now - a.installYear;
              const warrantyActive = a.warrantyExpiry >= now;
              const h = HEALTH[a.health];
              return (
                <div
                  key={a.id}
                  className="rounded-2xl p-4 flex flex-col gap-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {ICONS[a.name] ?? <Wrench size={18} color="#0D9488" />}
                      <div>
                        <p className="text-sm font-bold leading-tight">{a.name}</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{a.brand}</p>
                      </div>
                    </div>
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                      style={{ background: h.bg, boxShadow: `0 0 6px ${h.bg}` }}
                      title={h.label}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      <span>Installed {a.installYear} ({age} yr{age !== 1 ? "s" : ""})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield size={12} color={warrantyActive ? "#10B981" : "#EF4444"} />
                      <span style={{ color: warrantyActive ? "#10B981" : "#EF4444" }}>
                        Warranty {warrantyActive ? `expires ${a.warrantyExpiry}` : "expired"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Wrench size={12} />
                      <span>Last: {a.lastService}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} color="#0D9488" />
                      <span>Next: {a.nextService}</span>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 rounded-xl text-xs font-bold"
                    style={{ background: "rgba(13,148,136,0.12)", color: "#0D9488", border: "1px solid rgba(13,148,136,0.25)" }}
                  >
                    Schedule Service
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Appliance */}
          {showForm ? (
            <div
              className="rounded-2xl p-4 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(13,148,136,0.30)" }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold">Add Appliance</span>
                <button onClick={() => setShowForm(false)}>
                  <X size={16} color="rgba(255,255,255,0.4)" />
                </button>
              </div>
              {[
                { key: "name", label: "Appliance Name", placeholder: "e.g. Garbage Disposal" },
                { key: "brand", label: "Brand / Model", placeholder: "e.g. InSinkErator 1hp" },
                { key: "installYear", label: "Install Year", placeholder: "2022" },
                { key: "warrantyExpiry", label: "Warranty Expiry Year", placeholder: "2027" },
              ].map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>{f.label}</label>
                  <input
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="rounded-xl px-3 py-2 text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      caretColor: "#0D9488",
                    }}
                  />
                </div>
              ))}
              <button
                onClick={addAppliance}
                className="w-full py-3 rounded-xl text-sm font-bold mt-1"
                style={{ background: "#0D9488", color: "#fff" }}
              >
                Add Appliance
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold"
              style={{ background: "rgba(13,148,136,0.10)", border: "1px dashed rgba(13,148,136,0.40)", color: "#0D9488" }}
            >
              <Plus size={16} />
              Add Appliance
            </button>
          )}
        </div>
      </div>
    </HomeownerLayout>
  );
}
