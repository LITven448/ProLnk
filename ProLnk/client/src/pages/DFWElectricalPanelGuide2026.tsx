import { useState } from 'react';

export default function DFWElectricalPanelGuide2026() {
  const [brand, setBrand] = useState('unknown');
  const [amps, setAmps] = useState('100');
  const [result, setResult] = useState('');

  const assess = () => {
    let safety = '';
    let capacity = '';
    if (brand === 'fpe') {
      safety = '🔴 FIRE HAZARD — Federal Pacific Electric (Stab-Lok) panels have a documented failure rate. Breakers do not trip under overload. Replace immediately — do not wait.';
    } else if (brand === 'zinsco') {
      safety = '🔴 FIRE HAZARD — Zinsco panels have aluminum bus bars that overheat and melt. Breakers fuse in the ON position. Replace immediately.';
    } else if (brand === 'pushmatic') {
      safety = '⚠️ CAUTION — Pushmatic panels are obsolete. Breakers seize with age. Replace within 1-2 years.';
    } else {
      safety = '✅ Brand appears safe. Confirm with licensed electrician during next inspection.';
    }
    if (amps === '60') {
      capacity = '🔴 60A is dangerously undersized for any modern DFW home. Cannot support HVAC, EV charger, or modern appliances. Upgrade to 200A required.';
    } else if (amps === '100') {
      capacity = '⚠️ 100A is borderline. Fine for older homes, but if you have or plan EV charging or new HVAC, upgrade to 200A ($3,000-5,000 with permit).';
    } else {
      capacity = '✅ 200A is the current DFW standard. Sufficient for EV charging, full HVAC, and whole-home loads.';
    }
    setResult(`${safety}

${capacity}`);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Electrical Panel Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>Two recalled panel brands lurk in DFW pre-1990 homes. Know your panel before a fire knows it first.</p>

        <div style={{ background: '#e53e3e22', border: '1px solid #e53e3e', borderRadius: 12, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: 700, color: '#e53e3e', marginBottom: '0.5rem' }}>⚠️ Known Hazardous Panels in DFW Pre-1990 Homes</div>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Federal Pacific Electric (FPE Stab-Lok) and Zinsco panels are fire hazards with documented recall histories. Neither brand is manufactured today.</div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Panel Safety Assessment</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Panel Brand</label><br />
              <select value={brand} onChange={(e) => setBrand(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="unknown">Unknown / Other</option>
                <option value="fpe">Federal Pacific (Stab-Lok)</option>
                <option value="zinsco">Zinsco / Sylvania</option>
                <option value="pushmatic">Pushmatic (Bulldog)</option>
                <option value="square">Square D / Siemens / Eaton</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Amperage</label><br />
              <select value={amps} onChange={(e) => setAmps(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="60">60A</option>
                <option value="100">100A</option>
                <option value="200">200A</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Assess My Panel
          </button>
          {result && result.split(`

`).map((r, i) => (
            <div key={i} style={{ marginTop: '0.75rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>{r}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { icon: '💵', label: 'Panel Upgrade Cost', val: '$3,000–$5,000' },
            { icon: '📋', label: 'Permit Required', val: 'Yes — always' },
            { icon: '🚗', label: '200A Needed For', val: 'EV + HVAC + home' },
            { icon: '⏱️', label: 'Install Time', val: '1 day typical' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{s.val}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}