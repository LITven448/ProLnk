import { useState } from 'react';

const maintenanceCategories = [
  { category: 'Pool & Spa', icon: '🏊', annualCost: '$6,000–$14,000', items: [
    { service: 'Weekly pool service', freq: '52x/yr', cost: '$150–$250/mo' },
    { service: 'Annual acid wash', freq: '1x/yr', cost: '$400–$800′ },
    { service: 'Filter replacement', freq: 'As needed', cost: '$300–$600′ },
    { service: 'Heater inspection', freq: '2x/yr', cost: '$150–$300′ },
    { service: 'Spa jet service', freq: '1x/yr', cost: '$200–$400′ },
  ]},
  { category: 'HVAC (Multi-Zone)', icon: '❄️', annualCost: '$3,000–$8,000', items: [
    { service: 'Quarterly filter change + tune-up', freq: '4x/yr', cost: '$200–$400/visit' },
    { service: 'Duct cleaning', freq: '2–3 years', cost: '$800–$2,000′ },
    { service: 'Zone controller calibration', freq: '1x/yr', cost: '$300–$600′ },
    { service: 'Refrigerant check', freq: '1x/yr', cost: '$150–$300′ },
    { service: 'Emergency service contract', freq: 'Annual', cost: '$400–$800/yr' },
  ]},
  { category: 'Landscape & Grounds', icon: '🌿', annualCost: '$8,000–$30,000', items: [
    { service: 'Weekly lawn care', freq: '52x/yr', cost: '$250–$800/mo' },
    { service: 'Seasonal plantings', freq: '2x/yr', cost: '$1,500–$5,000′ },
    { service: 'Irrigation system service', freq: '2x/yr', cost: '$300–$600′ },
    { service: 'Tree trimming', freq: '1–2x/yr', cost: '$1,000–$4,000′ },
    { service: 'Landscape lighting', freq: 'Annual inspection', cost: '$300–$600′ },
  ]},
  { category: 'Home Theater', icon: '🎬', annualCost: '$1,500–$5,000', items: [
    { service: 'Projector bulb replacement', freq: 'Every 2,000 hrs', cost: '$400–$1,200′ },
    { service: 'AV system calibration', freq: '1x/yr', cost: '$400–$800′ },
    { service: 'Screen cleaning and inspection', freq: '2x/yr', cost: '$150–$300′ },
    { service: 'Seating mechanism service', freq: '1x/yr', cost: '$200–$500′ },
  ]},
  { category: 'Wine Cellar', icon: '🍷', annualCost: '$800–$3,000', items: [
    { service: 'Cooling unit service', freq: '2x/yr', cost: '$200–$500′ },
    { service: 'Humidity monitoring', freq: 'Monthly', cost: '$0 (smart system)' },
    { service: 'Rack inspection', freq: '1x/yr', cost: '$150–$300′ },
    { service: 'Temperature log review', freq: 'Quarterly', cost: '$0 (included)' },
  ]},
  { category: 'Whole-Home Generator', icon: '⚡', annualCost: '$1,500–$4,000', items: [
    { service: 'Quarterly exercise test + inspection', freq: '4x/yr', cost: '$200–$400/visit' },
    { service: 'Annual oil + filter change', freq: '1x/yr', cost: '$300–$600′ },
    { service: 'Transfer switch test', freq: '2x/yr', cost: '$150–$300′ },
    { service: 'Load bank test', freq: '1x/yr', cost: '$400–$800′ },
  ]},
];

const securityTiers = [
  {
    tier: 'Standard',
    price: '$80–$150/mo',
    color: '#64748B',
    features: ['24/7 monitoring', 'Door/window sensors', 'Motion detection', 'Mobile alerts', 'Basic cameras (4–8)'],
    forWho: 'Base coverage for most homes',
  },
  {
    tier: 'Premium',
    price: '$200–$400/mo',
    color: '#F5E642',
    features: ['Everything in Standard', 'HD cameras (16–32)', 'Smart lock integration', 'Package detection', 'Patrol response', 'Perimeter fencing sensors'],
    forWho: '$1M–$3M homes, gated communities',
  },
  {
    tier: 'Estate',
    price: '$500–$1,500/mo',
    color: '#34D399',
    features: ['Everything in Premium', 'Dedicated security staff', 'License plate recognition', 'AI behavioral detection', 'Direct police priority line', 'Drone perimeter monitoring', 'Weekly security audits'],
    forWho: '$3M+ estate properties, high-profile owners',
  },
];

const smartHomeFeatures = [
  { system: 'Control4 / Crestron', role: 'Central automation controller', cost: '$15K–$80K installed', note: 'Industry standard for $1M+ homes — controls lighting, AV, HVAC, security from single interface' },
  { system: 'Lutron Radiora 3', role: 'Whole-home lighting control', cost: '$8K–$25K', note: 'Finest dimming quality available — eliminates flicker, integrates with all major platforms' },
  { system: 'Sonos / Savant Audio', role: 'Distributed audio', cost: '$5K–$20K', note: 'Multi-zone audio for interior and exterior — pool deck, outdoor kitchen, home office' },
  { system: 'Aprilaire / Ecobee Pro', role: 'Multi-zone HVAC control', cost: '$3K–$8K', note: 'Each zone independently managed — ensures comfort across 5,000+ sqft layouts' },
  { system: 'Ring / Avigilon', role: 'Camera and access control', cost: '$5K–$30K', note: 'Professional-grade vs consumer cameras — critical distinction for true security' },
];

export default function DFWLuxuryHomeGuide() {
  const [poolYN, setPoolYN] = useState(true);
  const [theaterYN, setTheaterYN] = useState(true);
  const [wineYN, setWineYN] = useState(false);
  const [generatorYN, setGeneratorYN] = useState(true);
  const [sqft, setSqft] = useState(5500);
  const [lotAcres, setLotAcres] = useState(0.8);
  const [activeTab, setActiveTab] = useState<'overview' | 'systems' | 'smart' | 'security' | 'budget'>('overview');

  const landscapeCost = Math.round(lotAcres * 18000);
  const hvacCost = Math.round((sqft / 1000) * 1200);
  const poolCost = poolYN ? 10000 : 0;
  const theaterCost = theaterYN ? 3000 : 0;
  const wineCost = wineYN ? 1800 : 0;
  const generatorCost = generatorYN ? 2500 : 0;
  const baseMaintenance = Math.round(sqft * 0.8);
  const totalAnnual = baseMaintenance + landscapeCost + hvacCost + poolCost + theaterCost + wineCost + generatorCost;
  const totalMonthly = Math.round(totalAnnual / 12);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👑</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Luxury Home Maintenance Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>
            For $1M+ DFW homeowners. Premium service standards, smart home expectations, custom feature maintenance, and a personalized annual budget estimator.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['overview', 'systems', 'smart', 'security', 'budget'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === tab ? '#F5E642′ : '#1E3A5F', color: activeTab === tab ? '#0A1628' : '#fff',
              }}
            >
              {tab === 'overview' ? '🏛️ Standards' : tab === 'systems' ? '🔧 Custom Systems' : tab === 'smart' ? '📱 Smart Home' : tab === 'security' ? '🔒 Security Tiers' : '🧮 Budget Estimator'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🏛️ Luxury Home Maintenance Standards</h3>
              <p style={{ color: '#94A3B8', marginBottom: 20 }}>A $1M+ DFW home is not a larger version of a standard home — it's a different category of asset with different service expectations. Here’s what best-in-class looks like:</p>
              {[
                { standard: 'Preventive Maintenance Calendar', detail: 'Annual schedule with 52 weekly, 12 monthly, 4 quarterly, and 2 annual touchpoints. Every system tracked by age, service date, and remaining life.' },
                { standard: 'Trusted Vendor Network (Not Yelp)', detail: 'Top DFW luxury contractors are not on Yelp. They run by referral. A good estate manager or luxury-focused property manager has these relationships.' },
                { standard: 'Service Response Time', detail: 'For $1M+ properties, same-day emergency response for HVAC, plumbing, and security failures is expected — not 3-day wait times.' },
                { standard: 'Documentation and Warranty Tracking', detail: 'All equipment: model numbers, serial numbers, install date, warranty expiry, and service history in one file. Critical for insurance claims and resale.' },
                { standard: 'Seasonal DFW Considerations', detail: 'June–August: AC systems under maximum load. October–November: winterization of pools, irrigation, outdoor plumbing. February: freeze protection protocols.' },
              ].map(item => (
                <div key={item.standard} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>✦ {item.standard}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Luxury Service Providers by Category</h3>
              {[
                { category: 'Estate / Property Management', note: 'Handles vendor coordination, calendar, and emergency response. Budget $1,500–$3,500/mo for full-service estate management.' },
                { category: 'Pool & Spa', note: 'Aqua Blue Pools, Pool Concepts by Pete Ordaz — luxury service includes water chemistry optimization not just basic maintenance.' },
                { category: 'Smart Home AV', note: 'Digital Living (Southlake), Electronic Lifestyles (Dallas) — authorized Control4 and Crestron dealers with 24/7 support plans.' },
                { category: 'Generator & Electrical', note: 'Reliable generator servicing in DFW: Briggs & Stratton authorized dealers, Generac dealers — ensure quarterly contracts vs one-time service.' },
                { category: 'Fine Art & Wine', note: 'Artex Conservation Group (Dallas) for art maintenance. Vinotemp certified dealers for wine cellar systems.' },
              ].map(row => (
                <div key={row.category} style={{ padding: '12px 0', borderBottom: '1px solid #1A2E4A' }}>
                  <div style={{ fontWeight: 700, color: '#60A5FA', fontSize: 14, marginBottom: 4 }}>{row.category}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{row.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'systems' && (
          <div>
            <div style={{ display: 'grid', gap: 20 }}>
              {maintenanceCategories.map(cat => (
                <div key={cat.category} style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{cat.icon} {cat.category}</h3>
                    <div style={{ background: '#0A1628', padding: '6px 16px', borderRadius: 8 }}>
                      <span style={{ color: '#F5E642', fontWeight: 700 }}>{cat.annualCost}</span>
                      <span style={{ color: '#64748B', fontSize: 12 }}> /year</span>
                    </div>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        {['Service', 'Frequency', 'Cost'].map(h => (
                          <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748B', borderBottom: '1px solid #2D4A6B' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map(item => (
                        <tr key={item.service} style={{ borderBottom: '1px solid #1A2E4A' }}>
                          <td style={{ padding: '10px 12px', color: '#CBD5E1′ }}>{item.service}</td>
                          <td style={{ padding: '10px 12px', color: '#94A3B8′ }}>{item.freq}</td>
                          <td style={{ padding: '10px 12px', color: '#F5E642', fontWeight: 600 }}>{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'smart' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>📱 Smart Home Integration Standards</h2>
              <p style={{ color: '#94A3B8', marginBottom: 24 }}>$1M+ DFW buyers increasingly expect full smart home integration as a standard feature — not an upgrade. Here's what the market demands.</p>
              <div style={{ display: 'grid', gap: 16 }}>
                {smartHomeFeatures.map(feat => (
                  <div key={feat.system} style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{feat.system}</div>
                        <div style={{ color: '#60A5FA', fontSize: 13 }}>{feat.role}</div>
                      </div>
                      <div style={{ color: '#F5E642', fontWeight: 700, background: '#1E3A5F', padding: '4px 12px', borderRadius: 8, fontSize: 13 }}>{feat.cost}</div>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{feat.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔄 Annual Smart Home Maintenance</h3>
              {['Software updates for all connected devices (quarterly)', 'Network infrastructure audit — upgrade to Wi-Fi 7 if on Wi-Fi 5 or older', 'Smart device firmware verification — security patches critical', 'AV calibration — projectors drift over time and require ISF calibration', 'Backup power for smart systems — UPS for control processors', 'Annual dealer support plan renewal — $500–$2,000/yr depending on system complexity'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, marginBottom: 12, color: '#CBD5E1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>✦</span> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🔒 DFW Luxury Security Tiers</h2>
            <div style={{ display: 'grid', gap: 20 }}>
              {securityTiers.map(tier => (
                <div key={tier.tier} style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, borderLeft: `4px solid ${tier.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: tier.color }}>{tier.tier} Security</h3>
                    <div style={{ background: '#0A1628', padding: '8px 16px', borderRadius: 8 }}>
                      <span style={{ color: tier.color, fontWeight: 700, fontSize: 16 }}>{tier.price}</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: 8, color: '#CBD5E1', fontSize: 13 }}>
                        <span style={{ color: tier.color, flexShrink: 0 }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                    <span style={{ color: '#64748B', fontSize: 12 }}>Best for: </span>
                    <span style={{ color: '#94A3B8', fontSize: 12 }}>{tier.forWho}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🧮 Luxury Home Maintenance Budget Estimator</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {[
                  { label: 'Home Size (sqft)', value: sqft, setter: setSqft, min: 2500, max: 15000, step: 500, format: (v: number) => `${v.toLocaleString()} sqft` },
                  { label: 'Lot Size (acres)', value: lotAcres, setter: setLotAcres, min: 0.1, max: 5, step: 0.1, format: (v: number) => `${v.toFixed(1)} acres` },
                ].map(field => (
                  <div key={field.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ color: '#94A3B8', fontSize: 13 }}>{field.label}</label>
                      <span style={{ color: '#F5E642', fontWeight: 700 }}>{field.format(field.value)}</span>
                    </div>
                    <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                      onChange={e => field.setter(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#F5E642′ }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>Custom Features Included:</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[
                    { label: '🏊 Pool & Spa', value: poolYN, setter: setPoolYN },
                    { label: '🎬 Home Theater', value: theaterYN, setter: setTheaterYN },
                    { label: '🍷 Wine Cellar', value: wineYN, setter: setWineYN },
                    { label: '⚡ Generator', value: generatorYN, setter: setGeneratorYN },
                  ].map(toggle => (
                    <button
                      key={toggle.label}
                      onClick={() => toggle.setter(!toggle.value)}
                      style={{
                        padding: '10px 18px', borderRadius: 8, border: `2px solid ${toggle.value ? '#F5E642' : '#2D4A6B'}`,
                        background: toggle.value ? '#F5E642′ : ’transparent',
                        color: toggle.value ? '#0A1628′ : '#CBD5E1',
                        cursor: 'pointer', fontWeight: toggle.value ? 700 : 400, fontSize: 14,
                      }}
                    >
                      {toggle.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, textAlign: 'center', marginBottom: 24, border: '2px solid #F5E642′ }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Estimated Annual Maintenance Budget</div>
              <div style={{ fontSize: 56, fontWeight: 900, color: '#F5E642′ }}>${totalAnnual.toLocaleString()}</div>
              <div style={{ fontSize: 20, color: '#CBD5E1', marginTop: 4 }}>${totalMonthly.toLocaleString()}/month</div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 Budget Breakdown</h3>
              {[
                { label: 'Base home maintenance', cost: baseMaintenance },
                { label: 'Landscape & grounds', cost: landscapeCost },
                { label: 'Multi-zone HVAC', cost: hvacCost },
                poolYN ? { label: 'Pool & spa maintenance', cost: poolCost } : null,
                theaterYN ? { label: 'Home theater', cost: theaterCost } : null,
                wineYN ? { label: 'Wine cellar', cost: wineCost } : null,
                generatorYN ? { label: 'Generator program', cost: generatorCost } : null,
              ].filter(Boolean).map(row => row && (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1A2E4A', fontSize: 14 }}>
                  <span style={{ color: '#94A3B8′ }}>{row.label}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>${row.cost.toLocaleString()}/yr</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', fontSize: 16 }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>Total Annual</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>${totalAnnual.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏛️</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Find Elite DFW Home Service Pros</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Access vetted luxury contractors, estate managers, and smart home technicians through ProLnk's premium network.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Access Luxury Pro Network →
          </button>
        </div>
      </div>
    </div>
  );
}
