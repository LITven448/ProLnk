import { useState } from 'react';

const practices = [
  { freq: 'Monthly (May–Oct)', id: 'filter', label: 'Change air filter', detail: 'DFW summer dust + pollen clogs filters fast. Use MERV 8–11. Set a phone reminder.' },
  { freq: 'Monthly (May–Oct)', id: 'drain', label: 'Check condensate drain', detail: 'High humidity = fast algae growth. Pour a cup of water in the pan to confirm flow.' },
  { freq: 'Quarterly', id: 'qdrain', label: 'Flush drain line', detail: 'Pour 1 cup distilled vinegar down the PVC drain line to kill algae and prevent clogs.' },
  { freq: 'Quarterly', id: 'coil', label: 'Inspect evaporator coil', detail: 'Dusty coils reduce efficiency 20–30%. Schedule a soft brush cleaning if coated.' },
  { freq: 'Bi-Annual', id: 'tune', label: 'Schedule pro tune-up', detail: 'Spring (March–April) before cooling season, Fall (Sept–Oct) before heating season.' },
  { freq: 'Bi-Annual', id: 'refrig', label: 'Check refrigerant charge', detail: 'Low refrigerant causes icing and compressor strain. Only licensed tech can recharge.' },
  { freq: 'Bi-Annual', id: 'belt', label: 'Inspect belts and motors', detail: 'Worn belts snap in peak summer heat. Lubricate motor bearings every 6 months.' },
  { freq: 'Annual', id: 'duct', label: 'Duct inspection', detail: 'DFW homes lose 20–30% conditioned air through leaky ducts. Test and seal annually.' },
  { freq: 'Annual', id: 'therm', label: 'Calibrate thermostat', detail: 'Off-by-2°F thermostat wastes 5–10% energy. Use a thermometer to verify readings.' },
  { freq: 'Annual', id: 'elec', label: 'Electrical connection check', detail: 'Heat cycles loosen connections. Loose wiring = fire risk and equipment failure.' },
  { freq: 'Setpoint', id: 'set78', label: 'Set to 78°F when home', detail: 'Energy Star recommends 78°F for DFW summers. Each degree lower adds 6–8% to bill.' },
  { freq: 'Setpoint', id: 'set85', label: 'Set to 85°F when away', detail: 'Do NOT turn off. Maintains humidity control and prevents mold in DFW humidity.' },
  { freq: 'Setpoint', id: 'night', label: 'Night setback to 75°F', detail: 'DFW nights cool slightly. 75°F overnight saves 8–12% vs holding 78°F all night.' },
  { freq: 'Always', id: 'vents', label: 'Keep all vents open', detail: 'Closing vents increases static pressure, strains blower, and can crack heat exchanger.' },
  { freq: 'Always', id: 'shade', label: 'Shade the condenser', detail: 'A shaded condenser runs 10% more efficiently. Use shrubs or awnings — never enclose.' },
];

const freqOrder = ["Monthly (May–Oct)", "Quarterly", "Bi-Annual", "Annual", "Setpoint", "Always"];
const homeTypes = ["Older home (pre-2000)", "New construction (post-2010)", "Pool home", "Multi-story", "Rental property"];

export default function DFWHVACBestPractices() {
  const [homeType, setHomeType] = useState("");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));

  const filtered = homeType === "Older home (pre-2000)"
    ? practices
    : homeType === "Rental property"
    ? practices.filter(p => ["filter", "drain", "qdrain", "tune", "duct", "vents"].includes(p.id))
    : homeType === "Pool home"
    ? practices.filter(p => !["shade"].includes(p.id))
    : practices;

  const done = filtered.filter(p => checked[p.id]).length;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HVAC Best Practices</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>15 proven practices for North Texas homeowners</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: "#F5E642", fontWeight: 700, display: "block", marginBottom: 10 }}>Your home type → personalized checklist</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: "#0A1628", color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 15 }}>
            <option value="">All homes (show all 15)</option>
            {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>

        {done > 0 && (
          <div style={{ background: "#14532d", border: "1px solid #22c55e", borderRadius: 10, padding: "10px 18px", marginBottom: 20, color: "#86efac" }}>
            ✅ {done} of {filtered.length} practices confirmed
          </div>
        )}

        {freqOrder.map(freq => {
          const group = filtered.filter(p => p.freq === freq);
          if (!group.length) return null;
          return (
            <div key={freq} style={{ marginBottom: 24 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>⏰ {freq}</div>
              {group.map(p => (
                <div key={p.id} onClick={() => toggle(p.id)} style={{ background: checked[p.id] ? "#1a2e1a" : "#1e293b", border: checked[p.id] ? "1px solid #22c55e" : "1px solid #334155", borderRadius: 10, padding: 14, marginBottom: 8, cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, marginTop: 2 }}>{checked[p.id] ? "✅" : "⬜"}</span>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.label}</div>
                    <div style={{ color: "#94a3b8", fontSize: 14 }}>{p.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 32, padding: 20, background: "#1e293b", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🔧 Need a DFW HVAC pro?</div>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: "0 0 16px" }}>ProLnk connects you with vetted North Texas HVAC technicians.</p>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Join ProLnk Waitlist</button>
        </div>
      </div>
    </div>
  );
}
