import { useState } from 'react';

const billRanges = ['$80–$120/mo', '$120–$180/mo', '$180–$250/mo', '$250–$350/mo', '$350+/mo'];
const roofSizes = ['Small (< 1,500 sq ft)', 'Medium (1,500–2,500 sq ft)', 'Large (2,500–3,500 sq ft)', 'Extra Large (3,500+ sq ft)'];

function calcSolar(bill: string, roof: string) {
  const avgBill: Record<string, number> = {
    '$80–$120/mo': 100, '$120–$180/mo': 150, '$180–$250/mo': 215,
    '$250–$350/mo': 300, '$350+/mo': 400,
  };
  const maxKw: Record<string, number> = {
    'Small (< 1,500 sq ft)': 6, 'Medium (1,500–2,500 sq ft)': 10,
    'Large (2,500–3,500 sq ft)': 14, 'Extra Large (3,500+ sq ft)': 18,
  };
  const monthlyBill = avgBill[bill];
  const annualKwh = (monthlyBill / 0.13) * 12;
  const systemKw = Math.min(Math.round(annualKwh / (5.5 * 365) * 10) / 10, maxKw[roof]);
  const grossCost = Math.round(systemKw * 2900);
  const federalCredit = Math.round(grossCost * 0.30);
  const netCost = grossCost - federalCredit;
  const annualSavings = Math.round(monthlyBill * 0.85 * 12);
  const payback = Math.round(netCost / annualSavings * 10) / 10;
  const lifetime = Math.round(annualSavings * 25 - netCost);
  return { systemKw, grossCost, federalCredit, netCost, annualSavings, payback, lifetime };
}

export default function DFWSolarPanelCostGuide() {
  const [selBill, setSelBill] = useState(2);
  const [selRoof, setSelRoof] = useState(1);
  const [showResult, setShowResult] = useState(false);

  const res = calcSolar(billRanges[selBill], roofSizes[selRoof]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '3px solid #F5E642' }}>
        <div style={{ fontSize: 48 }}>☀️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Solar Panel Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>DFW gets 5.5 sun hours per day — one of the best solar markets in the US. Calculate your system cost, incentives, and lifetime savings.</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📊', title: 'DFW Solar Basics', items: ['Avg system: 8–12 kW for DFW home', 'Gross cost: $22,000–$35,000', 'After federal credit: $15,000–$25,000', '5.5 peak sun hours/day (excellent)'] },
            { icon: '🏛️', title: '2026 Incentives', items: ['Federal ITC: 30% tax credit (IRA)', 'Texas: no state income tax, no penalty', 'Property tax exemption on added value', 'Net metering available (check your provider)'] },
            { icon: '⚡', title: 'DFW Energy Context', items: ['Avg home uses 14,000–18,000 kWh/year', 'Summer drives 40% of annual usage', 'TXU/Oncor avg rate: $0.12–0.15/kWh', 'Solar ROI strongest May–Sep in DFW'] },
            { icon: '🏗️', title: 'Installation Process', items: ['Site assessment: 1–2 hours', 'Permit + HOA approval: 2–4 weeks', 'Installation: 1–3 days', 'Oncor interconnection: 2–6 weeks'] },
          ].map((card) => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
                {card.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🧮 Solar Savings Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Enter your electric bill and roof size to get a personalized solar estimate for your DFW home.</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Average monthly electric bill?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {billRanges.map((b, i) => (
                <button key={b} onClick={() => { setSelBill(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selBill === i ? '#F5E642' : '#1e3a5f'}`, background: selBill === i ? '#F5E642' : '#0A1628', color: selBill === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>Usable roof space?</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {roofSizes.map((r, i) => (
                <button key={r} onClick={() => { setSelRoof(i); setShowResult(false); }} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selRoof === i ? '#F5E642' : '#1e3a5f'}`, background: selRoof === i ? '#F5E642' : '#0A1628', color: selRoof === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>{r}</button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Calculate My Solar Savings →</button>

          {showResult && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 16 }}>
                {[
                  { label: 'System Size', value: `${res.systemKw} kW`, sub: 'Recommended' },
                  { label: 'Gross Cost', value: `$${res.grossCost.toLocaleString()}`, sub: 'Before incentives' },
                  { label: 'Federal Credit', value: `$${res.federalCredit.toLocaleString()}`, sub: '30% IRA credit' },
                  { label: 'Net Cost', value: `$${res.netCost.toLocaleString()}`, sub: 'After credit', highlight: true },
                  { label: 'Annual Savings', value: `$${res.annualSavings.toLocaleString()}`, sub: 'Est. per year' },
                  { label: 'Payback Period', value: `${res.payback} yrs`, sub: 'Break-even point' },
                  { label: '25-Year Profit', value: `$${res.lifetime.toLocaleString()}`, sub: 'Lifetime savings', highlight: true },
                ].map((stat) => (
                  <div key={stat.label} style={{ background: '#0A1628', borderRadius: 12, padding: 16, border: `2px solid ${stat.highlight ? '#F5E642' : '#1e3a5f'}`, textAlign: 'center' }}>
                    <p style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{stat.label}</p>
                    <p style={{ color: stat.highlight ? '#F5E642' : '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>{stat.value}</p>
                    <p style={{ color: '#64748b', fontSize: 11 }}>{stat.sub}</p>
                  </div>
                ))}
              </div>
              <p style={{ color: '#64748b', fontSize: 12, textAlign: 'center' }}>* Estimates based on 5.5 DFW sun hours/day, $0.13/kWh rate, 0.5% annual rate increase</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
