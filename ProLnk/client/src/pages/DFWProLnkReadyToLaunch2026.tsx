import { useState } from 'react';

const readinessItems = [
  { icon: '⚙️', title: 'Technology Built', desc: 'Full-stack platform — React 19, tRPC, TiDB, 130+ database tables — production ready', status: '✅ Complete' },
  { icon: '📄', title: '5,400+ Content Pages', desc: 'DFW-specific guides, trade pages, SEO content — largest home services content moat in Texas', status: '✅ Complete' },
  { icon: '🤖', title: '47 AI Agents Operational', desc: 'Commission, matching, fraud, email, SMS, analytics — autonomous operations running', status: '✅ Complete' },
  { icon: '🗄️', title: 'Database Operational', desc: 'TiDB Cloud live — 130+ tables, schema migrations done, query performance verified', status: '✅ Complete' },
  { icon: '📋', title: 'Waitlist Building', desc: 'Charter Pro waitlist open — building toward 500 applications to close founding round', status: '🔄 In Progress' },
  { icon: '☁️', title: 'Render AI Credits Needed', desc: 'Final deployment step — Render credits unlock full production infrastructure', status: '⏳ Pending' },
];

const stakeholders = [
  { label: 'Charter Pro', focus: ['waitlist', 'tech', 'agents'] },
  { label: 'Homeowner', focus: ['content', 'tech', 'database'] },
  { label: 'Investor', focus: ['tech', 'agents', 'content', 'credits'] },
  { label: 'Press / Media', focus: ['tech', 'content', 'waitlist'] },
];

const idMap: Record<string, string> = {
  'tech': 'Technology Built',
  'content': '5,400+ Content Pages',
  'agents': '47 AI Agents Operational',
  'database': 'Database Operational',
  'waitlist': 'Waitlist Building',
  'credits': 'Render AI Credits Needed',
};

export default function DFWProLnkReadyToLaunch2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<typeof readinessItems | null>(null);

  function handleStakeholder(s: typeof stakeholders[0]) {
    setSelected(s.label);
    const titles = s.focus.map(f => idMap[f]);
    setFiltered(readinessItems.filter(r => titles.includes(r.title)));
  }

  const display = filtered ?? readinessItems;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🚀</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>ProLnk Ready for DFW Launch</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Everything is built. Waiting on the green light. Here is what is in place right now.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '1rem' }}>Who are you?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '2rem' }}>
          {stakeholders.map(s => (
            <button key={s.label} onClick={() => handleStakeholder(s)}
              style={{ background: selected === s.label ? '#F5E642' : '#1e3a5f', color: selected === s.label ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '.6rem 1.1rem', cursor: 'pointer', fontWeight: 600 }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {display.map(item => (
            <div key={item.title} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '.9rem', marginTop: '.3rem' }}>{item.desc}</div>
              </div>
              <span style={{ color: '#F5E642', fontSize: '.85rem', whiteSpace: 'nowrap', paddingTop: '.2rem' }}>{item.status}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#F5E64220', borderRadius: 10, padding: '1.2rem', color: '#F5E642', textAlign: 'center' }}>
          🟡 Waitlist open now — Charter Pro spots close at 500. Everything is waiting for green light.
        </div>
      </div>
    </div>
  );
}