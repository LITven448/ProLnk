import { useState } from 'react';

const weeks = [
  { week: 'Week 1–2', title: 'Foundation', emoji: '🏗️', tasks: ['Finalize your pitch: "I help tradespeople get more jobs and homeowners find trusted pros"', 'List 30 people you know in trades, real estate, or home services', 'Set up your ProLnk partner profile and referral link', 'Have 5 conversations — no selling, just sharing what you\'re building'] },
  { week: 'Week 3–4', title: 'First Signups', emoji: '🌱', tasks: ['Aim for 2–3 sub-partners signed up from your warm list', 'Attend one local trades or real estate networking event', 'Post once on LinkedIn or Nextdoor about ProLnk (genuine, not spammy)', 'Follow up with everyone you spoke to in Week 1–2'] },
  { week: 'Week 5–7', title: 'Referral Chain', emoji: '🔗', tasks: ['Coach your first 2–3 partners to share with their own contacts', 'Introduce your network to the 5-stream income model', 'Connect with 2 HOA managers or property management companies', 'Track your referral tree — who has who signed up?'] },
  { week: 'Week 8–10', title: 'Scale', emoji: '📈', tasks: ['You should now have 5–7 sub-partners; aim for 10 by Day 90', 'Hold a 30-minute "partner hour" call with your team weekly', 'Help your partners sign their first sub-partners (creates depth)', 'Document what\'s working for your specific market'] },
  { week: 'Week 11–13', title: 'Lock In', emoji: '🔒', tasks: ['Celebrate wins publicly — share your team\'s total earnings', 'Identify your 2–3 most active partners and invest in their growth', 'Review your income projection and set Q2 targets', 'Start prospecting for your second tier of HOA/property contacts'] },
];

const prospects = [
  { type: 'Tradespeople', emoji: '🔧', examples: 'Plumbers, electricians, HVAC techs, roofers, painters, landscapers', pitch: '"You already do great work — ProLnk helps you get more jobs without chasing leads. I can show you how it pays on top of your regular work."', where: 'Nextdoor, local trade Facebook groups, Chamber of Commerce, home improvement stores' },
  { type: 'Homeowners', emoji: '🏠', examples: 'Neighbors, family friends, HOA members, local community groups', pitch: '"Ever struggle to find a trustworthy plumber on short notice? ProLnk fixes that — and if you refer pros or homeowners, you can actually earn from it."', where: 'Neighborhood apps, local Facebook groups, churches, school networks' },
  { type: 'HOA Managers', emoji: '🏘️', examples: 'Property managers, HOA board members, apartment complex staff', pitch: '"Your residents always need trusted home service pros. ProLnk gives you a vetted network to recommend — and a revenue share for every homeowner you bring in."', where: 'LinkedIn, Chamber events, property management associations, IREM chapters' },
];

export default function NetworkGrowthPlaybook() {
  const [teamSize, setTeamSize] = useState('');
  const [avgJob, setAvgJob] = useState('');
  const [projection, setProjection] = useState<null | { mo1: number; mo3: number; mo6: number; mo12: number }>(null);

  const calculate = () => {
    const team = parseInt(teamSize, 10);
    const job = parseFloat(avgJob);
    if (isNaN(team) || isNaN(job) || team <= 0 || job <= 0) return;
    const monthlyOverride = team * job * 0.04 * 2;
    const subOverride = team * 149 * 0.10;
    const mo1 = Math.round(monthlyOverride * 0.3 + subOverride * 0.3);
    const mo3 = Math.round(monthlyOverride * 0.7 + subOverride * 0.7);
    const mo6 = Math.round(monthlyOverride + subOverride);
    const mo12 = Math.round((monthlyOverride + subOverride) * 1.4);
    setProjection({ mo1, mo3, mo6, mo12 });
  };

  return (
    <div style={{ background: '#f8f9fc', minHeight: '100vh', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🚀</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', color: '#fff' }}>Network Growth Playbook</h1>
        <p style={{ color: '#F5E642', fontWeight: 600, fontSize: 16, margin: 0 }}>Build a Team of 10 Sub-Partners in 90 Days</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 48 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e0e6f0', boxShadow: '0 2px 12px rgba(10,22,40,0.06)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>📌 The 90-Day Target</h2>
            <p style={{ color: '#4a5a78', lineHeight: 1.7, margin: 0 }}>
              10 active sub-partners generating 2+ jobs/month each, with at least 3 of them building their own sub-networks. At this point your passive income from ProLnk subscription overrides and job commission cascades compounds faster than any single job could.
            </p>
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', marginBottom: 20 }}>📅 Week-by-Week Plan</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {weeks.map(w => (
              <div key={w.week} style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid #e0e6f0', boxShadow: '0 2px 8px rgba(10,22,40,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#0A1628' }}>{w.week}: {w.title}</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {w.tasks.map(t => (
                    <div key={t} style={{ display: 'flex', gap: 10, color: '#4a5a78', fontSize: 14, lineHeight: 1.5 }}>
                      <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: 4, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 800, marginTop: 2 }}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', marginBottom: 20 }}>🎯 3 Prospect Categories</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {prospects.map(p => (
              <div key={p.type} style={{ background: '#fff', borderRadius: 14, padding: 26, border: '1px solid #e0e6f0', boxShadow: '0 2px 8px rgba(10,22,40,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{p.emoji}</span>
                  <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#0A1628' }}>{p.type}</h3>
                </div>
                <p style={{ color: '#4a5a78', margin: '0 0 12px', fontSize: 14 }}><strong>Examples:</strong> {p.examples}</p>
                <div style={{ background: '#f0f4ff', borderRadius: 10, padding: 16, marginBottom: 12, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontWeight: 700, fontSize: 12, color: '#0A1628', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Conversation Script</div>
                  <p style={{ margin: 0, color: '#2a3a5a', fontStyle: 'italic', lineHeight: 1.6, fontSize: 14 }}>{p.pitch}</p>
                </div>
                <p style={{ color: '#6a7a95', margin: 0, fontSize: 13 }}>📍 Where to find them: {p.where}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48, background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e0e6f0', boxShadow: '0 2px 12px rgba(10,22,40,0.06)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>📊 90-Day Income Projection</h2>
          <p style={{ color: '#6a7a95', marginBottom: 28 }}>Estimate your passive income as your network grows. Based on ProLnk's 4% job override + 10% subscription cascade.</p>

          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 15, color: '#0A1628' }}>Your Team Size (sub-partners)</label>
              <input
                type="number"
                value={teamSize}
                onChange={e => { setTeamSize(e.target.value); setProjection(null); }}
                placeholder="e.g. 10"
                style={{ background: '#f8f9fc', border: '2px solid #e0e6f0', color: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 15, color: '#0A1628' }}>Average Job Value ($)</label>
              <input
                type="number"
                value={avgJob}
                onChange={e => { setAvgJob(e.target.value); setProjection(null); }}
                placeholder="e.g. 1200"
                style={{ background: '#f8f9fc', border: '2px solid #e0e6f0', color: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', padding: '14px 28px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}
          >
            Project My Income →
          </button>

          {projection && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14 }}>
              {[['Month 1', projection.mo1, '#8a9ab5'], ['Month 3', projection.mo3, '#6bcf8a'], ['Month 6', projection.mo6, '#F5E642'], ['Month 12', projection.mo12, '#7aa8ff']].map(([label, val, color]) => (
                <div key={String(label)} style={{ background: '#f0f4ff', borderRadius: 12, padding: 18, textAlign: 'center', border: `1px solid ${color}44` }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: String(color) }}>${Number(val).toLocaleString()}/mo</div>
                  <div style={{ color: '#6a7a95', marginTop: 4, fontSize: 13 }}>{label}</div>
                </div>
              ))}
            </div>
          )}
          <p style={{ color: '#9aa8c0', fontSize: 12, marginTop: 16, marginBottom: 0 }}>* Projections assume 2 jobs/month per partner, ramp period in months 1–3, and compound growth from partners recruiting partners.</p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 16 }}>💡 Partner Success Principles</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {['Lead with value, not the income opportunity — the income follows naturally', 'Your best partners are already trusted in their community, not just hungry for cash', 'Help your team succeed before you worry about your own numbers', 'Consistency beats intensity — 3 conversations a day beats 30 in one week', 'Document your wins and share them with your network regularly', 'Depth beats width — one well-supported partner outperforms five neglected ones'].map(item => (
              <div key={item} style={{ background: '#fff', borderRadius: 10, padding: '14px 20px', color: '#4a5a78', display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid #e0e6f0', lineHeight: 1.6, fontSize: 15 }}>
                <span style={{ color: '#0A1628', fontWeight: 800, flexShrink: 0 }}>→</span> {item}
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#F5E642', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Ready to Build Your Network?</h3>
          <p style={{ color: '#b0b8cc', marginBottom: 0, fontWeight: 500 }}>Join ProLnk as a founding partner and lock in charter rates before the waitlist closes at 500 applications.</p>
        </div>
      </div>
    </div>
  );
}
