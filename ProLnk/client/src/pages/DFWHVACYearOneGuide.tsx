import { useState } from 'react';

const filterSchedules = [
  { type: 'MERV 8 (1″)', schedule: 'Replace every 30–45 days in DFW summer', note: 'DFW dust and pollen levels are high. Stick to 30 days May–Sep, 45 days Oct–Apr.' },
  { type: 'MERV 11 (1″)', schedule: 'Replace every 45–60 days', note: 'Better filtration, slightly higher static pressure. Good for most DFW homes.' },
  { type: 'MERV 13 (1″)', schedule: 'Replace every 60 days max', note: 'High filtration but restricts airflow on systems not sized for it. Verify compatibility.' },
  { type: 'MERV 11–13 (4–5″ Media)', schedule: 'Replace every 6–12 months', note: 'Best value long-term. Lower airflow restriction. Ideal for new systems.' },
];

const months = [
  { id: 'm1', label: 'Month 1', tasks: ['Check filter at day 14 (construction dust)', 'Confirm permit inspection is completed', 'Verify Oncor rebate application was submitted', 'Log Oncor baseline usage for benchmark'] },
  { id: 'm3', label: 'Month 3', tasks: ['Replace filter per your schedule', 'Inspect drain line for algae growth — treat with 1 cup white vinegar', 'Listen for new sounds and note date/description', 'Verify system holds setpoint on first 95°F+ day'] },
  { id: 'm6', label: 'Month 6 (First Tune-Up)', tasks: ['Schedule professional tune-up — 6 months in is the right time, not 12', 'Tech should check refrigerant charge, coil condition, blower amp draw', 'Have startup data from install day to compare current readings', 'Check condensate float switch function — test it manually'] },
  { id: 'm12', label: 'Month 12 (Annual)', tasks: ['Annual professional maintenance (schedule before peak season)', 'Replace media filter if on 12-month schedule', 'Submit warranty maintenance documentation to manufacturer', 'Pull Oncor usage data — compare to pre-install same period', 'Log performance: delta-T, system cycles per hour on peak day'] },
];

const situations = ['New home — first HVAC system', 'High pet household', 'Allergy or asthma household', 'Vacation home — infrequent use', 'Rental property', 'Small home under 1,500 sq ft'];

export default function DFWHVACYearOneGuide() {
  const [activeMonth, setActiveMonth] = useState('m1');
  const [situation, setSituation] = useState('');

  function getSituationNote() {
    const notes: Record<string, string> = {
      'New home — first HVAC system': '🏠 New home: Your system may accumulate construction dust for months. Check filter every 2 weeks for the first 3 months.',
      'High pet household': '🐾 Pets: Double your filter replacement frequency — pets add dander that clogs MERV 11+ filters fast. Consider a whole-home air purifier add-on.',
      'Allergy or asthma household': '🌿 Allergy household: Use MERV 13 or higher if system supports it. Replace every 30 days during cedar/elm season (Dec–Apr in DFW). Consider UV germicidal lamp.',
      'Vacation home — infrequent use': '🏖️ Vacation home: Set to 80°F cooling / 55°F heating when away. Run system 1 day per week to prevent drain line algae and refrigerant migration. Check drain pan on every visit.',
      'Rental property': '🏘️ Rental property: Use cheap 30-day MERV 8 filters and change yourself quarterly — tenants often neglect filter changes. Include AC care in lease addendum.',
      'Small home under 1,500 sq ft': '🏡 Small home: Your system may short-cycle if oversized. Watch for cycles shorter than 8 minutes. If it happens, have contractor check static pressure and sizing.',
    };
    return notes[situation] || '';
  }

  const month = months.find(m => m.id === activeMonth)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📅 DFW HVAC Year One Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 28 }}>Your complete first-year plan — filter schedule, drain protocol, tune-up timing, and performance tracking for a new DFW HVAC system.</p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔄 Filter Schedule for DFW</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {filterSchedules.map((f, i) => (
            <div key={i} style={{ background: '#132035', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.type}</div>
                <div style={{ color: '#8FA3BF', fontSize: 13 }}>{f.note}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textAlign: 'right', minWidth: 140 }}>{f.schedule}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📍 Month-by-Month Tasks</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {months.map(m => (
            <button key={m.id} onClick={() => setActiveMonth(m.id)}
              style={{ background: activeMonth === m.id ? '#F5E642′ : '#132035', color: activeMonth === m.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{month.label} Checklist</h3>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {month.tasks.map((t, i) => <li key={i} style={{ color: '#C8D8E8', lineHeight: 2.1, fontSize: 14 }}>{t}</li>)}
          </ul>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🎯 Your Situation</h2>
        <div style={{ background: '#132035', borderRadius: 12, padding: 20 }}>
          <select value={situation} onChange={e => setSituation(e.target.value)}
            style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 6, padding: '10px 12px', fontSize: 14, marginBottom: 14 }}>
            <option value="">Select your situation...</option>
            {situations.map(s => <option key={s}>{s}</option>)}
          </select>
          {situation && <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#C8D8E8', fontSize: 14, lineHeight: 1.7 }}>{getSituationNote()}</div>}
        </div>
      </div>
    </div>
  );
}
