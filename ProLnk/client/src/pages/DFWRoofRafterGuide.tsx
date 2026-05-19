import { useState } from 'react';

const concerns = [
  { type: 'Cracking/Sagging', engineerNeeded: true, desc: 'Visible rafter deflection or ceiling cracks along rafter lines' },
  { type: 'Wind Damage', engineerNeeded: true, desc: 'Post-storm rafter displacement or ridge board movement' },
  { type: 'General Inspection', engineerNeeded: false, desc: 'Routine check before re-roof or after purchase' },
  { type: 'Hurricane Strap Upgrade', engineerNeeded: false, desc: 'Adding straps to existing structure — contractor can handle' },
];

export default function DFWRoofRafterGuide() {
  const [roofType, setRoofType] = useState('truss');
  const [dfwZone, setDfwZone] = useState('standard');
  const [concern, setConcern] = useState('General Inspection');
  const [result, setResult] = useState<null | { engineerNeeded: boolean; strapsRequired: boolean; assessment: string; cost: string }>(null);

  function assess() {
    const selectedConcern = concerns.find(c => c.type === concern)!;
    const highWindZone = dfwZone === 'tornado' || dfwZone === 'north';
    const engineerNeeded = selectedConcern.engineerNeeded || (highWindZone && concern === 'Wind Damage');
    const strapsRequired = highWindZone || roofType === 'stick';
    let assessment = '';
    let cost = '';

    if (engineerNeeded) {
      assessment = `A licensed structural engineer should evaluate this before any repairs. DFW wind code (IRC Section R802) requires specific rafter/truss connections — only a PE can certify compliance after structural damage.`;
      cost = 'Structural engineering report: $400–$900. Repair costs depend on scope — get engineer assessment first.';
    } else if (strapsRequired) {
      assessment = roofType === 'truss'
        ? `DFW truss roofs in high-wind zones should have H2.5 hurricane straps at every truss. Many pre-2000 DFW homes are missing these. A roofing contractor (not engineer) can install during re-roof.`
        : `Stick-frame roofs in DFW require proper rafter-to-wall connections. Collar ties and ridge bracing are critical. Verify with a home inspector or roofing contractor.`;
      cost = 'Hurricane strap retrofit: $800–$2,000 depending on truss count. Best done during re-roof for lower cost.';
    } else {
      assessment = `Standard DFW truss roof in a typical wind zone with routine concern. A roofing contractor can inspect and report — no engineer required for this scenario.`;
      cost = 'Contractor inspection: $150–$300. Repairs quoted after inspection.';
    }
    setResult({ engineerNeeded, strapsRequired, assessment, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Roof Rafter & Structural Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            DFW wind loads demand proper roof structural connections. Whether your home has engineered trusses or stick-framed rafters, here's what you need to know about DFW wind code compliance.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🌪️ DFW Wind Code Basics</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: '#E8EAF0′ }}>DFW design wind speed:</strong> 115–130 mph depending on county (IRC Table R301.2)</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Truss roofs (90% of post-1985 DFW):</strong> Engineered trusses designed for DFW wind loads from factory</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Stick-frame rafters (older DFW homes):</strong> Field-built — quality varies; common in pre-1975 construction</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Hurricane straps (H2.5/H10):</strong> Required in DFW for all truss-to-wall connections; missing in many pre-2000 homes</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Tornado risk:</strong> North DFW (Collin, Denton counties) has higher tornado frequency — stricter standard recommended</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🔍 When You Need a Structural Engineer</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {concerns.map(c => (
              <div key={c.type} style={{ background: '#162040', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 700, fontSize: 14 }}>{c.type}</div>
                  <div style={{ color: '#9BA8C0', fontSize: 12, marginTop: 4 }}>{c.desc}</div>
                </div>
                <div style={{ color: c.engineerNeeded ? '#F5A623′ : '#7AB8A0', fontWeight: 700, fontSize: 12, minWidth: 100, textAlign: ’right' }}>
                  {c.engineerNeeded ? '⚠️ Engineer Req.' : '✅ Contractor OK'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Structural Assessment Tool</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Structural Type</label>
              <select value={roofType} onChange={e => setRoofType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="truss">Engineered Truss (most DFW homes post-1985)</option>
                <option value="stick">Stick-Framed Rafters (pre-1980 or custom homes)</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Location / Wind Zone</label>
              <select value={dfwZone} onChange={e => setDfwZone(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="standard">Central DFW (Dallas, Tarrant, Ellis counties)</option>
                <option value="north">North DFW / higher tornado risk (Collin, Denton)</option>
                <option value="tornado">Tornado alley edge (Wise, Parker, Johnson counties)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                {concerns.map(c => <option key={c.type}>{c.type}</option>)}
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Structural Assessment
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              {result.engineerNeeded && (
                <div style={{ background: '#F5A623', color: '#0A1628', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>
                  ⚠️ Structural Engineer Required
                </div>
              )}
              {!result.engineerNeeded && result.strapsRequired && (
                <div style={{ background: '#2D6A4F', color: '#E8EAF0', borderRadius: 6, padding: '6px 12px', fontSize: 13, fontWeight: 700, display: 'inline-block', marginBottom: 10 }}>
                  🔩 Hurricane Straps Recommended
                </div>
              )}
              <div style={{ color: '#E8EAF0', marginBottom: 8 }}>{result.assessment}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
