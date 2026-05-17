import { useState } from 'react';

const situations = [
  { id: 'hail', label: 'Hail damage or recent storm', icon: '⛈️', guide: 'Start with: DFW Hail Damage Documentation Guide, How Insurance Adjusters Assess Roofs, and Filing a Hail Claim in Texas. Then read our Contractor vs Insurance Company Negotiation Tips.' },
  { id: 'leak', label: 'Active leak or interior water damage', icon: '💧', guide: 'Go to: Emergency Roof Tarp Guide DFW, How to Document a Roof Leak for Insurance, and Preventing Interior Mold After a Roof Leak. Time matters — act within 24-48 hours.' },
  { id: 'replace', label: 'Planning a full roof replacement', icon: '🏠', guide: 'Read: Roofing Material Comparison DFW (asphalt vs metal vs tile), DFW Roof Replacement Cost Guide 2026, and How to Choose a DFW Roofing Contractor. Also see our Manufacturer Warranty Deep-Dive.' },
  { id: 'ventilation', label: 'Attic heat or ventilation concerns', icon: '🌡️', guide: 'DFW summers are brutal on attic systems. Start with: DFW Attic Ventilation Guide, Ridge Vent vs Soffit Vent Balance, and How Attic Heat Affects Shingle Life. Proper ventilation can extend shingle life by 5-7 years.' },
  { id: 'contractor', label: 'Evaluating roofing contractors', icon: '🔍', guide: 'Read: DFW Roofing Contractor Red Flags, What Roofing Licenses Mean in Texas, Storm Chaser Warning Signs, and Our 12-Question Contractor Interview Guide. Never pay more than 10% upfront.' },
];

const sections = [
  { label: 'Hail & Storm Damage', pages: '45+ pages', icon: '⛈️' },
  { label: 'Materials & Products', pages: '30+ pages', icon: '🧱' },
  { label: 'Insurance & Claims', pages: '25+ pages', icon: '📋' },
  { label: 'Ventilation & Attic', pages: '20+ pages', icon: '🌬️' },
  { label: 'Contractor Selection', pages: '18+ pages', icon: '🔧' },
  { label: 'Seasonal Guides', pages: '15+ pages', icon: '📅' },
];

export default function DFWRoofing5000Milestone2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · Milestone 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roofing Resources: 5,000 Pages Milestone</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          ProLnk's DFW roofing library spans 150+ pages covering everything from hail damage assessment to material selection, contractor vetting, insurance claims, ventilation, and manufacturer warranties. Built specifically for North Texas conditions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 28 }}>
          {sections.map(s => (
            <div key={s.label} style={{ background: '#0f2037', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{s.pages}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 12 }}>🌪️ Why DFW Roofing is Unique</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>DFW receives some of the most severe hail in the US — 2-3 significant events per year on average</li>
            <li>UV exposure and heat cycles degrade asphalt shingles 20-30% faster than northern climates</li>
            <li>Storm chasers flood DFW after every major weather event — contractor vetting is critical</li>
            <li>Texas insurance claim rules differ significantly from other states</li>
            <li>Attic ventilation requirements are higher due to extreme summer attic temps (150°F+)</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📋 What brings you here today?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: selected === s.id ? '#1a3a5c' : '#0f2037',
                border: selected === s.id ? '2px solid #F5E642' : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} Recommended Resources</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.guide}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Match with a DFW Roofing Pro</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects DFW homeowners with vetted roofing contractors — no storm chasers, no pressure. Just the right contractor for your roof and your situation.</p>
        </div>
      </div>
    </div>
  );
}
