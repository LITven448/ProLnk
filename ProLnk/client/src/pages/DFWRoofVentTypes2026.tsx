import { useState } from 'react';

const ventTypes = [
  { id: 'ridge', name: 'Ridge Vent', icon: '🏔️', best: true, desc: 'Runs along peak; best passive option for DFW heat', pros: ['Passive — no moving parts', 'Even airflow across entire attic', 'Low profile, barely visible', 'Ideal for DFW heat management'], cons: ['Requires adequate soffit intake', 'Can leak if improperly installed'] },
  { id: 'gable', name: 'Gable Vent', icon: '🔲', best: false, desc: 'Triangular vents on end walls; common in older DFW homes', pros: ['Simple installation', 'Good cross-ventilation', 'Works without soffits'], cons: ['Less effective in still air', 'Can allow rain infiltration in DFW storms', 'Uneven airflow distribution'] },
  { id: 'soffit', name: 'Soffit Vent', icon: '⬇️', best: false, desc: 'Intake vents under eaves; pairs with ridge vent', pros: ['Draws cool air in at low point', 'Essential intake for ridge system', 'Prevents moisture buildup'], cons: ['Intake only — needs exhaust partner', 'Can get blocked by insulation'] },
  { id: 'turbine', name: 'Turbine Vent', icon: '🌀', best: false, desc: 'Wind-powered spinner; DFW storms make these loud', pros: ['No electricity required', 'High CFM when wind is present', 'Cost effective'], cons: ['Noisy in DFW storm conditions', 'Bearings wear out in 5–8 years', 'Ineffective in calm weather'] },
  { id: 'powered', name: 'Powered Attic Fan', icon: '⚡', best: false, desc: 'Electric fan; controversial for DFW air quality', pros: ['High CFM output', 'Thermostat-controlled', 'Works regardless of wind'], cons: ['Can depressurize attic, pulling conditioned air', 'Adds to electric bill', 'May worsen DFW humidity issues'] },
];

const homeStyles = ['Ranch / Single Story', 'Two Story Traditional', 'Colonial', 'Craftsman', 'Modern / Contemporary'];

export default function DFWRoofVentTypes2026() {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [currentVents, setCurrentVents] = useState<string[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);

  const toggleVent = (id: string) => {
    setCurrentVents(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const hasRidge = currentVents.includes('ridge');
  const hasSoffit = currentVents.includes('soffit');
  const score = hasRidge && hasSoffit ? 'Optimal' : hasRidge || hasSoffit ? 'Adequate' : currentVents.length > 0 ? 'Marginal' : 'Unknown';
  const scoreColor = score === 'Optimal' ? '#22c55e' : score === 'Adequate' ? '#F5E642' : '#ef4444';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roof Vent Types Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>All ventilation options for DFW's extreme heat climate</p>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {ventTypes.map(v => (
            <div key={v.id} style={{ background: '#1a2744', borderRadius: 12, padding: 20, border: v.best ? '2px solid #F5E642' : '1px solid #2a3a5c' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{v.icon}</span>
                <div>
                  <h3 style={{ margin: 0, color: '#F5E642' }}>{v.name} {v.best && <span style={{ fontSize: 12, background: '#F5E642', color: '#0A1628', padding: '2px 8px', borderRadius: 20, marginLeft: 8 }}>BEST FOR DFW</span>}</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>{v.desc}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><p style={{ margin: '0 0 4px', fontSize: 12, color: '#22c55e', fontWeight: 600 }}>✅ PROS</p>{v.pros.map(p => <p key={p} style={{ margin: '2px 0', fontSize: 13, color: '#cbd5e1' }}>• {p}</p>)}</div>
                <div><p style={{ margin: '0 0 4px', fontSize: 12, color: '#ef4444', fontWeight: 600 }}>❌ CONS</p>{v.cons.map(c => <p key={c} style={{ margin: '2px 0', fontSize: 13, color: '#cbd5e1' }}>• {c}</p>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Ventilation Assessment Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Home Style</label>
            <select value={selectedStyle} onChange={e => setSelectedStyle(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff' }}>
              <option value="">Select your home style</option>
              {homeStyles.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>Current vents (select all that apply):</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {ventTypes.map(v => (
              <button key={v.id} onClick={() => toggleVent(v.id)} style={{ padding: '8px 14px', borderRadius: 20, border: '1px solid', borderColor: currentVents.includes(v.id) ? '#F5E642' : '#2a3a5c', background: currentVents.includes(v.id) ? '#F5E642' : 'transparent', color: currentVents.includes(v.id) ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: 13 }}>{v.icon} {v.name}</button>
            ))}
          </div>
          <button onClick={() => setShowAssessment(true)} disabled={!selectedStyle} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: selectedStyle ? 'pointer' : 'not-allowed', opacity: selectedStyle ? 1 : 0.5 }}>Assess My Ventilation</button>
          {showAssessment && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: `4px solid ${scoreColor}` }}>
              <p style={{ color: scoreColor, fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>Rating: {score}</p>
              <p style={{ color: '#cbd5e1', margin: 0 }}>{score === 'Optimal' ? '✅ Your ridge + soffit combo is ideal for DFW heat. Ensure balanced airflow ratio.' : score === 'Adequate' ? '⚠️ Good start. Add a complementary intake or exhaust vent for best DFW performance.' : '🚨 Your attic may be dangerously hot in DFW summers. Ridge + soffit vents are strongly recommended.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}