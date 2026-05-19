import { useState } from 'react';

const exposures = ['North-Facing', 'East-Facing', 'South-Facing', 'West-Facing (Hottest)'];
const budgets = ['Economy', 'Mid-Range', 'Premium', 'Top Tier'];
const priorities = ['Energy Efficiency', 'Durability / Longevity', 'Low Maintenance', 'Aesthetic / Curb Appeal'];

const frames = [
  { name: 'Fiberglass', rating: '⭐⭐⭐⭐⭐', dfwScore: 'Best', expansion: '0.0000028 in/in/°F', lifespan: '40–70 years', cost: '$$$$ ($600–$1,200/window)', notes: 'DFW climate champion — expands same rate as glass, no seal failures, handles 20°F–115°F swings perfectly' },
  { name: 'Vinyl', rating: '⭐⭐⭐⭐', dfwScore: 'Good', expansion: '0.0000350 in/in/°F', lifespan: '20–30 years', cost: '$$ ($250–$600/window)', notes: 'Most popular in DFW — adequate for most applications, but softens on south/west exposure at extreme temps' },
  { name: 'Aluminum', rating: '⭐⭐', dfwScore: 'Poor for DFW', expansion: '0.0000128 in/in/°F', lifespan: '15–20 years', cost: '$$$ ($400–$900/window)', notes: 'Conducts heat directly into DFW homes — can raise window-zone indoor temps 15–20°F. Avoid for energy-efficient DFW builds.' },
  { name: 'Wood', rating: '⭐⭐⭐', dfwScore: 'Challenging', expansion: 'Variable (humidity-dependent)', lifespan: '20–40 years (with maintenance)', cost: '$$$$ ($700–$1,500/window)', notes: 'DFW humidity cycling swells and shrinks wood — paint fails, seals fail. Beautiful but demanding. Clad wood (wood interior, aluminum/fiberglass exterior) is better option.' },
];

const recommendations: Record<string, Record<string, Record<string, { frame: string; reason: string; costPremium: string; lifespan: string }>>> = {
  'Energy Efficiency': {
    'South-Facing': { 'Economy': { frame: 'Vinyl with Low-E Glass', reason: 'Low-E coating carries most energy work — vinyl frame adequate for budget', costPremium: 'Base', lifespan: '20–25 yrs' }, 'Premium': { frame: 'Fiberglass with Triple-Pane', reason: 'Fiberglass + triple-pane is the DFW energy efficiency pinnacle for south exposure', costPremium: '+60–80% over vinyl', lifespan: '40–60 yrs' }, 'Mid-Range': { frame: 'Fiberglass with Double-Pane Low-E', reason: 'Best mid-range choice for DFW south exposure energy performance', costPremium: '+30–40% over vinyl', lifespan: '35–50 yrs' }, 'Top Tier': { frame: 'Fiberglass with Triple-Pane + Argon', reason: 'Maximum DFW energy performance — SHGC <0.25 for south windows', costPremium: '+80–100% over vinyl', lifespan: '50–70 yrs' } },
    'West-Facing (Hottest)': { 'Economy': { frame: 'Vinyl with Low-E + Tint', reason: 'Tinted Low-E glass critical for west DFW exposure regardless of frame', costPremium: 'Base +$50/window', lifespan: '18–22 yrs' }, 'Premium': { frame: 'Fiberglass with Triple-Pane + Exterior Shading', reason: 'West DFW exposure needs frame AND shading strategy — fiberglass is essential', costPremium: '+70–90%', lifespan: '40–60 yrs' }, 'Mid-Range': { frame: 'Fiberglass Double-Pane Low-E', reason: 'Fiberglass handles west DFW heat without softening — vinyl at risk here', costPremium: '+35–50%', lifespan: '35–50 yrs' }, 'Top Tier': { frame: 'Fiberglass + Triple-Pane + Exterior Shade Screen', reason: 'Complete west DFW solution — reduces solar gain 60–80%', costPremium: '+100–130%', lifespan: '50–70 yrs' } },
    'North-Facing': { 'Economy': { frame: 'Vinyl Double-Pane', reason: 'North DFW exposure is forgiving — standard vinyl performs well', costPremium: 'Base', lifespan: '22–28 yrs' }, 'Mid-Range': { frame: 'Vinyl or Fiberglass Double-Pane', reason: 'Both work well on north exposure — upgrade to fiberglass for longevity', costPremium: '+20–30%', lifespan: '30–45 yrs' }, 'Premium': { frame: 'Fiberglass Double-Pane Low-E', reason: 'Premium performance at reasonable cost for less demanding north exposure', costPremium: '+30–45%', lifespan: '40–60 yrs' }, 'Top Tier': { frame: 'Fiberglass Triple-Pane', reason: 'North triple-pane is optional luxury — good choice if budget allows', costPremium: '+60–80%', lifespan: '50–70 yrs' } },
    'East-Facing': { 'Economy': { frame: 'Vinyl Double-Pane', reason: 'East exposure gets morning sun only — standard vinyl adequate', costPremium: 'Base', lifespan: '20–26 yrs' }, 'Mid-Range': { frame: 'Vinyl with Low-E', reason: 'Low-E adds meaningful comfort for east DFW morning sun control', costPremium: '+10–20%', lifespan: '22–28 yrs' }, 'Premium': { frame: 'Fiberglass Double-Pane Low-E', reason: 'Fiberglass longevity pays off over 40+ years even on moderate east exposure', costPremium: '+30–40%', lifespan: '40–60 yrs' }, 'Top Tier': { frame: 'Fiberglass Triple-Pane', reason: 'Maximum comfort and insulation for east-facing rooms', costPremium: '+60–75%', lifespan: '50–70 yrs' } },
  },
  'Durability / Longevity': {
    'South-Facing': { 'Economy': { frame: 'Heavy-Gauge Vinyl', reason: 'Thicker vinyl profiles withstand south DFW UV better than standard gauge', costPremium: '+15–20%', lifespan: '22–28 yrs' }, 'Mid-Range': { frame: 'Fiberglass', reason: 'Fiberglass outlasts vinyl by 20+ years on south DFW exposure — worth the step up', costPremium: '+35–50%', lifespan: '40–60 yrs' }, 'Premium': { frame: 'Fiberglass with Lifetime Warranty', reason: 'Buy once, never replace — fiberglass frames on south exposure last 50+ years in DFW', costPremium: '+50–70%', lifespan: '50–70 yrs' }, 'Top Tier': { frame: 'Fiberglass (Pella Impervia or Marvin Signature)', reason: 'Best-in-class DFW south exposure durability — true 60–70 year window', costPremium: '+80–110%', lifespan: '60–70 yrs' } },
    'West-Facing (Hottest)': { 'Economy': { frame: 'Vinyl (Monitor Closely)', reason: 'Standard vinyl at risk on west DFW — inspect annually for softening/warping', costPremium: 'Base', lifespan: '15–20 yrs' }, 'Mid-Range': { frame: 'Fiberglass — Strong Recommendation', reason: 'West DFW is where vinyl fails — fiberglass is the durability minimum here', costPremium: '+40–55%', lifespan: '40–60 yrs' }, 'Premium': { frame: 'Fiberglass with Extended Warranty', reason: 'Premium fiberglass on west exposure is the DFW gold standard for longevity', costPremium: '+60–80%', lifespan: '50–70 yrs' }, 'Top Tier': { frame: 'Fiberglass (Infinity or Marvin)', reason: 'No compromise on west DFW — these frames outlast the house', costPremium: '+90–120%', lifespan: '60–75 yrs' } },
    'North-Facing': { 'Economy': { frame: 'Standard Vinyl', reason: 'North exposure is gentlest — standard vinyl lasts 25+ years here', costPremium: 'Base', lifespan: '25–30 yrs' }, 'Mid-Range': { frame: 'Fiberglass', reason: 'Upgrade to fiberglass if replacing all windows — consistency pays off', costPremium: '+30–40%', lifespan: '40–60 yrs' }, 'Premium': { frame: 'Fiberglass — Set and Forget', reason: 'North fiberglass: never replace again in your lifetime', costPremium: '+45–60%', lifespan: '50–70 yrs' }, 'Top Tier': { frame: 'Fiberglass Premium', reason: 'Absolute longevity — matching other elevations recommended for consistency', costPremium: '+70–90%', lifespan: '60–70 yrs' } },
    'East-Facing': { 'Economy': { frame: 'Standard Vinyl', reason: 'East exposure is manageable for vinyl — good durability at base cost', costPremium: 'Base', lifespan: '22–28 yrs' }, 'Mid-Range': { frame: 'Heavy-Gauge Vinyl or Fiberglass', reason: 'Step up for better longevity — DFW east morning UV still ages vinyl', costPremium: '+20–40%', lifespan: '30–50 yrs' }, 'Premium': { frame: 'Fiberglass', reason: 'Fiberglass recommended if buying premium — pay once', costPremium: '+40–55%', lifespan: '40–60 yrs' }, 'Top Tier': { frame: 'Fiberglass Premium', reason: 'Lifetime solution for east elevation', costPremium: '+65–85%', lifespan: '55–70 yrs' } },
  },
};

const defaultRec = { frame: 'Fiberglass — DFW Universal Recommendation', reason: 'Fiberglass outperforms all other frame materials in DFW\’s extreme climate. When in doubt, fiberglass wins.', costPremium: '+30–60% over vinyl baseline', lifespan: '40–70 years' };

export default function DFWWindowFrameMaterialGuide() {
  const [exposure, setExposure] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const rec = exposure && budget && priority ? (recommendations[priority]?.[exposure]?.[budget] || defaultRec) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪟 Window Frame Materials — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>DFW's 90°F+ annual temperature swings put window frames through more stress than almost any US metro. The wrong frame material costs you in energy bills, early replacement, and comfort for decades.</p>

        <div style={{ overflowX: 'auto', marginBottom: 32 }}>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20, minWidth: 600 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 DFW Frame Material Comparison</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 1, background: '#0A1628', borderRadius: 8, overflow: 'hidden' }}>
              {['Material', 'DFW Rating', 'Lifespan', 'Cost', 'Thermal Expansion'].map(h => <div key={h} style={{ background: '#1E3A5F', padding: '10px 12px', fontSize: 11, fontWeight: 700, color: '#9BA3B5′ }}>{h}</div>)}
              {frames.map(f => [f.name, f.rating, f.lifespan, f.cost, f.expansion].map((cell, i) => <div key={`${f.name}-${i}`} style={{ background: '#111D35', padding: '10px 12px', fontSize: 12 }}>{cell}</div>))}
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 DFW Frame Recommendation Engine</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'DFW EXPOSURE', value: exposure, setter: setExposure, opts: exposures },
              { label: 'BUDGET', value: budget, setter: setBudget, opts: budgets },
              { label: 'TOP PRIORITY', value: priority, setter: setPriority, opts: priorities },
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
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>{rec.frame}</div>
              <p style={{ fontSize: 14, marginBottom: 16, color: '#E8EAF0′ }}>{rec.reason}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>COST PREMIUM VS VINYL</div><div style={{ fontSize: 14, color: '#F5E642′ }}>{rec.costPremium}</div></div>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>EXPECTED LIFESPAN IN DFW</div><div style={{ fontSize: 14 }}>{rec.lifespan}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚠️ DFW-Specific Frame Warnings</div>
          {[
            'Aluminum frames conduct heat directly into DFW homes — avoid for living spaces',
            'Standard vinyl on south/west DFW exposure softens at extreme temps (160°F+ surface)',
            'Wood without exterior cladding swells and fails seals in DFW humidity cycling',
            'Weep holes in vinyl frames must stay clear — inspect after every DFW storm',
            'Get SHGC <0.25 and U-factor <0.30 on south/west windows regardless of frame material',
          ].map(item => (
            <div key={item} style={{ color: '#9BA3B5', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>⚠ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
