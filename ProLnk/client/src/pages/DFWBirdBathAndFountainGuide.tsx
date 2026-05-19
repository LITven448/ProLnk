import { useState } from 'react';

const waterRecs = [
  { space: 'small', birdInterest: 'high', location: 'north', rec: 'Pedestal bird bath with solar recirculating pump + mosquito dunks', feature: 'Classic concrete or resin pedestal bath, 18–24″ diameter', mosquito: 'Bt dunks (Bacillus thuringiensis) — safe for birds, lethal to mosquito larvae', maintenance: 'Change water every 3 days in summer, clean weekly, refill daily in DFW heat', cost: '$80–$350′ },
  { space: 'small', birdInterest: 'low', location: 'north', rec: 'Small tabletop fountain with continuous flow (moving water only)', feature: 'Ceramic or resin tabletop fountain — 12–18″ wide', mosquito: 'Continuous flow prevents mosquito larvae — no dunks needed if pump runs 24/7', maintenance: 'Clean monthly, top off weekly — DFW evaporation is significant in summer', cost: '$60–$250′ },
  { space: 'medium', birdInterest: 'high', location: 'north', rec: 'Dripper bird bath + native plant habitat garden', feature: 'Wide shallow bath (28″+ diameter) with dripper attachment — birds prefer moving water', mosquito: 'Dripper keeps water moving + add Bt dunks as backup. Change every 2–3 days in summer.', maintenance: 'Scrub with stiff brush weekly — algae builds fast in DFW sun', cost: '$150–$600′ },
  { space: 'medium', birdInterest: 'high', location: 'south', rec: 'Ground-level naturalistic water feature with recirculating pump', feature: 'Preformed pond liner or flagstone water feature — mimics natural water source', mosquito: 'Recirculating pump + Bt dunks + goldfish (eat larvae naturally)', maintenance: 'Quarterly deep clean, algae treatment, pump maintenance', cost: '$400–$1,800′ },
  { space: 'large', birdInterest: 'high', location: 'south', rec: 'Formal fountain with basin + integrated bird drinking ledge', feature: 'Cast stone or concrete multi-tier fountain — 3–5 ft diameter', mosquito: 'Recirculating pump (no stagnation) + Bt dunks in basin water', maintenance: 'Monthly cleaning, winterize basin during DFW freeze events', cost: '$800–$4,000′ },
  { space: 'large', birdInterest: 'low', location: 'south', rec: 'Decorative pondless waterfall or stream feature', feature: 'Waterfall into gravel reservoir — no open standing water exposed to mosquitoes', mosquito: 'Zero mosquito risk — water stays below gravel surface between pump cycles', maintenance: 'Annual pump cleaning, top off monthly, leaf removal in fall', cost: '$2,000–$8,000′ },
];

export default function DFWBirdBathAndFountainGuide() {
  const [space, setSpace] = useState('');
  const [birdInterest, setBirdInterest] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<typeof waterRecs[0] | null>(null);

  function calculate() {
    const match = waterRecs.find(r => r.space === space && r.birdInterest === birdInterest && r.location === location)
      || waterRecs.find(r => r.space === space && r.birdInterest === birdInterest)
      || waterRecs.find(r => r.space === space)
      || waterRecs[0];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐦</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Bird Bath & Fountain Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW sits directly on the Central Flyway — one of North America's great bird migration corridors. Hundreds of
          species pass through or live in DFW year-round. A water feature is the single fastest way to attract birds to
          your yard. But in DFW's climate, standing water means mosquitoes — and DFW mosquito season is severe.
          This guide covers both.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🦟 DFW Mosquito Prevention — Non-Negotiable</h2>
          <div style={{ background: '#2a0a0a', borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: '4px solid #ef4444′ }}>
            <p style={{ color: '#ef4444', fontWeight: 700, margin: '0 0 8px' }}>⚠️ DFW Mosquito Season: April – November</p>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.5 }}>
              DFW has one of the most aggressive mosquito populations in the US. Aedes aegypti and Culex mosquitoes
              breed in as little as 1/4 inch of standing water — a bird bath can produce 200+ mosquitoes per week
              without intervention. West Nile Virus cases are reported annually in Dallas and Tarrant counties.
            </p>
          </div>
          {[
            ['Recirculating Pump', 'Moving water cannot support mosquito larvae development. The most effective prevention — also what birds prefer.', '✅ Best'],
            ['Bt Dunks (Bacillus thuringiensis)', 'Biological larvicide — completely safe for birds, pets, wildlife. Kills larvae before they hatch. Place one dunk per 100 sq ft of water surface.', '✅ Excellent'],
            ['Change Water Every 2–3 Days', 'Larvae need 7–10 days to mature. Frequent changes prevent any from maturing. Labor-intensive in DFW summer heat.', '⚠️ Works if consistent'],
            ['Mosquito Fish (Gambusia)', 'Native DFW fish — free from Tarrant Regional Water District. Eat 100–300 larvae/day. Ideal for ponds and large features.', '✅ Natural Control'],
            ['Copper Coins', 'Popular myth — copper sulfate at coin levels does NOT effectively prevent mosquitoes. Do not rely on this.', '❌ Ineffective'],
          ].map(([method, desc, rating]) => (
            <div key={method as string} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{method as string}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: (rating as string).includes('Best') || (rating as string).includes('Excellent') || (rating as string).includes('Natural') ? '#22c55e' : (rating as string).includes('Ineffective') ? '#ef4444′ : '#fbbf24' }}>{rating as string}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🌿 DFW Birds Most Attracted to Water Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['American Robin', 'Year-round DFW resident — loves to bathe'], ['Northern Cardinal', 'DFW favorite — visits daily for water'], ['Baltimore Oriole', 'Spring/Fall migrant through DFW on Central Flyway'], ['Ruby-throated Hummingbird', 'Spring/Fall — loves misting fountain spray'], ['White-winged Dove', 'Year-round DFW — drinks daily from baths'], ['Painted Bunting', 'Spring migrant — one of North America\’s most colorful birds']].map(([bird, note]) => (
              <div key={bird} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 4px', fontSize: 13 }}>{bird}</p>
                <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Find Your Water Feature</h2>
          {[
            { label: 'Available Space', value: space, setter: setSpace, options: [['small', 'Small (patio, balcony, tight yard)'], ['medium', 'Medium (typical DFW suburban yard)'], ['large', 'Large (1/4 acre+)']] },
            { label: 'Bird Attraction Priority', value: birdInterest, setter: setBirdInterest, options: [['high', 'Yes — maximize bird activity'], ['low', 'No — decorative water feature']] },
            { label: 'DFW Location', value: location, setter: setLocation, options: [['north', 'North DFW (Frisco/Plano/McKinney/Allen)'], ['south', 'South/Central DFW (Dallas/Fort Worth/Mansfield)']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {options.map(([val, text]) => (
                  <button key={val} onClick={() => setter(val)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: value === val ? '#F5E642′ : '#1e3a5f', background: value === val ? '#F5E642' : ’transparent', color: value === val ? '#0A1628′ : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: value === val ? 700 : 400 }}>{text}</button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Water Feature Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 12 }}>✅ Your DFW Water Feature Recommendation</h3>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: 6 }}>{result.rec}</p>
            <p style={{ color: '#94a3b8', marginBottom: 6, fontSize: 14 }}>Feature: {result.feature}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 10 }}>
              <p style={{ color: '#fbbf24', fontWeight: 700, fontSize: 13, margin: '0 0 4px' }}>🦟 Mosquito Prevention</p>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{result.mosquito}</p>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 6 }}>Maintenance: {result.maintenance}</p>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</p>
          </div>
        )}
      </div>
    </div>
  );
}
