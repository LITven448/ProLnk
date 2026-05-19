import { useState } from 'react';

const leakLocations = [
  { id: 'indoor', label: '💧 Dripping from indoor unit / air handler', causes: ['Condensate drain line clogged — most common in DFW humidity (June-Sept)', 'Drain pan cracked or full', 'Evaporator coil frozen then thawing'], diy: 'Pour 1 cup white vinegar into condensate drain cleanout port (PVC pipe near unit). If drain not clearing, use wet/dry vac at outdoor drain termination point.' },
  { id: 'outdoor', label: '🌊 Water pooling around outdoor unit', causes: ['Normal condensation draining from evaporator (small amount is OK)', 'Secondary drain overflowing — indoor drain is clogged', 'Drain line disconnected or kinked'], diy: 'Check the drain line path from air handler to outside. Look for kinks or disconnects. If primary drain backed up, secondary is doing its job — fix the primary.' },
  { id: 'ceiling', label: '🏠 Water stain on ceiling', causes: ['Secondary drain pan overflow — often ignored for days or weeks before noticed', 'Primary condensate drain fully clogged', 'Serious flood risk if not fixed immediately'], diy: 'Turn off AC immediately. Find the secondary drain pan (under air handler in attic or closet). If full, the primary drain is completely blocked. Call a pro — ceiling damage can be $1,000+.' },
];

export default function DFWHVACLeakingWaterGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = leakLocations.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>💧 DFW HVAC Leaking Water Guide — 2026</h1>
          <p style={{ margin: '8px 0 0', fontWeight: 600 }}>DFW's summer humidity makes condensate drains the #1 HVAC service call. Here’s what to do.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🛠️ DIY Drain Flush (Try This First)</h2>
          {['Locate condensate drain cleanout — white PVC pipe near air handler', 'Pour 1 cup white vinegar or distilled bleach solution monthly', 'Use wet/dry vac at outdoor drain exit to pull clog', 'Run AC — check drain is flowing outside within 30 min', 'Repeat monthly June-Sept during DFW humidity season'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 800 }}>{i + 1}.</span>
              <span style={{ color: '#cdd9e5′ }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>📍 Where is the water coming from?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {leakLocations.map(l => (
              <button key={l.id} onClick={() => setSelected(l.id === selected ? null : l.id)}
                style={{ background: selected === l.id ? '#F5E642′ : '#1e3a5f', color: selected === l.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                {l.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ marginTop: 20, background: '#0d1f3c', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 Likely Causes</div>
                {active.causes.map((cause, i) => (
                  <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cdd9e5′ }}>• {cause}</div>
                ))}
              </div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 16, marginTop: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🛠️ What To Do</div>
                <div style={{ color: '#fff', lineHeight: 1.6 }}>{active.diy}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginTop: 0 }}>🚨 Call a Pro Immediately If</h2>
          {['Water stain appearing on ceiling', 'Secondary drain pan is full of water', 'DIY flush didn’t clear the clog', 'Mold smell near air handler'].map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#ff6b6b', fontWeight: 600 }}>🚨 {item}</div>
          ))}
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>ProLnk matches you with DFW HVAC pros who know condensate systems.</div>
          </div>
        </div>
      </div>
    </div>
  );
}