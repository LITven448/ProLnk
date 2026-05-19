import { useState } from 'react';

const batteryTypes = [
  { name: "Tesla Powerwall 3", kwh: 13.5, maxKw: 11.5, cost: "$11,500" },
  { name: "Enphase IQ 10T", kwh: 10.1, maxKw: 7.68, cost: "$9,200" },
  { name: "Franklin WH 15", kwh: 15.0, maxKw: 10.0, cost: "$12,800" },
  { name: "Generac PWRcell XC", kwh: 18.0, maxKw: 11.0, cost: "$14,500" },
];

const acLoads: Record<string, number> = {
  "1,000-1,500": 1.5,
  "1,500-2,000": 2.0,
  "2,000-2,500": 2.5,
  "2,500-3,000": 3.0,
  "3,000+": 3.5,
};

export default function DFWHVACBatteryAndHVAC() {
  const [battery, setBattery] = useState("");
  const [homeRange, setHomeRange] = useState("");
  const [mode, setMode] = useState("");
  const [result, setResult] = useState<null | { runtime: string; strategy: string; note: string }>(null);

  function calculate() {
    if (!battery || !homeRange || !mode) return;
    const bat = batteryTypes.find((b) => b.name === battery);
    const load = acLoads[homeRange];
    if (!bat || !load) return;

    const fullRuntime = Math.round((bat.kwh / load) * 10) / 10;
    const conserveRuntime = Math.round((bat.kwh / (load * 0.65)) * 10) / 10;

    let strategy = "";
    let note = "";

    if (mode === "outage") {
      strategy = `Run HVAC normally: ${fullRuntime} hrs | Conserve mode (78°F+): ${conserveRuntime} hrs`;
      note = "Pre-cool to 70°F before outage if grid instability detected. Each 2°F of thermal mass buys 45-60 min extra runtime.";
    } else if (mode === "peak-savings") {
      strategy = `Discharge during 3-7pm peak: saves $1.80-3.20/day on TOU rates`;
      note = `Your ${bat.kwh} kWh battery can power ${Math.round(bat.kwh / load)} hrs of AC during peak. Recharge overnight at off-peak rates.`;
    } else {
      strategy = `ERCOT Emergency: Raise to 82°F, run fans only. Battery saves ${Math.round(bat.kwh / 0.4)} hrs of ceiling fan runtime`;
      note = "During EEA3 alerts, preserve battery for nighttime cooling — that is when outage risk is highest.";
    }

    setResult({ runtime: `${fullRuntime} hrs at full load`, strategy, note });
  }

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#F5E642", marginBottom: 8 }}>🔋 BATTERY + HVAC — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>How Long Will Your Battery Run Your AC?</h1>
        <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 40 }}>
          DFW AC units draw 1.5–3.5 kWh per hour depending on home size. Know your numbers before the next ERCOT event.
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>🔋 Battery Options</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
          {batteryTypes.map((b) => (
            <div key={b.name} style={{ background: "#0F1E35", borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{b.name}</div>
              <div style={{ color: "#F5E642", fontSize: 13 }}>{b.kwh} kWh · {b.maxKw} kW max</div>
              <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>{b.cost} installed avg</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>⚡ Calculate Runtime</h2>
        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#94A3B8", fontSize: 14, marginBottom: 6 }}>Battery System</label>
            <select value={battery} onChange={(e) => setBattery(e.target.value)}
              style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15 }}>
              <option value="">Select battery</option>
              {batteryTypes.map((b) => <option key={b.name} value={b.name}>{b.name} ({b.kwh} kWh)</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#94A3B8", fontSize: 14, marginBottom: 6 }}>Home Size (sq ft)</label>
            <select value={homeRange} onChange={(e) => setHomeRange(e.target.value)}
              style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15 }}>
              <option value="">Select range</option>
              {Object.keys(acLoads).map((r) => <option key={r} value={r}>{r} sq ft</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "#94A3B8", fontSize: 14, marginBottom: 8 }}>Use Case</label>
            {[{ val: "outage", label: "Power outage survival" }, { val: "peak-savings", label: "Avoid peak TOU charges" }, { val: "ercot-alert", label: "ERCOT emergency alert" }].map((m) => (
              <label key={m.val} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
                <input type="radio" name="mode" value={m.val} checked={mode === m.val} onChange={(e) => setMode(e.target.value)} />
                <span style={{ fontSize: 15 }}>{m.label}</span>
              </label>
            ))}
          </div>
          <button onClick={calculate}
            style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Calculate Runtime
          </button>
        </div>
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#0F2A1A", border: "1px solid #22C55E", borderRadius: 10, padding: 18 }}>
              <div style={{ color: "#22C55E", fontSize: 12, marginBottom: 4 }}>FULL LOAD RUNTIME</div>
              <div style={{ fontWeight: 800, fontSize: 24, color: "#F5E642" }}>{result.runtime}</div>
            </div>
            <div style={{ background: "#0F1E35", borderRadius: 10, padding: 18, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 4 }}>STRATEGY</div>
              <div style={{ fontSize: 15 }}>{result.strategy}</div>
            </div>
            <div style={{ background: "#0F1E35", borderRadius: 10, padding: 18, borderLeft: "4px solid #94A3B8" }}>
              <div style={{ color: "#94A3B8", fontSize: 12, marginBottom: 4 }}>PRO NOTE</div>
              <div style={{ fontSize: 14, color: "#CBD5E1" }}>{result.note}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
