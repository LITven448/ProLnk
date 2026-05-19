import { useState } from 'react';

const ptConcerns = [
  { label: 'Pocket is open and exposed — never been sealed', guide: 'Seal immediately. Water intrusion at an open pocket corrodes the cable anchor and wedge. Use non-shrink grout (BASF MasterEmaco or equal), then cap with polyurethane caulk. One failed cable can cause catastrophic slab failure.' },
  { label: 'Pocket sealant is cracked or falling out', guide: 'Remove all loose material with a chisel. Clean to bare concrete. Apply non-shrink grout flush with slab edge, then seal with elastomeric caulk. Inspect all other pockets at same time — if one failed, others are likely aging.' },
  { label: 'Rust staining visible around pocket location', guide: 'Rust = moisture has reached the cable anchor. Commission a PT specialist inspection before sealing. The cable tail may already be compromised. PT repair specialists can inject corrosion inhibitor before patching.' },
  { label: 'Builder never capped the pockets (new construction)', guide: 'Common DFW issue — stressing crew leaves, no one caps. Walk the slab perimeter with a flashlight. Every cable end (every 4–6 ft typically) must have a recessed pocket. Report to builder under warranty.' },
  { label: 'How often should I inspect PT pockets?', guide: 'DFW climate: inspect every 3 years. DFW moisture swings stress sealant faster than dry climates. Add PT pocket inspection to your annual foundation check. Any caulk older than 5 years should be evaluated.' },
];

export default function DFWFoundationPTVoid2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>⚙️ DFW Post-Tension Pocket Void Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          Most DFW homes built since the 1980s have <strong style={{ color: '#F5E642′ }}>post-tensioned (PT) slabs</strong>.
          The pocket voids at the slab edge are where cables are stressed and anchored — they must be sealed to prevent
          corrosion. This is one of the most overlooked maintenance items in DFW.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📐', label: 'Pocket Spacing (typical)', value: 'Every 4–6 feet at slab edge' },
            { icon: '⚠️', label: 'Open Pocket Risk', value: 'Cable corrosion → slab failure' },
            { icon: '🔧', label: 'Sealing Cost (DIY)', value: '$5–15 per pocket' },
            { icon: '📅', label: 'DFW Inspection Interval', value: 'Every 3 years minimum' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔩 What a PT Pocket Is</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>📌 Recessed void at slab edge where high-strength steel cable is anchored</div>
            <div>⚡ Cables are stressed to 33,000 lbs after concrete cures — this holds the slab</div>
            <div>💧 Open pocket = direct water path to anchor wedge and cable tail</div>
            <div>🧱 Repair: non-shrink grout + elastomeric sealant cap over pocket</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 Your PT Pocket Concern → Maintenance Guide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {ptConcerns.map((p, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{p.label}</div>
              {selected === i && (
                <div style={{ marginTop: 10, color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>💡 {p.guide}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Post-Tension Pocket Void Guide 2026 · Data: PTI DC80.3, ACI 318
        </div>
      </div>
    </div>
  );
}