import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

const baseData = {
  shutoffs: ['Main shutoff: typically at street meter box or side of house', 'Toilet shutoff: oval valve behind toilet at wall', 'Know all shutoffs before an emergency — tour your home now'],
  hardWater: ['DFW water hardness: 15–25 gpg (very hard)', 'Flush water heater annually to remove sediment', 'Install whole-home softener — protects all fixtures'],
  slabLeak: ['Warm spots on floor = hot slab leak', 'Sudden water bill spike with no visible leak', 'Call immediately — slab damage accelerates fast in DFW clay'],
  freeze: ['Drip faucets when temps drop below 28°F', 'Know how to shut off main before pipes burst', 'Insulate exposed pipes in garage and exterior walls'],
  vetting: ['Verify TSBPE plumber license at tdlr.texas.gov', 'Get 3 written quotes for any repair over $500', 'Confirm permit pulled for water heater replacements'],
  maintenance: ['Test water heater pressure relief valve annually', 'Snake main drain every 3–5 years preventively', 'Check under sinks for slow drips monthly'],
};

const typeOverrides: Record<string, Partial<typeof baseData>> = {
  '1950s Slab': { slabLeak: ['Cast iron drain lines likely — inspect with camera', 'Slab leaks extremely common in this era', 'Budget $3K–$8K for slab repair in DFW'] },
  '1970s Pier & Beam': { maintenance: ['Inspect under-floor plumbing annually for corrosion', 'Pier & beam gives access — cheaper to repair', 'Look for moisture, sagging, or mold under house'] },
  '1990s Two-Story': { shutoffs: ['Upper floor has separate shutoffs at fixtures', 'Water hammer common — install arrestors', 'Know upstairs shutoffs to prevent ceiling damage'] },
  '2000s+ New Build': { hardWater: ['PEX plumbing — flexible but check fittings', 'Tankless water heater: descale annually with vinegar', 'Hard water still degrades tankless units quickly'] },
};

export default function DFWPlumbingFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);
  const data = { ...baseData, ...(typeOverrides[homeType] || {}) };

  const sections = [
    { emoji: '🚰', title: 'Water Shutoffs', items: data.shutoffs },
    { emoji: '💎', title: 'Hard Water Maintenance', items: data.hardWater },
    { emoji: '🏗️', title: 'Slab Leak Signals', items: data.slabLeak },
    { emoji: '🧊', title: 'Freeze Protocol', items: data.freeze },
    { emoji: '🔧', title: 'Preventive Maintenance', items: data.maintenance },
    { emoji: '✅', title: 'Contractor Vetting', items: data.vetting },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔧💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW Plumbing Final Reference Card</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Everything you need — one page, DFW-specific</p>
        </div>

        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <label style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '10px' }}>My DFW Home Type:</label>
          <select
            value={homeType}
            onChange={e => setHomeType(e.target.value)}
            style={{ background: '#1e293b', color: '#F5E642', border: '1px solid #F5E642', borderRadius: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            {homeTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {sections.map(sec => (
            <div key={sec.title} style={{ background: '#1e293b', borderRadius: '10px', padding: '16px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{sec.emoji}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '14px' }}>{sec.title}</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                {sec.items.map((item, i) => (
                  <li key={i} style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.6', marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#F5E642', borderRadius: '8px', padding: '12px 16px', textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Print this card — post it near your water heater</span>
        </div>
      </div>
    </div>
  );
}
