import { useState } from 'react';

const scenarios = [
  { label: 'DFW summer — 105°F day, system struggling', concern: 'extreme-heat', rec: 'TXV', reason: 'TXV self-adjusts superheat as ambient climbs. Orifice tube floods coil at high load — compressor risk.' },
  { label: 'DFW spring — mild 75°F, light load', concern: 'light-load', rec: 'Either', reason: 'Both work fine at partial load. TXV provides slightly better efficiency.' },
  { label: 'System short-cycling in DFW July', concern: 'short-cycle', rec: 'TXV', reason: 'Short cycling often means orifice tube overfeed. TXV adapts metering to actual load.' },
  { label: 'Replacing refrigerant metering device — budget job', concern: 'budget', rec: 'Orifice Tube', reason: 'Orifice tube costs $5–20 vs $60–150 for TXV. Acceptable if system runs R-134a or R-410A at moderate loads.' },
];

export default function DFWHVACTXVvsOrificeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? scenarios[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>TXV vs Orifice Tube — DFW Climate</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          The refrigerant metering device controls how much refrigerant enters your evaporator coil. In DFW's extreme heat swings — from 45°F winters to 110°F summers — the right choice matters for efficiency and compressor life.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 10 }}>🔄 TXV (Thermostatic Expansion Valve)</div>
            <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
              <div>• Self-adjusting based on superheat sensor</div>
              <div>• Handles DFW load swings (45°F → 110°F)</div>
              <div>• Better compressor protection</div>
              <div>• Cost: $60–$150 + 1–2 hrs labor</div>
              <div>• Standard on newer SEER 16+ systems</div>
            </div>
          </div>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#94A3B8', fontWeight: 800, fontSize: 16, marginBottom: 10 }}>⚪ Orifice Tube (Fixed)</div>
            <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
              <div>• Fixed orifice — no adjustment</div>
              <div>• Works at designed operating point only</div>
              <div>• Risk of flood-back in DFW peak heat</div>
              <div>• Cost: $5–$20 part, 30 min swap</div>
              <div>• Common in older R-22 systems</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌡️ Why DFW Makes the Difference</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            DFW ambient temperatures regularly exceed the design point for fixed orifice tubes (typically set for 95°F conditions). On a 108°F July day, the higher condensing pressure means more refrigerant flows through the fixed orifice than intended — causing liquid flood-back to the compressor. TXV valves automatically restrict flow to maintain proper superheat regardless of ambient conditions.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔍 DFW Situation Analyzer</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1A2030', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Recommendation: <span style={{ color: '#F5E642' }}>{result.rec}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.reason}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 What TXV Replacement Involves (DFW)</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>1. Recover refrigerant (EPA 608 required)</div>
            <div>2. Cut and braze new TXV into liquid line</div>
            <div>3. Install external equalizer line to suction</div>
            <div>4. Evacuate to 500 microns</div>
            <div>5. Recharge to DFW summer subcooling target (10–12°F)</div>
            <div style={{ marginTop: 8, color: '#F5E642' }}>Total DFW cost: $350–$650 typical</div>
          </div>
        </div>
      </div>
    </div>
  );
}
