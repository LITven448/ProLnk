import { useState } from 'react';

const needs = [
  { id: 'emergency', label: 'AC is out right now', resources: ['Emergency HVAC Dispatch Guide', 'DFW Same-Day AC Repair', 'What To Do When AC Fails in 100°F Heat', 'ProLnk Emergency Matching — 2-Hour SLA'] },
  { id: 'cost', label: 'I need to understand HVAC costs', resources: ['DFW HVAC Pricing Guide 2026', 'Repair vs. Replace Calculator', 'City-by-City Cost Benchmarks (Allen to Weatherford)', 'How ProLnk Drives Prices Down Through Competition'] },
  { id: 'seasonal', label: 'I want seasonal maintenance help', resources: ['Spring Tune-Up Checklist (Pre-Summer)', 'Fall Shutdown & Heating Prep', 'Filter Replacement Schedule by DFW Zone', 'Annual HVAC Budget Planner'] },
  { id: 'buying', label: 'I\’m buying a new home in DFW', resources: ['HVAC Pre-Purchase Inspection Checklist', 'Age & Condition Red Flags by DFW City', 'SEER2 Requirements for Texas Climate Zones', 'Negotiating HVAC in DFW Real Estate Contracts'] },
  { id: 'replace', label: 'I need to replace my system', resources: ['Replacement Decision Framework', 'Brand Comparison: Carrier vs. Lennox vs. Trane in DFW', 'Financing Options for DFW Homeowners', 'ProLnk 3-Quote Matching for Replacement Jobs'] },
  { id: 'pro', label: 'I want to verify or find a pro', resources: ['How to Read a TACLB License', 'Red Flags in HVAC Contractor Proposals', 'ProLnk Pro Verification Standards', 'DFW HVAC Contractor Background Check Guide'] },
];

export default function DFWHVACResourceIndex() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = needs.find(n => n.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Resource Index</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>The complete index of ProLnk's DFW HVAC library — organized by topic and need.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Alphabetical Index — Top Topics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {['AC Emergencies', 'Air Filtration', 'Annual Maintenance', 'Brand Comparisons', 'City Guides (A–Z)', 'Climate Zone Maps', 'Contractor Verification', 'Cost Benchmarks', 'Emergency Protocols', 'Filter Selection', 'Financing Options', 'Heat Pump Guides', 'Indoor Air Quality', 'Installation Standards', 'Licensing (TACLB)', 'Mini-Split Systems', 'Permit Requirements', 'Pricing Transparency', 'Refrigerant Types', 'SEER2 Explained', 'Seasonal Schedules', 'System Lifespan', 'Thermostat Setup', 'Ductwork Inspection'].map((item, i) => (
              <div key={i} style={{ background: '#1e3a5f', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#cbd5e1' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Find Resources by Need</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {needs.map(n => (
              <button key={n.id} onClick={() => setSelected(n.id)} style={{ background: selected === n.id ? '#F5E642' : '#1e3a5f', color: selected === n.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '13px 20px', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: 600, transition: 'all 0.2s' }}>
                {n.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Relevant Resources:</div>
              {result.resources.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642' }}>→</span>
                  <span style={{ color: '#e2e8f0', fontSize: 14 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>3,200+ Pages. One Platform.</div>
          <div style={{ fontSize: 14, color: '#0A1628' }}>ProLnk is DFW's most complete HVAC knowledge base — and the only one connected to vetted, verified pros.</div>
        </div>
      </div>
    </div>
  );
}
