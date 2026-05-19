import { useState } from 'react';

const SEALING_COST_DIY = 0.20;
const SEALING_COST_PRO = 0.525;
const CRACK_REPAIR = 300;
const RESURFACING_PER_SQFT = 3.5;
const REPLACEMENT_PER_SQFT = 10.5;

type MaterialType = 'concrete' | 'asphalt';

interface CalcResult {
  sealingDIY: number;
  sealingPro: number;
  estimatedCrackRepair: number;
  tenYearLowDIY: number;
  tenYearHighPro: number;
  schedule: string[];
}

function calcCosts(sqft: number, material: MaterialType): CalcResult {
  const sealFreq = material === 'concrete' ? 4 : 2.5;
  const sealsIn10 = Math.floor(10 / sealFreq);
  const sealDIY = sqft * 0.15 * sealsIn10;
  const sealPro = sqft * 0.65 * sealsIn10;
  const crack = CRACK_REPAIR * 2;
  const schedule: string[] = [];
  if (material === 'concrete') {
    schedule.push('Year 1: Inspect for cracks, fill hairlines with polyurethane');
    schedule.push('Year 3-5: Apply penetrating sealer');
    schedule.push('Year 5: Professional inspection for heaving or drainage');
    schedule.push('Year 8-10: Re-seal, consider resurfacing if >15% cracked');
  } else {
    schedule.push('Year 1: Fill any cracks, apply sealer coat');
    schedule.push('Year 2-3: Re-seal (DFW sun degrades asphalt faster)');
    schedule.push('Year 5: Professional assessment');
    schedule.push('Year 10: Consider resurfacing ($' + (sqft * 2).toLocaleString() + '-' + (sqft * 5).toLocaleString() + ')');
  }
  return {
    sealingDIY: sealDIY,
    sealingPro: sealPro,
    estimatedCrackRepair: crack,
    tenYearLowDIY: sealDIY + crack,
    tenYearHighPro: sealPro + crack + sqft * 5,
    schedule,
  };
}

export default function DrivewayMaintenanceGuide() {
  const [sqft, setSqft] = useState('600');
  const [material, setMaterial] = useState<MaterialType>('concrete');
  const result = calcCosts(Number(sqft) || 600, material);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#38bdf8', fontWeight: 600, letterSpacing: 1 }}>
          🏠 DFW HOMEOWNER GUIDES
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#f8fafc' }}>
          DFW Driveway Maintenance Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>
          Protect Your Concrete and Asphalt
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #38bdf8′ }}>
          <p style={{ fontSize: 16, color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            🌡️ <strong style={{ color: '#f1f5f9′ }}>DFW driveway challenge:</strong> DFW’s extreme temperature swings (10°F to 110°F), clay soil movement, and heavy rains stress driveways more than most US climates. Most driveways fail prematurely due to neglect, not age.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🏗️ Concrete Driveways (Most DFW Homes)</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔒', title: 'Seal Every 3-5 Years', body: 'Use penetrating sealer, not topical. Penetrating sealers bond with the concrete and last longer in DFW heat. Topical sealers peel and trap moisture.' },
            { icon: '🧂', title: 'Avoid Deicers', body: 'Salt and chemical deicers damage concrete. Use sand for traction instead. DFW rarely needs deicers, but the occasional ice storm tempts homeowners — resist it.' },
            { icon: '🔍', title: 'Crack Repair Guide', body: 'Hairline cracks (<1/8″ wide) are cosmetic — monitor annually. Cracks >1/4″ wide need professional repair ($200-800). Heaving or drainage issues require full section replacement.' },
            { icon: '🔄', title: 'When to Replace', body: 'Replace when >30% of surface is cracked, heaving is present, or drainage fails. Average DFW driveway replacement: $3,500-8,000.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🖤 Asphalt Driveways (Less Common in DFW)</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', title: 'Seal Every 2-3 Years', body: 'Hot DFW sun degrades asphalt faster than most US regions. UV oxidation causes brittleness and cracking. Coal tar or asphalt-based sealers work best.' },
            { icon: '🔧', title: 'Fill Cracks Annually', body: 'Annual crack filling prevents water intrusion and extends life significantly. Cold-patch filler for DIY; hot-mix repair for professional results.' },
            { icon: '📅', title: 'DFW Asphalt Life Expectancy', body: 'Average asphalt driveway life in DFW: 15-20 years with proper maintenance. Without sealing: 8-12 years.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>⚠️ DFW-Specific Issues</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌿', title: 'Clay Soil Movement', body: 'DFW sits on expansive clay soil that swells when wet and shrinks when dry. Consistent landscape watering reduces seasonal movement and extends driveway life.' },
            { icon: '🧊', title: 'Post-Freeze Damage', body: 'Freeze-thaw cycles cause spalling (surface flaking). Apply sealer before winter to prevent water infiltration that expands when frozen.' },
            { icon: '🛢️', title: 'Oil Stains', body: 'Vehicles drip more oil in DFW heat. Remove promptly — oil penetrates concrete quickly and is difficult to remove once set. Use cat litter or degreaser immediately.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 14 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>💰 DFW Cost Guide</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, overflow: 'hidden', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f172a' }}>
                {['Service', 'DIY Cost', 'Professional Cost'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#38bdf8', fontSize: 13, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Sealing', '$0.15-0.25/sqft', '$0.40-0.65/sqft'],
                ['Crack Repair', '$20-80 (DIY kit)', '$100-500 professional'],
                ['Resurfacing', 'Not recommended DIY', '$2-5/sqft'],
                ['Full Replacement', 'Not recommended DIY', '$6-15/sqft'],
              ].map(([service, diy, pro], i) => (
                <tr key={service} style={{ borderTop: '1px solid #334155', background: i % 2 === 0 ? 'transparent' : '#162032′ }}>
                  <td style={{ padding: '14px 20px', color: '#f1f5f9', fontWeight: 600 }}>{service}</td>
                  <td style={{ padding: '14px 20px', color: '#94a3b8′ }}>{diy}</td>
                  <td style={{ padding: '14px 20px', color: '#94a3b8′ }}>{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🧮 10-Year Cost Calculator</h2>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Driveway Size (sq ft)
              </label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
                placeholder="600″
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Material Type
              </label>
              <select
                value={material}
                onChange={e => setMaterial(e.target.value as MaterialType)}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
              >
                <option value="concrete">Concrete (most DFW)</option>
                <option value="asphalt">Asphalt</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'DIY Sealing (10yr)', value: `$${result.sealingDIY.toLocaleString()}`, color: '#22c55e' },
              { label: 'Pro Sealing (10yr)', value: `$${result.sealingPro.toLocaleString()}`, color: '#38bdf8′ },
              { label: 'Est. Crack Repairs', value: `$${result.estimatedCrackRepair.toLocaleString()}`, color: '#f59e0b' },
              { label: '10-Year Total (DIY)', value: `$${result.tenYearLowDIY.toLocaleString()}`, color: '#a78bfa' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0f172a', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>📅 YOUR MAINTENANCE SCHEDULE</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {result.schedule.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f2d4a)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Need a DFW Driveway Contractor?</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk connects you with vetted concrete and asphalt contractors in your area. No hidden fees — pay exactly what the contractor charges.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#38bdf8', color: '#0f172a', fontWeight: 800, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>
            Get Free Quotes
          </a>
        </div>

      </div>
    </div>
  );
}
