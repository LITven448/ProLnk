import { useState } from 'react';

type ComplianceResult = {
  requirements: string[];
  parties: string[];
  costRange: string;
  urgency: string;
  note: string;
};

const complianceData: Record<string, Record<string, ComplianceResult>> = {
  demo: {
    pre1980: {
      requirements: ['Asbestos survey by Texas-licensed asbestos inspector required before any demolition', 'Lead paint assessment required (EPA RRP rule applies to contractors)', 'TCEQ notification if >260 sq ft of regulated asbestos material found', 'Asbestos abatement by licensed contractor before demolition begins'],
      parties: ['Texas-licensed asbestos inspector/consultant', 'TCEQ-licensed asbestos abatement contractor', 'Lead-safe certified RRP contractor'],
      costRange: '$800–$3,000 asbestos survey; $3,000–$25,000+ abatement if found',
      urgency: '🔴 High — legally required before any renovation disturbing pre-1980 materials',
      note: 'Pre-1980 DFW homes are very likely to contain asbestos in floor tiles, pipe insulation, joint compound, and roofing. Do not skip this step.',
    },
    post1980: {
      requirements: ['No asbestos survey required for post-1980 construction', 'Lead paint generally not an issue post-1978', 'Standard demolition permit from city building department', 'Debris disposal per city requirements'],
      parties: ['Licensed general contractor', 'City building department for permit'],
      costRange: 'Standard permit fees only ($50–$500 depending on scope)',
      urgency: '🟢 Low — standard permit process',
      note: 'Post-1980 DFW homes typically have no regulated environmental materials. Verify age of any additions or original construction.',
    },
  },
  renovation: {
    pre1980: {
      requirements: ['EPA Renovation, Repair, and Painting (RRP) Rule applies to contractors', 'All contractors must be RRP Lead-Safe Certified if work may disturb lead paint', 'Test or presume lead present in painted surfaces built before 1978', 'Work area containment and dust clearance required post-renovation'],
      parties: ['EPA RRP Lead-Safe Certified Renovator (contractor certification)', 'Lead paint inspector or risk assessor (optional but recommended for families with children)'],
      costRange: '$200–$600 lead paint test; $500–$2,000 additional compliance costs per project',
      urgency: '🟡 Medium — required for contractors; homeowners doing own work exempt but still at risk',
      note: 'DFW has many mid-century homes in Oak Cliff, East Dallas, Fort Worth Near Southside with significant lead paint presence.',
    },
    post1980: {
      requirements: ['No lead paint concerns', 'Standard building permits required for scope', 'Check if materials selected require any special disposal (some adhesives)'],
      parties: ['Licensed contractor per trade scope'],
      costRange: 'Standard project costs — no environmental compliance uplift',
      urgency: '🟢 Low',
      note: 'Post-1980 and certainly post-1990 DFW construction has minimal environmental compliance concerns for typical renovations.',
    },
  },
  roofing: {
    pre1980: {
      requirements: ['If removing old roofing, asbestos in felt underlayment and some shingles must be assessed', 'Vermiculite in attic insulation (pre-1990) may also contain asbestos — separate assessment needed', 'TCEQ regulated asbestos waste disposal if found'],
      parties: ['Texas-licensed asbestos inspector', 'TCEQ-licensed disposal contractor if asbestos present'],
      costRange: '$500–$1,500 asbestos survey; abatement $2,000–$8,000 if needed',
      urgency: '🔴 High for full tear-off of pre-1978 roofing — asbestos in felts was common',
      note: 'DFW has many pre-1980 homes with asbestos roofing felt under original shingles. Re-roofing over (not removing) may avoid triggering requirements.',
    },
    post1980: {
      requirements: ['Standard roofing permit from city', 'Debris disposal per city landfill requirements', 'No environmental assessment typically required'],
      parties: ['Licensed roofing contractor (no state license but city registration)'],
      costRange: 'Standard permit and project costs',
      urgency: '🟢 Low',
      note: 'Post-1980 roofing in DFW has no special environmental compliance requirements for typical projects.',
    },
  },
  hvac: {
    pre1980: {
      requirements: ['Old ductwork and insulation may contain asbestos — assess before removal', 'EPA Section 608 certification required for any refrigerant handling (all eras)', 'Proper refrigerant recovery required — no venting to atmosphere', 'Vermiculite or blown-in insulation in attic around ducts may need assessment'],
      parties: ['EPA 608-certified HVAC technician', 'Texas-licensed asbestos inspector if disturbing old insulation'],
      costRange: '$200–$500 for refrigerant recovery; $500–$2,000 if asbestos assessment needed',
      urgency: '🟡 Medium — refrigerant certification always required; asbestos depends on scope',
      note: 'EPA 608 refrigerant certification is required for ALL HVAC work involving refrigerants regardless of home age.',
    },
    post1980: {
      requirements: ['EPA Section 608 certification for refrigerant handling', 'Proper refrigerant recovery — no atmospheric venting', 'TDLR license for HVAC contractor'],
      parties: ['EPA 608-certified, TDLR-licensed HVAC contractor'],
      costRange: 'No environmental compliance uplift beyond standard project cost',
      urgency: '🟢 Low for environmental; normal license verification applies',
      note: 'Post-1980 HVAC replacement is straightforward environmentally. Focus on proper refrigerant handling and TDLR license verification.',
    },
  },
};

export default function DFWEnvironmentalComplianceGuide() {
  const [project, setProject] = useState('');
  const [homeAge, setHomeAge] = useState('');

  const ageKey = homeAge === 'pre1978' || homeAge === 'pre1980' ? 'pre1980' : homeAge === 'post1980' ? 'post1980' : '';
  const result: ComplianceResult | null = project && ageKey && complianceData[project] ? (complianceData[project][ageKey] || null) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Environmental Compliance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Asbestos, lead paint, TCEQ permits — when you need them and what they cost in DFW.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select project...</option>
              <option value='demo'>Demolition / Major Gut</option>
              <option value='renovation'>Interior Renovation (walls, floors)</option>
              <option value='roofing'>Roof Replacement</option>
              <option value='hvac'>HVAC Replacement</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Home Age</label>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select age...</option>
              <option value='pre1978'>Built before 1978</option>
              <option value='pre1980'>Built 1978–1980</option>
              <option value='post1980'>Built after 1980</option>
            </select>
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div style={{ backgroundColor: '#162033', borderRadius: 10, padding: 16, border: '1px solid #2D3E55', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div><span style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>Urgency: </span><span style={{ fontSize: 14, fontWeight: 600 }}>{result.urgency}</span></div>
              <div><span style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>Est. Compliance Cost: </span><span style={{ fontSize: 14, fontWeight: 600, color: '#F5E642' }}>{result.costRange}</span></div>
            </div>
            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 20, border: '1px solid #7f1d1d' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#FCA5A5', marginBottom: 10 }}>📋 Environmental Compliance Requirements</div>
              <ul style={{ paddingLeft: 18, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
                {result.requirements.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>👥 Who Needs to Be Involved</div>
              <ul style={{ paddingLeft: 18, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
                {result.parties.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 10, padding: 16, border: '1px solid #2D3E55', color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
              💡 {result.note}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🏛️ Key DFW Environmental Regulators</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              ['TCEQ', 'Texas Commission on Environmental Quality — asbestos, stormwater, hazardous waste'],
              ['EPA Region 6', 'Dallas-based EPA office — RRP lead rule, NESHAP asbestos demolition/renovation'],
              ['TDLR', 'Texas Dept. of Licensing — asbestos abatement contractor licensing'],
              ['City Building Dept', 'Permits, inspections, demolition notification requirements'],
            ].map(([name, desc]) => (
              <div key={name} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #2D3E55' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 120, fontSize: 13 }}>{name}</span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Need an environmental compliance-savvy DFW contractor?</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Find Qualified Pros on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
