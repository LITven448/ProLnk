import { useState } from 'react';

const homeTypes = [
  { label: 'Historic District Home', age: 'pre-1970', type: 'historic' },
  { label: 'Golf Course Community', age: '1990s-2000s', type: 'golf' },
  { label: 'Airport Corridor Commercial', age: 'varies', type: 'commercial' },
  { label: 'New Development', age: '2010+', type: 'new' },
];

const issueMap: Record<string, { issues: string[]; costRange: string; priority: string }> = {
  'historic-pre-1970': {
    issues: ['Ductwork deterioration', 'Undersized original systems', 'Refrigerant line corrosion', 'No zoning capability'],
    costRange: '$4,200 – $9,800',
    priority: '🔴 High — full system evaluation recommended',
  },
  'golf-1990s-2000s': {
    issues: ['Capacitor failure', 'Refrigerant recharge needed', 'Filter/coil buildup', 'Thermostat calibration drift'],
    costRange: '$380 – $2,400',
    priority: '🟡 Medium — tune-up often sufficient',
  },
  'commercial-varies': {
    issues: ['Rooftop unit compressor failure', 'Chiller efficiency loss', 'Building automation faults', 'Zoning imbalance'],
    costRange: '$1,800 – $22,000',
    priority: '🔴 High — commercial load calculations required',
  },
  'new-2010+': {
    issues: ['Warranty-covered component failure', 'Smart thermostat pairing issues', 'Minor refrigerant leak', 'Seasonal efficiency drop'],
    costRange: '$150 – $900',
    priority: '🟢 Low — likely under manufacturer warranty',
  },
};

export default function DFWHVACGrapevine() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [result, setResult] = useState<null | { issues: string[]; costRange: string; priority: string }>(null);

  function handleCheck() {
    const key = `${selectedType}-${selectedAge}`;
    setResult(issueMap[key] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            ✈️ GRAPEVINE TX — AIRPORT CORRIDOR SPECIALISTS
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Grapevine HVAC Repair<br />& Installation
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 620 }}>
            Serving Grapevine's unique mix of historic district homes, golf course communities, and DFW Airport corridor commercial properties. Local pros who understand every neighborhood.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏛️', label: 'Historic District', detail: 'Pre-1970 homes' },
            { icon: '⛳', label: 'Golf Communities', detail: 'Bear Creek, Grapevine CC' },
            { icon: '✈️', label: 'Airport Corridor', detail: 'Commercial & mixed-use' },
            { icon: '🏗️', label: 'New Developments', detail: 'Post-2010 builds' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            🔧 HVAC Issue Estimator
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 24 }}>Select your home type and age to see the most common HVAC problems and cost ranges.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Home / Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select type...</option>
                <option value="historic">Historic District Home</option>
                <option value="golf">Golf Course Community</option>
                <option value="commercial">Airport Corridor Commercial</option>
                <option value="new">New Development</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Home Age</label>
              <select
                value={selectedAge}
                onChange={(e) => { setSelectedAge(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select age...</option>
                <option value="pre-1970″>Pre-1970</option>
                <option value="1990s-2000s">1990s – 2000s</option>
                <option value="varies">Varies (commercial)</option>
                <option value="2010+">2010+</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={!selectedType || !selectedAge}
            style={{ backgroundColor: selectedType && selectedAge ? '#F5E642′ : '#2a3a50', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '14px 32px', border: ’none', borderRadius: 8, cursor: selectedType && selectedAge ? 'pointer' : 'not-allowed' }}
          >
            Show Common Issues →
          </button>

          {result && (
            <div style={{ marginTop: 28, backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Most Common Issues:</div>
              <ul style={{ margin: 0, paddingLeft: 20, marginBottom: 20 }}>
                {result.issues.map((issue) => (
                  <li key={issue} style={{ color: '#e2e8f0', marginBottom: 8 }}>{issue}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: '12px 20px' }}>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST RANGE</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{result.costRange}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: '12px 20px', flex: 1 }}>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>URGENCY</div>
                  <div style={{ fontWeight: 700 }}>{result.priority}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🌡️', label: 'AC Repair & Tune-Up', price: 'From $149′ },
            { icon: '💨', label: 'New System Install', price: 'From $3,800′ },
            { icon: '🏢', label: 'Commercial HVAC', price: 'Custom quote' },
            { icon: '🔍', label: 'Duct Inspection', price: 'From $225′ },
          ].map((svc) => (
            <div key={svc.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{svc.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{svc.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{svc.price}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Get a Free Grapevine HVAC Quote</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>Matched to a licensed, background-checked HVAC pro in your neighborhood — usually within 2 hours.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Request My Free Quote ✈️
          </button>
        </div>

      </div>
    </div>
  );
}
