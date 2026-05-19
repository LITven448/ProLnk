import { useState } from 'react';

export default function DFWCabinetPaintingGuide2026() {
  const [condition, setCondition] = useState('good');
  const [timeline, setTimeline] = useState('weekend');

  const getApproach = () => {
    if (condition === 'rough' && timeline === 'weekend') {
      return { approach: 'Hire a Pro — Too Much Prep for a Weekend', steps: 'Rough cabinets need fill, sand x3, prime, sand, topcoat x2. 5-7 day professional job.', paint: 'SW Emerald Urethane Trim Enamel — Semi-Gloss', warning: 'Rushing cabinet painting causes visible brush marks and early peeling. Cabinets are worth doing right.' };
    }
    if (condition === 'good' && timeline === 'pro') {
      return { approach: 'Professional Spray Finish', steps: 'Degrease → Sand 150 → Prime → Sand 220 → SW Emerald Urethane x2 sprayed', paint: 'SW Emerald Urethane Trim Enamel — Semi-Gloss', warning: 'DFW humidity above 70% causes spray runs. Pros spray inside or in controlled conditions.' };
    }
    if (timeline === 'weekend') {
      return { approach: 'Brush + Roller DIY (2-Day Job)', steps: 'Day 1: Degrease, sand, prime. Day 2: Sand lightly, topcoat x2 with foam roller + brush for corners.', paint: 'SW Emerald Urethane Trim Enamel — Gloss or Semi-Gloss', warning: 'DFW summer heat speeds dry time — work early morning to avoid lap marks from fast drying.' };
    }
    return { approach: 'Professional Spray — Best Result', steps: 'Full strip, clean, sand, prime, two-coat spray finish. Allow 7-day cure before full use.', paint: 'SW Emerald Urethane Trim Enamel — Gloss', warning: 'Allow full 7-day cure before rehinging doors and placing items on shelves. DFW heat actually helps cure speed.' };
  };

  const rec = getApproach();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Cabinet Painting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How to paint kitchen cabinets in DFW — prep, products, spray vs brush, and cure time in North Texas heat.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Cabinet Condition + Timeline → Approach</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Cabinet Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="good">Good — solid, just dated color</option>
                <option value="rough">Rough — peeling, dents, damage</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="weekend">DIY this weekend</option>
                <option value="pro">Hire a professional</option>
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {rec.approach}</div>
            <div style={{ marginBottom: 6 }}><strong>Steps:</strong> {rec.steps}</div>
            <div style={{ marginBottom: 6 }}><strong>Paint:</strong> {rec.paint}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>⚠️ {rec.warning}</div>
          </div>
        </div>

        {[
          { icon: '🧼', title: 'Prep Is Everything', body: 'DFW kitchens accumulate grease faster in humid summers. Degrease with TSP substitute or Krud Kutter before any sanding. Skip degreasing and the paint will peel within 6 months. Sand with 150 grit after degreasing, then 220 before topcoat.' },
          { icon: '🌡️', title: 'DFW Humidity and Cure Time', body: 'SW Emerald Urethane reaches handling hardness in 24-48 hours in DFW summer heat. Full cure takes 7 days. Do not rehang doors or place items on shelves early — you’ll leave permanent impressions. DFW heat accelerates cure vs Northern states.' },
          { icon: '🎯', title: 'Spray vs Brush — DFW Reality', body: 'Professional spray delivers a factory finish — no brush marks. HVLP sprayers are rented at Home Depot for ~$60/day. Setup and masking takes 3-4 hours. For DIY brush jobs, foam rollers on flat surfaces + a 2" angled brush in corners gives the next-best result.' },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.icon} {card.title}</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🖌️</div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Need a DFW Cabinet Painting Pro?</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with vetted local painters — free quotes, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}

