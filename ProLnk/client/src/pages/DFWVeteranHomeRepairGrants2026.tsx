import { useState } from 'react';

export default function DFWVeteranHomeRepairGrants2026() {
  const [period, setPeriod] = useState('');
  const [disability, setDisability] = useState('none');
  const [result, setResult] = useState('');

  const checkGrants = () => {
    if (!period) { setResult('⚠️ Please select your service period.'); return; }
    const grants: string[] = [];
    if (disability === '100′ || disability === ’severe') {
      grants.push('🏠 VA SAH Grant (Specially Adapted Housing): Up to $109,986 for permanent home modifications for veterans with severe service-connected disabilities. va.gov/housing-assistance/adaptive-housing-grants');
      grants.push('🏡 VA SHA Grant (Special Home Adaptation): Up to $22,036 for veterans with specific service-connected disabilities. va.gov/housing-assistance/adaptive-housing-grants');
    }
    if (disability !== 'none') {
      grants.push('♿ VA HISA Grant (Home Improvement & Structural Alterations): Up to $6,800 for service-connected or $2,000 for non-service-connected conditions. Contact VA Medical Center: (214) 742-8387 (Dallas) or (800) 443-9672 (Fort Worth)');
    }
    grants.push('🏦 Texas Veterans Land Board Home Improvement Loan: Below-market interest rates, up to $50,000 for home improvements. Call TVL: 1-800-252-VETS (8387)');
    grants.push('🔨 Habitat for Humanity Veterans Build (DFW): Free or subsidized home repairs for qualifying veteran households. Dallas: (214) 678-0100 | Fort Worth: (817) 923-8080');
    setResult(grants.join('

'));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🎖️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Veteran Home Repair Grants 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>VA grants, TVL loans, and nonprofit programs for DFW veteran homeowners</p>
        </div>

        {[{icon:'🇺🇸',title:'VA SAH & SHA Grants',body:'VA Specially Adapted Housing (SAH) grants up to $109,986 and Special Home Adaptation (SHA) grants up to $22,036 are available to veterans with severe service-connected disabilities who own or plan to own a home. These do not need to be repaid.'},{icon:'♿',title:'VA HISA Grant',body:'The Home Improvement and Structural Alterations (HISA) grant covers modifications like ramps, roll-in showers, and widened doorways. Up to $6,800 for service-connected conditions, $2,000 for non-service-connected. Apply through your VA Medical Center.'},{icon:'🤝',title:'Nonprofit Support',body:'Habitat for Humanity (Dallas & Fort Worth chapters) offers Veterans Build — critical repairs and accessibility mods. Rebuilding Together Dallas also serves veterans. Both offer free or low-cost services.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🔍 Find Your Veteran Grants</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <select value={period} onChange={e => setPeriod(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: period ? '#fff' : '#64748b', fontSize: 14 }}>
              <option value="">Select Service Period</option>
              <option value="wwii">WWII / Korea (pre-1955)</option>
              <option value="vietnam">Vietnam Era (1955–1975)</option>
              <option value="gulf">Gulf War (1990–present)</option>
              <option value="post911″>Post-9/11 (2001–present)</option>
            </select>
            <select value={disability} onChange={e => setDisability(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }}>
              <option value="none">No Disability Rating</option>
              <option value="partial">Partial Disability (1–99%)</option>
              <option value="severe">Severe Disability (loss of limb/sight)</option>
              <option value="100″>100% Service-Connected</option>
            </select>
          </div>
          <button onClick={checkGrants}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find My Programs
          </button>
          {result && <div style={{ marginTop: 16 }}>{result.split('

').map((r, i) => (
            <p key={i} style={{ padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 8 }}>{r}</p>
          ))}</div>}
        </div>
      </div>
    </div>
  );
}
