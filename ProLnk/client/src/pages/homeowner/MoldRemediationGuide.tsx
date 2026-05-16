import { useState } from 'react';

const riskQuestions = [
  { id: 'humidity', text: 'Does your home often feel humid or muggy indoors?', weight: 3 },
  { id: 'waterDamage', text: 'Have you had any water damage, leaks, or flooding in the past 5 years?', weight: 4 },
  { id: 'hvacAge', text: 'Is your HVAC system more than 10 years old?', weight: 2 },
  { id: 'mustySmell', text: 'Have you noticed musty or earthy odors in any room?', weight: 3 },
  { id: 'visible', text: 'Have you seen visible dark spots on walls, ceilings, or grout?', weight: 5 },
  { id: 'condensation', text: 'Do windows frequently show condensation on the inside?', weight: 2 },
  { id: 'noDehumid', text: 'Do you have no dehumidifier in your home?', weight: 2 },
];

const costRanges = [
  { scope: 'Small area (< 10 sq ft)', low: 500, high: 1500, diy: true },
  { scope: 'Medium room (10–100 sq ft)', low: 1500, high: 3500, diy: false },
  { scope: 'Large area / multiple rooms', low: 3500, high: 6000, diy: false },
  { scope: 'HVAC / ductwork mold', low: 2000, high: 5000, diy: false },
  { scope: 'Crawl space remediation', low: 1500, high: 4000, diy: false },
  { scope: 'Attic mold (DFW common)', low: 1000, high: 3500, diy: false },
];

export default function MoldRemediationGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const answered = Object.keys(answers).length;
  const score = riskQuestions.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
  const maxScore = riskQuestions.reduce((sum, q) => sum + q.weight, 0);
  const pct = Math.round((score / maxScore) * 100);

  const risk = pct >= 60 ? 'High' : pct >= 35 ? 'Moderate' : 'Low';
  const riskColor = pct >= 60 ? '#ef4444' : pct >= 35 ? '#f59e0b' : '#22c55e';
  const action = pct >= 60
    ? 'Schedule a professional mold inspection within 30 days. Do not attempt DIY remediation on hidden or widespread mold.'
    : pct >= 35
    ? 'Consider a professional air quality test. Increase ventilation and monitor humidity levels closely.'
    : 'Your risk is low. Maintain RH below 50%, run bathroom fans, and inspect after any water event.';

  const toggle = (id: string) => setAnswers(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏠 DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Mold Remediation Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 600 }}>
            Why DFW humidity + AC systems create the perfect mold environment — and what to do about it.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ background: '#0f1e35', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>🌡️ The DFW Mold Problem</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
            DFW's hot, humid summers push indoor humidity dangerously high when AC systems are oversized or poorly maintained. When an oversized system cools air too quickly, it doesn't run long enough to remove humidity — creating the ideal 65–70°F, 60%+ humidity environment where mold thrives, especially in attics, crawlspaces, and HVAC ducts.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '⚠️', title: 'Warning Signs', items: ['Dark spots on ceiling or walls', 'Grout discoloration in bathrooms', 'Musty or earthy smell', 'Allergy symptoms worsen indoors', 'Bubbling or peeling paint or wallpaper'] },
            { icon: '🏥', title: 'Health Risks', items: ['Respiratory irritation & asthma flares', 'Chronic coughing or wheezing', 'Headaches and fatigue', 'Black mold (Stachybotrys) neurotoxic risk', 'Elevated risk for elderly and children'] },
            { icon: '🛡️', title: 'DIY Threshold (< 10 sq ft)', items: ['Use N95 mask and gloves', 'Borax or commercial mold killer', 'Dry area thoroughly before treating', 'Fix moisture source first', 'Re-inspect after 30 days'] },
            { icon: '👷', title: 'Call a Pro When:', items: ['Mold covers > 10 sq ft', 'Located in HVAC or ducts', 'Water damage was structural', 'Anyone in home is immunocompromised', 'After flooding or sewage backup'] },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 10 }}>{c.title}</div>
              <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                {c.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>💰 Remediation Cost Ranges (DFW 2025)</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E2D45' }}>
                  {['Scope', 'Low', 'High', 'DIY OK?'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#F5E642', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {costRanges.map((r, i) => (
                  <tr key={r.scope} style={{ background: i % 2 === 0 ? 'transparent' : '#0A1628' }}>
                    <td style={{ padding: '10px 14px' }}>{r.scope}</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>${r.low.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>${r.high.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ color: r.diy ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{r.diy ? 'Yes' : 'No'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>🔍 Mold Risk Assessment</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Answer all questions to get your risk level and recommended action plan.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {riskQuestions.map((q, i) => (
              <div
                key={q.id}
                onClick={() => toggle(q.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  background: answers[q.id] ? '#1a2a45' : '#0A1628',
                  border: `1px solid ${answers[q.id] ? '#F5E642' : '#1E2D45'}`,
                  borderRadius: 10, cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 4, flexShrink: 0,
                  background: answers[q.id] ? '#F5E642' : 'transparent',
                  border: `2px solid ${answers[q.id] ? '#F5E642' : '#475569'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0A1628', fontWeight: 800, fontSize: 14,
                }}>
                  {answers[q.id] ? '✓' : ''}
                </div>
                <span style={{ fontSize: 14 }}><strong style={{ color: '#94a3b8' }}>{i + 1}.</strong> {q.text}</span>
              </div>
            ))}
          </div>

          {answered >= 7 && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Your Risk Level</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: riskColor }}>{risk}</span>
              </div>
              <div style={{ background: '#1E2D45', borderRadius: 99, height: 10, marginBottom: 16 }}>
                <div style={{ width: `${pct}%`, background: riskColor, borderRadius: 99, height: 10 }} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>{action}</div>
            </div>
          )}
          {answered < 7 && (
            <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>{7 - answered} question{7 - answered !== 1 ? 's' : ''} remaining</div>
          )}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px' }}>🏛️ Insurance Coverage for Mold</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Most standard homeowner policies cover mold only if caused by a covered peril (burst pipe, storm)</li>
            <li>Mold from long-term neglect or humidity is typically excluded</li>
            <li>Texas policies often cap mold remediation coverage at $5,000–$10,000</li>
            <li>Document everything: photos, dates, contractor estimates before filing</li>
            <li>Mold endorsements can be added to policies for additional coverage in high-risk zones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
