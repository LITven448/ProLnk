import { useState } from 'react';

const vintages = ['Pre-1976', '1976-1994', '1994-2010', '2010-Present'];
const situations = ['No existing HVAC', 'Window units only', 'Old central system', 'High cooling bills'];

const advice: Record<string, Record<string, string>> = {
  'Pre-1976': {
    'No existing HVAC': 'Pre-HUD code mobile homes have minimal insulation. Install a mini-split 1.5-ton with dehumidification — do NOT use central forced air without major duct sealing and belly-wrap restoration first.',
    'Window units only': 'Upgrade to a single-zone mini-split. DFW heat in a pre-1976 mobile home with window units costs 2-3x more than a properly installed mini-split.',
    'Old central system': 'Check belly-wrap insulation — if compromised, ground heat gain makes any central system fight itself. Repair belly-wrap before replacing unit.',
    'High cooling bills': 'Root cause is almost always belly-wrap damage or air infiltration. HVAC upgrade alone will not solve bills without fixing the envelope.',
  },
  '1976-1994': {
    'No existing HVAC': '1.5-ton or 2-ton mobile home specific air handler. Use units rated for mobile/manufactured homes — standard residential units have different static pressure requirements.',
    'Window units only': 'Good candidate for mobile home package unit. Outdoor combo heat-pump/AC mounts to exterior, single duct penetration, no air handler space needed.',
    'Old central system': 'Replace with manufactured-home-rated package heat pump. 15 SEER2+ significantly cuts DFW summer bills.',
    'High cooling bills': 'Check R-value of belly insulation (should be R-14 minimum). Add radiant barrier to roof cavity — massive impact in DFW sun.',
  },
  '1994-2010': {
    'No existing HVAC': 'Manufactured home HVAC is standardized post-1994. Package unit or split system both work. Get Manual J for correct sizing.',
    'Window units only': 'Install package heat pump 2-ton for typical 1994-2010 double-wide. Run ductwork through existing chase or belly.',
    'Old central system': 'Direct replacement with higher-SEER2 unit is straightforward. Check duct connections at floor registers — common leak point.',
    'High cooling bills': 'Seal duct connections under home. Post-1994 manufactured homes lose 20-30% through floor duct leaks in DFW summer.',
  },
  '2010-Present': {
    'No existing HVAC': 'Modern manufactured homes are well-insulated. 1.5-2 ton package or split system. Confirm HUD zone (DFW is Zone 3).',
    'Window units only': 'Likely a cost choice, not a structural limit. Direct package unit install is straightforward in post-2010 homes.',
    'Old central system': 'Already built to standard — upgrade to 18 SEER2 heat pump for optimal DFW performance.',
    'High cooling bills': 'Check programmable thermostat and duct sealing. Modern manufactured homes are efficient — bills should be comparable to site-built if envelope is intact.',
  },
};

export default function DFWHVACMobileHomeGuide() {
  const [vintage, setVintage] = useState('');
  const [situation, setSituation] = useState('');

  const result = vintage && situation ? advice[vintage]?.[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Mobile & Manufactured Homes</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          DFW has one of the largest manufactured housing populations in Texas. Mobile and manufactured homes have unique HVAC requirements — standard residential equipment often doesn't work correctly. Know your home's vintage and HUD compliance status before any HVAC decision.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          ⚠️ Critical: Standard residential HVAC units have different external static pressure (ESP) ratings than manufactured home units. Using the wrong type voids warranty and causes premature failure.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏠 Get Your Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>HOME VINTAGE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {vintages.map(v => (
                <button key={v} onClick={() => setVintage(v)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: vintage === v ? '#F5E642' : '#1e3a5f', background: vintage === v ? '#F5E642' : 'transparent', color: vintage === v ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{v}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>CURRENT SITUATION</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSituation(s)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: situation === s ? '#F5E642' : '#1e3a5f', background: situation === s ? '#F5E642' : 'transparent', color: situation === s ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['🔧', 'Belly-Wrap Insulation', 'The insulation under your floor. DFW ground heat gain is significant when compromised.'],['📦', 'Package Units', 'All-in-one outdoor units are the most common manufactured home solution in DFW.'],['🌡️', 'HUD Zone 3', 'DFW falls in HUD Thermal Zone 3. Ensure your unit is rated for this zone.'],['💨', 'Air Volume', 'Manufactured homes have lower ceiling volume — 2-ton is typically max even for double-wides.']].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Connect with DFW HVAC pros experienced with manufactured homes. Specialized knowledge matters here.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
