import { useState } from 'react';

const symptoms = [
  { id: 'hairline', label: 'Hairline crack, no door/window issues', urgency: 'low', advice: 'Monitor for 90 days. Photo-document now. If no change, likely cosmetic settlement.' },
  { id: 'one_door', label: 'Single sticking door in fall or spring', urgency: 'low', advice: 'Likely seasonal clay expansion/contraction. Re-evaluate after the season shifts. Monitor 60–90 days.' },
  { id: 'slab_leak', label: 'Active slab leak (wet floors, high water bill)', urgency: 'emergency', advice: 'Do NOT wait. Call a plumber today. Water under the slab accelerates foundation movement rapidly.' },
  { id: 'large_new', label: 'Sudden new large crack (>1/4 inch wide)', urgency: 'urgent', advice: 'Call this week. Rapid cracking suggests active soil movement. Get a structural engineer evaluation.' },
  { id: 'multi_door', label: 'Multiple sticking doors appearing within weeks', urgency: 'urgent', advice: 'Call this week. Multiple simultaneous symptoms suggest significant differential movement.' },
  { id: 'sloped', label: 'Noticeably sloped or bouncy floors', urgency: 'urgent', advice: 'Schedule an elevation survey within 2 weeks. Slope >1 inch per 20 feet is a structural concern.' },
  { id: 'brick_stairstep', label: 'Stair-step cracks in brick exterior', urgency: 'moderate', advice: 'Schedule within 30 days. Classic DFW shrink-swell symptom. Document with photos.' },
];

const colors: Record<string, string> = { emergency: '#ef4444', urgent: '#f97316', moderate: '#eab308', low: '#22c55e' };
const labels: Record<string, string> = { emergency: '🚨 Emergency — Do Not Wait', urgent: '⚠️ Urgent — This Week', moderate: '📅 Moderate — Within 30 Days', low: '✅ Low — Monitor' };

export default function DFWFoundationOkToWait2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW Foundation: Is It OK to Wait? — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW's expansive clay soil creates unique urgency rules. Not all cracks are equal.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌍 Why DFW Foundation Timing Is Different</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            North Texas sits on <strong>expansive black clay (Blackland Prairie)</strong> that swells when wet and shrinks when dry.
            Summer droughts cause dramatic shrinkage; heavy rains cause rapid swelling. This cycle means symptoms
            that are stable in other climates can become structural in DFW within a single season.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Select Your Symptom</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
                  background: selected === s.id ? '#0A1628′ : ’transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `4px solid ${colors[match.urgency]}` }}>
            <div style={{ color: colors[match.urgency], fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{labels[match.urgency]}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{match.advice}</p>
          </div>
        )}

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Rules at a Glance</h2>
          {[
            ['Never wait', 'Active slab leak, sudden wide crack, flooding near foundation'],
            ['Act this week', 'Multiple simultaneous symptoms, rapid new changes'],
            ['Schedule 30 days', 'Brick stairstep cracks, one sticking door with other symptoms'],
            ['Monitor 90 days', 'Single hairline crack, one seasonal door, no other signs'],
          ].map(([timing, desc]) => (
            <div key={timing} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 140 }}>{timing}</span>
              <span style={{ color: '#94a3b8′ }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Get a DFW Foundation Assessment</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>ProLnk routes you to engineer-supervised Charter foundation pros with elevation survey tools.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Get Assessed →
          </a>
        </div>
      </div>
    </div>
  );
}