import { useState } from 'react';

const dehumidifierTypes = {
  wholeHome: {
    name: 'Whole-Home Dehumidifier',
    capacity: '70–135 pints/day',
    costInstalled: '$1,200–$2,800',
    bestFor: 'Homes with crawl spaces, basements, or oversized AC systems',
    dfwNote: 'Best for DFW homes where oversized AC short-cycles and never removes humidity properly',
    locations: ['Attic (most common in DFW)', 'Mechanical room', 'Connected to existing ductwork'],
  },
  portable: {
    name: 'Portable Dehumidifier',
    capacity: '30–70 pints/day',
    costInstalled: '$200–$500 (no install cost)',
    bestFor: 'Single rooms, small areas, renters',
    dfwNote: 'Works for one room but requires manual emptying — not practical for DFW whole-home humidity issues',
    locations: ['Bedroom', 'Bonus room', 'Single-zone problem areas'],
  },
  crawlSpace: {
    name: 'Crawl Space Dehumidifier',
    capacity: '70–100 pints/day',
    costInstalled: '$800–$1,600',
    bestFor: 'DFW homes with pier-and-beam foundations or encapsulated crawl spaces',
    dfwNote: 'Critical for older DFW homes with crawl spaces — ground moisture wicks up and causes mold',
    locations: ['Crawl space only', 'Vented directly outside'],
  },
};

const getRecommendation = (symptoms: string, homeType: string) => {
  if (homeType === 'crawl') return 'crawlSpace';
  if (symptoms === 'whole' || homeType === 'slab-large') return 'wholeHome';
  return 'portable';
};

export default function DFWHVACDehumidifierGuide2026() {
  const [symptoms, setSymptoms] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = () => {
    if (!symptoms || !homeType) return;
    setResult(getRecommendation(symptoms, homeType));
  };

  const rec = result ? dehumidifierTypes[result as keyof typeof dehumidifierTypes] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>💧 DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          Whole-Home Dehumidifier Guide for DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW summers hit 60–80% relative humidity — and your AC may not fix it. Oversized AC systems that short-cycle
          never run long enough to wring moisture out of the air. Whole-home dehumidifiers solve what your AC can't.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Find Your Dehumidifier Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>HUMIDITY SYMPTOMS</label>
              <select value={symptoms} onChange={e => setSymptoms(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080' }}>
                <option value="">Select symptoms</option>
                <option value="single">One or two rooms feel muggy</option>
                <option value="whole">Whole house feels clammy</option>
                <option value="mold">Musty smell or visible mold</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>HOME TYPE</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#1a2f55', color: '#fff', border: '1px solid #2a4080' }}>
                <option value="">Select type</option>
                <option value="slab-small">Slab foundation, under 2,500 sq ft</option>
                <option value="slab-large">Slab foundation, over 2,500 sq ft</option>
                <option value="crawl">Pier-and-beam / crawl space</option>
              </select>
            </div>
          </div>
          <button onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
        </div>

        {rec && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>✅ Recommended: {rec.name}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{rec.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>CAPACITY</div><div style={{ fontSize: '0.9rem' }}>{rec.capacity}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>INSTALLED COST</div><div style={{ fontSize: '0.9rem' }}>{rec.costInstalled}</div></div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📊 Where DFW Homes Need Dehumidification Most</h2>
        {[
          { area: '🏠 Oversized AC Homes', detail: 'If your system runs < 10 min cycles, it never removes humidity — add whole-home dehumidifier' },
          { area: '🏗️ Pier-and-Beam Foundations', detail: 'Ground moisture rises into living space year-round in DFW — crawl space dehumidifier is essential' },
          { area: '🌧️ North-Facing Rooms', detail: 'Less solar gain = higher relative humidity — good candidate for supplemental dehumidification' },
          { area: '🧳 Bonus Rooms & Finished Attics', detail: 'Poorly insulated DFW bonus rooms trap humidity — often overlooked by main HVAC system' },
        ].map(item => (
          <div key={item.area} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{item.area}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.detail}</div>
          </div>
        ))}

        <div style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem', marginTop: '1rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>⚠️ Sizing Rule for DFW</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Target 70–90 pints/day capacity for most DFW homes up to 3,000 sq ft. Add 10 pints/day per additional
            500 sq ft. Set target RH to 50–55% — below 50% can cause wood floor gapping in DFW's swinging humidity seasons.
          </p>
        </div>
      </div>
    </div>
  );
}
