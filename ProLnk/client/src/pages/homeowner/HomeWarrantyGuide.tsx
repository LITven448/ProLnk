import { useState } from 'react';

const providers = [
  { name: 'American Home Shield', range: '$35–80/mo', note: 'Largest network, flexible plans' },
  { name: 'First American',       range: '$35–60/mo', note: 'Strong HVAC coverage' },
  { name: 'Choice Home Warranty', range: '$30–50/mo', note: 'Budget-friendly option' },
];

const notCovered = [
  'Pre-existing conditions or known defects',
  'Improper installation or code violations',
  'Cosmetic damage (scratches, dents)',
  'Acts of God (floods, earthquakes)',
  'Maintenance neglect or rust/corrosion',
  'Secondary damage caused by covered item',
];

export default function HomeWarrantyGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [hvacAge, setHvacAge] = useState('');
  const [rec, setRec] = useState('');

  function calculate() {
    const h = parseInt(homeAge) || 0;
    const v = parseInt(hvacAge) || 0;
    if (!h || !v) { setRec('Please enter both values.'); return; }
    if (h < 8 && v < 8) {
      setRec('🟢 Warranty probably NOT worth it — your home and HVAC are new. Systems rarely fail under 8 years. Self-insure instead.');
    } else if (h >= 8 && v >= 10) {
      setRec('🔴 Warranty likely WORTH IT — HVAC over 10 years in DFW heat is a high-failure risk. A single compressor replacement ($2,500+) exceeds 2 years of premiums.');
    } else if (v >= 10) {
      setRec('🟡 Consider a warranty focused on HVAC only — your HVAC age is the biggest risk factor. Compare plans that emphasize system coverage.');
    } else {
      setRec('🟡 Borderline case — home is older but HVAC is newer. Review your appliance ages; if dishwasher/fridge/water heater are 8+ years, a warranty may pay off.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64B5F6', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Homeowner Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>
          Home Warranty Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94A3B8', marginBottom: 48 }}>
          Are They Worth It in DFW? An honest breakdown.
        </p>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Warranty vs. Homeowners Insurance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🛡️</div>
              <div style={{ fontWeight: 700, color: '#64B5F6', marginBottom: 12 }}>Home Warranty</div>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
                Covers <strong style={{ color: '#E8EDF5' }}>mechanical breakdown</strong> of appliances and systems — HVAC failure, water heater dying, dishwasher giving out.
              </p>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏠</div>
              <div style={{ fontWeight: 700, color: '#64B5F6', marginBottom: 12 }}>Homeowners Insurance</div>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
                Covers <strong style={{ color: '#E8EDF5' }}>sudden/accidental damage</strong> — fire, storm, theft, burst pipe.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>Why DFW Is Different</h2>
          <div style={{ background: '#1B2E4A', borderRadius: 12, padding: 24, borderLeft: '4px solid #F59E0B' }}>
            <p style={{ color: '#CBD5E1', lineHeight: 1.8, margin: 0 }}>
              DFW's <strong style={{ color: '#F59E0B' }}>hard water</strong> degrades water heaters, dishwashers, and ice makers faster. The <strong style={{ color: '#F59E0B' }}>extreme summer heat</strong> — 100°F+ for weeks — stresses HVAC compressors far harder than cooler climates. A unit rated for 15 years nationally may fail at 10–12 years in DFW.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Top DFW Providers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {providers.map(p => (
              <div key={p.name} style={{ background: '#1E3A5F', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{p.note}</div>
                </div>
                <div style={{ fontWeight: 700, color: '#4ADE80', fontSize: 16 }}>{p.range}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>What They Do NOT Cover</h2>
          <div style={{ background: '#2D1515', borderRadius: 12, padding: 24 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {notCovered.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: '#FCA5A5', fontSize: 14 }}>
                  <span style={{ color: '#EF4444', marginTop: 1 }}>x</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>The Honest Truth</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
            <p style={{ color: '#CBD5E1', lineHeight: 1.8, margin: 0 }}>
              Most DFW homeowners with <strong style={{ color: '#4ADE80' }}>newer homes (under 8 years)</strong> do not need a warranty. Self-insure by putting the premium in savings.<br /><br />
              Older homes <strong style={{ color: '#F59E0B' }}>(10+ years)</strong> may genuinely benefit. A single HVAC compressor replacement runs $2,500–4,500. At $600/year in premiums, one big repair breaks even.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Should YOU Get a Warranty?</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home Age (years)</label>
                <input type="number" min="0" max="100" value={homeAge} onChange={e => setHomeAge(e.target.value)} placeholder="e.g. 12"
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HVAC Age (years)</label>
                <input type="number" min="0" max="50" value={hvacAge} onChange={e => setHvacAge(e.target.value)} placeholder="e.g. 9"
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #2D4A6B', borderRadius: 8, padding: '10px 14px', color: '#FFFFFF', fontSize: 15, boxSizing: 'border-box' }} />
              </div>
            </div>
            <button onClick={calculate}
              style={{ background: '#1D6FE8', color: '#FFFFFF', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              Get My Recommendation
            </button>
            {rec && (
              <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#E8EDF5', lineHeight: 1.7 }}>{rec}</div>
            )}
          </div>
        </section>

        <div style={{ background: 'linear-gradient(135deg, #1D6FE8, #0D47A1)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Know Your Home's Actual Risk First</h3>
          <p style={{ color: '#93C5FD', marginBottom: 24, lineHeight: 1.6 }}>
            Get a TrustyPro scan to identify which systems are aging or at risk. Make an informed decision.
          </p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#F59E0B', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', textDecoration: 'none', fontSize: 16 }}>
            Get Your Home Scanned
          </a>
        </div>

      </div>
    </div>
  );
}
