import { useState } from 'react';

const ductTypes = [
  { id: 'flex', label: 'Flex Duct Connection', icon: '🔄', description: 'Flexible duct to collar or boot', dfwNote: 'DFW heat causes flex liner to shrink away from collar within 3-5 years' },
  { id: 'rigid', label: 'Rigid to Flex Boot', icon: '📦', description: 'Sheet metal plenum connecting to flex', dfwNote: 'Thermal cycling in DFW attics (140°F summer) loosens metal screws over time' },
  { id: 'plenum', label: 'Plenum Connection', icon: '🏗️', description: 'Main supply or return plenum joints', dfwNote: 'DFW humidity + heat cycles cause mastic to crack at plenum seams' },
];

const repairMethods: Record<string, { method: string; materials: string[]; cost: string; urgency: string }> = {
  'flex-minor': { method: 'Re-secure duct with drawband + mastic sealant over mesh tape', materials: ['Mastic sealant (water-based)', 'Fiberglass mesh tape', 'Drawband/clamp'], cost: '$80–$150 per connection', urgency: 'Within 30 days — energy loss is immediate' },
  'flex-major': { method: 'Replace flex section + apply mastic + drawband at both ends', materials: ['New flex duct section', 'Mastic sealant', 'Fiberglass mesh tape', '2 drawbands'], cost: '$150–$300 per run', urgency: 'This week — conditioned air escaping into attic' },
  'rigid-minor': { method: 'Apply mastic sealant with mesh tape over joint gap', materials: ['Sheet metal screws', 'Mastic sealant', 'Fiberglass mesh tape'], cost: '$60–$120 per joint', urgency: 'Within 60 days' },
  'rigid-major': { method: 'Re-seal all joints, re-screw, full mastic coat + mesh tape', materials: ['Sheet metal screws', 'Mastic sealant', 'Fiberglass mesh tape', 'Foil tape (secondary only)'], cost: '$200–$500 per section', urgency: 'This week — major efficiency loss' },
  'plenum-minor': { method: 'Clean joint, apply mastic liberally + embed mesh tape', materials: ['Mastic sealant', 'Fiberglass mesh tape'], cost: '$100–$200 per seam', urgency: 'Within 30 days' },
  'plenum-major': { method: 'Full plenum reseal — all joints, screw gaps, mesh + mastic', materials: ['Sheet metal screws', 'Mastic sealant', 'Fiberglass mesh tape'], cost: '$300–$700 total', urgency: 'Immediately — central leak point' },
};

const dfwWarning = "DFW-Specific: NEVER use duct tape alone in DFW attics. Temperatures reach 140°F+ and tape adhesive fails within 1–2 summers. Mastic sealant + mesh tape is the only code-compliant, climate-appropriate method.";

export default function DFWHVACDuctConnectorsGuide() {
  const [selectedDuct, setSelectedDuct] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState<null | { method: string; materials: string[]; cost: string; urgency: string }>(null);

  function evaluate() {
    if (!selectedDuct || !severity) return;
    const key = selectedDuct + '-' + severity;
    setResult(repairMethods[key] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', fontWeight: 600, letterSpacing: '0.08em' }}>DFW HVAC RESOURCE LIBRARY</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Duct Connectors & Fittings Guide</h1>
        <p style={{ color: '#9AA5B8', marginBottom: '2rem', fontSize: '1rem' }}>Why DFW extreme heat destroys duct connections — and the only fix that lasts.</p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E64280', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#F5E642' }}>
          ⚠️ {dfwWarning}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📚 Duct Connection Types in DFW Homes</h2>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
          {ductTypes.map(d => (
            <div key={d.id} style={{ background: '#0F2040', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{d.icon} {d.label}</div>
              <div style={{ color: '#9AA5B8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{d.description}</div>
              <div style={{ color: '#F5E642', fontSize: '0.85rem' }}>🌡️ {d.dfwNote}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🔧 Diagnose Your DFW Duct Issue</h2>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.5rem' }}>Connection Type</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[['flex','Flex Connection'],['rigid','Rigid to Flex'],['plenum','Plenum Joint']].map(([v,l]) => (
                <button key={v} onClick={() => setSelectedDuct(v)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: selectedDuct === v ? '2px solid #F5E642' : '1px solid #1E3A5F', background: selectedDuct === v ? '#F5E64220' : '#0A1628', color: selectedDuct === v ? '#F5E642' : '#E8EDF5', cursor: 'pointer', fontSize: '0.9rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.9rem', color: '#9AA5B8', display: 'block', marginBottom: '0.5rem' }}>Issue Severity</label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[['minor','Minor (small gap, some tape peeling)'],['major','Major (separated, visible gap, air leaking)']].map(([v,l]) => (
                <button key={v} onClick={() => setSeverity(v)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: severity === v ? '2px solid #F5E642' : '1px solid #1E3A5F', background: severity === v ? '#F5E64220' : '#0A1628', color: severity === v ? '#F5E642' : '#E8EDF5', cursor: 'pointer', fontSize: '0.9rem' }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={evaluate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Repair Method →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended Repair</div>
            <div style={{ marginBottom: '0.75rem' }}><span style={{ color: '#9AA5B8' }}>Method: </span><span style={{ fontWeight: 600 }}>{result.method}</span></div>
            <div style={{ marginBottom: '0.75rem' }}><span style={{ color: '#9AA5B8' }}>Materials: </span>{result.materials.map((m, i) => <span key={i} style={{ background: '#1E3A5F', borderRadius: '6px', padding: '0.25rem 0.6rem', marginLeft: '0.4rem', fontSize: '0.85rem' }}>{m}</span>)}</div>
            <div style={{ marginBottom: '0.75rem' }}><span style={{ color: '#9AA5B8' }}>Estimated Cost: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span></div>
            <div><span style={{ color: '#9AA5B8' }}>Urgency: </span><span style={{ color: '#FF6B6B', fontWeight: 600 }}>{result.urgency}</span></div>
          </div>
        )}

        <div style={{ marginTop: '3rem', background: '#0F2040', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Need a DFW HVAC tech who knows proper duct sealing?</div>
          <div style={{ color: '#9AA5B8', fontSize: '0.9rem' }}>ProLnk matches you with vetted DFW pros who use mastic — not tape.</div>
        </div>
      </div>
    </div>
  );
}
