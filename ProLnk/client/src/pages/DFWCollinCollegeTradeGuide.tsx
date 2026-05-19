import { useState } from 'react';

const programs = [
  { trade: 'HVAC', months: 9, cost: 4200, placement: 92, startingWage: 22, proLnkTier: 'Charter' },
  { trade: 'Electrical', months: 12, cost: 5100, placement: 94, startingWage: 24, proLnkTier: 'Founding' },
  { trade: 'Plumbing', months: 10, cost: 4800, placement: 91, startingWage: 23, proLnkTier: 'Charter' },
  { trade: 'Welding', months: 8, cost: 3600, placement: 88, startingWage: 20, proLnkTier: 'Charter' },
];

export default function DFWCollinCollegeTradeGuide() {
  const [selectedTrade, setSelectedTrade] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | typeof programs[0]>(null);

  function getRecommendation() {
    const b = parseInt(budget, 10);
    const affordable = programs.filter(p => !b || p.cost <= b);
    const match = affordable.find(p => p.trade === selectedTrade) || affordable[0];
    setResult(match || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Collin College Trade Programs — DFW Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 620, margin: '0 auto' }}>
            Collin College sits at the heart of DFW's fastest-growing corridor—Frisco, McKinney, Allen, Plano.
            Graduates enter the trades with real credentials employers and homeowners trust.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
          {programs.map(p => (
            <div key={p.trade} style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>
                {p.trade === 'HVAC' ? '❄️' : p.trade === 'Electrical' ? '⚡' : p.trade === 'Plumbing' ? '🔧' : '🔥'}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>{p.trade}</div>
              <div style={{ color: '#9BB0CC', fontSize: 14, marginBottom: 2 }}>📅 {p.months} months</div>
              <div style={{ color: '#9BB0CC', fontSize: 14, marginBottom: 2 }}>💰 ${p.cost.toLocaleString()} tuition</div>
              <div style={{ color: '#9BB0CC', fontSize: 14, marginBottom: 2 }}>✅ {p.placement}% job placement</div>
              <div style={{ color: '#9BB0CC', fontSize: 14 }}>💵 ${p.startingWage}/hr starting</div>
              <div style={{ marginTop: 12, background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 8px', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
                ProLnk {p.proLnkTier}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Program</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Interested Trade</label>
              <select
                value={selectedTrade}
                onChange={e => setSelectedTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select trade</option>
                {programs.map(p => <option key={p.trade} value={p.trade}>{p.trade}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Starting Budget ($)</label>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                placeholder="e.g. 5000″
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <button
            onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Get Recommendation →
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 8 }}>✅ Best Fit: Collin College {result.trade}</div>
              <div style={{ color: '#ccc', fontSize: 15, lineHeight: 1.7 }}>
                <div>📅 Program length: <strong>{result.months} months</strong></div>
                <div>💰 Estimated tuition: <strong>${result.cost.toLocaleString()}</strong></div>
                <div>✅ Job placement rate: <strong>{result.placement}%</strong></div>
                <div>💵 Starting wage in DFW: <strong>${result.startingWage}/hr (${(result.startingWage * 2080).toLocaleString()}/yr)</strong></div>
                <div>📈 After 3 years: <strong>${Math.round(result.startingWage * 1.4 * 2080).toLocaleString()}/yr</strong></div>
                <div>🤝 ProLnk partnership tier: <strong>{result.proLnkTier}</strong> — guaranteed lead flow from day one</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🤝 Why ProLnk Partners with Collin Graduates</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            Collin College graduates enter high-demand trades in zip codes where homeowners are actively searching for qualified help.
            ProLnk routes verified leads directly to graduates who complete our partner onboarding—no cold calling, no marketing spend.
            Charter tier membership is reserved for early graduates who apply within 12 months of completing their program.
          </p>
        </div>

      </div>
    </div>
  );
}
