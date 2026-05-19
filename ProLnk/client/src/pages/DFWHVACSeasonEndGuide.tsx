import { useState } from 'react';

const seasonData = {
  cooling: {
    label: 'End of Cooling Season (October)',
    checklist: [
      'Schedule professional tune-up before shutdown',
      'Replace air filter with fresh one before winter',
      'Clean condenser coils and remove debris around outdoor unit',
      'Check refrigerant levels — note any ice or frost issues from summer',
      'Test heating mode before cold arrives',
      'Clear condensate drain line and pan',
      'Inspect and clean evaporator coil',
      'Check thermostat batteries and switch to heat mode',
      'Install condenser cover if unit is exposed to debris',
      'Document any summer performance issues for next season',
    ],
    nextSeason: [
      'Schedule spring AC startup checkup in March',
      'Order filters now for winter and spring',
      'Note any refrigerant issues — DFW heat will expose them fast',
      'Verify heat pump reversing valve works correctly',
    ],
  },
  heating: {
    label: 'End of Heating Season (March)',
    checklist: [
      'Replace filter before cooling season begins',
      'Remove condenser cover if installed',
      'Clear debris from around outdoor unit after winter',
      'Test AC mode on first warm day above 65°F',
      'Check refrigerant charge — recharge if needed before summer peak',
      'Inspect ductwork for any winter damage or pest intrusion',
      'Clean blower wheel and motor',
      'Test all thermostat modes and scheduling',
      'Check capacitors and contactors — high heat accelerates wear',
      'Document heating season issues before memory fades',
    ],
    nextSeason: [
      'Schedule full AC tune-up before May heat arrives',
      'Consider duct sealing to reduce summer load',
      'Upgrade thermostat to smart model for summer savings',
      'Stock extra filters for high-use summer months',
    ],
  },
};

export default function DFWHVACSeasonEndGuide() {
  const [selected, setSelected] = useState<'cooling' | 'heating' | null>(null);

  const data = selected ? seasonData[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌡️ Season-End HVAC Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW transitions between extreme heat and mild winters fast. Proper season-end prep prevents costly failures and extends equipment life.
        </p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 12 }}>Which transition are you preparing for?</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {(['cooling', 'heating'] as const).map(s => (
              <button key={s} onClick={() => setSelected(s)} style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${selected === s ? '#F5E642' : '#1e3a5f'}`, background: selected === s ? '#F5E642' : 'transparent', color: selected === s ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {s === 'cooling' ? '❄️ End of Cooling (October)' : '🔥 End of Heating (March)'}
              </button>
            ))}
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>✅ {data.label} Checklist</h2>
              {data.checklist.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#cbd5e1' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>☐</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🔜 Prepare for Next Season</h2>
              {data.nextSeason.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8', flexShrink: 0 }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {!data && (
          <div style={{ background: '#0f2236', borderRadius: 12, padding: 32, textAlign: 'center', color: '#94a3b8' }}>
            Select a transition above to see your checklist
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', fontWeight: 600, textAlign: 'center' }}>
          🔧 Get a DFW HVAC Pro for your season-end tune-up — ProLnk matches you in minutes.
        </div>
      </div>
    </div>
  );
}
