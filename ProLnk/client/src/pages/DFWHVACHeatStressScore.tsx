import { useState } from 'react';

const conditions = [
  { label: 'Under 85°F', value: 'mild', temp: 80 },
  { label: '85–95°F', value: 'hot', temp: 90 },
  { label: '95–105°F', value: 'vhot', temp: 100 },
  { label: '105°F+', value: 'extreme', temp: 110 },
];

const ages = [
  { label: '0–5 years', value: 5 },
  { label: '6–10 years', value: 10 },
  { label: '11–15 years', value: 15 },
  { label: '16+ years', value: 20 },
];

const seers = [
  { label: 'SEER 20+ (High Efficiency)', value: 20 },
  { label: 'SEER 16–19', value: 17 },
  { label: 'SEER 13–15', value: 14 },
  { label: 'SEER <13 (Old/Low)', value: 10 },
];

function getStress(temp: number, age: number, seer: number) {
  let score = 0;
  if (temp >= 110) score += 40;
  else if (temp >= 100) score += 28;
  else if (temp >= 90) score += 16;
  else score += 6;
  if (age >= 20) score += 30;
  else if (age >= 15) score += 20;
  else if (age >= 10) score += 10;
  else score += 3;
  if (seer <= 10) score += 30;
  else if (seer <= 14) score += 18;
  else if (seer <= 17) score += 8;
  else score += 2;
  return Math.min(score, 100);
}

function stressLabel(score: number) {
  if (score < 25) return { label: 'Low', color: '#22c55e', emoji: '✅', tip: 'Your system is handling DFW heat well. Maintain regular filter changes.' };
  if (score < 50) return { label: 'Moderate', color: '#facc15', emoji: '⚠️', tip: 'System is working harder than ideal. Schedule a tune-up before peak summer.' };
  if (score < 75) return { label: 'High', color: '#f97316', emoji: '🔶', tip: 'Significant strain detected. Inspect coils, refrigerant, and airflow now.' };
  return { label: 'Critical', color: '#ef4444', emoji: '🚨', tip: 'System at risk of failure during DFW heat peaks. Contact a ProLnk HVAC pro today.' };
}

export default function DFWHVACHeatStressScore() {
  const [tempIdx, setTempIdx] = useState(0);
  const [ageIdx, setAgeIdx] = useState(0);
  const [seerIdx, setSeerIdx] = useState(0);
  const [result, setResult] = useState<null | { score: number; label: string; color: string; emoji: string; tip: string }>(null);

  function calculate() {
    const score = getStress(conditions[tempIdx].temp, ages[ageIdx].value, seers[seerIdx].value);
    setResult({ score, ...stressLabel(score) });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Heat Stress Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Calculate how stressed your system is on any given DFW day</p>
        </div>

        {[{ label: 'Outdoor Temperature', items: conditions, idx: tempIdx, set: setTempIdx },
          { label: 'System Age', items: ages, idx: ageIdx, set: setAgeIdx },
          { label: 'System SEER Rating', items: seers, idx: seerIdx, set: setSeerIdx }].map((group) => (
          <div key={group.label} style={{ marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {group.items.map((item, i) => (
                <button key={i} onClick={() => group.set(i)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                    borderColor: group.idx === i ? '#F5E642' : '#1e3a5f',
                    background: group.idx === i ? '#F5E64222' : 'transparent',
                    color: group.idx === i ? '#F5E642' : '#94a3b8', fontSize: 13 }}>
                  {'label' in item ? item.label : item.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate}
          style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
          Calculate Heat Stress Score
        </button>

        {result && (
          <div style={{ marginTop: 28, background: '#0d2137', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>{result.emoji}</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: result.color }}>{result.score}</div>
              <div style={{ fontSize: 20, color: result.color, fontWeight: 700, marginBottom: 12 }}>{result.label} Stress</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.tip}</p>
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5E64211', borderRadius: 8, color: '#F5E642', fontSize: 13, textAlign: 'center' }}>
              🔧 Match with a certified DFW HVAC pro on <strong>ProLnk.io</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

