import { useState } from 'react';

const situations = [
  {
    id: 'no-spring-service',
    label: '📅 AC has NOT been serviced this spring',
    urgency: 'BOOK TODAY',
    urgencyColor: '#ef4444',
    detail: 'DFW summer temps hit 100°F+ in June. AC that has not been tuned up in 12+ months runs 15-25% less efficiently. Coils get dirty. Refrigerant may be low. Capacitors fail. A $150 tune-up now prevents a $3,000 emergency call in July.',
    steps: [
      'Book a ProLnk HVAC tune-up today — spring slots fill in May',
      'Ask for: coil cleaning, refrigerant check, capacitor test, filter replacement, thermostat calibration',
      'Do NOT wait until it breaks — DFW HVAC emergency response times in summer average 3-5 days'
    ]
  },
  {
    id: 'dirty-filter',
    label: '🌫️ I know my filter is dirty (or I cannot remember)',
    urgency: 'DO IT NOW',
    urgencyColor: '#f59e0b',
    detail: 'Dirty filters in DFW restrict airflow which forces the compressor to work harder in already-brutal heat. A clogged filter can drop system efficiency 15% and cause the evaporator coil to freeze — killing your AC entirely.',
    steps: [
      'Replace filter today — do not wait for service call',
      'DFW homes: 1-inch filters every 30 days, 4-inch filters every 90 days',
      'If system has been running on dirty filter for months, book ProLnk coil cleaning'
    ]
  },
  {
    id: 'old-system',
    label: '📆 My system is 12+ years old',
    urgency: 'GET ASSESSMENT',
    urgencyColor: '#f59e0b',
    detail: 'DFW systems over 12 years are in the failure-risk zone. R-22 refrigerant (used in pre-2010 systems) is illegal to manufacture and costs $100+/lb when found. If your compressor fails in July, you may be looking at a full replacement — better to plan now.',
    steps: [
      'Book ProLnk HVAC assessment — ask for honest 3-5 year system projection',
      'Ask if system uses R-22 refrigerant — if yes, budget for replacement this year',
      'Get quotes now while you have negotiating power — not during a July emergency'
    ]
  },
  {
    id: 'running-not-cooling',
    label: '❄️ Running but not cooling well',
    urgency: 'CALL TODAY',
    urgencyColor: '#ef4444',
    detail: 'AC running but not cooling in DFW heat usually means: low refrigerant (leak), frozen evaporator coil, failing capacitor, or dirty condenser coils. All get worse fast when temps hit 95°F. This is not a wait-and-see situation.',
    steps: [
      'Check filter first — if it is black, replace it and see if cooling improves in 2 hours',
      'Check outdoor condenser: is the fan spinning? Is it running at all?',
      'Book ProLnk HVAC emergency call — same-day available through ProLnk vetted pros'
    ]
  },
  {
    id: 'everything-fine',
    label: '✅ System seems fine — just want to prepare',
    urgency: 'SPRING PREP',
    urgencyColor: '#22c55e',
    detail: 'Great timing. DFW HVAC pros book up fast in May-June. Scheduling spring maintenance now while things are running fine is the lowest-cost, highest-reliability strategy for surviving DFW summer.',
    steps: [
      'Book tune-up for late May before summer demand surge',
      'Set thermostat to 78°F when home, 85°F when away — optimal DFW efficiency setting',
      'Add home to ProLnk Vault — document system age, model, and last service for future reference'
    ]
  }
];

export default function DFWHVACDFWFinalAction2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            DFW HVAC Final Action Guide May 2026
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            FINAL GUIDE 2026 — DEFINITIVE DFW RESOURCE
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0′ }}>
            What to do with your DFW HVAC right now — before summer hits. No fluff, just action.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your HVAC Situation Right Now →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642′ : '#1e3a5f',
                  color: selected === s.id ? '#0A1628′ : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'inline-block', background: active.urgencyColor, color: '#fff', fontSize: '12px', fontWeight: '800', padding: '4px 12px', borderRadius: '4px', marginBottom: '12px' }}>
              {active.urgency}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{active.detail}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {active.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: '800', minWidth: '20px' }}>{i + 1}.</span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5′ }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px' }}>
            Book a vetted DFW HVAC pro today — spring slots filling fast
          </p>
          <a href="https://prolnk.io" style={{
            background: '#F5E642', color: '#0A1628', padding: '14px 32px',
            borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-block'
          }}>
            Book DFW HVAC Pro Now → prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}
