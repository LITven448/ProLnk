import { useState } from 'react';

export default function DFWBuyingTimingGuide2026() {
  const [urgency, setUrgency] = useState(5);
  const [situation, setSituation] = useState('first');

  const getAdvice = () => {
    if (urgency >= 8) return { window: 'Buy Now', color: '#34D399', msg: 'High urgency overrides market timing. DFW appreciates year-round — waiting costs you more than timing saves.', icon: '🚀' };
    if (situation === 'relocating') return { window: 'Buy When Ready', color: '#60A5FA', msg: 'Relocation timelines trump market seasons. Focus on finding the right home, not the perfect market window.', icon: '✈️' };
    if (urgency <= 3) return { window: 'Wait for Fall/Winter', color: '#F5E642', msg: 'Low urgency? Fall and winter offer better deals, less competition, and more motivated sellers in DFW.', icon: '🍂' };
    return { window: 'Spring or Fall', color: '#F59E0B', msg: 'You have flexibility. Spring gives most inventory; fall gives best deals. Pick based on your priorities.', icon: '⚖️' };
  };

  const advice = getAdvice();

  const seasons = [
    { name: 'Spring', months: 'Mar–May', activity: 95, deals: 40, inventory: 95, icon: '🌸', summary: 'Most listings + most buyers. Fast moves, list price or above. Best selection.' },
    { name: 'Summer', months: 'Jun–Aug', activity: 80, deals: 55, inventory: 80, icon: '☀️', summary: 'Families moving before school. Still competitive. Good inventory but slows in Aug.' },
    { name: 'Fall', months: 'Sep–Nov', activity: 60, deals: 75, inventory: 65, icon: '🍂', summary: 'Best deals in DFW. Motivated sellers, less competition. DFW mild climate keeps it active.' },
    { name: 'Winter', months: 'Dec–Feb', activity: 40, deals: 90, inventory: 45, icon: '❄️', summary: 'Slowest but not dead in DFW mild winters. Serious sellers = price flexibility.' },
  ];

  const Bar = ({ pct, color }: { pct: number; color: string }) => (
    <div style={{ height: 6, background: '#1E293B', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3 }} />
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>📅 When to Buy in DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Spring is most competitive, fall is best for deals. But in DFW's mild climate, the market never fully sleeps — and waiting for a rate dip usually costs more than it saves.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Find Your Best DFW Buying Window</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ color: '#94A3B8', fontSize: 13 }}>Buying Urgency (1 = flexible, 10 = must move soon)</label>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{urgency}/10</span>
            </div>
            <input type="range" min={1} max={10} value={urgency} onChange={e => setUrgency(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>Your Situation</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[['first', '🏠 First-Time Buyer'], ['relocating', '✈️ Relocating to DFW'], ['upgrading', '⬆️ Upsizing']].map(([val, label]) => (
                <button key={val} onClick={() => setSituation(val)} style={{ padding: '10px 8px', borderRadius: 8, border: `2px solid ${situation === val ? '#F5E642' : '#374151'}`, background: situation === val ? '#F5E64222' : 'transparent', color: situation === val ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: situation === val ? 700 : 400 }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ background: `${advice.color}22`, border: `2px solid ${advice.color}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{advice.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: advice.color }}>{advice.window}</div>
            <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 6 }}>{advice.msg}</div>
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 DFW Seasonal Buying Guide</h2>
          {seasons.map(({ name, months, activity, deals, inventory, icon, summary }) => (
            <div key={name} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{icon} {name} <span style={{ color: '#64748B', fontSize: 13, fontWeight: 400 }}>({months})</span></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 10 }}>
                {[['Competition', activity, '#EF4444'], ['Deal Quality', deals, '#34D399'], ['Inventory', inventory, '#60A5FA']].map(([label, val, color]) => (
                  <div key={label as string}>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{label}</div>
                    <Bar pct={val as number} color={color as string} />
                    <div style={{ fontSize: 12, color: color as string, marginTop: 2 }}>{val}%</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{summary}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>⏰ Rate Timing vs Market Timing</div>
          <div style={{ color: '#1E293B', fontSize: 13, marginTop: 8 }}>Every 0.5% rate drop on a $385K home saves ~$115/mo. But waiting 6 months for a rate cut while DFW appreciates 2.5% ($9,600) usually costs more. Buy the home, refinance the rate.</div>
        </div>
      </div>
    </div>
  );
}
