import { useState } from 'react';

const TIERS = [
  { name: 'Charter', rate: 0.015, color: '#F5E642', badge: '⭐' },
  { name: 'Founding', rate: 0.010, color: '#A0C4FF', badge: '🔵' },
];

export default function DFWProLnkOriginationRightsCalc() {
  const [homes, setHomes] = useState('25');
  const [spend, setSpend] = useState('2800');
  const [tier, setTier] = useState('Charter');
  const [years, setYears] = useState('5');
  const [shown, setShown] = useState(false);

  const homeCount = parseInt(homes) || 0;
  const annualSpend = parseInt(spend) || 0;
  const yearCount = parseInt(years) || 5;
  const selectedTier = TIERS.find(t => t.name === tier) || TIERS[0];

  const monthlyIncome = (homeCount * annualSpend * selectedTier.rate) / 12;
  const annualIncome = homeCount * annualSpend * selectedTier.rate;
  const fiveYearIncome = annualIncome * yearCount;
  const perHomePerMonth = (annualSpend * selectedTier.rate) / 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>Origination Rights Calculator</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Calculate your permanent recurring income from homes you register in the ProLnk Vault</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Your Origination Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Homes Registered</label>
              <input type='number' value={homes} onChange={e => setHomes(e.target.value)} min={1} placeholder='25' style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Avg Annual Service Spend / Home ($)</label>
              <input type='number' value={spend} onChange={e => setSpend(e.target.value)} min={500} placeholder='2800' style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Membership Tier</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {TIERS.map(t => (
                  <button key={t.name} onClick={() => setTier(t.name)} style={{ flex: 1, background: tier === t.name ? '#1E3A5F' : '#0A1628', border: tier === t.name ? `2px solid ${t.color}` : '1px solid #1E3A5F', borderRadius: 8, padding: '10px 8px', color: t.color, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    {t.badge} {t.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Projection Period</label>
              <select value={years} onChange={e => setYears(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['1','2','3','5','10'].map(y => <option key={y}>{y} Year{parseInt(y) > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShown(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Calculate My Origination Income →
          </button>
        </div>

        {shown && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
              {[
                { label: 'Monthly Income', val: `$${monthlyIncome.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: '📅' },
                { label: 'Annual Income', val: `$${annualIncome.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: '📆' },
                { label: `${years}-Year Total`, val: `$${fiveYearIncome.toLocaleString(undefined,{maximumFractionDigits:0})}`, icon: '🏆' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#0D1F38', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{s.val}</div>
                  <div style={{ color: '#8899AA', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F38', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📊 Breakdown</div>
              {[
                { label: 'Rate Applied', val: `${(selectedTier.rate * 100).toFixed(1)}% (${tier})` },
                { label: 'Per-Home Monthly', val: `$${perHomePerMonth.toFixed(2)}` },
                { label: 'Homes Registered', val: homeCount.toLocaleString() },
                { label: 'Avg Annual Service', val: `$${annualSpend.toLocaleString()}/home` },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #1E3A5F' : 'none' }}>
                  <span style={{ color: '#8899AA', fontSize: 14 }}>{r.label}</span>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{r.val}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
