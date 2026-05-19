import { useState } from 'react';

const floodRiskAreas: Record<string, { risk: string; triggers: string[] }> = {
  lowland: {
    risk: 'HIGH — low-lying areas fill fast in DFW storms',
    triggers: [
      '🌧️ Flash Flood Watch issued — begin monitoring',
      '⚠️ 2+ inches/hour forecast — move valuables above ground level',
      '🚨 Flash Flood Warning issued — evacuate if told, never drive through water',
    ],
  },
  midgrade: {
    risk: 'MODERATE — depends on storm intensity and duration',
    triggers: [
      '🌧️ Flash Flood Watch + 3+ inches forecast — prep sandbags',
      '⚠️ 1.5 inches in under 30 min — watch garage and door thresholds',
      '🚨 Flash Flood Warning for your county — be ready to evacuate',
    ],
  },
  elevated: {
    risk: 'LOWER — but interior flooding and drainage backup possible',
    triggers: [
      '🌧️ Heavy sustained rain (4+ inches in 2 hours) — check sump pump',
      '⚠️ Nearby creek or retention pond near capacity — monitor',
      '🚨 Neighborhood road flooding — avoid driving until water recedes',
    ],
  },
};

const kitItems = [
  '🧱 Water Tube Barriers — fill with water, 25x more effective than sandbags',
  '🧱 Traditional sandbags (50+) + extra sand or fill',
  '⚡ Sump pump (battery backup) — test monthly during storm season',
  '📦 Waterproof document bag — for insurance, mortgage, IDs, titles',
  '📸 Full home photo inventory (store in cloud + USB drive)',
  '💧 Water resistant phone case + dry bags for electronics',
  '🏠 Elevated shelving in garage and utility room',
  '🚗 Move car to high ground before storm — never after',
  '🔦 Waterproof flashlights (2 per floor)',
  '🛑 Flood gate for garage door — retrofit kits available online',
  '📱 FloodSmart and Weather Channel apps downloaded + notifications on',
  '🔌 Extension cords wrapped and stored above ground level',
];

const evacuationRoutes = [
  '📍 Know your nearest high ground before any storm — map it now',
  '📍 Dallas: IH-635 (LBJ) often floods — alternate via US-75 or IH-20',
  '📍 Fort Worth: Trinity River corridor fills fast — avoid low bridges',
  '📍 Plano / Richardson: Spring Creek watershed — check creek alerts',
  '📍 Never drive through water — 6 inches can sweep an adult off feet',
  '📍 "Turn Around, Don’t Drown" — 50% of flood deaths are in vehicles',
];

export default function DFWFloodKit() {
  const [location, setLocation] = useState('');
  const [hasBasement, setHasBasement] = useState('');
  const [showKit, setShowKit] = useState(false);

  const riskInfo = floodRiskAreas[location] || null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          🌊 Flash Flood Preparedness Kit
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW averages 35+ inches of rain per year with intense storm cells that drop 3–6 inches 
          in under an hour. Flash flooding is the #1 weather-related killer in North Texas.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '16px 20px', marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <strong>📌 DFW Fact:</strong> The Trinity River Watershed covers most of DFW — flood risk exists across all 13 DFW counties.
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Tell Us About Your Situation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>HOME FLOOD RISK LEVEL</label>
            <select
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
            >
              <option value=''>Select your flood risk</option>
              <option value='lowland'>Low-lying / near creek or lake</option>
              <option value='midgrade'>Mid-grade elevation / suburban</option>
              <option value='elevated'>Higher elevation / hilltop area</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>DO YOU HAVE A GARAGE OR BELOW-GRADE SPACE?</label>
            <select
              value={hasBasement}
              onChange={e => setHasBasement(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
            >
              <option value=''>Select one</option>
              <option value='yes'>Yes — garage or below-grade storage</option>
              <option value='no'>No below-grade areas</option>
            </select>
          </div>
          <button
            onClick={() => setShowKit(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            Build My Flood Kit →
          </button>
        </div>

        {showKit && riskInfo && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>⚠️ Your Flood Risk</h2>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{riskInfo.risk}</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🚨 Action Trigger Thresholds</h3>
            {riskInfo.triggers.map((t, i) => (
              <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#cbd5e1' }}>{t}</div>
            ))}
            {hasBasement === 'yes' && (
              <div style={{ marginTop: 16, background: '#F5E642', borderRadius: 8, padding: '12px 16px', color: '#0A1628' }}>
                <strong>🚗 Garage Priority:</strong> Move vehicles to street level before any flood warning. Water enters garages in minutes.
              </div>
            )}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📦 Flood Prep Kit</h2>
          {kitItems.map((item, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🗺️ DFW Evacuation Route Tips</h2>
          {evacuationRoutes.map((r, i) => (
            <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#cbd5e1' }}>{r}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', color: '#0A1628', textAlign: 'center' }}>
          <strong>🔧 Water damage after flooding? ProLnk connects you to certified DFW restoration pros.</strong>
        </div>
      </div>
    </div>
  );
}
