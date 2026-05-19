import { useState } from 'react';

const milestoneOptions = [
  'Survived first DFW summer ☀️',
  'Paid off a major repair 🔧',
  'Beat the property tax appraisal 📋',
  'Completed a major improvement 🏗️',
  'Built your first contractor relationship 🤝',
  'Got your foundation checked proactively ✅',
  'Refinanced at a better rate 📉',
  'Went a full year with no emergencies 🎉',
];

const equityTable = [
  { years: 1, avg: 5, equity: '~$17,500′ },
  { years: 3, avg: 16, equity: '~$56,000′ },
  { years: 5, avg: 27, equity: '~$94,500′ },
  { years: 8, avg: 45, equity: '~$157,500′ },
  { years: 12, avg: 71, equity: '~$248,500′ },
  { years: 15, avg: 92, equity: '~$322,000′ },
];

const nextSteps: Record<string, string[]> = {
  '1': ['Schedule your first professional inspection', 'Set up foundation soaker hose system', 'Open a home repair savings account — target $300/mo'],
  '3': ['Consider first major improvement for ROI', 'Review property tax appraisal — protest if over market', 'Explore ProLnk network for long-term contractor relationships'],
  '5': ['Mid-decade home audit — roof, HVAC, plumbing', 'Revisit homeowner insurance — your home is worth more now', 'Consider equity access for strategic improvements'],
  '10': ['Major systems approaching replacement age — plan ahead', 'Re-landscape for mature DFW aesthetic + water savings', 'Consider Home Health Vault to document and protect your asset'],
  '15': ['Legacy planning — estate, transfer, or major renovation decision', 'Full systems audit before any major transaction', 'You\’ve built serious wealth — protect and leverage it'],
};

export default function DFWHomeownerWins() {
  const [yearsOwned, setYearsOwned] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const toggle = (m: string) => setSelected(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  const equityRow = equityTable.reduce((prev, cur) => Math.abs(cur.years - yearsOwned) < Math.abs(prev.years - yearsOwned) ? cur : prev);

  const nextKey = Object.keys(nextSteps).reduce((prev, k) => Math.abs(Number(k) - yearsOwned) < Math.abs(Number(prev) - yearsOwned) ? k : prev, '1');

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', color: '#1A1A2E', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#2C7A3E', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: '#1A1A2E' }}>🏡 Celebrate Your DFW Homeowner Wins</h1>
        <p style={{ color: '#555', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          Homeownership is hard work — especially in DFW where the climate, property taxes, and foundation clay fight you every step of the way. You deserve to acknowledge what you've built, protected, and earned. This is your moment.
        </p>

        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>How many years have you owned your DFW home?</div>
          <input
            type="range" min={1} max={20} value={yearsOwned}
            onChange={e => setYearsOwned(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#2C7A3E', marginBottom: 8 }}
          />
          <div style={{ fontSize: 28, fontWeight: 800, color: '#2C7A3E' }}>{yearsOwned} year{yearsOwned !== 1 ? 's' : ''} 🎉</div>
          <div style={{ marginTop: 12, padding: '12px 16px', background: '#F0FFF4', borderRadius: 8, border: '1px solid #B2DFBB' }}>
            <div style={{ fontWeight: 700, marginBottom: 4, color: '#1A1A2E' }}>📈 Equity Built (DFW avg appreciation on $350K home)</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2C7A3E' }}>{equityRow.equity}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{equityRow.avg}% total appreciation at the {equityRow.years}-year mark in DFW</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #DDD', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Check off your wins 🏆</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {milestoneOptions.map(m => (
              <button
                key={m}
                onClick={() => toggle(m)}
                style={{
                  background: selected.includes(m) ? '#2C7A3E' : '#F8F6F0',
                  color: selected.includes(m) ? '#fff' : '#1A1A2E',
                  border: `2px solid ${selected.includes(m) ? '#2C7A3E' : '#DDD'}`,
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSummary(true)}
            disabled={selected.length === 0}
            style={{ marginTop: 16, background: selected.length > 0 ? '#1A1A2E' : '#CCC', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: selected.length > 0 ? 'pointer' : 'default', width: '100%' }}
          >
            🎊 See My Celebration Summary
          </button>
        </div>

        {showSummary && (
          <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #2C4A3E)', borderRadius: 16, padding: 28, marginBottom: 24, color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{yearsOwned} Years of DFW Homeownership — That's Real.</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 15, opacity: 0.85, marginBottom: 8 }}>You've checked off {selected.length} major win{selected.length !== 1 ? ’s' : ''}:</div>
              {selected.map(m => <div key={m} style={{ fontSize: 14, padding: '4px 0', opacity: 0.9 }}>✅ {m}</div>)}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>📌 What's Next for Year {yearsOwned + 1}</div>
              {(nextSteps[nextKey] || nextSteps['3']).map((n, i) => (
                <div key={i} style={{ fontSize: 14, padding: '5px 0', opacity: 0.9 }}>→ {n}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#fff', border: '1px solid #DDD', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ color: '#2C7A3E', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Keep building on your wins.</div>
          <div style={{ color: '#555', fontSize: 14 }}>ProLnk helps DFW homeowners maintain, improve, and protect their most important asset — before emergencies, not during them.</div>
        </div>
      </div>
    </div>
  );
}
