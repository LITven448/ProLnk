import { useState } from 'react';

export default function DFWRangeHoodGuide() {
  const [cooktopBTU, setCooktopBTU] = useState('');
  const [kitchenSize, setKitchenSize] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!cooktopBTU || !kitchenSize) return;
    const btu = parseInt(cooktopBTU);
    const cfm = Math.round(btu / 100 * 1.2);
    const requiresMakeupAir = cfm >= 600;
    let hood = '';
    let brand = '';
    if (cfm >= 900) { hood = 'Commercial-style wall mount (900+ CFM)'; brand = 'Zephyr Monsoon or Vent-A-Hood'; }
    else if (cfm >= 600) { hood = 'Island or wall mount (600-900 CFM)'; brand = 'Broan Elite or BEST by Broan'; }
    else if (cfm >= 400) { hood = 'Under-cabinet ducted (400-600 CFM)'; brand = 'Cosmo or Hauslane'; }
    else { hood = 'Standard under-cabinet (200-400 CFM)'; brand = 'Broan 30" or GE Profile'; }
    const installCost = requiresMakeupAir ? '$1,800-$3,200' : '$400-$900';
    setRecommendation({ cfm, hood, brand, requiresMakeupAir, installCost });
  };

  const selectStyle = {
    width: '100%', padding: '10px', background: '#112240', color: '#fff',
    border: '1px solid #1e3760', borderRadius: '6px', fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>💨</span> DFW Range Hood Buying Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          DFW cooking culture — BBQ, Tex-Mex, frying — demands serious ventilation. Get the right CFM for your kitchen.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🔥</span> Why DFW Needs More CFM</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Tex-Mex blackening produces heavy smoke and grease</li>
              <li>Frying in cast iron is a DFW kitchen staple</li>
              <li>BBQ indoor smoking requires 600+ CFM minimum</li>
              <li>High-BTU gas ranges (60K+ BTU) common in DFW</li>
              <li>Inadequate ventilation ruins cabinetry in 2-3 years</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏠</span> Ducted vs Recirculating</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Ducted: always better — removes heat, grease, odors</li>
              <li>Recirculating: uses charcoal filters, recycles air</li>
              <li>DFW heat makes recirculating units far less effective</li>
              <li>Charcoal filters need replacement every 3-6 months</li>
              <li>Ducted adds $300-$800 to install but saves long-term</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>💨</span> Makeup Air Requirements</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Texas code: makeup air required for hoods over 600 CFM</li>
              <li>Tight DFW homes (post-2000) especially affected</li>
              <li>Without it: backdraft risk from gas appliances</li>
              <li>Passive makeup air: $500-$1,200 installed</li>
              <li>Motorized makeup air: $1,500-$3,000 installed</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>⭐</span> Top Brands for DFW</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Vent-A-Hood: quietest, best for open floor plans</li>
              <li>Zephyr: stylish, strong performance, good warranty</li>
              <li>Broan Elite: reliable, widely serviced in DFW</li>
              <li>BEST by Broan: commercial-grade for serious cooks</li>
              <li>Cosmo: budget option, decent for under 400 CFM</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🔧</span> Calculate Your CFM Requirement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Cooktop Total BTU</label>
              <select style={selectStyle} value={cooktopBTU} onChange={e => setCooktopBTU(e.target.value)}>
                <option value="">Select...</option>
                <option value="30000">Under 30,000 BTU (basic gas)</option>
                <option value="45000">30,000-45,000 BTU (mid-range)</option>
                <option value="60000">45,000-60,000 BTU (pro-style)</option>
                <option value="80000">60,000+ BTU (commercial)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Kitchen Layout</label>
              <select style={selectStyle} value={kitchenSize} onChange={e => setKitchenSize(e.target.value)}>
                <option value="">Select...</option>
                <option value="closed">Closed / Galley kitchen</option>
                <option value="open">Open to living / dining area</option>
                <option value="great">Great room / large open plan</option>
              </select>
            </div>
          </div>
          <button onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Calculate CFM & Get Hood Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your Hood Recommendation</h3>
              <p style={{ margin: '4px 0' }}><strong>Required CFM:</strong> {recommendation.cfm} CFM</p>
              <p style={{ margin: '4px 0' }}><strong>Hood Type:</strong> {recommendation.hood}</p>
              <p style={{ margin: '4px 0' }}><strong>Recommended Brands:</strong> {recommendation.brand}</p>
              <p style={{ margin: '4px 0' }}><strong>Makeup Air Required:</strong> {recommendation.requiresMakeupAir ? '⚠️ Yes — Texas code requirement' : '✅ Not required at this CFM'}</p>
              <p style={{ margin: '4px 0' }}><strong>Estimated Install Cost:</strong> {recommendation.installCost}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
