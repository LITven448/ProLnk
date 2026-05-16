import { useState } from 'react';

const efficiencyTiers = [
  { label: 'Minimum (Code)', seer2: '14–15', cost: '$', savings: 'Baseline', taxCredit: '$0', dfwRec: 'Avoid — runs constantly in DFW summers, costs more long term', color: '#FF6B6B' },
  { label: 'Good', seer2: '16–17', cost: '$$', savings: '10–15% vs min', taxCredit: '$0', dfwRec: 'Acceptable for budget buyers in DFW; covers most summer days well', color: '#FFB347' },
  { label: 'Better', seer2: '18–20', cost: '$$', savings: '20–30% vs min', taxCredit: 'Up to $600', dfwRec: 'Sweet spot for DFW — qualifies for federal tax credit', color: '#F5E642' },
  { label: 'Best', seer2: '21–24', cost: '$$$', savings: '35–45% vs min', taxCredit: 'Up to $600', dfwRec: 'Ideal for DFW homes 2,000+ sqft with high summer bills', color: '#4CAF50' },
  { label: 'Ultra Premium', seer2: '25+', cost: '$$$$', savings: '50%+ vs min', taxCredit: 'Up to $600', dfwRec: 'Best for large DFW homes, long-term owners, net-zero goals', color: '#00BCD4' },
];

const goals = [
  { id: 'budget', label: '💰 Lowest Upfront Cost', rec: 0 },
  { id: 'balanced', label: '⚖️ Best Value / Payback', rec: 2 },
  { id: 'comfort', label: '❄️ Maximum DFW Comfort', rec: 3 },
  { id: 'savings', label: '📉 Lowest Utility Bills', rec: 4 },
  { id: 'green', label: '🌱 Net-Zero / Eco Goals', rec: 4 },
];

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500+ sqft'];

const savingsMap: Record<string, string> = {
  'Under 1,500 sqft': '$400–$600/yr',
  '1,500–2,500 sqft': '$600–$900/yr',
  '2,500–3,500 sqft': '$900–$1,400/yr',
  '3,500+ sqft': '$1,400–$2,200/yr',
};

export default function DFWHVACEfficiencySummary() {
  const [homeSize, setHomeSize] = useState('');
  const [goal, setGoal] = useState('');

  const recTier = goal ? efficiencyTiers[goals.find(g => g.id === goal)?.rec ?? 2] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW HVAC Efficiency Guide</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>What SEER2, EER2 & HSPF2 mean for your Dallas-Fort Worth home — and what's worth upgrading to</p>
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>📋 DFW Minimum Requirements (2023+)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[{ label: 'SEER2', val: '14.3+', note: 'Cooling efficiency (DFW minimum)' }, { label: 'EER2', val: '11.5+', note: 'Peak day efficiency (crucial for DFW)' }, { label: 'HSPF2', val: '7.5+', note: 'Heating (less critical in DFW)' }].map(m => (
              <div key={m.label} style={{ textAlign: 'center', padding: '0.75rem', background: '#0A1628', borderRadius: 8 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem', margin: 0 }}>{m.val}</p>
                <p style={{ color: '#fff', fontWeight: 600, margin: '0.25rem 0 0.1rem', fontSize: '0.9rem' }}>{m.label}</p>
                <p style={{ color: '#8899AA', fontSize: '0.75rem', margin: 0 }}>{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {efficiencyTiers.map((tier, i) => (
            <div key={i} style={{ background: '#0D1F35', border: `2px solid ${tier.color}`, borderRadius: 10, padding: '1rem' }}>
              <div style={{ color: tier.color, fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{tier.label}</div>
              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>{tier.seer2} SEER2</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{tier.cost} · {tier.taxCredit} credit</div>
              <p style={{ color: '#8899AA', fontSize: '0.75rem', margin: '0.5rem 0 0' }}>{tier.dfwRec}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Get Your DFW Efficiency Recommendation</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ color: '#8899AA', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: '0.9rem' }}>
                <option value="">Select size</option>
                {homeSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#8899AA', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Efficiency Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: '0.9rem' }}>
                <option value="">Select goal</option>
                {goals.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
            </div>
          </div>
          {recTier && homeSize && (
            <div style={{ padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: 0 }}>Recommended: {recTier.label} — {recTier.seer2} SEER2</p>
              <p style={{ color: '#AAB8C2', fontSize: '0.85rem', margin: '0.25rem 0' }}>Estimated annual savings vs minimum: {savingsMap[homeSize]}</p>
              {recTier.taxCredit !== '$0' && <p style={{ color: '#4CAF50', fontSize: '0.85rem', margin: 0 }}>✅ Qualifies for federal tax credit: {recTier.taxCredit}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
