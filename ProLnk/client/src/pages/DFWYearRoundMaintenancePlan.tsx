import { useState } from 'react';

const calendar = [
  { month: 'January', tasks: ['🔥 Test heating system mid-month', '🚰 Check for freeze damage from December', '📋 File insurance claims from winter storms'], budget: '$0-200′ },
  { month: 'February', tasks: ['🌬️ Replace HVAC filter (cedar pollen starts)', '🔍 Inspect roof after winter rain season', '🧹 Clean dryer vent'], budget: '$50-300′ },
  { month: 'March', tasks: ['🪟 Wash windows (pollen season peak)', '🏠 Pressure wash exterior', '💨 Clean HVAC vents and registers', '🌱 Service irrigation system for spring'], budget: '$300-800′ },
  { month: 'April', tasks: ['🍃 Clean gutters (spring storms clog them)', '🔧 AC tune-up before summer heat', '🏗️ Inspect foundation for winter settling cracks'], budget: '$200-600′ },
  { month: 'May', tasks: ['❄️ Test AC before 90°F+ days arrive', '🌳 Trim trees away from roofline', '🚪 Check weatherstripping on all exterior doors'], budget: '$150-400′ },
  { month: 'June', tasks: ['🌡️ Monitor attic temp — max 130°F', '🏊 Pool chemical check (summer mode)', '🔌 Test GFCI outlets in bathrooms/kitchen'], budget: '$50-200′ },
  { month: 'July', tasks: ['💧 Deep water trees & shrubs (clay soil cracks)', '🌡️ AC filter check — replace if needed', '🐜 Pest inspection (summer peak)'], budget: '$100-400′ },
  { month: 'August', tasks: ['🏠 Inspect exterior caulking (UV degrades it)', '🔧 AC filter replacement', '💡 Check smoke & CO2 detectors'], budget: '$50-150′ },
  { month: 'September', tasks: ['🍂 Begin fall prep — buy weatherstrip supplies', '🔥 Test furnace/heating system early', '🌿 Start reducing irrigation schedule'], budget: '$100-300′ },
  { month: 'October', tasks: ['🍃 Gutter cleaning (oak leaf drop)', '🚪 Weatherstrip doors & seal windows', '🌿 Winterize irrigation system'], budget: '$200-600′ },
  { month: 'November', tasks: ['🧊 Pipe insulation check on exterior walls', '🔥 Furnace filter replacement', '⚡ Emergency kit check (generator, flashlights, water)'], budget: '$100-400′ },
  { month: 'December', tasks: ['🌡️ Freeze prep: know your shutoffs', '🎄 Check electrical — holiday lights + older panels', '📊 Review home maintenance log for the year'], budget: '$50-200′ },
];

const ageMultiplier: Record<string, number> = { new: 0.7, mid: 1.0, old: 1.4 };
const sizeMultiplier: Record<string, number> = { small: 0.7, medium: 1.0, large: 1.5 };

export default function DFWYearRoundMaintenancePlan() {
  const [age, setAge] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const adjustBudget = (range: string) => {
    if (!age || !size) return range;
    const [lo, hi] = range.replace(/\$/g, '').split('-').map(Number);
    const m = ageMultiplier[age] * sizeMultiplier[size];
    return `$${Math.round(lo * m)}-${Math.round(hi * m)}`;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          📅 DFW Year-Round Home Maintenance Plan
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          A month-by-month DFW-specific maintenance calendar. Adjust for your home's age and size to get personalized budget estimates.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏚️ Home Age</div>
            {[['new', '🆕 Under 10 yrs'], ['mid', '🏡 10–25 yrs'], ['old', '🏗️ 25+ yrs']].map(([k, label]) => (
              <button key={k} onClick={() => setAge(k)} style={{ display: 'block', width: '100%', marginBottom: '0.4rem', padding: '0.5rem 0.8rem', borderRadius: 8, border: '2px solid', borderColor: age === k ? '#F5E642′ : '#1e3a5f', background: age === k ? '#F5E642' : '#0f2040', color: age === k ? '#0A1628' : '#fff', fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>
                {label}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📐 Home Size</div>
            {[['small', '🏠 Under 1,500 sqft'], ['medium', '🏡 1,500–3,000 sqft'], ['large', '🏰 3,000+ sqft']].map(([k, label]) => (
              <button key={k} onClick={() => setSize(k)} style={{ display: 'block', width: '100%', marginBottom: '0.4rem', padding: '0.5rem 0.8rem', borderRadius: 8, border: '2px solid', borderColor: size === k ? '#F5E642′ : '#1e3a5f', background: size === k ? '#F5E642' : '#0f2040', color: size === k ? '#0A1628' : '#fff', fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {calendar.map((month, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, overflow: 'hidden' }}>
              <div onClick={() => setExpanded(expanded === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1.1rem', cursor: 'pointer' }}>
                <div style={{ fontWeight: 600 }}>{month.month}</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>{adjustBudget(month.budget)}</span>
                  <span style={{ color: '#64748b' }}>{expanded === i ? '▲' : '▼'}</span>
                </div>
              </div>
              {expanded === i && (
                <div style={{ padding: '0 1.1rem 0.85rem' }}>
                  {month.tasks.map((task, j) => (
                    <div key={j} style={{ color: '#94a3b8', padding: '0.3rem 0', borderTop: j === 0 ? '1px solid #1e3a5f' : 'none', fontSize: '0.9rem' }}>{task}</div>
                  ))}
                  <div style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.8rem' }}>💡 Use ProLnk to schedule local pros for this month's contractor tasks</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}