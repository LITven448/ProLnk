import { useState } from 'react';

const zones = [
  { label: 'Under 1,000 sqft', min: 1.5, max: 2.0 },
  { label: '1,000–1,500 sqft', min: 2.0, max: 2.5 },
  { label: '1,500–2,000 sqft', min: 2.5, max: 3.5 },
  { label: '2,000–2,500 sqft', min: 3.5, max: 4.0 },
  { label: '2,500–3,000 sqft', min: 4.0, max: 5.0 },
  { label: '3,000–4,000 sqft', min: 5.0, max: 6.0 },
  { label: '4,000+ sqft', min: 6.0, max: 7.5 },
];

export default function DFWHVACTonnageDFW2026() {
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  function calculate() {
    const n = parseInt(sqft, 10);
    if (!n || n < 100) { setResult(null); return; }
    const min = Math.round((n / 400) * 2) / 2;
    const max = Math.round((n / 350) * 2) / 2;
    setResult({ min, max });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌡️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW HVAC Tonnage by Home Size — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Climate Zone 3 sizing rules specific to North Texas heat loads.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚠️ DFW vs. National Rule of Thumb</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Generic calculators use <strong>1 ton per 600 sqft</strong>. In DFW Climate Zone 3 that is wrong.
            DFW homes need <strong>1 ton per 350–400 sqft</strong> due to extreme solar gain, high humidity peaks,
            and 100+ days above 90°F. Undersizing causes constant runtime, high bills, and premature failure.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🚫 Why Bigger Is Never Better</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            Oversized units <strong>short-cycle</strong> — cooling air temperature without removing humidity.
            Result: clammy indoor air, mold risk, and a compressor that fails early from rapid on/off cycling.
            Match tonnage to load, not to "just to be safe" logic.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📐 DFW Quick Reference Table</h2>
          {zones.map(z => (
            <div key={z.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1′ }}>
              <span>{z.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{z.min}–{z.max} tons</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔢 Your DFW Tonnage Estimate</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input
              type="number"
              placeholder="Enter home sqft"
              value={sqft}
              onChange={e => setSqft(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 16 }}
            />
            <button
              onClick={calculate}
              style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}
            >
              Calculate
            </button>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', marginBottom: 4 }}>Recommended DFW range</div>
              <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 800 }}>{result.min}–{result.max} tons</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Final sizing requires Manual J load calculation by a licensed HVAC contractor.</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Get a Matched DFW HVAC Pro</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>ProLnk connects you with Charter-tier, Manual J-certified HVAC contractors in your DFW zip code.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Request a Quote →
          </a>
        </div>
      </div>
    </div>
  );
}