import { useState } from 'react';

const noiseTypes = [
  { label: 'Rattling ducts', location: 'Ceiling/walls', solution: 'Duct liner + metal strap reinforcement', cost: '$300–$700′ },
  { label: 'Vibrating air handler', location: 'Attic/closet', solution: 'Spring vibration isolators + neoprene pads', cost: '$150–$400′ },
  { label: 'Loud outdoor condenser', location: 'Outside', solution: 'Compressor sound blanket + dense mass pad', cost: '$200–$600′ },
  { label: 'Airflow whooshing', location: 'Vents', solution: 'Larger return grille + duct liner at takeoffs', cost: '$400–$900′ },
  { label: 'Compressor hum indoors', location: 'Throughout home', solution: 'Floating air handler platform + line set insulation', cost: '$500–$1,200′ },
];

export default function DFWHVACSoundProofingGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          🔇 Soundproofing Your DFW HVAC System
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          North Texas homes run HVAC 9+ months a year. That's a lot of noise. Here’s how to quiet every part of your system — ducts, air handler, and condenser.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🛠️ Why DFW Systems Run Louder</h2>
          <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>
            DFW 5-ton systems move massive airflow through attic ductwork that expands and contracts with 120°F summer heat. Vibration from oversized equipment, rigid duct connections, and concrete pads without isolators amplifies noise throughout the home.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Identify Your Noise — Get a Fix</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {noiseTypes.map((n, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1A3A6B' : '#0F2040',
                  border: selected === i ? '2px solid #F5E642′ : '2px solid #1E3A5F',
                  borderRadius: 12,
                  padding: '18px 24px',
                  color: '#E8EDF5',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{n.label} — <span style={{ color: '#94A3B8', fontWeight: 400, fontSize: 14 }}>{n.location}</span></div>
                {selected === i && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                      <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>SOLUTION</div>
                      <div style={{ color: '#E8EDF5', fontSize: 14 }}>{n.solution}</div>
                    </div>
                    <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                      <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>COST ESTIMATE</div>
                      <div style={{ color: '#E8EDF5', fontSize: 14 }}>{n.cost}</div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h3 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW Soundproofing Quick Reference</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🧱', label: 'Duct liner', note: '1″ fiberglass, reduces airflow noise 8–12 dB' },
              { icon: '🌀', label: 'Spring isolators', note: 'Decouple air handler from structure' },
              { icon: '🛡️', label: 'Sound blanket', note: 'Wraps compressor, cuts outdoor noise 5–8 dB' },
              { icon: '🪨', label: 'Mass pad', note: '4″ composite pad, absorbs condenser vibration' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a DFW HVAC Pro</h3>
          <p style={{ color: '#0A1628', fontSize: 15, marginBottom: 0 }}>ProLnk connects you with vetted DFW HVAC contractors who know North Texas systems.</p>
        </div>
      </div>
    </div>
  );
}
