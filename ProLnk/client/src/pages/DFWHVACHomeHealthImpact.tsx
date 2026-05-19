import { useState } from 'react';

const factors = [
  { id: 'age', label: 'HVAC Age', icon: '📅', weight: 'Major Factor', description: 'System age is the #1 HVAC factor in your Home Health Vault score', scores: [
    { range: '0–5 years', impact: '+18 pts', color: '#22c55e' },
    { range: '6–10 years', impact: '+10 pts', color: '#84cc16′ },
    { range: '11–15 years', impact: '+2 pts', color: '#f59e0b' },
    { range: '15+ years', impact: '–8 pts', color: '#ef4444′ },
  ]},
  { id: 'maintenance', label: 'Maintenance History', icon: '🔧', weight: 'Significant', description: 'Documented service history proves care; missing records = unknown risk', scores: [
    { range: 'Annual tune-ups documented', impact: '+12 pts', color: '#22c55e' },
    { range: 'Occasional service only', impact: '+4 pts', color: '#84cc16′ },
    { range: 'No records available', impact: '–5 pts', color: '#ef4444′ },
    { range: 'Deferred maintenance known', impact: '–10 pts', color: '#7f1d1d' },
  ]},
  { id: 'efficiency', label: 'Efficiency Rating', icon: '⚡', weight: 'Moderate', description: 'SEER2 rating signals system quality and future energy cost for buyers', scores: [
    { range: 'SEER2 18+ (premium)', impact: '+10 pts', color: '#22c55e' },
    { range: 'SEER2 15–17 (good)', impact: '+6 pts', color: '#84cc16′ },
    { range: 'SEER2 13–14 (standard)', impact: '+2 pts', color: '#f59e0b' },
    { range: 'Pre-SEER2 old system', impact: '–4 pts', color: '#ef4444′ },
  ]},
  { id: 'health', label: 'System Health', icon: '💚', weight: 'Moderate', description: 'Inspection findings — refrigerant, ductwork, airflow, and indoor air quality', scores: [
    { range: 'Clean bill of health', impact: '+8 pts', color: '#22c55e' },
    { range: 'Minor issues noted', impact: '+2 pts', color: '#84cc16′ },
    { range: 'Repair recommended', impact: '–6 pts', color: '#f59e0b' },
    { range: 'Critical issues found', impact: '–14 pts', color: '#ef4444′ },
  ]},
];

export default function DFWHVACHomeHealthImpact() {
  const [active, setActive] = useState(factors[0]);
  const [baseScore] = useState(72);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            HVAC Impact on DFW Home Health
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How your HVAC affects your Home Health Vault score</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 20, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your Estimated Home Health Vault Score</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#F5E642′ }}>{baseScore}</div>
          <div style={{ color: '#94a3b8', fontSize: 12 }}>out of 100 — HVAC accounts for up to 48 points</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          {factors.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: active.id === f.id ? '#F5E642′ : '#1e3a5f',
                background: active.id === f.id ? '#F5E642′ : '#112240',
                color: active.id === f.id ? '#0A1628′ : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>{active.icon} {active.label}</h2>
            <span style={{ background: '#1e3a5f', color: '#94a3b8', padding: '4px 12px', borderRadius: 20, fontSize: 12 }}>{active.weight}</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>{active.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {active.scores.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <span style={{ fontSize: 14 }}>{s.range}</span>
                <span style={{ color: s.color, fontWeight: 700, fontSize: 15 }}>{s.impact}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>🔗 How ProLnk & TrustyPro Use This Data</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#e2e8f0′ }}>
              📊 ProLnk routes homeowners based on HVAC age — older systems = higher lead priority
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#e2e8f0′ }}>
              🏆 TrustyPro pros see Home Health Score before accepting a job — helps them price accurately
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#e2e8f0′ }}>
              🗂️ Every service visit updates the Vault score automatically when logged through the platform
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>🏠 Add your DFW home to the Home Health Vault and track your HVAC score</p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            Check My Home Health Score
          </div>
        </div>
      </div>
    </div>
  );
}
