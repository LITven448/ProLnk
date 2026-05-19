import { useState } from 'react';

const myths = [
  {
    myth: 'Closing vents in unused rooms saves energy',
    reality: 'FALSE — Creates dangerous pressure buildup',
    dfwExplanation: 'DFW homes have duct systems balanced for all vents open. Closing vents forces your HVAC to work against itself, causing duct leaks, compressor strain, and higher bills. In DFW summer heat, this can cause system failure during peak demand.',
    icon: '🔴',
  },
  {
    myth: 'Ceiling fans cool the room',
    reality: 'FALSE — Fans cool people, not rooms',
    dfwExplanation: 'Fans create a wind-chill effect on skin — they do not lower room temperature. In DFW, leaving fans on in empty rooms wastes electricity and adds heat from the motor. Always turn fans off when leaving a room.',
    icon: '🌀',
  },
  {
    myth: 'Setting the thermostat lower cools your home faster',
    reality: 'FALSE — AC runs at one speed regardless',
    dfwExplanation: 'Your AC cools at a fixed rate whether you set it to 65°F or 72°F. Setting it to 60°F just makes it run longer and overshoot. In DFW summers, this wastes energy and can freeze your evaporator coil overnight.',
    icon: '❄️',
  },
  {
    myth: 'Ceiling height does not affect your AC load',
    reality: 'FALSE — DFW high ceilings dramatically change cooling needs',
    dfwExplanation: 'DFW homes commonly have 10–12ft ceilings. More cubic footage means significantly more air to cool. A 2,000 sq ft home with 12ft ceilings needs 20–25% more cooling capacity than the same footprint at 8ft. Undersized units struggle in DFW July heat.',
    icon: '🏠',
  },
  {
    myth: 'Turning AC off while away saves the most energy',
    reality: 'PARTIALLY FALSE — In DFW heat, this costs more',
    dfwExplanation: 'When DFW homes hit 95°F+ indoors, it takes enormous energy to cool back down. Set your thermostat to 82–85°F when away rather than off. Smart thermostats that pre-cool before you arrive are the most efficient option for DFW climate.',
    icon: '⚠️',
  },
];

export default function DFWHomeEnergyMythsGuide() {
  const [activeMyth, setActiveMyth] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚡</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            DFW Home Energy Myths Debunked
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            What works elsewhere often backfires in the DFW climate. Know the truth.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myths.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveMyth(activeMyth === idx ? null : idx)}
              style={{
                backgroundColor: '#1e2d4a',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                border: activeMyth === idx ? '2px solid #F5E642' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>MYTH</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>"{item.myth}"</p>
                  <p style={{ color: '#F5E642', fontWeight: '700', fontSize: '14px' }}>{item.reality}</p>
                  {activeMyth === idx && (
                    <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
                      <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.7' }}>
                        🏙️ <strong style={{ color: '#F5E642' }}>DFW Context:</strong> {item.dfwExplanation}
                      </p>
                    </div>
                  )}
                </div>
                <span style={{ color: '#F5E642', fontSize: '18px' }}>{activeMyth === idx ? '▲' : '▼'}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔧 Need a DFW HVAC Professional?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects you with vetted local HVAC pros who know DFW homes.</p>
        </div>
      </div>
    </div>
  );
}
