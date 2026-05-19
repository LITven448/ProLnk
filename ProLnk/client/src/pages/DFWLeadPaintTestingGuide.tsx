import { useState } from 'react';

export default function DFWLeadPaintTestingGuide() {
  const [yearBuilt, setYearBuilt] = useState(1970);
  const [renovationPlanned, setRenovationPlanned] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [renovationType, setRenovationType] = useState('cosmetic');
  const [result, setResult] = useState<null | {
    riskLevel: 'high' | 'medium' | 'low' | 'none';
    riskLabel: string;
    testing: string;
    rrpRequired: boolean;
    costRange: string;
    actions: string[];
  }>(null);

  function calculate() {
    if (yearBuilt >= 1978) {
      setResult({ riskLevel: 'none', riskLabel: 'No Risk', testing: 'Lead paint not used in US homes after 1978 — no testing needed.', rrpRequired: false, costRange: '$0', actions: [] });
      return;
    }
    const riskLevel = yearBuilt < 1940 ? 'high' : yearBuilt < 1960 ? 'high' : 'medium';
    const rrpRequired = renovationPlanned && ['disturbing', 'window', 'demo'].includes(renovationType);
    const actions: string[] = [];
    if (hasChildren) actions.push('Children under 6 at elevated risk — prioritize testing before any disturbance');
    if (renovationPlanned) actions.push('EPA RRP rule requires certified contractor for disturbing >6 sq ft of painted surface');
    if (riskLevel === 'high') actions.push('Focus on trim, doors, windows — highest lead concentration areas');
    actions.push('Encapsulation (paint over intact paint) is lower cost than full removal');
    actions.push('Never sand or dry-scrape paint in a pre-1978 home without testing first');

    setResult({
      riskLevel,
      riskLabel: riskLevel === 'high' ? 'High Risk' : 'Moderate Risk',
      testing: yearBuilt < 1960 ? 'Professional XRF testing recommended ($300–500)' : 'DIY swab test kits acceptable ($10–30) but professional XRF more accurate',
      rrpRequired,
      costRange: riskLevel === 'high' ? '$8,000 – $30,000 for full remediation' : '$2,000 – $10,000 for targeted encapsulation/removal',
      actions,
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏚️ DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Lead Paint Testing Guide</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>Homes built before 1978 may contain lead paint. DFW has thousands of pre-1978 homes — especially in Dallas, Fort Worth, and Garland's older neighborhoods. Know your risk before renovating.</p>

        <div style={{ background: '#2B1A0D', border: '1px solid #E67E22', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#E67E22', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ EPA Renovation Rule (RRP)</h3>
          <p style={{ color: '#C8D0DC', fontSize: '0.9rem', lineHeight: 1.6 }}>Any contractor disturbing more than 6 square feet of painted surface in a pre-1978 home MUST be EPA RRP certified. Violations carry fines up to $37,500 per day. Always ask your contractor for their EPA certification number before signing a contract.</p>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Where Lead Paint Hides</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['Window sills & frames', 'Door frames & trim', 'Porch railings & floors', 'Exterior siding', 'Stair railings', 'Kitchen cabinets (pre-1960)'].map((spot, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.6rem', color: '#C8D0DC', fontSize: '0.9rem' }}>⚠️ {spot}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Your Risk Assessment</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Year Home Was Built</span>
              <input type="number" min={1900} max={2026} value={yearBuilt} onChange={e => setYearBuilt(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={renovationPlanned} onChange={e => setRenovationPlanned(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Planning a renovation</span>
            </label>
            {renovationPlanned && (
              <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Renovation Type</span>
                <select value={renovationType} onChange={e => setRenovationType(e.target.value)} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }}>
                  <option value="cosmetic">Cosmetic (painting, flooring)</option>
                  <option value="window">Window replacement</option>
                  <option value="disturbing">Wall/ceiling work — disturbing surfaces</option>
                  <option value="demo">Full demo or gut renovation</option>
                </select>
              </label>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Children under 6 in the home</span>
            </label>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Assess My Lead Paint Risk
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: result.riskLevel === 'none' ? '#0D2B1A' : result.riskLevel === 'high' ? '#2B0D0D' : '#2B1A0D', border: `1px solid ${result.riskLevel === 'none' ? '#2ECC71' : result.riskLevel === 'high' ? '#E74C3C' : '#E67E22'}`, borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: result.riskLevel === 'none' ? '#2ECC71′ : result.riskLevel === ’high' ? '#E74C3C' : '#E67E22', marginBottom: '0.75rem' }}>
              {result.riskLevel === 'none' ? '✅' : result.riskLevel === 'high' ? '🚨' : '⚠️'} {result.riskLabel}
            </div>
            <div style={{ color: '#C8D0DC', lineHeight: 1.8 }}>
              <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#F5E642′ }}>Testing:</strong> {result.testing}</div>
              {result.riskLevel !== 'none' && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#F5E642′ }}>Remediation cost:</strong> {result.costRange}</div>}
              {result.rrpRequired && <div style={{ color: '#E74C3C', fontWeight: 600, marginBottom: '0.5rem' }}>🚨 EPA RRP-certified contractor REQUIRED for your planned renovation</div>}
              {result.actions.map((a, i) => <div key={i} style={{ marginTop: 4 }}>• {a}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>💡 Encapsulate vs. Remove</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>Intact lead paint that isn't disturbed poses minimal risk. Encapsulation (applying a special sealant or new paint) is 60–80% cheaper than removal and is often the preferred EPA approach for stable surfaces. Full removal is required only if surfaces are deteriorating or will be disturbed during renovation.</p>
        </div>
      </div>
    </div>
  );
}
