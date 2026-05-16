import { useState } from 'react';

const worstPractices = [
  {
    id: "turnoff",
    rank: 1,
    label: "Turning the AC completely off in summer",
    why: "DFW humidity (60–80% RH) causes mold growth inside walls and ducts within 48 hours. Attic temps hit 160°F, stressing ductwork and equipment even when off.",
    fix: "Set to 85°F when away. Humidity control alone justifies keeping it running.",
    costIfIgnored: "Mold remediation: $3,000–$15,000",
  },
  {
    id: "blast",
    rank: 2,
    label: "Cranking to 60°F when you get home",
    why: "AC cools at a fixed rate regardless of setpoint. 60°F just short-cycles the system, freezing the evaporator coil and straining the compressor every time.",
    fix: "Use a smart thermostat. Set it to cool 30 min before arrival. 74°F is the sweet spot.",
    costIfIgnored: "Compressor replacement: $1,400–$2,800",
  },
  {
    id: "closevents",
    rank: 3,
    label: "Closing vents in unused rooms",
    why: "Closed vents increase static pressure in ducts. This strains the blower motor and can crack the heat exchanger — a $500–$1,500 repair.",
    fix: "Keep all vents at least 80% open. Use zoning systems or variable-speed equipment instead.",
    costIfIgnored: "Heat exchanger crack + CO risk: $800–$2,000",
  },
  {
    id: "drain",
    rank: 4,
    label: "Ignoring the condensate drain line",
    why: "DFW humidity means your AC pulls 2–5 gallons of water per day. A clogged drain floods your ceiling and walls — the #1 DFW HVAC water damage claim.",
    fix: "Flush monthly with vinegar May–October. Install a float switch that auto-shuts the system.",
    costIfIgnored: "Water damage repair: $2,000–$8,000",
  },
  {
    id: "filter",
    rank: 5,
    label: "Skipping filter changes past 3 months",
    why: "DFW allergies are severe April–June and October. A clogged MERV 13 filter restricts airflow 40%, causing evaporator coil freeze and compressor strain.",
    fix: "Monthly changes May–October. MERV 8–11 is the DFW sweet spot — not MERV 16 (too restrictive).",
    costIfIgnored: "Frozen coil service call: $150–$400",
  },
  {
    id: "diy",
    rank: 6,
    label: "DIY refrigerant recharge from big-box stores",
    why: "R-410A is illegal to purchase without EPA 608 certification. Overcharging refrigerant destroys the compressor. DFW summer heat accelerates this failure.",
    fix: "Call a licensed HVAC tech. Refrigerant issues mean there's a leak — fix the leak first.",
    costIfIgnored: "Compressor replacement: $1,400–$2,800",
  },
  {
    id: "enclose",
    rank: 7,
    label: "Enclosing the outdoor condenser unit",
    why: "Condensers need 18–24 inches of clearance on all sides. Fences or shrub walls trap heat and reduce efficiency 15–30% — especially brutal in DFW summers.",
    fix: "Shade is fine. Obstruction is not. Use lattice or open fencing, never solid enclosures.",
    costIfIgnored: "Premature compressor failure: $1,400–$2,800",
  },
  {
    id: "delay",
    rank: 8,
    label: "Delaying repairs past October",
    why: "DFW winters are mild but heating failures happen. Technicians are booked 2–3 weeks out in November. A June repair costs $150; emergency December heat call costs $350+.",
    fix: "Schedule fall tune-up in September. Address all small issues before cold snaps hit.",
    costIfIgnored: "Emergency after-hours call: $300–$600",
  },
  {
    id: "cheap",
    rank: 9,
    label: "Buying the cheapest unit without SEER2 consideration",
    why: "DFW runs AC 8–10 months/year. A 14 SEER2 vs 18 SEER2 unit can cost $400–$800 more per year in electricity. The premium unit pays back in 4–6 years.",
    fix: "Minimum 16 SEER2 for DFW. 18+ SEER2 with variable speed = best long-term value.",
    costIfIgnored: "Extra electricity 10 years: $4,000–$8,000",
  },
  {
    id: "onecheck",
    rank: 10,
    label: "Skipping the spring tune-up",
    why: "DFW techs are booked solid June–August. A March tune-up catches low refrigerant, dirty coils, and drain issues before they become emergency calls at $300+ after hours.",
    fix: "Book March–April every year. Ask for a 21-point inspection. Costs $89–$149; saves thousands.",
    costIfIgnored: "Emergency summer breakdown: $300–$800+",
  },
];

export default function DFWHVACWorstPractices() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = worstPractices.find(p => p.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>⚠️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HVAC Worst Practices</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>The 10 most damaging things DFW homeowners do to their HVAC</p>
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 28 }}>
          {worstPractices.map(p => (
            <button key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
              style={{ background: selected === p.id ? "#2d1b00" : "#1e293b", border: selected === p.id ? "1px solid #F5E642" : "1px solid #334155", borderRadius: 10, padding: "12px 16px", cursor: "pointer", textAlign: "left", color: "#fff", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ background: "#7f1d1d", color: "#fca5a5", borderRadius: 6, padding: "2px 8px", fontWeight: 700, fontSize: 13, minWidth: 24, textAlign: "center" }}>#{p.rank}</span>
              <span style={{ fontWeight: 600, flex: 1 }}>{p.label}</span>
              <span style={{ fontSize: 18 }}>{selected === p.id ? "🔼" : "🔽"}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#1e293b", border: "1px solid #F5E642", borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h2 style={{ color: "#F5E642", margin: "0 0 16px" }}>#{active.rank}: {active.label}</h2>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13, textTransform: "uppercase", marginBottom: 6 }}>❌ Why it hurts in DFW</div>
              <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>{active.why}</p>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ color: "#22c55e", fontWeight: 700, fontSize: 13, textTransform: "uppercase", marginBottom: 6 }}>✅ The fix</div>
              <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>{active.fix}</p>
            </div>
            <div style={{ background: "#450a0a", borderRadius: 8, padding: "10px 14px", display: "inline-block" }}>
              <span style={{ color: "#fca5a5", fontWeight: 700 }}>💸 Cost if ignored: </span>
              <span style={{ color: "#fff" }}>{active.costIfIgnored}</span>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", padding: 20, background: "#1e293b", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🔧 Avoid these mistakes with a vetted DFW pro</div>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>ProLnk connects you with licensed North Texas HVAC technicians.</p>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Join ProLnk Waitlist</button>
        </div>
      </div>
    </div>
  );
}
