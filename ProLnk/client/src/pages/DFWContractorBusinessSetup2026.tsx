import { useState } from 'react';

export default function DFWContractorBusinessSetup2026() {
  const [stage, setStage] = useState<string>("");

  const stages = [
    {
      id: "idea",
      label: "Just an Idea",
      title: "Start Here — Business Foundation",
      items: [
        { done: false, task: "Choose LLC vs Sole Proprietor — LLC strongly recommended for liability protection" },
        { done: false, task: "Pick a business name — check Texas SOS availability at direct.sos.state.tx.us" },
        { done: false, task: "File Texas LLC: submit Certificate of Formation online ($300 fee, processed in 3-5 days)" },
        { done: false, task: "Get your EIN free at IRS.gov in 10 minutes — needed for bank accounts and 1099s" },
        { done: false, task: "If using name other than LLC name, file DBA at your county clerk ($25 in most DFW counties)" },
        { done: false, task: "Open business checking account — never mix personal and business funds" },
      ],
    },
    {
      id: "forming",
      label: "Forming the LLC",
      title: "Legal & Banking Setup",
      items: [
        { done: false, task: "Draft Operating Agreement — not required by Texas but critical for single-member LLCs" },
        { done: false, task: "Open business bank account (Chase, Bank of America, or Relay for online-only)" },
        { done: false, task: "Get business debit card and credit card to build business credit" },
        { done: false, task: "Set up Wave (free) or QuickBooks Self-Employed ($15/mo) for bookkeeping from day one" },
        { done: false, task: "Get general liability insurance — required before taking any jobs ($1M min for ProLnk)" },
        { done: false, task: "Apply for ProLnk account and upload your license + insurance COI" },
      ],
    },
    {
      id: "operating",
      label: "Already Operating",
      title: "Optimize & Scale",
      items: [
        { done: false, task: "Switch to QuickBooks Online if revenue exceeds $5K/mo — better reporting and tax prep" },
        { done: false, task: "Set aside 25-30% of every payment for quarterly estimated taxes" },
        { done: false, task: "Track all mileage from day one — $0.67/mile deduction in 2026 (use MileIQ or TripLog)" },
        { done: false, task: "Get bonded if working for commercial clients or property managers" },
        { done: false, task: "Verify your TDLR or TSBPE license is current — renew online, no lapse" },
        { done: false, task: "List on ProLnk as your primary lead generation channel in DFW" },
      ],
    },
    {
      id: "scaling",
      label: "Scaling Up",
      title: "Growth Systems",
      items: [
        { done: false, task: "Hire W-2 employees vs 1099 subcontractors — get CPA advice before first hire" },
        { done: false, task: "Set up payroll with Gusto ($40/mo) or ADP for automatic tax withholding" },
        { done: false, task: "Upgrade to QuickBooks Plus or use a bookkeeper ($200-400/mo)" },
        { done: false, task: "Register for Texas sales tax permit if selling taxable goods (some contractors must)" },
        { done: false, task: "Get umbrella policy ($1M-5M) to protect LLC assets as revenue grows" },
        { done: false, task: "Increase ProLnk service area as you add crew — capture more DFW zip codes" },
      ],
    },
  ];

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const selected = stages.find(s => s.id === stage);

  const toggleCheck = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🏢</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Contractor Business Setup Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>LLC filing, banking, bookkeeping, and getting your first ProLnk leads</p>
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>📍 Where is your business right now?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)} style={{ backgroundColor: stage === s.id ? "#F5E642″ : "#162035", color: stage === s.id ? "#0A1628" : "#fff", border: "2px solid", borderColor: stage === s.id ? "#F5E642" : "#1e3a5f", borderRadius: "8px", padding: "0.75rem", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1.25rem" }}>✅ {selected.title} — Setup Checklist</h2>
            {selected.items.map((item, i) => {
              const key = `${selected.id}-${i}`;
              return (
                <div key={key} onClick={() => toggleCheck(key)} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start", cursor: "pointer" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "4px", border: "2px solid", borderColor: checked[key] ? "#F5E642″ : "#1e3a5f", backgroundColor: checked[key] ? "#F5E642" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    {checked[key] && <span style={{ color: "#0A1628″, fontWeight: 900, fontSize: "14px" }}>✓</span>}
                  </div>
                  <span style={{ color: checked[key] ? "#64748b" : "#cbd5e1″, fontSize: "0.9rem", lineHeight: 1.5, textDecoration: checked[key] ? "line-through" : "none" }}>{item.task}</span>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "2rem", backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.25rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Business set up? Start getting DFW leads on day one</p>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>🏢 Join ProLnk — Your first DFW lead could come within 24 hours of verification</p>
        </div>
      </div>
    </div>
  );
}
