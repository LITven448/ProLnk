import { useState } from 'react';

const applications = [
  { id: 'tub', label: '🚿 Tub / Shower', winner: 'Silicone', reason: 'Constant water exposure — only silicone can handle it long-term', latex: false, silicone: true, hybrid: false, notes: 'Never use latex in a wet shower — it will mold and fail within months in DFW humidity' },
  { id: 'sink', label: '🚰 Kitchen Sink (Undermount)', winner: 'Silicone', reason: 'Constant moisture and temperature swings', latex: false, silicone: true, hybrid: false, notes: 'Clear silicone for undermount sinks; white for farmhouse style — do not use hybrid here' },
  { id: 'trim', label: '🏠 Interior Trim / Baseboards', winner: 'Latex', reason: 'Must be paintable — latex accepts paint perfectly', latex: true, silicone: false, hybrid: false, notes: 'Silicone cannot be painted. Always use latex or siliconized latex for any painted surface' },
  { id: 'exterior', label: '🌞 Exterior Gaps (DFW)', winner: 'Hybrid', reason: 'DFW UV + heat cycles + occasional moisture — hybrid handles all', latex: false, silicone: false, hybrid: true, notes: 'Hybrid (siliconized latex) is paintable AND waterproof — best choice for most DFW exterior work' },
  { id: 'countertop', label: '🍽️ Countertop Backsplash', winner: 'Hybrid', reason: 'Paintable + moisture resistant for kitchen splash zones', latex: false, silicone: false, hybrid: true, notes: 'Avoid pure silicone if you plan to paint around it — use siliconized latex for flexibility' },
  { id: 'crown', label: '👑 Crown Molding / Ceilings', winner: 'Latex', reason: 'Paintable, flexible, no moisture risk in this location', latex: true, silicone: false, hybrid: false, notes: 'Do not use silicone near painted surfaces — it prevents re-painting permanently' },
];

export default function DFWSiliconeVsLatexCaulk2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const app = applications.find(a => a.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧴</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Silicone vs Latex Caulk Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Choose the right caulk for every DFW application — wrong choice = early failure.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[
            { type: '🔵 Silicone', pros: 'Wet areas, exterior, UV resistant', cons: 'Cannot be painted, harder to apply', color: '#1e3a5f' },
            { type: '🟡 Latex', pros: 'Paintable, easy cleanup with water', cons: 'Not waterproof, degrades in wet zones', color: '#3f3100′ },
            { type: '🟢 Hybrid', pros: 'Paintable + waterproof, DFW versatile', cons: 'Costs more than basic latex', color: '#1a3a1a' },
          ].map(c => (
            <div key={c.type} style={{ background: c.color, borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{c.type}</div>
              <div style={{ color: '#86efac', fontSize: 12, marginBottom: 4 }}>✅ {c.pros}</div>
              <div style={{ color: '#fca5a5', fontSize: 12 }}>❌ {c.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {applications.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ background: selected === a.id ? '#F5E642′ : '#1e293b', color: selected === a.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === a.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {a.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === a.id ? '#0A1628′ : '#94a3b8' }}>Best: {a.winner}</div>
            </button>
          ))}
        </div>

        {app && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 6px' }}>{app.label}</h2>
            <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Use: {app.winner}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{app.reason}</div>
            </div>
            <div style={{ background: '#1a1a2e', borderRadius: 8, padding: 14, border: '1px solid #3b82f6′ }}>
              <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💡 DFW Note</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{app.notes}</div>
            </div>
          </div>
        )}

        {!app && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8′ }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select your application above to get the right caulk recommendation.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}