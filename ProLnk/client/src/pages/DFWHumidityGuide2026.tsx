import { useState } from 'react';

const levels = [
  { range: '< 30%', label: 'Too Dry', color: '#E57373', icon: '🏜', actions: ['Run whole-home humidifier', 'Add portable humidifier to main living area', 'Check HVAC humidifier reservoir', 'Monitor wood floors — cracking risk'] },
  { range: '30–44%', label: 'Low Normal', color: '#FFB74D', icon: '🌤', actions: ['Consider running humidifier in bedrooms', 'Check weatherstripping to retain moisture', 'Adequate for most DFW winter months'] },
  { range: '45–50%', label: 'Optimal', color: '#81C784', icon: '✅', actions: ['Maintain current HVAC settings', 'Continue monitoring — DFW swings fast', 'Ideal for health, wood, and allergy control'] },
  { range: '51–60%', label: 'Elevated', color: '#FFB74D', icon: '⚠️', actions: ['Run HVAC in cooling mode to dehumidify', 'Check bathroom/kitchen exhaust fans', 'Inspect attic for ventilation issues'] },
  { range: '> 60%', label: 'Mold Risk Zone', color: '#E57373', icon: '🚨', actions: ['Run whole-home dehumidifier immediately', 'Inspect for water intrusion / leaks', 'Check crawl space / slab moisture barrier', 'Call HVAC pro — system may be undersized'] },
];

const facts = [
  { icon: '☀️', title: 'DFW Summer Reality', body: 'June–August outdoor humidity averages 60–80% in DFW. Without active dehumidification, indoor humidity tracks outdoor — creating perfect mold conditions inside unconditioned spaces.' },
  { icon: '❄️', title: 'Winter Dryness', body: 'DFW winters (Dec–Feb) drop indoor humidity to 20–30% when heating runs constantly. This dries out wood floors, causes static electricity, and irritates respiratory systems during cedar season.' },
  { icon: '🏠', title: 'Whole-Home vs Portable', body: 'A whole-home dehumidifier (70–90 pint capacity) costs $1,500–2,500 installed but handles the entire house. Portable units ($150–400) work for single rooms but require daily emptying in DFW summers.' },
  { icon: '🌡', title: 'HVAC Humidity Control', body: 'A properly sized HVAC system removes 1–2 gallons of water per hour of runtime. An oversized unit short-cycles — cooling fast but not dehumidifying — a common DFW install mistake.' },
];

export default function DFWHumidityGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? levels[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>DFW HOME HEALTH 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 DFW Home Humidity Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Optimal indoor humidity is 45–50%. DFW swings from scorching humid summers to dry cedar winters. Your HVAC and dehumidification strategy determines comfort, health, and structural integrity of your home.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#111E35', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: '#8899BB', lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 10, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📊 My Humidity Reading → Action Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {levels.map((l, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#1C2E4A' : '#0A1628', border: `2px solid ${selected === i ? l.color : '#1C2E4A'}`, borderRadius: 8, padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                <span style={{ fontSize: 24 }}>{l.icon}</span>
                <span style={{ fontWeight: 700, color: l.color }}>{l.range}</span>
                <span style={{ color: '#E8EDF5′ }}>{l.label}</span>
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: active.color }}>Actions for {active.range} ({active.label}):</div>
              {active.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', marginTop: 2 }}>→</span>
                  <span style={{ fontSize: 14 }}>{a}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Humidity problems? ProLnk can help.</div>
          <div style={{ fontSize: 13, color: '#8899BB' }}>Connect with a DFW HVAC specialist for whole-home humidity assessment and dehumidifier installation.</div>
        </div>
      </div>
    </div>
  );
}
