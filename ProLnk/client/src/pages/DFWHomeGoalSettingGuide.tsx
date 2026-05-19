import { useState } from 'react';

const goalOptions = [
  { id: 'safety', label: '🛡️ Safety & Code Compliance', months: ['Jan', 'Feb'], note: 'Smoke detectors, GFCI, panel inspection — do first, before anything else.' },
  { id: 'hvac', label: '❄️ HVAC System Service/Replacement', months: ['Feb', 'Mar'], note: 'Book by March for summer readiness. June appointments are gone.' },
  { id: 'foundation', label: '🏠 Foundation Repair/Prevention', months: ['Mar', 'Apr'], note: 'Inspect after winter. Repair cracks before summer heat expands clay soil.' },
  { id: 'roof', label: '🏚️ Roof Repair or Replacement', months: ['Apr', 'May'], note: 'Post-hail season assessment in May-June. Avoid booking during storm chaser season.' },
  { id: 'kitchen', label: '🍳 Kitchen Remodel', months: ['Sep', 'Oct'], note: 'Book fall — contractors available after summer rush. Lead time: 3–4 months.' },
  { id: 'bath', label: '🚿 Bathroom Update', months: ['Aug', 'Sep'], note: 'Book August for fall start. Tile and fixture lead times run 6–8 weeks.' },
  { id: 'landscape', label: '🌿 Landscaping / Outdoor', months: ['Feb', 'Mar'], note: 'Plant dormant trees in winter. Install irrigation before March watering restrictions.' },
  { id: 'windows', label: '🪟 Window Replacement', months: ['Oct', 'Nov'], note: 'Fall install = winter energy savings. Oncor rebates end Dec 31.' },
  { id: 'solar', label: '☀️ Solar Installation', months: ['Jan', 'Feb'], note: 'Long permitting timelines — start in Q1 for Q3 activation and full-year tax credit.' },
  { id: 'smart', label: '🤖 Smart Home Upgrades', months: ['Any'], note: 'Low disruption — can be done anytime. Pair with other contractor visits.' },
];

const budgetTiers = [
  { label: 'Under $5K', factor: 1 },
  { label: '$5K–$15K', factor: 2 },
  { label: '$15K–$40K', factor: 3 },
  { label: '$40K+', factor: 4 },
];

export default function DFWHomeGoalSettingGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState('');

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const selectedGoals = goalOptions.filter(g => selected.includes(g.id));

  const monthPlan: Record<string, string[]> = {};
  selectedGoals.forEach(g => {
    g.months.forEach(m => {
      if (!monthPlan[m]) monthPlan[m] = [];
      monthPlan[m].push(g.label);
    });
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Any'];
  const planMonths = months.filter(m => monthPlan[m]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎯</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Goal Setting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>Set realistic home goals for 2026 — with DFW-specific timing. When you book matters as much as what you book.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📌 Select Your 2026 Home Goals</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {goalOptions.map(g => (
              <button key={g.id} onClick={() => toggle(g.id)} style={{ backgroundColor: selected.includes(g.id) ? '#F5E642′ : '#0A1628', color: selected.includes(g.id) ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontSize: 13, fontWeight: selected.includes(g.id) ? 700 : 400 }}>{g.label}</button>
            ))}
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>ANNUAL BUDGET</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {budgetTiers.map(b => (
                <button key={b.label} onClick={() => setBudget(b.label)} style={{ backgroundColor: budget === b.label ? '#F5E642′ : '#0A1628', color: budget === b.label ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 12px', cursor: ’pointer', fontSize: 13 }}>{b.label}</button>
              ))}
            </div>
          </div>
        </div>

        {selectedGoals.length > 0 && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 Your 12-Month DFW Action Plan</h2>
            {planMonths.map(month => (
              <div key={month} style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{month === 'Any' ? 'Flexible Timing' : month}</div>
                {monthPlan[month].map(label => {
                  const goal = goalOptions.find(g => g.label === label);
                  return (
                    <div key={label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
                      <div style={{ color: '#94a3b8', fontSize: 13 }}>{goal?.note}</div>
                    </div>
                  );
                })}
              </div>
            ))}
            {budget && (
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, marginTop: 8 }}>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>BUDGET GUIDANCE — {budget}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14 }}>Prioritize: 1) Safety items 2) Systems (HVAC/plumbing/roof) 3) Comfort 4) Value-add upgrades. Always reserve 20% for surprises.</div>
              </div>
            )}
          </div>
        )}

        {selectedGoals.length === 0 && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center', color: '#64748b' }}>Select your goals above to generate your personalized 12-month plan.</div>
        )}

        <div style={{ textAlign: 'center', backgroundColor: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Ready to book your 2026 projects?</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>ProLnk matches you with vetted DFW contractors — before they're fully booked</div>
        </div>
      </div>
    </div>
  );
}
