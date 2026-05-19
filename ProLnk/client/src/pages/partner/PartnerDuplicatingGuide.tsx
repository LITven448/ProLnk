import { useState } from 'react';

const principles = [
  { icon: '📋', title: 'Teach What You Do, Not What You Know', desc: 'Show your sub-partners your actual daily actions. Documented systems duplicate. Tribal knowledge does not.' },
  { icon: '🎯', title: 'First Meeting Agenda', desc: 'Cover: why you joined, how the 5-stream model works, one success story from your first week, and the next 3 steps for them to take.' },
  { icon: '🔄', title: 'The Rule of 3', desc: 'Each partner recruits 3 sub-partners who each recruit 3. Four levels of 3x duplication creates 120 active partners in your network.' },
  { icon: '📅', title: 'Weekly Rhythm', desc: 'A 20-minute weekly check-in with each direct sub-partner is all it takes to keep duplication momentum going.' },
];

const schedule = [
  { week: 'Week 1', focus: 'Onboard your first direct sub-partner with the full first-week guide.' },
  { week: 'Week 2', focus: 'Help sub-partner make their first 3 contacts. Join their first call if needed.' },
  { week: 'Week 3', focus: 'Sub-partner recruits their first recruit. You now have a 2nd level earning.' },
  { week: 'Week 4', focus: 'Repeat with second direct sub-partner. First sub-partner is self-sufficient.' },
];

export default function PartnerDuplicatingGuide() {
  const [directs, setDirects] = useState('');
  const [active, setActive] = useState('');

  const level2 = directs ? parseInt(directs) * 3 : 0;
  const level3 = level2 * 3;
  const total = directs ? parseInt(directs) + level2 + level3 : 0;
  const monthlyIncome = total ? (total * 149 * 0.03).toFixed(0) : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🪞</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>How to Duplicate Yourself</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>The systems and schedule that turn one great partner into a 120-person network.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {principles.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '18px', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{p.title}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>📅 Teaching Schedule</h3>
          {schedule.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '3px 10px',
                fontWeight: 700, fontSize: 12, flexShrink: 0, whiteSpace: 'nowrap' }}>{s.week}</span>
              <span style={{ color: '#374151', fontSize: 14 }}>{s.focus}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>📊 Duplication Income Projection</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Your Direct Partners</label>
              <input type='number' value={directs} onChange={e => setDirects(e.target.value)} placeholder='e.g. 3'
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Active in Network (est.)</label>
              <input type='number' value={active} onChange={e => setActive(e.target.value)} placeholder='e.g. 30'
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          {directs && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '20px 24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[['Level 1', directs], ['Level 2', level2], ['Level 3', level3]].map(([label, val], i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8′ }}>Total Network</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{total} partners</span>
              </div>
              {monthlyIncome && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ color: '#94A3B8′ }}>Est. Monthly Override Income</span>
                  <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>${Number(monthlyIncome).toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
