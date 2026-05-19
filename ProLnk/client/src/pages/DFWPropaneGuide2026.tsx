import { useState } from 'react';

const HOME_SIZES = [
  { id: 'small', label: 'Under 1,500 sq ft', tank: '120 gallon', notes: 'Suitable for 1-2 appliances (range + water heater)' },
  { id: 'medium', label: '1,500–3,000 sq ft', tank: '250 gallon', notes: 'Supports range, water heater, dryer, and fireplace' },
  { id: 'large', label: '3,000–5,000 sq ft', tank: '500 gallon', notes: 'Full house with generator backup; consider dual tank' },
  { id: 'farm', label: '5,000+ sq ft / Farm', tank: '1,000+ gallon', notes: 'Underground bulk tank; negotiate commercial rates' },
];

const APPLIANCES = ['Range/Cooktop', 'Water Heater', 'Dryer', 'Fireplace/Logs', 'Generator Backup', 'Pool Heater'];
const SAFETY_CHECKS = ['Annual regulator inspection', 'Check all connections for leaks with soapy water', 'Keep 10 ft clearance from ignition sources', 'Know shutoff valve location', 'Install propane detector inside home'];

export default function DFWPropaneGuide2026() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);

  const toggleAppliance = (a: string) => setSelectedAppliances(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const found = HOME_SIZES.find(h => h.id === selectedSize);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔥 DFW Propane Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Rural DFW areas without natural gas service — including much of Parker, Wise, Hood, and Johnson counties — rely on propane. Understanding tank sizing, delivery options, and safety keeps your home running year-round.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📋</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Lease vs Own</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Leased: supplier installs/maintains, locked to their pricing. Owned: shop multiple suppliers, ~$1,200–2,500 upfront but saves long-term.</div>
          </div>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🚛</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Delivery Options</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Auto-delivery: supplier monitors usage, refills automatically. Will-call: you order when needed — risk running out but can price-shop.</div>
          </div>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Propane vs Natural Gas</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Propane: ~$1.80–2.40/gal in DFW. Natural gas: ~$0.80/therm equivalent. Propane burns hotter (2x BTU/unit) but costs more per BTU.</div>
          </div>
          <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📅</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Best Time to Fill</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Lock in summer rates (May–Sep). Propane prices spike in winter. Pre-buy programs available through most DFW suppliers.</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Tank Sizing Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 14 }}>Select your home size:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {HOME_SIZES.map(h => (
              <button key={h.id} onClick={() => setSelectedSize(h.id)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, backgroundColor: selectedSize === h.id ? '#F5E642′ : '#1e2d4a', color: selectedSize === h.id ? '#0A1628' : '#fff' }}>{h.label}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Select propane appliances:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {APPLIANCES.map(a => (
              <button key={a} onClick={() => toggleAppliance(a)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, backgroundColor: selectedAppliances.includes(a) ? '#F5E642′ : '#1e2d4a', color: selectedAppliances.includes(a) ? '#0A1628' : '#fff' }}>{a}</button>
            ))}
          </div>
          {found && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Recommended Tank Size: {found.tank}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{found.notes}</div>
              {selectedAppliances.includes('Generator Backup') && <div style={{ color: '#fbbf24', fontSize: 13, marginTop: 8 }}>⚡ Generator use significantly increases consumption — consider upsizing one tier.</div>}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🛡️ Safety Inspection Checklist</h2>
          {SAFETY_CHECKS.map((s, i) => <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#cbd5e1′ }}>✅ {s}</div>)}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Connect with Propane Service Pros</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk connects rural DFW homeowners with licensed propane technicians, installers, and delivery companies.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Propane Quotes →</button>
        </div>
      </div>
    </div>
  );
}