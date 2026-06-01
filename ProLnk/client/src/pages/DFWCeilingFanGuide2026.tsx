import { useState } from 'react';

const fanSizes = [
  { room: 'Small Room', sqft: 'Up to 75 sq ft', blade: '29–36 inch', emoji: '🛏️', example: 'Small bedroom, bathroom' },
  { room: 'Medium Room', sqft: '76–144 sq ft', blade: '42–48 inch', emoji: '🛋️', example: 'Master bedroom, dining room' },
  { room: 'Large Room', sqft: '145–225 sq ft', blade: '52–54 inch', emoji: '🏠', example: 'Great room, open living area' },
  { room: 'XL / Open Plan', sqft: '226–400 sq ft', blade: '56–60 inch', emoji: '🏡', example: 'DFW open-plan living/kitchen combo' },
  { room: 'Covered Patio', sqft: 'Any', blade: '52–60 inch (outdoor rated)', emoji: '🌿', example: 'DFW covered patio, screened porch' },
];

const fanGuide: Record<string, Record<string, string>> = {
  'small': {
    'cooling': '36-inch fan, counterclockwise summer rotation. Hunter Dempsey or Hampton Bay Mara. Under $80 at Home Depot in DFW.',
    'smart': 'Westinghouse iQ or Hunter SIMPLEconnect 36-inch — WiFi, no neutral needed, works with Alexa. $90–130.',
    'outdoor': 'Patriot Lighting 36-inch UL wet-rated fan — small covered porches and DFW outdoor dining nooks. $70–100.',
  },
  'medium': {
    'cooling': '52-inch fan, counterclockwise in summer. Hunter Builder Elite or Hampton Bay Cobano. Around $60–100 at Home Depot.',
    'smart': 'Minka Aire Xtreme or Hunter SIMPLEconnect 52-inch — remote + app control, schedule by DFW sunrise/sunset. $120–180.',
    'outdoor': '52-inch UL damp-rated for covered patios. Progress Lighting AirPro or Hunter Christy. $100–150.',
  },
  'large': {
    'cooling': '54-inch fan, counterclockwise in summer. Essential in DFW where great rooms run 10–14 feet. Harbor Breeze Mazon or Hunter Signal. $100–160.',
    'smart': 'Big Ass Fans Haiku L (52-inch) — SenseME technology, auto-adjusts to room occupancy and DFW temperature. $350–500 but unbeatable comfort.',
    'outdoor': '60-inch Minka Aire Java or similar — large DFW covered patios. UL wet-rated required for exposed patios, damp-rated for covered.',
  },
};

export default function DFWCeilingFanGuide2026() {
  const [roomSize, setRoomSize] = useState<string>(`\);
  const [use, setUse] = useState<string>('');
  const [activeFan, setActiveFan] = useState<string>('');

  const rec = roomSize && use ? fanGuide[roomSize]?.[use] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌀</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Ceiling Fan Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Essential in DFW heat - right size, right direction, right fan</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>☀️</div>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>Summer: Counterclockwise</p>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Blades push cool air down. Can feel 8°F cooler in DFW summers. Set thermostat higher, save on A/C.</p>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, borderLeft: '3px solid #60a5fa' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>❄️</div>
            <p style={{ color: '#60a5fa', fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>Winter: Clockwise</p>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Pulls warm air up and redistributes from ceiling. Reduces heating costs in DFW winter months.</p>
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔍 Find My Fan</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <select
              value={roomSize}
              onChange={e => setRoomSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
            >
              <option value="">Select room size...</option>
              <option value="small">Small (under 75 sq ft)</option>
              <option value="medium">Medium (75-175 sq ft)</option>
              <option value="large">Large (175+ sq ft or open plan)</option>
            </select>
            <select
              value={use}
              onChange={e => setUse(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
            >
              <option value="">Select use case...</option>
              <option value="cooling">Standard cooling fan</option>
              <option value="smart">Smart fan (app/voice control)</option>
              <option value="outdoor">DFW outdoor / patio fan</option>
            </select>
          </div>
          {rec && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642', color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>
              ✅ {rec}
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Fan Size by Room Size</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
          {fanSizes.map(f => (
            <div
              key={f.room}
              onClick={() => setActiveFan(activeFan === f.room ? '' : f.room)}
              style={{ background: activeFan === f.room ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 14, cursor: 'pointer', border: `1px solid ${activeFan === f.room ? '#F5E642' : '#334155'}`, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
            >
              <span style={{ fontSize: 22 }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600 }}>{f.room}</span>
                <span style={{ color: '#64748b', fontSize: 13, marginLeft: 8 }}>{f.sqft}</span>
              </div>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{f.blade}</span>
              {activeFan === f.room && (
                <div style={{ width: '100%', color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Example: {f.example}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, borderLeft: '3px solid #F5E642' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>🌿 DFW outdoor fans must be UL wet-rated for uncovered areas, UL damp-rated for covered patios. Standard indoor fans will corrode rapidly in DFW humidity and summer storms.</p>
        </div>
      </div>
    </div>
  );
}
