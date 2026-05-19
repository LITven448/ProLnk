import { useState } from 'react';

const days = [
  { day: 'Day 1', title: 'Account Setup', tasks: ['Complete your ProLnk partner profile', 'Set up commission tracking dashboard', 'Review your unique referral link', 'Download partner resource kit'] },
  { day: 'Day 2', title: 'Learn Commission Structure', tasks: ['Study the 5-stream income model', 'Understand origination rights', 'Review Charter 500 pricing lock', 'Calculate your 12-month income target'] },
  { day: 'Day 3', title: 'First 3 Contacts List', tasks: ['List 3 homeowners you know personally', 'List 3 contractors in your trade network', 'List 3 real estate agents you trust', 'Prepare a 2-sentence intro for each'] },
  { day: 'Day 4', title: 'First Conversation', tasks: ['Reach out to your warmest contact', 'Use the "I just joined" opener', 'Share the DFW market opportunity', 'Schedule a follow-up call'] },
  { day: 'Day 5', title: 'Follow-Up Plan', tasks: ['Send a recap to Day 4 contact', 'Reach out to contacts 2 and 3', 'Track responses in a simple spreadsheet', 'Identify who is most interested'] },
  { day: 'Day 6-7', title: 'Weekend Outreach', tasks: ['Post once on personal social media', 'Attend a local trade or neighborhood event', 'Share ProLnk story with 2 new people', 'Set Week 2 goals'] },
];

const tradeMap: Record<string, string> = {
  plumber: 'Start with plumbing contractors and homeowners who have older homes — pipe issues are evergreen.',
  electrician: 'Target new construction neighborhoods in Frisco and Celina — high demand for panel upgrades.',
  hvac: 'DFW summers create massive HVAC urgency — your network of homeowners is your fastest path to income.',
  general: 'Focus on real estate agents who see home repair needs daily — they are your best referral source.',
};

export default function PartnerWeekOneGuide() {
  const [trade, setTrade] = useState('');
  const [activeDay, setActiveDay] = useState(0);
  const plan = tradeMap[trade] || '';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>Your First Week as a ProLnk Partner</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>A day-by-day action plan to launch your network income in DFW.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {days.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)}
              style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: activeDay === i ? '#F5E642′ : '#E2E8F0',
                color: activeDay === i ? '#0A1628′ : '#475569', fontWeight: 600, fontSize: 13 }}>
              {d.day}
            </button>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', margin: '0 0 16px' }}>{days[activeDay].day}: {days[activeDay].title}</h2>
          {days[activeDay].tasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 22, height: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, fontWeight: 700 }}>
                {i + 1}
              </span>
              <span style={{ color: '#374151', fontSize: 15 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0′ }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 14px' }}>🎯 Personalized Plan for DFW</h3>
          <select value={trade} onChange={e => setTrade(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1',
              fontSize: 15, marginBottom: 16, color: '#0A1628′ }}>
            <option value=''>Select your trade background...</option>
            <option value='plumber'>Plumbing</option>
            <option value='electrician'>Electrical</option>
            <option value='hvac'>HVAC</option>
            <option value='general'>General / Other</option>
          </select>
          {plan && (
            <div style={{ background: '#F0FDF4', borderLeft: '4px solid #22C55E', padding: '14px 18px', borderRadius: 8 }}>
              <p style={{ color: '#166534', margin: 0, fontWeight: 500 }}>💡 {plan}</p>
            </div>
          )}
          {!plan && (
            <p style={{ color: '#94A3B8', margin: 0 }}>Select your trade to see who to contact first in DFW.</p>
          )}
        </div>
      </div>
    </div>
  );
}
