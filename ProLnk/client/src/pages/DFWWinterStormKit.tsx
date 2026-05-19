import { useState } from 'react';

const pipeDripTips: Record<string, string[]> = {
  slab: [
    '🔧 Drip all exterior wall faucets at 20°F or below',
    '🔧 Open cabinet doors under kitchen/bath sinks',
    '🔧 Know your main shutoff valve location — mark it now',
  ],
  pier: [
    '🔧 Insulate all exposed pipes under the home with foam wrap',
    '🔧 Drip all faucets at 28°F or below — pier & beam pipes freeze faster',
    '🔧 Add skirting or insulated panels around crawl space perimeter',
    '🔧 Know your main shutoff valve location — mark it now',
  ],
  twostory: [
    '🔧 Drip top-floor faucets first — attic pipes freeze soonest',
    '🔧 Insulate attic pipe runs with heat tape if accessible',
    '🔧 Open all interior cabinet doors on exterior walls',
    '🔧 Know your main shutoff valve location — mark it now',
  ],
};

const tempThresholds = [
  { temp: '32°F', action: 'Stock supplies, fill bathtubs with water, charge all devices' },
  { temp: '28°F', action: 'Begin dripping all faucets, move pets and plants inside' },
  { temp: '20°F', action: 'Emergency drip mode — every faucet, open all cabinets, minimize door openings' },
  { temp: '15°F', action: 'Stay home if possible, conserve heat, monitor pipes every 2 hours' },
  { temp: '10°F', action: 'Turn off water at main if leaving, alert check-in contact' },
];

export default function DFWWinterStormKit() {
  const [homeType, setHomeType] = useState('');
  const [hasGenerator, setHasGenerator] = useState('');
  const [showKit, setShowKit] = useState(false);

  const pipeTips = pipeDripTips[homeType] || [];

  const baseKit = [
    '🧯 Pipe insulation foam — buy before season, not during storm',
    '🔦 Headlamps (1 per person) + spare batteries',
    '🕯️ Emergency candles + lighters (3+)',
    '💧 Water — 1 gallon/person/day for 7 days minimum',
    '🥫 Non-perishable food for 7 days (no cooking required)',
    '🔋 Portable power banks — 20,000+ mAh each',
    '🧥 Thermal layers for every household member',
    '🛌 Sleeping bags rated to 0°F or heavy blankets per bed',
    '📱 Battery-powered weather radio',
    hasGenerator === 'yes' ? '⛽ 5+ gallons of stabilized fuel + generator startup checklist' : '🕯️ No generator — rely on candles, layers, community shelter',
    '🚗 Fill gas tank at 50% — gas stations lose power in storms',
    '🏥 7-day supply of all prescription medications',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          ❄️ Winter Storm Preparedness Kit
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          The 2021 Winter Storm Uri left 4.5 million Texas homes without power. DFW homes 
          are not built for extreme cold. This kit helps you survive the next one.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '16px 20px', marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <strong>📌 2021 Lesson:</strong> Burst pipes caused $18B in damage statewide. Most was preventable with proper dripping and insulation.
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Tell Us About Your Home</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>HOME FOUNDATION TYPE</label>
            <select
              value={homeType}
              onChange={e => setHomeType(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
            >
              <option value=''>Select foundation type</option>
              <option value='slab'>Slab foundation</option>
              <option value='pier'>Pier & beam / crawl space</option>
              <option value='twostory'>Two-story (any foundation)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>DO YOU HAVE A GENERATOR?</label>
            <select
              value={hasGenerator}
              onChange={e => setHasGenerator(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #2a4a7f', fontSize: 15 }}
            >
              <option value=''>Select one</option>
              <option value='yes'>Yes — I have a generator</option>
              <option value='no'>No generator</option>
            </select>
          </div>
          <button
            onClick={() => setShowKit(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer' }}
          >
            Build My Winter Storm Kit →
          </button>
        </div>

        {showKit && (
          <>
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📦 Your Winter Storm Kit</h2>
              {baseKit.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>{item}</div>
              ))}
            </div>

            {pipeTips.length > 0 && (
              <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💧 Pipe Protection — Your Home Type</h2>
                {pipeTips.map((t, i) => (
                  <div key={i} style={{ padding: '6px 0', fontSize: 14, color: '#cbd5e1′ }}>{t}</div>
                ))}
              </div>
            )}
          </>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🌡️ Temperature Action Thresholds</h2>
          {tempThresholds.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 6, padding: '2px 8px', fontSize: 13, whiteSpace: 'nowrap', height: 'fit-content' }}>{t.temp}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1′ }}>{t.action}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '16px 20px', color: '#0A1628', textAlign: 'center' }}>
          <strong>🔧 Burst pipe? ProLnk connects you to emergency plumbers in DFW — 24/7.</strong>
        </div>
      </div>
    </div>
  );
}
