import { useState } from 'react';

const tapeTypes = [
  {
    name: 'Standard Vinyl Electrical Tape (UL-Listed)',
    rating: '60°C / 80°C',
    dfwRating: '⚠️ Marginal for DFW attics',
    uses: 'General indoor wire insulation repairs, color-coding conductors',
    notFor: 'DFW attic wiring, outdoor exposed connections, primary splice insulation',
    dfwNote: 'DFW attics exceed 140°F in summer — standard 60°C tape softens and unravels. Use only in conditioned spaces.',
  },
  {
    name: 'Premium Vinyl Tape (70°C or 90°C rated)',
    rating: '70°C–90°C',
    dfwRating: '✅ Acceptable for most DFW locations',
    uses: 'DFW interior wiring, phase color-coding, temporary insulation repairs',
    notFor: 'Permanent outdoor splices, direct burial, primary splice on bare wire',
    dfwNote: '3M Super 33+, Ideal 6-1726 — these are the minimum standard for DFW electrical tape in any space without A/C.',
  },
  {
    name: 'Self-Fusing Silicone Tape',
    rating: '200°C+ (self-bonding)',
    dfwRating: '✅✅ Excellent for DFW outdoor and high-heat',
    uses: 'Weatherproofing splices, temporary outdoor repairs, high-heat A/C connections',
    notFor: 'Replacing wire nuts or proper connectors — tape alone is never a permanent splice',
    dfwNote: 'Best choice for DFW outdoor junction repairs, pool equipment wiring, and any exposed exterior connection.',
  },
  {
    name: 'Rubber Splicing Tape',
    rating: '90°C',
    dfwRating: '✅ Good for DFW underground and outdoor',
    uses: 'Used under vinyl tape for extra insulation, direct-burial cable repairs',
    notFor: 'Standalone use — always cover with vinyl or self-fusing tape',
    dfwNote: 'Two-layer system: rubber tape first, then vinyl over it. Used in DFW underground splice kits.',
  },
];

const repairOptions = [
  { label: 'Nicked wire insulation (indoor, conditioned)', appropriate: true, tape: '70°C+ vinyl tape', technique: 'Wrap 1/2 lap, 2 layers, extend 1" past nick on each side. Conditioned space only.', limit: 'Tape repair on nicked conductor is a temporary fix — replace wire if copper is damaged.' },
  { label: 'Color-coding conductors', appropriate: true, tape: 'Vinyl tape (color-matched)', technique: 'Wrap exposed terminal area with phase-color tape. Black = hot, white = neutral, green/bare = ground.', limit: 'Color-coding only — not structural insulation.' },
  { label: 'Outdoor splice on patio junction box', appropriate: false, tape: 'Self-fusing silicone + vinyl over', technique: 'Use gel-filled waterproof wire nut as primary; tape as backup protection layer only.', limit: 'DFW rain and UV degrade tape fast — primary protection must be a rated connector.' },
  { label: 'DFW attic wire repair (120°F+)', appropriate: false, tape: '90°C-rated tape minimum if used', technique: 'Replace wire segment if possible — DFW attic heat destroys standard tape bonds within one summer.', limit: 'Tape repairs in DFW attics require 90°C UL-listed tape. Standard tape is a fire risk here.' },
  { label: 'A/C disconnect wiring repair', appropriate: false, tape: 'Not recommended — rewire', technique: 'A/C disconnects see vibration + heat. Replace any damaged wire rather than taping.', limit: 'Tape on A/C circuits is a temporary measure only — schedule rewire within 30 days.' },
  { label: 'Underground cable nick (buried)', appropriate: false, tape: 'Direct-burial splice kit only', technique: 'Tape alone fails underground. Use 3M DBY or Ideal underground splice kit with waterproof resin fill.', limit: 'Tape is not rated for direct burial in DFW clay soil — moisture intrusion guaranteed.' },
  { label: 'Wire bundle wrapping (cable management)', appropriate: true, tape: 'Standard vinyl tape', technique: 'Wrap bundle loosely every 12–18 inches. Do not wrap so tight as to restrict conductor movement.', limit: 'Cable management use only — not for insulation.' },
  { label: 'Temporary repair before inspection', appropriate: true, tape: '70°C+ UL-listed vinyl tape', technique: 'Visible temporary repair acceptable for DFW inspection if disclosed and scheduled for permanent repair.', limit: 'Inspector may require permanent fix before certificate of occupancy.' },
];

export default function DFWElectricalTapeGuide() {
  const [selected, setSelected] = useState('');
  const result = repairOptions.find(r => r.label === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642' }}>🎞️ DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Electrical Tape Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
          Electrical tape is often misused as a permanent fix. In DFW's 100°F+ summers, standard tape fails in attics and outdoor locations. Here's what tape can and can't do — and which type survives DFW heat.
        </p>

        <div style={{ background: '#1A0000', border: '1px solid #FF6B6B', borderRadius: '10px', padding: '16px', marginBottom: '28px' }}>
          <div style={{ fontWeight: '700', color: '#FF6B6B', marginBottom: '6px' }}>🚨 DFW Heat Reality Check</div>
          <div style={{ fontSize: '14px', color: '#C8D0DC', lineHeight: '1.6' }}>
            DFW attics reach 140–160°F in July and August. Standard 60°C electrical tape has a failure point of 140°F. This means common tape <strong style={{ color: '#FF9F43' }}>can soften, unravel, and expose bare wire</strong> in a DFW attic within a single summer. Always use 70°C minimum — 90°C preferred — for any DFW tape application outside conditioned space.
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          {tapeTypes.map((t) => (
            <div key={t.name} style={{ background: '#111D33', borderRadius: '10px', padding: '16px 20px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '15px' }}>{t.name}</span>
                <span style={{ fontSize: '12px', color: '#F5E642', background: '#1E2D47', padding: '2px 8px', borderRadius: '20px', whiteSpace: 'nowrap', marginLeft: '8px' }}>{t.rating}</span>
              </div>
              <div style={{ fontSize: '13px', marginBottom: '6px' }}>{t.dfwRating} DFW: {t.dfwNote}</div>
              <div style={{ fontSize: '13px', color: '#4CAF50', marginBottom: '4px' }}>✅ Use for: {t.uses}</div>
              <div style={{ fontSize: '13px', color: '#FF9F43' }}>❌ Not for: {t.notFor}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>🔍 Is tape appropriate for my DFW repair?</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your repair type...</option>
            {repairOptions.map(r => <option key={r.label}>{r.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '10px', color: result.appropriate ? '#4CAF50' : '#FF6B6B' }}>
                {result.appropriate ? '✅ Tape is acceptable here' : '❌ Tape alone is NOT appropriate'}
              </div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', marginBottom: '6px' }}>🎞️ If used: {result.tape}</div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', marginBottom: '6px' }}>🔧 Technique: {result.technique}</div>
              <div style={{ fontSize: '13px', color: '#F5E642', background: '#0A1628', padding: '8px 10px', borderRadius: '6px' }}>⚠️ Limitation: {result.limit}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Code & Safety Rule</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6' }}>
            NEC 110.14 requires all electrical connections to be properly insulated and rated. Electrical tape is never a substitute for proper wire connectors or replacement of damaged wire. In DFW, any tape repair visible to an inspector must use UL-listed tape and be documented as temporary pending permanent repair.
          </div>
        </div>
      </div>
    </div>
  );
}
