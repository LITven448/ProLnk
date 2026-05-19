import { useState } from 'react';

const exposures = ['Light — Tree Cover, North Side', 'Moderate — Mixed Sun/Shade', 'Heavy — Open Sky, Large Roof Area'];
const budgets = ['Budget ($3–5/linear ft)', 'Mid-Range ($5–8/linear ft)', 'Premium ($8–15+/linear ft)'];
const hailHistory = ['None in 5 Years', '1–2 Hail Events', '3+ Hail Events or Large Hail (1"+)'];

const gutterRecs: Record<string, { material: string; type: string; cost: string; maintenance: string }> = {
  'Light — Tree Cover, North Side|Budget ($3–5/linear ft)|None in 5 Years': { material: '🥈 Aluminum Seamless', type: 'Seamless 5" K-style', cost: '$4–$6/linear ft installed', maintenance: 'Clean 2x/year, inspect joints, repaint every 10 years' },
  'Light — Tree Cover, North Side|Mid-Range ($5–8/linear ft)|None in 5 Years': { material: '🥇 Aluminum Seamless + Gutter Guard', type: 'Seamless 6" K-style with micro-mesh guard', cost: '$10–$18/linear ft installed', maintenance: 'Annual inspection, occasional flush — minimal upkeep' },
  'Moderate — Mixed Sun/Shade|Budget ($3–5/linear ft)|None in 5 Years': { material: '🥈 Aluminum Seamless 5"', type: 'Standard seamless K-style', cost: '$4–$7/linear ft', maintenance: 'Clean 2x/year. DFW oak and sweet gum debris clogs quickly.' },
  'Moderate — Mixed Sun/Shade|Mid-Range ($5–8/linear ft)|1–2 Hail Events': { material: '🥇 Steel Seamless 5"', type: '26-gauge steel seamless — dents less in DFW hail', cost: '$7–$10/linear ft installed', maintenance: 'Annual inspection for rust at seams, repaint every 7–10 years' },
  'Moderate — Mixed Sun/Shade|Premium ($8–15+/linear ft)|None in 5 Years': { material: '🏆 Copper Seamless', type: '16 oz copper half-round or K-style', cost: '$15–$25/linear ft installed', maintenance: 'Virtually none — copper self-cleans and lasts 50–100 years in DFW' },
  'Heavy — Open Sky, Large Roof Area|Budget ($3–5/linear ft)|1–2 Hail Events': { material: '🥈 Aluminum Seamless 6"', type: '6" K-style for higher volume — budget choice', cost: '$5–$8/linear ft installed', maintenance: 'Clean 3x/year, inspect for dents after hail, replace damaged sections promptly' },
  'Heavy — Open Sky, Large Roof Area|Mid-Range ($5–8/linear ft)|3+ Hail Events or Large Hail (1"+)': { material: '🥇 Steel Seamless 6"', type: '26-gauge steel 6" K-style — DFW hail champion', cost: '$9–$13/linear ft installed', maintenance: 'Annual inspection, paint every 8 years, inspect fasteners after major hail' },
  'Heavy — Open Sky, Large Roof Area|Premium ($8–15+/linear ft)|3+ Hail Events or Large Hail (1"+)': { material: '🏆 Aluminum Seamless 6" + Premium Guard', type: 'Heavy-gauge aluminum + stainless micro-mesh guard', cost: '$15–$25/linear ft installed', maintenance: 'Annual inspection only — gutter guard eliminates most cleaning in DFW debris zones' },
  'Light — Tree Cover, North Side|Mid-Range ($5–8/linear ft)|1–2 Hail Events': { material: '🥇 Aluminum Seamless with Gutter Guard', type: '5" K-style seamless + micro-mesh for tree debris', cost: '$10–$16/linear ft installed', maintenance: 'Bi-annual inspection — guard keeps out DFW oak catkins and sweet gum balls' },
  'Heavy — Open Sky, Large Roof Area|Budget ($3–5/linear ft)|None in 5 Years': { material: '🥈 Aluminum Seamless 6"', type: 'Upsized for volume — open sky needs capacity', cost: '$5–$8/linear ft', maintenance: 'Clean 2x/year minimum, check slope quarterly, inspect downspout clears' },
};

const defaultRec = { material: '🔍 Professional Assessment Recommended', type: 'Multiple options may apply', cost: 'Get quotes from 3 local DFW contractors', maintenance: 'Proper installation is as important as material in DFW conditions' };

const vinylWarning = `⛔ Vinyl Gutters in DFW: Strongly Not Recommended. Vinyl warps in DFW summer heat (surface temps 140°F+), becomes brittle in winter freezes, and fails at joints within 5–8 years. Replacement cost exceeds any upfront savings within one decade.`;

export default function DFWGutterMaterialGuide() {
  const [exposure, setExposure] = useState('');
  const [budget, setBudget] = useState('');
  const [hail, setHail] = useState('');
  const key = `${exposure}|${budget}|${hail}`;
  const result = exposure && budget && hail ? (gutterRecs[key] || defaultRec) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌧️ Gutter Material Guide — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>DFW receives 37" of annual rainfall often in intense storms, drops sweet gum balls and oak catkins by the ton, and delivers hail 5–7 times per year. Your gutter material choice matters more here than almost anywhere in Texas.</p>

        <div style={{ background: '#1A0A0A', border: '1px solid #5A2A2A', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ color: '#FF9B9B', fontWeight: 700, marginBottom: 8 }}>⛔ DFW Vinyl Gutter Warning</div>
          <p style={{ color: '#CC7777', fontSize: 13 }}>{vinylWarning}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { icon: '🥇', label: 'Aluminum Seamless', text: 'DFW standard — no joints to leak, handles moderate hail, affordable, 20–30 year lifespan' },
            { icon: '⚔️', label: 'Steel Seamless', text: 'DFW hail champion — 26-gauge steel resists denting from 1"+ hail that flattens aluminum' },
            { icon: '👑', label: 'Copper', text: 'Premium choice — 50–100 year lifespan, patinas beautifully, never needs painting, worth every penny for DFW luxury homes' },
          ].map(card => (
            <div key={card.label} style={{ background: '#111D35', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{card.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: 12 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 DFW Gutter Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'DFW EXPOSURE', value: exposure, setter: setExposure, opts: exposures },
              { label: 'BUDGET', value: budget, setter: setBudget, opts: budgets },
              { label: 'HAIL HISTORY', value: hail, setter: setHail, opts: hailHistory },
            ].map(sel => (
              <div key={sel.label}>
                <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{sel.label}</label>
                <select value={sel.value} onChange={e => sel.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 13 }}>
                  <option value=''>Select...</option>
                  {sel.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{result.material}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>RECOMMENDED TYPE</div><div style={{ fontSize: 14 }}>{result.type}</div></div>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>COST PER LINEAR FOOT</div><div style={{ fontSize: 14, color: '#F5E642' }}>{result.cost}</div></div>
              </div>
              <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>DFW MAINTENANCE NOTES</div><div style={{ fontSize: 13 }}>{result.maintenance}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 DFW Gutter Maintenance Calendar</div>
          {['March: Clear sweet gum balls and oak catkins (peak debris season)', 'June: Inspect before monsoon season — check all downspouts clear', 'September: Post-summer inspection for heat damage and sagging', 'November: Clear fall leaves before winter storms', 'After any hail event: Inspect for dents and displaced sections'].map(item => (
            <div key={item} style={{ color: '#9BA3B5', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>✓ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
