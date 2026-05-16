import { useState } from 'react';

const PSI_DATA: Record<string, Record<string, { psi: string; tip: string; note: string }>> = {
  concrete: {
    'General cleaning': { psi: '2000–2500', tip: '25°', note: 'DFW concrete spalls above 3000 PSI — stay conservative.' },
    'Oil/grease stain': { psi: '2500–3000', tip: '15°', note: 'Pre-treat with degreaser; let dwell 5 min before rinsing.' },
    'Mold/algae': { psi: '2000', tip: '25°', note: 'Add sodium hypochlorite to down-stream injector first.' },
  },
  wood_deck: {
    'General cleaning': { psi: '500–800', tip: '40°', note: 'Always sweep with wood grain to prevent fuzz and fiber lift.' },
    'Stain prep': { psi: '800–1200', tip: '25°', note: 'Let dry 48 h in DFW heat before applying stain.' },
    'Mold/algae': { psi: '600', tip: '40°', note: 'Use wood-safe cleaner; high PSI can etch soft wood fibers.' },
  },
  brick: {
    'General cleaning': { psi: '1200–1500', tip: '25°', note: 'Avoid mortar joints — high PSI erodes DFW lime mortar.' },
    'Efflorescence': { psi: '1500', tip: '15°', note: 'White mineral deposits common in DFW clay soil areas.' },
    'Mold/algea': { psi: '1000', tip: '40°', note: 'Wide fan reduces mortar joint risk significantly.' },
  },
  vinyl_siding: {
    'General cleaning': { psi: '1200–1500', tip: '40°', note: 'Never exceed 1500 PSI — vinyl warps in DFW summer heat.' },
    'Mold/algae': { psi: '1000', tip: '40°', note: 'Top-down only; water behind panels causes rot.' },
    'Paint prep': { psi: '1200', tip: '25°', note: 'Let dry fully; DFW humidity can spike even in summer evenings.' },
  },
};

const HEAT_TIPS = [
  'Start before 10 AM — DFW summer afternoons exceed 100°F, reducing motor lifespan.',
  'Keep the pump in shade; direct sun on a black housing adds 20–30°F internally.',
  'Electric models overheat faster in DFW heat — take 10-min breaks every 45 min.',
  'Water from outdoor spigots can reach 80°F+ in summer, reducing cleaning effectiveness.',
  'Store the machine indoors; UV degrades plastic fittings and hoses quickly in DFW.',
];

export default function DFWPressureWasherSafetyGuide() {
  const [surface, setSurface] = useState('');
  const [purpose, setPurpose] = useState('');
  const result = surface && purpose ? PSI_DATA[surface]?.[purpose] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💦</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Pressure Washer Safety Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Right PSI, right tip, right technique for North Texas surfaces</p>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚠️ DFW-Specific Risks</h2>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
            <li>DFW concrete (especially post-2000 slabs) uses softer aggregate — exceeding 3000 PSI causes spalling</li>
            <li>Clay soil expansion creates micro-cracks; high-PSI water intrusion accelerates foundation movement</li>
            <li>Extreme summer heat degrades hoses, seals, and pump oil faster than manufacturer specs assume</li>
            <li>Hard DFW water leaves mineral deposits on surfaces if not rinsed immediately</li>
          </ul>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 PSI Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Surface Type</label>
              <select value={surface} onChange={e => { setSurface(e.target.value); setPurpose(''); }}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select surface...</option>
                {Object.keys(PSI_DATA).map(s => <option key={s} value={s}>{s.replace('_', ' ').replace(/\w/g, c => c.toUpperCase())}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>Purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)} disabled={!surface}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem', opacity: surface ? 1 : 0.5 }}>
                <option value=''>Select purpose...</option>
                {surface && Object.keys(PSI_DATA[surface]).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>RECOMMENDED PSI</span><br /><span style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{result.psi}</span></div>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>NOZZLE TIP</span><br /><span style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{result.tip}</span></div>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>💡 {result.note}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ DFW Heat Performance Tips</h2>
          {HEAT_TIPS.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span><span>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#1e2d47', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Need a pro pressure washer in DFW?</p>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>Find DFW Pros on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
