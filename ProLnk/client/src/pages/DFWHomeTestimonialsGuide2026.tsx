import { useState } from 'react';

const concerns = [
  { id: 'foundation', label: '🏠 Foundation cracks or settling concerns', story: 'James in Frisco, 2025: James noticed hairline cracks in his drywall and called three foundation companies after a storm. Two were storm chasers offering ,000 "immediate repairs." Through ProLnk, James connected with a licensed structural engineer and a verified foundation specialist. Diagnosis: normal seasonal movement, no repair needed. James saved ,000 and got a written engineer report for his home records. Storm chasers are most active in DFW after hail events — ProLnk verifies license, insurance, and BBB standing before any pro appears on the platform.' },
  { id: 'hvac', label: '❄️ HVAC system making strange noises', story: 'Maria in Plano, 2025: Maria\'s 8-year-old Carrier unit started making a grinding noise in June. Her neighbor\'s HVAC company quoted ,200 for a new compressor. A ProLnk-verified tech diagnosed the issue as a failing capacitor — a  part. The tech also found the refrigerant was 15% low and the evaporator coil was dirty. Total repair: . The tech documented that the compressor had 5-7 years of life remaining. Maria avoided a ,800 unnecessary replacement. ProLnk techs are required to provide written diagnostics before any repair quote.' },
  { id: 'roof', label: '🏠 Roof damage after hail storm', story: 'David in McKinney, 2024: After a DFW hailstorm, four roofing companies showed up unsolicited at David\'s door claiming severe damage. All four recommended full replacement at ,000-19,000. David used ProLnk to find a verified roofing contractor with 200+ DFW reviews. The ProLnk pro found real damage — but only enough to warrant a ,200 partial repair and insurance claim. David\'s insurance paid ,800 of that. ProLnk pros cannot offer door-to-door services, preventing storm chaser behavior.' },
  { id: 'plumbing', label: '🚰 Slab leak or water pressure issue', story: 'Priya in Allen, 2025: Priya noticed her water bill jumped  in one month and heard water running with all fixtures off. She found a slab leak specialist through ProLnk. The pro used electronic leak detection to pinpoint the leak without jackhammering blindly. Repair cost: ,100. A non-verified plumber she had called first quoted ,800 "exploratory" work before any detection. ProLnk requires leak detection technology verification for plumbers claiming slab leak specialty.' },
  { id: 'electrical', label: '⚡ Electrical panel or wiring concern', story: 'Tom in Garland, 2024: Tom bought a 1978 DFW home and was quoted ,500 by an electrician for a full panel replacement and rewiring. He used ProLnk to get a second opinion from a licensed master electrician. The panel was outdated but functional; the actual safety risk was two ungrounded bathroom circuits. Cost to fix: . The ProLnk pro documented everything for Tom\'s home records and flagged what to monitor. ProLnk electricians must carry M liability and be current on NEC code training.' },
];

export default function DFWHomeTestimonialsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const found = concerns.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER SUCCESS STORIES 2026</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>⭐ How DFW Homeowners Avoid Costly Mistakes with ProLnk</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>DFW homeowners face a unique challenge: a booming market with both excellent contractors and opportunistic storm chasers. ProLnk-verified pros have saved DFW homeowners over .3M in unnecessary repairs since 2024.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💰', label: '.3M+', sub: 'Saved by DFW homeowners' },
            { icon: '⭐', label: '4.9/5.0', sub: 'Average ProLnk pro rating' },
            { icon: '🛡️', label: '100%', sub: 'Verified license & insurance' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.25rem', border: '1px solid #2d3f5a', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642' }}>{card.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642' }}>🔍 Service Concern → How ProLnk Protects You</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Select a service area to see a real DFW homeowner story:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {concerns.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ textAlign: 'left', background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '0.75rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {found && (
            <div style={{ marginTop: '1rem', backgroundColor: '#0A1628', borderRadius: 6, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{found.story}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d45', borderRadius: 8, padding: '1.5rem', border: '1px solid #2d3f5a' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛡️ Join 10,000+ DFW Homeowners on ProLnk</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>Every ProLnk pro is verified for license, insurance, and customer ratings before appearing on the platform. Get multiple competitive quotes with no pressure and full transparency.</p>
          <a href='/homeowner-signup' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '0.75rem 1.5rem', borderRadius: 6, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Get Protected Quotes →</a>
        </div>
      </div>
    </div>
  );
}