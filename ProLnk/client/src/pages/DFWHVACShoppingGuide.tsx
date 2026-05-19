import { useState } from 'react';

const situations: { id: string; label: string }[] = [
  { id: 'working_spring', label: '✅ My system still works — it\’s spring right now' },
  { id: 'working_summer', label: '⚠️ My system still works — but it\’s already hot' },
  { id: 'broken_summer', label: '🚨 My system broke — it\’s 100°F outside' },
  { id: 'planning_fall', label: '📅 Planning ahead — fall or winter replacement' },
];

const strategies: Record<string, { timing: string; strategy: string; compare: string[]; priceRange: string; urgency: string }> = {
  working_spring: {
    timing: '🟢 Perfect Timing — Shop Now',
    strategy: 'Spring is the single best time to shop for DFW HVAC. Techs have availability, manufacturers offer pre-season rebates, and you have full leverage to compare 3+ quotes without urgency. Target installation before Memorial Day.',
    compare: [
      'Get 3 quotes minimum — DFW price spread can be $2,000+ for identical systems',
      'Compare SEER2 ratings (minimum 15 SEER2 for DFW climate)',
      'Ask each contractor about Oncor/CoServ rebates — up to $600 for qualifying units',
      'Verify NATE certification for every tech who will install',
      'Ask about R-454B or R-32 refrigerant — future-proof vs. R-410A systems',
    ],
    priceRange: '3-ton system: $6,000–$10,000 installed. 4-ton: $7,500–$12,500 installed.',
    urgency: 'Low — you have time to be thorough',
  },
  working_summer: {
    timing: '🟡 Okay Timing — Move Quickly',
    strategy: 'Your system is running but summer is here. DFW techs are busy but still schedulable with 1–2 week lead times. Get quotes now before a breakdown forces emergency pricing. You still have negotiating power.',
    compare: [
      'Call 2–3 contractors this week — lead times grow through July',
      'Get written quotes with model numbers so you can compare apples-to-apples',
      'Ask specifically: "Do you have the unit in stock or is this an order?"',
      'Prioritize contractors who can install within 2 weeks',
      'Rebate windows: Oncor rebates close July 31 — act fast',
    ],
    priceRange: '3-ton system: $7,000–$11,000 installed (mild summer premium).',
    urgency: 'Medium — shop within 2 weeks',
  },
  broken_summer: {
    timing: '🔴 Emergency Situation — Act Fast, Stay Smart',
    strategy: 'A broken system in DFW heat is dangerous for elderly, children, and pets. You need to move fast, but "emergency" contractors charge 20–40% more. Here\’s how to get service quickly without getting gouged.',
    compare: [
      'Call ProLnk first — we can reach available DFW techs within hours',
      'Ask upfront: "What\’s the service call fee and how does it apply to the repair or replacement?"',
      'If quoted over $11,000 for a 3-ton system, get a second opinion before signing',
      'Avoid same-day contracts over $8,000 without a second call — even 2 hours matters',
      'Request itemized quote: equipment cost + labor + materials listed separately',
    ],
    priceRange: '3-ton emergency install: $9,000–$14,000. Push back on anything over $13K.',
    urgency: 'High — but stay calm and get at least 2 contractor calls',
  },
  planning_fall: {
    timing: '🟢 Strategic Timing — Excellent Choice',
    strategy: 'October–November is DFW\’s second-best window. Techs are post-summer and eager for work, inventory is restocked, and you can take your time. Fewer rebates but maximum leverage for negotiation.',
    compare: [
      'Fall installations: best availability, least scheduling stress',
      'Negotiate hard — contractors are slower in October and will compete on price',
      'R-454B systems will be more available by fall 2026 — ask about new refrigerant options',
      'Combine with attic insulation for a package deal — often saves $500–$1,000 total',
      'Extended warranty negotiation is easiest in fall — ask for 10-year parts + labor',
    ],
    priceRange: '3-ton system: $6,000–$9,500 installed (most favorable pricing of the year).',
    urgency: 'Low — plan and compare at your own pace',
  },
};

export default function DFWHVACShoppingGuide() {
  const [situation, setSituation] = useState<string | null>(null);
  const result = situation ? strategies[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK • DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>DFW HVAC Shopping Guide:<br />When & How to Buy Smart</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          The biggest HVAC mistake DFW homeowners make is shopping during a heatwave. Desperation costs $2,000–$4,000 extra. Here's how to shop on your terms.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📅 DFW Shopping Calendar</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
            {[
              { month: 'March–April', rating: '🟢 Best', note: 'Pre-season, best availability + rebates' },
              { month: 'May', rating: '🟡 Good', note: 'Still manageable, techs booking up' },
              { month: 'June–August', rating: '🔴 Worst', note: 'Emergency pricing, low availability' },
              { month: 'October–November', rating: '🟢 Great', note: 'Post-season, competitive pricing' },
            ].map((row) => (
              <div key={row.month} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontWeight: 700 }}>{row.month}</div>
                <div style={{ color: '#94A3B8', marginTop: 2 }}>{row.rating}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🛒 Your Shopping Situation</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {situations.map((s) => (
            <button key={s.id} onClick={() => setSituation(s.id)} style={{
              background: situation === s.id ? '#F5E642′ : '#1E3A5F', color: situation === s.id ? '#0A1628' : '#fff',
              border: 'none', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}>{s.label}</button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{result.timing}</div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{result.strategy}</p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>WHAT TO COMPARE</div>
              {result.compare.map((c, i) => (
                <div key={i} style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.6, marginBottom: 4 }}>• {c}</div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>FAIR PRICE RANGE (DFW 2026)</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.priceRange}</div>
            </div>
            <div style={{ fontSize: 13, color: '#94A3B8′ }}>Urgency level: <strong style={{ color: '#fff' }}>{result.urgency}</strong></div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get 3 DFW HVAC Quotes Fast</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches you with vetted local HVAC pros — free, no commitment required.</div>
        </div>
      </div>
    </div>
  );
}
