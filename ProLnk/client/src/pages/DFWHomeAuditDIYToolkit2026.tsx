import { useState } from 'react';

export default function DFWHomeAuditDIYToolkit2026() {
  const [goal, setGoal] = useState<string | null>(null);

  const goals = [
    { id: 'electrical', label: 'Check Electrical Safety', icon: '⚡' },
    { id: 'moisture', label: 'Find Moisture / Mold Risk', icon: '💧' },
    { id: 'water', label: 'Test Water Quality', icon: '🚰' },
    { id: 'leaks', label: 'Find Air Leaks / Insulation Gaps', icon: '🌬️' },
  ];

  const kits: Record<string, { tool: string; price: string; why: string; icon: string }[]> = {
    electrical: [
      { tool: 'Non-Contact Voltage Tester', price: '$20', why: 'Safely detect live wires without touching — test outlets, panels, fixtures', icon: '🔌' },
      { tool: 'GFCI Outlet Tester', price: '$15', why: 'Verify GFCI protection in kitchens, baths, garages — DFW code requires in wet areas', icon: '🔧' },
      { tool: 'Plug-In Load Meter', price: '$25', why: 'Measure actual watts drawn by appliances — find energy hogs before your Oncor bill spikes', icon: '📊' },
    ],
    moisture: [
      { tool: 'Digital Hygrometer', price: '$15', why: 'Measure indoor humidity — DFW summers push 60%+ RH indoors if AC is undersized', icon: '💦' },
      { tool: 'Pinless Moisture Meter', price: '$35', why: 'Scan drywall, wood, floors for hidden moisture without holes — DFW slab leaks are common', icon: '🔍' },
      { tool: 'Mold Test Kit', price: '$10', why: 'Confirm mold spores present before calling a remediation company — verify the problem first', icon: '🧫' },
    ],
    water: [
      { tool: 'TDS Meter', price: '$10', why: 'Measure total dissolved solids — DFW water averages 350–600 ppm; 500+ warrants a filter', icon: '💧' },
      { tool: 'Water Hardness Test Strips', price: '$8', why: 'DFW water is very hard (17–25 gpg) — verify if softener is working or needed', icon: '🧪' },
      { tool: 'Lead Test Kit', price: '$12', why: 'Older DFW homes (pre-1986) may have lead solder — test before young children live there', icon: '⚠️' },
    ],
    leaks: [
      { tool: 'Thermal Leak Detector', price: '$25', why: 'IR gun detects temp differences at windows, doors, outlets — DFW attic heat makes this essential', icon: '🌡️' },
      { tool: 'Smoke Pen / Incense Sticks', price: '$5', why: 'Hold near suspected gaps — smoke shows air movement; free blower door alternative', icon: '💨' },
      { tool: 'Door & Window Seal Test Kit', price: '$15', why: 'Paper test: close door on paper strip — if it slides out, seal is failing', icon: '🚪' },
    ],
  };

  const selected = goal ? kits[goal] : null;
  const goalItem = goals.find(g => g.id === goal);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW DIY Home Audit Toolkit 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Affordable tools DFW homeowners can use to audit their own home before calling a pro</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>
            🏠 DFW-specific tip: Slab foundations, extreme summer heat, high humidity, and hard water create unique home risks. These tool kits are designed for North Texas conditions.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>What are you trying to audit?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {goals.map(g => (
            <button key={g.id} onClick={() => setGoal(g.id === goal ? null : g.id)}
              style={{ background: goal === g.id ? '#F5E642′ : '#1e2d45', border: '2px solid',
                borderColor: goal === g.id ? '#F5E642′ : '#2d3f5a', borderRadius: 10,
                padding: 20, cursor: 'pointer', textAlign: 'center',
                color: goal === g.id ? '#0A1628′ : '#fff' }}>
              <div style={{ fontSize: 32 }}>{g.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>{g.label}</div>
            </button>
          ))}
        </div>

        {selected && goalItem && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642′ }}>{goalItem.icon} Recommended Kit: {goalItem.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {selected.map(t => (
                <div key={t.tool} style={{ background: '#1e2d45', borderRadius: 10, padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 28 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{t.tool}</span>
                      <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '4px 10px', fontWeight: 700, fontSize: 13 }}>{t.price}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{t.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>Found something? ProLnk connects you with DFW specialists who can confirm and fix what you discover.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Skip the guesswork — get 3 transparent quotes from vetted local pros.</p>
        </div>
      </div>
    </div>
  );
}
