import { useState } from 'react';

const gatedFacts = [
  { icon: '🔒', title: 'Gate Maintenance Costs', desc: 'Gated communities typically carry HOA premiums of $75–$200/mo above comparable non-gated communities in DFW.' },
  { icon: '📈', title: 'DFW Gated Resale', desc: 'Gated homes in DFW sell 3–8% faster and hold value better during downturns — buyers perceive higher prestige.' },
  { icon: '🚗', title: 'What Gating Actually Provides', desc: 'Access control and reduced drive-through traffic. Studies show modest crime reduction — not elimination.' },
  { icon: '🛠️', title: 'Gate Maintenance Reality', desc: 'Gates break frequently. HOA must maintain entry systems, cameras, call boxes — budget shortfalls are common.' },
  { icon: '🏡', title: 'Community Cohesion', desc: 'Gated communities often have stronger neighbor relationships and more active HOA governance.' },
];

const dfwGatedAreas = [
  { area: 'Southlake / Westlake', type: 'Ultra-luxury gated estates', priceRange: '$1.2M–$5M+', hoaPremium: '$200–$400/mo extra', notes: 'Trophy market, top DFW schools' },
  { area: 'Frisco (Starwood, Newman Village)', type: 'Master-planned gated', priceRange: '$600K–$1.4M', hoaPremium: '$150–$250/mo extra', notes: 'Family-oriented, amenity-rich' },
  { area: 'Las Colinas Irving', type: 'Golf-course gated communities', priceRange: '$450K–$900K', hoaPremium: '$120–$200/mo extra', notes: 'Corporate proximity, lake access' },
  { area: 'North Fort Worth (Presidio)', type: 'Gated suburban enclaves', priceRange: '$380K–$700K', hoaPremium: '$100–$180/mo extra', notes: 'Growing area, newer construction' },
];

export default function DFWGatedCommunityBuyingGuide() {
  const [budget, setBudget] = useState('');
  const [securityPriority, setSecurityPriority] = useState('');
  const [result, setResult] = useState<null | string>(null);

  function assess() {
    const b = parseInt(budget.replace(/\D/g, ''), 10);
    if (!budget || !securityPriority) return;
    let msg = '';
    if (securityPriority === 'high' && b >= 600000) {
      msg = '🔒 Frisco master-planned gated communities or Las Colinas golf communities fit your security priority and budget. Expect $150–$250/mo HOA premium — worth it for resale value and community amenities.';
    } else if (securityPriority === 'high' && b >= 380000) {
      msg = '🔒 North Fort Worth gated communities (Presidio) offer security features at a more accessible price point. HOA premium ~$100–$180/mo. Strong appreciation corridor.';
    } else if (securityPriority === 'low' && b >= 380000) {
      msg = '💡 Non-gated DFW communities offer better value per square foot. Save the $100–$200/mo HOA premium for mortgage paydown — you can get security cameras and smart locks for $500 upfront.';
    } else if (b < 380000) {
      msg = '⚠️ True gated communities in DFW typically start at $380K. At your budget, consider non-gated neighborhoods with private HOA roads, which offer similar access control at lower cost.';
    } else {
      msg = '✅ You have solid options across DFW gated communities. Las Colinas and North Fort Worth offer the best value-to-prestige ratio in your range.';
    }
    setResult(msg);
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW REAL ESTATE GUIDE</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>DFW Gated Community Buying Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            Gating adds HOA cost and prestige — but is it worth it for your DFW purchase? Here's the real breakdown.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {gatedFacts.slice(0, 4).map(f => (
            <div key={f.title} style={{ background: '#fff', borderRadius: 10, padding: 18, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 18, border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <div style={{ fontSize: 26, marginBottom: 8 }}>{gatedFacts[4].icon}</div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{gatedFacts[4].title}</div>
          <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>{gatedFacts[4].desc}</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🗺️ DFW Gated Community Markets</h2>
          {dfwGatedAreas.map(a => (
            <div key={a.area} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontWeight: 700 }}>{a.area}</span>
                <span style={{ fontSize: 12, background: '#0A1628', color: '#F5E642', borderRadius: 4, padding: '2px 8px' }}>{a.priceRange}</span>
              </div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{a.type} · HOA premium: {a.hoaPremium}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{a.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🔍 Gated vs Non-Gated Value Assessment</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your budget</label>
            <input type="text" placeholder="e.g. $550,000" value={budget} onChange={e => setBudget(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>How important is gated access to you?</label>
            <select value={securityPriority} onChange={e => setSecurityPriority(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="high">High — it's a must-have for my family</option>
              <option value="medium">Medium — prefer it but not a dealbreaker</option>
              <option value="low">Low — I just want a good home in a safe area</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get My DFW Gated Assessment
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 16, fontSize: 14 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
