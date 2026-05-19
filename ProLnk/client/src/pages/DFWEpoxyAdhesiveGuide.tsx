import { useState } from 'react';

const adhesives = [
  { app: 'Cracked concrete step', conditions: 'Summer heat 95°F+', type: 'Two-Part Structural Epoxy', workTime: '4 min (DFW summer)', cureTime: '24 hrs full, 4 hrs light load', tip: 'Mix in shade — DFW heat cuts working time in half' },
  { app: 'Ceramic tile bonding', conditions: 'Interior/climate-controlled', type: 'Modified Thinset', workTime: '30 min', cureTime: '24 hrs before grout', tip: 'Standard thinset works; use polymer-modified in wet areas' },
  { app: 'Cabinet hinge repair', conditions: 'Any DFW season', type: 'Contact Cement', workTime: 'Apply both surfaces, wait 5 min', cureTime: 'Instant bond on contact', tip: 'Apply in early morning — DFW heat causes contact cement to skin over fast' },
  { app: 'Baseboard installation', conditions: 'All DFW conditions', type: 'Construction Adhesive (liquid nails)', workTime: '15 min open time', cureTime: '24 hrs light load, 7 days full', tip: 'Substrate expansion in DFW heat — leave 1/16″ gap at corners' },
  { app: 'Metal bracket repair', conditions: 'Extreme heat exposure', type: 'JB Weld (two-part steel-reinforced)', workTime: '25 min (DFW summer: 15 min)', cureTime: '4–6 hrs, full 24 hrs', tip: 'Clean surfaces with acetone before bonding for best adhesion' },
  { app: 'Wood joint repair', conditions: 'Interior, climate-controlled', type: 'PVA Wood Glue', workTime: '10–15 min', cureTime: '1 hr clamp, 24 hrs full', tip: 'DFW low humidity in winter dries wood glue faster than listed' },
];

export default function DFWEpoxyAdhesiveGuide() {
  const [app, setApp] = useState('');
  const [result, setResult] = useState<typeof adhesives[0] | null>(null);

  function lookup() {
    const match = adhesives.find(a =>
      a.app.toLowerCase().includes(app.toLowerCase()) ||
      a.type.toLowerCase().includes(app.toLowerCase())
    );
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔧 Epoxy & Adhesive Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>Choose the right adhesive for DFW repairs. Heat affects working time — know before you mix.</p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F5E642′ }}>
          🌡️ DFW summer temps above 90°F reduce epoxy working time by 40–60%. Always mix in shade and in small batches.
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Adhesive</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter application (e.g. concrete, tile, cabinet...)"
              value={app}
              onChange={e => setApp(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Recommend
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.type}</div>
              <div style={{ color: '#94A3B8', marginBottom: 6 }}>Application: {result.app}</div>
              <div style={{ color: '#FBBF24', marginBottom: 6 }}>⏱️ Working Time: {result.workTime}</div>
              <div style={{ color: '#34D399', marginBottom: 6 }}>✅ Cure Time: {result.cureTime}</div>
              <div style={{ color: '#F5E642′ }}>💡 DFW Tip: {result.tip}</div>
            </div>
          )}
          {app && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>No match — try "concrete", "tile", "wood", "metal", or "cabinet".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Adhesive Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {adhesives.map((a, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{a.app}</span>
                <span style={{ background: '#F5E64220', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 600 }}>{a.type}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Conditions: {a.conditions}</div>
              <div style={{ color: '#FBBF24', fontSize: 13, marginBottom: 4 }}>⏱️ Working time: {a.workTime}</div>
              <div style={{ color: '#34D399', fontSize: 13, marginBottom: 4 }}>✅ Cure: {a.cureTime}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💡 {a.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · Times vary by brand — check manufacturer specs
        </div>
      </div>
    </div>
  );
}
