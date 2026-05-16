import { useState } from 'react';

const situations = [
  {
    id: 'heatrisk',
    label: '🌡️ My AC is Struggling in the Heat',
    priority: 'EMERGENCY',
    steps: [
      '🚨 DFW has 60+ days above 95°F — heat stroke kills seniors faster than any other group',
      '📞 Contact ProLnk NOW for emergency HVAC match — priority routing for seniors 65+',
      '🏠 Backup plan: identify nearest air-conditioned public space (library, mall, senior center)',
      '💧 Drink water every 30 min regardless of thirst — heat suppresses thirst sensation',
      '🌡️ Warning signs of heat stroke: confusion, red dry skin, no sweating — call 911 immediately',
      '🔧 Typical AC repair: $150-600; full replacement: $4,000-8,000 — ProLnk shows upfront pricing',
    ],
  },
  {
    id: 'noac',
    label: '❌ My AC Stopped Working',
    priority: 'URGENT',
    steps: [
      '🚨 This is a medical emergency situation for seniors — act immediately',
      '1️⃣ Check thermostat batteries first (surprising how often this is the fix)',
      '2️⃣ Check breaker box — HVAC breaker may have tripped',
      '3️⃣ Check air filter — a clogged filter can shut down the system',
      '4️⃣ If none of these: call ProLnk for emergency match, available 24/7',
      '🏨 If repair is days away: stay with family, hotel, or senior center cooling shelter',
    ],
  },
  {
    id: 'winter',
    label: '❄️ Winter Heating Concerns',
    priority: 'SEASONAL',
    steps: [
      '🌡️ DFW winters can spike below 20°F — elderly are at high hypothermia risk',
      '📋 Get furnace inspected every October before first cold snap',
      '🔥 Check pilot light on gas furnace — re-lighting guide is on the unit door',
      '🪟 Weatherstripping on doors/windows prevents heat loss and lowers bills',
      '💡 ONCOR/Atmos Energy offer senior weatherization assistance programs',
      '📞 ProLnk HVAC pros offer senior tune-up packages starting at $89',
    ],
  },
  {
    id: 'planning',
    label: '📅 Preventive Maintenance Plan',
    priority: 'PROACTIVE',
    steps: [
      '🗓️ Every April: full AC tune-up before DFW summer heat (filters, refrigerant, coils)',
      '🗓️ Every October: furnace inspection before first freeze',
      '🗓️ Every month: change 1-inch filters (or every 3 months for 4-inch filters)',
      '🌿 Clear 2 feet around outdoor condenser unit — plants and debris block airflow',
      '💡 Smart thermostat (Nest, Ecobee): auto-adjust saves 15-20% on energy bills',
      '📞 ProLnk maintenance match: lock in a preferred HVAC pro for the year',
    ],
  },
];

export default function DFWSeniorHVACGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = situations.find((s) => s.id === selected);

  const priorityColor: Record<string, string> = {
    EMERGENCY: '#ef4444',
    URGENT: '#f97316',
    SEASONAL: '#3b82f6',
    PROACTIVE: '#22c55e',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌬️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior HVAC Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            HVAC failure is a medical emergency for seniors — DFW heat hits harder than almost anywhere in the US
          </p>
        </div>

        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#fca5a5' }}>
            ⚠️ <strong>DFW Heat Fact:</strong> Dallas-Fort Worth averages 60+ days above 95°F annually. Heat stroke risk for seniors 65+ is 3x higher than the general population. HVAC failure = medical emergency.
          </p>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select your situation to see your HVAC priority guide:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {situations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#1e2d45',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0, fontSize: '1.1rem', flex: 1 }}>{active.label}</h2>
              <span style={{ background: priorityColor[active.priority], color: '#fff', borderRadius: 4, padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
                {active.priority}
              </span>
            </div>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {active.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🚨 ProLnk Emergency HVAC Match — 24/7
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            Senior priority routing. Verified HVAC pros. Upfront pricing. No surprises.
          </p>
        </div>
      </div>
    </div>
  );
}
