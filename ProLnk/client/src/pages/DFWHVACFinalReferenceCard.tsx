import { useState } from 'react';

const homeTypes = ['1950s Slab', '1970s Pier & Beam', '1990s Two-Story', '2000s+ New Build'];

const baseData = {
  filterSchedule: ['1″ filters: every 30 days', '4″ media filters: every 90 days', 'MERV 11+ recommended for DFW allergens'],
  tuneUp: ['Spring tune-up: March–April before 100°F season', 'Fall tune-up: October before first freeze', 'Two tune-ups/year standard in DFW climate'],
  drainLine: ['Flush with 1 cup bleach + water monthly May–Sept', 'Clear trap at air handler quarterly', 'Install float switch to prevent overflow damage'],
  emergency: ['No cool air: check thermostat, filter, breaker first', 'Ice on coil: shut off AC, run fan only 1 hour', 'Call for service if temp rises >5°F above setpoint'],
  replacement: ['15 years: begin budgeting ($6K–$12K DFW average)', 'R-22 units: replace now — refrigerant unavailable', 'SEER 16+ required for TX rebates'],
  vetting: ['Verify TACLA license at tdlr.texas.gov', 'Get 3 written quotes for replacement', 'Confirm permit pulled for new installs'],
};

const typeOverrides: Record<string, Partial<typeof baseData>> = {
  '1950s Slab': { replacement: ['System likely 20+ years — prioritize replacement budget', 'Ductwork may be uninsulated — add to quote scope', 'R-22 phase-out critical — replace immediately'] },
  '1970s Pier & Beam': { drainLine: ['Inspect drain routing under floor annually', 'Check for moisture under home after heavy rain', 'Flush bleach monthly May–Sept'] },
  '1990s Two-Story': { filterSchedule: ['Two-zone systems: two filters to track', 'Upper zone filter often missed — label both', 'Change both filters same day for consistency'] },
  '2000s+ New Build': { replacement: ['System at or near 15-year mark — budget now', 'Warranty may cover parts — check documentation', 'High-efficiency upgrade eligible for TX rebates'] },
};

export default function DFWHVACFinalReferenceCard() {
  const [homeType, setHomeType] = useState(homeTypes[0]);

  const data = { ...baseData, ...(typeOverrides[homeType] || {}) };

  const sections = [
    { emoji: '🔲', title: 'Filter Schedule', items: data.filterSchedule },
    { emoji: '🔧', title: 'Tune-Up Timing', items: data.tuneUp },
    { emoji: '💧', title: 'Drain Line Care', items: data.drainLine },
    { emoji: '🚨', title: 'Emergency Protocol', items: data.emergency },
    { emoji: '🔄', title: 'Replacement Timing', items: data.replacement },
    { emoji: '✅', title: 'Contractor Vetting', items: data.vetting },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>❄️🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: 800, margin: 0 }}>DFW HVAC Final Reference Card</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '6px' }}>Everything you need — one page, DFW-specific</p>
        </div>

        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <label style={{ color: '#cbd5e1', fontSize: '13px', marginRight: '10px' }}>My DFW Home Type:</label>
          <select
            value={homeType}
            onChange={e => setHomeType(e.target.value)}
            style={{ background: '#1e293b', color: '#F5E642', border: '1px solid #F5E642', borderRadius: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            {homeTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {sections.map(sec => (
            <div key={sec.title} style={{ background: '#1e293b', borderRadius: '10px', padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{sec.emoji}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '14px' }}>{sec.title}</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                {sec.items.map((item, i) => (
                  <li key={i} style={{ color: '#cbd5e1', fontSize: '12px', lineHeight: '1.6', marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', background: '#F5E642', borderRadius: '8px', padding: '12px 16px', textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '13px' }}>📋 Print this card — post it near your air handler</span>
        </div>
      </div>
    </div>
  );
}
