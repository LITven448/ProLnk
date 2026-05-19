import { useState } from 'react';

const situations = [
  { id: 'short', label: '📏 Under 25 feet — same-side installation', advice: 'Ideal scenario. Minimal refrigerant velocity concern. No refrigerant adjustment needed. Standard installation per manufacturer spec. Focus on proper insulation of line set to reduce heat gain in DFW summer.' },
  { id: 'medium', label: '📐 25–50 feet — typical DFW suburban', advice: 'Most DFW residential installs fall here. Within standard spec for most 2–5 ton units. Verify manufacturer table for your specific unit — some require refrigerant adjustment at 35+ feet. Insulate full line set run.' },
  { id: 'long', label: '📏 50–75 feet — larger DFW lot', advice: 'Approaching or at maximum for many residential units. Refrigerant velocity slows — liquid line may need upsizing. Consult manufacturer data for required refrigerant addition (typically 0.6 oz per foot over 25 feet for R-410A systems).' },
  { id: 'verylong', label: '🏡 Over 75 feet — estate lot or detached structure', advice: 'Exceeds standard spec for most residential systems. May require line set upsizing from 3/8" liquid to 1/2" and suction from 3/4" to 7/8". Pressure drop will reduce capacity — engineer should calculate. R-32 systems handle longer runs better than R-410A.' },
  { id: 'elevation', label: '⬆️ Significant elevation change (2+ stories)', advice: 'Vertical elevation adds effective line set length to pressure calculations. 10 feet of elevation = ~5 feet equivalent line set length for capacity calculations. Refrigerant must be pushed uphill — factor into sizing. DFW two-story homes with attic units are common.' },
];

export default function DFWHVACLinesetLength2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🪈 DFW HVAC Line Set Length Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Line set distance is one of the most overlooked factors in DFW HVAC performance. Long runs, large lots, and elevation changes all affect refrigerant velocity, capacity, and efficiency.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642' : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '📐 My Install'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📏', title: 'Standard Line Set Limits', body: 'Most residential split systems specify 50–75 feet maximum line set length. Beyond this, refrigerant velocity drops — liquid refrigerant may flash to vapor before reaching the metering device, reducing capacity and potentially damaging the compressor.' },
              { icon: '🌡️', title: 'DFW Large Lots = Longer Runs', body: 'DFW suburban lots are generous — 7,000–15,000 sq ft is common in Frisco, Allen, and Mansfield. This often means condenser units placed on the opposite side of large homes, pushing line set runs to 60–80 feet. Always measure before ordering equipment.' },
              { icon: '⬆️', title: 'Elevation Changes Add Load', body: 'Vertical lift adds to effective line set pressure drop. A 10-foot height difference between air handler and condenser is equivalent to ~5 feet of additional horizontal run for capacity calculations. Two-story homes and split-level designs require elevation adjustment.' },
              { icon: '🧪', title: 'Refrigerant Adjustment for Long Runs', body: 'R-410A systems typically need +0.6 oz refrigerant per foot beyond the standard reference length (usually 25 feet). R-32 and R-454B (newer systems) have improved density and handle longer runs with less adjustment. Always follow manufacturer tables — not rules of thumb.' },
              { icon: '🔧', title: 'Line Set Sizing Upgrades', body: 'Long runs often benefit from upsized line set diameters. Upgrading from 3/8" to 1/2" liquid line reduces pressure drop significantly. Suction line upsizing (3/4" to 7/8") reduces suction pressure drop and improves compressor efficiency on long DFW runs.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your DFW line set situation for guidance:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {situations.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{
                  background: selected === s.id ? '#1e3a5f' : '#132240', border: selected === s.id ? '2px solid #F5E642' : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>{s.label}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🪈 Line Set Guidance</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.advice}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  📞 Get a DFW HVAC installer through ProLnk who will measure and spec your line set correctly.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted HVAC professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}