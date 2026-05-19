import { useState } from 'react';

const temps = [
  { label: 'Below 68°F (Too Cold)', score: 30 },
  { label: '68–72°F (Ideal)', score: 100 },
  { label: '73–76°F (Warm)', score: 70 },
  { label: '77°F+ (Hot)', score: 35 },
];

const humids = [
  { label: 'Below 30% (Too Dry)', score: 40 },
  { label: '30–50% (Ideal)', score: 100 },
  { label: '51–60% (Muggy)', score: 60 },
  { label: '61%+ (Oppressive)', score: 25 },
];

const airflows = [
  { label: 'Strong Even Airflow', score: 100 },
  { label: 'Adequate, Some Spots', score: 70 },
  { label: 'Weak in Rooms', score: 40 },
  { label: 'Hot/Cold Spots Everywhere', score: 15 },
];

function diagnose(tScore: number, hScore: number, aScore: number) {
  const issues: string[] = [];
  const fixes: string[] = [];
  if (tScore < 60) { issues.push('Temperature is off'); fixes.push('Calibrate your thermostat and check refrigerant charge'); }
  if (hScore < 60) { issues.push('Humidity out of range'); fixes.push('Consider a whole-home dehumidifier or humidifier for DFW' ); }
  if (aScore < 60) { issues.push('Poor airflow distribution'); fixes.push('Inspect ductwork, clean vents, replace filter'); }
  return { issues, fixes };
}

export default function DFWHVACComfortIndex() {
  const [tIdx, setTIdx] = useState(1);
  const [hIdx, setHIdx] = useState(1);
  const [aIdx, setAIdx] = useState(0);
  const [result, setResult] = useState<null | { index: number; issues: string[]; fixes: string[] }>(null);

  function calculate() {
    const t = temps[tIdx].score;
    const h = humids[hIdx].score;
    const a = airflows[aIdx].score;
    const index = Math.round((t * 0.35 + h * 0.35 + a * 0.30));
    const { issues, fixes } = diagnose(t, h, a);
    setResult({ index, issues, fixes });
  }

  function indexColor(n: number) {
    if (n >= 80) return '#22c55e';
    if (n >= 60) return '#facc15';
    if (n >= 40) return '#f97316';
    return '#ef4444';
  }

  function indexLabel(n: number) {
    if (n >= 80) return 'Comfortable 😌';
    if (n >= 60) return 'Acceptable ⚠️';
    if (n >= 40) return 'Uncomfortable 🔶';
    return 'Miserable 🚨';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Comfort Index</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Temperature + Humidity + Airflow = How comfortable you actually feel</p>
        </div>

        {[{ label: 'Indoor Temperature', items: temps, idx: tIdx, set: setTIdx },
          { label: 'Indoor Humidity', items: humids, idx: hIdx, set: setHIdx },
          { label: 'Airflow Quality', items: airflows, idx: aIdx, set: setAIdx }].map((group) => (
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
          Calculate Comfort Index
        </button>

        {result && (
          <div style={{ marginTop: 28, background: '#0d2137', borderRadius: 12, padding: 24, border: `2px solid ${indexColor(result.index)}` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 52, fontWeight: 800, color: indexColor(result.index) }}>{result.index}</div>
              <div style={{ fontSize: 18, color: indexColor(result.index), fontWeight: 700 }}>{indexLabel(result.index)}</div>
            </div>
            {result.issues.length > 0 ? (
              <>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>What's Causing Discomfort:</div>
                {result.issues.map((iss, i) => (
                  <div key={i} style={{ color: '#f97316', fontSize: 13, marginBottom: 4 }}>⚠️ {iss}</div>
                ))}
                <div style={{ color: '#F5E642', fontSize: 13, margin: '12px 0 8px' }}>How to Fix:</div>
                {result.fixes.map((fix, i) => (
                  <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>✅ {fix}</div>
                ))}
              </>
            ) : (
              <p style={{ color: '#22c55e', textAlign: 'center', fontSize: 14 }}>Your DFW home comfort is dialed in. 🎉</p>
            )}
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5E64211', borderRadius: 8, color: '#F5E642', fontSize: 13, textAlign: 'center' }}>
              🔧 Find a certified HVAC pro at <strong>ProLnk.io</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

