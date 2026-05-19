import { useState } from 'react';

const mesquiteStats = [
  { label: 'Homes Built 1970–1995', value: '70%+' },
  { label: 'Aluminum Wiring Era Homes', value: '~18,000' },
  { label: 'Panel Upgrade Cost', value: '$2K–$5K' },
  { label: 'Electrical Fire Risk (old panels)', value: '3x higher' },
];

const questions = [
  'Is your home built before 1985?',
  'Does your panel have fuses instead of circuit breakers?',
  'Do lights flicker or dim when appliances run?',
  'Have you added major appliances without updating the panel?',
  'Do any outlets feel warm to the touch?',
  'Are there outlets without GFCI protection near water sources?',
  'Do circuit breakers trip more than once a month?',
  'Is any wiring visible and unprotected in the basement or crawlspace?',
  'Has the panel never been professionally inspected?',
  'Do you have a Federal Pacific or Zinsco brand panel?',
];

function getRiskLevel(score: number): { label: string; color: string; description: string; priority: string[] } {
  if (score <= 2) return {
    label: 'Low Risk',
    color: '#4CAF50',
    description: 'Your home\’s electrical system appears to be in generally good condition.',
    priority: ['Schedule a routine inspection every 5 years', 'Verify GFCI outlets are functional monthly', 'Keep panel area clear and accessible'],
  };
  if (score <= 5) return {
    label: 'Moderate Risk',
    color: '#F5E642',
    description: 'Several indicators suggest your system needs professional evaluation.',
    priority: ['Schedule a full electrical inspection within 6 months', 'Add GFCI outlets in kitchen and bathrooms', 'Have panel capacity assessed for modern loads'],
  };
  if (score <= 8) return {
    label: 'High Risk',
    color: '#FF6B35',
    description: 'Multiple serious risk factors detected. Professional inspection within 30 days recommended.',
    priority: ['Immediate panel inspection required', 'Check for aluminum wiring at outlets and switches', 'Upgrade to arc-fault (AFCI) breakers in bedrooms', 'Replace any Federal Pacific or Zinsco panel'],
  };
  return {
    label: 'Critical Risk',
    color: '#E53935',
    description: 'Your home has multiple major electrical safety indicators. Do not delay — contact a licensed electrician immediately.',
    priority: ['Emergency inspection this week', 'Full panel replacement likely required', 'Whole-home aluminum wiring remediation', 'Smoke detector audit in every room'],
  };
}

export default function DFWElectricianMesquite() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  function toggle(index: number) {
    setAnswers(prev => ({ ...prev, [index]: !prev[index] }));
    setSubmitted(false);
  }

  const score = Object.values(answers).filter(Boolean).length;
  const result = submitted ? getRiskLevel(score) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Mesquite TX Electricians
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            Older Home Safety Experts — Panel Upgrades, Aluminum Wiring & GFCI Specialists
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Mesquite's Electrical Challenge: Built in the Aluminum Wiring Era</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            Mesquite was developed heavily in the 1970s and 1980s — the precise window when aluminum wiring
            was used as a cost-saving substitute for copper in residential construction. Aluminum wiring
            expands and contracts at different rates than copper, causing loose connections at outlets and
            fixtures over time — a leading cause of residential electrical fires.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Additionally, panels from this era — including notorious brands like Federal Pacific and Zinsco —
            are now known to have serious safety defects. Modern loads (EV chargers, hot tubs, home offices)
            can overwhelm these older systems. Mesquite electricians who specialize in older homes understand
            both the code requirements and the practical realities of updating these systems safely.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {mesquiteStats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🔌 Electrical Safety Score — 10-Question Check</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Answer yes or no to each question. We'll calculate your home's risk level and priority repairs.
          </p>

          <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
            {questions.map((q, i) => (
              <div
                key={i}
                onClick={() => toggle(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  backgroundColor: answers[i] ? '#1a2d1a' : '#0A1628',
                  border: `1px solid ${answers[i] ? '#4CAF50' : '#334155'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  backgroundColor: answers[i] ? '#4CAF50' : 'transparent',
                  border: `2px solid ${answers[i] ? '#4CAF50' : '#334155'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 14,
                }}>
                  {answers[i] ? '✓' : ''}
                </div>
                <span style={{ color: '#CBD5E1', fontSize: 15 }}>{q}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <button
              onClick={() => setSubmitted(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 28px', border: 'none', borderRadius: 8, cursor: 'pointer' }}
            >
              Calculate My Risk Score →
            </button>
            <span style={{ color: '#94A3B8', fontSize: 14 }}>{score} of 10 yes answers</span>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: result.color }} />
                <span style={{ color: result.color, fontWeight: 800, fontSize: 20 }}>{result.label}</span>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>({score}/10 risk indicators)</span>
              </div>
              <p style={{ color: '#CBD5E1', marginBottom: 16, fontSize: 15 }}>{result.description}</p>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Priority Actions:</div>
              {result.priority.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: result.color, flexShrink: 0 }}>→</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14 }}>{action}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Connect With a Mesquite Electrical Specialist
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk matches you with licensed Mesquite electricians who specialize in older home upgrades.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get Safety Inspection Quote
          </button>
        </div>

      </div>
    </div>
  );
}
