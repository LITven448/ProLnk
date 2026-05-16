import { useState } from 'react';

const CATEGORIES = [
  { key: 'structural', label: 'Structural', weight: 0.25, icon: '🏗️', color: '#f59e0b' },
  { key: 'mechanical', label: 'Mechanical', weight: 0.25, icon: '⚙️', color: '#38bdf8' },
  { key: 'envelope', label: 'Envelope', weight: 0.20, icon: '🏠', color: '#818cf8' },
  { key: 'site', label: 'Site', weight: 0.15, icon: '🌳', color: '#4ade80' },
  { key: 'interior', label: 'Interior', weight: 0.10, icon: '🛋️', color: '#fb7185' },
  { key: 'documentation', label: 'Documentation', weight: 0.05, icon: '📄', color: '#94a3b8' },
];

function getScoreLabel(score: number) {
  if (score >= 90) return { label: 'Excellent', color: '#4ade80', bg: '#14532d' };
  if (score >= 75) return { label: 'Good', color: '#a3e635', bg: '#1a2e05' };
  if (score >= 60) return { label: 'Fair', color: '#fbbf24', bg: '#422006' };
  if (score >= 40) return { label: 'Poor', color: '#f97316', bg: '#431407' };
  return { label: 'Critical', color: '#ef4444', bg: '#450a0a' };
}

export default function TrustyProHealthScoreExplainer() {
  const [values, setValues] = useState<Record<string, number>>({
    structural: 80,
    mechanical: 75,
    envelope: 85,
    site: 90,
    interior: 88,
    documentation: 60,
  });

  const compositeScore = Math.round(
    CATEGORIES.reduce((sum, cat) => sum + values[cat.key] * cat.weight, 0)
  );

  const { label, color, bg } = getScoreLabel(compositeScore);

  const update = (key: string, val: number) => setValues(prev => ({ ...prev, [key]: val }));

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f172a)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px' }}>
          Your TrustyPro Home Health Score
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
          What It Means and How to Improve It
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* What It Measures */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#818cf8', margin: '0 0 16px' }}>📊 What the Score Measures</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: '0 0 24px' }}>
            Your home health score is a weighted composite of 6 system categories evaluated by AI visual scanning and documented service history.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.key} style={{ background: '#0f172a', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{cat.icon}</span>
                <div>
                  <div style={{ color: cat.color, fontWeight: 700 }}>{cat.label}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{Math.round(cat.weight * 100)}% weight</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Ranges */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 20px' }}>📈 Score Ranges</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { range: '90–100', label: 'Excellent', color: '#4ade80', detail: 'Proactive maintenance, no significant issues' },
              { range: '75–89', label: 'Good', color: '#a3e635', detail: 'Minor issues or aging systems. Normal for 10–20 year old homes.' },
              { range: '60–74', label: 'Fair', color: '#fbbf24', detail: 'Several items needing attention. Action within 90 days recommended.' },
              { range: '40–59', label: 'Poor', color: '#f97316', detail: 'Significant issues detected. Prioritize Critical items immediately.' },
              { range: 'Below 40', label: 'Critical', color: '#ef4444', detail: 'Multiple serious issues. Immediate professional assessment needed.' },
            ].map(item => (
              <div key={item.range} style={{ background: '#0f172a', borderRadius: 10, padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <span style={{ color: item.color, fontWeight: 800, fontSize: 18, minWidth: 80 }}>{item.range}</span>
                <span style={{ color: item.color, fontWeight: 700, minWidth: 90 }}>{item.label}</span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Improve */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 20px' }}>📈 How to Improve Your Score</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🚨', tip: 'Address Critical items first — biggest single impact on score' },
              { icon: '⚙️', tip: 'Service aging HVAC and water heater — improves Mechanical category' },
              { icon: '📄', tip: 'Upload service receipts and permits — improves Documentation score quickly' },
              { icon: '🏠', tip: 'Fix exterior issues (roof, drainage) — improves Structural and Envelope scores' },
              { icon: '📸', tip: 'Scan more frequently — more data means more accurate (and often higher) score' },
            ].map(item => (
              <div key={item.tip} style={{ display: 'flex', gap: 14, background: '#0f172a', borderRadius: 10, padding: '14px 18px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Change Context */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #1e293b)', border: '1px solid #818cf8', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#818cf8', margin: '0 0 12px' }}>💡 What Score Changes Mean</h3>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            A <strong style={{ color: '#ef4444' }}>10-point drop</strong> between scans is worth investigating — something changed.
            A <strong style={{ color: '#4ade80' }}>5-point improvement</strong> after a service call confirms the issue was actually resolved.
          </p>
        </div>

        {/* Interactive Simulator */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>🎛️ Score Simulator</h2>
          <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 28px' }}>Adjust category health to see how each change affects your overall score</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ color: '#94a3b8', fontWeight: 600 }}>
                    {cat.icon} {cat.label} <span style={{ color: '#64748b', fontSize: 13 }}>({Math.round(cat.weight * 100)}%)</span>
                  </label>
                  <span style={{ color: cat.color, fontWeight: 700 }}>{values[cat.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[cat.key]}
                  onChange={e => update(cat.key, Number(e.target.value))}
                  style={{ width: '100%', accentColor: cat.color }}
                />
              </div>
            ))}

            <div style={{ background: bg, borderRadius: 14, padding: '24px 28px', textAlign: 'center', marginTop: 8 }}>
              <div style={{ color: color, fontSize: 14, marginBottom: 4, fontWeight: 600 }}>Your Composite Score</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: color }}>{compositeScore}</div>
              <div style={{ color: color, fontSize: 20, fontWeight: 700 }}>{label}</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Join the waitlist to see your home's real AI-generated health score.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#818cf8', color: '#fff', fontWeight: 800, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18 }}>
            See Your Real Score →
          </a>
        </div>
      </div>
    </div>
  );
}
