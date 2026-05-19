import { useState } from 'react';

const HOME_TYPES = ['Slab foundation (no basement)', 'Pier-and-beam (no basement)', 'With basement', 'Mobile/manufactured home'];
const BUDGET_RANGES = ['Under $3,000', '$3,000–$5,000', '$5,000–$8,000', '$8,000+'];

function getRecommendation(homeType: string, familySize: number, budget: string) {
  const hasSlab = homeType.includes('Slab');
  const hasMobile = homeType.includes('Mobile');
  const hasBasement = homeType.includes('basement');
  const tightBudget = budget === 'Under $3,000';

  let type = '', cost = '', notes = '', grantEligible = false;

  if (hasBasement) {
    type = 'Basement Safe Room (Reinforced)';
    cost = '$2,500–$5,000';
    notes = 'Reinforce an existing basement room with steel door, concrete walls, and anchor points. Most cost-effective solution for DFW homes with basements.';
    grantEligible = true;
  } else if (hasMobile) {
    type = 'Nearby Community Shelter or Underground Unit';
    cost = '$4,000–$7,000 for underground';
    notes = 'Mobile homes cannot be reinforced. An underground in-yard safe room is required. Many DFW mobile home communities have community shelters — verify with park management.';
    grantEligible = true;
  } else if (hasSlab && tightBudget) {
    type = 'Above-Ground Interior Safe Room (Garage or Closet)';
    cost = '$3,000–$4,500';
    notes = 'FEMA-rated above-ground safe rooms bolt to slab and provide ICC 500 protection. Garage installation is most common in DFW slab homes.';
    grantEligible = true;
  } else if (hasSlab) {
    type = 'Underground In-Yard Safe Room';
    cost = '$5,500–$8,500';
    notes = 'Pre-cast concrete underground units installed in yard. Provides superior protection but requires drainage consideration — DFW\’s clay soil and flash flood risk requires proper sump installation.';
    grantEligible = true;
  } else {
    type = 'Above-Ground Safe Room (Interior Reinforced Room)';
    cost = '$3,500–$6,000';
    notes = 'Pier-and-beam homes cannot anchor underground units easily. Above-ground FEMA-rated safe rooms bolted to an interior floor system provide ICC 500 protection.';
    grantEligible = true;
  }

  const sqft = familySize <= 2 ? 8 : familySize <= 4 ? 12 : familySize <= 6 ? 16 : 24;
  return { type, cost, notes, grantEligible, sqft, grantAmount: grantEligible ? '$3,000–$4,000 (FEMA BRIC program, TX Div of Emergency Management)' : 'Not eligible' };
}

export default function DFWStormShelterGuide() {
  const [homeType, setHomeType] = useState('');
  const [familySize, setFamilySize] = useState(0);
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  function calculate() {
    if (!homeType || !familySize || !budget) return;
    setResult(getRecommendation(homeType, familySize, budget));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SAFETY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Storm Shelter & Safe Room Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            DFW sits in the heart of Tornado Alley. The area averages 30+ confirmed tornadoes annually, with several striking suburban neighborhoods in recent years.
            Most DFW homes have no basement — making a storm shelter the only code-level protection from EF3+ tornadoes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🌪️', title: 'DFW Tornado Alley Risk', body: 'The DFW metroplex has experienced direct hits from EF3+ tornadoes in Garland (2015), Dallas (2019), and Rowlett. Peak season is March–June, with a secondary peak in October. Warning time averages 13 minutes — a shelter must be accessible within seconds.' },
            { icon: '✅', title: 'FEMA-Rated vs Non-Rated', body: 'FEMA P-361 and ICC 500 are the governing standards. A certified safe room withstands 250 mph winds and debris impact from a 15-lb 2x4 fired at 100 mph. Non-rated "storm closets" offer NO certified protection. Always verify certification before purchase.' },
            { icon: '⬇️', title: 'Underground vs Above-Ground', body: 'Underground units offer maximum protection and natural temperature control — but DFW\’s clay soil and flash flooding risk requires French drain or sump pump addition ($800–$1,500). Above-ground garage units are faster to access and cost less, with equivalent FEMA certification.' },
            { icon: '🚗', title: 'Garage vs Interior Room', body: 'Garage installations are the most common in DFW — easy slab anchoring, quick access from carport entry. Interior closet reinforcement costs less but may require structural modifications. Avoid bathrooms on exterior walls — windows are a debris hazard.' },
            { icon: '💰', title: 'Cost: $3,000–$8,000 Installed', body: 'Above-ground pre-built unit (garage): $2,800–$4,500 installed. Underground in-yard unit: $5,000–$8,500 installed. Interior safe room (reinforced room): $3,500–$6,000. All prices include installation, anchoring, and basic ventilation.' },
            { icon: '🏛️', title: 'FEMA Grants Available in TX', body: 'FEMA\’s BRIC (Building Resilient Infrastructure and Communities) and HMGP programs provide grants to Texas homeowners for storm shelters. The Texas Division of Emergency Management administers local awards — typical individual grants cover $3,000–$4,000 of installed cost. Apply through your county.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>🧮 Shelter Recommender</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>HOME TYPE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {HOME_TYPES.map(t => (
                <button key={t} onClick={() => { setHomeType(t); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: homeType === t ? '#F5E642' : '#1e3a5f', backgroundColor: homeType === t ? '#F5E642' : 'transparent', color: homeType === t ? '#0A1628' : '#94a3b8', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>FAMILY SIZE</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5, 6, 8].map(n => (
                <button key={n} onClick={() => { setFamilySize(n); setResult(null); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1.5px solid', borderColor: familySize === n ? '#F5E642' : '#1e3a5f', backgroundColor: familySize === n ? '#F5E642' : 'transparent', color: familySize === n ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>{n}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>BUDGET</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {BUDGET_RANGES.map(b => (
                <button key={b} onClick={() => { setBudget(b); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: budget === b ? '#F5E642' : '#1e3a5f', backgroundColor: budget === b ? '#F5E642' : 'transparent', color: budget === b ? '#0A1628' : '#94a3b8', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>{b}</button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Get My Shelter Recommendation →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ {result.type}</div>
              {[['💰 Installed Cost', result.cost], ['📐 Minimum Size', `${result.sqft} sq ft`], ['🏛️ Grant Eligibility', result.grantAmount]].map(([label, val]) => (
                <div key={label as string} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#94a3b8', minWidth: '160px' }}>{label}</span>
                  <span style={{ color: '#e2e8f0' }}>{val}</span>
                </div>
              ))}
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.75rem', lineHeight: 1.5 }}>📋 Notes: {result.notes}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW Storm Shelter Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects DFW homeowners with licensed storm shelter installers. FEMA P-361 certified units, permit pulled, slab-anchored, and inspected. Free on-site assessment.</p>
        </div>

      </div>
    </div>
  );
}
