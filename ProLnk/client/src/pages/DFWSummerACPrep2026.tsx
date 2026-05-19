import { useState } from 'react';

const prepChecklist = [
  { icon: '🗓️', task: 'March Tune-Up Window', detail: 'Book before April 15 — DFW HVAC techs are fully booked by May 1. A tune-up now prevents $3,000+ emergency calls in July.' },
  { icon: '🌬️', task: 'Replace Air Filter', detail: 'Use MERV 11-13 for DFW dust and pollen season. Replace monthly during peak summer operation (June-September).' },
  { icon: '🌿', task: 'Clear Outdoor Unit', detail: 'Remove 2 feet of clearance around condenser. Trim back Bermuda grass, trim shrubs, and remove cottonwood seeds blocking fins.' },
  { icon: '🌡️', task: 'Thermostat Test', detail: 'Run a full cooling cycle before temperatures hit 90°F. Set to 68°F and verify unit reaches temp within 20 minutes.' },
  { icon: '💧', task: 'Condensate Drain Clear', detail: 'Pour 1 cup of white vinegar into drain line access. DFW humidity causes algae buildup — a clogged drain causes water damage and shutdown.' },
  { icon: '🔍', task: 'Duct Visual Inspection', detail: 'Check accessible ductwork in attic for disconnected joints. DFW attic temperatures reach 150°F — leaky ducts waste 20-30% of cooling.' },
  { icon: '💰', task: 'Emergency Budget Reserve', detail: 'DFW emergency HVAC service runs $250-500 for a weekend call during a heat wave. Charter pros offer priority same-day service.' },
];

const priorities: Record<string, { label: string; actions: string[] }> = {
  'under-5-new': { label: '✅ Low Priority', actions: ['Basic tune-up optional', 'Replace filter', 'Clear outdoor unit', 'Test thermostat'] },
  '5-10-mid': { label: '⚠️ Medium Priority', actions: ['Schedule professional tune-up by April', 'Inspect condensate drain', 'Test run before heat', 'Clear outdoor unit thoroughly'] },
  '10-15-aging': { label: '🔶 High Priority', actions: ['Professional tune-up REQUIRED', 'Refrigerant level check', 'Capacitor and contactor inspection', 'Get replacement quote now for budgeting'] },
  '15-plus-old': { label: '🚨 Urgent Priority', actions: ['Replace before summer hits', 'System failure risk is HIGH in DFW heat', 'Financing available through Charter pros', 'Every month you wait increases risk'] },
};

export default function DFWSummerACPrep2026() {
  const [ageKey, setAgeKey] = useState('');
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => setChecked((prev) => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            DFW Summer AC Preparation 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>The complete pre-summer AC checklist for North Texas homeowners</p>
        </div>

        <div style={{ background: '#1a3a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>⏰</span>
            <div>
              <div style={{ fontWeight: 700, color: '#22c55e', fontSize: 16 }}>Act Now — DFW HVAC Techs Book Up Fast</div>
              <div style={{ color: '#86efac', fontSize: 14 }}>May 2026: Most reputable DFW HVAC companies are already at 2-3 week wait. Book via ProLnk Charter pros for priority scheduling.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>✅ Summer Prep Checklist</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Check off items as you complete them</p>
          {prepChecklist.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{ display: 'flex', gap: 16, padding: 16, marginBottom: 8, background: checked.has(i) ? '#0d2e0d' : '#0d1f35', borderRadius: 10, cursor: 'pointer', borderLeft: checked.has(i) ? '4px solid #22c55e' : '4px solid #1e3a5f', transition: 'all 0.2s' }}
            >
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: checked.has(i) ? '#22c55e' : '#e2e8f0', marginBottom: 4, textDecoration: checked.has(i) ? 'line-through' : 'none' }}>
                  {item.task}
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.detail}</div>
              </div>
              <div style={{ fontSize: 20 }}>{checked.has(i) ? '☑️' : '⬜'}</div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 12, color: '#F5E642', fontWeight: 700 }}>
            {checked.size} / {prepChecklist.length} complete
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Your AC Age → Priority Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {[
              { key: 'under-5-new', label: 'Under 5 years' },
              { key: '5-10-mid', label: '5–10 years' },
              { key: '10-15-aging', label: '10–15 years' },
              { key: '15-plus-old', label: '15+ years' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setAgeKey(key)}
                style={{ padding: '10px 16px', background: ageKey === key ? '#F5E642′ : '#0d1f35', color: ageKey === key ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: ’pointer', fontWeight: 600 }}
              >
                {label}
              </button>
            ))}
          </div>
          {ageKey && priorities[ageKey] && (
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{priorities[ageKey].label}</div>
              {priorities[ageKey].actions.map((a, i) => (
                <div key={i} style={{ color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>→ {a}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Book DFW Summer Prep via ProLnk</h3>
          <p style={{ color: '#1e3a5f' }}>Charter HVAC pros offer priority scheduling and same-day emergency service.</p>
          <p style={{ color: '#0A1628', fontWeight: 700, marginTop: 8 }}>prolnk.io → HVAC Tune-Up</p>
        </div>
      </div>
    </div>
  );
}