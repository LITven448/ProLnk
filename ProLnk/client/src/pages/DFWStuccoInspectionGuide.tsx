import { useState } from 'react';

const CRACK_TYPES = [
  { crack: 'Hairline — vertical', cause: 'Thermal expansion/contraction', urgency: 'Low', action: 'Monitor for 1 season. Seal with elastomeric caulk if widening.' },
  { crack: 'Horizontal — any width', cause: 'Settlement or water pressure behind stucco', urgency: 'High', action: 'Call structural engineer. Do NOT patch without diagnosis.' },
  { crack: 'Stair-step pattern', cause: 'Foundation movement — DFW clay shift', urgency: 'High', action: 'Foundation evaluation before any stucco repair.' },
  { crack: 'Map / spider cracking', cause: 'Inadequate cure, shrinkage, or UV degradation', urgency: 'Medium', action: 'Elastomeric paint may seal if no moisture behind. Probe test recommended.' },
  { crack: 'Diagonal at corners', cause: 'Differential movement at window/door framing', urgency: 'Medium', action: 'Check flashing first. Diagonal cracks are moisture entry points in DFW rain.' },
];

const ASSESSMENTS: Record<string, Record<string, { assessment: string; inspectionType: string; cost: string }>> = {
  soft: {
    pre1980: { assessment: 'High risk. Pre-1980 DFW stucco is often 3-coat Portland cement over wood lath. Soft spots = moisture has been there long enough to rot lath. Likely remediation required.', inspectionType: 'Hire certified stucco inspector with moisture meter. Probe at multiple points. Do not patch over soft areas.', cost: 'Inspection: $400-$700. Remediation estimate will likely be $8,000-$25,000+ depending on extent.' },
    post1990: { assessment: 'Post-1990 likely EIFS (synthetic stucco). Soft EIFS is a serious moisture intrusion signal. EIFS moisture damage in DFW is very common and very expensive.', inspectionType: 'EIFS-specific inspector required. Probe test at all transitions, windows, and penetrations. Infrared scan valuable.', cost: 'EIFS inspection: $500-$900. Remediation: $15,000-$40,000+ for full EIFS replacement.' },
    new: { assessment: 'New construction with soft stucco is a defect. Builder warranty claim should be filed immediately. Do not allow builder to simply repaint over defect.', inspectionType: 'Independent inspector (not builder-affiliated). Document with photos and dates.', cost: 'Independent inspection: $300-$600. Builder warranty should cover remediation.' },
  },
  cracks: {
    pre1980: { assessment: 'Traditional 3-coat stucco develops a crack network over decades — not always a failure. Key question: are cracks sealed or open to DFW rain?', inspectionType: 'DIY probe test on major cracks. If probe goes behind stucco more than 1 inch, hire inspector.', cost: 'DIY elastomeric seal: $200-$400. Pro inspection if probe test fails: $300-$600.' },
    post1990: { assessment: 'If EIFS, any crack is a moisture entry risk. DFW summer rain intensity means even small EIFS cracks can allow significant moisture accumulation.', inspectionType: 'Do not DIY patch EIFS cracks — seal must be system-compatible. Hire EIFS contractor.', cost: 'EIFS crack repair: $400-$1,200 per area. Prevent by maintaining caulk joints.' },
    new: { assessment: 'Cracks in stucco under 5 years old suggest improper installation. Check scratch coat and brown coat application method.', inspectionType: 'Builder callback first. If dismissed, hire independent inspector for defect documentation.', cost: 'Independent inspection: $300-$600. Builder warranty dispute if defect confirmed.' },
  },
  discolor: {
    pre1980: { assessment: 'Brown or dark staining on old stucco is often organic growth (algae, mold) from DFW humidity, or rust bleed from embedded metal lath. Both require investigation.', inspectionType: 'Visual inspection + moisture meter reading behind stain. Probe if meter reads above 16%.', cost: 'Moisture meter test: DIY with $40-$80 meter. If wet behind stucco, inspection: $300-$600.' },
    post1990: { assessment: 'Dark staining on EIFS is a major warning sign — EIFS retains moisture at transitions. Efflorescence (white staining) means water is moving through the system.', inspectionType: 'Hire EIFS inspector. Staining pattern maps water path — do not just clean and repaint.', cost: 'EIFS inspection: $500-$900. Staining without moisture: cleaning $300-$600.' },
    new: { assessment: 'Staining on new stucco is typically construction residue, form release agent, or mineral migration. Usually cosmetic in year 1-2.', inspectionType: 'DIY assessment first — try stucco cleaner. If stain returns, hire inspector.', cost: 'Stucco cleaner + DIY: $50-$150. Pro cleaning: $300-$700.' },
  },
};

export default function DFWStuccoInspectionGuide() {
  const [observation, setObservation] = useState('');
  const [homeAge, setHomeAge] = useState('');
  const [result, setResult] = useState<{ assessment: string; inspectionType: string; cost: string } | null>(null);

  function analyze() {
    const data = ASSESSMENTS[observation]?.[homeAge];
    setResult(data ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW STUCCO GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Stucco Inspection Guide</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            Stucco and EIFS on DFW homes fail differently depending on age, system type, and what you're observing.
            This guide helps you diagnose your stucco issue and decide: DIY inspection, hire an inspector, or call a structural engineer.
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>📊 Crack Type Reference</h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {CRACK_TYPES.map(c => (
              <div key={c.crack} style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem', display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '0.85rem' }}>{c.crack}</div>
                <div style={{ color: '#8899AA', fontSize: '0.8rem' }}>{c.action}</div>
                <span style={{ background: c.urgency === 'High' ? '#4A1520' : c.urgency === 'Medium' ? '#2A2A10' : '#0F2A1F', color: c.urgency === 'High' ? '#FF6B6B' : c.urgency === 'Medium' ? '#F5E642' : '#4CAF50', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>{c.urgency}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🔍 Stucco Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>What You're Observing</label>
              <select value={observation} onChange={e => setObservation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select observation</option>
                <option value='soft'>Soft / hollow-sounding stucco</option>
                <option value='cracks'>Visible cracks (any type)</option>
                <option value='discolor'>Staining or discoloration</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select home age</option>
                <option value='pre1980'>Pre-1980 (traditional stucco era)</option>
                <option value='post1990'>1990-2015 (likely EIFS)</option>
                <option value='new'>2015+ (newer construction)</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Get Assessment
          </button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {[['🏠 Assessment', result.assessment], ['🔍 Inspection Approach', result.inspectionType], ['💰 Cost Estimate', result.cost]].map(([label, val]) => (
                <div key={label as string} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ color: '#C5D3E0', fontSize: '0.875rem', lineHeight: 1.6 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
