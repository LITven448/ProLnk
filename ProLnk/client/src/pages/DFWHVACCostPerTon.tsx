import { useState } from 'react';

const tiers = [
  { label: 'Equipment Only (wholesale cost)', perTon: '$600–900', note: 'What contractors pay — not what you pay' },
  { label: 'Equipment + Labor + Materials', perTon: '$1,000–1,500', note: 'Typical installed cost per ton in DFW' },
  { label: 'Full System Replacement', perTon: '$1,500–2,000', note: 'Including air handler, coil, lineset, permits, startup' },
  { label: 'Premium / High-Efficiency Systems', perTon: '$2,000–2,800', note: 'Variable speed, 18+ SEER2, 10-year parts warranty' },
];

const sizes = [
  { sqft: '800–1,200', tons: 1.5, label: '1.5 ton' },
  { sqft: '1,200–1,800', tons: 2, label: '2 ton' },
  { sqft: '1,800–2,400', tons: 2.5, label: '2.5 ton' },
  { sqft: '2,400–3,000', tons: 3, label: '3 ton' },
  { sqft: '3,000–3,800', tons: 3.5, label: '3.5 ton' },
  { sqft: '3,800–4,500', tons: 4, label: '4 ton' },
  { sqft: '4,500–5,500', tons: 5, label: '5 ton' },
];

const redFlags = [
  'Quote does not specify SEER2 rating or brand model number',
  'No mention of permit pull — required for all DFW AC replacements',
  'Refuses to show itemized breakdown of equipment vs. labor',
  'Recommends oversizing — bigger is not always better in DFW humidity control',
  'No load calculation (Manual J) offered — properly sizing DFW systems matters',
  'Pressure sale same-day close on a 3-ton system worth $6,000+',
];

export default function DFWHVACCostPerTon() {
  const [sqft, setSqft] = useState('');
  const [tier, setTier] = useState('');
  const [result, setResult] = useState<null | { sizeLabel: string; tons: number; low: number; high: number }>(null);

  function calculate() {
    const s = parseInt(sqft) || 0;
    const t = tiers.find(t => t.label === tier);
    if (!s || !t) return;
    const match = sizes.find(sz => {
      const [lo, hi] = sz.sqft.split('–').map(Number);
      return s >= lo && s <= hi;
    }) || sizes[sizes.length - 1];
    const [lo, hi] = t.perTon.replace(/\$/g, '').split('–').map(Number);
    setResult({ sizeLabel: match.label, tons: match.tons, low: lo * match.tons, high: hi * match.tons });
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0A1628' }}>HVAC Cost Per Ton in DFW</h1>
        <p style={{ color: '#5A6B7D', marginBottom: 32 }}>
          DFW's brutal summers demand oversized, high-efficiency AC systems. Understanding cost per ton helps you decode contractor quotes and avoid overpaying on a replacement that could run $5,000–$15,000.
        </p>

        <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 8, padding: '12px 20px', marginBottom: 32, fontWeight: 700 }}>
          📌 Full system replacement in DFW: $1,500–$2,000 per ton · Typical DFW home: 3–5 tons
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>What You Are Paying For — Cost Tiers</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {tiers.map(t => (
            <div key={t.label} style={{ background: '#FFFFFF', borderRadius: 8, padding: '14px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, borderLeft: '3px solid #F5E642' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.label}</div>
                <div style={{ color: '#5A6B7D', fontSize: 13 }}>{t.note}</div>
              </div>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>{t.perTon}/ton</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>❄️ Estimate Your DFW HVAC Replacement Cost</h2>
        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#5A6B7D', fontSize: 13, marginBottom: 6 }}>Home Size (sq ft)</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2400" style={{ width: '100%', padding: '10px 14px', background: '#F8F9FA', border: '1px solid #D0D7DE', borderRadius: 6, color: '#1A2B3C', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#5A6B7D', fontSize: 13, marginBottom: 6 }}>Quote Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#F8F9FA', border: '1px solid #D0D7DE', borderRadius: 6, color: '#1A2B3C', fontSize: 13, boxSizing: 'border-box' }}>
                <option value="">Select tier...</option>
                {tiers.map(t => <option key={t.label} value={t.label}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Calculate Expected Cost</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#F0F4FF', borderRadius: 8, borderLeft: '3px solid #0A1628' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#0A1628' }}>
                {result.sizeLabel} system — ${result.low.toLocaleString()}–${result.high.toLocaleString()}
              </div>
              <div style={{ color: '#5A6B7D', fontSize: 14, lineHeight: 1.6 }}>
                DFW market range for a {result.tons}-ton system at this tier. Get 3 quotes minimum — DFW HVAC pricing varies significantly by brand, warranty, and contractor overhead.
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 8, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#CC3300' }}>🚩 DFW HVAC Quote Red Flags</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {redFlags.map((f, i) => <li key={i} style={{ color: '#5A6B7D', fontSize: 14, lineHeight: 1.9 }}>{f}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
