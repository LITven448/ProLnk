import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

const baseData = {
  watering: ['DFW expansive clay: water foundation perimeter year-round', 'Drought (May–Sept): water 3x/week, 20–30 min per zone', 'Use soaker hose 6–12 inches from foundation, not sprinklers'],
  crackAssessment: ['Hairline cracks (<1/8"): normal, monitor quarterly', 'Horizontal cracks: structural concern — call engineer immediately', 'Stair-step cracks in brick: foundation movement — get evaluation'],
  drainage: ['Grade slopes away from foundation: 6" drop in first 10 feet', 'Downspouts must extend 6+ feet from foundation', 'French drain if water pools within 10 feet of home'],
  warranty: ['Transferable warranty: confirm in writing before purchase', 'Most structural warranties: 10 years, some limited to 2', 'Foundation repair warranty: demand transferable, no time limit'],
  vetting: ['Use Texas-licensed structural engineers for evaluation', 'Get 3 bids — pricing varies wildly in DFW', 'Confirm warranty is transferable and fully written'],
  signals: ['Doors sticking or gaps at frame corners', 'Cracks appearing at window corners or above doorways', 'Sloping floors — use a marble test in multiple rooms'],
};

const typeOverrides: Record<string, Partial<typeof baseData>> = {
  '1950s Slab': { crackAssessment: ['Post-tension cables common — never cut without engineer sign-off', 'Older slabs: more prone to differential settlement', 'If cracks are growing — document with tape and date marks'] },
  '1970s Pier & Beam': { watering: ['Pier & beam: less clay movement risk but check pier settling', 'Inspect piers and beams annually — look for rot or shifting', 'Moisture under crawl space causes wood movement — ventilate well'] },
  '1990s Two-Story': { signals: ['Two-story: check both floors for door alignment issues', 'Garage door gaps may indicate corner settlement', 'Upper floor doors harder to re-hang — catch movement early'] },
  '2000s+ New Build': { warranty: ['Builder structural warranty likely still active (10 years)', 'Document any cracks now — builder liable for structural defects', 'Register warranty if required — check builder paperwork'] },
};

export default function DFWFoundationFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);
  const data = { ...baseData, ...(typeOverrides[homeType] || {}) };

  const sections = [
    { emoji: '💧', title: 'Watering Schedule', items: data.watering },
    { emoji: '🔍', title: 'Crack Assessment', items: data.crackAssessment },
    { emoji: '⚠️', title: 'Warning Signals', items: data.signals },
    { emoji: '🌊', title: 'Drainage Management', items: data.drainage },
    { emoji: '📜', title: 'Warranty Knowledge', items: data.warranty },
    { emoji: '✅', title: 'Contractor Vetting', items: data.vetting },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏗️🌱</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW Foundation Final Reference Card</h1>
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
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Print this card — check foundation watering every drought season</span>
        </div>
      </div>
    </div>
  );
}
