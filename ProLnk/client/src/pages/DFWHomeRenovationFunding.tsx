import { useState } from 'react';

const FUNDING = [
  { id: 'heloc', label: 'HELOC', rate: '7-9%', type: 'Revolving credit line', pro: 'Draw only what you need, interest only on balance', con: 'Variable rate, requires 20% equity', best: 'Phased renovations over time' },
  { id: 'home-equity', label: 'Home Equity Loan', rate: '7-8%', type: 'Lump sum fixed loan', pro: 'Fixed rate and payment, predictable', con: 'Full amount upfront, closing costs 2-5%', best: 'Single large project with known cost' },
  { id: 'personal', label: 'Personal Loan', rate: '10-20%', type: 'Unsecured fixed loan', pro: 'No equity needed, fast approval (1-3 days)', con: 'Higher rate, lower limits ($50K max typical)', best: 'No equity, good credit, project under $40K' },
  { id: '401k', label: '401k Loan', rate: '5-6%', type: 'Loan against retirement', pro: 'No credit check, you pay yourself interest', con: 'Reduces retirement growth, taxes if you leave job', best: 'Last resort: strong job security, small amount' },
  { id: 'cc', label: 'Credit Card', rate: '18-28%', type: 'Revolving credit', pro: '0% intro offers exist (12-18 months)', con: 'Highest rate after promo ends, low limits', best: 'Under $10K project you can pay off in 12 months' },
  { id: 'contractor', label: 'Contractor Financing', rate: '9-14%', type: 'Dealer arranged loan', pro: 'Bundled with project, easy approval', con: 'Rate varies, contractor markup possible', best: 'HVAC, roofing, windows replacements' },
  { id: 'family', label: 'Family Loan', rate: '0-3%', type: 'Informal loan', pro: 'Low/no interest, flexible terms', con: 'Relationship risk, IRS gift tax rules above $18K/yr', best: 'Trusted family, documented loan agreement' },
];

const COSTS = [5000, 15000, 30000, 60000, 100000, 200000];
const EQUITIES = ['None', 'Less than 20%', '20-40%', 'Over 40%'];
const CREDITS = ['Excellent (750+)', 'Good (680-749)', 'Fair (620-679)', 'Poor (below 620)'];

export default function DFWHomeRenovationFunding() {
  const [cost, setCost] = useState(30000);
  const [equity, setEquity] = useState('20-40%');
  const [credit, setCredit] = useState('Good (680-749)');

  const ranked = FUNDING.filter(f => {
    if (f.id === 'heloc' || f.id === 'home-equity') return equity !== 'None' && equity !== 'Less than 20%';
    if (f.id === 'personal') return credit !== 'Poor (below 620)';
    return true;
  });

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2332', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER FINANCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#0A1628' }}>Renovation Funding Guide</h1>
        <p style={{ color: '#5A6A7E', fontSize: 15, margin: '0 0 32px' }}>Compare all funding options for DFW homeowners based on your situation.</p>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>Your Situation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#5A6A7E', display: 'block', marginBottom: 6 }}>Renovation Cost</label>
              <select value={cost} onChange={e => setCost(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D0D8E4', fontSize: 14, background: '#fff' }}>
                {COSTS.map(c => <option key={c} value={c}>${c.toLocaleString()}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#5A6A7E', display: 'block', marginBottom: 6 }}>Home Equity</label>
              <select value={equity} onChange={e => setEquity(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D0D8E4', fontSize: 14, background: '#fff' }}>
                {EQUITIES.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#5A6A7E', display: 'block', marginBottom: 6 }}>Credit Profile</label>
              <select value={credit} onChange={e => setCredit(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D0D8E4', fontSize: 14, background: '#fff' }}>
                {CREDITS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ranked.map((f, i) => (
            <div key={f.id} style={{ background: '#FFFFFF', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: i === 0 ? '4px solid #F5E642' : '4px solid #E8EDF5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  {i === 0 && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 4, marginRight: 8 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 800, fontSize: 16 }}>{f.label}</span>
                </div>
                <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '4px 10px', fontSize: 13, fontWeight: 700 }}>{f.rate}</div>
              </div>
              <div style={{ fontSize: 12, color: '#5A6A7E', marginBottom: 8 }}>{f.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: '#2A7A4B' }}>+ {f.pro}</div>
                <div style={{ color: '#C0392B' }}>- {f.con}</div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: '#5A6A7E' }}>Best for: <strong>{f.best}</strong></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
