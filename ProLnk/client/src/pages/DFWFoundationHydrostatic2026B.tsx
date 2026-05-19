import { useState } from 'react';

const guides: Record<string, { title: string; steps: string[]; note: string }> = {
  pass: {
    title: '✅ Test Passed — No Slab Leak Detected',
    steps: ['System held pressure for the test duration (typically 15–30 min)', 'All DWV lines appear intact below the slab', 'Proceed with home purchase with confidence on plumbing integrity', 'Schedule re-test if any doubt or if home sat vacant 6+ months'],
    note: 'A passed hydrostatic test does not cover branch lines above slab. Recommend video scope for older DFW homes built before 1985.',
  },
  fail: {
    title: '🚨 Test Failed — Slab Leak Present',
    steps: ['Pressure dropped during test, indicating water loss through a breach', 'Next step: isolate sections to locate leak (zone testing)', 'Repair options: tunneling ($3K–$8K), reroute above slab ($2K–$5K), or epoxy liner ($1.5K–$3K)', 'Negotiate repair credit with seller — this is a material defect in DFW real estate'],
    note: 'DFW clay soil movement is the #1 cause of slab plumbing failures. Cast iron pipes in pre-1980s homes corrode and crack over time.',
  },
  inconclusive: {
    title: '⚠️ Inconclusive — Repeat or Investigate Further',
    steps: ['Minor pressure drop could be temperature-related expansion (normal on hot DFW days)', 'Re-test early morning when temps are stable', 'If second test also shows drop, treat as failed', 'Ask plumber to check accessible cleanouts and air admittance valves before re-testing'],
    note: 'Inconclusive results are more common in summer DFW heat. A 5–10% pressure variance over 30 min is borderline — document result and re-test.',
  },
};

export default function DFWFoundationHydrostatic2026B() {
  const [scenario, setScenario] = useState('');
  const [guide, setGuide] = useState<null | typeof guides[string]>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW FOUNDATION GUIDE 2026 · PART 2</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>💧 Hydrostatic Foundation Test Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>Pressure testing DFW slab plumbing before purchase. A hydrostatic test fills the drain-waste-vent (DWV) system with water to detect under-slab leaks without excavation.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔬 What the Test Does</h2>
          {[
            ['💧', 'Fill', 'Plumber inflates test ball in main sewer clean-out, fills entire DWV system with water from a toilet.'],
            ['⏱️', 'Hold', 'Technician monitors water level for 15–30 minutes. Stable level = no leaks. Dropping level = leak somewhere below slab.'],
            ['💰', 'Cost', '$150–$300 in DFW. Almost always worth it on homes built before 1990 given cast iron pipe prevalence.'],
          ].map(([icon, label, text]) => (
            <div key={label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{icon}</div>
              <div><div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{label}</div><div style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{text}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🗺️ Interpret Your Test Result</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {[['pass', '✅ Test Passed'], ['fail', '🚨 Test Failed'], ['inconclusive', '⚠️ Inconclusive']].map(([val, label]) => (
              <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: scenario === val ? '#1E3A5F' : 'transparent', borderRadius: 8, padding: '0.6rem 0.75rem', border: `1px solid ${scenario === val ? '#F5E642' : '#2D4A7A'}` }}>
                <input type="radio" name="scenario" value={val} checked={scenario === val} onChange={() => { setScenario(val); setGuide(guides[val]); }} style={{ accentColor: '#F5E642′ }} />
                <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{label}</span>
              </label>
            ))}
          </div>
          {guide && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{guide.title}</div>
              {guide.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', background: '#0F2040', borderLeft: '3px solid #F5E642', padding: '0.75rem', borderRadius: 6 }}>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>💡 {guide.note}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏠 DFW-Specific Risk Factors</h2>
          {['Homes built before 1980: cast iron drain pipes — high corrosion risk in DFW alkaline soil.', 'Homes 1980–1995: galvanized or early PVC — inspect for joint failures at slab penetrations.', 'Post-1995 homes: PVC or ABS — hydrostatic test still recommended near major drainage features.', 'DFW clay soil movement causes pipe shear at grade changes — especially near bathroom clusters.'].map((t, i) => (
            <div key={i} style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #2D4A7A' }}>{t}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW Foundation Resource · 2026</div>
      </div>
    </div>
  );
}