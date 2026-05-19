import { useState } from 'react';

const CITIES = [
  { id: 'frisco', name: 'Frisco', timeline: '3-5 business days', speed: 'fast', portal: 'Online portal (MyGov)', tips: ['Apply online for fastest processing', 'All documents must be PDF', 'Pre-application meeting speeds approval'], inspections: 'Same-week scheduling available' },
  { id: 'plano', name: 'Plano', timeline: '1-2 weeks', speed: 'medium', portal: 'Online + in-person', tips: ['Structural drawings required for additions', 'Submit early in week to avoid weekend delays', 'Inspectors booked fast — schedule immediately after approval'], inspections: '2-3 day scheduling window' },
  { id: 'dallas', name: 'Dallas', timeline: '2-4 weeks', speed: 'slow', portal: 'Dallas ePlan', tips: ['Longest wait in DFW — plan ahead', 'Assign a permit expediter for complex projects', 'Status check: dallas.gov/permits'], inspections: '3-5 day scheduling window' },
  { id: 'fortworth', name: 'Fort Worth', timeline: '1-2 weeks', speed: 'medium', portal: 'Online (Accela)', tips: ['Commercial and residential handled separately', 'Engineering letter required for structural work', 'Inspections often available next-day'], inspections: '1-2 day scheduling window' },
  { id: 'allen', name: 'Allen', timeline: '5-7 business days', speed: 'fast', portal: 'Online (CSS)', tips: ['Small city, fast turnaround', 'Call ahead to confirm requirements', 'Same-day walk-through for small projects possible'], inspections: 'Next-day available often' },
  { id: 'mckinney', name: 'McKinney', timeline: '7-10 business days', speed: 'medium', portal: 'Online + walk-in', tips: ['Growing city, staff capacity increasing', 'Master-planned community? HOA approval required first', 'Energy code compliance added scrutiny in 2024'], inspections: '2-3 day scheduling window' },
];

const PROJECTS = [
  'Fence/Deck', 'Window Replacement', 'Roof Replacement', 'HVAC Replacement',
  'Addition/Room Addition', 'Garage Conversion', 'Pool Installation', 'Electrical Panel Upgrade',
];

const SPEEDS: Record<string, { label: string; color: string }> = {
  fast: { label: 'Fast', color: '#2A7A4B' },
  medium: { label: 'Moderate', color: '#E67E22′ },
  slow: { label: 'Slow', color: '#C0392B' },
};

export default function DFWPermitTimelineByCity() {
  const [cityId, setCityId] = useState('frisco');
  const [project, setProject] = useState('Fence/Deck');
  const city = CITIES.find(c => c.id === cityId) || CITIES[0];
  const speed = SPEEDS[city.speed];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PERMIT TOOL</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Permit Timeline by City</h1>
        <p style={{ color: '#8899B0', fontSize: 15, margin: '0 0 32px' }}>How long permits actually take in major DFW cities — plus tips to speed up approval.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642', fontSize: 14 }}>Select City</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CITIES.map(c => (
                <button key={c.id} onClick={() => setCityId(c.id)}
                  style={{ background: c.id === cityId ? '#F5E642′ : '#1C2E4A', color: c.id === cityId ? '#0A1628' : '#E8EDF5',
                    border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642', fontSize: 14 }}>Project Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PROJECTS.map(p => (
                <button key={p} onClick={() => setProject(p)}
                  style={{ background: p === project ? '#F5E642′ : '#1C2E4A', color: p === project ? '#0A1628' : '#E8EDF5',
                    border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12, textAlign: 'left' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#1C2E4A', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{city.name} — {project}</div>
            <div style={{ background: speed.color, color: '#fff', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{speed.label}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            {[['Expected Timeline', city.timeline], ['Online Portal', city.portal], ['Inspection Scheduling', city.inspections]].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#8899B0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642′ }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 13 }}>Tips to Speed Up Approval</div>
            {city.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#E8EDF5′ }}>
                <span style={{ color: '#F5E642′ }}>+</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
