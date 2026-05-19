import { useState } from 'react';

const loanTypes = ['Conventional', 'FHA', 'VA', 'Cash Purchase'];
const counties = ['Dallas County', 'Tarrant County', 'Collin County', 'Denton County', 'Rockwall County'];

const bringAlways = [
  '🪪 Government-issued photo ID (driver\’s license or passport)',
  '💵 Cashier\’s check or wire confirmation for closing costs',
  '📄 Any documents requested by title company in advance',
  '📱 Phone (you may need to confirm wire from your bank app)',
];

const loanExtras: Record<string, string[]> = {
  'Conventional': ['Pay stub or proof of income (if last-minute request)', 'Bank statements from the past 2 months'],
  'FHA': ['Proof of FHA case number completion', 'Any condition letters from underwriter'],
  'VA': ['Certificate of Eligibility (COE) if not already submitted', 'DD-214 if required by lender'],
  'Cash Purchase': ['Proof of funds letter from your bank', 'Source of funds documentation if large transfer'],
};

const countyNotes: Record<string, string> = {
  'Dallas County': 'Closing typically at a title company in downtown Dallas or Addison. Deeds filed with Dallas County Clerk — allow 2–4 weeks.',
  'Tarrant County': 'Fort Worth title companies handle most closings. County clerk recordings processed in 2–3 weeks.',
  'Collin County': 'Frisco, Plano, McKinney closings — County clerk in McKinney. Fast-growing market, confirm wire 48 hrs early.',
  'Denton County': 'Lewisville, Flower Mound, Argyle area closings. County clerk in Denton. Allow extra time for recording during busy spring.',
  'Rockwall County': 'Smaller county, closings often in Rockwall. Deed recording typically faster — 1–2 weeks.',
};

const timeline = [
  { time: '1–2 days before', step: 'Final walkthrough — confirm condition matches contract', note: 'Check that all negotiated repairs are complete' },
  { time: 'Morning of', step: 'Confirm wire transfer arrived at title company', note: 'Call title company — do not assume wire landed' },
  { time: 'At title company', step: 'Review and sign all documents (takes 60–90 min)', note: 'Buyer and seller may sign separately in TX' },
  { time: 'After signing', step: 'Title company submits to county for recording', note: 'Keys released after funding — often same day' },
  { time: 'Day of recording', step: 'You officially own the home', note: 'Usually same day for cash, 1 day later for financed' },
];

export default function DFWClosingDayGuide() {
  const [loanType, setLoanType] = useState('');
  const [county, setCounty] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW CLOSING DAY GUIDE</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>🔑 Your Closing Day in DFW</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0′ }}>Everything you need to walk out with your keys and zero surprises.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>💳 Loan Type</div>
            {loanTypes.map(t => (
              <button key={t} onClick={() => setLoanType(t)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: loanType === t ? '2px solid #F5E642′ : '1px solid #e2e8f0', background: loanType === t ? '#0A1628' : '#F9FAFB', color: loanType === t ? '#F5E642' : '#0A1628', fontWeight: loanType === t ? 700 : 400, cursor: ’pointer', fontSize: 14, marginBottom: 6 }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📍 DFW County</div>
            {counties.map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: county === c ? '2px solid #F5E642′ : '1px solid #e2e8f0', background: county === c ? '#0A1628' : '#F9FAFB', color: county === c ? '#F5E642' : '#0A1628', fontWeight: county === c ? 700 : 400, cursor: ’pointer', fontSize: 14, marginBottom: 6 }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>🎒 What to Bring — Everyone</div>
          {bringAlways.map(item => (
            <div key={item} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f1f5f9′ }}>{item}</div>
          ))}
          {loanType && loanExtras[loanType] && (
            <>
              <div style={{ fontWeight: 700, margin: '16px 0 8px', color: '#0A1628′ }}>📋 Additional for {loanType}</div>
              {loanExtras[loanType].map(item => (
                <div key={item} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid #f1f5f9', color: '#334155′ }}>📎 {item}</div>
              ))}
            </>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>⏱️ Closing Day Timeline</div>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{t.time}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.step}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>💡 {t.note}</div>
              </div>
            </div>
          ))}
        </div>

        {county && (
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📍 {county} Notes</div>
            <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{countyNotes[county]}</div>
          </div>
        )}
      </div>
    </div>
  );
}
