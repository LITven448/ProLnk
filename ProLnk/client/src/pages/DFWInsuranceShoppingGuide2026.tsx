import { useState } from 'react';

export default function DFWInsuranceShoppingGuide2026() {
  const [homeType, setHomeType] = useState('single');
  const [priorities, setPriorities] = useState<string[]>(['price']);

  const toggle = (p: string) => setPriorities(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const recs: Record<string, string[]> = {
    price: ['Texas Farm Bureau — consistently lowest DFW rates', 'USAA (if veteran/military) — 15-20% below market', 'Compare via independent agent (free, quotes multiple carriers)'],
    service: ['USAA — #1 in J.D. Power customer satisfaction', 'State Farm — largest agent network in DFW', 'Erie Insurance — high claims satisfaction (limited DFW availability)'],
    claims: ['Amica Mutual — lowest complaint ratio in TX', 'USAA — fastest claims processing avg 8 days', 'Avoid carriers with TDI complaint ratios above 1.5'],
    bundle: ['State Farm bundle saves avg $620/yr auto + home', 'Allstate bundle saves avg $550/yr', 'Farmers bundle saves avg $490/yr'],
  };

  const allRecs = [...new Set(priorities.flatMap(p => recs[p] || []))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🛒 DFW INSURANCE SHOPPING</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Home Insurance Shopping Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Price is only one factor. The wrong carrier costs you at claim time.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏢 Major DFW Carriers Compared</h2>
          {[
            { name: 'State Farm', icon: '🔴', strength: 'Largest network, strong claims', note: 'Rates up 25% in 2024′ },
            { name: 'Allstate', icon: '🔵', strength: 'Good bundling discounts', note: 'Higher complaint ratio' },
            { name: 'USAA', icon: '⭐', strength: 'Best overall — veterans only', note: 'Must be military/veteran/family' },
            { name: 'Farmers', icon: '🟡', strength: 'Specialty coverage options', note: 'Avg DFW rates' },
            { name: 'TX Farm Bureau', icon: '🟢', strength: 'Lowest DFW rates consistently', note: 'Membership req ($35/yr)' },
          ].map(c => (
            <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a2f55′ }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.strength}</div>
                </div>
              </div>
              <div style={{ color: '#64748b', fontSize: 12, textAlign: 'right' }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🎯 Personalized Shopping Checklist</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ background: '#1a2f55', color: '#fff', border: '1px solid #2a3f65', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              <option value="single">Single Family Home</option>
              <option value="condo">Condo / Townhome (HO-6)</option>
              <option value="rental">Rental Property (DP-3)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Your Priorities (select all that apply)</label>
            {[{v:'price',l:'💰 Lowest price'},{v:'service',l:'🤝 Best customer service'},{v:'claims',l:'⚡ Fastest claims'},{v:'bundle',l:'📦 Bundle discount'}].map(p => (
              <label key={p.v} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={priorities.includes(p.v)} onChange={() => toggle(p.v)} style={{ accentColor: '#F5E642′ }} />
                <span style={{ fontSize: 13 }}>{p.l}</span>
              </label>
            ))}
          </div>
          {allRecs.length > 0 && (
            <div style={{ background: '#1a2f55', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#F5E642′ }}>Your Recommendations:</div>
              {allRecs.map(r => (
                <div key={r} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
                  <span>→</span><span style={{ color: '#94a3b8′ }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
