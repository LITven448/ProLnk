import { useState } from 'react';

const stages = [
  {
    stage: 'Pre-Contract',
    icon: '📋',
    checklist: [
      'Ask builder for Manual J load calculation — refuse vague answers',
      'Compare equipment brand tier: Carrier/Trane vs. Goodman/AirEase',
      'Request SEER rating — 16 SEER minimum for DFW climate',
      'Confirm number of systems for square footage (1 per 2,000 sq ft typical)',
    ],
    upgrades: ['Variable-speed air handler (+$1,200–1,800)', 'Two-stage compressor (+$800–1,200)', 'Media filter cabinet (+$300)'],
    negotiation: 'Best time to negotiate HVAC upgrades — builder margin is highest before contract signing.',
    accent: '#22c55e',
  },
  {
    stage: 'Pre-Drywall Inspection',
    icon: '🏗️',
    checklist: [
      'Verify duct sizing matches load calculation — not just "feels right"',
      'Check return air size: undersized returns cause high static pressure',
      'Inspect duct sealing at all trunk-and-branch connections',
      'Confirm equipment is positioned for serviceability (not buried in tight attic corner)',
    ],
    upgrades: ['Spray foam attic insulation (+$2,000–3,500)', 'Structured media center for smart thermostat pre-wire', 'Whole-house dehumidifier rough-in'],
    negotiation: 'Last chance to change duct layout without major demolition. Inspect before drywall goes up.',
    accent: '#f59e0b',
  },
  {
    stage: 'Final Walk-Through',
    icon: '🏠',
    checklist: [
      'Verify all registers deliver airflow — use a tissue or CFM meter',
      'Check that all rooms reach target temp within 20 minutes of startup',
      'Confirm warranty documentation: 1-year builder + manufacturer parts/labor',
      'Get HVAC serial numbers and installation date in writing',
    ],
    upgrades: ['Smart thermostat upgrade (Ecobee/Nest for zoning capability)', 'UV light air purifier in air handler', 'Extended labor warranty from installer'],
    negotiation: 'Document every deficiency in writing. Builder must fix pre-closing. Leverage closing date pressure.',
    accent: '#3b82f6',
  },
  {
    stage: 'Year 1 Warranty',
    icon: '📅',
    checklist: [
      'Schedule independent HVAC inspection at month 10 — before builder warranty expires',
      'Test system under peak load (July/August 100°F+ days)',
      'Document any comfort complaints with dates and temperatures',
      'Get refrigerant charge verified — builders often under-charge systems',
    ],
    upgrades: ['Add zoning dampers if hot/cold rooms present ($1,800–3,200)', 'Upgrade programmable to smart thermostat', 'Annual maintenance agreement with certified DFW contractor'],
    negotiation: 'Year 1 is your window to demand repairs under builder warranty. Document everything.',
    accent: '#a855f7',
  },
];

export default function DFWHVACNewConstruction() {
  const [selected, setSelected] = useState(stages[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>HVAC in DFW New Construction</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Builder-grade HVAC costs you more long-term. Know what to inspect, what to upgrade, and when to negotiate.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {stages.map(s => (
            <button
              key={s.stage}
              onClick={() => setSelected(s)}
              style={{
                padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected.stage === s.stage ? '#F5E642' : '#1e3a5f'}`,
                background: selected.stage === s.stage ? '#F5E642' : '#0d2137',
                color: selected.stage === s.stage ? '#0A1628' : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 13,
              }}
            >
              {s.icon} {s.stage}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>
            {selected.icon} {selected.stage} — HVAC Checklist
          </h2>

          <div style={{ marginBottom: 20 }}>
            {selected.checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ background: selected.accent, color: '#000', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5, margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>⬆️ Worth Upgrading</p>
              {selected.upgrades.map((u, i) => (
                <p key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>• {u}</p>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid #F5E642` }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🤝 Negotiation Window</p>
              <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{selected.negotiation}</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>🌡️ DFW Climate Reality</p>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            DFW averages 30+ days above 100°F annually. Builder-grade 14 SEER single-stage systems work — but run 40% more than a 2-stage 18 SEER unit over a 10-year lifespan. The upgrade pays for itself in 4–6 years at current Texas electricity rates.
          </p>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get a pre-closing HVAC inspection from a certified DFW contractor</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Book Inspection
          </button>
        </div>
      </div>
    </div>
  );
}