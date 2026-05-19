import { useState } from 'react';

const SYSTEM_MAP: Record<string, Record<string, { system: string; maintenance: string; annualCost: string }>> = {
  restaurant: {
    small: { system: 'Packaged Rooftop Unit (3–5 ton)', maintenance: 'Monthly filter checks, quarterly coil cleaning, semi-annual refrigerant check', annualCost: '$3,200–$5,800' },
    medium: { system: 'Multiple RTUs + Dedicated Makeup Air Unit', maintenance: 'Monthly inspections, quarterly full service, annual deep clean', annualCost: '$7,500–$14,000' },
    large: { system: 'Central Chiller + AHUs + Exhaust Fans', maintenance: 'Weekly checks, monthly service, annual overhaul', annualCost: '$18,000–$35,000' },
  },
  retail: {
    small: { system: 'Mini-Split System (1.5–2 ton)', maintenance: 'Bi-annual filter change, annual coil clean', annualCost: '$800–$1,500' },
    medium: { system: 'Packaged Rooftop Unit (5–10 ton)', maintenance: 'Quarterly filter, semi-annual coil clean, annual refrigerant check', annualCost: '$2,500–$4,500' },
    large: { system: 'Multiple RTUs + BMS Controls', maintenance: 'Monthly inspections, quarterly full service, annual balancing', annualCost: '$6,000–$11,000' },
  },
  office: {
    small: { system: 'Split System (2–3 ton)', maintenance: 'Semi-annual filter, annual service', annualCost: '$900–$1,800' },
    medium: { system: 'Packaged RTU + VAV Boxes', maintenance: 'Quarterly filter checks, semi-annual full service', annualCost: '$3,000–$6,000' },
    large: { system: 'Chilled Water System + AHUs', maintenance: 'Monthly checks, quarterly service, annual overhaul', annualCost: '$10,000–$22,000' },
  },
  warehouse: {
    small: { system: 'Evaporative Cooler + Exhaust Fan', maintenance: 'Annual pad replacement, monthly fan check', annualCost: '$600–$1,200' },
    medium: { system: 'Rooftop Gas/Electric Package Unit', maintenance: 'Quarterly service, annual deep clean', annualCost: '$2,200–$4,000' },
    large: { system: 'Industrial HVLS Fans + Dedicated RTUs', maintenance: 'Monthly fan lubrication, semi-annual HVAC service', annualCost: '$5,500–$10,000' },
  },
};

const sizeLabel: Record<string, string> = { small: 'Under 2,500 sq ft', medium: '2,500–10,000 sq ft', large: 'Over 10,000 sq ft' };

export default function DFWCommercialHVACGuide() {
  const [bizType, setBizType] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<{ system: string; maintenance: string; annualCost: string } | null>(null);

  function getSize(val: string) {
    const n = parseInt(val, 10);
    if (isNaN(n)) return '';
    if (n < 2500) return 'small';
    if (n <= 10000) return 'medium';
    return 'large';
  }

  function calculate() {
    const size = getSize(sqft);
    if (!bizType || !size) return;
    const rec = SYSTEM_MAP[bizType]?.[size];
    setResult(rec || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🌡️ DFW Commercial HVAC Guide</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 12 }}>Commercial HVAC for <span style={{ color: '#F5E642' }}>DFW Small Businesses</span></h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 36 }}>DFW summers routinely exceed 100°F. Choosing the wrong system costs thousands in electricity demand charges. Here's what every business owner needs to know.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🏢', title: 'Rooftop Units (RTUs)', body: 'Most common in DFW commercial. Self-contained on the roof—saves interior space. Ideal for retail, offices under 20,000 sq ft. Expect $8,000–$25,000 installed per unit.' },
            { icon: '❄️', title: 'Split Systems', body: 'Condenser outside, air handler inside. Best for smaller suites under 5,000 sq ft. Quieter, easier to zone. $3,500–$12,000 installed range.' },
            { icon: '🍳', title: 'Restaurant Ventilation', body: 'Kitchen exhaust hoods require makeup air units matched to CFM. DFW health code requires hoods over all cooking equipment. Improper makeup air causes negative pressure and pilot outages.' },
            { icon: '⚡', title: 'Demand Charge Alert', body: 'DFW utilities (Oncor) bill peak demand in summer. A poorly sized or staged system can spike demand charges $400–$1,200/month. Variable-speed compressors reduce this significantly.' },
            { icon: '📋', title: 'Maintenance Contracts', body: 'DFW extreme temps mean HVAC works harder. Annual contracts run $300–$2,500 depending on system size. Emergency service response is critical May–September.' },
            { icon: '🔧', title: 'Permit Requirements', body: 'Any new HVAC installation or replacement in DFW cities requires a mechanical permit. ProLnk contractors are licensed in all DFW municipalities and handle permitting.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F5E642' }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🔧 System Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Business Type</label>
              <select value={bizType} onChange={e => setBizType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select type...</option>
                <option value="restaurant">Restaurant / Food Service</option>
                <option value="retail">Retail Store</option>
                <option value="office">Office</option>
                <option value="warehouse">Warehouse / Industrial</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Square Footage</label>
              <input type="number" placeholder="e.g. 3500" value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Recommendation →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #2A4A7F' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 17, marginBottom: 16 }}>Recommended for {sizeLabel[getSize(sqft)]} {bizType}</div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>SYSTEM TYPE</span><div style={{ color: '#E8EDF5', marginTop: 4 }}>{result.system}</div></div>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>MAINTENANCE SCHEDULE</span><div style={{ color: '#E8EDF5', marginTop: 4 }}>{result.maintenance}</div></div>
                <div><span style={{ color: '#94A3B8', fontSize: 13 }}>ESTIMATED ANNUAL COST</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{result.annualCost}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: 26, marginBottom: 12 }}>🌡️</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Get a Free Commercial HVAC Quote</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk connects you with licensed commercial HVAC contractors across all DFW cities. No cold calls — matched bids only.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Request DFW HVAC Quotes →</button>
        </div>
      </div>
    </div>
  );
}
