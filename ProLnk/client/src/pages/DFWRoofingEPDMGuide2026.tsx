import { useState } from 'react';

export default function DFWRoofingEPDMGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'flat_new', label: '🏗️ New Flat Roof — DFW Climate' },
    { id: 'flat_replace', label: '🔄 Replacing Existing EPDM' },
    { id: 'hail', label: '⛈️ Recent DFW Hail Damage' },
    { id: 'energy', label: '☀️ High Summer Cooling Bills' },
    { id: 'budget', label: '💰 Lowest Upfront Cost Priority' },
  ];

  const results: Record<string, { verdict: string; detail: string; color: string }> = {
    flat_new: { verdict: 'TPO Preferred Over EPDM for New DFW Roofs', detail: 'For new DFW flat roofs, white TPO outperforms black EPDM — 80% solar reflectance vs EPDM 6% means dramatically lower surface temps. EPDM only makes sense if budget is the primary driver.', color: '#f97316′ },
    flat_replace: { verdict: 'Consider Upgrading to TPO', detail: 'If replacing existing EPDM on a DFW flat roof, upgrade to white TPO. Energy savings from reflectivity typically offset cost difference in 3-5 years. Existing substrate can often be mechanically attached without tear-off.', color: '#F5E642′ },
    hail: { verdict: 'EPDM Seams Are Hail Vulnerable', detail: 'DFW hail is the primary cause of EPDM seam failures. Seam tape (vs heat-welded TPO seams) is vulnerable to hail impact. After DFW hail event, inspect all EPDM seams — especially perimeter and penetrations.', color: '#ef4444′ },
    energy: { verdict: 'EPDM Is NOT the Right Choice', detail: 'Black EPDM absorbs 94% of solar radiation — surface temps hit 160-180°F in DFW summer. This adds 10-15% to cooling load. White EPDM coating ($1-2/sqft) available but must be reapplied every 5-7 years.', color: '#ef4444′ },
    budget: { verdict: 'EPDM Wins on First Cost', detail: 'EPDM costs $4-7/sqft installed vs TPO $6-10/sqft in DFW market. For budget-constrained projects, EPDM is acceptable — specify 60-mil thickness and use fully adhered (not seam tape) installation to maximize lifespan.', color: '#22c55e' },
  };

  const handleCheck = () => {
    if (situation && results[situation]) setResult(situation);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>EPDM Rubber Roofing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>EPDM (ethylene propylene diene monomer) is a proven flat roofing material — but black EPDM fights against DFW homeowners in summer. Know when it works and when to choose TPO instead.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>📋 EPDM DFW Performance Facts</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['⬛','Black Absorbs DFW Heat','Standard EPDM is black — absorbs 94% of solar radiation. DFW surface temps hit 160-180°F. This heat conducts into building and forces HVAC to work 10-15% harder all summer.'],
              ['🎨','White EPDM Coating Option','Elastomeric white coating applied over black EPDM improves reflectance to 75-80%. Cost: $1-2/sqft. Must be reapplied every 5-7 years in DFW UV conditions. Permanent fix: replace with TPO.'],
              ['🧵','Seam Vulnerability','EPDM uses seam tape (not heat welding). DFW hail and thermal cycling stress seams over time. Annual seam inspection is mandatory — most EPDM failures start at seams or penetrations.'],
              ['⏱️','15-25 Year Lifespan','Quality EPDM lasts 15-25 years with proper maintenance in DFW. TPO 60-mil runs 15-20 years. EPDM wins on longevity — loses on energy performance and hail resistance.'],
              ['💰','Cost vs TPO','EPDM: $4-7/sqft installed. TPO: $6-10/sqft in DFW. EPDM lower upfront, but energy cost differential often closes the gap in 3-5 years of DFW summer AC bills.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 EPDM vs TPO Decision Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Select your flat roof situation:</p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: situation === s.id ? '#F5E642′ : '#1e3a5f', background: situation === s.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{s.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Get Recommendation</button>
          {result && results[result] && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${results[result].color}`, background: '#0A1628′ }}>
              <div style={{ color: results[result].color, fontWeight: 700, marginBottom: '0.4rem' }}>{results[result].verdict}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{results[result].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW Roofing Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk connects you with DFW flat roofing contractors who can compare EPDM vs TPO for your specific project.</div>
        </div>
      </div>
    </div>
  );
}
