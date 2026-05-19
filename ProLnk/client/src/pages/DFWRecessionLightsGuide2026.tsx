import { useState } from 'react';

const colorTemps = [
  { k: '2700K', label: 'Warm White', emoji: '🟡', desc: 'Closest to incandescent. Best for DFW living rooms, bedrooms, dining rooms. Cozy and relaxing — excellent for evening use in Texas homes.' },
  { k: '3000K', label: 'Soft White', emoji: '🟠', desc: 'Slightly cooler than 2700K. Popular choice for DFW kitchens — bright enough for cooking tasks but still warm. Best all-purpose color in DFW homes.' },
  { k: '4000K', label: 'Cool White', emoji: '⬜', desc: 'Neutral, crisp light. Best for garages, offices, and task areas. Common in DFW commercial but gaining traction in modern home kitchens.' },
  { k: '5000K', label: 'Daylight', emoji: '☀️', desc: 'Bright and energizing. Best for workshops, garages, laundry rooms, and closets. Too harsh for DFW living areas — avoid in bedrooms and dining rooms.' },
];

const roomGuide: Record<string, { size: string; kelvin: string; type: string; note: string }> = {
  'kitchen': { size: '4-inch or 6-inch', kelvin: '3000K or 4000K', type: 'IC-rated, airtight (ICAT)', note: 'DFW kitchens need ICAT-rated cans — they share the attic space. Space 4-foot apart over counters, 5-foot in open areas. Add undercabinet lighting for task work.' },
  'living': { size: '6-inch', kelvin: '2700K or 3000K', type: 'IC-rated, airtight', note: 'DFW living rooms look best with 6-inch fixtures spaced every 4–6 feet. Warm white keeps the room comfortable year-round. Put on dimmer for flexibility.' },
  'bedroom': { size: '4-inch', kelvin: '2700K', type: 'IC-rated, airtight', note: 'Use 4-inch in bedrooms for softer light spread. 2700K is most sleep-friendly. Position over nightstands and reading areas, not directly over the bed.' },
  'bathroom': { size: '4-inch', kelvin: '3000K or 4000K', type: 'IC-rated, airtight, damp-rated', note: 'Damp-rated required over shower/tub. 4-inch centered in shower, 4000K for makeup/grooming accuracy. Add sconces for shadow-free face lighting.' },
  'garage': { size: '6-inch', kelvin: '5000K', type: 'Non-IC ok (no insulation above)', note: 'Most DFW garages have no attic insulation above — non-IC fixtures are fine and cheaper. 5000K daylight for best visibility. Install every 4 feet.' },
  'office': { size: '4-inch or 6-inch', kelvin: '4000K', type: 'IC-rated, airtight', note: 'Home offices in DFW need 4000K cool white for focus and video call quality. Avoid 2700K — looks yellow on camera. Grid pattern every 4 feet.' },
};

const brands = [
  { name: 'Halo', emoji: '⭐', price: '$12–25', desc: 'Most common brand in DFW new construction. Reliable, widely stocked at Home Depot. The RL series (retrofit LED) drops into existing 6-inch cans easily.' },
  { name: 'Lutron', emoji: '🔆', price: '$25–45', desc: 'Premium choice — best dimming performance, zero flicker. Pairs perfectly with Lutron Caseta smart dimmers. Preferred by DFW luxury builders.' },
  { name: 'Enerlites', emoji: '💡', price: '$8–15', desc: 'Best value in DFW. Available on Amazon, good quality for the price. Slightly less refined dimming than Halo/Lutron but perfectly adequate for most rooms.' },
];

export default function DFWRecessionLightsGuide2026() {
  const [room, setRoom] = useState<string>('\);
  const [activeTemp, setActiveTemp] = useState<string>('\);

  const rec = room ? roomGuide[room] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Recessed Lighting Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Can lights done right — air sealing, IC rating, and color temperature for DFW homes</p>
        </div>

        <div style={{ background: '#7c2d12', borderRadius: 10, padding: 14, marginBottom: 20, borderLeft: '3px solid #ef4444′ }}>
          <p style={{ color: '#fca5a5', fontSize: 14, margin: '0 0 4px', fontWeight: 700 }}>⚠️ DFW Air Sealing Warning</p>
          <p style={{ color: '#fecaca', fontSize: 13, margin: 0 }}>Recessed lights are the #1 source of air leakage into DFW attics. In DFW's climate, this means hot attic air pulls into living spaces in summer. Use ICAT (airtight) fixtures only — or add airtight boxes above existing fixtures. This single upgrade can cut cooling costs 10–15% in DFW homes.</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Room → Recessed Light Spec</h2>
          <select
            value={room}
            onChange={e => setRoom(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
          >
            <option value="">Select room type...</option>
            <option value="kitchen">Kitchen</option>
            <option value="living">Living Room</option>
            <option value="bedroom">Bedroom</option>
            <option value="bathroom">Bathroom</option>
            <option value="garage">Garage</option>
            <option value="office">Home Office</option>
          </select>
          {rec && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Size: {rec.size}</span>
                <span style={{ color: '#60a5fa', fontWeight: 700, fontSize: 13 }}>Color: {rec.kelvin}</span>
                <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>Type: {rec.type}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{rec.note}</p>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Color Temperature Guide</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
          {colorTemps.map(ct => (
            <div
              key={ct.k}
              onClick={() => setActiveTemp(activeTemp === ct.k ? '' : ct.k)}
              style={{ background: activeTemp === ct.k ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 14, cursor: 'pointer', border: `1px solid ${activeTemp === ct.k ? '#F5E642' : '#334155'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{ct.emoji}</span>
                <span style={{ fontWeight: 700, color: '#F5E642′ }}>{ct.k}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{ct.label}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{activeTemp === ct.k ? '▲' : '▼'}</span>
              </div>
              {activeTemp === ct.k && <p style={{ color: '#94a3b8', fontSize: 14, margin: '8px 0 0′ }}>{ct.desc}</p>}
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Top Brands in DFW</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#1e293b', borderRadius: 10, padding: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{b.name}</span>
                  <span style={{ color: '#F5E642', fontSize: 13 }}>{b.price}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
