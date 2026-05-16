import { useState } from 'react';

const ACTIVITY_LEVELS = ['Low (5 matches/mo)', 'Medium (15 matches/mo)', 'High (30 matches/mo)', 'Power (60 matches/mo)'];
const MATCH_VALS = [5, 15, 30, 60];

export default function DFWProLnkCharterBenefitCalc() {
  const [activity, setActivity] = useState('');
  const [homes, setHomes] = useState('20');
  const [years, setYears] = useState('5');
  const [shown, setShown] = useState(false);

  const actIdx = ACTIVITY_LEVELS.indexOf(activity);
  const monthlyMatches = actIdx >= 0 ? MATCH_VALS[actIdx] : 0;
  const homeCount = parseInt(homes) || 0;
  const yearCount = parseInt(years) || 5;
  const months = yearCount * 12;

  const CHARTER_PRICE = 149;
  const FUTURE_PRICE = 249;
  const CHARTER_COMMISSION_RATE = 0.25;
  const FUTURE_COMMISSION_RATE = 0.20;
  const AVG_MATCH_VALUE = 350;
  const ORIGINATION_CHARTER = 0.015;
  const ORIGINATION_POST = 0.01;
  const AVG_ANNUAL_SERVICE = 2800;

  const charterSub = CHARTER_PRICE * months;
  const futureSub = FUTURE_PRICE * months;
  const subSavings = futureSub - charterSub;

  const charterMatchIncome = monthlyMatches * AVG_MATCH_VALUE * CHARTER_COMMISSION_RATE * months;
  const futureMatchIncome = monthlyMatches * AVG_MATCH_VALUE * FUTURE_COMMISSION_RATE * months;
  const commissionUpside = charterMatchIncome - futureMatchIncome;

  const charterOrigination = homeCount * AVG_ANNUAL_SERVICE * ORIGINATION_CHARTER * yearCount;
  const futureOrigination = homeCount * AVG_ANNUAL_SERVICE * ORIGINATION_POST * yearCount;
  const originationUpside = charterOrigination - futureOrigination;

  const charterTotal = charterMatchIncome + charterOrigination - charterSub;
  const futureTotal = futureMatchIncome + futureOrigination - futureSub;
  const totalAdvantage = charterTotal - futureTotal;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>Charter Member Benefit Calculator</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>See the full lifetime value of locking in Charter pricing before the waitlist closes</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Your Activity Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Monthly Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {ACTIVITY_LEVELS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Homes Registered</label>
              <input type='number' value={homes} onChange={e => setHomes(e.target.value)} min={1} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Projection (Years)</label>
              <select value={years} onChange={e => setYears(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['1','2','3','5','10'].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShown(true)} disabled={!activity} style={{ background: activity ? '#F5E642' : '#1E3A5F', color: activity ? '#0A1628' : '#445566', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: activity ? 'pointer' : 'not-allowed', width: '100%' }}>
            Calculate Charter vs Post-Close Value →
          </button>
        </div>

        {shown && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Subscription Savings', val: `$${subSavings.toLocaleString()}`, icon: '💳', note: `$${CHARTER_PRICE}/mo locked vs $${FUTURE_PRICE}/mo` },
              { label: 'Commission Advantage', val: `$${commissionUpside.toLocaleString()}`, icon: '📊', note: '25% rate vs 20% post-close' },
              { label: 'Origination Advantage', val: `$${originationUpside.toLocaleString()}`, icon: '🏠', note: '1.5% vs 1.0% origination rights' },
              { label: `${yearCount}-Year Net Advantage`, val: `$${totalAdvantage.toLocaleString()}`, icon: '🏆', note: 'Total Charter vs post-close', highlight: true },
            ].map((s, i) => (
              <div key={i} style={{ background: s.highlight ? '#1A3A00' : '#0D1F38', border: s.highlight ? '2px solid #F5E642' : '1px solid #1E3A5F', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{s.val}</div>
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: '4px 0 2px' }}>{s.label}</div>
                <div style={{ color: '#8899AA', fontSize: 12 }}>{s.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
