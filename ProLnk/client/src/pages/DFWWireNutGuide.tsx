import { useState } from 'react';

const connectorTypes = [
  {
    name: 'Wire Nuts (Twist-On)',
    icon: '🌀',
    brands: 'Ideal, 3M, Buchanan',
    pros: 'Widely available, inexpensive, inspectors familiar with them',
    cons: 'Can loosen over time in high-vibration areas (DFW A/C blower circuits)',
    dfwNote: 'Standard for DFW interior wiring. Use red for #12, yellow/tan for #14 combinations.',
    reuse: 'Single use — replace when removed',
    cost: '$0.05–$0.15 each',
  },
  {
    name: 'Push-In Connectors (Wago 221)',
    icon: '🔌',
    brands: 'Wago Lever-Nuts (preferred), Ideal In-Sure',
    pros: 'No twisting, reusable, lever-released, excellent vibration resistance',
    cons: 'More expensive, some older inspectors unfamiliar — show them NEC 110.14 compliance',
    dfwNote: 'Excellent for DFW A/C and fan connections where vibration loosens wire nuts. ProLnk electricians increasingly prefer Wago.',
    reuse: 'Reusable — lever release for rewire',
    cost: '$0.50–$1.20 each',
  },
  {
    name: 'Push-In (Spring Cage / Backstab)',
    icon: '⚡',
    brands: 'Generic backstab outlets (avoid), In-Sure 2-port',
    pros: 'Fast installation',
    cons: 'HIGH FAILURE RATE — not recommended for DFW high-heat environments',
    dfwNote: 'Backstab connections on outlets are a common DFW electrical failure point. DFW attic heat causes spring fatigue. Use screw terminals instead.',
    reuse: 'One use — not reliable even once',
    cost: '$0.10 each but not recommended',
  },
  {
    name: 'Butt Splice Connectors',
    icon: '🔗',
    brands: 'Ideal, GB, 3M heat-shrink',
    pros: 'Permanent splice for aluminum wire, automotive',
    cons: 'Not for standard household wiring splices',
    dfwNote: 'Used for aluminum wiring repairs in older DFW homes (1965–1975 construction). Requires CO/ALR rated connectors for aluminum-to-copper.',
    reuse: 'One use — crimped permanently',
    cost: '$0.20–$0.80 each',
  },
];

const wireOptions = [
  { label: '2× #14 copper (same gauge)', connector: 'Wire Nut (Yellow/Tan)', technique: 'Overlap 1/2″, twist clockwise until snug, slight tug test to verify.' },
  { label: '3× #14 copper (same gauge)', connector: 'Wire Nut (Red)', technique: 'Hold all 3 parallel, twist simultaneously, verify none pull free.' },
  { label: '2× #12 copper (same gauge)', connector: 'Wire Nut (Red) or Wago 221-412', technique: 'Red wire nuts; or Wago lever-nut for vibration-prone DFW A/C circuits.' },
  { label: '#14 + #12 mixed gauges', connector: 'Wire Nut (Red) or Wago 221-412', technique: 'Hold parallel, secure tightly — mixed gauge joints need firm seating. Inspect quarterly in DFW heat.' },
  { label: '4+ wires combined', connector: 'Large Wire Nut (Gray/Red) or Wago 221-415', technique: 'Wago 5-port lever-nut preferred for 4-5 wire bundles — maintains even pressure on all conductors.' },
  { label: 'Aluminum to copper splice', connector: 'CO/ALR Wire Nut (Purple AlumiConn)', technique: 'DFW older homes: use AlumiConn or Ideal Purple connector — standard wire nuts are a fire hazard on aluminum wire.' },
  { label: 'DFW A/C vibration circuit', connector: 'Wago 221 Lever-Nut', technique: 'Always use lever-nuts for DFW A/C handler wiring — vibration loosens twist-on wire nuts over 3–5 years.' },
  { label: 'Outdoor / damp location splice', connector: 'Waterproof Wire Connector (gel-filled)', technique: 'Use DB-series gel-filled connectors for outdoor DFW junction boxes. Twist wire nut then pack with gel boot.' },
];

export default function DFWWireNutGuide() {
  const [selected, setSelected] = useState('');
  const result = wireOptions.find(w => w.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642′ }}>🔌 DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Wire Connector Guide for DFW Electricians</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6′ }}>
          Wire nuts still dominate DFW electrical work — but Wago lever-nuts are taking over in A/C and fan circuits where DFW vibration loosens traditional connections. Know which to use.
        </p>

        <div style={{ marginBottom: '32px' }}>
          {connectorTypes.map((c) => (
            <div key={c.name} style={{ background: '#111D33', borderRadius: '10px', padding: '18px 20px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px' }}>{c.icon}</span>
                <span style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '15px' }}>{c.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#F5E642', background: '#1E2D47', padding: '2px 8px', borderRadius: '20px' }}>{c.cost}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6B7A94', marginBottom: '8px' }}>Brands: {c.brands}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', color: '#4CAF50′ }}>✅ {c.pros}</div>
                <div style={{ fontSize: '13px', color: c.name.includes('Backstab') ? '#FF6B6B' : '#FF9F43′ }}>⚠️ {c.cons}</div>
              </div>
              <div style={{ fontSize: '13px', color: '#F5E642', background: '#0D1F35', padding: '8px 12px', borderRadius: '6px' }}>
                🌡️ DFW: {c.dfwNote}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>🔍 What connector for my DFW wiring job?</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your wire combination...</option>
            {wireOptions.map(w => <option key={w.label}>{w.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontWeight: '700', color: '#F5E642', fontSize: '16px', marginBottom: '8px' }}>Use: {result.connector}</div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', lineHeight: '1.6′ }}>🔧 Technique: {result.technique}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Safety Note</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6′ }}>
            Never use backstab (push-in) connections on outlet terminals in DFW — the heat cycling in DFW summers causes these to fail silently. Always use screw terminals with properly sized wire loops. Tug-test every wire nut before closing a box.
          </div>
        </div>
      </div>
    </div>
  );
}
