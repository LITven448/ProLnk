import { useState } from 'react';

const billRanges = ['$100-150/mo', '$150-200/mo', '$200-300/mo', '$300-400/mo', '$400+/mo'];
const roofSizes = ['Under 1,500 sqft', '1,500-2,500 sqft', '2,500-3,500 sqft', '3,500-5,000 sqft', '5,000+ sqft'];

type ResultType = { systemSize: string; grossCost: string; netCost: string; payback: string; annualSavings: string; monthlyOffset: string };
const results: Record<string, Record<string, ResultType>> = {
  '$100-150/mo': {
    'Under 1,500 sqft': { systemSize: '6 kW', grossCost: '$18,000', netCost: '$12,600', payback: '8-10 years', annualSavings: '$1,440', monthlyOffset: '70-80%' },
    '1,500-2,500 sqft': { systemSize: '7 kW', grossCost: '$21,000', netCost: '$14,700', payback: '9-11 years', annualSavings: '$1,500', monthlyOffset: '80-90%' },
  },
  '$150-200/mo': {
    'Under 1,500 sqft': { systemSize: '7 kW', grossCost: '$21,000', netCost: '$14,700', payback: '8-9 years', annualSavings: '$2,040', monthlyOffset: '75-85%' },
    '1,500-2,500 sqft': { systemSize: '8 kW', grossCost: '$24,000', netCost: '$16,800', payback: '8-10 years', annualSavings: '$2,100', monthlyOffset: '85-95%' },
    '2,500-3,500 sqft': { systemSize: '9 kW', grossCost: '$27,000', netCost: '$18,900', payback: '9-10 years', annualSavings: '$2,040', monthlyOffset: '90-100%' },
  },
  '$200-300/mo': {
    '1,500-2,500 sqft': { systemSize: '10 kW', grossCost: '$28,000', netCost: '$19,600', payback: '7-9 years', annualSavings: '$2,880', monthlyOffset: '80-95%' },
    '2,500-3,500 sqft': { systemSize: '11 kW', grossCost: '$31,000', netCost: '$21,700', payback: '7-9 years', annualSavings: '$2,880', monthlyOffset: '90-100%' },
    '3,500-5,000 sqft': { systemSize: '12 kW', grossCost: '$34,000', netCost: '$23,800', payback: '8-10 years', annualSavings: '$2,880', monthlyOffset: '75-90%' },
  },
  '$300-400/mo': {
    '2,500-3,500 sqft': { systemSize: '13 kW', grossCost: '$37,000', netCost: '$25,900', payback: '7-8 years', annualSavings: '$4,200', monthlyOffset: '90-100%' },
    '3,500-5,000 sqft': { systemSize: '14 kW', grossCost: '$39,500', netCost: '$27,650', payback: '7-9 years', annualSavings: '$4,200', monthlyOffset: '85-95%' },
    '5,000+ sqft': { systemSize: '16 kW', grossCost: '$44,000', netCost: '$30,800', payback: '8-10 years', annualSavings: '$4,200', monthlyOffset: '75-85%' },
  },
  '$400+/mo': {
    '3,500-5,000 sqft': { systemSize: '18 kW', grossCost: '$50,000', netCost: '$35,000', payback: '7-8 years', annualSavings: '$5,520', monthlyOffset: '85-95%' },
    '5,000+ sqft': { systemSize: '20 kW', grossCost: '$55,000', netCost: '$38,500', payback: '7-9 years', annualSavings: '$5,520', monthlyOffset: '80-90%' },
  },
};

const DEFAULT_RESULT: ResultType = { systemSize: '10 kW', grossCost: '$28,500', netCost: '$19,950', payback: '8-9 years', annualSavings: '$2,400', monthlyOffset: '80-90%' };

export default function DFWSolarPanelDFWCostGuide() {
  const [bill, setBill] = useState('');
  const [roof, setRoof] = useState('');
  const [showResults, setShowResults] = useState(false);

  const result: ResultType | null = showResults && bill && roof ? (results[bill]?.[roof] ?? DEFAULT_RESULT) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>☀️ DFW Solar</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Solar Panel Cost Guide — DFW 2026</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>DFW averages 229 sunny days per year — one of the best solar markets in the country. Here is what a system actually costs and when it pays back.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Average System Cost', value: '$18K-$35K', sub: 'Before incentives' },
            { label: 'Federal ITC (30%)', value: '$5,400-$10,500', sub: 'Direct tax credit' },
            { label: 'Net Cost Range', value: '$12,600-$24,500', sub: 'After 30% ITC' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#4A5568', fontSize: 12, marginTop: 2 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔢 Calculate Your System</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Monthly Electric Bill (Summer Peak)</label>
              <select value={bill} onChange={e => setBill(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select range...</option>
                {billRanges.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Home Roof Size (Usable South-Facing)</label>
              <select value={roof} onChange={e => setRoof(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select size...</option>
                {roofSizes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!bill || !roof} style={{ backgroundColor: bill && roof ? '#F5E642′ : '#1E3A5F', color: bill && roof ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: bill && roof ? 'pointer' : 'default' }}>
            Calculate My System →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 Your Estimated System</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { label: 'Recommended System', value: result.systemSize, color: '#F5E642′ },
                { label: 'Gross Installation Cost', value: result.grossCost, color: '#CBD5E1′ },
                { label: 'After 30% Federal ITC', value: result.netCost, color: '#10B981′ },
                { label: 'Estimated Payback', value: result.payback, color: '#F59E0B' },
                { label: 'Annual Bill Savings', value: result.annualSavings, color: '#10B981′ },
                { label: 'Monthly Bill Offset', value: result.monthlyOffset, color: '#8B5CF6′ },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: item.color, fontSize: 20, fontWeight: 800 }}>{item.value}</div>
                  <div style={{ color: '#9BA3B4', fontSize: 12, marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 16, backgroundColor: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <p style={{ color: '#CBD5E1', fontSize: 14, margin: 0 }}>💡 Oncor offers net metering — excess power sells back to the grid. DFW solar installers typically provide 25-year panel warranties and 10-year workmanship warranties.</p>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💰 DFW Financing Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { type: 'Solar Loan', rate: '6.99-9.99% APR', pro: 'You own the system, keep all incentives', con: 'Monthly payment required' },
              { type: 'Solar Lease', rate: '$80-150/mo fixed', pro: 'No upfront cost, predictable bill', con: 'Installer keeps tax credits' },
              { type: 'Power Purchase Agreement', rate: '8-12¢/kWh', pro: 'Pay only for power produced', con: 'Complicates home sale' },
            ].map(opt => (
              <div key={opt.type} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{opt.type}</div>
                <div style={{ color: '#10B981', fontSize: 13, marginBottom: 8 }}>{opt.rate}</div>
                <div style={{ color: '#CBD5E1', fontSize: 12, marginBottom: 4 }}>✅ {opt.pro}</div>
                <div style={{ color: '#EF4444', fontSize: 12 }}>⚠ {opt.con}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
