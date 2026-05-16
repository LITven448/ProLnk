import { useState } from 'react';

const activityLevels = [
  { label: 'Casual (1–5 hrs/wk)', value: 'casual' },
  { label: 'Part-Time (5–15 hrs/wk)', value: 'parttime' },
  { label: 'Active (15–25 hrs/wk)', value: 'active' },
  { label: 'Full Commitment (25+ hrs/wk)', value: 'full' },
];

const leaderboardResults: Record<string, { tier: string; rank: string; benefits: string[]; improve: string[] }> = {
  casual: {
    tier: 'Bronze',
    rank: 'Top 60–80%',
    benefits: ['Monthly leaderboard visibility', 'Basic recognition badge', 'Community newsletter mention'],
    improve: ['Increase to 10+ matches/month', 'Add 2+ partners to your network', 'Join weekly DFW partner calls'],
  },
  parttime: {
    tier: 'Silver',
    rank: 'Top 30–60%',
    benefits: ['Quarterly bonus pool eligibility', 'Silver badge on profile', 'Priority support access', 'Regional leaderboard placement'],
    improve: ['Push matches to 25+/month', 'Activate dormant partners in your network', 'Add 5+ homes/month to Vault'],
  },
  active: {
    tier: 'Gold',
    rank: 'Top 10–30%',
    benefits: ['Monthly bonus pool share', 'Gold badge + recognition event invite', 'Featured in DFW partner spotlight', 'Higher lead priority in your area'],
    improve: ['Reach 50+ matches/month consistently', 'Build network to 20+ active partners', 'Maintain 90%+ network activation rate'],
  },
  full: {
    tier: 'Platinum',
    rank: 'Top 5–10%',
    benefits: ['Largest bonus pool share', 'Platinum badge + Charter event access', 'Named in DFW annual report', 'Direct access to ProLnk DFW leadership', 'Highest lead priority across all trades'],
    improve: ['Sustain 100+ matches/month', 'Coach Silver/Gold partners to level up', 'Maintain 95%+ partner activation rate'],
  },
};

const metrics = [
  { icon: '🔁', label: 'Matches Facilitated', desc: 'Total referrals to service professionals' },
  { icon: '🏠', label: 'Homes Added', desc: 'Properties added to the Home Health Vault' },
  { icon: '👥', label: 'Partner Recruits', desc: 'Partners directly brought into your network' },
  { icon: '⚡', label: 'Network Activation Rate', desc: 'Percentage of your recruits who are active' },
];

export default function DFWProLnkDFWLeaderboard() {
  const [activity, setActivity] = useState('active');
  const result = leaderboardResults[activity];

  const tierColors: Record<string, string> = { Bronze: '#CD7F32', Silver: '#94A3B8', Gold: '#F59E0B', Platinum: '#F5E642' };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📊</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '0.5rem 0 0' }}>DFW Partner Leaderboard</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>How performance ranking works and why it matters for your income</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {metrics.map(m => (
            <div key={m.label} style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '1.5rem' }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginTop: 4 }}>{m.label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: 2 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem' }}>Where Would You Rank?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {activityLevels.map(a => (
              <button key={a.value} onClick={() => setActivity(a.value)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: `2px solid ${activity === a.value ? '#F5E642' : '#1E3A5F'}`, backgroundColor: activity === a.value ? '#1E3A5F' : 'transparent', color: activity === a.value ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}>
                {a.label}
              </button>
            ))}
          </div>
          <div style={{ color: tierColors[result.tier], fontSize: '1.5rem', fontWeight: 700 }}>{result.tier} Tier — {result.rank}</div>
          <h3 style={{ color: '#fff', margin: '1rem 0 0.5rem' }}>Your Benefits</h3>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {result.benefits.map((b, i) => <li key={i} style={{ color: '#CBD5E1', marginBottom: '0.4rem' }}>{b}</li>)}
          </ul>
          <h3 style={{ color: '#fff', margin: '1rem 0 0.5rem' }}>To Move Up</h3>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {result.improve.map((b, i) => <li key={i} style={{ color: '#94A3B8', marginBottom: '0.4rem' }}>{b}</li>)}
          </ul>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem' }}>💡 Why Leaderboard Rank Matters</div>
          <div style={{ color: '#94A3B8', marginTop: '0.5rem', lineHeight: 1.6 }}>Higher-ranked partners get priority lead routing, access to exclusive bonus pools, and enhanced visibility in the DFW market — directly increasing all 5 income streams.</div>
        </div>
      </div>
    </div>
  );
}
