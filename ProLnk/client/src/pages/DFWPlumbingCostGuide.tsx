import { useState } from 'react';

const HARD_WATER_IMPACT = [
  { system: 'Standard water heater', national: '12 years', dfw: '7–8 years', note: '35% shorter lifespan' },
  { system: 'Tankless water heater', national: '20 years', dfw: '14–16 years', note: 'Scale buildup on heat exchanger' },
  { system: 'Dishwasher', national: '9 years', dfw: '6–7 years', note: 'Scale clogs spray arms' },
  { system: 'Washing machine', national: '11 years', dfw: '8–9 years', note: 'Valve and seal damage' },
  { system: 'Faucets & fixtures', national: '15–20 years', dfw: '8–12 years', note: 'Aerator buildup, valve wear' },
];

export default function DFWPlumbingCostGuide() {
  const [softenerSize, setSoftenerSize] = useState('medium');

  const softenerCosts: Record<string, { equip: string; install: string; monthly: string }> = {
    small: { equip: '$400–$700', install: '$300–$500', monthly: '$15–$25 (salt)' },
    medium: { equip: '$700–$1,200', install: '$400–$700', monthly: '$20–$35 (salt)' },
    large: { equip: '$1,200–$2,000', install: '$500–$900', monthly: '$30–$50 (salt)' },
  };
  const sc = softenerCosts[softenerSize];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1B2B4B' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 14, color: '#718096' }}>ProLnk Cost Guide · Dallas-Fort Worth · Updated May 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px' }}>
          DFW Plumbing Cost Guide 2026 —<br />Water Heaters, Leaks, and Hard Water
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4A5568', margin: '0 0 40px', maxWidth: 680 }}>
          DFW tap water runs <strong>300–500 PPM hardness</strong> — among the highest in major US metros. That single fact shortens appliance lifespans, increases maintenance costs, and affects almost every plumbing decision you make.
        </p>

        {/* Hard Water Impact */}
        <div style={{ background: '#FFF5F5', border: '1.5px solid #FC8181', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#742A2A', marginBottom: 4 }}>Hard Water Destroys DFW Appliances Early</div>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#C53030', lineHeight: 1.6 }}>
            At 300–500 PPM, DFW water heaters fail in 7–8 years vs. 12 nationally. Budget accordingly — and consider a water softener before your next appliance replacement.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#FED7D7' }}>
                  {['System', 'National Avg Life', 'DFW Avg Life', 'Why'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#742A2A', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HARD_WATER_IMPACT.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FFF5F5' }}>
                    <td style={{ padding: '10px 14px', color: '#2D3748', fontWeight: 600 }}>{row.system}</td>
                    <td style={{ padding: '10px 14px', color: '#4A5568' }}>{row.national}</td>
                    <td style={{ padding: '10px 14px', color: '#C53030', fontWeight: 700 }}>{row.dfw}</td>
                    <td style={{ padding: '10px 14px', color: '#718096' }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>DFW Plumbing Service Pricing</h2>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #E2E8F0', marginBottom: 40 }}>
          {[
            ['Service call / dispatch fee', '$75 – $150'],
            ['Drain cleaning (standard)', '$150 – $350'],
            ['Faucet replacement', '$200 – $400'],
            ['Toilet repair', '$150 – $300'],
            ['Toilet replacement (installed)', '$400 – $800'],
            ['Water heater — 40-gal gas (installed)', '$800 – $1,400'],
            ['Water heater — tankless gas (installed)', '$1,800 – $3,500'],
            ['Water softener installation', '$1,200 – $2,500'],
            ['Slab leak detection', '$200 – $500'],
            ['Slab leak repair', '$1,500 – $5,000+'],
            ['Full home repipe', '$5,000 – $15,000'],
          ].map(([service, price], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: i % 2 === 0 ? '#fff' : '#F7F9FC', borderBottom: i < 10 ? '1px solid #E2E8F0' : 'none' }}>
              <span style={{ fontSize: 15, color: '#2D3748' }}>{service}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1B2B4B', whiteSpace: 'nowrap' }}>{price}</span>
            </div>
          ))}
        </div>

        {/* Water Softener Calculator */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>Water Softener Cost Estimator</h2>
        <div style={{ background: '#fff', border: '2px solid #E8D87A', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#4A5568' }}>HOME SIZE</label>
            <select value={softenerSize} onChange={e => setSoftenerSize(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #CBD5E0', fontSize: 15, background: '#fff', color: '#1B2B4B', cursor: 'pointer' }}>
              <option value="small">Small (under 1,500 sq ft, 1–2 people)</option>
              <option value="medium">Medium (1,500–3,000 sq ft, 3–4 people)</option>
              <option value="large">Large (3,000+ sq ft, 5+ people)</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              ['Equipment', sc.equip],
              ['Installation', sc.install],
              ['Monthly upkeep', sc.monthly],
            ].map(([label, val]) => (
              <div key={label} style={{ background: '#F7F9FC', borderRadius: 8, padding: '16px 18px' }}>
                <div style={{ fontSize: 12, color: '#718096', marginBottom: 4, fontWeight: 600 }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1B2B4B' }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: '#718096' }}>
            ROI: A softener typically extends water heater life by 3–5 years in DFW — saving $500–$1,200 on early replacement.
          </div>
        </div>

        {/* Freeze Damage Warning */}
        <div style={{ background: '#EBF4FF', border: '1.5px solid #3182CE', borderRadius: 10, padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1A365D', marginBottom: 8 }}>Texas Freeze Warning — Annual Pipe Inspection</div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#2C5282' }}>
            Burst pipes from freezing cost <strong>$500–$1,500 in repairs</strong> — but the resulting water damage can reach <strong>$10,000+</strong>. A licensed plumber can inspect and insulate exposed pipes for <strong>~$150</strong> before winter. It's the highest-ROI plumbing investment you can make in DFW.
          </p>
          <div style={{ marginTop: 14, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Insulate exterior pipes', 'Know your main shutoff', 'Drip faucets below 28°F', 'Service in October'].map(tip => (
              <div key={tip} style={{ fontSize: 13, color: '#2B6CB0', fontWeight: 600 }}>✓ {tip}</div>
            ))}
          </div>
        </div>

        {/* Slab Leak Info */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 16px' }}>Slab Leaks — A DFW-Specific Problem</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4A5568', margin: '0 0 24px' }}>
          DFW's expansive clay soils shift seasonally, stressing pipes embedded in concrete slabs. Signs of a slab leak: unexplained high water bills, warm spots on floors, low water pressure, or the sound of running water when all fixtures are off. Detection runs $200–$500; repair ranges widely based on location and method.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { method: 'Spot repair', cost: '$1,500–$3,000', note: 'Cut through slab at leak location' },
            { method: 'Reroute / reline', cost: '$2,500–$5,000', note: 'Bypass damaged pipe through walls' },
            { method: 'Epoxy pipe lining', cost: '$3,000–$5,000+', note: 'No demolition, lasts 30+ years' },
            { method: 'Full repipe', cost: '$5,000–$15,000', note: 'Replace all pipes, long-term solution' },
          ].map((opt, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{opt.method}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1B2B4B', marginBottom: 6 }}>{opt.cost}</div>
              <div style={{ fontSize: 13, color: '#718096' }}>{opt.note}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: '#1B2B4B', borderRadius: 14, padding: '36px 40px', textAlign: 'center' }}>
          <h3 style={{ color: '#E8D87A', fontSize: 22, fontWeight: 800, margin: '0 0 12px' }}>Find a Licensed DFW Plumber</h3>
          <p style={{ color: '#A0AEC0', margin: '0 0 24px', fontSize: 15 }}>
            ProLnk verifies state licenses, reviews, and pricing transparency before any plumber joins the network.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#E8D87A', color: '#1B2B4B', fontWeight: 800, fontSize: 16, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}>
            Get Free Estimates →
          </a>
        </div>

      </div>
    </div>
  );
}
