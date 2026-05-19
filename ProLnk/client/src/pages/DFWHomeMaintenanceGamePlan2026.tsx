import { useState } from 'react';

const plans: Record<string, Record<string, string[]>> = {
  new: {
    'Q1 (Jan–Mar)': ['Inspect roof post-winter storms', 'Test smoke/CO detectors', 'Check caulk around tubs and showers', 'HVAC filter change'],
    'Q2 (Apr–Jun)': ['Schedule pre-summer HVAC tune-up', 'Clear gutters of winter debris', 'Test irrigation system', 'Inspect foundation — spring moisture'],
    'Q3 (Jul–Sep)': ['Monitor HVAC daily during peak heat', 'Water foundation perimeter 2x/week', 'Check attic for heat damage', 'Trim back trees from roofline'],
    'Q4 (Oct–Dec)': ['Pre-winter HVAC switch to heat', 'Drain and winterize hose bibs', 'Inspect weatherstripping on doors', 'Roof inspection post-storm season'],
  },
  mid: {
    'Q1 (Jan–Mar)': ['Water heater flush', 'Electrical panel inspection every 2 yrs', 'Check attic insulation levels', 'Pest inspection — spring termites'],
    'Q2 (Apr–Jun)': ['Regrade around foundation if needed', 'Power wash exterior siding', 'Inspect deck/fence for rot', 'AC tune-up + refrigerant check'],
    'Q3 (Jul–Sep)': ['Deep clean dryer vent', 'Check plumbing under sinks', 'Test GFCIs in kitchen/bath', 'Seal any driveway cracks'],
    'Q4 (Oct–Dec)': ['Full roof inspection + minor repairs', 'Fireplace/chimney sweep if applicable', 'Flush water heater', 'Window seal inspection'],
  },
  older: {
    'Q1 (Jan–Mar)': ['Electrical wiring inspection (knob & tube?)', 'Plumbing pipe material check', 'Foundation survey — structural engineer', 'HVAC full system eval'],
    'Q2 (Apr–Jun)': ['Roof replacement assessment', 'Sewer line scope inspection', 'Window replacement eval', 'Insulation audit for energy loss'],
    'Q3 (Jul–Sep)': ['Attic ventilation upgrade eval', 'Panel capacity for modern loads', 'Pest damage structural check', 'AC efficiency vs replacement cost'],
    'Q4 (Oct–Dec)': ['Full system documentation for insurance', 'Reserve fund review ($1/sqft/yr)', 'Emergency repair fund audit', 'All deferred tasks scheduled'],
  },
};

const labels: Record<string, string> = { new: '🏗️ New (0–10 yrs)', mid: '🏠 Mid-Age (10–25 yrs)', older: '🏚️ Older (25+ yrs)' };

export default function DFWHomeMaintenanceGamePlan2026() {
  const [age, setAge] = useState('new');
  const plan = plans[age];
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎯 DFW Home Maintenance Game Plan</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select your home age to get a personalized 12-month maintenance calendar built for DFW conditions.</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          {Object.keys(labels).map(k => (
            <button key={k} onClick={() => setAge(k)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: age === k ? '#F5E642′ : '#1e2d45', color: age === k ? '#0A1628' : '#94a3b8' }}>
              {labels[k]}
            </button>
          ))}
        </div>
        {Object.entries(plan).map(([quarter, tasks]) => (
          <div key={quarter} style={{ background: '#132035', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>📅 {quarter}</h3>
            {tasks.map((t, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < tasks.length - 1 ? '1px solid #1e2d45′ : ’none', color: '#e2e8f0', fontSize: 14 }}>
                ☐ {t}
              </div>
            ))}
          </div>
        ))}
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628', marginTop: 8 }}>
          <strong>📋 Ready to execute?</strong> ProLnk finds vetted DFW pros for every task on your game plan — schedule all in one place.
        </div>
      </div>
    </div>
  );
}