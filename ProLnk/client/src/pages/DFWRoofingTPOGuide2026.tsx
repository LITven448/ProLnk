import { useState } from 'react';

export default function DFWRoofingTPOGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'flat_new', label: '🏗️ New Flat Roof Construction' },
    { id: 'flat_replace', label: '🔄 Replacing Existing Flat Roof' },
    { id: 'leak', label: '💧 Recurring Leak Issues' },
    { id: 'energy', label: '☀️ High Cooling Bills' },
    { id: 'leed', label: '🌱 Pursuing LEED Certification' },
  ];

  const results: Record<string, { verdict: string; detail: string; color: string }> = {
    flat_new: { verdict: 'TPO Strongly Recommended', detail: 'For DFW new flat roof, specify 60-mil TPO (not 45-mil). White TPO reflects UV radiation, reducing cooling load 10-15%. Heat-welded seams withstand DFW thermal expansion cycles.', color: '#22c55e' },
    flat_replace: { verdict: 'TPO Excellent Choice', detail: 'Replacing EPDM or BUR with white TPO improves energy performance immediately. Verify existing deck can support new membrane. Expect 10-20 year lifespan with DFW UV exposure.', color: '#22c55e' },
    leak: { verdict: 'TPO with Full Adhered System', detail: 'For chronic DFW leaks, specify fully adhered (not mechanically attached) TPO. Full adhesion eliminates billowing and seam stress. Fleece-back TPO adds puncture resistance.', color: '#F5E642′ },
    energy: { verdict: 'White TPO Directly Addresses This', detail: 'DFW black roofs can hit 180°F surface temp. White TPO stays 50-70°F cooler — directly reduces AC load and extends HVAC life. ROI typically 3-5 years through energy savings.', color: '#3b82f6′ },
    leed: { verdict: 'TPO Qualifies for LEED Points', detail: 'White TPO qualifies for LEED v4 SS Credit: Heat Island Reduction. Must meet SRI (Solar Reflectance Index) minimum 78 for low-slope roofs. Get manufacturer SRI documentation.', color: '#a855f7′ },
  };

  const handleCheck = () => {
    if (situation && results[situation]) setResult(situation);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>TPO Membrane Roofing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>TPO is the dominant flat roofing choice in DFW — white surface reflects brutal Texas sun and heat-welded seams handle 110°F+ expansion cycles.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>📋 TPO DFW Specifications</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['📏','60 Mil vs 45 Mil','Always specify 60-mil in DFW. UV degradation and thermal cycling require the extra thickness. 45-mil is rated for milder climates — DFW heat destroys it prematurely.'],
              ['☀️','White Surface Reflectance','White TPO reflects 80%+ of solar radiation vs EPDM black at 6%. In DFW summer, this means surface temps 50-70°F cooler and measurable AC savings.'],
              ['🔥','Heat-Welded Seams','TPO seams are hot-air welded at 1,000°F — creates monolithic bond stronger than the membrane itself. DFW thermal expansion makes welded seams critical vs tape or adhesive.'],
              ['⏱️','10-20 Year Lifespan','Quality 60-mil TPO with proper installation and annual inspection lasts 15-20 years in DFW. Cheaper 45-mil mechanically attached systems degrade in 10-12 years.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 TPO Feasibility Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Select your flat roof situation:</p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: situation === s.id ? '#F5E642′ : '#1e3a5f', background: situation === s.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{s.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Check TPO Feasibility</button>
          {result && results[result] && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${results[result].color}`, background: '#0A1628′ }}>
              <div style={{ color: results[result].color, fontWeight: 700, marginBottom: '0.4rem' }}>{results[result].verdict}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{results[result].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW Roofing Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk connects you with certified DFW roofing contractors experienced in TPO membrane installation.</div>
        </div>
      </div>
    </div>
  );
}
