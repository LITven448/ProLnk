import { useState } from 'react';

const tradeRates: Record<string, { low: number; high: number; unit: string }> = {
  'HVAC': { low: 85, high: 150, unit: '/hr' },
  'Plumbing': { low: 95, high: 175, unit: '/hr' },
  'Electrical': { low: 100, high: 175, unit: '/hr' },
  'Roofing': { low: 8, high: 14, unit: '/sqft installed' },
  'Foundation Repair': { low: 350, high: 600, unit: '/pier' },
};

export default function PartnerPricingStrategy() {
  const [jobCost, setJobCost] = useState('');
  const [markup, setMarkup] = useState(40);
  const [isStorm, setIsStorm] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);

  const cost = parseFloat(jobCost) || 0;
  const basePrice = cost * (1 + markup / 100);
  const stormSurge = isStorm ? basePrice * 0.30 : 0;
  const emergencySurge = isEmergency ? basePrice * 1.0 : 0;
  const finalPrice = basePrice + stormSurge + emergencySurge;
  const prolnkCommission = finalPrice * 0.08;
  const takeHome = finalPrice - prolnkCommission;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            💡 PARTNER RESOURCE
          </span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#0f172a' }}>
          ProLnk Partner Pricing Strategy
        </h1>
        <p style={{ fontSize: 20, color: '#2563eb', fontWeight: 700, marginBottom: 32 }}>
          Set Prices That Win
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, marginBottom: 40, color: '#f0f9ff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#ffffff' }}>💭 The Pricing Paradox</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#bae6fd' }}>
            In home services, the lowest bid rarely wins. Homeowners associate price with quality. They've been burned by the cheapest contractor before, and they know it.
            The sweet spot is <strong style={{ color: '#ffffff' }}>15–20% above the lowest quote</strong> — high enough to signal quality, low enough to not lose on sticker shock.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>📐 Pricing Frameworks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🧮', name: 'Cost-Plus', color: '#eff6ff', border: '#bfdbfe', accent: '#1d4ed8', desc: 'Calculate material + labor cost, then add 30-45% margin. Simple and protects your bottom line. Best for standard jobs with predictable scope.' },
            { icon: '📊', name: 'Market Rate', color: '#f0fdf4', border: '#bbf7d0', accent: '#15803d', desc: 'Price at the market median. Compete on speed, availability, and reviews rather than price. Works when you have a strong reputation.' },
            { icon: '💎', name: 'Value-Based', color: '#faf5ff', border: '#e9d5ff', accent: '#7c3aed', desc: 'Price on value delivered. Emergency repairs, storm response, and AI-detected issues command 2-3x normal rates — and homeowners expect to pay it.' },
          ].map(f => (
            <div key={f.name} style={{ background: f.color, border: `1px solid ${f.border}`, borderRadius: 16, padding: 24 }}>
              <span style={{ fontSize: 28 }}>{f.icon}</span>
              <h3 style={{ color: f.accent, fontWeight: 700, marginTop: 12, marginBottom: 8 }}>{f.name}</h3>
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>💰 DFW Market Rates by Trade</h2>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', color: '#475569', fontWeight: 700, fontSize: 14 }}>Trade</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', color: '#475569', fontWeight: 700, fontSize: 14 }}>Low</th>
                <th style={{ padding: '14px 20px', textAlign: 'center', color: '#475569', fontWeight: 700, fontSize: 14 }}>High</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', color: '#475569', fontWeight: 700, fontSize: 14 }}>Unit</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tradeRates).map(([trade, r], i) => (
                <tr key={trade} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td style={{ padding: '14px 20px', color: '#1e293b', fontWeight: 600 }}>{trade}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center', color: '#15803d', fontWeight: 700 }}>${r.low}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'center', color: '#15803d', fontWeight: 700 }}>${r.high}</td>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: 14 }}>{r.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>⚡ ProLnk-Specific Pricing Tips</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🌩️', tip: 'Storm Leads', color: '#fef3c7', border: '#fcd34d', accent: '#92400e', desc: 'Add 25-35% surge pricing on storm-related leads. Homeowners in crisis mode expect and accept higher prices. Availability matters more than cost after a major storm.' },
            { icon: '🤖', tip: 'AI-Detected Leads', color: '#ede9fe', border: '#c4b5fd', accent: '#5b21b6', desc: 'Include "our AI detected this issue in our system" in your quote. This increases perceived value and conversion. Homeowners trust data-backed recommendations.' },
            { icon: '🤝', tip: 'Network Leads', color: '#dcfce7', border: '#86efac', accent: '#166534', desc: 'You arrive with credibility from your recruiter’s reputation in that customer’s network. Price at full market rate — no discount needed. The referral trust is the discount.' },
          ].map(t => (
            <div key={t.tip} style={{ background: t.color, border: `1px solid ${t.border}`, borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div>
                  <h3 style={{ color: t.accent, fontWeight: 700, marginBottom: 6, fontSize: 17 }}>{t.tip}</h3>
                  <p style={{ color: '#334155', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#0f172a' }}>📈 When to Raise Your Prices</h2>
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 14, padding: 24, marginBottom: 40 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
            {[
              'After earning 5 five-star reviews — social proof justifies higher rates',
              'When booked more than 3 weeks out — demand exceeds supply',
              'When you reach 80%+ acceptance rate on quotes — you’re priced too low',
              'When material costs rise — protect your margin immediately, not quarterly',
              'When you add certifications or specialty equipment',
            ].map(item => (
              <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>↑</span>
                <span style={{ color: '#166534', fontSize: 15 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>🧮 Margin Calculator</h2>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Your Job Cost ($)</label>
              <input
                type="number"
                value={jobCost}
                onChange={e => setJobCost(e.target.value)}
                placeholder="e.g. 800"
                style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px', fontSize: 16, color: '#1e293b', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Markup: {markup}%</label>
              <input
                type="range"
                min={20} max={80} value={markup}
                onChange={e => setMarkup(Number(e.target.value))}
                style={{ width: '100%', marginTop: 8 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8' }}>
                <span>20%</span><span>80%</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: isStorm ? '#fef3c7' : '#f8fafc', border: `1px solid ${isStorm ? '#fcd34d' : '#e2e8f0'}`, borderRadius: 8, padding: '10px 16px' }}>
              <input type="checkbox" checked={isStorm} onChange={e => setIsStorm(e.target.checked)} />
              <span style={{ fontWeight: 600, color: '#92400e' }}>🌩️ Storm lead (+30%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: isEmergency ? '#fef2f2' : '#f8fafc', border: `1px solid ${isEmergency ? '#fca5a5' : '#e2e8f0'}`, borderRadius: 8, padding: '10px 16px' }}>
              <input type="checkbox" checked={isEmergency} onChange={e => setIsEmergency(e.target.checked)} />
              <span style={{ fontWeight: 600, color: '#991b1b' }}>🚨 Emergency (+100%)</span>
            </label>
          </div>

          {cost > 0 && (
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                {[
                  { label: 'Base Quote', value: `$${basePrice.toFixed(0)}`, color: '#1e293b' },
                  { label: 'Final Price', value: `$${finalPrice.toFixed(0)}`, color: '#1d4ed8' },
                  { label: 'ProLnk Commission (8%)', value: `-$${prolnkCommission.toFixed(0)}`, color: '#dc2626' },
                  { label: 'Your Take-Home', value: `$${takeHome.toFixed(0)}`, color: '#16a34a' },
                ].map(r => (
                  <div key={r.label} style={{ textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: 13, marginBottom: 4 }}>{r.label}</p>
                    <p style={{ color: r.color, fontWeight: 800, fontSize: 22 }}>{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
