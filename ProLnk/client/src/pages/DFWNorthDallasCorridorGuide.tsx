import { useState } from 'react';

const homeEras = [
  { label: '1970s-1979 (Early Preston Hollow Adjacent)', value: '1970s' },
  { label: '1980s-1989 (Galleria Era Build-Out)', value: '1980s' },
  { label: '1990s-2000s (Tollway Maturation)', value: '1990s' },
];
const upgradeGoals = [
  { label: 'Maximize Resale Value', value: 'resale' },
  { label: 'Modernize for Personal Use', value: 'personal' },
  { label: 'Income / Rental Optimization', value: 'rental' },
];

const data: Record<string, Record<string, { priorities: string[]; serviceLevel: string[] }>> = {
  '1970s': {
    resale: { priorities: ['Kitchen full gut — highest ROI in this price tier', 'Primary bath expansion and luxury finish ($40-80K)', 'Pool renovation if exists — buyers expect updated pool', 'Exterior refresh: paint, entry, landscaping curb appeal', 'Smart home basics: Nest, Ring, Lutron'], serviceLevel: ['Expect $150-225/hr skilled trades', 'Design-build firms common at this scale', 'Permit management included in professional quotes'] },
    personal: { priorities: ['Full HVAC replacement with zoning system', 'Open floor plan conversion (Preston area buyers love this)', 'Home office or flex room build-out', 'Outdoor living: covered patio, built-in grill, fire pit', 'Whole-home generator (common in this corridor)'], serviceLevel: ['Budget $200-400K for meaningful transformation', 'Interior designer coordination expected', 'Project manager for jobs over $150K'] },
    rental: { priorities: ['Durable finish package (LVP, quartz, matte fixtures)', 'HVAC reliability over luxury', 'Low-maintenance landscaping', 'Security and smart access systems'], serviceLevel: ['Mid-range contractor tier appropriate', 'Focus on 5-7 year durability horizon', 'Property manager referral from contractor common here'] },
  },
  '1980s': {
    resale: { priorities: ['Dated kitchen: white cabinets + quartz = fastest ROI', 'Bathrooms: full renovation with spa elements', 'Foundation inspection: 40yr homes on North TX clay', 'Exterior: replace aluminum windows with low-E glass', 'Driveway and hardscape refresh'], serviceLevel: ['North Dallas buyers are sophisticated — quality shows', '$1200-3000 average job ticket expected', 'Showroom-level material selection typical'] },
    personal: { priorities: ['Primary suite addition or conversion ($60-120K)', 'Media room or home theater build-out', 'Wine cellar or specialty storage', 'Pool addition if none exists ($60-100K)', 'EV charging (3 car garage common in this era)'], serviceLevel: ['Specialty subs for AV, wine, pool expected', 'Architect involvement for additions', 'HOA review for exterior changes in many neighborhoods'] },
    rental: { priorities: ['Neutral, durable cosmetic update package', 'All major systems under warranty before tenant move-in', 'Landscaping: irrigation dependent, low maintenance', 'High-demand amenities: in-unit laundry, garage, smart locks'], serviceLevel: ['Professional PM expected for North Dallas rental tier', 'Market rents $3500-7000/mo in this corridor'] },
  },
  '1990s': {
    resale: { priorities: ['Roof replacement if 25+ years ($18-28K range at this size)', 'Kitchen and bath update — most important for comp support', 'HVAC: second generation replacement (1990s units long past life)', 'Energy upgrade: attic insulation, windows for efficiency score', 'Exterior paint and front elevation update'], serviceLevel: ['Buyers expect move-in ready at North Dallas prices', 'Inspection contingencies are tight in this market', 'Staging + professional photography standard for resale'] },
    personal: { priorities: ['Open the floor plan (1990s layouts are closed)', 'Master closet expansion — buyers' top request', ’Backyard transformation: pool, outdoor kitchen, pergola', 'Smart home full integration (lighting, AV, security)', 'EV charging infrastructure add'], serviceLevel: ['$150-300K transformation budget common', 'Design phase 4-8 weeks before construction', 'Permit lead times: 3-6 weeks in Plano/Dallas'] },
    rental: { priorities: ['Full systems verification before rental listing', 'Cosmetic neutralization: repaint, new carpet or LVP', 'Appliance update to current standard', 'Landscaping maintenance plan established'], serviceLevel: ['Short-term rental strong near Galleria / DNT corridor', 'Management fee typically 8-12% of gross rent'] },
  },
};

export default function DFWNorthDallasCorridorGuide() {
  const [era, setEra] = useState('');
  const [goal, setGoal] = useState('');
  const result = era && goal ? data[era]?.[goal] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏙️ North Dallas Corridor Homeowner Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Preston Road, Dallas North Tollway, US-75 — the North Dallas corridor is DFW's professional belt. Homes from the 1970s to 2000s, anchored by the Galleria, sit in some of the highest-demand neighborhoods in Texas.</p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🗓️ Home Era</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeEras.map(e => (
              <button key={e.value} onClick={() => setEra(e.value)} style={{ background: era === e.value ? '#F5E642′ : '#1E2D45', color: era === e.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{e.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🎯 Upgrade Goal</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upgradeGoals.map(g => (
              <button key={g.value} onClick={() => setGoal(g.value)} style={{ background: goal === g.value ? '#F5E642′ : '#1E2D45', color: goal === g.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{g.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📋 Renovation Priorities</div>
              {result.priorities.map((p, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #F5E642′ }}>{p}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🤝 Service Level Expectations</div>
              {result.serviceLevel.map((s, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #22D3EE' }}>{s}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#111D30', borderRadius: 12, padding: 18, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>North Dallas pros work in a high-expectation market. Request references from comparable homes in the same price tier — not just any job. Price-per-sqft matters here.
        </div>
      </div>
    </div>
  );
}
