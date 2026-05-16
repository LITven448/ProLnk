import { useState } from 'react';

const questions = [
  { id: 'breakers', text: 'Do your breakers trip frequently or feel warm to the touch?', weight: 3 },
  { id: 'flickering', text: 'Do lights flicker or dim when appliances turn on?', weight: 2 },
  { id: 'fuses', text: 'Does your panel use fuses instead of breakers?', weight: 4 },
  { id: 'under100', text: 'Is your panel rated 100A or less?', weight: 3 },
  { id: 'ev', text: 'Do you own or plan to add an EV charger?', weight: 3 },
  { id: 'generator', text: 'Do you want a whole-home generator?', weight: 2 },
  { id: 'additions', text: 'Have you added major appliances or a room addition recently?', weight: 2 },
  { id: 'age', text: 'Is your home more than 30 years old with original electrical?', weight: 3 },
];

const costItems = [
  { item: 'Panel replacement (100A → 200A)', low: 1500, high: 2500 },
  { item: 'Panel replacement (200A → 400A)', low: 2500, high: 4000 },
  { item: 'DFW permit (required)', low: 75, high: 200 },
  { item: 'Inspection fee', low: 50, high: 150 },
  { item: 'EV charger circuit add-on', low: 500, high: 1200 },
  { item: 'Surge protection add-on', low: 200, high: 500 },
];

export default function ElectricalPanelUpgradeGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = questions.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
  const maxScore = questions.reduce((sum, q) => sum + q.weight, 0);
  const pct = Math.round((score / maxScore) * 100);

  const risk = pct >= 65 ? 'High' : pct >= 35 ? 'Moderate' : 'Low';
  const riskColor = pct >= 65 ? '#ef4444' : pct >= 35 ? '#f59e0b' : '#22c55e';
  const rec = pct >= 65
    ? 'Upgrade is strongly recommended. Contact a licensed DFW electrician immediately.'
    : pct >= 35
    ? 'An inspection is advised. An electrician can confirm whether an upgrade is needed.'
    : 'Your panel appears sufficient for now. Reassess when adding high-draw appliances.';

  const toggle = (id: string) => {
    setAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>⚡ DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Electrical Panel Upgrade Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 600 }}>
            Signs you need an upgrade, EV charger requirements, DFW permits, and an 8-question diagnostic tool.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🔌', title: '60A Panels', body: 'Found in pre-1970 homes. Dangerously undersized by modern standards. Cannot support modern appliances safely.' },
            { icon: '⚡', title: '100A Panels', body: 'Standard from 1970–1990. Sufficient for older homes but insufficient for EVs, hot tubs, or large HVACs.' },
            { icon: '🚗', title: 'EV Chargers', body: 'Level 2 chargers require a dedicated 50A circuit. Most require a 200A panel minimum.' },
            { icon: '🏠', title: 'Whole-Home Generators', body: 'Transfer switches for whole-home generators typically require a 200A+ panel with dedicated space for the transfer switch.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>💰 DFW Cost Breakdown</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E2D45' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', color: '#F5E642', fontWeight: 700 }}>Service</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>Low</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>High</th>
                </tr>
              </thead>
              <tbody>
                {costItems.map((c, i) => (
                  <tr key={c.item} style={{ background: i % 2 === 0 ? 'transparent' : '#0A1628' }}>
                    <td style={{ padding: '10px 14px', color: '#e2e8f0' }}>{c.item}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>${c.low.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', color: '#94a3b8' }}>${c.high.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🔍 Do I Need an Upgrade? — Diagnostic</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Answer all 8 questions to get your risk score and recommendation.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
            {questions.map((q, i) => (
              <div
                key={q.id}
                onClick={() => toggle(q.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                  background: answers[q.id] ? '#1a2a45' : '#0A1628',
                  border: `1px solid ${answers[q.id] ? '#F5E642' : '#1E2D45'}`,
                  borderRadius: 10, cursor: 'pointer', transition: 'all 0.15s',
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
                <span style={{ fontSize: 14, color: '#e2e8f0' }}><strong style={{ color: '#94a3b8' }}>{i + 1}.</strong> {q.text}</span>
              </div>
            ))}
          </div>

          {answered >= 8 && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Risk Score</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: riskColor }}>{risk}</span>
              </div>
              <div style={{ background: '#1E2D45', borderRadius: 99, height: 10, marginBottom: 16 }}>
                <div style={{ width: `${pct}%`, background: riskColor, borderRadius: 99, height: 10, transition: 'width 0.4s' }} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>{rec}</div>
            </div>
          )}
          {answered < 8 && (
            <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>{8 - answered} question{8 - answered !== 1 ? 's' : ''} remaining</div>
          )}
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px' }}>📋 DFW Permit Requirements</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>All panel replacements require a permit from your city's building department</li>
            <li>Dallas, Fort Worth, Plano, Frisco, and McKinney each have separate permit portals</li>
            <li>Inspections are required after installation — typically scheduled within 48–72 hours</li>
            <li>Unpermitted electrical work can void homeowner's insurance coverage</li>
            <li>Only licensed Texas electricians (Master Electrician license) may pull permits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
