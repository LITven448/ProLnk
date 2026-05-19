import { useState } from 'react';

const concepts = [
  { icon: '💰', term: 'ACV', full: 'Actual Cash Value', detail: 'Replacement cost minus depreciation. DFW insurers depreciate roofing at ~3–5% per year. A 10-year-old roof at 40% depreciation on a $15,000 replacement = $9,000 ACV payout.' },
  { icon: '🏠', term: 'RCV', full: 'Replacement Cost Value', detail: 'Full cost to replace with like materials, no depreciation deduction. After ACV check arrives, you do the work, submit receipts, insurer releases the held depreciation (recoverable depreciation).' },
  { icon: '📉', term: 'Depreciation', full: 'How Age Reduces Payout', detail: 'DFW adjusters consider age, condition, material type. 3-tab shingles depreciate faster than architectural. UV damage from Texas sun can accelerate depreciation schedule.' },
  { icon: '📋', term: 'Recoverable vs Non-Recoverable', full: 'Policy Type Matters', detail: 'RCV policy: depreciation held, released after repair. ACV policy: depreciation is gone — you absorb the gap. Know your policy before storm season.' },
];

const scenarios = [
  { age: '3 years old', condition: 'Good', result: 'Low depreciation (~10%). ACV ≈ $13,500. Strong RCV policy captures full $15,000 after repair completion.' },
  { age: '8 years old', condition: 'Fair', result: 'Moderate depreciation (~32%). ACV ≈ $10,200. Recoverable depreciation = $4,800 released after repair.' },
  { age: '14 years old', condition: 'Poor', result: 'High depreciation (~56%). ACV ≈ $6,600. With RCV policy, still recover to $15,000. ACV-only policy leaves $8,400 gap.' },
  { age: '20+ years old', condition: 'End of life', result: 'Full depreciation possible (80%+). ACV ≈ $3,000 or less. Insurer may deny claim or require full replacement. Get ProLnk assessment first.' },
];

export default function DFWRoofingACVRCVCalculation2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW ROOFING</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Roofing ACV vs RCV Calculation Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>Understand exactly what your DFW insurance claim will pay — before the adjuster arrives.</p>

        <div style={{ marginBottom: 36 }}>
          {concepts.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#0f1f38', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 24 }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.term} — {c.full}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>📊 ACV vs RCV Example Calculator</div>
          <div style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Based on $15,000 DFW roof replacement. Select roof age + condition:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenarios.map((s, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642' : '#162035', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {s.age} · {s.condition} Condition
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    {s.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🌩️ Storm damage? Get a DFW Roofing Pro</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>ProLnk matches you with licensed DFW roofers who understand insurance claims — free estimate.</div>
        </div>
      </div>
    </div>
  );
}