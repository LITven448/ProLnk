import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

const baseData = {
  inspections: ['Inspect after every hail storm — even small hail damages shingles', 'Professional inspection: spring (post-storm season) + fall (pre-winter)', 'Binocular check from ground: look for missing, cracked, or curling shingles'],
  hailProtocol: ['After hail: photograph damage immediately for insurance', 'File claim within 1 year of storm event (TX standard)', 'Don\’t sign with storm-chaser contractors at your door — get 3 bids'],
  vetting: ['Verify roofing contractor with RCAT (Roofing Contractors Assoc of TX)', 'Require proof of insurance: $1M liability + workers comp', 'Never pay more than 10% deposit before work begins'],
  warranty: ['Manufacturer warranty (shingles): 25–50 years for quality products', 'Workmanship warranty: require minimum 5-year from contractor', 'Warranty transfers with home sale — get documentation at closing'],
  replacement: ['20–25 years: inspect annually, budget for replacement', '3 or more layers of shingles: tear-off required by code', 'Class 4 impact-resistant shingles: qualify for TX insurance discount'],
  maintenance: ['Keep gutters clean — clogged gutters cause fascia rot', 'Trim trees within 6 feet of roof line', 'Check flashing at chimney, skylights, and vents every 2 years'],
};

const typeOverrides: Record<string, Partial<typeof baseData>> = {
  '1950s Slab': { replacement: ['Roof likely 20+ years — inspect immediately', 'Original decking may be 1x6 boards — check for rot during re-roof', 'Budget $8K–$18K for full replacement in DFW'] },
  '1970s Pier & Beam': { maintenance: ['Check attic ventilation — older homes often under-ventilated', 'Poor ventilation shortens shingle life by 30–40%', 'Add ridge vents and soffit vents if absent'] },
  '1990s Two-Story': { hailProtocol: ['Two-story: harder to inspect yourself — use binoculars or drone', 'Valley flashing on complex rooflines leaks first — inspect closely', 'Ice dam risk at valleys during rare DFW freezes'] },
  '2000s+ New Build': { warranty: ['Manufacturer warranty likely still active — find documentation', 'Register shingle warranty if not already done (some require it)', 'Builder warranty on structure may still apply — check paperwork'] },
};

export default function DFWRoofingFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);
  const data = { ...baseData, ...(typeOverrides[homeType] || {}) };

  const sections = [
    { emoji: '🏠', title: 'Inspection Timing', items: data.inspections },
    { emoji: '⛈️', title: 'Hail Protocol', items: data.hailProtocol },
    { emoji: '🔧', title: 'Preventive Maintenance', items: data.maintenance },
    { emoji: '📜', title: 'Warranty Transfers', items: data.warranty },
    { emoji: '🔄', title: 'Replacement Timing', items: data.replacement },
    { emoji: '✅', title: 'Contractor Vetting', items: data.vetting },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏠⛈️</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW Roofing Final Reference Card</h1>
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
            <div key={sec.title} style={{ background: '#1e293b', borderRadius: '10px', padding: '16px', border: '1px solid #334155′ }}>
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
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Print this card — store with your homeowner documents</span>
        </div>
      </div>
    </div>
  );
}
