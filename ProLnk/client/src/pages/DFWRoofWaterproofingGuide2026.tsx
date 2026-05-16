import { useState } from 'react';

const requirements = [
  { location: 'Roof valleys', icon: '🏔️', requirement: 'Required by Code', detail: 'Ice and water shield required in all valleys — DFW municipalities follow IRC which mandates 36" minimum self-adhered membrane in valleys. Extend 18" each side from center. Some DFW cities require full valley coverage.' },
  { location: 'Eaves (first 2 rows)', icon: '🏠', requirement: 'Code Required', detail: 'Self-adhered membrane at eaves required for DFW homes — protects against rare ice dam events and windblown rain. Extend to 12" inside exterior wall line per IRC. Synthetic underlayment performs better than felt in DFW UV.' },
  { location: 'Wall/roof intersections', icon: '🧱', requirement: 'Step Flashing Critical', detail: 'Step flashing at every course — individual L-shaped pieces, one per shingle, interleaved with shingles. Most DFW water intrusion occurs at wall intersections due to incorrect or missing step flashing. Never use continuous counter flashing only.' },
  { location: 'Ridge and hip', icon: '📐', requirement: 'Underlayment + Ventilation', detail: 'Synthetic underlayment performs better than 30# felt in DFW heat — felt dries out and becomes brittle. Ridge vent placement: continuous ridge vent with equal net free area to soffit vents. Common DFW error: ridge vent installed but soffits blocked.' },
  { location: 'Pipe/HVAC penetrations', icon: '🔧', requirement: 'Self-Adhered Membrane', detail: 'Self-adhered membrane collar around all penetrations before flashing installation — flashing alone is insufficient in DFW wind-driven rain. Use EPDM pipe boots rated for DFW UV exposure — plastic boots fail in 7-10 years.' },
];

export default function DFWRoofWaterproofingGuide2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<typeof requirements[0] | null>(null);

  const locations = requirements.map(r => r.location);

  const getRequirement = () => {
    const match = requirements.find(r => r.location === location);
    setResult(match || null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌊</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roof Waterproofing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Ice and water shield, underlayment, and flashing requirements for DFW roofs.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ DFW Waterproofing Layer Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📦', label: 'Deck Layer', val: 'Self-adhered membrane at valleys/eaves' },
              { icon: '📄', label: 'Field Underlayment', val: 'Synthetic (not felt) for DFW UV' },
              { icon: '🔩', label: 'Fastening', val: 'Cap nails or plastic caps in DFW wind' },
              { icon: '⚠️', label: 'Top Failure', val: 'Missing or improper step flashing' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Waterproofing Requirements by Location</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Detail Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select location...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button onClick={getRequirement} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Requirements →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.requirement}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}