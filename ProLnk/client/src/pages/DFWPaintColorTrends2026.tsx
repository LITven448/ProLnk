import { useState } from 'react';

const guides: Record<string, Record<string, string>> = {
  small: {
    modern: 'Sherwin-Williams Upward (SW 6239) — a soft, airy blue gaining traction in DFW. Makes small modern rooms feel larger.',
    traditional: 'Accessible Beige (SW 7036) — warm taupe replacing cool grays. Timeless for traditional DFW homes.',
    farmhouse: 'Alabaster (SW 7008) — crisp warm white. Pairs perfectly with shiplap and wood accents.',
    bold: 'Naval (SW 6244) — deep navy for accent walls. High contrast in smaller rooms = dramatic without overwhelming.',
  },
  medium: {
    modern: 'Tricorn Black (SW 6258) on trim — bold trim color trend sweeping DFW in 2026. Pair with light walls.',
    traditional: 'Antique White (SW 6119) — warm, livable. Pair with brushed gold accents for 2026 DFW traditional look.',
    farmhouse: 'Moderate White (SW 6140) — sits between white and greige. Works in Texas natural light.',
    bold: 'Jasper (SW 6216) — earthy green dominating accent walls in DFW 2026. Pairs with warm woods.',
  },
  large: {
    modern: 'Repose Gray (SW 7015) — neutral that reads warm in DFW sunlight. Whole-room use in large modern spaces.',
    traditional: 'Accessible Beige (SW 7036) — open floor plan warm taupe. DFW builder standard for good reason.',
    farmhouse: 'Creamy (SW 7012) — warm off-white for large farmhouse rooms. Works with exposed wood beams.',
    bold: 'Cavern Clay (SW 7701) — terracotta-inspired, Texas-appropriate earthy red. Accent or full-room in large spaces.',
  },
};

export default function DFWPaintColorTrends2026() {
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const rec = size && style ? guides[size]?.[style] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🎨</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Paint Color Trends 2026</h1>
          <p style={{ color: '#94a3b8' }}>What DFW homeowners are putting on their walls right now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Top DFW Paint Trends 2026</h2>
          {[
            ['🌊', 'SW Upward (light blue) popular across DFW', 'Sherwin-Williams Color of the Year surrogate — soft, spa-like blue seeing major DFW uptake'],
            ['🟤', 'Warm taupes replacing cool grays', 'Accessible Beige, Agreeable Gray, Creamy — cool grays now feel dated in DFW'],
            ['🖼️', 'Accent walls still common', 'One bold wall per room — limewash, dark green, navy, or terracotta dominate'],
            ['🖤', 'Interior trim going bold', 'Dark green (Jasper), navy (Naval), black (Tricorn) on trim and doors — huge DFW 2026 trend'],
            ['🏡', 'HOA restrictions on exterior colors', 'Most DFW suburban HOAs limit exterior palettes — verify before painting exterior'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Room Size + Style → 2026 DFW Paint Color Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Room Size</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['small', 'medium', 'large'].map(s => <button key={s} onClick={() => setSize(s)} style={{ background: size === s ? '#F5E642' : '#1a3050', color: size === s ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 6, padding: '0.5rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>)}
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Style Preference</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['modern', 'traditional', 'farmhouse', 'bold'].map(s => <button key={s} onClick={() => setStyle(s)} style={{ background: style === s ? '#F5E642' : '#1a3050', color: style === s ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 6, padding: '0.5rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>)}
            </div>
          </div>
          {rec && <div style={{ background: '#1a3050', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642', color: '#cbd5e1', fontSize: '0.92rem' }}>🎨 {rec}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>⚠️ DFW Exterior Paint — HOA Alert</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>Most Plano, Frisco, Allen, McKinney, and Prosper HOAs require pre-approval for exterior paint changes. Submit color samples to your HOA architectural committee before buying paint. Violation fines range $100–$500/month.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — DFW Home Service Professionals
        </div>
      </div>
    </div>
  );
}