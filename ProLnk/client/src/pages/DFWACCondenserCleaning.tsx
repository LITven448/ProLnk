import { useState } from 'react';

const recommendations: Record<string, Record<string, { method: string; frequency: string; efficiencyGain: string; steps: string[] }>> = {
  clogged: {
    spring: { method: 'Full DIY Deep Clean', frequency: 'Immediately + again in August', efficiencyGain: '15–25% efficiency recovery', steps: ['Turn off AC at breaker — never clean with power on', 'Remove large debris by hand (cottonwood, leaves)', 'Use garden hose from inside-out at low pressure', 'Apply coil cleaner foam (available at hardware stores)', 'Rinse thoroughly — let dry 30 min before restoring power', 'Straighten any bent fins with a fin comb ($12)'] },
    summer: { method: 'Careful Rinse + Pro Inspection', frequency: 'Now + full clean in September', efficiencyGain: '10–20% efficiency recovery', steps: ['Turn off power at breaker first', 'Rinse coils gently from inside-out with hose', 'Do NOT use high pressure — can damage fins', 'Clear area around unit (18" clearance minimum)', 'Schedule full coil cleaning with tech for fall tuneup', 'Check for cottonwood buildup on all four sides'] },
  },
  moderate: {
    spring: { method: 'DIY Rinse + Monitor', frequency: 'Now + check again in June', efficiencyGain: '5–12% efficiency recovery', steps: ['Rinse coils with garden hose from inside-out', 'Clear any cottonwood fluff from around unit base', 'Trim vegetation — maintain 18" clearance all sides', 'Check refrigerant lines for damage while outside', 'Schedule professional tuneup before peak summer'] },
    summer: { method: 'Quick Rinse', frequency: 'Monthly in peak season', efficiencyGain: '3–8% maintained efficiency', steps: ['Turn off power before rinsing', 'Light rinse from inside-out — 5 minutes max', 'Clear cottonwood from base and sides', 'Check that top fan is spinning freely', 'No chemicals needed for moderate buildup'] },
  },
  clean: {
    spring: { method: 'Preventive Check', frequency: 'Spring + late August', efficiencyGain: 'Maintain current efficiency', steps: ['Visual inspection only — looks good', 'Clear any new growth around unit', 'Check that drain line is clear', 'Verify no animal nesting on/near unit', 'Schedule annual professional tuneup'] },
    summer: { method: 'Monitor Only', frequency: 'Check again at end of August', efficiencyGain: 'Maintain current efficiency', steps: ['No action needed now', 'Check again during peak cottonwood in early June', 'Keep 18" clearance maintained', 'Plan full clean for next spring'] },
  },
};

export default function DFWACCondenserCleaning() {
  const [condition, setCondition] = useState('moderate');
  const [season, setSeason] = useState('spring');

  const result = recommendations[condition]?.[season];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>AC Condenser Cleaning in DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW cottonwood season (April–June) coats condenser coils faster than almost any other US metro. A clogged condenser can reduce AC efficiency by 15–30%, costing you hundreds in extra electricity while your system strains to cool.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🌿 The DFW Cottonwood Problem</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            Eastern cottonwood trees release massive seed fluff in spring — DFW has millions of them. The fluff acts like insulation on condenser coils, blocking airflow the unit needs to reject heat. Combined with oak pollen and regular dust, DFW condensers clog faster than manufacturer schedules account for.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Spring cleaning is non-negotiable. A second check in late August (before any remaining heat) is recommended. A clogged condenser in 105°F DFW heat can trigger compressor shutdown.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔧 Get Your Cleaning Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Condenser Condition</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['clogged', '🚫 Visibly Clogged'], ['moderate', '⚠️ Some Buildup'], ['clean', '✅ Looks Clean']].map(([val, label]) => (
                  <button key={val} onClick={() => setCondition(val)}
                    style={{ flex: 1, padding: '10px 8px', borderRadius: 10, border: `2px solid ${condition === val ? '#F5E642' : '#1E3A5F'}`, background: condition === val ? '#F5E642' : 'transparent', color: condition === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Current DFW Season</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['spring', '🌸 Spring (Mar–Jun)'], ['summer', '☀️ Peak Summer (Jul–Sep)']].map(([val, label]) => (
                  <button key={val} onClick={() => setSeason(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${season === val ? '#F5E642' : '#1E3A5F'}`, background: season === val ? '#F5E642' : 'transparent', color: season === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                <div style={{ background: '#111D35', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{result.method}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Method</div>
                </div>
                <div style={{ background: '#111D35', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#22C55E', fontWeight: 700, fontSize: 15 }}>{result.efficiencyGain}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>Expected Gain</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 4 }}>Frequency: <strong style={{ color: '#E8EAF0' }}>{result.frequency}</strong></div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 16, marginBottom: 10 }}>Step-by-Step</div>
              <ol style={{ paddingLeft: 20, color: '#94A3B8', lineHeight: 1.9 }}>
                {result.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Need a DFW HVAC Tuneup?</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>A pro can clean coils safely, check refrigerant, and verify your system is ready for DFW summer in one visit.</div>
        </div>
      </div>
    </div>
  );
}
