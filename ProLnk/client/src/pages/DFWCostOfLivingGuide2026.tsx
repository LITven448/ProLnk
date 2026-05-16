import { useState } from 'react';

const states = [
  { name: 'California', incomeTax: 13.3, housingPremium: 180 },
  { name: 'New York', incomeTax: 10.9, housingPremium: 160 },
  { name: 'Texas (already)', incomeTax: 0, housingPremium: 0 },
  { name: 'Illinois', incomeTax: 4.95, housingPremium: 20 },
  { name: 'Florida', incomeTax: 0, housingPremium: 40 },
  { name: 'Washington', incomeTax: 0, housingPremium: 90 },
];

const incomes = [60000, 100000, 150000, 200000, 300000];

export default function DFWCostOfLivingGuide2026() {
  const [origin, setOrigin] = useState(0);
  const [income, setIncome] = useState(100000);

  const st = states[origin];
  const taxSavings = Math.round(income * (st.incomeTax / 100));
  const propTaxExtra = 6000;
  const housingSavings = st.housingPremium * 12;
  const netAnnual = taxSavings + housingSavings - propTaxExtra;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW Cost of Living Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>How Dallas-Fort Worth stacks up against the national average and what moving here actually saves you.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', label: 'Housing vs NYC/LA', value: '20% Below', sub: 'Median DFW home $390K' },
            { icon: '💰', label: 'State Income Tax', value: '0%', sub: 'Saves $8K-$20K+/yr vs CA/NY' },
            { icon: '⚡', label: 'Avg Summer Utilities', value: '$200/mo', sub: 'AC-heavy but manageable' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: '20px 18px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{card.value}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{card.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#132040', borderRadius: 14, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Your DFW Financial Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Origin State</label>
              <select value={origin} onChange={(e) => setOrigin(Number(e.target.value))} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
                {states.map((s, i) => <option key={s.name} value={i}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Annual Income</label>
              <select value={income} onChange={(e) => setIncome(Number(e.target.value))} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
                {incomes.map((i) => <option key={i} value={i}>${"{i.toLocaleString()}"}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: '✅ Income Tax Savings', value: `+$${"{taxSavings.toLocaleString()}"}/yr`, color: '#22C55E' },
              { label: '✅ Housing Cost Savings', value: `+$${"{housingSavings.toLocaleString()}"}/yr`, color: '#22C55E' },
              { label: '⚠️ Property Tax Offset', value: `-$${"{propTaxExtra.toLocaleString()}"}/yr`, color: '#F59E0B' },
            ].map((row) => (
              <div key={row.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{"{row.label}"}</div>
                <div style={{ color: row.color, fontSize: 20, fontWeight: 800 }}>{"{row.value}"}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
            <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 600 }}>Estimated Net Annual Benefit Moving to DFW</div>
            <div style={{ color: '#0A1628', fontSize: 32, fontWeight: 900 }}>{"{netAnnual >= 0 ? '+' : ''}"}${"{netAnnual.toLocaleString()}"}/yr</div>
          </div>
        </div>
        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 DFW vs National Benchmarks</h2>
          {[
            { category: 'Median Home Price', dfw: '$390K', national: '$430K', rating: '✅ Below avg' },
            { category: 'State Income Tax', dfw: '0%', national: '4.6% avg', rating: '✅ Major advantage' },
            { category: 'Property Tax Rate', dfw: '1.8-2.5%', national: '1.1% avg', rating: '⚠️ Higher' },
            { category: 'Groceries', dfw: '4% below avg', national: '-', rating: '✅ Slight savings' },
            { category: 'Healthcare', dfw: '2% above avg', national: '-', rating: '➖ Neutral' },
            { category: 'Gasoline', dfw: '$0.05 below avg', national: '-', rating: '✅ Small savings' },
          ].map((row) => (
            <div key={row.category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E3A5F' }}>
              <span style={{ color: '#94A3B8', fontSize: 14 }}>{"{row.category}"}</span>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{"{row.dfw}"}</span>
              <span style={{ color: '#64748B', fontSize: 13 }}>{"{row.national}"}</span>
              <span style={{ fontSize: 13 }}>{"{row.rating}"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}