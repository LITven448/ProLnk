import { useState } from 'react';

const LEVELS = ['New Partner', 'Active Partner', 'Pro Partner', 'Champion'];
const CHAMPION_INCOME = { matches: 4200, network: 1800, sub: 890, origination: 320 };

const LEVEL_DATA = [
  { matches: 0, network: 0, sub: 0, origination: 0, partners: 0 },
  { matches: 480, network: 120, sub: 60, origination: 0, partners: 2 },
  { matches: 1440, network: 480, sub: 240, origination: 80, partners: 8 },
  { ...CHAMPION_INCOME, partners: 25 },
];

const CHAMPION_ACTIONS = [
  { icon: '📞', action: 'Weekly outreach to 10 DFW pros in your trade network', impact: '+2–3 recruits/mo' },
  { icon: '🤝', action: 'Host monthly DFW contractor meetup or virtual Q&A', impact: '+Trust & referrals' },
  { icon: '📱', action: 'Share 2 social posts/week about ProLnk wins in DFW', impact: '+Organic pipeline' },
  { icon: '🎯', action: 'Onboard each new recruit personally in first 48 hrs', impact: '-Attrition by 40%' },
  { icon: '📊', action: 'Review your team\’s match rates monthly, coach low performers', impact: '+Team income' },
  { icon: '🏆', action: 'Target DFW trade expos (PHCC, NECA, ABC events)', impact: '+Bulk recruiting' },
];

export default function DFWProLnkChampionGuide() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const current = LEVEL_DATA[currentLevel];
  const champion = LEVEL_DATA[3];

  const incomeGap = {
    matches: champion.matches - current.matches,
    network: champion.network - current.network,
    sub: champion.sub - current.sub,
    origination: champion.origination - current.origination,
  };
  const totalCurrent = current.matches + current.network + current.sub + current.origination;
  const totalChampion = champion.matches + champion.network + champion.sub + champion.origination;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🏆 ProLnk Champion Partner Guide</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>See what top DFW ProLnk Champions do differently — and your gap to Champion income.</p>
      <label style={{ color: '#F5E642′ }}>Your Current Level
        <select value={currentLevel} onChange={e => setCurrentLevel(+e.target.value)} style={{ display: 'block', width: '100%', maxWidth: 560, marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
          {LEVELS.map((l, i) => <option key={i} value={i}>{l}</option>)}
        </select>
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem', maxWidth: 560 }}>
        <div style={{ background: '#1e2d45', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.5rem' }}>YOUR CURRENT INCOME</div>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.8rem' }}>${totalCurrent.toLocaleString()}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>/mo</span></div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            <div>Match commissions: ${current.matches}</div>
            <div>Network override: ${current.network}</div>
            <div>Sub override: ${current.sub}</div>
            <div>Origination: ${current.origination}</div>
          </div>
        </div>
        <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.5rem' }}>🏆 CHAMPION INCOME</div>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.8rem' }}>${totalChampion.toLocaleString()}<span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>/mo</span></div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
            <div>Match commissions: ${champion.matches}</div>
            <div>Network override: ${champion.network}</div>
            <div>Sub override: ${champion.sub}</div>
            <div>Origination: ${champion.origination}</div>
          </div>
        </div>
      </div>
      {currentLevel < 3 && (
        <div style={{ background: '#1e2d45', borderRadius: 10, padding: '1rem', marginTop: '1rem', maxWidth: 560 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Your Gap to Champion</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <span style={{ background: '#0A1628', borderRadius: 6, padding: '0.3rem 0.6rem' }}>+{champion.partners - current.partners} partners needed</span>
            <span style={{ background: '#0A1628', borderRadius: 6, padding: '0.3rem 0.6rem' }}>+${incomeGap.matches + incomeGap.network + incomeGap.sub + incomeGap.origination}/mo upside</span>
          </div>
        </div>
      )}
      <div style={{ marginTop: '1.25rem', maxWidth: 560 }}>
        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>What Champions Do Differently</div>
        {CHAMPION_ACTIONS.map((a, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.3rem' }}>{a.icon}</span>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{a.action}</div>
              <div style={{ color: '#F5E642', fontSize: '0.78rem', marginTop: '0.2rem' }}>{a.impact}</div>
            </div>
          </div>
        ))}
      </div>
      {currentLevel === 3 && (
        <div style={{ background: '#1e3a5f', border: '2px solid #F5E642', borderRadius: 10, padding: '1rem', marginTop: '1rem', maxWidth: 560, textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🏆</div>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>You are a Champion — keep recruiting and coaching your DFW team to multiply income further.</div>
        </div>
      )}
    </div>
  );
}
