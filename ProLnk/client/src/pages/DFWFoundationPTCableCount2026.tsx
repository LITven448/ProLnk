import { useState } from 'react';

export default function DFWFoundationPTCableCount2026() {
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<{ cables: string; spacing: string; note: string } | null>(null);

  const calculate = () => {
    const s = parseInt(sqft);
    if (isNaN(s) || s < 500) return;
    const side = Math.sqrt(s);
    const cables = Math.round((side / 4) * 2);
    const spacing = s < 2000 ? '4-5 ft' : s < 3500 ? '3-4 ft' : '3 ft';
    const note = s < 2000 ? 'Standard density — pier drilling has moderate constraints' : s < 3500 ? 'Higher cable count — must locate cables before any pier drilling' : 'High-density slab — professional cable locating required before all foundation work';
    setResult({ cables: String(cables), spacing, note });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔩</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Post-Tension Cable Count Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>How many PT cables are in your DFW slab — and what it means for foundation work</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📐', label: 'Typical Residential', value: '15-25 cables each direction' },
            { icon: '📏', label: 'Cable Spacing', value: '3-5 feet apart' },
            { icon: '⚠️', label: 'Pier Drilling Risk', value: 'High — must locate first' },
            { icon: '🔍', label: 'Cable Locating Cost', value: '-400 before drilling' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🏠 Home Size → PT Cable Density Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Enter your home square footage:</p>
          <input
            type="number"
            placeholder="e.g. 2400"
            value={sqft}
            onChange={e => setSqft(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: 8, border: '2px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }}
          />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Estimate My Cable Count</button>
        </div>

        {result && (
          <div style={{ background: '#0F3D1F', borderRadius: 16, padding: 28, border: '1px solid #22543d', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>📊 Estimated PT Cable Profile</h3>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#94a3b8' }}>Cable count: </span><span style={{ color: '#86efac', fontWeight: 700 }}>{result.cables}</span></div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#94a3b8' }}>Typical spacing: </span><span style={{ color: '#86efac', fontWeight: 700 }}>{result.spacing}</span></div>
            <p style={{ color: '#4ade80', fontWeight: 600 }}>⚠️ {result.note}</p>
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Why Cable Count Matters in DFW</h3>
          <ul style={{ color: '#94a3b8', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Cutting a PT cable during pier drilling can cause catastrophic slab damage</li>
            <li>DFW expansive clay soil means most homes eventually need pier work</li>
            <li>Licensed contractors use GPR (ground-penetrating radar) to locate cables</li>
            <li>Always verify cable count with original engineering drawings if available</li>
          </ul>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with DFW foundation specialists who carry GPR equipment and understand PT slabs.</p>
        </div>
      </div>
    </div>
  );
}