import { useState } from 'react';

const ROOM_DATA = [
  { room: 'Living Room', items: ['Old magazines', 'Broken decor', 'Unused furniture', 'Outdated electronics'], time: 4 },
  { room: 'Kitchen', items: ['Duplicate cookware', 'Expired pantry items', 'Unused appliances', 'Chipped dishes'], time: 3 },
  { room: 'Bedrooms', items: ['Clothes not worn in 12mo', 'Old linens', 'Unused toys', 'Outdated media'], time: 5 },
  { room: 'Garage', items: ['Old tools', 'Sports equipment', 'Paint cans', 'Broken items'], time: 6 },
  { room: 'Attic', items: ['Holiday decor', 'Old paperwork', 'Baby items', 'Seasonal gear'], time: 5 },
];

const DISPOSAL = [
  { method: 'Donate', icon: '🤝', tip: 'Goodwill DFW — 40+ locations. Drop off Mon–Sat 9am–8pm. Large item pickup available.' },
  { method: 'Sell', icon: '💰', tip: 'Facebook Marketplace dominates DFW. List Thursday PM for weekend buyers. OfferUp for quick sales.' },
  { method: 'Store', icon: '📦', tip: 'Climate-controlled essential in DFW — 100°F+ destroys items. Look for 75°F max guarantee.' },
  { method: 'Trash/Recycle', icon: '♻️', tip: 'DFW cities offer bulk pickup. Dallas: 2x/year free. Frisco: schedule online. Fort Worth: call 311.' },
  { method: 'Estate Sale', icon: '🏷️', tip: 'April–May is peak DFW garage sale season. Post on DFW Garage Sales Facebook group (200K members).' },
];

const SIZES = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500+ sqft'];
const YEARS = ['0–5 years', '5–10 years', '10–20 years', '20+ years'];
const SITUATIONS = ['Downsizing', 'Moving', 'General cleanup', 'Estate cleanout'];

export default function DFWHomeDecrapifying() {
  const [size, setSize] = useState('');
  const [years, setYears] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { rooms: string[]; hours: number; tip: string }>(null);

  function calculate() {
    if (!size || !years || !situation) return;
    const sizeMultiplier = SIZES.indexOf(size) + 1;
    const yearsMultiplier = YEARS.indexOf(years) + 1;
    const baseHours = ROOM_DATA.reduce((a, r) => a + r.time, 0);
    const total = Math.round(baseHours * (sizeMultiplier * 0.6) * (yearsMultiplier * 0.5));
    const priority = yearsMultiplier >= 3
      ? ['Garage', 'Attic', 'Bedrooms', 'Kitchen', 'Living Room']
      : ['Kitchen', 'Bedrooms', 'Living Room', 'Garage', 'Attic'];
    const tips: Record<string, string> = {
      Downsizing: 'Focus on furniture first — large items take longest to move. DFW estate companies offer 40–60% value.',
      Moving: 'Purge before packing — saves $200–500 in moving costs. Movers charge by weight in DFW.',
      'General cleanup': 'April–May is ideal — garage sale season peaks. DFW spring weekends see 3x buyer traffic.',
      'Estate cleanout': 'Hire an estate sale company for 10,000+ item homes. DFW has 50+ licensed estate liquidators.',
    };
    setResult({ rooms: priority, hours: total, tip: tips[situation] });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🧹</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Home Decrapifying Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Room-by-room decluttering for Dallas–Fort Worth homes</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Where Does It All Go?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {DISPOSAL.map(d => (
            <div key={d.method} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{d.method}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{d.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Get Your Declutter Plan</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {[['Home Size', SIZES, size, setSize], ['Years in Home', YEARS, years, setYears], ['Situation', SITUATIONS, situation, setSituation]].map(([label, opts, val, set]) => (
              <div key={label as string}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{label as string}</label>
                <select value={val as string} onChange={e => (set as Function)(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                  <option value="">Select...</option>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Generate My Plan</button>

          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>⏱ Estimated Time: {result.hours} hours total</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Priority Order:</div>
              {result.rooms.map((r, i) => <div key={r} style={{ padding: '6px 0', color: '#475569' }}>{i + 1}. {r}</div>)}
              <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, fontSize: 14, color: '#0A1628', fontWeight: 600 }}>{result.tip}</div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Room Breakdown</h2>
        {ROOM_DATA.map(r => (
          <div key={r.room} style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontWeight: 700 }}>{r.room}</span>
              <span style={{ color: '#64748b', fontSize: 13 }}>~{r.time} hrs</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {r.items.map(item => <span key={item} style={{ background: '#F1F5F9', borderRadius: 20, padding: '4px 12px', fontSize: 13 }}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
