import { useState } from 'react';

const applianceGuide = [
  { id: 'oldFurnace', label: 'Older gas furnace (single flue pipe)', venting: 'Natural draft B-vent — single metal pipe to roof or sidewall. Common in DFW homes pre-2000. Must be vertical.' },
  { id: 'heFurnace', label: 'High-efficiency furnace (two pipes)', venting: 'Sealed combustion — PVC intake + exhaust pipes. Exits sidewall near foundation. Never combine with natural draft appliances.' },
  { id: 'waterHeater', label: 'Gas water heater', venting: 'B-vent standard. Must have dedicated flue or properly combined with compatible furnace only. Backdrafting risk if combined incorrectly.' },
  { id: 'tankless', label: 'Tankless water heater', venting: 'Direct vent or power vent depending on model. Many DFW installs use concentric pipe (intake + exhaust in one unit).' },
  { id: 'range', label: 'Gas range / cooktop', venting: 'No flue required — combustion products vented via range hood to exterior. Hood must exhaust outside, not recirculate.' },
];

export default function DFWFlueVentGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = applianceGuide.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌬️ DFW Gas Appliance Flue & Vent Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Improper venting is one of the most dangerous and most cited code violations in DFW homes. Different appliances require different vent types — and combining them incorrectly creates CO risk.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚠️ Never Combine These</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'High-efficiency furnace (PVC) + water heater (B-vent) — incompatible' ,
              'Two high-efficiency appliances into a single PVC flue — pressure conflict',
              'Any gas appliance into dryer duct or bath exhaust vent',
            ].map((item, i) => (
              <div key={i} style={{ background: '#3b0a0a', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14 }}>
                🚫 {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Appliance → Venting Requirement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {applianceGuide.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id === selected ? null : a.id)}
                style={{
                  background: selected === a.id ? '#F5E642′ : '#0A1628',
                  color: selected === a.id ? '#0A1628′ : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: 8,
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Venting Requirement:</div>
              <div style={{ color: '#e2e8f0′ }}>{match.venting}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>🏠 DFW-Specific Notes</h2>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Many DFW slab-on-grade homes have attic-mounted furnaces — B-vent routing through attic is common but requires proper clearances</li>
            <li>High-efficiency furnaces installed post-2010 in DFW mostly use sidewall PVC — check for white plastic pipes near foundation</li>
            <li>Condensation drain is required on all high-efficiency systems — a missing drain is a code violation</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Venting Issue in Your DFW Home?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches you with licensed HVAC pros who know DFW code. Free quote.</div>
        </div>
      </div>
    </div>
  );
}
