import { useState } from 'react';

const lotSizes = ['Under 7,500 sqft', '7,500–12,000 sqft', '12,000–20,000 sqft', '20,000–40,000 sqft', 'Over 40,000 sqft (1 acre+)'];
const budgets = ['Under $3,000', '$3,000–$6,000', '$6,000–$12,000', '$12,000–$25,000', '$25,000+'];

interface LandscapePackage {
  name: string;
  includes: string[];
  hoaNote: string;
  timeline: string;
  color: string;
}

function getPackage(lot: string, hasHOA: boolean, budget: string): LandscapePackage {
  const highBudget = budget === '$12,000–$25,000′ || budget === '$25,000+';
  const midBudget = budget === '$6,000–$12,000';
  const isLarge = lot === '20,000–40,000 sqft' || lot === 'Over 40,000 sqft (1 acre+)';

  if (budget === 'Under $3,000') return {
    name: 'Essential Refresh Package',
    includes: ['Lawn aeration and overseeding', 'Mulch refresh in existing beds', 'Shrub trimming and cleanup', 'Edge definition along walks and drives'],
    hoaNote: hasHOA ? 'HOA tip: Focus on mowing height, edging, and bed weed control — these are the most-cited HOA violations in Keller.' : 'Good starting point for curb appeal without large investment.',
    timeline: '1–2 days',
    color: '#22c55e'
  };

  if (isLarge && highBudget) return {
    name: 'Keller Estate Landscape Package',
    includes: ['Full xeriscape design with drought-tolerant natives', 'Irrigation system with smart controller', 'Decomposed granite or flagstone hardscape zones', 'Tree planting (live oak, cedar elm) for canopy', 'Lighting package for safety and ambiance', 'HOA-compliant plant palette throughout'],
    hoaNote: hasHOA ? 'HOA compliant: Keller HOAs typically require 60%+ maintained turf or approved xeriscape. We submit plans for HOA approval before work begins.' : 'Large lot deserves full design — we handle everything from permit to plant.',
    timeline: '2–4 weeks',
    color: '#F5E642'
  };

  if (highBudget || (midBudget && isLarge)) return {
    name: 'Keller Premium Xeriscape + Irrigation Package',
    includes: ['Xeriscape design with Texas-native plants', 'Smart irrigation system (Rachio or Hunter)', 'Flagstone or decomposed granite walkways', 'Ornamental tree installation', 'Seasonal color planting beds', 'Full weed barrier and mulch system'],
    hoaNote: hasHOA ? 'HOA note: We have experience with Keller HOAs and submit plant lists and design plans for approval in advance.' : 'Premium install that cuts water bills 40-60% vs traditional turf.',
    timeline: '1–2 weeks',
    color: '#F5E642'
  };

  if (midBudget) return {
    name: 'Keller Curb Appeal Package',
    includes: ['Irrigation tune-up or new drip zones', 'Foundation planting refresh', 'Seasonal color annuals in key beds', 'Lawn renovation (aerate, overseed, fertilize)', 'Decorative mulch throughout'],
    hoaNote: hasHOA ? 'HOA safe: All plantings stay within Keller HOA approved plant lists. We verify before ordering.' : 'Great mid-range refresh that significantly improves resale value.',
    timeline: '3–5 days',
    color: '#22c55e'
  };

  return {
    name: 'Keller Starter Landscape Package',
    includes: ['Lawn aeration and bermuda overseeding', 'Mulch refresh (2-3 inch depth)', 'Shrub trimming and shape', 'Minor bed weeding and cleanup', 'Edge all hardscape borders'],
    hoaNote: hasHOA ? 'HOA essentials covered: edging, mowing height, and bed maintenance are the top three HOA concerns in Keller neighborhoods.' : 'Budget-friendly refresh that makes a big visual impact.',
    timeline: '1–2 days',
    color: '#22c55e'
  };
}

export default function DFWLandscaperKeller() {
  const [lotSize, setLotSize] = useState('');
  const [hasHOA, setHasHOA] = useState<boolean | null>(null);
  const [budget, setBudget] = useState('');
  const result = lotSize && hasHOA !== null && budget ? getPackage(lotSize, hasHOA, budget) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
            🌿 Keller, TX
          </span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Keller TX Landscapers —{' '}
          <span style={{ color: '#F5E642′ }}>Upscale Suburb Specialists</span>
        </h1>

        <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 700 }}>
          Keller is one of DFW's most affluent suburbs — with large lots, high HOA standards, and growing
          demand for drought-tolerant xeriscape as water restrictions tighten. Local landscapers need to
          know Keller HOA rules and Texas native plants.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🏡', title: 'HOA Compliance Experts', desc: 'Keller HOAs are strict. We know the plant lists, height rules, and approval processes for Keller neighborhoods.' },
            { icon: '🌵', title: 'Xeriscape Specialists', desc: 'Texas-native drought-tolerant designs cut water bills 40-60%. We design, permit, and install from scratch.' },
            { icon: '💧', title: 'Smart Irrigation Systems', desc: 'Rachio and Hunter smart controllers with weather-based scheduling. Required by many Keller HOAs during drought restrictions.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f', marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🌿 Keller Landscape Package Finder</h2>
          <p style={{ color: '#94a3b8', marginBottom: 28 }}>
            Tell us about your Keller property and we will recommend the right landscape package for your situation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}>
                <option value="">Select lot size...</option>
                {lotSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#F5E642′ }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: 'white', fontSize: 15 }}>
                <option value="">Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#F5E642′ }}>HOA Community?</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {[true, false].map(val => (
                <button key={String(val)} onClick={() => setHasHOA(val)}
                  style={{ padding: '10px 24px', borderRadius: 8, border: `2px solid ${hasHOA === val ? '#F5E642' : '#2d4a7a'}`, background: hasHOA === val ? '#F5E642′ : ’transparent', color: hasHOA === val ? '#0A1628′ : ’white', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                  {val ? 'Yes, I have an HOA' : 'No HOA'}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 4 }}>RECOMMENDED PACKAGE</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: result.color, marginBottom: 16 }}>{result.name}</div>
              <div style={{ marginBottom: 16 }}>
                {result.includes.map(item => (
                  <div key={item} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ background: '#111f3a', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>🏡 HOA Note: </span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{result.hoaNote}</span>
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>⏱️ Typical timeline: {result.timeline}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111f3a', borderRadius: 16, padding: 40, border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌿</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Get Keller Landscaper Quotes Today</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk connects you with Keller-area landscapers who know HOA requirements and local plant conditions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '16px 40px', borderRadius: 10, fontWeight: 800, fontSize: 17, border: 'none', cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>

      </div>
    </div>
  );
}
