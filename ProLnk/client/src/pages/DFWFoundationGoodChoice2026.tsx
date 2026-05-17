import { useState } from 'react';

const symptoms = [
  { label: 'Doors sticking, cracks at corners', icon: '🚪', rec: 'Perimeter Settlement → Exterior Piers', detail: 'Cracks at door/window corners and sticking doors indicate perimeter beam settlement. Exterior steel pressed piers or helical piers stabilize and lift the perimeter. Most common DFW repair — clay soil shrinks in drought, drops the edge.' },
  { label: 'Floor sag or bounce in center', icon: '🏠', rec: 'Interior Beam Settlement → Tunneling', detail: 'A sagging center floor means interior beams have dropped. This requires tunneling under the slab to install interior piers — no yard excavation. More invasive but necessary for mid-slab support loss common in DFW.' },
  { label: 'Cracks appearing after heavy rain', icon: '🌧️', rec: 'Drainage Problem → Fix Drainage First', detail: 'New cracks appearing after rain signal water intrusion causing soil movement. Install French drains, regrade soil, fix downspout extensions before any piers. Installing piers without fixing drainage wastes money — movement continues.' },
  { label: 'Cracks and doors binding after watering', icon: '💧', rec: 'Heave from Over-Watering → Stop & Monitor', detail: 'If problems appeared after heavy irrigation or flood, the soil may have expanded (heaved). The correct fix: stop over-watering, install soaker hose program for even moisture, and monitor 90 days. Installing piers during heave locks in the problem.' },
];

export default function DFWFoundationGoodChoice2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Right Foundation Repair for Your DFW Home</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>DFW clay soil expands and contracts up to 4 inches seasonally. The wrong repair makes things worse. Match your symptom to the correct approach below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {symptoms.map((s, i) => (
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
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW FOUNDATION FACTS</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Expansive clay soil (Blackland Prairie) underlies most of DFW. Foundation movement is not if but when. A licensed structural engineer assessment is the correct first step — not a free estimate from a pier installer. ProLnk Charter Foundation Pros are engineer-supervised and warranty their work.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 ProLnk matches you with engineer-supervised DFW foundation pros</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>prolnk.io — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}