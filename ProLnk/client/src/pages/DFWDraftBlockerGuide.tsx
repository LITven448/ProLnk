import { useState } from 'react';

const solutions = [
  { location: 'Exterior Door Bottom', emoji: '🚪', solution: 'Heavy-duty door draft stopper', type: 'Purchase', cost: '$15-40', savings: '$12-30/month in DFW summer', notes: 'Look for weighted fabric or rubber seal versions — lighter ones move' },
  { location: 'Unused DFW Fireplace', emoji: '🔥', solution: 'Chimney Balloon', type: 'DIY install', cost: '$45-65', savings: '$100-200/year — chimneys are major DFW heat loss', notes: 'Huge energy win — most DFW homes have unused fireplaces' },
  { location: 'Attic Hatch', emoji: '🔼', solution: 'Attic Stair Cover + Weatherstrip', type: 'DIY', cost: '$30-80', savings: '$50-150/year in DFW', notes: 'DFW attics hit 150°F+ — unsealed hatch dumps heat directly into home' },
  { location: 'Interior Door Gaps', emoji: '🏠', solution: 'Under-door draft snake', type: 'Purchase', cost: '$10-25', savings: '$5-15/month', notes: 'Good for rooms with window AC units in DFW' },
  { location: 'Electrical Outlets / Switches', emoji: '🔌', solution: 'Foam outlet gaskets', type: 'DIY', cost: '$5-12/pack', savings: '$8-20/year per room', notes: 'On exterior walls — DFW wind drives air through outlets' },
  { location: 'Plumbing Penetrations', emoji: '🔧', solution: 'Spray foam or pipe collar', type: 'DIY', cost: '$8-20', savings: '$15-40/year', notes: 'Under sinks on exterior walls — often completely open in DFW homes' },
];

const locations = solutions.map(s => s.location);

export default function DFWDraftBlockerGuide() {
  const [selected, setSelected] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    const match = solutions.find(s => s.location === selected);
    if (match) setRec(match);
  };

  const reset = () => { setSelected(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💨</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Draft Blocker Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>DFW drafts cost homeowners hundreds per year — chimney balloons and attic hatch covers are the highest-ROI fixes most DFW owners overlook.</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40 }}>🔥</div>
            <div>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>DFW Tip: Chimney Balloon = Biggest ROI</div>
              <div style={{ color: '#1E293B', fontSize: 14, lineHeight: 1.6 }}>Most DFW homes have gas or wood fireplaces that are rarely used. An open chimney flue is like a 15-inch hole in your ceiling pulling your expensive AC straight up and out. A chimney balloon costs $45-65 and installs in 10 minutes — saving $100-200/year on DFW energy bills with zero maintenance.</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[['🏠', 'Common Sources', '6+ major draft locations in average DFW home'], ['💸', 'Average Loss', '$200-400/year lost to drafts in DFW'], ['⏱️', 'Fix Time', 'Most solutions install in under 30 minutes'], ['🔧', 'DIY Friendly', '80% of fixes require no tools or special skills']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Draft Fix</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Where is the draft coming from?</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', maxWidth: 400, background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
              <option value=''>Select draft location</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Fix</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{rec.emoji} {rec.location}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 12 }}>
                {[['Solution', rec.solution], ['Method', rec.type], ['Cost', rec.cost], ['DFW Savings', rec.savings]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>💡 {rec.notes}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {solutions.map(s => (
            <div key={s.location} style={{ background: '#1E293B', borderRadius: 12, padding: 20, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{s.location}</div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 14 }}>{s.cost}</div>
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{s.solution} — {s.type}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Saves: {s.savings}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
