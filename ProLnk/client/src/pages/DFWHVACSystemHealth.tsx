import { useState } from 'react';

const ages = [
  { label: '0–5 years', points: 30 },
  { label: '6–10 years', points: 22 },
  { label: '11–15 years', points: 14 },
  { label: '16+ years (DFW wears fast)', points: 5 },
];

const maintenances = [
  { label: 'Tuned up this year', points: 25 },
  { label: 'Tuned up last year', points: 17 },
  { label: '2–3 years ago', points: 8 },
  { label: 'Never / Unknown', points: 0 },
];

const seers = [
  { label: 'SEER 18+ (High Efficiency)', points: 20 },
  { label: 'SEER 14–17', points: 14 },
  { label: 'SEER 13 (Minimum Standard)', points: 8 },
  { label: 'Below SEER 13', points: 2 },
];

const refs = [
  { label: 'Proper charge confirmed', points: 15 },
  { label: 'Seems fine, not checked', points: 9 },
  { label: 'Slightly low', points: 4 },
  { label: 'Known leak or very low', points: 0 },
];

const drags: Record<string, number> = {
  'age16': 8,
  'noMaint': 10,
  'lowSeer': 6,
  'lowRef': 12,
};

export default function DFWHVACSystemHealth() {
  const [aIdx, setAIdx] = useState(0);
  const [mIdx, setMIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const [rIdx, setRIdx] = useState(0);
  const [result, setResult] = useState<null | { score: number; drags: string[]; tips: string[] }>(null);

  function calculate() {
    const score = Math.min(ages[aIdx].points + maintenances[mIdx].points + seers[sIdx].points + refs[rIdx].points + 10, 100);
    const dragList: string[] = [];
    const tips: string[] = [];
    if (aIdx === 3) { dragList.push('System age (16+ years in DFW heat is hard)'); tips.push('Plan for replacement in next 1–2 years'); }
    if (mIdx >= 2) { dragList.push('Skipped maintenance'); tips.push('Schedule annual tune-up — extends life and improves efficiency'); }
    if (sIdx >= 2) { dragList.push('Low SEER rating'); tips.push('Upgrading to SEER 18+ can cut energy bills 30–40%'); }
    if (rIdx >= 2) { dragList.push('Refrigerant below optimal'); tips.push('Have a certified tech check and recharge refrigerant'); }
    setResult({ score, drags: dragList, tips });
  }

  function scoreColor(s: number) {
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#facc15';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  }

  function scoreLabel(s: number) {
    if (s >= 80) return 'Healthy System ✅';
    if (s >= 60) return 'Needs Attention ⚠️';
    if (s >= 40) return 'Declining 🔶';
    return 'At Risk 🚨';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏥</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC System Health Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Enter your system details and get an honest 0–100 health score</p>
        </div>

        {[
          { label: 'System Age', items: ages, idx: aIdx, set: setAIdx },
          { label: 'Maintenance History', items: maintenances, idx: mIdx, set: setMIdx },
          { label: 'SEER Rating', items: seers, idx: sIdx, set: setSIdx },
          { label: 'Refrigerant Status', items: refs, idx: rIdx, set: setRIdx },
        ].map((group) => (
          <div key={group.label} style={{ marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.items.map((item, i) => (
                <button key={i} onClick={() => group.set(i)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', textAlign: 'left',
                    borderColor: group.idx === i ? '#F5E642' : '#1e3a5f',
                    background: group.idx === i ? '#F5E64222' : 'transparent',
                    color: group.idx === i ? '#F5E642' : '#94a3b8', fontSize: 13 }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate}
          style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
          Calculate Health Score
        </button>

        {result && (
          <div style={{ marginTop: 28, background: '#0d2137', borderRadius: 12, padding: 24, border: `2px solid ${scoreColor(result.score)}` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 64, fontWeight: 800, color: scoreColor(result.score) }}>{result.score}</div>
              <div style={{ fontSize: 18, color: scoreColor(result.score), fontWeight: 700 }}>{scoreLabel(result.score)}</div>
            </div>
            {result.drags.length > 0 && (
              <>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>What's Dragging Your Score:</div>
                {result.drags.map((d, i) => (
                  <div key={i} style={{ color: '#f97316', fontSize: 13, marginBottom: 4 }}>⬇️ {d}</div>
                ))}
                <div style={{ color: '#F5E642', fontSize: 13, margin: '12px 0 8px' }}>How to Improve:</div>
                {result.tips.map((t, i) => (
                  <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>✅ {t}</div>
                ))}
              </>
            )}
            {result.drags.length === 0 && <p style={{ color: '#22c55e', textAlign: 'center', fontSize: 14 }}>Your DFW HVAC system is in excellent shape! Keep up the maintenance. 🎉</p>}
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5E64211', borderRadius: 8, color: '#F5E642', fontSize: 13, textAlign: 'center' }}>
              🔧 Get a professional health assessment via <strong>ProLnk.io</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

