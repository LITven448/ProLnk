import { useState } from 'react';

const renovationRisks: Record<string, { asbestos: string[]; lead: string[]; testing: string; permit: boolean }> = {
  cosmetic: {
    asbestos: ['Popcorn ceiling scraping/removal', 'Vinyl floor tile disturbance', 'Textured wall disturbance'],
    lead: ['Sanding painted surfaces', 'Disturbing window/door trim paint', 'Painting over existing layers'],
    testing: 'Strongly recommended before any scraping, sanding, or disturbance of painted/textured surfaces',
    permit: false,
  },
  structural: {
    asbestos: ['Removing insulation from pipes or ducts', 'Demolishing walls (may contain vermiculite)', 'Removing old floor tiles beneath subfloor'],
    lead: ['Removing windows or doors (disturbs frame paint)', 'Electrical or plumbing rough-in (disturbs walls)', 'Structural wall removal'],
    testing: 'Required before work begins. Permit application may trigger inspector to require test results.',
    permit: true,
  },
  hvac: {
    asbestos: ['Duct insulation (pre-1980 wrap may be asbestos)', 'Boiler/furnace insulation', 'Duct tape on old systems (asbestos-containing)'],
    lead: ['Older homes: solder in copper pipes may contain lead', 'Paint on radiators or pipes'],
    testing: 'Asbestos testing required before any duct or insulation disturbance in pre-1980 homes',
    permit: true,
  },
};

export default function DFWAsbestosLeadGuide() {
  const [builtYear, setBuiltYear] = useState('');
  const [renovationType, setRenovationType] = useState('cosmetic');
  const [showResult, setShowResult] = useState(false);

  const year = parseInt(builtYear) || 0;
  const hasLeadRisk = year > 0 && year < 1978;
  const hasAsbestosRisk = year > 0 && year < 1980;
  const riskInfo = renovationRisks[renovationType];

  const getTestCost = () => {
    if (!year) return 'N/A';
    const tests = [];
    if (hasLeadRisk) tests.push('Lead: $200–$400 (XRF testing) or $25–$50 DIY swab kit');
    if (hasAsbestosRisk) tests.push('Asbestos: $250–$600 (bulk sampling + lab analysis)');
    if (tests.length === 0) return 'Low risk — standard visual inspection sufficient';
    return tests.join(' | ');
  };

  const getAbatementCost = () => {
    if (hasLeadRisk && hasAsbestosRisk) return '$3,000–$15,000+ depending on scope';
    if (hasLeadRisk) return '$1,500–$8,000 (lead paint encapsulation or removal)';
    if (hasAsbestosRisk) return '$1,500–$8,000 (asbestos abatement per material)';
    return 'Minimal risk — standard contractor work acceptable';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏚️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Asbestos & Lead Paint Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            DFW's rapid postwar growth means <strong style={{ color: '#F5E642' }}>hundreds of thousands of homes</strong> built before 1980 may contain asbestos or lead paint. These materials are safe when undisturbed — but become serious health hazards when disturbed during renovation. Know before you cut, sand, or demo.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>📅 Key Year Thresholds</h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { year: 'Before 1978', risk: '⚠️ Lead Paint Risk', desc: 'Lead-based paint was banned for residential use in 1978. Any home built before this date — especially trim, windows, and exterior — may contain lead paint. Disturbing it requires EPA RRP protocols.', color: '#f59e0b' },
              { year: 'Before 1980', risk: '☣️ Asbestos Risk', desc: 'Asbestos was widely used in insulation, floor tiles (9"×9" vinyl), popcorn ceilings, joint compound, roof shingles, and pipe wrap. Not banned until 1989 (some uses), but mostly phased out by 1980 in homes.', color: '#ef4444' },
            ].map(item => (
              <div key={item.year} style={{ flex: '1 1 280px', backgroundColor: '#1a2d4a', borderRadius: 10, padding: 18, borderLeft: `4px solid ${item.color}` }}>
                <div style={{ color: item.color, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{item.year}</div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 8 }}>{item.risk}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🚫 What NOT to Disturb (Without Testing)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              ['🏠', 'Popcorn / textured ceilings (pre-1980)'],
              ['🔲', '9"×9" floor tiles and black mastic adhesive'],
              ['🌡️', 'Pipe and duct insulation wrap'],
              ['🪟', 'Window glazing compound (pre-1978)'],
              ['🧱', 'Joint compound / drywall texture (pre-1980)'],
              ['🏚️', 'Roof shingles and siding (some types)'],
              ['🔌', 'Electrical panel insulation (old homes)'],
              ['🌿', 'Vermiculite insulation in attic'],
            ].map(([icon, text]) => (
              <div key={text} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🏛️ DFW City Requirements</h2>
          <div style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16 }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#e2e8f0' }}>EPA RRP Rule</strong>: Any contractor disturbing 6+ sq ft of painted interior or 20+ sq ft of exterior on pre-1978 homes must be EPA RRP certified. Always ask your contractor for proof of certification. <br /><br />
              <strong style={{ color: '#e2e8f0' }}>Dallas / Fort Worth / Arlington</strong>: Building permits for renovation projects in pre-1978 homes may require documentation of lead/asbestos testing or certified contractor use before permit issuance. Check with your specific city's building department — rules vary. <br /><br />
              <strong style={{ color: '#e2e8f0' }}>Disposal</strong>: Asbestos-containing material requires disposal at an approved DFW landfill (Trinity East, McCommas Bluff). Illegal dumping carries $25,000+ fines.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🎯 Risk Assessment & Cost Estimator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Year Home Was Built</label>
            <input
              type="number"
              placeholder="e.g. 1965"
              value={builtYear}
              onChange={e => { setBuiltYear(e.target.value); setShowResult(false); }}
              style={{ width: '100%', backgroundColor: '#1a2d4a', border: '2px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Renovation Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['cosmetic', 'Cosmetic (paint, floors)'], ['structural', 'Structural (walls, windows)'], ['hvac', 'HVAC / Mechanical']].map(([v, l]) => (
                <button key={v} onClick={() => { setRenovationType(v); setShowResult(false); }}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', borderColor: renovationType === v ? '#F5E642' : '#1a2d4a', backgroundColor: renovationType === v ? '#F5E642' : '#1a2d4a', color: renovationType === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResult(true)} disabled={!builtYear}
            style={{ width: '100%', backgroundColor: builtYear ? '#F5E642' : '#334155', color: builtYear ? '#0A1628' : '#64748b', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: builtYear ? 'pointer' : 'not-allowed' }}>
            {builtYear ? 'Check My Risk Level →' : 'Enter your home\’s build year above'}
          </button>

          {showResult && builtYear && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 8, fontSize: 16 }}>Risk Profile for {builtYear} Home:</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                  <span style={{ backgroundColor: hasLeadRisk ? '#f59e0b20' : '#22c55e20', color: hasLeadRisk ? '#f59e0b' : '#22c55e', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    {hasLeadRisk ? '⚠️ Lead Paint Risk' : '✅ Lead: Low Risk'}
                  </span>
                  <span style={{ backgroundColor: hasAsbestosRisk ? '#ef444420' : '#22c55e20', color: hasAsbestosRisk ? '#ef4444' : '#22c55e', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    {hasAsbestosRisk ? '☣️ Asbestos Risk' : '✅ Asbestos: Low Risk'}
                  </span>
                  {riskInfo.permit && <span style={{ backgroundColor: '#8b5cf620', color: '#a78bfa', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>📋 Permit Likely Required</span>}
                </div>
              </div>

              {(hasLeadRisk || hasAsbestosRisk) && (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Materials to Check ({renovationType} renovation):</div>
                    {[...(hasAsbestosRisk ? riskInfo.asbestos : []), ...(hasLeadRisk ? riskInfo.lead : [])].map((item, i) => (
                      <div key={i} style={{ color: '#94a3b8', fontSize: 13, padding: '4px 0' }}>• {item}</div>
                    ))}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🧪 <strong style={{ color: '#e2e8f0' }}>Testing:</strong> {riskInfo.testing}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>💰 <strong style={{ color: '#e2e8f0' }}>Test Cost:</strong> {getTestCost()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>🔨 <strong style={{ color: '#e2e8f0' }}>Abatement if Positive:</strong> {getAbatementCost()}</div>
                </>
              )}

              {!hasLeadRisk && !hasAsbestosRisk && (
                <div style={{ color: '#22c55e', fontSize: 15 }}>✅ Your home was built after 1980 — standard renovation protocols apply. No special testing required for lead or asbestos.</div>
              )}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get matched with EPA-certified DFW abatement contractors through ProLnk — free quotes, licensed pros.</p>
        </div>

      </div>
    </div>
  );
}
