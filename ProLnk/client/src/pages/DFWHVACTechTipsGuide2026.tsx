import { useState } from 'react';

const HVAC_TYPES = [
  { id: 'central-ac', label: '🌬️ Central A/C' },
  { id: 'heat-pump', label: '🔄 Heat Pump' },
  { id: 'gas-furnace', label: '🔥 Gas Furnace' },
  { id: 'mini-split', label: '❄️ Mini-Split' },
];

const TIPS: Record<string, { title: string; items: string[] }> = {
  'central-ac': {
    title: 'Central A/C Tech Tips',
    items: [
      '📐 Static pressure test — most techs skip this; should be 0.5" WC or less',
      '🌡️ Check superheat (target 10-20°F) AND subcooling (target 8-12°F) — not just pressures',
      '🌀 Blower wheel cleaning — dirty wheels cut airflow 30-40%',
      '🔌 Capacitor test under load — not just resting voltage',
      '💧 Condensate drain flush + pan inspection for algae',
    ],
  },
  'heat-pump': {
    title: 'Heat Pump Tech Tips',
    items: [
      '📐 Static pressure on both supply and return sides',
      '🔄 Reversing valve function test — often skipped in mild weather',
      '🌡️ Subcooling check in cooling mode; suction superheat in heating mode',
      '❄️ Defrost cycle verification — DFW heat pumps ice up in winter',
      '🔌 Crankcase heater check — protects compressor in cold starts',
    ],
  },
  'gas-furnace': {
    title: 'Gas Furnace Tech Tips',
    items: [
      '🔥 Flue gas analysis — CO, CO2, O2 levels for combustion efficiency',
      '📐 Static pressure across heat exchanger — detect cracks early',
      '🌀 Blower motor amp draw — compares to nameplate',
      '⚡ Ignitor resistance check — replace before it fails',
      '🌡️ Temperature rise measurement — should match furnace label range',
    ],
  },
  'mini-split': {
    title: 'Mini-Split Tech Tips',
    items: [
      '🌡️ Subcooling/superheat via manufacturer charts — each brand differs',
      '🧹 Evaporator coil cleaning — mold common in high-humidity installs',
      '📡 Communication wire check — inverter boards fail from voltage spikes',
      '🔌 Lineset insulation — UV degrades in DFW sun within 3 years',
      '💧 Condensate pump test if installed indoors — often forgotten',
    ],
  },
};

export default function DFWHVACTechTipsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PROLNK DFW RESOURCE GUIDE 2026
        </div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🛠️ DFW HVAC Tech Tips Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          What DFW HVAC technicians check that homeowners never see — the diagnostics that separate a real tech from a parts-swapper.
        </p>

        <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            Select your HVAC system type:
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {HVAC_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  background: selected === t.id ? '#F5E642' : '#1e3a5f',
                  color: selected === t.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: '8px', padding: '0.75rem',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#132237', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '1rem' }}>{TIPS[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {TIPS[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '0.75rem', borderBottom: '1px solid #1e3a5f', lineHeight: 1.5, color: '#cbd5e1' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.25rem' }}>Find a Certified DFW HVAC Tech</div>
          <div style={{ color: '#1e3a5f', fontSize: '0.9rem' }}>ProLnk matches you with NATE-certified techs in your DFW ZIP</div>
        </div>
      </div>
    </div>
  );
}
