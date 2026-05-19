import { useState } from 'react';

const EQUIPMENT_ITEMS = [
  { key: 'standing_desk', label: '🖥️ Standing Desk', lowCost: 300, highCost: 800, priority: 1, category: 'ergonomics', minBudget: 500 },
  { key: 'chair', label: '🪑 Quality Chair', lowCost: 300, highCost: 800, priority: 1, category: 'ergonomics', minBudget: 500 },
  { key: 'ups', label: '🔋 UPS / Battery Backup', lowCost: 100, highCost: 300, priority: 1, category: 'power', minBudget: 200 },
  { key: 'surge', label: '⚡ Whole-Home Surge Protector', lowCost: 200, highCost: 400, priority: 2, category: 'power', minBudget: 400 },
  { key: 'portable_ac', label: '❄️ Portable AC Unit', lowCost: 200, highCost: 600, priority: 2, category: 'climate', minBudget: 600 },
  { key: 'monitor_arm', label: '📺 Monitor Arm', lowCost: 50, highCost: 150, priority: 2, category: 'ergonomics', minBudget: 300 },
  { key: 'acoustic', label: '🔇 Acoustic Panels (DIY)', lowCost: 100, highCost: 300, priority: 3, category: 'acoustic', minBudget: 800 },
  { key: 'lighting', label: '💡 4,000K LED Lighting', lowCost: 80, highCost: 200, priority: 3, category: 'lighting', minBudget: 600 },
  { key: 'white_noise', label: '🔊 White Noise Machine', lowCost: 40, highCost: 80, priority: 3, category: 'acoustic', minBudget: 800 },
  { key: 'mini_split', label: '🌡️ Ductless Mini-Split', lowCost: 1500, highCost: 2500, priority: 4, category: 'climate', minBudget: 3000 },
];

export default function DFWHomeOfficeSetupGuide() {
  const [budget, setBudget] = useState(2000);
  const [roomSqft, setRoomSqft] = useState(150);

  const recommended = EQUIPMENT_ITEMS.filter(item => budget >= item.minBudget);
  const totalLow = recommended.reduce((s, i) => s + i.lowCost, 0);
  const totalHigh = recommended.reduce((s, i) => s + i.highCost, 0);

  const climateSolution = roomSqft > 200 ? 'mini-split' : 'portable AC';

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1c1917, #0f172a)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px' }}>
          DFW Home Office Setup Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
          The Gear and Space You Actually Need
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* DFW Context */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginTop: 40 }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 16 }}>
            With <strong style={{ color: '#f1f5f9′ }}>34% of DFW workers remote or hybrid</strong>, the home office isn’t optional —
            it's a selling point and a productivity essential. DFW-specific challenges (heat, power fluctuations, open floor plans)
            mean a generic setup won't cut it.
          </p>
        </div>

        {/* 4 Must-Haves */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 24px' }}>✅ 4 Must-Haves for DFW Remote Workers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                icon: '📶',
                title: '1. Reliable Internet',
                detail: 'AT&T Fiber covers most DFW suburbs. Don’t just assume — test your speed. Minimum: 100 Mbps download, 50 Mbps upload for video calls. If you’re on cable, upgrade.',
              },
              {
                icon: '⚡',
                title: '2. Dedicated Circuit',
                detail: 'DFW summer power fluctuations can damage computers. A 20-amp dedicated circuit + whole-home surge protector is non-negotiable for a serious setup.',
              },
              {
                icon: '❄️',
                title: '3. Temperature Control',
                detail: 'DFW HVAC can’t keep up with a home office corner in July. Portable AC ($200–600) works for smaller rooms. Ductless mini-split ($1,500–2,500) for a dedicated room.',
              },
              {
                icon: '🔋',
                title: '4. Backup Power (UPS)',
                detail: 'A small UPS ($100–300) protects against DFW grid fluctuations and gives you 10–20 minutes to save your work and shut down gracefully during an outage.',
              },
            ].map(item => (
              <div key={item.title} style={{ background: '#1e293b', borderRadius: 14, padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#f1f5f9', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ergonomics */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b', margin: '0 0 20px' }}>🧍 Ergonomics for Long-Term Remote Workers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '🖥️', item: 'Standing Desk', cost: '$300–800', note: 'DFW workers average 8+ hrs at desk. Non-negotiable.' },
              { icon: '📺', item: 'Monitor Arm', cost: '$50–150', note: 'Eye level = no neck strain. Cheap fix, big impact.' },
              { icon: '🪑', item: 'Quality Chair', cost: '$300–800', note: 'Don’t cheap out on what you sit in 8 hrs/day.' },
              { icon: '💡', item: 'Smart Lighting', cost: '$80–200', note: 'Face window, don’t sit with it behind you. 4,000K LED supplement.' },
            ].map(item => (
              <div key={item.item} style={{ background: '#0f172a', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{item.item}</div>
                <div style={{ color: '#f59e0b', fontWeight: 600, marginBottom: 8 }}>{item.cost}</div>
                <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Acoustics */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '0 0 16px' }}>🔇 Acoustic Solutions for DFW Open Floor Plans</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { tip: 'Acoustic panels (DIY)', cost: '$100–300', detail: 'Reduces echo on video calls. Weekend project.' },
              { tip: 'White noise machine', cost: '$40–80', detail: 'Blocks HVAC sounds + neighbor sounds.' },
              { tip: 'Heavy curtains', cost: 'Already have them?', detail: 'DFW sun = heavy curtains. Acoustic bonus included.' },
            ].map(item => (
              <div key={item.tip} style={{ background: '#0f172a', borderRadius: 10, padding: '14px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#f1f5f9', fontWeight: 600 }}>{item.tip}</div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{item.detail}</div>
                </div>
                <div style={{ color: '#38bdf8', fontWeight: 700 }}>{item.cost}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Planner */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>🧮 Setup Planner</h2>
          <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 28px' }}>Enter your budget and room size to get a prioritized equipment list</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
                Budget: <span style={{ color: '#38bdf8′ }}>${budget.toLocaleString()}</span>
              </label>
              <input type="range" min={200} max={5000} step={100} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8′ }} />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
                Room size: <span style={{ color: '#38bdf8′ }}>{roomSqft} sqft</span>
                {roomSqft > 200 && <span style={{ color: '#f59e0b', fontSize: 13, marginLeft: 8 }}>→ Consider mini-split</span>}
              </label>
              <input type="range" min={60} max={400} step={10} value={roomSqft} onChange={e => setRoomSqft(Number(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8′ }} />
            </div>
          </div>

          {recommended.length === 0 ? (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748b' }}>
              Increase budget to see recommendations
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {recommended.map(item => (
                  <div key={item.key} style={{ background: '#0f172a', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ color: '#f1f5f9', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>${item.lowCost}–${item.highCost}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f172a)', borderRadius: 14, padding: '24px 28px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>Estimated Total Investment</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#38bdf8′ }}>${totalLow.toLocaleString()}–${totalHigh.toLocaleString()}</div>
                <div style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>
                  Climate recommendation: <strong style={{ color: '#f1f5f9′ }}>{climateSolution}</strong> for your room size
                </div>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Need electrical work, HVAC, or other upgrades for your home office? Get vetted DFW pros.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#38bdf8', color: '#0f172a', fontWeight: 800, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18 }}>
            Get Pro Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
