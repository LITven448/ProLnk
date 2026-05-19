import { useState } from 'react';

const cities = [
  { name: 'Dallas', zone: '3A', coolDays: 62, humidity: 'High', notes: 'Urban heat island effect adds 2-4°F to cooling load. Solar gain critical for east/west exposures.' },
  { name: 'Fort Worth', zone: '3A', coolDays: 59, humidity: 'Moderate-High', notes: 'Slightly less humid than Dallas. West Texas wind can increase infiltration load.' },
  { name: 'Frisco', zone: '3A', coolDays: 57, humidity: 'Moderate', notes: 'New construction dominates — tight envelopes standard. SEER2 18+ highly recommended.' },
  { name: 'Plano', zone: '3A', coolDays: 60, humidity: 'High', notes: 'Mix of older and newer homes. Attic insulation upgrades common need.' },
  { name: 'McKinney', zone: '3A', coolDays: 56, humidity: 'Moderate', notes: 'Rapid growth area. Many new builds already meet or exceed code minimums.' },
  { name: 'Arlington', zone: '3A', coolDays: 61, humidity: 'High', notes: 'Central location, full DFW climate exposure. Manual J sizing critical.' },
  { name: 'Garland', zone: '3A', coolDays: 61, humidity: 'High', notes: 'Dense residential. Older homes may have duct inefficiency issues.' },
  { name: 'Irving', zone: '3A', coolDays: 60, humidity: 'High', notes: 'Commercial corridor adjacency. Mixed residential age profile.' },
  { name: 'Denton', zone: '3A', coolDays: 55, humidity: 'Moderate', notes: 'Slightly cooler than core DFW. Still qualifies for Zone 3A requirements.' },
  { name: 'Mansfield', zone: '3A', coolDays: 58, humidity: 'Moderate-High', notes: 'Growing suburb. Many 2000s-era homes hitting first major HVAC replacement cycle.' },
];

const equipment = [
  {
    type: 'Central AC (Split System)',
    minSEER2: '15.2',
    recommended: '18+ SEER2',
    bestFor: 'Homes with existing gas heat',
    estimatedCost: '$4,500 – $9,000',
    notes: 'Most common DFW choice. Variable-speed compressors handle latent load better.',
    emoji: '❄️',
  },
  {
    type: 'Heat Pump',
    minSEER2: '15.2 / 8.8 HSPF2',
    recommended: '20 SEER2 / 10+ HSPF2',
    bestFor: 'All-electric homes, moderate climates',
    estimatedCost: '$5,000 – $12,000',
    notes: 'Excellent for DFW mild winters. Uri-level events can overwhelm without backup strip heat.',
    emoji: '🔄',
  },
  {
    type: 'Dual Fuel Hybrid',
    minSEER2: '15.2 SEER2',
    recommended: '18+ SEER2 with 96% AFUE furnace',
    bestFor: 'Best of both worlds — DFW ideal',
    estimatedCost: '$7,000 – $15,000',
    notes: 'Heat pump runs in mild weather, gas kicks in below ~35°F. Optimal for DFW climate swings.',
    emoji: '⚡',
  },
  {
    type: 'Gas Furnace Only',
    minSEER2: 'N/A (80% AFUE min)',
    recommended: '96% AFUE',
    bestFor: 'Heating only (paired with AC)',
    estimatedCost: '$2,000 – $5,000',
    notes: 'Short heating season makes high AFUE payback slower. Still worthwhile in tight homes.',
    emoji: '🔥',
  },
];

export default function DFWClimateZoneHVACGuide() {
  const [selectedCity, setSelectedCity] = useState('');
  const [cityData, setCityData] = useState<typeof cities[0] | null>(null);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const found = cities.find(c => c.name === cityName);
    setCityData(found || null);
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a2a1a 0%, #0d1f2d 100%)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌡️</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
          DFW Climate Zone Guide
        </h1>
        <p style={{ fontSize: '20px', color: '#22c55e', fontWeight: 600, marginBottom: '12px' }}>
          Why Texas HVAC Is Different
        </p>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '640px', margin: '0 auto' }}>
          DFW sits in IECC Climate Zone 3A — Hot-Humid. That classification determines equipment minimums, insulation requirements, and sizing rules that affect every HVAC decision you make.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>

        {/* Zone 3A Facts */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            🗺️ What Zone 3A Means for Your Home
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '32px' }}>IECC Climate Zone 3A covers most of North Texas including the entire DFW metroplex.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '☀️', label: 'Cooling Degree Days', value: '6,000+/year', sub: 'Among the highest in the continental US' },
              { emoji: '🌡️', label: 'Days Above 100°F', value: '60+ annually', sub: 'Extended heat season strains equipment' },
              { emoji: '💧', label: 'Latent Load', value: 'Critical factor', sub: 'Humidity control = as important as temp' },
              { emoji: '❄️', label: 'Heating Season', value: 'Short but intense', sub: 'Uri-level freezes happen every 5-10 years' },
            ].map((f, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{f.emoji}</div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>{f.value}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Requirements */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '32px' }}>📋 Zone 3A Code Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Equipment Minimums', emoji: '⚙️', items: ['AC/Heat Pump: 15.2 SEER2 minimum (since Jan 2023)', 'Gas Furnace: 80% AFUE minimum', 'Heat Pump Heating: 8.8 HSPF2 minimum', 'Variable-speed highly recommended for latent load'] },
              { title: 'Insulation Requirements', emoji: '🏠', items: ['Attic: R-38 to R-60 (higher = better in Zone 3A)', 'Walls: R-13 minimum (R-20 recommended)', 'Crawl space/basement: R-10 to R-15', 'Slab edge: R-10 (if applicable)'] },
              { title: 'Duct & Air Sealing', emoji: '🔧', items: ['Duct leakage: Max 4% to outdoors (total < 8%)', 'Air sealing required at all penetrations', 'Attic ducts must be insulated to R-8 minimum', 'ERV/HRV required in very tight (<3 ACH50) homes'] },
              { title: 'Vapor & Moisture', emoji: '💧', items: ['No Class I vapor retarder on exterior walls', 'Class II or III retarder allowed in Zone 3A', 'Crawl space encapsulation recommended', 'Proper drainage plane critical with brick veneer'] },
            ].map((section, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{section.emoji}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>{section.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {section.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '6px', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#22c55e' }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment Guide */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '32px' }}>🔌 Equipment Recommendations for Zone 3A</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {equipment.map((eq, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '32px' }}>{eq.emoji}</div>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{eq.type}</h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>{eq.notes}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', minWidth: '300px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>Code Min</div>
                      <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 600 }}>{eq.minSEER2}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>Recommended</div>
                      <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>{eq.recommended}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>Typical Cost</div>
                      <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>{eq.estimatedCost}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '2px' }}>Best For</div>
                      <div style={{ fontSize: '13px', color: '#a78bfa' }}>{eq.bestFor}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive City Guide */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>📍 City-Specific Zone 3A Guide</h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Select your DFW city to see specific climate data and equipment recommendations.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
            {cities.map(city => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city.name)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: selectedCity === city.name ? '#22c55e' : '#374151',
                  background: selectedCity === city.name ? '#052e16′ : '#111827',
                  color: selectedCity === city.name ? '#22c55e' : '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedCity === city.name ? 700 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {city.name}
              </button>
            ))}
          </div>
          {cityData && (
            <div style={{ background: '#052e16', border: '1px solid #166534', borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#22c55e', marginBottom: '20px' }}>
                📍 {cityData.name} — Zone {cityData.zone}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: '#0a3d1f', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Days Above 100°F</div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>{cityData.coolDays}</div>
                </div>
                <div style={{ background: '#0a3d1f', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '4px' }}>Humidity Profile</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{cityData.humidity}</div>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#86efac', lineHeight: 1.6 }}>{cityData.notes}</p>
              <div style={{ marginTop: '20px', padding: '16px', background: '#0a3d1f', borderRadius: '8px' }}>
                <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: 600, marginBottom: '8px' }}>Recommendation for {cityData.name}:</div>
                <p style={{ fontSize: '14px', color: '#d1fae5', lineHeight: 1.6 }}>
                  For Zone 3A with {cityData.humidity.toLowerCase()} humidity, prioritize a dual-fuel hybrid system (18+ SEER2 heat pump + 96% AFUE gas backup) with a variable-speed air handler. Ensure Manual J load calculation accounts for solar gain on south and west exposures. Minimum R-49 attic insulation with air sealing before equipment replacement.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Manual J Note */}
        <section style={{ background: '#1a1a2e', border: '1px solid #3730a3', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📐</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Proper Sizing Is Non-Negotiable in Zone 3A</h3>
          <p style={{ fontSize: '15px', color: '#a5b4fc', maxWidth: '600px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            Oversized equipment in Zone 3A short-cycles, fails to remove humidity, and drives up utility bills. Manual J calculations are required by code — insist on them before any HVAC replacement.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#22c55e', color: '#000000', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
          >
            Get a Zone 3A Certified HVAC Pro →
          </a>
        </section>

      </div>
    </div>
  );
}
