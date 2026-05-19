import { useState } from 'react';

const atticTypes = [
  { id: 'pulldown', label: '🪜 Pull-Down Stair Attic', steps: ['Test stair load rating before stepping — most are 250 lbs max', 'Inspect hardware: hinges, springs, and pivot arms age in DFW heat', 'Set up work light before climbing — attics are dark and full of trip hazards', 'Go in March–May or October–November — summer attic temps reach 140°F', 'Wear N95 mask — insulation fibers and dust are a respiratory hazard'] },
  { id: 'hatch', label: '🟫 Ceiling Hatch Access', steps: ['Use a stable 6-ft ladder — do not overreach, repositioning is safer', 'Push hatch straight up and slide to the side, avoid dropping insulation', 'Keep one hand on the ladder at all times when transitioning in', 'Use a headlamp — hands-free is essential for hatch entry', 'Lay a plywood board across joists before moving around — never step between joists'] },
  { id: 'knee', label: '🚪 Knee Wall / Side Access', steps: ['Knee wall doors are typically in closets or hallways in DFW ranch homes', 'Access is easier but beams are low — bring a headlamp and expect to crouch', 'Check for pest activity near the door — gaps allow entry', 'Side attic spaces often have poor insulation at the knee wall itself', 'Inspect knee wall insulation batts — they fall over time due to DFW humidity cycling'] },
  { id: 'noAccess', label: '❌ No Attic Access', steps: ['No access is a red flag — means no way to inspect HVAC ducts or roof deck', 'A carpenter or handyman can typically install a hatch for $200-$400', 'Choose a closet ceiling location to keep it out of living areas', 'Minimum hatch size is 22″×30″ per building code', 'Install attic stairs if you plan to use the space for storage'] },
];

export default function DFWAtticAccessGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = atticTypes.find(t => t.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🔼 DFW Attic Access & Safety Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW attics hit 130–140°F in July and August. Never enter between May and September without a thermometer check. Spring and fall are ideal windows for inspection — target HVAC ductwork, insulation depth, roof deck condition, and pest activity.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🌡️', label: 'Safe Entry Temp', value: 'Below 100°F' },
            { icon: '📅', label: 'Best Months', value: 'Mar–May, Oct–Nov' },
            { icon: '⏱️', label: 'Max Stay in Summer', value: 'Under 15 minutes' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111d30', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔍 What to Inspect Once You Are Up There</h2>
        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          {[
            'Insulation depth: R-38 minimum for DFW climate zone 3 (about 12 inches blown-in)',
            'HVAC ducts: look for disconnected sections, tears, or flex duct sag — very common',
            'Roof deck: dark staining or wet spots indicate active leak, check after rain',
            'Ridge vent and soffit vents: confirm they are clear and unblocked',
            'Pest signs: droppings, chewed wiring, nesting material from squirrels or rats',
            'Attic fan operation: many DFW homes have power attic ventilators that fail',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontSize: 16 }}>▸</span>
              <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🪜 Select Your Attic Access Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {atticTypes.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id === selected ? null : t.id)}
              style={{ background: selected === t.id ? '#F5E642′ : '#111d30', color: selected === t.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {t.label}
            </button>
          ))}
        </div>

        {current && (
          <div style={{ background: '#111d30', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 14 }}>Safe Inspection Guide: {current.label}</h3>
            {current.steps.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{idx + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
