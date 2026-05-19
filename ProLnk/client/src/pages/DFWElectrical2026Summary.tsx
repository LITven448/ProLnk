import { useState } from 'react';

const eras = [
  { id: 'pre1960', label: '🏚️ Pre-1960 home' },
  { id: '1960s1980s', label: '🔌 1960s–1980s home' },
  { id: '1980s2000s', label: '⚡ 1980s–2000s home' },
  { id: 'post2000', label: '🏠 Post-2000 home' },
  { id: 'new', label: '✅ New construction' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  'pre1960': { title: 'Pre-1960 Electrical Priorities', steps: ['Inspect for knob-and-tube wiring immediately', 'Upgrade 60A panel to 200A minimum', 'Check for aluminum branch wiring (fire hazard)', 'Install GFCI in all wet locations NOW', 'Budget $12K–$20K for full rewire'] },
  '1960s1980s': { title: '1960s–1980s Electrical Priorities', steps: ['Federal Pacific / Zinsco panels must be replaced', 'Check for aluminum wiring at outlets', 'Add AFCI breakers to bedroom circuits', 'Install whole-home surge protection', 'Evaluate for 200A if adding EV charger or pool'] },
  '1980s2000s': { title: '1980s–2000s Electrical Priorities', steps: ['Upgrade to 200A if still on 150A', 'Add AFCI breakers per 2023 NEC', 'Install EV-ready circuit (50A) in garage', 'Check outdoor GFCI for DFW pool/patio code', 'Whole-home surge protector ($400–$800)'] },
  'post2000': { title: 'Post-2000 Electrical Priorities', steps: ['Add 240V circuit for EV charger', 'Install whole-home surge protection', 'Consider 400A service for full electrification', 'Smart panel upgrade (Span, Lumin) for rate optimization', 'Inspect outdoor circuits for code compliance'] },
  'new': { title: 'New Construction Electrical Plan', steps: ['Verify 200A+ service installed', 'Confirm AFCI/GFCI per 2023 NEC', 'Pre-wire for EV, solar, battery backup', 'Install surge protection at panel', 'Register all warranties and get as-built drawings'] },
};

export default function DFWElectrical2026Summary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ELECTRICAL 2026 · COMPLETE SUMMARY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚡ DFW Electrical Knowledge Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Complete electrical guidance for DFW homeowners — panels, safety, and modern loads.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔋', title: 'Panel Sizing for Modern Loads', body: 'DFW homes now need 200A minimum. EV charger adds 50A. Pool + HVAC + EV often requires 320A or 400A service. Smart panels (Span) enable load management and avoid costly upgrades.' },
            { icon: '⚠️', title: 'Dangerous Panels in DFW Stock', body: 'Federal Pacific Stab-Lok: fire risk, found in 1960s–1980s DFW homes. Zinsco/Sylvania: fail to trip, found in similar era. Both must be replaced. Budget $3,500–$6,500 for panel swap.' },
            { icon: '🛡️', title: 'GFCI / AFCI Requirements', body: 'GFCI required: kitchens, baths, garages, outdoors, unfinished basements. AFCI required: all bedroom circuits (2023 NEC). DFW inspectors actively enforce — non-compliance fails sale inspections.' },
            { icon: '🌞', title: 'Outdoor Electrical for DFW Life', body: 'Pool equipment: 240V dedicated circuit + GFCI protection. Outdoor kitchen: separate circuit with weatherproof outlets. EV: 50A/240V in garage. All outdoor boxes: in-use covers required.' },
            { icon: '⚡', title: 'Surge Protection', body: 'DFW storms cause frequent surges. Whole-home SPD at panel ($400–$800 installed) protects all devices. Point-of-use protectors add second layer. Insurance may require for home warranty coverage.' },
            { icon: '📅', title: 'When to Call an Electrician', body: 'Breakers tripping repeatedly, flickering lights, burning smell, outlets not working, planning EV/pool/solar, home 30+ years old, buying or selling a home. Always use TX-licensed electricians.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Electrical Priorities for Your DFW Home Era</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Select your home's vintage:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {eras.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === e.id ? '#F5E642' : '#1e3a5f'}`, background: selected === e.id ? '#F5E642′ : ’transparent', color: selected === e.id ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{e.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>{plans[selected].title}</div>
              {plans[selected].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 14, background: '#111d35', borderRadius: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🔗 ProLnk connects you with licensed DFW electricians — verified, insured, local.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
