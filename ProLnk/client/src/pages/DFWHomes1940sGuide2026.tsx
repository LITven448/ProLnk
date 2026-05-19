import { useState } from 'react';

export default function DFWHomes1940sGuide2026() {
  const [systems, setSystems] = useState<string[]>([]);

  const toggle = (s: string) => setSystems(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  );

  const priorities: Record<string, { label: string; icon: string; tip: string }> = {
    electrical: { label: "Knob & Tube Wiring", icon: "⚡", tip: "Rare but possible — hire a licensed electrician for full inspection before any renovation." },
    plumbing: { label: "Galvanized Pipes", icon: "🔧", tip: "Rust builds inside over 80+ years. Expect low pressure and discolored water. Plan full repipe." },
    insulation: { label: "No Original Insulation", icon: "🏠", tip: "Blown-in attic insulation is the fastest ROI upgrade. Expect 20–30% HVAC savings." },
    paint: { label: "Lead Paint Certain", icon: "🎨", tip: "Any paint pre-1978 may contain lead. Encapsulate or remove with EPA-certified contractor." },
    asbestos: { label: "Asbestos Risk", icon: "⚠️", tip: "Pipe wrap, floor tiles, ceiling texture from this era. Test before any demo or disturbing materials." },
    foundation: { label: "Pier & Beam Foundation", icon: "🏗️", tip: "Common in older DFW. Inspect annually — DFW clay soil causes significant movement." },
  };

  const hasAny = systems.length > 0;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏚️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW 1940s Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Pre-WWII homes in DFW carry specific risks. Know what to inspect — and in what order.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>Select the systems in your home:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.entries(priorities).map(([key, val]) => (
              <button key={key} onClick={() => toggle(key)}
                style={{ background: systems.includes(key) ? "#F5E642″ : "#0f172a", color: systems.includes(key) ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px", cursor: "pointer", textAlign: "left", fontWeight: 600, fontSize: 14 }}>
                {val.icon} {val.label}
              </button>
            ))}
          </div>
        </div>

        {hasAny && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 4 }}>Your 1940s Priority Guide:</h2>
            {systems.map(s => (
              <div key={s} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642″ }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{priorities[s].icon} {priorities[s].label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{priorities[s].tip}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: "#F5E642″, marginBottom: 12 }}>📋 1940s DFW Home Facts</h3>
          <ul style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Most 1940s DFW homes are in Oak Cliff, East Dallas, and older Fort Worth neighborhoods</li>
            <li>Original electrical panels were 60-amp — modern code requires 200-amp minimum</li>
            <li>Window units replaced original floor furnaces in most DFW homes by the 1970s</li>
            <li>Sewer lines are often cast iron — inspect with camera before purchase</li>
            <li>Charm factor is high; renovation cost can exceed new construction if not planned carefully</li>
          </ul>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628″, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk Charter Access</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>Connect with licensed DFW contractors who specialize in pre-1950 homes. Charter members get priority scheduling.</div>
        </div>
      </div>
    </div>
  );
}