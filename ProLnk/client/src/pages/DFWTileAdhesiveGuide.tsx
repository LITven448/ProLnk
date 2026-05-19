import { useState } from 'react';

const adhesiveMatrix = [
  { size: 'Small (under 12")', location: 'Interior Dry', adhesive: 'Mastic (Type 1)', coverage: '40–50 sq ft/gal', backButter: false, note: 'Mastic is fine for dry interior small tile.' },
  { size: 'Small (under 12")', location: 'Interior Wet', adhesive: 'Modified Thinset', coverage: '40–50 sq ft/bag', backButter: false, note: 'Never use mastic in showers — DFW humidity causes mastic failure.' },
  { size: 'Medium (12"–18")', location: 'Interior Dry', adhesive: 'Modified Thinset', coverage: '40–50 sq ft/bag', backButter: true, note: 'Back-butter for full coverage on medium tile.' },
  { size: 'Medium (12"–18")', location: 'Interior Wet', adhesive: 'Modified Thinset', coverage: '40–50 sq ft/bag', backButter: true, note: 'Back-butter mandatory in wet areas.' },
  { size: 'Large Format (18"+)', location: 'Interior Dry', adhesive: 'Medium-Bed Mortar', coverage: '30–40 sq ft/bag', backButter: true, note: 'DFW homes require medium-bed for large format — prevents hollow spots from subfloor flex.' },
  { size: 'Large Format (18"+)', location: 'Interior Wet', adhesive: 'Medium-Bed Mortar', coverage: '30–40 sq ft/bag', backButter: true, note: 'Medium-bed + back-butter mandatory. DFW clay subfloor movement requires full coverage.' },
  { size: 'Any', location: 'Exterior DFW', adhesive: 'Epoxy Adhesive', coverage: '20–30 sq ft/unit', backButter: true, note: 'DFW exterior: epoxy only. Thinset and mastic fail under 100°F+ patio heat cycling.' },
];

export default function DFWTileAdhesiveGuide() {
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<typeof adhesiveMatrix[0] | null>(null);

  function calculate() {
    const match = adhesiveMatrix.find(a => (a.size === size || a.size === 'Any') && a.location === location);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>🪟 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Tile Adhesive Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's clay subfloors flex seasonally, summers hit 110°F, and showers run with hard water daily. The wrong adhesive fails — mastic in a DFW shower is a guarantee of tile pop-off within 2 years.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 DFW Adhesive Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Tile Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select tile size...</option>
              <option>Small (under 12")</option>
              <option>Medium (12"–18")</option>
              <option>Large Format (18"+)</option>
              <option>Any</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>DFW Application</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select application...</option>
              <option>Interior Dry</option>
              <option>Interior Wet</option>
              <option>Exterior DFW</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Adhesive Spec</button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: '#F5E642' }}>🪟 Adhesive Recommendation</div>
            {result.backButter && <div style={{ background: '#b45309', color: '#fff', borderRadius: 6, padding: '8px 14px', marginBottom: 12, fontWeight: 700 }}>⚠️ Back-Buttering Required — apply thin coat of thinset to tile back before setting</div>}
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['Adhesive Type', result.adhesive],
                ['Coverage Rate', result.coverage],
                ['Back-Butter', result.backButter ? 'Yes — required' : 'No'],
                ['DFW Note', result.note],
              ].map(([label, value], i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label as string}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{value as string}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>❌ DFW Adhesive Failures to Avoid</h2>
          {[
            { icon: '🚫', title: 'Mastic in Wet Areas', desc: 'Mastic is organic-based. DFW shower steam dissolves it within 1–2 years. Tiles pop off entire walls. Always use modified thinset in any wet area.' },
            { icon: '🚫', title: 'Standard Thinset on Exterior', desc: 'DFW exterior tiles experience 80°F daily temperature swings in summer. Standard thinset cracks. Epoxy adhesive is the only exterior solution that holds.' },
            { icon: '🚫', title: 'No Back-Butter on Large Format', desc: 'DFW subfloors flex with clay expansion. Large format tile without back-buttering creates hollow spots that crack under foot traffic within months.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.icon} {item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Tile Installer?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Large format tile, exterior applications, or shower regrouting require a licensed installer. ProLnk connects DFW homeowners with vetted tile pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
