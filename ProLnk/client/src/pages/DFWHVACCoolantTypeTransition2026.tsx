import { useState } from 'react';

export default function DFWHVACCoolantTypeTransition2026() {
  const [system, setSystem] = useState('');

  const getGuide = () => {
    if (!system) return null;
    if (system === 'r22') return { label: 'R-22 System (Phased Out)', color: '#FF4444', steps: ['R-22 (Freon) production ended January 1, 2020 — supply is recycled/recovered only', 'R-22 refrigerant now costs $50–150/lb vs $5/lb in 2010', 'A leak repair + recharge can cost $1,000–3,000+ on R-22 systems', 'Budget for full system replacement — a $500 repair bill is throwing money away', 'New systems (R-410A or R-454B) are 30–50% more efficient than R-22 era', 'Ask contractors about R-32 or R-454B systems for longer-term compliance'], note: 'Every DFW summer stress-tests R-22 systems. A failure in July means $3,000 emergency replacement. Plan ahead.' };
    if (system === 'r410a') return { label: 'R-410A System (Transitioning)', color: '#F5A623', steps: ['R-410A production phase-down began in 2025 under AIM Act regulations', 'Your system will still be serviced — technicians can still charge R-410A', 'R-410A prices will rise as supply decreases over 2025–2030', 'If your system is under 10 years old, continue maintaining it normally', 'If 10+ years old, budget for replacement with R-32 or R-454B system', 'Ask your HVAC contractor what refrigerant new installs in their fleet use'], note: 'R-410A systems installed in 2020 or later will be serviceable through the 2030s. No panic needed.' };
    if (system === 'r32') return { label: 'R-32 or R-454B System (Current Standard)', color: '#4CAF50', steps: ['R-32 and R-454B have 70–75% lower global warming potential than R-410A', 'These refrigerants will be the DFW standard for new installs 2025–2035+', 'R-32 is mildly flammable (A2L class) — requires trained technicians', 'Ensure any future service tech is A2L certified for safe handling', 'Your system represents the current industry best practice for efficiency', 'Register your equipment warranty and keep installation documents'], note: 'You are ahead of most DFW homeowners. Your refrigerant choice is future-proof.' };
    return { label: 'Unknown System Age/Type', color: '#9BA3B2', steps: ['Find your outdoor condenser unit — the refrigerant type is labeled on the data plate', 'Look for: R-22 (pre-2010 systems), R-410A (2010–2024), R-32 or R-454B (2024+)', 'If unit is 15+ years old, start budgeting $6,000–12,000 for DFW replacement', 'Schedule a tune-up now — technician will identify refrigerant and system health', 'DFW 100°F+ summers accelerate compressor wear on aging systems'], note: 'DFW systems work harder than most US climates. System lifespan is typically 12–15 years here vs 18–20 elsewhere.' };
  };

  const guide = getGuide();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>❄️ DFW HVAC Refrigerant Transition Guide 2026</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem' }}>Federal refrigerant regulations are changing what HVAC systems use. Knowing your refrigerant type is critical for DFW homeowners planning service or replacement.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>📊 DFW Refrigerant Timeline</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[{era:'Pre-2010',ref:'R-22',status:'Phased out — repairs very expensive'},{era:'2010–2024',ref:'R-410A',status:'Phase-down started 2025 — still serviceable'},{era:'2024+',ref:'R-32 / R-454B',status:'Current standard — low GWP, A2L class'}].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: '#9BA3B2', fontSize: '0.85rem' }}>{row.era}</span>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{row.ref}</span>
                <span style={{ color: '#CBD2DC', fontSize: '0.88rem' }}>{row.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Transition Guide</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>What refrigerant does your system use?</label>
          <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
            <option value="">Select refrigerant type...</option>
            <option value="r22">R-22 (Freon) — pre-2010 system</option>
            <option value="r410a">R-410A — 2010 to 2024 system</option>
            <option value="r32">R-32 or R-454B — 2024 or newer</option>
            <option value="unknown">Not sure / need to check</option>
          </select>
        </div>

        {guide && (
          <div style={{ background: '#0F2744', border: `2px solid ${guide.color}`, borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'inline-block', background: guide.color, color: '#0A1628', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>{guide.label}</div>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: guide.color, fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2F4A', borderRadius: '8px', padding: '0.75rem 1rem', color: '#9BA3B2', fontSize: '0.88rem', fontStyle: 'italic' }}>💡 {guide.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}