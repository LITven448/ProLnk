import { useState } from 'react';

const communities = [
  { name: 'Hispanic/Latino', icon: '🌮', strongAreas: 'Oak Cliff, Grand Prairie, Irving, Garland', stores: 'Fiesta Mart, H-E-B (opening), La Michoacana', faith: 'Catholic parishes w/ Spanish mass throughout DFW', centers: 'Casa Guanajuato, Mexican Consulate Dallas' },
  { name: 'South Asian (Indian/Pakistani)', icon: '🪔', strongAreas: 'Frisco, Plano, Allen, Irving (Las Colinas)', stores: 'India Bazaar, Patel Brothers, Swagath', faith: 'Hindu temples, mosques, Sikh gurdwaras in Plano/Frisco', centers: 'Indo-American Center, BAPS Swaminarayan' },
  { name: 'Vietnamese/Southeast Asian', icon: '🍜', strongAreas: 'Garland, Grand Prairie, Arlington, Carrollton', stores: 'Hong Kong Supermarket, MT Supermarket, Lee Lee', faith: 'Buddhist temples, Vietnamese Catholic churches', centers: 'Vietnamese Community of DFW, Pan-Asian Council' },
  { name: 'African American', icon: '✊', strongAreas: 'South Dallas, DeSoto, Cedar Hill, Duncanville', stores: 'Fiesta Mart, Walmart Neighborhoods, local markets', faith: 'Historic Black churches throughout South DFW', centers: 'Dallas Black Chamber, Urban League of Greater Dallas' },
  { name: 'Chinese/East Asian', icon: '🥢', strongAreas: 'Plano, Frisco, Richardson (Chinatown), Allen', stores: '99 Ranch Market, H Mart, Welcome Supermarket', faith: 'Chinese Christian churches, Buddhist centers', centers: 'Chinese Community Center, Asia Times Square' },
  { name: 'Middle Eastern', icon: '☪️', strongAreas: 'Richardson, Plano, Irving, Carrollton', stores: 'Halal markets throughout Richardson, Tom Thumb halal sections', faith: 'Mosques in Richardson, Plano, Irving, Grand Prairie', centers: 'Arab Community Center, Islamic Association of North TX' },
];

const priorities = ['Good schools', 'Cultural community density', 'Affordability', 'Short commute to work', 'Safety', 'Diverse school environment'];

const neighborhoodRecs: Record<string, string[]> = {
  'Hispanic/Latino': ['Grand Prairie — affordability + large Latino community', 'Oak Cliff/Dallas — historic roots, culture, food', 'Irving — established community, good access'],
  'South Asian (Indian/Pakistani)': ['Frisco — top schools, large Indian community', 'Plano (75025) — established Indian corridor', 'Allen — newer, slightly more affordable than Frisco'],
  'Vietnamese/Southeast Asian': ['Garland — largest Vietnamese community in TX', 'Grand Prairie — established SE Asian businesses', 'Carrollton — diverse, good access, mid-range prices'],
  'African American': ['DeSoto — top Black middle-class suburb in DFW', 'Cedar Hill — family-friendly, diverse, affordable', 'Duncanville — great schools, strong community'],
  'Chinese/East Asian': ['Plano/Richardson — 99 Ranch, Chinese schools, community', 'Frisco — newer construction, top schools', 'Allen — family-oriented, growing Asian community'],
  'Middle Eastern': ['Richardson — established halal restaurants, mosques', 'Plano — diverse, accessible, good schools', 'Irving — halal groceries, mosque access'],
};

export default function DFWDiverseFamilyHomeGuide() {
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const activeCommunity = communities.find(c => c.name === selectedCommunity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🌍</div>
          <h1 style={{ fontSize: '2.2rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW Multicultural Family Home Guide</h1>
          <p style={{ color: '#8A9BB5', fontSize: '1.05rem' }}>DFW is one of America's most diverse metros — find where your community thrives</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '2rem' }}>
          {communities.map(c => (
            <div key={c.name} onClick={() => setSelectedCommunity(c.name)} style={{ background: selectedCommunity === c.name ? '#1A3A6F' : '#0F2040', border: `1px solid ${selectedCommunity === c.name ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: selectedCommunity === c.name ? '#F5E642′ : '#E8EDF5', fontWeight: 600, fontSize: '0.85rem', marginTop: 4 }}>{c.name}</div>
            </div>
          ))}
        </div>

        {activeCommunity && (
          <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{activeCommunity.icon} {activeCommunity.name} Community in DFW</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><span style={{ color: '#5BA4F5′ }}>📍 Strong Areas: </span><span style={{ color: '#8A9BB5' }}>{activeCommunity.strongAreas}</span></div>
              <div><span style={{ color: '#5BA4F5′ }}>🛒 Cultural Stores: </span><span style={{ color: '#8A9BB5' }}>{activeCommunity.stores}</span></div>
              <div><span style={{ color: '#5BA4F5′ }}>🙏 Faith Communities: </span><span style={{ color: '#8A9BB5' }}>{activeCommunity.faith}</span></div>
              <div><span style={{ color: '#5BA4F5′ }}>🤝 Community Centers: </span><span style={{ color: '#8A9BB5' }}>{activeCommunity.centers}</span></div>
            </div>
            <div style={{ marginTop: '1.2rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🏘️ Best DFW Neighborhoods:</div>
              {(neighborhoodRecs[activeCommunity.name] || []).map(n => (
                <div key={n} style={{ background: '#0A1628', borderRadius: 8, padding: '0.6rem 0.9rem', marginBottom: 6, fontSize: '0.9rem' }}>✅ {n}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🎯 Refine by Priority</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setSelectedPriority(selectedPriority === p ? '' : p)} style={{ background: selectedPriority === p ? '#F5E642′ : '#0A1628', color: selectedPriority === p ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A7F', borderRadius: 20, padding: '0.4rem 1rem', cursor: ’pointer', fontSize: '0.85rem' }}>{p}</button>
            ))}
          </div>
          {selectedPriority && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <strong style={{ color: '#F5E642′ }}>{selectedPriority}</strong>
              <p style={{ color: '#8A9BB5', margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
                {selectedPriority === 'Good schools' && 'Frisco, Allen, Southlake, Keller — all ranked top 10% in TX. Plano ISD has strong bilingual programs.'}
                {selectedPriority === 'Cultural community density' && 'Choose the neighborhood where your specific community is concentrated — density matters for schools, stores, and social connection.'}
                {selectedPriority === 'Affordability' && 'Grand Prairie, Garland, Mesquite, DeSoto — DFW\’s most diverse AND affordable areas. Median home $280–320K.'}
                {selectedPriority === 'Short commute to work' && 'Map your employer first — DFW is large. Irving works for Las Colinas employers; Plano/Allen for Legacy/Telecom Corridor jobs.'}
                {selectedPriority === 'Safety' && 'Frisco, Allen, Flower Mound, Southlake consistently rank among TX\’s safest cities. Check SpotCrime for specific streets.'}
                {selectedPriority === 'Diverse school environment' && 'Richardson ISD and Garland ISD are among the most diverse in TX — 60+ languages spoken in some schools.'}
              </p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>📊 DFW Diversity Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            {['7M+ population, 4th largest metro in the US', '50+ languages spoken in DFW schools', 'Fastest-growing diverse suburbs: Frisco, McKinney', 'Texas has no state income tax — more disposable income', 'Dallas ISD: 93% minority enrollment, bilingual programs', '200+ international grocery stores across DFW'].map(f => (
              <div key={f} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem', fontSize: '0.82rem', color: '#8A9BB5′ }}>🌟 {f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
