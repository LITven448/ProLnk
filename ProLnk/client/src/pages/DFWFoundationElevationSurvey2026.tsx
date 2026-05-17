import { useState } from 'react';

export default function DFWFoundationElevationSurvey2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    const map: Record<string, string> = {
      sloping: '📐 Sloping Floors: A Ziplevel survey maps every slab point to 0.01″. If differential exceeds 1.5″ over 20 feet, most DFW engineers recommend pier evaluation. Your ProLnk Vault baseline tells you if it is getting worse.',
      cracks: '🔍 Cracks in Drywall or Brick: Survey first — cracks alone do not confirm movement. If survey shows <0.5″ differential, cracks are likely cosmetic settling. If >1.5″, structural evaluation is warranted.',
      doors: '🚪 Sticking Doors and Windows: DFW clay expansion and contraction is the #1 cause. Survey establishes whether the slab is moving or the frame is racking from other causes. Seasonal re-check recommended.',
      purchase: '🏡 Pre-Purchase Inspection: Always get an elevation survey on DFW resales built before 2000. Ask for Ziplevel report with high/low point differential and a 5-year trend comparison if available.',
    };
    setResult(map[concern] || 'Select your elevation concern above.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          📏 DFW Foundation Elevation Survey Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          What an elevation survey reveals about DFW foundations — topographic mapping, differential analysis, and repair scope determination.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🗺️', title: 'Topographic Slab Map', desc: 'Laser leveling of all floor slab points creates a full topographic map of your DFW foundation — high spots, low spots, and slopes.' },
            { icon: '📊', title: 'Differential Elevation', desc: 'The difference between highest and lowest points determines repair scope. Under 1″ is typical DFW variation; over 2″ warrants pier evaluation.' },
            { icon: '📅', title: 'Trend Comparison', desc: 'Annual surveys stored in ProLnk Vault show whether your DFW foundation is actively moving or stable — critical for repair decisions.' },
            { icon: '🏗️', title: 'Pier Placement Planning', desc: 'Survey data directly informs engineer-specified pier locations and depths for DFW expansive clay conditions.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📋 Elevation Survey Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>What is your foundation elevation concern?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
              <option value="">Select your concern...</option>
              <option value="sloping">Sloping or uneven floors</option>
              <option value="cracks">Cracks in drywall or brick</option>
              <option value="doors">Sticking doors or windows</option>
              <option value="purchase">Pre-purchase home inspection</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get My Survey Guide
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}