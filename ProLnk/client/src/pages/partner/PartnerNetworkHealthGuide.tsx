import { useState } from 'react';

export default function PartnerNetworkHealthGuide() {
  const [totalPartners, setTotalPartners] = useState('');
  const [activePartners, setActivePartners] = useState('');
  const [homesRegistered, setHomesRegistered] = useState('');
  const [lastMonthRecruits, setLastMonthRecruits] = useState('');
  const [showResults, setShowResults] = useState(false);

  const total = parseInt(totalPartners) || 0;
  const active = parseInt(activePartners) || 0;
  const homes = parseInt(homesRegistered) || 0;
  const recruits = parseInt(lastMonthRecruits) || 0;

  const activeRate = total > 0 ? Math.round((active / total) * 100) : 0;
  const homesPerPartner = active > 0 ? (homes / active).toFixed(1) : '0';

  const getHealthScore = () => {
    let score = 0;
    if (activeRate >= 70) score += 40;
    else if (activeRate >= 50) score += 25;
    else if (activeRate >= 30) score += 10;
    if (parseFloat(homesPerPartner) >= 5) score += 30;
    else if (parseFloat(homesPerPartner) >= 2) score += 18;
    else if (parseFloat(homesPerPartner) >= 1) score += 8;
    if (recruits >= 3) score += 30;
    else if (recruits >= 1) score += 18;
    return score;
  };

  const score = getHealthScore();
  const scoreColor = score >= 75 ? '#22C55E' : score >= 50 ? '#EAB308' : '#EF4444';
  const scoreLabel = score >= 75 ? 'Healthy' : score >= 50 ? 'Needs Attention' : 'At Risk';

  const getActions = () => {
    const actions = [];
    if (activeRate < 50) actions.push({ severity: 'high', text: 'Active rate below 50% — launch a reactivation campaign this week. Personal calls to every lapsed partner.' });
    if (activeRate >= 50 && activeRate < 70) actions.push({ severity: 'medium', text: 'Active rate in warning zone — identify which partners have gone quiet and reach out with a specific ask, not a check-in.' });
    if (parseFloat(homesPerPartner) < 2) actions.push({ severity: 'high', text: 'Homeowner origination is low — run a team challenge: most homes registered this week wins. Set a clear team target.' });
    if (parseFloat(homesPerPartner) >= 2 && parseFloat(homesPerPartner) < 5) actions.push({ severity: 'medium', text: 'Homeowner volume is decent but below peak. Share top performer homeowner scripts with the full team.' });
    if (recruits === 0) actions.push({ severity: 'high', text: 'Zero new recruits last month — your network is not growing. Focus all of next week on personal recruiting conversations.' });
    if (recruits >= 1 && recruits < 3) actions.push({ severity: 'medium', text: 'Recruiting is below target — run a referral contest: existing partners who refer a new recruit get a recognition bonus.' });
    if (actions.length === 0) actions.push({ severity: 'low', text: 'Network is performing well. Focus this month on developing your top 3 partners into sub-leaders.' });
    return actions;
  };

  const warningSignsData = [
    { sign: 'Partner stops opening team messages', meaning: 'Early disengagement — act within 7 days', action: 'Personal text or call, not a group message' },
    { sign: 'No recruits after 30 days', meaning: 'Confidence or knowledge gap', action: 'Role-play a recruiting conversation together' },
    { sign: 'Zero homeowners registered after 14 days', meaning: 'Missing the origination opportunity', action: 'Share the homeowner acquisition script directly' },
    { sign: 'Partner starts asking fewer questions', meaning: 'Disengaging from the community', action: 'Schedule a vision-reset 1:1 call' },
    { sign: 'Partner misses 2+ team calls', meaning: 'Commitment is fading', action: 'Direct conversation: are they still in?' },
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Network Health Guide</h1>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            A healthy network earns more than a large one. Track these metrics monthly and act fast when warning signs appear.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 What Active Means at Each Level</h2>
          {[
            ['Charter Partner', 'Logged into dashboard in last 30 days AND registered at least 1 homeowner in last 60 days'],
            ['Founding Partner', 'All Charter criteria PLUS recruited at least 1 new partner in last 90 days'],
            ['Level 3 Partner', 'All Founding criteria PLUS their network has at least 5 active partners under them'],
            ['Level 4 Partner', 'All L3 criteria PLUS running regular team calls and developing sub-leaders'],
          ].map(([level, def]) => (
            <div key={level} style={{ display: 'flex', gap: 12, padding: 12, marginBottom: 8, backgroundColor: '#F9FAFB', borderRadius: 8 }}>
              <div style={{ minWidth: 130, fontSize: 13, fontWeight: 700, color: '#0369A1' }}>{level}</div>
              <div style={{ fontSize: 13, color: '#374151' }}>{def}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚠️ Warning Signs of Disengagement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {warningSignsData.map(w => (
              <div key={w.sign} style={{ padding: 14, backgroundColor: '#FEF9C3', borderRadius: 8, borderLeft: '3px solid #EAB308' }}>
                <p style={{ fontWeight: 700, fontSize: 13, color: '#0A1628', margin: '0 0 4px 0' }}>🚨 {w.sign}</p>
                <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 4px 0' }}>Means: {w.meaning}</p>
                <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>Action: {w.action}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🩺 Network Health Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Total Partners', value: totalPartners, setter: setTotalPartners, placeholder: 'e.g. 30' },
              { label: 'Active Partners (last 30 days)', value: activePartners, setter: setActivePartners, placeholder: 'e.g. 18' },
              { label: 'Homes Registered (all time)', value: homesRegistered, setter: setHomesRegistered, placeholder: 'e.g. 85' },
              { label: 'New Recruits Last Month', value: lastMonthRecruits, setter: setLastMonthRecruits, placeholder: 'e.g. 4' },
            ].map(field => (
              <div key={field.label}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>{field.label}</p>
                <input
                  type="number" value={field.value} onChange={e => { field.setter(e.target.value); setShowResults(false); }}
                  placeholder={field.placeholder}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, color: '#0A1628', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowResults(true)}
            style={{ width: '100%', padding: '12px 20px', backgroundColor: '#0A1628', color: '#F5E642', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
          >
            Calculate Network Health
          </button>
          {showResults && total > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: scoreColor, margin: '0 0 4px 0' }}>{score}</p>
                  <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>Health Score (100)</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: scoreColor, margin: '4px 0 0 0' }}>{scoreLabel}</p>
                </div>
                <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', margin: '0 0 4px 0' }}>{activeRate}%</p>
                  <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>Active Rate</p>
                </div>
                <div style={{ padding: 16, backgroundColor: '#F9FAFB', borderRadius: 10, textAlign: 'center' }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', margin: '0 0 4px 0' }}>{homesPerPartner}</p>
                  <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>Homes/Partner</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {getActions().map((action, i) => (
                  <div key={i} style={{ padding: 14, borderRadius: 8, borderLeft: '3px solid', borderColor: action.severity === 'high' ? '#EF4444' : action.severity === 'medium' ? '#EAB308' : '#22C55E', backgroundColor: action.severity === 'high' ? '#FEF2F2' : action.severity === 'medium' ? '#FEF9C3' : '#F0FDF4' }}>
                    <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{action.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
