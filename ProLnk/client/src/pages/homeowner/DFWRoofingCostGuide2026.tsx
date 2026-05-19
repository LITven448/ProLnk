import { useState } from 'react';

const priceTable = [
  { item: 'Roof Inspection',             low: 150,   high: 350,   note: '' },
  { item: 'Small Repair (spot damage)',  low: 300,   high: 1500,  note: '' },
  { item: 'Full Replace — 1,500 sqft',  low: 8000,  high: 14000, note: 'Standard shingle' },
  { item: 'Full Replace — 2,500 sqft',  low: 14000, high: 25000, note: 'Standard shingle' },
  { item: 'Metal Roof Upgrade',          low: 0,     high: 0,     note: '+40–60% over shingle price' },
];

const claimSteps = [
  { n: 1, label: 'Document everything', detail: 'Photos, videos, dates. More is more.' },
  { n: 2, label: 'Call your insurer',   detail: 'File claim within 24–48 hrs of damage.' },
  { n: 3, label: 'Get 3 estimates',     detail: 'Never accept just the insurer’s adjuster estimate.' },
  { n: 4, label: 'Choose contractor',   detail: 'Verify license at TDLR.texas.gov.' },
  { n: 5, label: 'Sign agreement',      detail: 'Read before signing. No deductible waivers.' },
  { n: 6, label: 'Work begins',         detail: 'Get a project timeline in writing.' },
];

const sizes = ['1,000 sqft', '1,500 sqft', '2,000 sqft', '2,500 sqft', '3,000 sqft', '3,500 sqft'];
const types  = ['Standard Shingle (3-tab)', 'Architectural Shingle', 'Metal Roof'];

const baseRates: Record<string, number> = {
  '1,000 sqft': 6000,  '1,500 sqft': 10000, '2,000 sqft': 14500,
  '2,500 sqft': 19000, '3,000 sqft': 23500, '3,500 sqft': 28000,
};
const typeMultiplier: Record<string, number> = {
  'Standard Shingle (3-tab)': 1.0,
  'Architectural Shingle':    1.2,
  'Metal Roof':               1.55,
};

export default function DFWRoofingCostGuide2026() {
  const [selSize, setSelSize] = useState('');
  const [selType, setSelType] = useState('');
  const [estimate, setEstimate] = useState('');

  function calcEstimate() {
    if (!selSize || !selType) { setEstimate('Select a home size and roof type.'); return; }
    const base = baseRates[selSize];
    const mult = typeMultiplier[selType];
    const low  = Math.round(base * mult * 0.85 / 500) * 500;
    const high = Math.round(base * mult * 1.15 / 500) * 500;
    setEstimate(`Estimated range: $${low.toLocaleString()} – $${high.toLocaleString()}`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64B5F6', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
          DFW Roofing Cost Guide 2026
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginBottom: 48 }}>
          What to expect after any storm — honest numbers, no fluff.
        </p>

        {/* Price Table */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Quick Reference Pricing</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1E3A5F' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Service</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Low</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>High</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#64B5F6', fontWeight: 600, fontSize: 13 }}>Note</th>
                </tr>
              </thead>
              <tbody>
                {priceTable.map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? '#111E33' : '#0A1628', borderBottom: '1px solid #1E3A5F' }}>
                    <td style={{ padding: '14px 16px', color: '#E8EDF5', fontWeight: 500 }}>{row.item}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: '#4ADE80' }}>{row.low ? `$${row.low.toLocaleString()}` : '—'}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: '#4ADE80' }}>{row.high ? `$${row.high.toLocaleString()}` : '—'}</td>
                    <td style={{ padding: '14px 16px', color: '#94A3B8', fontSize: 13 }}>{row.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Storm surge note */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: '#2D1515', borderRadius: 12, padding: 24, borderLeft: '4px solid #EF4444' }}>
            <div style={{ fontWeight: 700, color: '#FCA5A5', marginBottom: 8 }}>⚡ Storm Surge Pricing</div>
            <p style={{ color: '#FCA5A5', margin: 0, lineHeight: 1.7 }}>
              After a major hail event, DFW roofing prices spike <strong>20–40%</strong> and wait times extend <strong>4–8 weeks</strong> as out-of-state storm chasers flood the market. Book a verified local contractor before you need one.
            </p>
          </div>
        </section>

        {/* Insurance Claim Process */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Insurance Claim Process</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {claimSteps.map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#1E3A5F', borderRadius: 10, padding: 20 }}>
                <div style={{ minWidth: 32, height: 32, borderRadius: '50%', background: '#1D6FE8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#FFFFFF' }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Red Flag */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ background: '#2D1515', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 800, color: '#EF4444', fontSize: 16, marginBottom: 8 }}>🚩 Texas Red Flag Warning</div>
            <p style={{ color: '#FCA5A5', margin: 0, lineHeight: 1.7 }}>
              If a contractor offers to <strong>"waive your insurance deductible"</strong>, walk away immediately. This is <strong>insurance fraud under Texas law</strong> (Ins. Code §705.004). It can void your policy and expose you to criminal liability. Legitimate contractors never offer this.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>🧮 Estimate Your Roof Replacement</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home Size</label>
                <select
                  value={selSize}
                  onChange={e => setSelSize(e.target.value)}
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15 }}
                >
                  <option value="">Select size…</option>
                  {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Roof Type</label>
                <select
                  value={selType}
                  onChange={e => setSelType(e.target.value)}
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15 }}
                >
                  <option value="">Select type…</option>
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button
              onClick={calcEstimate}
              style={{ background: '#1D6FE8', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Calculate Estimate
            </button>
            {estimate && (
              <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#4ADE80', fontWeight: 700, fontSize: 18, textAlign: 'center' }}>
                {estimate}
                <div style={{ color: '#64748B', fontSize: 13, fontWeight: 400, marginTop: 6 }}>Based on 2026 DFW contractor averages. Storm surge not included.</div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1D6FE8, #0D47A1)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Get Verified DFW Roofer Quotes</h3>
          <p style={{ color: '#93C5FD', marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk only works with licensed, background-checked roofing contractors. No storm chasers. No deductible scams.
          </p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}>
            Get Verified Quotes →
          </a>
        </div>

      </div>
    </div>
  );
}
