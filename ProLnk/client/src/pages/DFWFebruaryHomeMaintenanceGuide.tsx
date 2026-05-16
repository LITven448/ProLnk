import { useState } from 'react';

const highlights = [
  { emoji: '🌪️', title: 'Winter Storm Risk', detail: 'February is DFW\'s most dangerous month for ice storms. Uri hit Feb 10-20, 2021. Be ready every year.' },
  { emoji: '🌲', title: 'Cedar Fever Peak', detail: 'Mountain cedar pollen peaks Feb in DFW. Change HVAC filters to MERV 11+ and run purifiers.' },
  { emoji: '🌸', title: 'Spring Pre-Planning', detail: 'February is the last chance to book spring HVAC tuneups before April-May schedules fill.' },
  { emoji: '🔧', title: 'HVAC Annual Tuneup', detail: 'Book your spring AC service now. Most DFW HVAC companies are booked 6 weeks out by March.' },
  { emoji: '🌡️', title: 'Freeze Drill', detail: 'Do a walkthrough: know every shutoff, every exposed pipe, every drip location before the next event.' },
  { emoji: '💧', title: 'Post-Storm Inspection', detail: 'After any freeze event: check under sinks, in the attic, and at the water heater for slow leaks.' },
];

const actions: Record<string, string[]> = {
  'Had pipe issues in Uri': [
    '✅ Install pipe insulation on ALL attic runs now',
    '✅ Add heat tape on most exposed pipes',
    '✅ Upgrade to a tankless water heater (easier to drain)',
    '✅ Install smart water shutoff valve (auto-detects leaks)',
    '✅ Document insurance claim history — keep for 5 years',
    '✅ Pre-save ProLnk emergency plumber number',
  ],
  'New to DFW (from warm climate)': [
    '✅ Do a full "freeze walkthrough" with a plumber',
    '✅ Locate your main water shutoff — test it turns',
    '✅ Check if irrigation backflow preventer is insulated',
    '✅ Buy a backup battery space heater',
    '✅ Understand cedar fever — get MERV 11 filters now',
    '✅ Schedule HVAC tuneup for April before rush',
  ],
  'Landlord / Rental Owner': [
    '✅ Confirm all tenants know pipe drip protocol',
    '✅ Ensure heat is set to 55°F minimum in all units',
    '✅ Check property manager has 24/7 plumber contact',
    '✅ Inspect all exposed pipes in all units now',
    '✅ Review rental insurance policy for freeze damage',
    '✅ Send written freeze prep notice to all tenants (liability)',
  ],
  'Long-time DFW resident': [
    '✅ Don\'t assume "it won\'t happen again" — plan anyway',
    '✅ Upgrade any missing pipe insulation from Uri lessons',
    '✅ Test generator or portable heater now (not during storm)',
    '✅ Book HVAC tuneup for spring NOW',
    '✅ Replace furnace filter if not done since December',
    '✅ Check weather stripping on all exterior doors',
  ],
};

export default function DFWFebruaryHomeMaintenanceGuide() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌩️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW February Home Maintenance</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Winter storm risk, cedar fever, and the spring planning window</p>
          <div style={{ display: 'inline-block', background: '#7f1d1d', color: '#fca5a5', borderRadius: 8, padding: '6px 14px', marginTop: 10, fontSize: 13, fontWeight: 600 }}>
            ⚠️ Winter Storm Uri hit February 10-20, 2021 — it can happen again
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {highlights.map((h) => (
            <div key={h.title} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{h.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{h.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{h.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 12 }}>📋 Your February Action List</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Tell us your situation:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(actions).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642' : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <ul style={{ color: '#e2e8f0', lineHeight: 2.2, paddingLeft: 20, listStyle: 'none' }}>
              {actions[selected].map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>Don't wait until the next freeze warning.</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>ProLnk connects DFW homeowners with licensed pros before the rush.</div>
        </div>
      </div>
    </div>
  );
}
