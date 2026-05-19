import { useState } from 'react';

const projectTypes = [
  { name: 'New roof installation', permit: true, note: 'Required in most DFW cities. Dallas requires for >50% replacement.' },
  { name: 'Fence over 6 ft', permit: true, note: 'Height/material rules vary by city. Frisco requires permit for any fence.' },
  { name: 'Deck or patio cover', permit: true, note: 'Structural decks always need permits in DFW municipalities.' },
  { name: 'Room addition', permit: true, note: 'Always required. Electrical, structural, and mechanical inspections included.' },
  { name: 'HVAC replacement', permit: true, note: 'All DFW cities require permit for new system install.' },
  { name: 'Water heater replacement', permit: true, note: 'Required in Dallas, Plano, Frisco, McKinney, and most others.' },
  { name: 'Electrical panel upgrade', permit: true, note: 'Always required — safety critical.' },
  { name: 'Window replacement (same size)', permit: false, note: 'Generally no permit needed if size stays the same.' },
  { name: 'Interior paint', permit: false, note: 'Never requires a permit.' },
  { name: 'Cabinet replacement', permit: false, note: 'Cosmetic only — no permit needed.' },
  { name: 'Landscaping / sod', permit: false, note: 'No permit unless drainage structure is altered.' },
  { name: 'Swimming pool', permit: true, note: 'Always required. Inspection of barrier/fence also required in TX.' },
];

const cities = [
  { city: 'Dallas', wait: '2–4 weeks', cost: '$100–$500+', portal: 'dallascityhall.com' },
  { city: 'Plano', wait: '1–2 weeks', cost: '$75–$400', portal: 'plano.gov' },
  { city: 'Frisco', wait: '1–3 weeks', cost: '$100–$600', portal: 'friscotexas.gov' },
  { city: 'McKinney', wait: '1–2 weeks', cost: '$80–$350', portal: 'mckinneytexas.org' },
  { city: 'Arlington', wait: '2–3 weeks', cost: '$100–$450', portal: 'arlingtontx.gov' },
  { city: 'Garland', wait: '2–4 weeks', cost: '$90–$400', portal: 'garlandtx.gov' },
];

export default function DFWPermitGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = projectTypes.find(p => p.name === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📋</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Permit Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            When do you need a permit in DFW? Consequences, how to pull one, and city-by-city info
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>⚠️ Consequences of Skipping a Permit</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                ['🏦', 'Forced demolition', 'Cities can require you to tear out unpermitted work at your expense'],
                ['💰', 'Fines & stop-work orders', 'Dallas fines start at $500/day; repeat violations escalate fast'],
                ['🏡', 'Home sale problems', 'Unpermitted work shows up on title searches and can kill your sale or require remediation'],
                ['🛡️', 'Voided homeowner insurance', 'Damage caused by unpermitted work may not be covered'],
                ['⚡', 'Safety risk', 'Uninspected electrical and structural work is a genuine hazard'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.3rem' }}>{icon}</div>
                  <div>
                    <div style={{ color: '#fca5a5', fontWeight: 600 }}>{title}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🔍 Does My Project Need a Permit?</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.75rem' }}>Select your project type:</label>
            <select
              value={selected || ''}
              onChange={e => setSelected(e.target.value || null)}
              style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#fff', width: '100%', fontSize: '0.95rem', marginBottom: '1rem' }}
            >
              <option value="">— Select a project —</option>
              {projectTypes.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            {result && (
              <div style={{ borderRadius: '8px', padding: '1rem', background: result.permit ? '#1f2937' : '#052e16', border: `1px solid ${result.permit ? '#F5E642' : '#22c55e'}` }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: result.permit ? '#F5E642' : '#22c55e', marginBottom: '0.4rem' }}>
                  {result.permit ? '📋 PERMIT REQUIRED' : '✅ NO PERMIT NEEDED'}
                </div>
                <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{result.note}</div>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🏙️ DFW City-by-City: Wait Times & Costs</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e2d45' }}>
                  {['City', 'Typical Wait', 'Permit Cost Range', 'Portal'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #2d3f58' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cities.map((c, i) => (
                  <tr key={c.city} style={{ background: i % 2 === 0 ? '#111f36' : '#0A1628' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#fff', fontWeight: 600 }}>{c.city}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1' }}>{c.wait}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#F5E642', fontWeight: 600 }}>{c.cost}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#60a5fa', fontSize: '0.9rem' }}>{c.portal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>📝 How to Pull a Permit in DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['1', 'Confirm your city\’s requirements', 'Visit your city\’s building department website or call them directly'],
              ['2', 'Gather project documents', 'Site plan, scope of work, materials list, sometimes engineered drawings'],
              ['3', 'Submit application online or in person', 'Most DFW cities now have online portals for common permits'],
              ['4', 'Pay permit fee', 'Usually based on project valuation'],
              ['5', 'Schedule inspections', 'Inspections happen at key milestones (rough-in, framing, final)'],
              ['6', 'Get your certificate of completion', 'Keep this — you\’ll need it when you sell'],
            ].map(([step, title, desc]) => (
              <div key={step} style={{ display: 'flex', gap: '1rem', background: '#1e2d45', borderRadius: '8px', padding: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '0.85rem' }}>{step}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d45', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏗️</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Find licensed DFW contractors who handle permits for you</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk pros are vetted, insured, and know DFW permit requirements</p>
        </div>
      </div>
    </div>
  );
}
