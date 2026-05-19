import { useState } from 'react';

const deckConditions = ['Soft spots when walking roof', 'Visible dark staining / mold on underside', 'Contractor flagged partial replacement', 'Sheathing edges crumbling at eaves', 'No visible issues'];
const roofAges = ['Under 5 years', '5–10 years', '10–15 years', '15–20 years', 'Over 20 years'];

function getDecayAssessment(condition: string, age: string) {
  const old = age === '15–20 years' || age === 'Over 20 years';
  const mid = age === '10–15 years';

  if (condition === 'Soft spots when walking roof') {
    return {
      likelihood: 'HIGH',
      color: '#FF4444',
      detail: 'Soft spots under foot pressure indicate OSB delamination or rot. DFW\’s summer heat (150°F+ attic temps) plus occasional moisture intrusion accelerates OSB breakdown.',
      request: 'Ask your contractor to probe all soft areas before nailing new shingles. Replace all compromised panels.',
      cost: 'Partial deck replacement: $300–$800 per square (10x10 ft). Full deck on 2,000 sq ft home: $4,000–$9,000.',
    };
  }
  if (condition === 'Visible dark staining / mold on underside') {
    return {
      likelihood: old ? 'HIGH' : 'MODERATE',
      color: old ? '#FF4444' : '#FF8C00',
      detail: 'Dark staining from the attic side means moisture has been cycling through the deck. In DFW, this is often from AC duct leaks, bathroom exhaust venting into attic, or ice dam events during rare freezes.',
      request: 'Fix the moisture source first. Then have contractor assess deck integrity before re-roofing. Staining alone ≠ replacement — probing determines actual integrity.',
      cost: 'Moisture source repair: $200–$2,000 depending on cause. Deck replacement if needed: same as above.',
    };
  }
  if (condition === 'Contractor flagged partial replacement') {
    return {
      likelihood: 'CONFIRMED',
      color: '#FF8C00',
      detail: 'Partial deck replacement is normal and cost-effective in DFW re-roofing. Contractors typically discover failures once old shingles are removed.',
      request: 'Request itemized breakdown: how many sheets, exact location, why each is being replaced. Get photos before new shingles go on.',
      cost: '7/16" OSB: ~$35–$55/sheet installed. Plywood: $50–$80/sheet installed. Average re-roof adds $500–$2,500 in deck repairs.',
    };
  }
  if (condition === 'Sheathing edges crumbling at eaves') {
    return {
      likelihood: 'HIGH',
      color: '#FF4444',
      detail: 'Eave edge crumbling is a telltale sign of chronic gutter overflow and moisture wicking. DFW\’s heavy rain events overwhelm clogged gutters, soaking sheathing edges repeatedly.',
      request: 'Replace eave-edge sheathing AND install drip edge flashing AND clean/upgrade gutters. Address root cause or decay returns.',
      cost: 'Eave deck repair + drip edge: $600–$2,500 depending on linear footage and damage depth.',
    };
  }
  return {
    likelihood: old ? 'MODERATE' : mid ? 'LOW–MODERATE' : 'LOW',
    color: old ? '#F5E642' : '#00CC66',
    detail: old
      ? 'At 15–20+ years, DFW roof decks — especially OSB — are nearing end of expected life. Even without visible issues, ask your roofer to assess deck integrity during your next inspection.'
      : 'No visible deck issues. DFW\’s climate is harsh but quality OSB lasts 20–30 years with proper ventilation and dry conditions.',
    request: 'Schedule professional roof inspection annually, especially after hail events. Ask inspector to check attic underside for staining.',
    cost: 'Preventive inspection: $150–$400. Budget for potential deck work in planning for your next re-roof.',
  };
}

export default function DFWRoofDecayGuide() {
  const [condition, setCondition] = useState('');
  const [roofAge, setRoofAge] = useState('');
  const result = condition && roofAge ? getDecayAssessment(condition, roofAge) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Roofing Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>Roof Deck Decay Guide for DFW</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW's humidity swings and extreme heat cycles are hard on OSB roof decking. Know how to identify decay during re-roofing, what to request from your contractor, and what it costs.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW\’s Hidden Deck Killer', body: 'Attic temperatures in DFW exceed 150°F in summer. This heat cycling — combined with winter humidity and rare freeze events — causes OSB to swell, delaminate, and lose structural integrity over 15–25 years.' },
            { icon: '🔍', title: 'When It Gets Discovered', body: 'Deck decay is almost always invisible from the outside. Contractors discover it when they tear off old shingles. This is normal — budget $500–$2,500 for deck repairs in any DFW re-roofing project.' },
            { icon: '🪵', title: 'Partial vs Full Replacement', body: 'Full deck replacement is rarely needed unless the home is 30+ years old with the original deck and chronic moisture issues. Spot replacement of failed panels is standard and cost-effective.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Deck Decay Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Deck condition observed</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {deckConditions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Current roof age</label>
            <select value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select age...</option>
              {roofAges.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 16, marginBottom: 12 }}>DECAY LIKELIHOOD: {result.likelihood}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.detail}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>📋 {result.request}</div>
              <div style={{ color: '#00CC66', fontSize: 13 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ Cost estimates reflect 2025–2026 DFW market rates. Actual costs vary by contractor and material availability. Always get 2–3 bids for major deck work.</div>
        </div>
      </div>
    </div>
  );
}
