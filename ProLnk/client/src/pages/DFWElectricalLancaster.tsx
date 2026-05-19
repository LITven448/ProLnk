import { useState } from 'react';

const homeAges = ['Built 2000+', '1990s', '1980s', '1970s', 'Pre-1970'];
const serviceTypes = ['Panel upgrade', 'New circuit / outlet', 'EV charger install', 'Ceiling fan / fixture', 'Whole-home rewire', 'GFCI / safety update'];

const permitData: Record<string, { permit: boolean; why: string; range: string }> = {
  'Panel upgrade_Built 2000+': { permit: true, why: 'Panel upgrades always require permit and inspection in Lancaster regardless of home age.', range: '$1,800–$3,500' },
  'Panel upgrade_1990s': { permit: true, why: 'Panel upgrade plus likely breaker replacement. Permit mandatory.', range: '$2,000–$4,000' },
  'Panel upgrade_1980s': { permit: true, why: 'May find aluminum wiring. Permit required. Inspector will verify service entrance.', range: '$2,200–$5,000' },
  'Panel upgrade_1970s': { permit: true, why: 'High probability of aluminum branch wiring. Permit required. Expect additional remediation costs.', range: '$3,000–$7,000' },
  'Panel upgrade_Pre-1970': { permit: true, why: 'Likely fuse box. Full panel replacement + possible service entrance upgrade. Permit required.', range: '$3,500–$8,000' },
  'New circuit / outlet_Built 2000+': { permit: true, why: 'New circuits require permit in Lancaster city limits.', range: '$200–$500' },
  'New circuit / outlet_1990s': { permit: true, why: 'Permit required. Expect conduit run through finished walls.', range: '$250–$600' },
  'New circuit / outlet_1980s': { permit: true, why: 'Permit required. Check for aluminum wiring at panel.', range: '$300–$750' },
  'New circuit / outlet_1970s': { permit: true, why: 'Permit required. Aluminum wiring likely — anti-oxidant compound needed.', range: '$350–$900' },
  'New circuit / outlet_Pre-1970': { permit: true, why: 'Permit required. Knob-and-tube possible. Inspector will assess.', range: '$450–$1,200' },
  'EV charger install_Built 2000+': { permit: true, why: 'EV chargers always require permit. Usually straightforward in newer homes.', range: '$600–$1,200' },
  'EV charger install_1990s': { permit: true, why: 'Permit required. Panel may need upgrade to support charger load.', range: '$700–$1,800' },
  'EV charger install_1980s': { permit: true, why: 'Permit required. Panel assessment needed before install.', range: '$800–$2,500' },
  'EV charger install_1970s': { permit: true, why: 'Permit required. Panel upgrade likely needed before EV charger.', range: '$1,500–$4,000' },
  'EV charger install_Pre-1970': { permit: true, why: 'Permit required. Panel upgrade mandatory. Significant project.', range: '$2,500–$6,000' },
  'Ceiling fan / fixture_Built 2000+': { permit: false, why: 'Simple fixture swap on existing circuit — no permit required in Lancaster.', range: '$100–$250' },
  'Ceiling fan / fixture_1990s': { permit: false, why: 'No permit needed for fixture replacement on existing circuit.', range: '$100–$300' },
  'Ceiling fan / fixture_1980s': { permit: false, why: 'No permit for fixture swap. Verify box is fan-rated if installing fan.', range: '$125–$350' },
  'Ceiling fan / fixture_1970s': { permit: false, why: 'No permit for fixture swap. Check wiring condition at box.', range: '$150–$400' },
  'Ceiling fan / fixture_Pre-1970': { permit: false, why: 'No permit for fixture swap. Electrician should assess wiring condition.', range: '$175–$500' },
  'Whole-home rewire_Built 2000+': { permit: true, why: 'Full rewire always requires permit regardless of home age.', range: '$8,000–$15,000' },
  'Whole-home rewire_1990s': { permit: true, why: 'Permit required. Full inspection at completion.', range: '$9,000–$18,000' },
  'Whole-home rewire_1980s': { permit: true, why: 'Permit required. Aluminum wiring likely — copper replacement standard.', range: '$10,000–$22,000' },
  'Whole-home rewire_1970s': { permit: true, why: 'Permit required. Aluminum branch wiring common. Full copper rewire recommended.', range: '$12,000–$28,000' },
  'Whole-home rewire_Pre-1970': { permit: true, why: 'Permit required. Knob-and-tube possible. Full rewire is a major project.', range: '$15,000–$35,000' },
  'GFCI / safety update_Built 2000+': { permit: false, why: 'GFCI outlet replacement on existing circuit does not require permit.', range: '$75–$200' },
  'GFCI / safety update_1990s': { permit: false, why: 'GFCI replacement — no permit required.', range: '$100–$250' },
  'GFCI / safety update_1980s': { permit: false, why: 'No permit for GFCI swap. Electrician may note additional concerns.', range: '$100–$300' },
  'GFCI / safety update_1970s': { permit: false, why: 'No permit for GFCI. Aluminum wiring may limit options — specialist needed.', range: '$150–$400' },
  'GFCI / safety update_Pre-1970': { permit: false, why: 'No permit for GFCI swap. Wiring condition assessment recommended.', range: '$175–$500' },
};

export default function DFWElectricalLancaster() {
  const [homeAge, setHomeAge] = useState('');
  const [service, setService] = useState('');
  const key = `${service}_${homeAge}`;
  const result = homeAge && service && permitData[key] ? permitData[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          ⚡ ProLnk — Lancaster TX
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          Lancaster TX Electricians<br />
          <span style={{ color: '#F5E642' }}>South Dallas County Specialists</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Lancaster is a growing south Dallas County city with a mix of established residential neighborhoods built in the 1970s–1990s and newer industrial and commercial development. Electrical work here often means navigating older aluminum branch wiring, aging panels, and Lancaster city permit requirements. Our vetted electricians know the local inspection process cold.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '📋', label: 'Permit Experts', desc: 'All work permitted and inspected to Lancaster city code — no shortcuts.' },
            { emoji: '🔌', label: 'Aluminum Wiring Certified', desc: 'COPALUM and anti-oxidant methods for 1970s-1980s Lancaster homes.' },
            { emoji: '🚗', label: 'EV Ready', desc: 'Level 2 EV charger installs with panel assessment included.' },
            { emoji: '🏭', label: 'Commercial Crossover', desc: 'Pros experienced in both residential and light commercial work.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>{card.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>
            🔎 Permit Required + Cost Estimator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Select your home age and service type to find out if a permit is required and get a cost estimate.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select home age...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Service Type</label>
              <select value={service} onChange={e => setService(e.target.value)} style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select service...</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: `2px solid ${result.permit ? '#FF8C00' : '#44FF88'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ background: result.permit ? '#FF8C00' : '#44FF88', color: '#000', fontWeight: 800, fontSize: 13, padding: '4px 14px', borderRadius: 20 }}>
                  {result.permit ? '📋 PERMIT REQUIRED' : '✅ NO PERMIT NEEDED'}
                </span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{result.range}</span>
              </div>
              <p style={{ color: '#E2E8F0', fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>{result.why}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free Electrical Quotes — Lancaster TX
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · Licensed electricians compete for your business</p>
        </div>
      </div>
    </div>
  );
}
