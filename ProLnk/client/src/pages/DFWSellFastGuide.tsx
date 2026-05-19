import { useState } from 'react';

const marketTiming = {
  spring: { label: 'Peak Season', avg: '8–14 days', color: '#27ae60', note: 'March–May is DFW\’s hottest window. Inventory low, buyers competing. Price right and expect multiple offers.' },
  summer: { label: 'Strong Season', avg: '14–22 days', color: '#f39c12', note: 'June–August still active but heat slows weekend showings. Price slightly below comps to generate urgency.' },
  fall: { label: 'Good Season', avg: '18–28 days', color: '#2980b9', note: 'September–October strong. November slows with holidays.' },
  winter: { label: 'Slow Season', avg: '30–50 days', color: '#95a5a6', note: 'Fewer buyers but serious ones. Priced right, you can still move fast. Serious buyers in January especially.' },
};

const speedStrategies = [
  { rank: 1, action: 'Price it right from Day 1 ✅', detail: 'Overpriced homes sit. DFW buyers watch DOM closely. Days 1–7 are your highest traffic window. Miss it and you\’re chasing the market.' },
  { rank: 2, action: 'Professional photos — no exceptions 📸', detail: 'Homes with professional photos get 3x more online views and show-ready buyers. Budget $200–400 — non-negotiable.' },
  { rank: 3, action: 'Accept showings immediately 🕐', detail: 'Within the first 48 hours of listing. Blocking showings signals problems to buyers and agents.' },
  { rank: 4, action: 'Offer incentives 💰', detail: 'Home warranty ($600–900) or closing cost credit ($3–5K) — signals goodwill and attracts buyers on edge.' },
  { rank: 5, action: 'Be ready to move out fast 📦', detail: 'Offer 14–21 day close option. Cash and investor buyers love speed. Flexibility = leverage.' },
];

export default function DFWSellFastGuide() {
  const [urgency, setUrgency] = useState('30days');
  const [condition, setCondition] = useState('good');
  const [season, setSeason] = useState('spring');

  const timing = marketTiming[season as keyof typeof marketTiming];

  const strategy = urgency === '14days'
    ? { rec: 'Price 4–7% below comps + cash buyer outreach', dom: '7–14 days', note: 'Target investors and cash buyers directly. Forgo some price for speed.' }
    : urgency === '30days'
    ? { rec: 'Price at comps + aggressive marketing', dom: '14–21 days', note: 'Hit price hard and market wide. Professional photos + early showings.' }
    : { rec: 'Price at or just above comps', dom: '21–35 days', note: 'You have time to find the right retail buyer. Don\’t sacrifice price.' };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0A1628', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '12px 0 8px' }}>
            How to Sell Your DFW Home Fast
          </h1>
          <p style={{ color: '#aaa', fontSize: 16 }}>Speed in DFW is about pricing, timing, and preparation — not luck.</p>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Your Fast Sale Calculator</h2>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
            {[
              { label: 'How fast do you need to sell?', val: urgency, set: setUrgency, opts: [['14days', 'Within 14 days'], ['30days', 'Within 30 days'], ['60days', 'Within 60 days']] },
              { label: 'Home condition', val: condition, set: setCondition, opts: [['excellent', 'Excellent — show ready'], ['good', 'Good — minor fixes'], ['fair', 'Fair — needs work']] },
              { label: 'Listing season', val: season, set: setSeason, opts: [['spring', 'Spring (Mar–May)'], ['summer', 'Summer (Jun–Aug)'], ['fall', 'Fall (Sep–Nov)'], ['winter', 'Winter (Dec–Feb)']] },
            ].map((f, i) => (
              <div key={i} style={{ flex: 1, minWidth: 200 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#aaa', display: 'block', marginBottom: 8 }}>{f.label}</label>
                <select value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #2a3a54', fontSize: 14, background: '#0A1628', color: '#fff' }}>
                  {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ background: '#1e3050', borderRadius: 12, padding: 24, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#888', fontWeight: 600, marginBottom: 8 }}>YOUR FAST SALE STRATEGY</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{strategy.rec}</div>
            <div style={{ fontSize: 14, color: '#aaa', marginBottom: 12 }}>{strategy.note}</div>
            <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '6px 16px', borderRadius: 20, fontSize: 14 }}>
              Expected DOM: {strategy.dom}
            </div>
          </div>
          <div style={{ background: timing.color + '22', border: `2px solid ${timing.color}`, borderRadius: 10, padding: 18 }}>
            <div style={{ fontWeight: 700, color: timing.color, fontSize: 15 }}>📅 {timing.label} — DFW Market Avg: {timing.avg}</div>
            <div style={{ fontSize: 13, color: '#bbb', marginTop: 6 }}>{timing.note}</div>
          </div>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🏆 Top 5 DFW Speed Strategies — Ranked</h2>
          {speedStrategies.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: i < speedStrategies.length - 1 ? '1px solid #1e3050' : 'none' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15 }}>{s.rank}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 6 }}>{s.action}</div>
                <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.5 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
