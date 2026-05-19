import { useState } from 'react';

export default function DFWFirstYearSurprises2026() {
  const [selected, setSelected] = useState('');

  const surprises = [
    { id: 'electric', label: '⚡ $400+ Electric Bill', heading: 'Your First DFW Summer Electric Bill', body: 'DFW summer HVAC costs average $350–$550/month in July and August for a 2,000 sq ft home. Upgrade to a smart thermostat, set it to 78°F when away, and seal attic air leaks. Older homes with R-19 insulation or less will consistently hit $500+.' },
    { id: 'propertytax', label: '🏛️ January Property Tax Bill', heading: 'Property Tax Due in January', body: 'DFW property taxes average 2.1–2.5% of assessed value — one of the highest rates in the nation. On a $400K home that is $8,400–$10,000/yr. Set up escrow if your lender allows it, or budget monthly. File a homestead exemption by April 30 for a partial reduction.' },
    { id: 'hoa', label: '📋 HOA Fine for Grass Height', heading: 'HOA Violations Start Immediately', body: 'Most DFW HOAs enforce grass height limits (usually 6 inches), approved exterior colors, visible trash bins, and parking rules. Violations arrive as certified letters with cure deadlines. Read your CCRs in full within month 1 — ignorance is not accepted as a defense.' },
    { id: 'cedar', label: '🌲 Cedar Fever in February', heading: 'Cedar Fever Is Real and Brutal', body: 'Mountain cedar pollinates December through March in DFW. Non-natives often mistake it for COVID or flu — runny nose, itchy eyes, fatigue, and facial pressure. Stock up on antihistamines, HEPA filter your HVAC, and keep windows closed. It peaks in January.' },
    { id: 'foundation', label: '🏗️ Foundation Watering in June', heading: 'You Have to Water Your Foundation', body: 'DFW sits on expansive clay soil that shrinks in drought and swells in rain. Your foundation moves seasonally. Skipping foundation watering in a DFW summer can result in $8,000–$40,000 repairs. Run soaker hoses 18 inches from foundation perimeter 3–4 days per week from June through September.' },
    { id: 'hvac', label: '💨 HVAC Tune-Up Timing', heading: 'When to Book HVAC Service in DFW', body: 'Booking in April or October means 2–4 week waits or no availability. Book March for spring AC service and September for fall furnace service. DFW HVAC techs are fully booked May–August. A tune-up costs $80–$120 and prevents $3,000+ breakdown calls in summer.' },
  ];

  const activeItem = surprises.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>😲 DFW First Year Home Surprises</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Every new DFW homeowner gets hit by the same surprises. Here is what to expect and exactly how to handle it.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {surprises.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id === selected ? '' : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#1e2d45',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642',
                borderRadius: 10,
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {activeItem && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '24px', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>{activeItem.heading}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: 15, margin: 0 }}>{activeItem.body}</p>
          </div>
        )}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📊 By the Numbers — DFW Year 1</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 14 }}>
            Average first-year surprise costs: Electric overage $600 · Foundation service $400 · HOA fine $200 · HVAC breakdown repair $1,800 · Total surprise budget needed: $3,500+
          </div>
        </div>
      </div>
    </div>
  );
}

