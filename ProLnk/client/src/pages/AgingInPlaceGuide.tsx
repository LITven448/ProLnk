import { useState } from 'react';

const mobilityOptions = ['Independent', 'Uses cane/walker', 'Uses wheelchair', 'Limited mobility'];
const layoutOptions = ['Single story', 'Two story - bedroom upstairs', 'Two story - all upstairs', 'Split level'];

const modifications: Record<string, Record<string, { items: string[]; costs: string[] }>> = {
  Independent: {
    'Single story': {
      items: ['Lever door handles throughout', 'Grab bars in bathroom', 'Non-slip flooring', 'Motion-sensor lighting', 'Comfort-height toilet'],
      costs: ['$200-400', '$300-800', '$500-1,500', '$150-400', '$200-500'],
    },
    'Two story - bedroom upstairs': {
      items: ['Stair railings upgrade', 'Lever door handles', 'Grab bars in bathroom', 'Non-slip flooring', 'Comfort-height toilet'],
      costs: ['$800-2,000', '$200-400', '$300-800', '$500-1,500', '$200-500'],
    },
    'Two story - all upstairs': {
      items: ['Stair lift installation', 'Lever door handles', 'Grab bars in bathroom', 'Non-slip flooring', 'Stair railings upgrade'],
      costs: ['$3,000-6,000', '$200-400', '$300-800', '$500-1,500', '$800-2,000'],
    },
    'Split level': {
      items: ['Mini stair lift or ramp', 'Lever door handles', 'Grab bars in bathroom', 'Non-slip flooring', 'Comfort-height toilet'],
      costs: ['$2,000-5,000', '$200-400', '$300-800', '$500-1,500', '$200-500'],
    },
  },
  'Uses cane/walker': {
    'Single story': {
      items: ['36" doorway widening (2 doors)', 'Walk-in shower conversion', 'Grab bars (full set)', 'Non-slip flooring', 'Comfort-height toilet'],
      costs: ['$1,500-4,000', '$3,000-8,000', '$600-1,200', '$500-1,500', '$200-500'],
    },
    'Two story - bedroom upstairs': {
      items: ['First-floor bedroom conversion', '36" doorway widening', 'Walk-in shower conversion', 'Grab bars (full set)', 'Non-slip flooring'],
      costs: ['$5,000-15,000', '$1,500-4,000', '$3,000-8,000', '$600-1,200', '$500-1,500'],
    },
    'Two story - all upstairs': {
      items: ['First-floor living conversion', 'Stair lift (interim)', '36" doorway widening', 'Walk-in shower conversion', 'Grab bars (full set)'],
      costs: ['$8,000-20,000', '$3,000-6,000', '$1,500-4,000', '$3,000-8,000', '$600-1,200'],
    },
    'Split level': {
      items: ['Ramp for level changes', '36" doorway widening', 'Walk-in shower conversion', 'Grab bars (full set)', 'Non-slip flooring'],
      costs: ['$1,500-5,000', '$1,500-4,000', '$3,000-8,000', '$600-1,200', '$500-1,500'],
    },
  },
  'Uses wheelchair': {
    'Single story': {
      items: ['36" doorway widening throughout', 'Roll-in shower installation', 'Exterior ramp', 'Grab bars and ADA fixtures', 'Raised outlets/lowered switches'],
      costs: ['$6,000-15,000', '$5,000-12,000', '$2,000-6,000', '$1,000-2,500', '$1,500-3,000'],
    },
    'Two story - bedroom upstairs': {
      items: ['Full first-floor living suite', '36" doorway widening', 'Roll-in shower installation', 'Exterior ramp', 'Grab bars and ADA fixtures'],
      costs: ['$15,000-40,000', '$6,000-15,000', '$5,000-12,000', '$2,000-6,000', '$1,000-2,500'],
    },
    'Two story - all upstairs': {
      items: ['Residential elevator or lift', '36" doorway widening', 'Roll-in shower installation', 'Exterior ramp', 'Full ADA kitchen adaptation'],
      costs: ['$15,000-35,000', '$6,000-15,000', '$5,000-12,000', '$2,000-6,000', '$8,000-20,000'],
    },
    'Split level': {
      items: ['Level transition ramps', '36" doorway widening', 'Roll-in shower installation', 'Exterior ramp', 'Grab bars and ADA fixtures'],
      costs: ['$3,000-8,000', '$6,000-15,000', '$5,000-12,000', '$2,000-6,000', '$1,000-2,500'],
    },
  },
  'Limited mobility': {
    'Single story': {
      items: ['Comfort-height toilet + bidet', 'Grab bars (full set)', 'Walk-in tub or shower', 'Non-slip flooring everywhere', 'Smart home voice controls'],
      costs: ['$500-1,500', '$600-1,200', '$3,000-10,000', '$800-2,500', '$500-2,000'],
    },
    'Two story - bedroom upstairs': {
      items: ['Main-floor bedroom/bath addition', 'Stair lift (temporary)', 'Grab bars (full set)', 'Walk-in tub or shower', 'Non-slip flooring'],
      costs: ['$10,000-25,000', '$3,000-6,000', '$600-1,200', '$3,000-10,000', '$800-2,500'],
    },
    'Two story - all upstairs': {
      items: ['Home addition - main floor suite', 'Stair lift', 'Grab bars (full set)', 'Walk-in tub or shower', 'Smart home voice controls'],
      costs: ['$20,000-60,000', '$3,000-6,000', '$600-1,200', '$3,000-10,000', '$500-2,000'],
    },
    'Split level': {
      items: ['Level-change ramps', 'Grab bars (full set)', 'Walk-in tub or shower', 'Non-slip flooring', 'Smart home voice controls'],
      costs: ['$2,000-6,000', '$600-1,200', '$3,000-10,000', '$800-2,500', '$500-2,000'],
    },
  },
};

function parseCost(s: string) {
  const nums = s.replace(/\$/g, '').replace(/,/g, '').split('-');
  return nums.map(Number);
}

export default function AgingInPlaceGuide() {
  const [mobility, setMobility] = useState('');
  const [layout, setLayout] = useState('');

  const result = mobility && layout ? modifications[mobility]?.[layout] : null;

  const totalMin = result ? result.costs.reduce((acc, c) => acc + parseCost(c)[0], 0) : 0;
  const totalMax = result ? result.costs.reduce((acc, c) => acc + parseCost(c)[1], 0) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14 }}>🏠 ProLnk DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Aging in Place: DFW Home Modifications</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Plan modifications that help you or a loved one stay safely at home — with CAPS-certified DFW contractors who specialize in accessibility upgrades.
        </p>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Key Modification Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🚿', title: 'Bathroom Safety', desc: 'Walk-in shower/tub, grab bars, non-slip floors, comfort-height toilet' },
              { icon: '🚪', title: 'Doorway Widening', desc: '36" minimum for wheelchair access, lever door handles throughout' },
              { icon: '🪜', title: 'Stair Solutions', desc: 'Stair lifts ($3K-6K), ramps, first-floor living conversion' },
              { icon: '💡', title: 'Smart Lighting', desc: 'Motion sensors, voice control, no-trip lighting at night' },
            ].map((c) => (
              <div key={c.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 6 }}>🔧 CAPS Certification — Why It Matters</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>
            Certified Aging in Place Specialists (CAPS) are contractors trained by NAHB to design and build modifications that meet safety and accessibility standards. Always verify certification before hiring in DFW.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['DFW CAPS Contractors Available', 'Free In-Home Assessment', 'Permit Handling Included', 'Insurance-Friendly Documentation'].map((t) => (
              <span key={t} style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🎯 Find Your Top 5 Modifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Mobility Level</label>
              <select
                value={mobility}
                onChange={(e) => setMobility(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
              >
                <option value="">Select mobility level...</option>
                {mobilityOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Home Layout</label>
              <select
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
              >
                <option value="">Select home layout...</option>
                {layoutOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>Your Top 5 Recommended Modifications</h3>
              {result.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                    <span>{item}</span>
                  </div>
                  <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 16 }}>{result.costs[i]}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Estimated Total Investment</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}</span>
              </div>
              <button style={{ marginTop: 16, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Free Quote from a DFW CAPS Contractor →
              </button>
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Financing & Assistance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: '🏛️', t: 'HUD Grants', d: 'Title 1 Property Improvement Loans for accessibility' },
              { icon: '🎖️', t: 'VA Benefits', d: 'Specially Adapted Housing grants for veterans' },
              { icon: '💊', t: 'Medicaid Waiver', d: 'Texas STAR+PLUS covers some home modifications' },
              { icon: '🏦', t: 'HELOC/Refinance', d: 'Use home equity to fund upgrades — rates competitive' },
            ].map((f) => (
              <div key={f.t} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{f.t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
