import { useState } from 'react';

const homeAges = [
  { id: 'new', label: '🏗️ Built 2010+' },
  { id: 'mid', label: '🏠 1990-2009' },
  { id: 'older', label: '🏚️ 1970-1989' },
  { id: 'vintage', label: '🏛️ Pre-1970' },
];

const setups: Record<string, string[]> = {
  new: [
    'HVAC tune-up still recommended — builder-grade equipment needs calibration',
    'Check all caulking around tubs, showers, and windows',
    'Register appliance warranties before they expire',
    'Test smoke and CO detectors on all floors',
    'Set up ProLnk account now — not after the first emergency',
  ],
  mid: [
    'Schedule HVAC service within 60 days — likely due or overdue',
    'Water softener assessment — DFW hard water is 17-26 grains',
    'Check water heater age — 10-15 years is typical lifespan',
    'Inspect roof for hail damage — DFW averages 2+ hail events per year',
    'Find and test all water shutoffs: main, toilets, under sinks',
  ],
  older: [
    'HVAC likely needs replacement — budget $8,000-12,000',
    'Electrical panel inspection — may be at capacity or outdated',
    'Water heater replacement if original — corroded anodes',
    'Foundation inspection by licensed engineer — clay soil movement',
    'All shutoffs: find, label, and test every one',
  ],
  vintage: [
    'Electrical: check for aluminum wiring and 2-prong outlets',
    'Plumbing: galvanized pipe corrosion is common pre-1970',
    'HVAC full replacement almost certain — duct sealing too',
    'Foundation: get structural engineer report, not just home inspector',
    'Lead paint and asbestos testing if you plan any renovation',
  ],
};

export default function DFWHomeWarming2026() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏡 DFW Home Warming Setup Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>Set up your DFW home correctly in the first 60 days and avoid costly surprises for years.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>❄️ HVAC Tune-Up Within 60 Days</h2>
          {[
            'DFW AC runs 5-7 months per year — it is your most critical system',
            'Tune-up cost $100-150 — buyers love documented service history',
            'Change filters immediately: DFW dust and pollen are severe',
            'Set programmable thermostat: 78°F when away, 72°F when home',
            'ProLnk connects you to verified HVAC techs with same-week availability',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>❄️ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>💧 DFW Hard Water Assessment</h2>
          {[
            'DFW water hardness: 17-26 grains per gallon (very hard)',
            'Water softener extends water heater life by 3-5 years',
            'Prevents scale buildup in dishwasher, washing machine, fixtures',
            'Salt-based vs salt-free: salt-based is more effective for DFW levels',
            'Installation cost $800-1,500, monthly salt $15-25',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>💧 {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏘️ Join Your Community</h2>
          {[
            'Nextdoor: neighborhood alerts, local contractor recommendations',
            'HOA portal if applicable — get login credentials from previous owner',
            'City utility portal: manage service, pay bills, report outages',
            'Set up ProLnk account before you need a contractor',
            'Note city trash day, recycle day, and bulk pickup schedule',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>🏘️ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Home Age → First 60 Days Setup Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {homeAges.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected === a.id ? '#F5E642' : '#1a2d4a', color: selected === a.id ? '#0A1628' : '#ccc', fontWeight: selected === a.id ? 700 : 400 }}
              >
                {a.label}
              </button>
            ))}
          </div>
          {selected && setups[selected].map(item => (
            <div key={item} style={{ color: '#ccc', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1a2d4a' }}>→ {item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}
