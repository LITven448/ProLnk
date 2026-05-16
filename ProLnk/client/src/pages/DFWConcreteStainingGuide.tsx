import { useState } from 'react';

const ages = ['New (0–2 years)', 'Mid-Age (3–10 years)', 'Old (10+ years)', 'Previously Sealed', 'Previously Painted'];
const looks = ['Earthy / Natural Tones', 'Bold / Vibrant Colors', 'Marble / Luxury Look', 'Uniform / Solid Color'];
const locations = ['Interior Floor', 'Patio', 'Driveway', 'Pool Deck', 'Commercial Space'];

type Result = { type: string; process: string; cost: string; climate: string; note: string };

function getResult(age: string, look: string, location: string): Result | null {
  if (!age || !look || !location) return null;
  const isPreviouslyCoated = age.includes('Sealed') || age.includes('Painted');
  const isOld = age.includes('Old');
  const isNew = age.includes('New');
  const isExterior = location !== 'Interior Floor';

  if (isPreviouslyCoated) {
    return { type: 'Surface Cannot Be Stained As-Is', process: 'Strip existing coating → test for porosity → if porous: acid stain or water-based', cost: 'Strip: $1–$2/sq ft + stain cost', climate: 'DFW UV degrades coatings fast — strip carefully in spring/fall', note: 'Concrete must be bare and porous to accept stain — sealed or painted surfaces block penetration entirely' };
  }
  if (look === 'Earthy / Natural Tones' && !isExterior) {
    return { type: 'Acid Stain (Reactive)', process: 'Acid etch → acid stain → neutralize → seal with penetrating sealer', cost: '$2–$4/sq ft installed', climate: 'DFW alkaline soils raise concrete pH — acid stain reacts variably, patch test first', note: 'Acid stain creates permanent, mottled, one-of-a-kind look. Cannot be removed or corrected' };
  }
  if (look === 'Earthy / Natural Tones' && isExterior) {
    return { type: 'Water-Based Stain + UV Sealer', process: 'Clean → light etch → water-based stain → UV-stable penetrating sealer', cost: '$1.50–$3.50/sq ft installed', climate: 'DFW UV bleaches acid stains on exterior surfaces within 2–3 years — water-based + UV sealer lasts longer outside', note: 'Acid stain fades on DFW patios and driveways — use water-based with UV sealer for exterior longevity' };
  }
  if (look === 'Bold / Vibrant Colors') {
    return { type: 'Water-Based Concrete Stain', process: 'Prep → etch → water-based stain (multiple coats for saturation) → sealer', cost: '$1.50–$3/sq ft installed', climate: 'Bold colors need UV-blocking sealer in DFW — reapply sealer every 2–3 years', note: 'Water-based stain is the only way to achieve true vibrant colors — acid stain cannot produce consistent bold hues' };
  }
  if (look === 'Marble / Luxury Look') {
    return { type: 'Decorative Overlay + Stain Combo', process: 'Skim coat overlay → stain → high-gloss polyurea or polyurethane topcoat', cost: '$4–$8/sq ft installed', climate: 'Overlay systems hide DFW clay-soil cracks — but must be flexible enough for seasonal movement', note: 'True marble look requires overlay + stain + gloss topcoat — stain alone on bare concrete cannot replicate this look' };
  }
  if (look === 'Uniform / Solid Color') {
    return { type: 'Water-Based Concrete Stain (Opaque Formula)', process: 'Etch → opaque water-based stain → penetrating sealer', cost: '$1.50–$3/sq ft installed', climate: 'Opaque stains handle DFW UV better than semi-transparent — more pigment = more UV blocking', note: 'Acid stain cannot produce solid/uniform color — water-based opaque formula is the right choice for consistency' };
  }
  if (isNew) {
    return { type: 'Wait — Then Water-Based Stain', process: 'Wait 28+ days → test pH → light etch → stain', cost: '$1.50–$3/sq ft installed', climate: 'DFW summer heat cures concrete fast but alkalinity stays high — test pH before staining', note: 'New DFW concrete is often too alkaline for acid stain — water-based is safer for concrete under 6 months old' };
  }
  if (isOld) {
    return { type: 'Acid Stain (Ideal for Aged Concrete)', process: 'Degrease → acid wash → acid stain → neutralize → seal', cost: '$2–$4/sq ft installed', climate: 'Aged DFW concrete has lower alkalinity — acid stain reacts more predictably on older slabs', note: 'Old concrete often stains more beautifully with acid — the weathering creates richer mottling effects' };
  }
  return { type: 'Water-Based Concrete Stain', process: 'Etch → stain → seal', cost: '$1.50–$3/sq ft installed', climate: 'Use UV-stable sealer for DFW exterior', note: 'Standard water-based stain works well for most DFW concrete applications' };
}

export default function DFWConcreteStainingGuide() {
  const [age, setAge] = useState('');
  const [look, setLook] = useState('');
  const [location, setLocation] = useState('');
  const result = getResult(age, look, location);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎭</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Concrete Staining Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          Concrete staining transforms floors, patios, and driveways — but DFW's alkaline soil, UV intensity, and clay movement affect how stains behave and how long they last.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { emoji: '⚗️', title: 'Acid Stain', text: 'Permanent chemical reaction. Mottled, earthy, unique look. Cannot produce vibrant colors. Best for interiors.' },
            { emoji: '💧', title: 'Water-Based Stain', text: 'Broad color range, UV-stable options, more predictable results. Better for DFW exterior surfaces.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{item.title}</div>
              <div style={{ color: '#aac', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🌿 How DFW Soil Affects Staining</h2>
          <ul style={{ color: '#ccd', lineHeight: 2, paddingLeft: '1.25rem', margin: 0 }}>
            <li>DFW concrete often has high pH from alkaline clay soil contact — acid stain reacts unpredictably</li>
            <li>Always test pH before staining: 6–8 is ideal, above 9 needs neutralizing wash first</li>
            <li>DFW UV bleaches semi-transparent stains within 2 seasons on exterior surfaces</li>
            <li>Clay soil movement creates micro-cracks — stain will highlight, not hide, existing cracks</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔬 Get Your Staining Recommendation</h2>
          {[
            { label: 'Concrete Age', value: age, setter: setAge, options: ages, placeholder: 'Select concrete age...' },
            { label: 'Desired Look', value: look, setter: setLook, options: looks, placeholder: 'Select desired look...' },
            { label: 'Location', value: location, setter: setLocation, options: locations, placeholder: 'Select location...' },
          ].map(({ label, value, setter, options, placeholder }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
                <option value=''>{placeholder}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Staining Recommendation</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#aac' }}>Staining Type: </span><strong>{result.type}</strong></div>
              <div><span style={{ color: '#aac' }}>Process: </span><strong>{result.process}</strong></div>
              <div><span style={{ color: '#aac' }}>Estimated Cost: </span><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div><span style={{ color: '#aac' }}>DFW Climate Consideration: </span><em style={{ color: '#ccf' }}>{result.climate}</em></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                💡 {result.note}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📌 DFW Staining Rules of Thumb</h2>
          <ol style={{ color: '#ccd', lineHeight: 2.2, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Concrete must be bare, porous, and clean — stain cannot penetrate sealed or painted surfaces</li>
            <li>Always test in a small inconspicuous area — DFW concrete varies block-to-block</li>
            <li>Apply sealer within 24 hours of staining to lock in color</li>
            <li>Best application temps: 50–85°F — avoid DFW summer afternoons</li>
            <li>Acid stain is permanent — water-based stain can sometimes be lightened with muriatic acid wash</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
