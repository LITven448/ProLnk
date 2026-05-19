import { useState } from 'react';

const cityData: Record<string, {
  provider: string;
  hardness: number;
  hardnessLabel: string;
  restrictions: string;
  avgBill: { low: number; medium: number; high: number };
  notes: string;
}> = {
  Dallas: {
    provider: 'Dallas Water Utilities',
    hardness: 108,
    hardnessLabel: 'Moderately Hard',
    restrictions: 'Stage 1: Odd/even watering days. Stage 2: 2 days/week. Stage 3: Hand watering only.',
    avgBill: { low: 35, medium: 65, high: 110 },
    notes: 'DWU serves most of Dallas proper. Some areas near city limits may be on MUD districts.',
  },
  Frisco: {
    provider: 'City of Frisco Water',
    hardness: 285,
    hardnessLabel: 'Very Hard',
    restrictions: 'Permanent: No watering 10am–6pm. Stage 1: 1 day/week. Stage 2: Hand watering only.',
    avgBill: { low: 42, medium: 80, high: 140 },
    notes: 'Extremely hard water — scale buildup in appliances common. Water softener highly recommended.',
  },
  Plano: {
    provider: 'City of Plano Water',
    hardness: 200,
    hardnessLabel: 'Hard',
    restrictions: 'No watering between 10am–6pm year-round. Stage 1: 2 days/week. Stage 2: 1 day/week.',
    avgBill: { low: 38, medium: 72, high: 125 },
    notes: 'Plano sources water from NTMWD. Bills include stormwater fee separate from consumption.',
  },
  McKinney: {
    provider: 'North Texas Municipal Water District (NTMWD)',
    hardness: 245,
    hardnessLabel: 'Hard',
    restrictions: 'No watering 10am–6pm. Stage 1: 2 days/week. Stage 2: 1 day/week. Stage 3: Hand watering.',
    avgBill: { low: 40, medium: 75, high: 130 },
    notes: 'NTMWD serves McKinney wholesale. City bills for distribution. Water softeners common.',
  },
  Arlington: {
    provider: 'City of Arlington Water',
    hardness: 175,
    hardnessLabel: 'Hard',
    restrictions: 'Permanent odd/even watering schedule. Stage 1 adds time restrictions. Stage 2 limits days.',
    avgBill: { low: 36, medium: 68, high: 115 },
    notes: 'Arlington sources from Lake Arlington and purchases from Trinity River Authority.',
  },
  Garland: {
    provider: 'City of Garland Water',
    hardness: 155,
    hardnessLabel: 'Moderately Hard',
    restrictions: 'Odd/even watering by address. No watering 10am–6pm. Stage restrictions mirror DFW metro.',
    avgBill: { low: 34, medium: 63, high: 108 },
    notes: 'Garland operates its own treatment plant using Lake Ray Hubbard.',
  },
  'Fort Worth': {
    provider: 'City of Fort Worth Water',
    hardness: 135,
    hardnessLabel: 'Moderately Hard',
    restrictions: 'Permanent no watering 10am–6pm. Odd/even schedule. Stage 1 reduces to 1 day/week.',
    avgBill: { low: 37, medium: 70, high: 118 },
    notes: 'Fort Worth sources from Eagle Mountain and Richland-Chambers reservoirs.',
  },
  Prosper: {
    provider: 'Upper Trinity Regional Water District / Town of Prosper',
    hardness: 270,
    hardnessLabel: 'Very Hard',
    restrictions: 'Strict conservation: watering 2 days/week max, no watering 10am–6pm year-round.',
    avgBill: { low: 45, medium: 85, high: 150 },
    notes: 'Fast-growing area. Water infrastructure still expanding. Very high hardness — scale is a real concern.',
  },
};

const usageLevels = [
  { key: 'low', label: 'Low (under 3,000 gal/mo)', value: 'low' },
  { key: 'medium', label: 'Typical (3,000–7,000 gal/mo)', value: 'medium' },
  { key: 'high', label: 'High (7,000+ gal/mo)', value: 'high' },
];

export default function DFWWaterUtilityGuide() {
  const [selectedCity, setSelectedCity] = useState('Dallas');
  const [usage, setUsage] = useState<'low' | 'medium' | 'high'>('medium');

  const city = cityData[selectedCity];

  const hardnessColor =
    city.hardness < 150 ? '#4ade80' : city.hardness < 220 ? '#facc15' : '#f87171';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>💧 DFW Water Utility Guide</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Water hardness, providers, restrictions, and bills vary dramatically across DFW. Know your city.</p>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>SELECT YOUR CITY</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                style={{ width: '100%', background: '#1A2E4A', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}
              >
                {Object.keys(cityData).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>USAGE LEVEL</label>
              <select
                value={usage}
                onChange={e => setUsage(e.target.value as 'low' | 'medium' | 'high')}
                style={{ width: '100%', background: '#1A2E4A', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}
              >
                {usageLevels.map(u => <option key={u.key} value={u.value}>{u.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>🏛️ WATER PROVIDER</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4 }}>{city.provider}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: `4px solid ${hardnessColor}` }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>💎 WATER HARDNESS</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: hardnessColor }}>{city.hardness} ppm</div>
              <div style={{ fontSize: 13, color: '#8A9BB5' }}>{city.hardnessLabel}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #60a5fa' }}>
              <div style={{ fontSize: 11, color: '#8A9BB5', marginBottom: 6, fontWeight: 700 }}>💵 EST. MONTHLY BILL</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#60a5fa' }}>${city.avgBill[usage]}</div>
              <div style={{ fontSize: 13, color: '#8A9BB5' }}>at {usageLevels.find(u => u.value === usage)?.label.split('(')[0].trim().toLowerCase()} usage</div>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🚿 WATER RESTRICTIONS</div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{city.restrictions}</p>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📋 LOCAL NOTES</div>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>{city.notes}</p>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 20 }}>📖 How to Read Your DFW Water Bill</h3>
          {[
            { icon: '📊', title: 'Base Charge', desc: 'Fixed monthly fee regardless of usage — typically $8–15 in DFW cities.' },
            { icon: '💧', title: 'Tier 1 Usage', desc: 'First 2,000–3,000 gallons at lowest rate. Stay here if possible.' },
            { icon: '📈', title: 'Tier 2+ Rates', desc: 'Rates increase significantly. Summer irrigation pushes most homes into Tier 2 or 3.' },
            { icon: '🌧️', title: 'Stormwater Fee', desc: 'Separate line item in Plano, Frisco, McKinney. Based on impervious surface area of your lot.' },
            { icon: '🔍', title: 'Leak Detection', desc: 'Sudden spike with no usage change? Check toilets and hose bibs first — most common cause.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, minWidth: 36 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 2 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
