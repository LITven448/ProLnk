import { useState } from 'react';

const USE_CASES = [
  { id: 'dog', label: 'Dog Run / Pet Containment', appropriate: true, note: 'Ideal — durable, visible, easy to size.' },
  { id: 'backyard', label: 'Backyard Utility', appropriate: true, note: 'Good choice — cost-effective, long-lasting.' },
  { id: 'commercial', label: 'Commercial / Industrial', appropriate: true, note: 'Best fit — galvanized lasts 40+ years.' },
  { id: 'frontyard', label: 'Front Yard Residential', appropriate: false, note: 'Most DFW HOAs prohibit chain link in front yards.' },
  { id: 'pool', label: 'Pool Barrier', appropriate: true, note: 'Meets code — must be at least 4ft with self-closing gate.' },
];

const HEIGHTS = [36, 42, 48, 60, 72];

export default function DFWChainLinkFenceGuide() {
  const [linearFeet, setLinearFeet] = useState(150);
  const [useCase, setUseCase] = useState('dog');
  const [coating, setCoating] = useState('galvanized');
  const [hasHOA, setHasHOA] = useState(false);
  const [height, setHeight] = useState(48);
  const [privacySlats, setPrivacySlats] = useState(false);

  const uc = USE_CASES.find(u => u.id === useCase)!;
  const baseCostPerFt = coating === 'galvanized' ? 11 : 15;
  const slatCostPerFt = privacySlats ? 4 : 0;
  const laborPerFt = 7;
  const heightMultiplier = height >= 60 ? 1.25 : height >= 48 ? 1.0 : 0.8;
  const totalCost = Math.round(linearFeet * (baseCostPerFt + slatCostPerFt + laborPerFt) * heightMultiplier);

  const isBlocked = hasHOA && (useCase === 'frontyard' || useCase === 'backyard');
  const altMsg = isBlocked ? 'Consider vinyl or wood privacy fence — both HOA-friendly in most DFW communities.' : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🔗</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Chain Link Fence Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
          Chain link is DFW's most economical fencing — find out where it works and where HOA rules out.
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginTop: 36 }}>
          {[
            { icon: '🐕', title: 'Best DFW Use Cases', body: 'Chain link excels for dog runs, back yard utility, and commercial perimeter. Galvanized steel handles DFW heat and rain with zero maintenance for 30–40+ years.' },
            { icon: '🏘️', title: 'HOA Reality Check', body: 'Roughly 70% of DFW\’s residential HOAs prohibit chain link in front yards. Many also restrict back yard chain link to under 6ft. Always check CC&Rs before ordering.' },
            { icon: '🔒', title: 'Privacy Slat Upgrade', body: 'Aluminum or polyethylene privacy slats thread into chain link and add 85–95% visual privacy. In DFW, aluminum slats hold up better to UV and heat than plastic alternatives.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '10px 0 6px' }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 16, padding: 28, marginTop: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Fit Check & Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Linear Feet</label>
              <input type="range" min={30} max={600} value={linearFeet} onChange={e => setLinearFeet(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <span style={{ color: '#F5E642', fontSize: 15, fontWeight: 700 }}>{linearFeet} ft</span>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Use</label>
              <select value={useCase} onChange={e => setUseCase(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {USE_CASES.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Coating Type</label>
              <select value={coating} onChange={e => setCoating(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                <option value="galvanized">Galvanized Steel</option>
                <option value="vinyl">Vinyl Coated</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Height (inches)</label>
              <select value={height} onChange={e => setHeight(+e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}>
                {HEIGHTS.map(h => <option key={h} value={h}>{h}" ({Math.floor(h/12)}′{h%12 ? h%12+'"' : ''})</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasHOA} onChange={e => setHasHOA(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              <span style={{ color: '#94A3B8', fontSize: 14 }}>I have an HOA</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={privacySlats} onChange={e => setPrivacySlats(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              <span style={{ color: '#94A3B8', fontSize: 14 }}>Add privacy slats</span>
            </label>
          </div>

          {altMsg ? (
            <div style={{ background: '#2d1a1a', border: '1px solid #ef4444', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>⚠️ HOA Likely to Reject Chain Link Here</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{altMsg}</div>
            </div>
          ) : (
            <div style={{ background: '#1a2f1a', border: '1px solid #22c55e', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>✅ {uc.note}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            {[
              { label: 'Est. Total Cost', value: `$${totalCost.toLocaleString()}` },
              { label: 'Cost/Linear Ft', value: `$${Math.round(totalCost/linearFeet)}/ft` },
              { label: 'Coating', value: coating === 'galvanized' ? 'Galvanized' : 'Vinyl' },
              { label: 'Privacy Slats', value: privacySlats ? 'Yes (+$4/ft)' : 'No' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
