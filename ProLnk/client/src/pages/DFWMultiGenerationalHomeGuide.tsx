import { useState } from 'react';

const configs = [
  { id: 'parents-kids', label: 'Parents + Adult Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'grandparents', label: 'Grandparents + Family', icon: '👴👵' },
  { id: 'three-gen', label: '3 Generations Together', icon: '🏠' },
  { id: 'extended', label: 'Extended Family Pod', icon: '🏘️' },
];

const setups: Record<string, { title: string; options: { type: string; desc: string; dfwCost: string; pros: string; cons: string }[]; neighborhoods: string; note: string }> = {
  'parents-kids': {
    title: 'Parents + Adult Children',
    options: [
      { type: 'In-Law Suite (internal)', desc: 'Bedroom/bath/kitchenette attached inside main home', dfwCost: '+$30–60K addition', pros: 'Close proximity, shared utilities, lower cost', cons: 'Less privacy, harder to resell for non-multigenerational buyers' },
      { type: 'Garage Apartment Conversion', desc: 'Convert 3-car garage into full living space', dfwCost: '$40–80K conversion', pros: 'Separate entrance, moderate privacy', cons: 'Loses parking; may need permits in some DFW cities' },
      { type: 'Detached Guest House', desc: 'Separate structure on same lot — most privacy', dfwCost: '$120–220K new build', pros: 'Maximum privacy, can rent later', cons: 'Higher cost, setback rules vary by city' },
    ],
    neighborhoods: 'Mansfield, Burleson, Midlothian — large lots, affordable large homes',
    note: 'DFW has NO basements (clay soil expands/contracts) — all configurations are above-ground',
  },
  'grandparents': {
    title: 'Grandparents Living With Family',
    options: [
      { type: 'First-Floor Master Suite', desc: 'Grandparents on ground floor — no stairs, walk-in shower, grab bars', dfwCost: 'Standard in many DFW homes', pros: 'No mobility barriers, close to family', cons: 'Must specify during home search — not universal' },
      { type: 'Casita / Mother-In-Law Quarters', desc: 'Attached casita with exterior access and full bath', dfwCost: 'Common in DFW 2010+ new construction', pros: 'Semi-independent, share yard', cons: 'Limited in older neighborhoods' },
      { type: 'Accessory Dwelling Unit (ADU)', desc: 'Detached fully independent unit', dfwCost: '$140–250K', pros: 'Full independence, medical privacy', cons: 'ADU rules vary — Fort Worth more permissive than Dallas' },
    ],
    neighborhoods: 'Keller, North Richland Hills, Hurst-Euless-Bedford — single-story ranch homes common',
    note: 'Search "one story" + "in-law suite" or "casita" on DFW MLS — many new builds in Frisco/McKinney have them',
  },
  'three-gen': {
    title: 'Three Full Generations',
    options: [
      { type: 'Large Single Home (4,000+ sqft)', desc: 'Everyone under one roof with defined private areas per generation', dfwCost: '$450–700K in most suburbs', pros: 'Shared costs, childcare built in', cons: 'Schedule coordination, boundary setting required' },
      { type: 'Duplex or Paired Home', desc: 'Two units, one shared wall — each generation has own space', dfwCost: '$380–550K duplex', pros: 'Full unit privacy, separate entrances', cons: 'Rare in DFW suburbs; more common in Dallas proper' },
      { type: 'Two Adjacent Homes', desc: 'Buy next-door homes — ultimate privacy with close proximity', dfwCost: '2x purchase price', pros: 'Fully independent, no compromise', cons: 'Requires coordinated timing, higher cost' },
    ],
    neighborhoods: 'Carrollton, Farmers Branch, Garland — larger lots, older homes, double lots available',
    note: 'Look for cul-de-sac locations — multiple families can buy adjacent homes and create a private court',
  },
  'extended': {
    title: 'Extended Family Pod',
    options: [
      { type: 'Hobby Farm / Acreage', desc: 'Multiple family units on 1–5 acres outside the metro', dfwCost: '$350–600K for land + structures', pros: 'Maximum space, garden/animals possible', cons: 'Distance from amenities, longer commutes' },
      { type: 'New Construction Multigenerational Plan', desc: 'Builders like Perry Homes, Meritage offer dual-master floorplans', dfwCost: '$480–720K new construction', pros: 'Purpose-built, warranty, modern systems', cons: 'Cookie-cutter suburban feel, limited customization' },
      { type: 'Custom Build on Raw Land', desc: 'Buy land in Denton/Parker/Wise County and build custom', dfwCost: '$500K–1M+ depending on scope', pros: 'Perfectly designed for your family configuration', cons: 'Timeline 12–18 months, requires architect + builder' },
    ],
    neighborhoods: 'Weatherford, Azle, Decatur, Cleburne — rural acreage within 45min of DFW',
    note: 'Parker and Wise counties have lowest property taxes in DFW region — significant savings for large properties',
  },
};

export default function DFWMultiGenerationalHomeGuide() {
  const [selected, setSelected] = useState('');
  const result = setups[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🏡</div>
          <h1 style={{ fontSize: '2.2rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW Multigenerational Home Guide</h1>
          <p style={{ color: '#8A9BB5', fontSize: '1.05rem' }}>DFW's large homes accommodate generations — no basements, but plenty of creative options</p>
        </div>

        <div style={{ background: '#1A2F0F', border: '1px solid #3A5F1E', borderRadius: 10, padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🚨 DFW Fact: </span>
          <span style={{ color: '#B5D68A' }}>North Texas clay soil expands and contracts — no basements exist in DFW. All multigenerational setups are above-ground.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {configs.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{ background: selected === c.id ? '#1A3A6F' : '#0F2040', border: `2px solid ${selected === c.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '1.2rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '2rem' }}>{c.icon}</div>
              <div style={{ color: selected === c.id ? '#F5E642′ : '#E8EDF5', fontWeight: 600, marginTop: 6 }}>{c.label}</div>
            </button>
          ))}
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#F5E642', marginTop: 0 }}>Setup Options for: {result.title}</h2>
              {result.options.map(o => (
                <div key={o.type} style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🏗️ {o.type}</div>
                  <div style={{ color: '#8A9BB5', fontSize: '0.9rem', marginBottom: 6 }}>{o.desc}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.82rem' }}>
                    <div><span style={{ color: '#5BA4F5′ }}>💰 Cost: </span>{o.dfwCost}</div>
                    <div><span style={{ color: '#4ADE80′ }}>✅ Pros: </span>{o.pros}</div>
                    <div><span style={{ color: '#F87171′ }}>⚠️ Cons: </span>{o.cons}</div>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <div><span style={{ color: '#5BA4F5′ }}>📍 Best DFW Areas: </span><span style={{ color: '#8A9BB5' }}>{result.neighborhoods}</span></div>
                <div style={{ marginTop: 8, color: '#F5E642', fontSize: '0.9rem' }}>💡 {result.note}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>📋 Multigenerational Buying Tips for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            {['Fannie Mae ADU loan allows rental income from in-law unit to count toward qualification', 'Search for "flex room" or "bonus room" — often convertible to living space', 'Frisco/McKinney new builds frequently include dual primary suites', 'Older Carrollton/Garland homes have large lots for adding detached units', 'Verify city ADU rules before buying — Fort Worth more permissive than most', 'Perry Homes, David Weekley offer multigenerational floor plans in DFW'].map(t => (
              <div key={t} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem', fontSize: '0.82rem', color: '#8A9BB5′ }}>📌 {t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
