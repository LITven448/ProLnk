import { useState } from 'react';

export default function DFWSoffitVentGuide() {
  const [atticSqft, setAtticSqft] = useState('');
  const [soffitPct, setSoffitPct] = useState('');
  const [blocked, setBlocked] = useState('yes');
  const [result, setResult] = useState<null | { status: string; recommendation: string; cost: string }>(null);

  function assess() {
    const sqft = parseFloat(atticSqft);
    const pct = parseFloat(soffitPct);
    if (!sqft || !pct) return;
    const requiredSoffitNFA = (sqft / 300) * 144;
    const currentNFA = (pct / 100) * (sqft * 0.15) * 144;
    const ratio = currentNFA / requiredSoffitNFA;
    let status = '';
    let recommendation = '';
    let cost = '';
    if (ratio < 0.5) {
      status = 'Severely under-ventilated intake';
      recommendation = blocked === 'yes'
        ? 'Install insulation baffles immediately — blocked soffit vents are causing heat/moisture buildup. Add additional soffit vents along eaves.'
        : 'Add perforated soffit panels to boost intake NFA. Target 1 sq ft NFA per 150 sq ft attic.';
      cost = 'Insulation baffles: $200–$400. Additional soffit vents: $300–$700 installed.';
    } else if (ratio < 0.85) {
      status = 'Marginal intake — below balanced ventilation threshold';
      recommendation = blocked === 'yes'
        ? 'Clear insulation from soffit baffles first — often free-fixes half the deficit.'
        : 'Extend soffit venting along overhangs. Pair with continuous ridge vent for balanced system.';
      cost = 'Baffle install (DIY): $100–$200. Pro soffit extension: $400–$900.';
    } else {
      status = 'Intake ventilation adequate';
      recommendation = blocked === 'yes'
        ? 'Add baffles to protect existing vents from insulation blocking — still critical even if NFA is adequate.'
        : 'System looks balanced. Verify ridge exhaust matches soffit intake for peak DFW performance.';
      cost = 'Maintenance check: $0–$150. Baffle install: $100–$250.';
    }
    setResult({ status, recommendation, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Soffit Vent Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            Balanced ventilation requires equal intake at the soffit and exhaust at the ridge. In DFW, blocked soffit vents are the #1 reason attics overheat even when ridge vents are installed.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>⚡ The DFW Soffit Problem</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>DFW home builders often install blown-in insulation that migrates and blocks soffit baffles</li>
            <li>Blocked soffit = no intake = ridge vent becomes ineffective even if correctly sized</li>
            <li>Symptom: attic temps above 140°F even with apparent exhaust ventilation</li>
            <li>Insulation baffles (rafter baffles) maintain a clear channel from soffit to attic space</li>
            <li>Visual check: look into soffit vents with a flashlight — you should see daylight through to attic</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🔍 How to Check Effectiveness</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { step: '1', title: 'Visual Daylight Test', desc: 'Push a stiff wire into soffit vent — it should reach attic space freely' },
              { step: '2', title: 'Attic Inspection', desc: 'In attic, check each rafter bay at eaves — insulation should not block vent channel' },
              { step: '3', title: 'Temp Differential', desc: 'On hot day: attic temp should be within 10–15°F of outdoor temp (with proper ventilation)' },
              { step: '4', title: 'Baffle Presence', desc: 'Look for cardboard or foam baffles stapled to rafters at soffit — missing = blocked risk' },
            ].map(item => (
              <div key={item.step} style={{ background: '#162040', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: 13 }}>{item.step}</div>
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 700 }}>{item.title}</div>
                  <div style={{ color: '#9BA8C0', fontSize: 13, marginTop: 4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Ventilation Balance Assessment</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Attic Square Footage</label>
              <input type="number" value={atticSqft} onChange={e => setAtticSqft(e.target.value)} placeholder="e.g. 1800″
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Estimated Soffit Vent Coverage (% of eave perimeter)</label>
              <input type="number" value={soffitPct} onChange={e => setSoffitPct(e.target.value)} placeholder="e.g. 50″
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Are soffit vents likely blocked by insulation?</label>
              <select value={blocked} onChange={e => setBlocked(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="yes">Yes / Unknown</option>
                <option value="no">No — baffles installed</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Assess Soffit Ventilation
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.status}</div>
              <div style={{ color: '#E8EAF0', marginBottom: 8 }}>{result.recommendation}</div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
