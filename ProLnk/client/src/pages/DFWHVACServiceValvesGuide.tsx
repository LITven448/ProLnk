import { useState } from 'react';

const situations = [
  { label: 'AC not cooling — refrigerant may be low', check: 'Check Schrader valves for refrigerant oil staining around valve core. Oil = leak confirmed.', cost: '$20–50 valve core replacement + refrigerant recharge $150–400' },
  { label: 'Tech just added refrigerant — need to verify hold', check: 'After recharge, soap-bubble test all service ports. DFW heat cycles stress valve cores.', cost: 'Free if done during service call. Ask tech to include.' },
  { label: 'Annual tune-up before DFW summer', check: 'Every DFW tune-up should include valve core torque check and leak dye inspection at ports.', cost: 'Included in good tune-up ($80–150 typical)' },
  { label: 'Just bought a DFW home — evaluating HVAC', check: 'Inspect both service valves on condenser. Look for corrosion, missing caps, oil residue. Red flags.', cost: 'Inspector or HVAC tech: $75–150 for full system check' },
];

export default function DFWHVACServiceValvesGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? situations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Service Valves Guide — DFW AC Systems</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          Schrader service valves are the access points for refrigerant measurement and recharge on every DFW AC system. Leaking valve cores silently bleed refrigerant — DFW techs should check them every visit.
        </p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔵 What Are Schrader Valves?</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            Located on the suction and liquid lines at your outdoor condenser, Schrader valves work like bicycle tire valves — a spring-loaded core seals refrigerant in. The cores degrade from DFW's temperature extremes (20°F winter nights to 115°F summer days), UV exposure, and repeated technician access.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🟡 Suction Valve</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Large line — reads low-side pressure. 60–85 PSI typical in DFW summer (R-410A)</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🔴 Liquid Valve</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Small line — reads high-side. 380–450 PSI in DFW 100°F+ conditions</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌡️ Why DFW Accelerates Valve Core Failure</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            <div>• Discharge pressures 380–480 PSI in DFW July stress valve seals</div>
            <div>• UV exposure on exposed condenser service ports degrades rubber seals</div>
            <div>• Repeated connection/disconnection by techs wears valve core threads</div>
            <div>• Missing valve caps (common on DFW systems) allow UV and debris damage</div>
            <div style={{ marginTop: 8, color: '#F5E642' }}>⚠️ Missing cap = $400+ refrigerant loss risk over 2 seasons</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔍 DFW Situation — Service Valve Check</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1A2030', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>What to Check</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>{result.check}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Refrigerant Loss — What It Means in DFW</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>• R-410A: ~$25–40/lb. A 3-ton system holds 6–10 lbs</div>
            <div>• Slow leak from valve core: lose 1–2 lbs/season undetected</div>
            <div>• Undercharged system in DFW July = coil freeze + compressor strain</div>
            <div>• EPA requires leak repair before recharge on systems over 50 lbs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
