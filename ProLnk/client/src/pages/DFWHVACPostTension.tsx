import { useState } from 'react';

const slabTypes = ['Post-Tension', 'Conventional/Monolithic', 'Pier & Beam', 'Not Sure'];
const projectTypes = [
  'New HVAC Install',
  'Adding Drain Line',
  'Running New Refrigerant Lines',
  'Ductwork Modification',
  'Adding Condensate Drain',
];

const implications: Record<string, Record<string, { safe: string[]; dangerous: string[]; notes: string }>> = {
  'Post-Tension': {
    'New HVAC Install': {
      safe: ['Route refrigerant lines through interior walls', 'Use existing penetrations', 'Attic routing for line sets'],
      dangerous: ['Drilling slab for drain routing', 'Core drilling without GPR scan', 'Cutting slab for access'],
      notes: 'GPR scan required before ANY slab penetration. Post-tension cables run 12-18 inches on center — cutting one causes catastrophic structural failure.',
    },
    'Adding Drain Line': {
      safe: ['Condensate pump to exterior wall', 'Overhead routing to exterior', 'Secondary drain pan with float switch'],
      dangerous: ['Tunneling under slab', 'Drilling through slab', 'Gravity drain requiring slab penetration'],
      notes: 'Most DFW post-tension homes require condensate pumps or overhead routing. Budget $300-600 extra vs conventional.',
    },
    'Running New Refrigerant Lines': {
      safe: ['Interior wall chases', 'Attic routing with insulation sleeve', 'Exterior wall penetrations above grade'],
      dangerous: ['Under-slab routing', 'Drilling slab corners without scan'],
      notes: 'Line set routing adds cost but is safe when done through walls/attic. Insulate lines in DFW attic heat.',
    },
    'Ductwork Modification': {
      safe: ['Overhead plenum changes', 'Attic duct replacement', 'Wall register additions'],
      dangerous: ['Under-slab duct system penetrations', 'Slab saw cutting for duct access'],
      notes: 'DFW homes with under-slab ducts (rare post-1985) need special handling. Verify duct location before any work.',
    },
    'Adding Condensate Drain': {
      safe: ['Pump-assisted exterior routing', 'Tie into existing drain stack above slab', 'Dedicated PVC to exterior'],
      dangerous: ['New slab penetration for gravity drain', 'Connecting to under-slab drain without GPR'],
      notes: 'Float switch backup required on all DFW condensate lines — summer heat causes algae blockages monthly.',
    },
  },
  'Conventional/Monolithic': {
    'New HVAC Install': {
      safe: ['Standard penetrations with core drill', 'Under-slab drain routing if needed', 'Typical install practices apply'],
      dangerous: ['Still avoid unknown utility conflicts — call 811 first'],
      notes: 'Conventional slabs allow more flexibility but still require 811 call before any drilling.',
    },
    'Adding Drain Line': {
      safe: ['Core drill with 811 clearance', 'Under-slab tunnel if required', 'Standard gravity drain to exterior'],
      dangerous: ['Drilling without utility locate', 'Assuming clear path without inspection'],
      notes: 'Budget $200-400 for core drilling. Under-slab tunneling runs $800-2,000 in DFW.',
    },
    'Running New Refrigerant Lines': {
      safe: ['Standard wall/attic routing', 'Slab penetration if necessary with proper sealing'],
      dangerous: ['Unsealed slab penetrations — moisture intrusion risk in DFW humidity swings'],
      notes: 'Seal all slab penetrations with hydraulic cement or approved caulk to prevent moisture migration.',
    },
    'Ductwork Modification': {
      safe: ['Standard modifications', 'Under-slab duct access with proper cutting'],
      dangerous: ['Cutting without knowing utility locations'],
      notes: 'Conventional slab duct access is common in pre-1985 DFW homes. Use a slab saw, not demo hammer.',
    },
    'Adding Condensate Drain': {
      safe: ['Gravity drain to exterior', 'Tie-in to floor drain if present', 'Standard P-trap installation'],
      dangerous: ['Improper trap installation — sewer gas entry'],
      notes: 'Always install P-trap on condensate drains tied to sewer. Texas code requires it.',
    },
  },
  'Pier & Beam': {
    'New HVAC Install': {
      safe: ['Crawl space routing for all lines', 'Under-floor duct systems', 'Flexible routing options'],
      dangerous: ['Inadequate crawl space ventilation combined with new condensate routing'],
      notes: 'Pier and beam is rare in DFW but offers most flexibility. Insulate under-floor ducts to R-8 minimum.',
    },
    'Adding Drain Line': {
      safe: ['Gravity routing through crawl space', 'Direct exterior exit', 'Sloped drain with cleanout'],
      dangerous: ['Pooling water in crawl space — mold risk'],
      notes: 'Ensure positive drainage slope (1/4 inch per foot minimum). Install cleanout for DFW algae maintenance.',
    },
    'Running New Refrigerant Lines': {
      safe: ['Under-floor routing through crawl space', 'Protected from moisture with foam insulation'],
      dangerous: ['Uninsulated lines in humid crawl space — condensation and corrosion'],
      notes: 'Wrap all refrigerant lines in crawl space with armaflex or equivalent.',
    },
    'Ductwork Modification': {
      safe: ['Under-floor duct replacement', 'Adding registers through subfloor', 'Sealed duct system'],
      dangerous: ['Leaky ducts in crawl space — moisture and efficiency loss'],
      notes: 'Seal all duct joints with mastic — tape fails in DFW temperature swings.',
    },
    'Adding Condensate Drain': {
      safe: ['Direct exterior exit through crawl space', 'Sloped gravity drain'],
      dangerous: ['Terminating in crawl space — standing water and mold'],
      notes: 'Always route condensate to daylight, never into crawl space.',
    },
  },
  'Not Sure': {
    'New HVAC Install': {
      safe: ['Get slab inspection before scheduling install', 'Ask contractor to identify slab type'],
      dangerous: ['Proceeding without knowing slab type'],
      notes: 'DFW homes built after 1985 are 90%+ post-tension. If unsure, assume post-tension and get GPR scan.',
    },
    'Adding Drain Line': {
      safe: ['Assume post-tension, use pump routing'],
      dangerous: ['Assuming conventional — drilling post-tension slab without scan'],
      notes: 'Cost to verify: GPR scan $150-300. Cost of cut post-tension cable repair: $8,000-25,000.',
    },
    'Running New Refrigerant Lines': {
      safe: ['Wall and attic routing regardless of slab type'],
      dangerous: ['Any slab penetration without identification'],
      notes: 'Wall/attic routing is safe for all slab types. Default to this if slab type unknown.',
    },
    'Ductwork Modification': {
      safe: ['Overhead/attic duct work only until slab identified'],
      dangerous: ['Any slab cutting without identification'],
      notes: 'Have HVAC contractor pull original permits to identify slab type before any slab work.',
    },
    'Adding Condensate Drain': {
      safe: ['Condensate pump to exterior — works for all slab types'],
      dangerous: ['Gravity drain requiring slab penetration without slab ID'],
      notes: 'Condensate pump ($200-400 installed) eliminates slab concern entirely.',
    },
  },
};

export default function DFWHVACPostTension() {
  const [slab, setSlab] = useState('');
  const [project, setProject] = useState('');
  const result = slab && project ? implications[slab]?.[project] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🏗️ DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Post-Tension Slab & HVAC in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Over 90% of DFW homes built after 1985 have post-tension slabs. Cutting or drilling a post-tension cable causes catastrophic structural damage costing $8,000-$25,000 to repair. Every HVAC project must account for your slab type before any slab penetration.
        </p>
        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Warning: The Non-Negotiable Rule</div>
          <div style={{ color: '#CBD5E1′ }}>NEVER drill or cut a post-tension slab without a GPR (Ground Penetrating Radar) scan. A $150-300 scan prevents a five-figure disaster.</div>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your Slab Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {slabTypes.map(s => (
                <button key={s} onClick={() => setSlab(s)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: slab === s ? '#F5E642′ : '#1E3A5F', background: slab === s ? '#F5E642' : '#0D2137', color: slab === s ? '#0A1628' : '#E8F4FD', fontWeight: slab === s ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Project Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {projectTypes.map(p => (
                <button key={p} onClick={() => setProject(p)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: project === p ? '#F5E642′ : '#1E3A5F', background: project === p ? '#F5E642' : '#0D2137', color: project === p ? '#0A1628' : '#E8F4FD', fontWeight: project === p ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{p}</button>
              ))}
            </div>
          </div>
        </div>
        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0D2A1A', border: '1px solid #22543D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 10 }}>Safe Approaches</div>
              {result.safe.map((s, i) => <div key={i} style={{ color: '#BBF7D0', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #4ADE80′ }}>{s}</div>)}
            </div>
            <div style={{ background: '#2D1010', border: '1px solid #7F1D1D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F87171', marginBottom: 10 }}>Dangerous — Never Do</div>
              {result.dangerous.map((d, i) => <div key={i} style={{ color: '#FECACA', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F87171′ }}>{d}</div>)}
            </div>
            <div style={{ background: '#1E3A5F', border: '1px solid #2563EB', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 8 }}>DFW Notes</div>
              <div style={{ color: '#BFDBFE', lineHeight: 1.6 }}>{result.notes}</div>
            </div>
          </div>
        )}
        {!result && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your slab type and project type above to see safe and dangerous approaches</div>
        )}
      </div>
    </div>
  );
}
