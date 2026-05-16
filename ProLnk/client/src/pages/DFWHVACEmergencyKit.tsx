import { useState } from 'react';

const coolingCenters = [
  'Dallas City Hall – 1500 Marilla St',
  'Dallas Public Library – multiple branches',
  'Tarrant County cooling centers – tarrantcounty.com',
  'Collin County Community Center – check county site',
  'Irving – Heritage Senior Center, 200 Jefferson St',
  'Frisco – Frisco Public Library branches',
];

const fanRecommendations: Record<string, { fans: string; battery: string }> = {
  small: { fans: '2 box fans + 1 tower fan', battery: '1 rechargeable 10" desk fan' },
  medium: { fans: '4 box fans + 2 tower fans', battery: '2 rechargeable 10" desk fans' },
  large: { fans: '6 box fans + 3 tower fans', battery: '3 rechargeable 10" desk fans' },
};

const petTips = [
  '🐾 Keep pets in coolest room with water and wet towels',
  '🐾 Never leave pets in cars — temps exceed 130°F in DFW summer',
  '🐾 Wet a towel and drape over kennels for evaporative cooling',
  '🐾 Dogs pant — ensure fresh water every 2 hours',
  '🐾 Know nearest 24-hr emergency vet location',
];

export default function DFWHVACEmergencyKit() {
  const [homeSize, setHomeSize] = useState('');
  const [residents, setResidents] = useState('');
  const [showKit, setShowKit] = useState(false);

  const fanRec = fanRecommendations[homeSize] || null;

  const kitItems = [
    `🌀 Box fans: ${fanRec ? fanRec.fans : 'select home size above'}`,
    `🔋 Battery fans: ${fanRec ? fanRec.battery : 'select home size above'}`,
    '🪟 Blackout curtains or thermal shades for south/west windows',
    '🧊 Freeze 2-liter bottles — place behind box fans for cool air',
    '💧 Coolers with ice — rotate 24-hr supply per person',
    '🛏️ Cotton sheets only — no synthetic, no heavy blankets',
    '🥶 Cooling towels (1 per resident) — reusable evaporative towels',
    `💊 Hydration electrolyte packets — ${residents ? Math.ceil(Number(residents) * 3) : '9'}+ packets minimum`,
    '📱 Portable phone charger (20,000+ mAh) — charged and ready',
    '📋 Cooling center locations saved to phone',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          🌡️ HVAC Emergency Kit
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          When your AC fails during a DFW summer, indoor temps can hit 100°F within hours. 
          This kit helps you stay safe until repairs are made.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', marginBottom: 28, color: '#0A1628' }}>
          <strong>⚠️ DFW Average July High: 96°F — heat index frequently 105–115°F</strong>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Tell Us About Your Home</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>HOME SIZE</label>
            <select
              value={homeSize}
              onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
            >
              <option value=''>Select home size</option>
              <option value='small'>Small (under 1,500 sq ft)</option>
              <option value='medium'>Medium (1,500–3,000 sq ft)</option>
              <option value='large'>Large (3,000+ sq ft)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>NUMBER OF RESIDENTS</label>
            <input
              type='number'
              min='1'
              value={residents}
              onChange={e => setResidents(e.target.value)}
              placeholder='e.g. 3'
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={() => setShowKit(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            Build My Emergency Kit →
          </button>
        </div>

        {showKit && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📦 Your Emergency Cooling Kit</h2>
            {kitItems.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏛️ DFW Cooling Centers</h2>
          {coolingCenters.map((c, i) => (
            <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#cbd5e1' }}>📍 {c}</div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🐾 Pet Heat Safety</h2>
          {petTips.map((t, i) => (
            <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#cbd5e1' }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', color: '#0A1628', textAlign: 'center' }}>
          <strong>🔧 Need HVAC repair? ProLnk connects you to vetted DFW HVAC pros — fast.</strong>
        </div>
      </div>
    </div>
  );
}
