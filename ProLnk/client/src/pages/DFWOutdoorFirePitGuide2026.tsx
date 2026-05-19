import { useState } from 'react';

const pitTypes = [
  { name: "Wood-Burning Fire Pit", emoji: "🪵", cost: "$150–$800″, install: "DIY or Pro", permit: "Check burn ban", detail: "Most traditional DFW choice. Best for open properties away from structures. ALWAYS check DFW burn ban status before lighting — violations carry heavy fines. Keep 10-foot clearance from structures." },
  { name: "Propane Fire Pit", emoji: "🟡", cost: "$200–$1,500″, install: "DIY", permit: "None typically", detail: "Most convenient for DFW — no burn ban restrictions, instant on/off, no smoke. Portable models available. Tank replacement every 10–20 hours depending on BTU output." },
  { name: "Natural Gas Fire Pit", emoji: "🔥", cost: "$500–$3,000+", install: "Requires licensed plumber", permit: "Building permit required", detail: "Permanent solution for DFW outdoor living. No tank refills, always ready. Requires a licensed DFW plumber to run gas line and a permit from your municipality." },
  { name: "Gel Fuel Fire Pit", emoji: "🏺", cost: "$100–$400″, install: "DIY", permit: "None", detail: "Smokeless and apartment/patio-friendly. Lower heat output than gas or wood. Good for ambiance on small DFW patios or HOA-restricted properties." },
];

const recs: Record<string, string> = {
  convenience: "Propane Fire Pit — instant start, no burn ban issues, portable",
  permanent: "Natural Gas Fire Pit — needs a DFW plumber, but zero maintenance ongoing",
  budget: "Wood-Burning Fire Pit — lowest cost, check DFW burn bans before every use",
  patio: "Gel Fuel or Propane — smokeless, no permit, HOA-friendly",
};

export default function DFWOutdoorFirePitGuide2026() {
  const [pref, setPref] = useState("convenience");
  const [selected, setSelected] = useState<string | null>(null);
  const [banChecked, setBanChecked] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔥</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>DFW Outdoor Fire Pit Guide 2026</h1>
          <p style={{ color: "#94A3B8″, margin: 0 }}>Fire pits for DFW outdoor living — types, safety rules, burn ban alerts, and installation requirements</p>
        </div>

        <div style={{ background: "#2D1200″, borderRadius: 10, padding: "1rem", marginBottom: "1.5rem", border: "1px solid #F97316" }}>
          <strong style={{ color: "#FB923C" }}>🚨 DFW Burn Ban Alert:</strong>
          <span style={{ color: "#FED7AA", marginLeft: 8 }}>DFW counties issue burn bans frequently during dry/windy conditions. ALWAYS check your county burn ban status at texasforestservice.tamu.edu before lighting any wood-burning fire pit.</span>
          <div style={{ marginTop: "0.75rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "#FED7AA" }}>
              <input type="checkbox" checked={banChecked} onChange={e => setBanChecked(e.target.checked)} style={{ width: 18, height: 18 }} />
              I have checked the DFW burn ban status for today
            </label>
          </div>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your DFW Fire Pit</h2>
          <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>My Priority</label>
          <select value={pref} onChange={e => setPref(e.target.value)} style={{ width: "100%", background: "#1E3A5F", color: "#E8EDF5″, border: "1px solid #F5E642", borderRadius: 8, padding: "0.5rem", marginBottom: "1rem" }}>
            <option value="convenience">Convenience — easy start, no ban worries</option>
            <option value="permanent">Permanent — built-in, always ready</option>
            <option value="budget">Budget — lowest upfront cost</option>
            <option value="patio">Small Patio / HOA Restrictions</option>
          </select>
          <div style={{ background: "#F5E642″, borderRadius: 8, padding: "1rem", color: "#0A1628", fontWeight: 600 }}>
            ✅ Best DFW fire pit for you: {recs[pref]}
          </div>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🛡️ DFW Fire Pit Safety Rules</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {[["📏", "10-ft Clearance", "From all structures, fences, overhangs"], ["💨", "Wind Awareness", "No fires when DFW winds exceed 15 mph"], ["💧", "Water Ready", "Garden hose connected before lighting"], ["👀", "Never Unattended", "Stay within sight until fully extinguished"], ["🚫", "Check Bans", "Wood fires illegal during active burn bans"], ["🏠", "HOA Rules", "Many DFW HOAs restrict wood-burning pits"]].map(([e, t, d]) => (
              <div key={t as string} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{e}</span>
                <div style={{ color: "#F5E642″, fontWeight: 600, fontSize: "0.9rem", margin: "0.25rem 0" }}>{t}</div>
                <div style={{ color: "#94A3B8″, fontSize: "0.8rem" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {pitTypes.map(p => (
            <div key={p.name} onClick={() => setSelected(selected === p.name ? null : p.name)} style={{ background: selected === p.name ? "#1E3A5F" : "#0F2040″, border: `1px solid ${selected === p.name ? "#F5E642" : "#1E3A5F"}`, borderRadius: 10, padding: "1.25rem", cursor: "pointer" }}>
              <div style={{ fontSize: "2rem" }}>{p.emoji}</div>
              <h3 style={{ color: "#F5E642″, margin: "0.5rem 0 0.25rem" }}>{p.name}</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>💰 {p.cost}</span>
                <span style={{ background: "#0A1628″, color: "#94A3B8", fontSize: "0.75rem", padding: "2px 8px", borderRadius: 99 }}>🔧 {p.install}</span>
              </div>
              <div style={{ color: "#F97316″, fontSize: "0.8rem", marginBottom: "0.5rem" }}>📋 {p.permit}</div>
              {selected === p.name && <p style={{ color: "#CBD5E1″, fontSize: "0.9rem", margin: 0 }}>{p.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1E3A5F", textAlign: "center" }}>
          <p style={{ color: "#94A3B8″, margin: "0 0 1rem" }}>Need a DFW plumber to run a gas line for your permanent fire pit?</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 700, padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>Find a DFW Plumber or Landscaper on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}