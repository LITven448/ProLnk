import { useState } from 'react';

const employerClusters = [
  { id: 'legacy', label: '📍 Legacy West / Frisco (Toyota, Liberty Mutual, JPMorgan)', area: 'north' },
  { id: 'lascolinas', label: '📍 Las Colinas (Exxon, Celanese, Kimberly-Clark)', area: 'northwest' },
  { id: 'downtown', label: '📍 Downtown Dallas (AT&T, Goldman Sachs, Law firms)', area: 'central' },
  { id: 'medical', label: '📍 Medical District / Uptown (UT Southwestern, Parkland)', area: 'central' },
  { id: 'dfw_airport', label: '📍 DFW Airport (American Airlines HQ, hospitality)', area: 'northwest' },
  { id: 'arlington', label: '📍 Arlington (GM Financial, UTA, Six Flags corporate)', area: 'west' },
];

const suburbs = [
  { name: 'Frisco', medianHome: 520000, commuteMap: { legacy: 10, lascolinas: 35, downtown: 40, medical: 42, dfw_airport: 30, arlington: 60 }, dart: false },
  { name: 'McKinney', medianHome: 440000, commuteMap: { legacy: 20, lascolinas: 45, downtown: 50, medical: 52, dfw_airport: 40, arlington: 70 }, dart: false },
  { name: 'Plano', medianHome: 480000, commuteMap: { legacy: 15, lascolinas: 30, downtown: 25, medical: 27, dfw_airport: 25, arlington: 55 }, dart: true },
  { name: 'Allen', medianHome: 460000, commuteMap: { legacy: 18, lascolinas: 40, downtown: 35, medical: 37, dfw_airport: 32, arlington: 65 }, dart: false },
  { name: 'Garland', medianHome: 285000, commuteMap: { legacy: 35, lascolinas: 30, downtown: 20, medical: 22, dfw_airport: 28, arlington: 45 }, dart: true },
  { name: 'Irving', medianHome: 320000, commuteMap: { legacy: 25, lascolinas: 10, downtown: 20, medical: 22, dfw_airport: 10, arlington: 25 }, dart: true },
  { name: 'Flower Mound', medianHome: 490000, commuteMap: { legacy: 20, lascolinas: 20, downtown: 35, medical: 37, dfw_airport: 15, arlington: 35 }, dart: false },
  { name: 'Rockwall', medianHome: 420000, commuteMap: { legacy: 45, lascolinas: 40, downtown: 30, medical: 32, dfw_airport: 40, arlington: 55 }, dart: false },
  { name: 'Carrollton', medianHome: 370000, commuteMap: { legacy: 20, lascolinas: 15, downtown: 25, medical: 27, dfw_airport: 18, arlington: 40 }, dart: true },
  { name: 'Richardson', medianHome: 430000, commuteMap: { legacy: 20, lascolinas: 25, downtown: 20, medical: 22, dfw_airport: 25, arlington: 50 }, dart: true },
];

const corridors = [
  { name: 'I-35E (Lewisville to Downtown)', rating: '🔴 Worst', detail: 'Consistent gridlock 7–9am, 4–7pm. Avoid if possible.' },
  { name: 'I-30 (Dallas to Fort Worth)', rating: '🔴 Worst', detail: 'High accident rate, construction ongoing through 2026.' },
  { name: 'SH-121 / SH-190 (Sam Rayburn)', rating: '🟡 Heavy', detail: 'Tollway alleviates some load but still congested at peak.' },
  { name: 'DNT (Dallas North Tollway)', rating: '🟡 Heavy', detail: 'Expensive but fastest N-S option — worth it for Legacy West commuters.' },
  { name: 'PGBT (President George Bush)', rating: '🟢 Best', detail: 'Best ring road option — connects suburbs without going through Dallas.' },
  { name: 'DART Rail (Red/Blue Line)', rating: '🟢 Best', detail: 'Excellent for downtown/Uptown. Plano, Garland, Carrollton stations.' },
];

export default function DFWCommutingGuide() {
  const [employer, setEmployer] = useState('legacy');
  const [budget, setBudget] = useState(500000);
  const [results, setResults] = useState<typeof suburbs>([]);
  const [searched, setSearched] = useState(false);

  function findSuburbs() {
    const filtered = suburbs
      .filter(s => s.medianHome <= budget)
      .sort((a, b) => (a.commuteMap as any)[employer] - (b.commuteMap as any)[employer])
      .slice(0, 5);
    setResults(filtered);
    setSearched(true);
  }

  const commuteColor = (mins: number) => mins <= 20 ? '#4ade80' : mins <= 35 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🚗 DFW Commuting Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Commuting for Homebuyers</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW has no logical highway grid — it's a spoke-and-hub mess built for cars. DART light rail is excellent but limited. Understanding employer clusters before you buy could save you 2+ hours daily.
        </p>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>⚠️ Worst & Best Corridors</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {corridors.map(c => (
              <div key={c.name} style={{ background: '#111e35', borderRadius: 8, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18, minWidth: 30 }}>{c.rating.split(' ')[0]}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{c.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔍 Find Your Suburb by Commute</h2>

          <label style={{ display: 'block', marginBottom: 12, color: '#94a3b8', fontSize: 13 }}>Where Do You Work?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {employerClusters.map(e => (
              <button key={e.id} onClick={() => setEmployer(e.id)}
                style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer', textAlign: 'left', fontSize: 13,
                  borderColor: employer === e.id ? '#F5E642' : '#1e3a5f',
                  background: employer === e.id ? '#0d2a4a' : 'transparent',
                  color: employer === e.id ? '#F5E642' : '#94a3b8' }}>
                {e.label}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Home Budget</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <input type="range" min={200000} max={700000} step={10000} value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#F5E642' }} />
            <span style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</span>
          </div>

          <button onClick={findSuburbs}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Show Best Suburbs
          </button>
        </div>

        {searched && (
          <div>
            <h2 style={{ marginBottom: 16 }}>🏆 Top Picks — Best Commute + Value</h2>
            {results.map((s, i) => {
              const mins = (s.commuteMap as any)[employer];
              return (
                <div key={s.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: `4px solid ${commuteColor(mins)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <h3 style={{ margin: 0, fontSize: 18 }}>#{i + 1} {s.name}</h3>
                    <span style={{ color: commuteColor(mins), fontWeight: 700, fontSize: 16 }}>{mins} min</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8' }}>
                    <span>🏠 ${s.medianHome.toLocaleString()}</span>
                    <span>{s.dart ? '🚆 DART access' : '🚗 Car required'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
