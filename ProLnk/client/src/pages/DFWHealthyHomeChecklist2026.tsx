import { useState } from 'react';

const items = [
  { id: 'co', category: 'Safety', icon: '🔴', label: 'CO Detector', desc: 'Required for any home with gas appliances, attached garage, or gas fireplace. Replace every 5–7 years. DFW homes are 70%+ natural gas.', action: 'Install on every level, test monthly, replace if 7+ years old' },
  { id: 'smoke', category: 'Safety', icon: '🟠', label: 'Smoke Detectors', desc: 'Texas law requires one in each bedroom and outside each sleeping area. Combination smoke/CO units recommended.', action: 'Test monthly, replace batteries annually, replace unit every 10 years' },
  { id: 'lead', category: 'Pre-1978 Homes', icon: '🟡', label: 'Lead Paint Test', desc: 'Any DFW home built before 1978 may contain lead paint. Disturbing during renovation without proper precaution is federally regulated (EPA RRP Rule).', action: 'Test before any renovation, use certified lead-safe contractor' },
  { id: 'asbestos', category: 'Pre-1980 Homes', icon: '🟡', label: 'Asbestos Inspection', desc: 'Homes built before 1980 may contain asbestos in insulation, floor tiles, drywall compound, and popcorn ceilings.', action: 'Do not disturb — if intact, encapsulate. If deteriorating, call licensed abatement contractor.' },
  { id: 'radon', category: 'Slab Homes', icon: '☢️', label: 'Radon Test', desc: 'DFW has low-to-moderate radon risk, but slab-on-grade homes can accumulate. EPA recommends testing all homes below 3rd floor.', action: '90-day passive test kit ($15–30) or Airthings monitor. Mitigate if > 4 pCi/L.' },
  { id: 'mold', category: 'All Homes', icon: '🟢', label: 'Mold Inspection', desc: 'DFW summer humidity + AC condensation creates ideal mold conditions in attics, crawl spaces, and around AC air handlers.', action: 'Annual visual check + moisture meter scan. Call pro if visible mold > 10 sq ft.' },
  { id: 'air', category: 'All Homes', icon: '🟢', label: 'Air Quality Monitor', desc: 'Measure PM2.5, VOCs, CO2, and humidity in real time. DFW cedar and ozone season makes indoor air quality a legitimate concern.', action: 'Airthings or Awair monitor — install in primary living area and bedroom.' },
  { id: 'water', category: 'All Homes', icon: '🔵', label: 'Water Quality Test', desc: 'DFW municipal water is treated but varies by district. Older homes may have galvanized pipes adding iron/sediment. Well water requires annual testing.', action: 'Basic test kit ($30) or professional lab panel. Filter if TDS > 300 or lead detected.' },
];

const ageGroups = [
  { label: 'Pre-1978 (45+ years)', ids: ['co', 'smoke', 'lead', 'asbestos', 'radon', 'mold', 'air', 'water'] },
  { label: '1978–1999 (25–45 years)', ids: ['co', 'smoke', 'radon', 'mold', 'air', 'water'] },
  { label: '2000–2015 (10–25 years)', ids: ['co', 'smoke', 'mold', 'air', 'water'] },
  { label: '2016+ (Under 10 years)', ids: ['co', 'smoke', 'mold', 'air'] },
];

export default function DFWHealthyHomeChecklist2026() {
  const [age, setAge] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = age !== null ? items.filter(i => ageGroups[age].ids.includes(i.id)) : items;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>✅ DFW Healthy Home Checklist</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>A comprehensive health audit for DFW homes. Select your home age to see your priority checklist — then tap any item to learn what to do and why.</p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🏠 My Home Was Built...</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ageGroups.map((g, i) => (
              <button key={i} onClick={() => setAge(i === age ? null : i)}
                style={{ background: age === i ? '#F5E642' : '#1C2E4A', color: age === i ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
                {g.label} — {g.ids.length} items to check
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: '#111E35', borderRadius: 10, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(item.id === expanded ? null : item.id)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <span style={{ flex: 1, fontWeight: 700, color: '#E8EDF5' }}>{item.label}</span>
                <span style={{ fontSize: 11, color: '#8899BB', background: '#1C2E4A', padding: '3px 8px', borderRadius: 4 }}>{item.category}</span>
                <span style={{ color: '#F5E642' }}>{expanded === item.id ? '▲' : '▼'}</span>
              </button>
              {expanded === item.id && (
                <div style={{ padding: '0 20px 16px', borderTop: '1px solid #1C2E4A' }}>
                  <p style={{ fontSize: 13, color: '#8899BB', lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                  <div style={{ background: '#0A1628', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#F5E642' }}>→ {item.action}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Need a pro to run these checks?</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>ProLnk connects DFW homeowners with vetted inspectors, HVAC pros, and remediation specialists.</div>
        </div>
      </div>
    </div>
  );
}
