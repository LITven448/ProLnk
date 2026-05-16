import { useState } from 'react';

const features = [
  { id: 'ac', label: 'Central AC system', summer: 'AC pre-season tune-up (book April)', cost: 150 },
  { id: 'attic', label: 'Attic space', summer: 'Add ridge vent or attic fan to cut heat transfer', cost: 400 },
  { id: 'deck', label: 'Wood deck or fence', summer: 'Apply exterior stain/sealant before June heat', cost: 300 },
  { id: 'pool', label: 'Swimming pool', summer: 'Pool opening: balance chemicals, inspect pump & filter', cost: 200 },
  { id: 'irrigation', label: 'Irrigation system', summer: 'Adjust zones to 2x/week watering before water restrictions hit', cost: 80 },
  { id: 'trees', label: 'Large shade trees', summer: 'Pest inspection — borers and bark beetles peak in summer heat', cost: 120 },
];

const pestTips = [
  { pest: '🐜 Fire Ants', peak: 'April–September', tip: 'Broadcast bait in spring before peak, treat mounds as they appear' },
  { pest: '🐝 Wasps & Hornets', peak: 'May–August', tip: 'Inspect eaves, shutters, and outdoor furniture monthly' },
  { pest: '🦟 Mosquitos', peak: 'June–October', tip: 'Eliminate standing water weekly — even bottle caps count in DFW humidity' },
];

export default function DFWSummerHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const tasks = features.filter(f => selected.includes(f.id));
  const totalCost = tasks.reduce((sum, t) => sum + t.cost, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>☀️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Summer Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>June – August Preparation Checklist</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          ⚠️ DFW ALERT: Temperatures regularly exceed 105°F from late June through August. Prepare your AC and attic BEFORE Memorial Day.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🌿 Seasonal Priorities</h2>
        {[
          { month: 'May', tasks: ['Book AC tune-up (HVAC calendars fill by June)', 'Apply deck stain before heat cracks the wood', 'Test irrigation zones and head coverage'] },
          { month: 'June', tasks: ['Open pool, balance chemicals, inspect pump', 'Install attic fan or check ridge vent airflow', 'Start monthly pest inspections'] },
          { month: 'July–August', tasks: ['Monitor AC refrigerant (call if not cooling to setpoint)', 'Adjust irrigation to avoid DFW water restrictions', 'Inspect trees for bark damage from heat stress'] },
        ].map(({ month, tasks: t }) => (
          <div key={month} style={{ background: '#111f35', borderRadius: 10, padding: '16px 20px', marginBottom: 16, borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{month}</div>
            {t.map((task, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 4 }}>• {task}</div>)}
          </div>
        ))}

        <h2 style={{ color: '#F5E642', fontSize: 20, margin: '32px 0 16px' }}>🐛 DFW Pest Surge Calendar</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {pestTips.map(p => (
            <div key={p.pest} style={{ background: '#111f35', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24 }}>{p.pest.split(' ')[0]}</div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{p.pest.slice(2)} — <span style={{ color: '#94a3b8', fontWeight: 400 }}>Peak: {p.peak}</span></div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{p.tip}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Build Your Summer Task List</h2>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select which features your home has:</p>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {features.map(f => (
            <button key={f.id} onClick={() => toggle(f.id)} style={{ background: selected.includes(f.id) ? '#1a3a5c' : '#111f35', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>{f.label}</span>
              <span style={{ fontSize: 18 }}>{selected.includes(f.id) ? '✅' : '⬜'}</span>
            </button>
          ))}
        </div>

        <button onClick={() => setShowResults(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
          Generate My Summer Prep List →
        </button>

        {showResults && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: '24px', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16, margin: '0 0 16px' }}>Your Prioritized Summer Tasks</h3>
            {tasks.length === 0 ? (
              <p style={{ color: '#94a3b8' }}>Select home features above to generate your list.</p>
            ) : (
              <>
                {tasks.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < tasks.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                    <span style={{ color: '#cbd5e1', fontSize: 14, flex: 1, paddingRight: 12 }}>{i + 1}. {t.summer}</span>
                    <span style={{ color: '#F5E642', fontWeight: 600, whiteSpace: 'nowrap' }}>~${t.cost}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #F5E642', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                  <span>Estimated Total</span>
                  <span style={{ color: '#F5E642' }}>${totalCost.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
