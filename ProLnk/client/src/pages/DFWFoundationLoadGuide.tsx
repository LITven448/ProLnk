import { useState } from 'react';

const additions = [
  'Room addition (standard framing)',
  'Second story addition',
  'Garage conversion to living space',
  'Swimming pool (inground)',
  'Large stone/tile flooring',
  'Heavy spa or hot tub on slab',
];

const ages = ['Pre-1970', '1970–1990', '1990–2010', '2010–present'];

function getLoad(addition: string, age: string) {
  const engineerRequired = ['Second story addition', 'Swimming pool (inground)', 'Heavy spa or hot tub on slab'].includes(addition);
  const highRisk = age === 'Pre-1970′ || age === '1970–1990';
  const considerations: Record<string, string> = {
    'Room addition (standard framing)': 'Adds 10–15 PSF dead load. Requires new continuous footings tied to existing slab. Permit required in all DFW cities.',
    'Second story addition': 'Doubles effective live load on existing slab. Most DFW slabs 1970+ can support with beam/column reinforcement. Engineer must certify.',
    'Garage conversion to living space': 'Minimal new load but changes moisture dynamics — garage slabs often thinner (3.5″). HVAC addition matters for slab temp.',
    'Swimming pool (inground)': 'Pool shell weight + water = 100,000+ lbs. Must be designed away from foundation bearing zone. Hydrostatic pressure a concern.',
    'Large stone/tile flooring': 'Stone tile adds 15–25 PSF. Distributed load manageable on most post-tension DFW slabs. Check for deflection allowance.',
    'Heavy spa or hot tub on slab': 'Hot tub + water can exceed 5,000 lbs in 50 sq ft. Concentrated point load — engineer review required to avoid punching shear.',
  };
  return {
    engineerRequired,
    highRisk,
    consideration: considerations[addition],
    specify: engineerRequired ? 'Require sealed foundation load analysis in scope of work' : 'Include foundation inspection in permit scope',
    ageFactor: highRisk ? 'Older DFW homes may have conventional (non-post-tension) slabs — additional reinforcement often needed' : 'Post-tension slab common — contractor must locate cables before any penetration',
  };
}

export default function DFWFoundationLoadGuide() {
  const [addition, setAddition] = useState('');
  const [age, setAge] = useState('');
  const result = addition && age ? getLoad(addition, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Load Distribution Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          Every DFW home has a foundation rated for a specific load. Additions and heavy features redistribute that load — sometimes beyond what the original slab can handle on DFW clay.
        </p>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚖️ How DFW Slabs Carry Load</h2>
          <ul style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW homes use post-tension concrete slabs — steel cables under tension carry load across the slab</li>
            <li>Load transfers through slab to soil — DFW clay must support bearing pressure without excessive compression</li>
            <li>Dead load (structure) + live load (people, furniture) + environmental load (wind) = total design load</li>
            <li>Adding mass above design limits causes differential settlement in soft DFW clay zones</li>
            <li>Cable locations must be X-rayed before any core drilling or anchor installation</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Load Consideration Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>PLANNED ADDITION TYPE</label>
              <select value={addition} onChange={e => setAddition(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select addition</option>
                {additions.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>HOME VINTAGE</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select vintage</option>
                {ages.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div>
              {result.engineerRequired && (
                <div style={{ background: '#F5E64215', border: '1px solid #F5E642', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>⚠️ Structural Engineer Required</div>
                  <div style={{ color: '#CBD5E1', fontSize: 13 }}>This addition type requires a sealed structural engineering report before DFW building permit approval.</div>
                </div>
              )}
              {result.highRisk && (
                <div style={{ background: '#F8717115', border: '1px solid #F87171', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  <div style={{ color: '#F87171', fontWeight: 700, marginBottom: 4 }}>🔍 Older Home — Extra Scrutiny Needed</div>
                  <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.ageFactor}</div>
                </div>
              )}
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>LOAD CONSIDERATION</div>
                <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>{result.consideration}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>📋 WHAT TO SPECIFY</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.specify}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>📌 DFW Permit Note</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>All DFW structural additions require building permits. Dallas, Fort Worth, Frisco, McKinney, and Plano all require foundation documentation for additions over 200 sq ft. Never skip — unpermitted additions complicate sales and insurance.</p>
        </div>
      </div>
    </div>
  );
}
