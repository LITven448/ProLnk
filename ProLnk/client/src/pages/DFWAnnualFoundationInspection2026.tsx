import { useState } from 'react';

const foundationTypes = ['Slab on Grade', 'Pier and Beam', 'Post-Tension Slab'];

const checklistMap: Record<string, { annual: string[]; monthly: string[] }> = {
  'Slab on Grade': {
    monthly: [
      '🚪 Check all interior doors — sticking or gaps indicate movement',
      '🪟 Check all windows — test opening/closing for binding',
      '🔍 Walk interior — look for new drywall cracks (diagonal = concern)',
      '🌿 Check soil level around perimeter — maintain 6" below slab edge',
    ],
    annual: [
      '📐 Walk full perimeter — check for cracks in concrete at slab edge',
      '💧 Verify all drainage slopes away from foundation (min 6" per 10 ft)',
      '🌳 Check trees within 20 feet — roots can affect drainage and soil moisture',
      '💦 Check all gutter downspout extensions — min 6 ft from foundation',
      '🌡️ Check soil moisture uniformity around home (DFW clay expands/contracts)',
      '🔧 Inspect plumbing for leaks under slab (check water meter overnight)',
      '📊 Consider annual reading with zip level or manometer if history of movement',
    ],
  },
  'Pier and Beam': {
    monthly: [
      '🚪 Check all interior doors for sticking or gaps',
      '🪟 Check windows for binding',
      '🔍 Look for new cracks along wall/ceiling intersections',
    ],
    annual: [
      '🏠 Crawl space inspection — check all piers for settling or heaving',
      '💧 Check crawl space drainage — no standing water allowed',
      '🍄 Inspect wood beams for rot, fungal growth, or pest damage',
      '🐜 Look for termite shelter tubes at pier bases and beams',
      '📐 Check beam levelness — sister beams if sagging over 1"',
      '💦 Verify foundation vents are open in summer, closed in winter',
      '🔧 Check all plumbing in crawl space for leaks or corrosion',
    ],
  },
  'Post-Tension Slab': {
    monthly: [
      '🚪 Check all doors for sticking — PT slabs still move with DFW clay',
      '🪟 Monitor windows for binding',
      '🔍 Look for cracks in drywall — document with photos',
    ],
    annual: [
      '⚠️ Never drill into a post-tension slab without locating tendons first',
      '📐 Walk perimeter — check slab edge and stucco at grade for cracks',
      '💧 Verify drainage — PT slabs are more sensitive to moisture imbalance',
      '💦 Inspect all downspout extensions — ensure water moves away from home',
      '🌳 Monitor trees within 25 feet — removal may be needed if roots affect drainage',
      '🔧 Check irrigation system for leaks near foundation',
      '📊 Consider annual inspection by engineer if visible cracking has occurred',
    ],
  },
};

export default function DFWAnnualFoundationInspection2026() {
  const [type, setType] = useState('');

  const data = type ? checklistMap[type] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#E8F4FD' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Annual Foundation Inspection Checklist 2026</h1>
          <p style={{ color: '#8BA3BC', fontSize: 14 }}>DFW clay soil moves seasonally — consistent monitoring prevents costly repairs</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Foundation Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {foundationTypes.map(t => (
              <button key={t} onClick={() => setType(t)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: type === t ? '#F5E642' : '#1E3A5F', background: type === t ? '#F5E642' : 'transparent', color: type === t ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>📅 Monthly Monitoring — {type}</h2>
              {data.monthly.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < data.monthly.length - 1 ? '1px solid #1E3A5F' : 'none', color: '#E8F4FD', fontSize: 14 }}>{item}</div>
              ))}
            </div>

            <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🗓️ Annual Inspection — {type}</h2>
              {data.annual.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < data.annual.length - 1 ? '1px solid #1E3A5F' : 'none', color: '#E8F4FD', fontSize: 14 }}>{item}</div>
              ))}
            </div>
          </>
        )}

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>🌧️ DFW Clay Soil Facts</h2>
          <p style={{ color: '#E8F4FD', fontSize: 13, lineHeight: 1.6, margin: 0 }}>DFW sits on expansive Blackland Prairie clay that can move 3-4 inches vertically with moisture changes. Consistent soil moisture (not wet, not dry) around the perimeter is the single most important factor in foundation stability. A soaker hose system on a timer during dry summers is one of the best investments a DFW homeowner can make.</p>
        </div>

        <p style={{ textAlign: 'center', color: '#3D5A80', fontSize: 12, marginTop: 24 }}>ProLnk · DFW Foundation Inspection Guide 2026</p>
      </div>
    </div>
  );
}