import { useState } from 'react';

const hvacAges = [
  { label: 'New (0–5 years)', homeImpact: 10, humid: 0, air: 0 },
  { label: 'Moderate (6–12 years)', homeImpact: 20, humid: 10, air: 5 },
  { label: 'Aging (13–18 years)', homeImpact: 35, humid: 20, air: 15 },
  { label: 'Old (18+ years)', homeImpact: 50, humid: 35, air: 25 },
];

const humidIssues = [
  { label: 'No humidity issues', structRisk: 0, healthRisk: 0 },
  { label: 'Occasional condensation', structRisk: 10, healthRisk: 8 },
  { label: 'Visible mold or damp spots', structRisk: 25, healthRisk: 22 },
  { label: 'Chronic moisture problems', structRisk: 40, healthRisk: 35 },
];

const airQualities = [
  { label: 'Fresh, no complaints', risk: 0 },
  { label: 'Dusty, some allergies', risk: 12 },
  { label: 'Musty or stale smell', risk: 22 },
  { label: 'Visible mold, bad odors', risk: 35 },
];

function overallScore(age: typeof hvacAges[0], humid: typeof humidIssues[0], air: typeof airQualities[0]) {
  const penalty = age.homeImpact * 0.4 + humid.structRisk * 0.35 + air.risk * 0.25;
  return Math.max(0, Math.round(100 - penalty));
}

export default function DFWHVACOverallHome() {
  const [aIdx, setAIdx] = useState(0);
  const [hIdx, setHIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [result, setResult] = useState<null | { score: number; priorities: string[] }>(null);

  function calculate() {
    const age = hvacAges[aIdx];
    const humid = humidIssues[hIdx];
    const air = airQualities[qIdx];
    const score = overallScore(age, humid, air);
    const priorities: string[] = [];
    if (aIdx >= 2) priorities.push('HVAC system aging rapidly in DFW climate — plan for replacement or major service');
    if (hIdx >= 2) priorities.push('Moisture damage risk to framing, drywall, and foundation — address immediately');
    if (qIdx >= 2) priorities.push('Indoor air quality affecting occupant health — coil cleaning and duct inspection needed');
    if (priorities.length === 0) priorities.push('Your home health is in good shape. Maintain regular HVAC service to stay there.');
    setResult({ score, priorities });
  }

  function scoreColor(s: number) {
    if (s >= 80) return '#22c55e';
    if (s >= 60) return '#facc15';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  }

  function scoreLabel(s: number) {
    if (s >= 80) return 'Home Health: Good ✅';
    if (s >= 60) return 'Home Health: Fair ⚠️';
    if (s >= 40) return 'Home Health: At Risk 🔶';
    return 'Home Health: Critical 🚨';
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC + Home Health</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Your HVAC is the #1 driver of overall home health in DFW — see the full impact</p>
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: '14px 16px', marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.7 }}>
            In DFW, HVAC controls temperature, humidity, and air quality — all three directly affect your home's structure and your family’s health. A failing HVAC doesn’t just mean discomfort; it means <span style={{ color: '#F5E642' }}>moisture damage, mold, and degraded air</span>.
          </p>
        </div>

        {[
          { label: 'HVAC System Age', items: hvacAges, idx: aIdx, set: setAIdx },
          { label: 'Humidity / Moisture Issues', items: humidIssues, idx: hIdx, set: setHIdx },
          { label: 'Indoor Air Quality', items: airQualities, idx: qIdx, set: setQIdx },
        ].map((group) => (
          <div key={group.label} style={{ marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {group.items.map((item, i) => (
                <button key={i} onClick={() => group.set(i)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', textAlign: 'left',
                    borderColor: group.idx === i ? '#F5E642′ : '#1e3a5f',
                    background: group.idx === i ? '#F5E64222′ : ’transparent',
                    color: group.idx === i ? '#F5E642′ : '#94a3b8', fontSize: 13 }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate}
          style={{ width: '100%', padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 }}>
          Calculate Home Health Impact
        </button>

        {result && (
          <div style={{ marginTop: 28, background: '#0d2137', borderRadius: 12, padding: 24, border: `2px solid ${scoreColor(result.score)}` }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 64, fontWeight: 800, color: scoreColor(result.score) }}>{result.score}</div>
              <div style={{ fontSize: 18, color: scoreColor(result.score), fontWeight: 700 }}>{scoreLabel(result.score)}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 10 }}>Priority Improvements:</div>
            {result.priorities.map((p, i) => (
              <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8, paddingLeft: 8, borderLeft: '3px solid #F5E642', lineHeight: 1.5 }}>
                {p}
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5E64211', borderRadius: 8, color: '#F5E642', fontSize: 13, textAlign: 'center' }}>
              🏠 Add your home to Home Health Vault via <strong>ProLnk.io</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

