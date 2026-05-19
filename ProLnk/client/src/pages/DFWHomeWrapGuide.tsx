import { useState } from 'react';

const exteriorTypes = ['Red Brick', 'Painted Brick', 'Stucco', 'Vinyl Siding', 'Wood Siding', 'Hardie Plank / Fiber Cement'];
const budgets = ['$5,000 – $15,000', '$15,000 – $35,000', '$35,000 – $75,000', '$75,000+'];
const goals = ['Update the look without major cost', 'Increase curb appeal for sale', 'Fix damaged or deteriorating exterior', 'Complete transformation'];

type Recommendation = {
  approach: string;
  methods: { name: string; desc: string; cost: string }[];
  vsPaint: string;
  timeline: string;
  roi: string;
};

const recommendations: Record<string, Record<string, Recommendation>> = {
  'Red Brick': {
    '$5,000 – $15,000': {
      approach: 'Limewash or Romabio masonry paint for dramatic brick transformation',
      methods: [
        { name: 'Limewash Paint', desc: 'Breathable mineral paint that soaks into brick — creates European aged look', cost: '$4–7/sq ft installed' },
        { name: 'German Smear / Mortar Wash', desc: 'Partial mortar coating for old-world texture — very popular in DFW in 2026', cost: '$5–9/sq ft installed' },
      ],
      vsPaint: 'Full exterior paint on brick: $8–15K. Limewash costs similar but is reversible and breathable — better long-term.',
      timeline: '3–5 days for average DFW home',
      roi: 'High curb appeal return — modernized brick is in high demand in DFW 2026 market',
    },
    '$35,000 – $75,000': {
      approach: 'Stone veneer accent + stucco overlay on rear/side elevations',
      methods: [
        { name: 'Cultured Stone Veneer', desc: 'Manufactured stone applied over brick — transforms front elevation dramatically', cost: '$18–30/sq ft installed' },
        { name: 'Stucco Overlay on Brick', desc: 'Scratch coat + finish coat over brick — smooth or textured finish options', cost: '$12–18/sq ft installed' },
      ],
      vsPaint: 'Full reside with Hardie Plank: $40–80K. Stone veneer on key elevations at same cost with higher perceived value.',
      timeline: '2–4 weeks for full elevation transformation',
      roi: 'Premium approach — adds $40–80K perceived value in DFW market per appraisers',
    },
    '$15,000 – $35,000': {
      approach: 'Limewash + fiber cement accent panels on gable ends and garage area',
      methods: [
        { name: 'Limewash Full Exterior', desc: 'Complete brick limewash for whole-home transformation', cost: '$12–20K for full DFW home' },
        { name: 'Fiber Cement Accent', desc: 'Hardie panel on garage face or gable ends for contrast detail', cost: '$8–15K for accent areas' },
      ],
      vsPaint: 'Combined approach beats full repaint cost while achieving more dramatic results.',
      timeline: '1–2 weeks total project',
      roi: 'Strong return — limewashed brick homes sell faster in DFW according to 2025 data',
    },
    '$75,000+': {
      approach: 'Full exterior transformation: stone veneer + stucco + new windows + trim system',
      methods: [
        { name: 'Natural Stone Veneer', desc: 'Real quarried stone applied to key elevations — premium DFW curb appeal', cost: '$25–45/sq ft installed' },
        { name: 'Full Stucco System (3-coat)', desc: 'Traditional 3-coat stucco over entire facade — luxury finish', cost: '$18–28/sq ft installed' },
      ],
      vsPaint: 'At this budget, full exterior transformation beats any paint/partial solution for value.',
      timeline: '4–8 weeks for complete transformation',
      roi: 'Maximum ROI — transforms home value by $100K+ in premium DFW submarkets',
    },
  },
};

const fallbackRec: Recommendation = {
  approach: 'Exterior refresh options for your combination — consult a DFW exterior contractor for exact pricing',
  methods: [
    { name: 'Paint / Limewash', desc: 'Most affordable update for most exterior types — 5–10 year lifespan', cost: '$5–15/sq ft installed' },
    { name: 'Fiber Cement Overlay', desc: 'Hardie Plank or panel over existing substrate for durability', cost: '$12–25/sq ft installed' },
    { name: 'Stone / Stucco Accent', desc: 'Spot upgrade key elevations for maximum visual impact', cost: '$15–35/sq ft installed' },
  ],
  vsPaint: 'Full exterior paint runs $8–20K for DFW homes. Overlay systems cost more upfront but last 2–3x longer.',
  timeline: '1–4 weeks depending on scope and DFW contractor availability',
  roi: 'Exterior upgrades return $0.70–$1.20 for every dollar spent in DFW market',
};

export default function DFWHomeWrapGuide() {
  const [exterior, setExterior] = useState('');
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');

  const result = exterior && budget ? (recommendations[exterior]?.[budget] ?? fallbackRec) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2A40 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Home Exterior Refresh Guide</h1>
        <p style={{ color: '#A0B0C8', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>Beyond paint — limewash, stone veneer, stucco overlay, and fiber cement options for DFW homes. Find the right approach for your exterior, budget, and goals.</p>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, margin: '32px 0 20px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>🔥 2026 DFW Exterior Trends</h2>
          {['Limewash on red brick is the #1 DFW exterior trend replacing gray exterior paint', 'Cultured stone veneer on garage face + stucco body is climbing fast in Frisco/Prosper', 'White/cream stucco over brick is popular in Preston Hollow and Southlake submarkets', 'Fiber cement board & batten accent walls replacing plain vinyl on older DFW homes'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>→</span>
              <span style={{ color: '#C0D0E0', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>🔍 Get Your Exterior Refresh Recommendation</h2>
          {[
            { label: 'Current Exterior Type', value: exterior, setter: setExterior, options: exteriorTypes },
            { label: 'Budget Range', value: budget, setter: setBudget, options: budgets },
            { label: 'Primary Goal', value: goal, setter: setGoal, options: goals },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#A0B0C8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8E8E8', border: '1px solid #2A4A6F', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, border: '2px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📋 Recommended Approach</div>
              <p style={{ color: '#C0D0E0', fontSize: 14, margin: '0 0 16px' }}>{result.approach}</p>
              {result.methods.map(m => (
                <div key={m.name} style={{ background: '#112240', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{m.name} — <span style={{ color: '#A0C8A0′ }}>{m.cost}</span></div>
                  <div style={{ color: '#C0D0E0', fontSize: 13, marginTop: 4 }}>{m.desc}</div>
                </div>
              ))}
              {[
                { label: '⚖️ vs. Full Repaint/Reside', value: result.vsPaint },
                { label: '📅 Timeline', value: result.timeline },
                { label: '💰 DFW ROI', value: result.roi },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginTop: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#C0D0E0', fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
