import { useState } from 'react';

const windowTypes = [
  { type: 'Double-Hung', emoji: '🪟', strip: 'Pile weatherstrip (sides) + compression (top/bottom)', freq: 'Every 2-3 years DFW', cost: '$15-35/window' },
  { type: 'Casement', emoji: '🔲', strip: 'Compression bulb (all 4 sides)', freq: 'Every 3-4 years DFW', cost: '$20-45/window' },
  { type: 'Sliding', emoji: '↔️', strip: 'Pile/fin seal (vertical tracks)', freq: 'Every 2 years DFW', cost: '$12-28/window' },
  { type: 'Fixed / Picture', emoji: '🖼️', strip: 'None needed — check frame caulk only', freq: 'N/A', cost: '$0' },
];

const windowStyles = ['Double-Hung', 'Casement', 'Sliding', 'Fixed / Picture'];
const dfwProblems = ['Feeling drafts on hot/cold days', 'Condensation on glass', 'Outside noise inside', 'Rising energy bills', 'Window difficult to close tightly'];

const candleTest = [
  'Close all windows and doors in the house.',
  'Light a candle or hold a thin strip of tissue near each window edge.',
  'Move slowly along all four sides of the window frame.',
  'Flickering flame or tissue = air infiltration — replace weatherstripping.',
  'Pay special attention to corners — DFW heat warps frames at corners first.',
];

export default function DFWWindowWeatherstripping() {
  const [windowStyle, setWindowStyle] = useState('');
  const [problem, setProblem] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    if (!windowStyle || !problem) return;
    const match = windowTypes.find(w => w.type === windowStyle) || windowTypes[0];
    const urgency = problem.includes('drafts') || problem.includes('bills') ? 'Replace immediately' : 'Replace within 30 days';
    setRec({ ...match, urgency });
  };

  const reset = () => { setWindowStyle(''); setProblem(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Window Weatherstripping Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>DFW's extreme temperature swings stress window weatherstripping harder than almost anywhere — learn how to check and replace for your window type.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[['🌡️', 'Why DFW is Hard', 'Frames expand in 110°F summers and contract at freezing in winters — every year'], ['🕯️', 'Candle Test', 'Flickering flame near frame edges means air infiltration'], ['📅', 'Replace Frequency', 'Every 2-3 years in DFW vs. 5 years in cooler climates'], ['💰', 'Savings', 'Proper sealing saves 10-20% on DFW cooling bills']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🕯️ How to Do the DFW Candle Test</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {candleTest.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Weatherstripping</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Window Style</label>
              <select value={windowStyle} onChange={e => setWindowStyle(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select window style</option>
                {windowStyles.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW Problem</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select problem</option>
                {dfwProblems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{rec.emoji} {rec.type} Windows</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                {[['Strip Type', rec.strip], ['DFW Frequency', rec.freq], ['Cost', rec.cost], ['Urgency', rec.urgency]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          {windowTypes.map(w => (
            <div key={w.type} style={{ background: '#1E293B', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{w.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{w.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{w.strip}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{w.freq}</div>
              <div style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{w.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
