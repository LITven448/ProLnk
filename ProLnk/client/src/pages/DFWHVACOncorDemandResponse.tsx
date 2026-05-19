import { useState } from 'react';

const oncorPrograms = [
  { name: "Smart Savers Thermostat", incentive: "$85/yr + bill credits", description: "Connect smart thermostat, auto-adjusts 2-4°F during events" },
  { name: "PowerShare", incentive: "$100-200/yr", description: "Curtail AC load during 3-7pm alerts, billed credits monthly" },
  { name: "Commercial Demand Response", incentive: "Custom rates", description: "For businesses, 15+ kW reduction during peak" },
];

const thermostats = ["Ecobee", "Nest", "Honeywell Home", "Emerson Sensi", "Other"];

const earnings: Record<string, { annual: string; events: string; reduction: string }> = {
  "Ecobee": { annual: "$120-180″, events: "12-18 per summer", reduction: "3°F setback" },
  "Nest": { annual: "$110-165″, events: "12-18 per summer", reduction: "3°F setback" },
  "Honeywell Home": { annual: "$95-145″, events: "10-15 per summer", reduction: "2-4°F setback" },
  "Emerson Sensi": { annual: "$85-130″, events: "10-15 per summer", reduction: "2-3°F setback" },
  "Other": { annual: "$60-100″, events: "8-12 per summer", reduction: "Manual opt-in required" },
};

export default function DFWHVACOncorDemandResponse() {
  const [thermostat, setThermostat] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const [result, setResult] = useState<null | { annual: string; events: string; reduction: string; program: string }>(null);

  function calculate() {
    if (!thermostat || !homeSize) return;
    const base = earnings[thermostat];
    const size = parseInt(homeSize);
    const multiplier = size > 2500 ? 1.3 : size > 1500 ? 1.1 : 1.0;
    const parts = base.annual.replace("$", "").split("-");
    const low = Math.round(parseInt(parts[0]) * multiplier);
    const high = Math.round(parseInt(parts[1]) * multiplier);
    setResult({ ...base, annual: `$${low}-${high}`, program: size > 2500 ? "PowerShare" : "Smart Savers Thermostat" });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#F5E642″, marginBottom: 8 }}>⚡ ONCOR DEMAND RESPONSE — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Get Paid to Cool Less</h1>
        <p style={{ color: "#94A3B8″, fontSize: 16, marginBottom: 40 }}>
          Oncor pays DFW homeowners to reduce HVAC load during peak hours (3–7pm summers). Here is how to enroll and what you will earn.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>📋 Available Programs</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {oncorPrograms.map((p) => (
            <div key={p.name} style={{ background: "#0F1E35″, borderRadius: 10, padding: "16px 20px", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
              <div style={{ color: "#F5E642″, fontSize: 14, margin: "4px 0" }}>{p.incentive}</div>
              <div style={{ color: "#94A3B8″, fontSize: 14 }}>{p.description}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>🌡️ Calculate Your Earnings</h2>
        <div style={{ background: "#0F1E35″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#94A3B8″, fontSize: 14, marginBottom: 6 }}>Your Smart Thermostat</label>
            <select value={thermostat} onChange={(e) => setThermostat(e.target.value)}
              style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15 }}>
              <option value="">Select thermostat</option>
              {thermostats.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "#94A3B8″, fontSize: 14, marginBottom: 6 }}>Home Size (sq ft)</label>
            <input type="number" value={homeSize} onChange={(e) => setHomeSize(e.target.value)} placeholder="e.g. 2000″
              style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15, boxSizing: "border-box" }} />
          </div>
          <button onClick={calculate}
            style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Calculate My Earnings
          </button>
        </div>
        {result && (
          <div style={{ background: "#0F2A1A", border: "1px solid #22C55E", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 14, color: "#22C55E", marginBottom: 8 }}>✅ ESTIMATED DEMAND RESPONSE EARNINGS</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>{result.annual} / year</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12 }}>
                <div style={{ color: "#94A3B8″, fontSize: 12 }}>BEST PROGRAM</div>
                <div style={{ fontWeight: 700 }}>{result.program}</div>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12 }}>
                <div style={{ color: "#94A3B8″, fontSize: 12 }}>EVENTS PER SUMMER</div>
                <div style={{ fontWeight: 700 }}>{result.events}</div>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12, gridColumn: "1 / -1" }}>
                <div style={{ color: "#94A3B8″, fontSize: 12 }}>THERMOSTAT SETBACK</div>
                <div style={{ fontWeight: 700 }}>{result.reduction}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
