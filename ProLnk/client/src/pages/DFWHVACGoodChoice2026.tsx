import { useState } from 'react';

const sizes = [
  { label: 'Under 1,500 sqft', icon: '🏠', rec: 'Mini-Split or Small Central', detail: 'A ductless mini-split or small single-zone central system (1.5–2 ton) handles this efficiently. Mini-splits are ideal for older DFW homes without existing ductwork.' },
  { label: '1,500 – 2,500 sqft', icon: '🏡', rec: 'Standard Split System', detail: 'A 3–4 ton standard split system with a single-stage or two-stage compressor is the most cost-effective choice for most DFW homes in this range.' },
  { label: '2,500 – 4,000 sqft', icon: '🏘️', rec: 'Two-Zone or Larger System', detail: 'A two-zone system or a 5-ton single unit prevents hot/cold spots across floors and wings — critical for DFW\'s 100°+ summer heat.' },
  { label: '4,000+ sqft', icon: '🏰', rec: 'VRF or Multiple Systems', detail: 'Variable Refrigerant Flow (VRF) or multiple dedicated systems by zone give independent control and efficiency at scale. Best for large DFW estates and custom homes.' },
];

export default function DFWHVACGoodChoice2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Right HVAC System for Your DFW Home</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>DFW summers hit 105°F. The right system size and type prevents overworking, high bills, and early failure. Select your home size below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {sizes.map((s, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#111e33', border: `2px solid ${selected === i ? '#F5E642' : '#1e2d45'}`, borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{s.label}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginTop: 2 }}>{s.rec}</div>
                </div>
                <span style={{ color: '#F5E642', fontSize: 20 }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>{s.detail}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e33', border: '1px solid #1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚡ WHY THIS MATTERS IN DFW</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            DFW homes face extreme heat load, humidity swings, and clay soil expansion. An undersized system runs constantly and fails early. An oversized system short-cycles and leaves humidity behind. TDLR-licensed Charter Pros through ProLnk perform Manual J load calculations to get sizing exactly right.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 ProLnk matches you with TDLR-licensed, EPA 608-certified DFW HVAC techs</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>prolnk.io — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}