import { useState } from 'react';

const topics = [
  { id: "hvac", label: "HVAC & Cooling", statement: "I know my HVAC system's tonnage, SEER rating, and how DFW heat affects maintenance schedules. I can spot a failing capacitor and know when a system just needs a tune-up vs full replacement." },
  { id: "foundation", label: "Foundation & Drainage", statement: "I understand DFW's expansive clay soil, why foundation movement happens, and how to manage drainage to protect my slab. I know the difference between normal seasonal movement and active failure." },
  { id: "roofing", label: "Roofing & Hail", statement: "I can read a roof inspection report, understand the difference between functional and cosmetic hail damage, and know what a proper DFW roof replacement proposal should include." },
  { id: "electrical", label: "Electrical & Panels", statement: "I know how to interpret my electrical panel, spot signs of overloaded circuits, and understand why aluminum wiring and Federal Pacific panels are red flags in older DFW homes." },
  { id: "plumbing", label: "Plumbing & Water", statement: "I understand DFW's hard water problem, how to protect my water heater and fixtures, and what signs indicate slab leak vs normal pipe noise." },
  { id: "permits", label: "Permits & Code", statement: "I know which DFW projects require permits, what city inspections check for, and how to verify a contractor's license before work begins." },
  { id: "concrete", label: "Concrete & Drilling", statement: "I know DFW homes have post-tension slabs, why drilling without a GPR scan can cause catastrophic damage, and how to select the right anchor for any concrete application." },
  { id: "materials", label: "Materials & Supply", statement: "I know where DFW contractors actually buy materials, when to use contractor supply houses vs big box stores, and how to choose the right treated lumber, plywood grade, and fasteners for DFW conditions." },
];

export default function DFWProLnkGoodbyePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showStatement, setShowStatement] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    setShowStatement(false);
  };

  const selectedTopics = topics.filter(t => selected.includes(t.id));

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏡</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2.2rem", marginBottom: "1rem" }}>You're Ready.</h1>
          <p style={{ color: "#9BA3B5″, fontSize: "1.15rem", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
            You've just worked through ProLnk’s complete DFW Homeowner Resource Library. You now know what most DFW homeowners learn only after a costly mistake — or never learn at all.
          </p>
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "#F5E642″, marginTop: 0 }}>What Did You Learn?</h2>
            <p style={{ color: "#9BA3B5″ }}>Select the topics you covered — we'll generate your personal homeowner readiness statement.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                style={{
                  background: selected.includes(t.id) ? "#F5E642″ : "#0A1628",
                  color: selected.includes(t.id) ? "#0A1628″ : "#9BA3B5",
                  border: `2px solid ${selected.includes(t.id) ? "#F5E642" : "#2A3A50"}`,
                  borderRadius: 8,
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  fontWeight: selected.includes(t.id) ? 700 : 400,
                  textAlign: "left",
                  transition: "all 0.15s"
                }}
              >
                {selected.includes(t.id) ? "✓ " : ""}{t.label}
              </button>
            ))}
          </div>
          {selected.length > 0 && !showStatement && (
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setShowStatement(true)}
                style={{ background: "#F5E642″, color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}
              >
                Generate My Homeowner Statement →
              </button>
            </div>
          )}
          {showStatement && selectedTopics.length > 0 && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1.5rem", border: "2px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>Your DFW Homeowner Readiness Statement</div>
              {selectedTopics.map(t => (
                <div key={t.id} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #1A2840″ }}>
                  <div style={{ color: "#F5E642″, fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{t.label}</div>
                  <div style={{ color: "#9BA3B5″, lineHeight: 1.6 }}>"{t.statement}"</div>
                </div>
              ))}
              <div style={{ color: "#E8EAF0″, fontWeight: 700, marginTop: "0.5rem" }}>You are now better prepared than 95% of DFW homeowners. 🏆</div>
            </div>
          )}
        </div>

        <div style={{ background: "linear-gradient(135deg, #1A2840 0%, #0D1F35 100%)", borderRadius: 12, padding: "2.5rem", marginBottom: "2rem", border: "2px solid #F5E642″, textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔗</div>
          <h2 style={{ color: "#F5E642″, marginTop: 0, marginBottom: "1rem" }}>Put Your Knowledge to Work</h2>
          <p style={{ color: "#9BA3B5″, lineHeight: 1.7, marginBottom: "1.5rem" }}>
            ProLnk connects DFW homeowners like you with pre-vetted, licensed service professionals who know local conditions, codes, and materials. Your knowledge helps you ask the right questions and spot the right contractor.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            {[
              { icon: "✅", label: "Vetted DFW pros" },
              { icon: "📋", label: "License verified" },
              { icon: "💬", label: "Direct quotes" },
            ].map(item => (
              <div key={item.label} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem" }}>
                <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
                <div style={{ color: "#9BA3B5″, fontSize: "0.9rem", marginTop: "0.5rem" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <button style={{ background: "#F5E642″, color: "#0A1628", padding: "1rem 3rem", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1.1rem" }}>
            Join ProLnk — Find Your DFW Pro
          </button>
        </div>

        <div style={{ textAlign: "center", padding: "2rem 0″ }}>
          <p style={{ color: "#4A5568″, fontSize: "0.9rem" }}>© 2026 ProLnk · DFW Homeowner Resource Library · All rights reserved</p>
          <p style={{ color: "#4A5568″, fontSize: "0.85rem" }}>Information provided for educational purposes. Always consult licensed professionals for work on your home.</p>
        </div>
      </div>
    </div>
  );
}
