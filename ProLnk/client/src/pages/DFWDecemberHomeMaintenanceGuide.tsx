import { useState } from 'react';

const tips = [
  { emoji: '🔌', title: 'Holiday Lighting Safety', detail: 'Use GFCI outlets outdoors. Never exceed 80% of circuit load. Check for frayed wires before hanging.' },
  { emoji: '🌡️', title: 'Freeze Watch Prep', detail: 'Know your main water shutoff location. Insulate exposed pipes in attic and exterior walls before temps drop below 28°F.' },
  { emoji: '🌬️', title: 'Furnace Filter Change', detail: 'December is the month. Replace 1-inch filters monthly, 4-inch filters every 6 months. MERV 8-11 recommended.' },
  { emoji: '🔥', title: 'Chimney Final Check', detail: 'If you missed the fall chimney sweep, do it before the first fire. Creosote buildup is a fire hazard.' },
  { emoji: '🏠', title: 'Attic Insulation Audit', detail: 'DFW attics should have R-38 to R-60. Cold air infiltration in December spikes energy bills 30-40%.' },
  { emoji: '💧', title: 'Outdoor Hose Bibs', detail: 'Disconnect garden hoses now. Install foam covers on exterior spigots before Dec 15.' },
];

const checklists: Record<string, string[]> = {
  'Older Home (20+ yrs)': ['Upgrade any 2-prong outdoor outlets to GFCI', 'Check attic insulation depth', 'Inspect furnace heat exchanger for cracks', 'Test carbon monoxide detectors', 'Caulk around window frames'],
  'New Construction': ['Register HVAC warranty before year-end', 'Confirm attic baffles are in place', 'Check builder-grade weatherstripping quality', 'Locate all shutoff valves now', 'Schedule first-year inspection'],
  'Has Pool': ['Drop water level below skimmer (if closing pool)', 'Blow out pool lines if hard freeze expected', 'Winterize pool equipment', 'Cover pool pump with insulating blanket', 'Add freeze protection on automation system'],
  'Rental Property': ['Confirm tenant knows water shutoff location', 'Verify smoke and CO detectors work', 'Check outdoor GFCI outlets', 'Schedule HVAC filter service', 'Send winter emergency contact info to tenants'],
};

export default function DFWDecemberHomeMaintenanceGuide() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW December Home Maintenance</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Holiday safety + freeze prep before temps drop in North Texas</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {tips.map((t) => (
            <div key={t.title} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{t.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 16 }}>📋 Your December Priority Checklist</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your home situation:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(checklists).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642' : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <ul style={{ color: '#e2e8f0', lineHeight: 2, paddingLeft: 20 }}>
              {checklists[selected].map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>Need a licensed contractor this December?</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>ProLnk connects DFW homeowners with verified pros — fast.</div>
        </div>
      </div>
    </div>
  );
}
