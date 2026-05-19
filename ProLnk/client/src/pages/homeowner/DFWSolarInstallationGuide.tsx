import { useState } from 'react';

const considerations = [
  { icon: '🌨️', title: 'Hail Resistance', detail: 'DFW hail is serious. Specify IEC 61215 Class 4 hail-rated panels — only ~30% premium over standard panels. After Winter Storm Uri and subsequent hail seasons, any lesser rating is a liability.' },
  { icon: '🏘️', title: 'HOA Rules', detail: 'Texas SB 932 prohibits HOAs from banning solar outright, but they can regulate aesthetics (panel placement, color, visibility from street). Get a variance letter before signing a contract.' },
  { icon: '🏠', title: 'Roof Age', detail: 'Your roof should be under 10 years old before installing solar. Installing solar on an aging roof means removing and reinstalling panels when the roof needs replacement — an extra $3,000–$5,000 cost. Roof first, then solar.' },
  { icon: '🌿', title: 'Ground Mount Option', detail: 'If your home has limited south-facing roof space, ground mount systems achieve optimal angle and produce 10–15% more power. Requires yard space and local permit. Cost: $2,000–$5,000 more than roof mount.' },
];

const processSteps = [
  { num: 1, step: 'Get 3 quotes from different installers', detail: 'Prices vary 20–30% between installers. Never accept a first quote without comparison.' },
  { num: 2, step: 'Verify NABCEP certification', detail: 'North American Board of Certified Energy Practitioners — the industry standard credential for solar installers.' },
  { num: 3, step: 'Confirm permits are pulled before installation', detail: 'Legitimate installers always pull permits. Unpermitted systems create title issues and void warranties.' },
  { num: 4, step: 'Inspect the final install', detail: 'Walk the roof (or hire an inspector). Verify conduit runs are tidy, penetrations are sealed, and all connections are weather-protected.' },
];

const batteries = [
  { name: 'Tesla Powerwall 3', capacity: '13.5 kWh', cost: '$11,500+', note: 'Most popular. 10-year warranty. Seamless Tesla app integration.' },
  { name: 'Enphase IQ Battery 5P', capacity: '5 kWh (stackable)', cost: '$8,000–$14,000', note: 'Modular — add capacity incrementally. Excellent reliability record.' },
  { name: 'Franklin aPower', capacity: '13.6 kWh', cost: '$10,000+', note: 'Strong post-Uri demand. Good whole-home backup capability.' },
];

export default function DFWSolarInstallationGuide() {
  const [monthlyBill, setMonthlyBill] = useState(220);
  const [hasBattery, setHasBattery] = useState(false);

  const systemSize = Math.ceil(monthlyBill / 22);
  const baseCost = systemSize * 2800;
  const batteryCost = hasBattery ? 13500 : 0;
  const totalCost = baseCost + batteryCost;
  const afterItc = Math.round(totalCost * 0.70);
  const annualSavings = monthlyBill * 12 * 0.88;
  const paybackYears = annualSavings > 0 ? (afterItc / annualSavings).toFixed(1) : '–';
  const savings25yr = Math.round(annualSavings * 25 - afterItc);

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh', color: '#e6edf3', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            ☀️ DFW Solar Guide 2026
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 14px', lineHeight: 1.2 }}>
            DFW Solar Installation Guide
          </h1>
          <p style={{ fontSize: 18, color: '#8b949e', maxWidth: 560, margin: '0 auto' }}>
            Is 2026 the year to go solar? 30% federal tax credit through 2032, 5.8 peak sun hours/day, and post-Uri battery demand
          </p>
        </div>

        {/* 2026 Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 48 }}>
          {[
            { val: '30%', label: 'Federal ITC through 2032′ },
            { val: '5.8', label: 'Peak sun hours/day (top 20%)' },
            { val: '7–10 yr', label: 'DFW avg payback period' },
            { val: '1,200', label: 'kWh/mo avg DFW home uses' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#f59e0b' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#8b949e', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div style={{ background: '#161b22', borderRadius: 16, border: '1px solid #30363d', padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#f0f6fc' }}>☀️ Solar ROI Calculator</h2>
          <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 24px' }}>Based on DFW averages: $2.80/W installed, Oncor net metering, 30% ITC</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 14, color: '#8b949e' }}>Current Monthly Electric Bill</label>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#f59e0b' }}>${monthlyBill}/mo</span>
            </div>
            <input type="range" min={80} max={500} value={monthlyBill} onChange={e => setMonthlyBill(Number(e.target.value))} style={{ width: '100%', accentColor: '#f59e0b' }} />
          </div>

          <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer', marginBottom: 24 }}>
            <input type="checkbox" checked={hasBattery} onChange={e => setHasBattery(e.target.checked)} style={{ accentColor: '#f59e0b', width: 16, height: 16 }} />
            <span style={{ fontSize: 14, color: '#8b949e' }}>Include battery storage (Tesla Powerwall 3, +$13,500)</span>
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'Recommended System Size', val: `${systemSize} kW` },
              { label: 'Gross System Cost', val: `$${totalCost.toLocaleString()}` },
              { label: 'After 30% Federal ITC', val: `$${afterItc.toLocaleString()}` },
              { label: 'Annual Energy Savings', val: `$${Math.round(annualSavings).toLocaleString()}` },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0d1117', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#8b949e', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#e6edf3′ }}>{item.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: '#2d1f06', border: '1px solid #f59e0b', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#f59e0b', marginBottom: 4 }}>Payback Period</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#f59e0b' }}>{paybackYears} yrs</div>
            </div>
            <div style={{ background: '#0d2818', border: '1px solid #238636', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#3fb950', marginBottom: 4 }}>25-Year Net Savings</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#3fb950′ }}>${Math.max(0, savings25yr).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* DFW-Specific Considerations */}
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f0f6fc' }}>DFW-Specific Considerations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
          {considerations.map((c, i) => (
            <div key={i} style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 22 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f0f6fc', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.6 }}>{c.detail}</div>
            </div>
          ))}
        </div>

        {/* Battery Storage */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#f0f6fc' }}>🔋 Battery Storage in DFW</h2>
          <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 6px' }}>Post-Uri demand exploded. Without a battery: grid outage = your solar doesn't work (safety feature). With battery: whole-home backup during outages.</p>
          <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 20px' }}>Cost range: $10,000–$18,000 for whole-home backup. Eligible for 30% ITC when installed with solar.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {batteries.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 16, background: '#0d1117', borderRadius: 8, border: '1px solid #30363d' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f6fc' }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#8b949e', marginTop: 2 }}>{b.note}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{b.cost}</div>
                  <div style={{ fontSize: 11, color: '#8b949e' }}>{b.capacity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Process */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px', color: '#f0f6fc' }}>📋 Getting It Done Right</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {processSteps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#0d1117', flexShrink: 0 }}>{s.num}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e6edf3', marginBottom: 2 }}>{s.step}</div>
                  <div style={{ fontSize: 12, color: '#8b949e' }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Oncor Net Metering Note */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', padding: 24, marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 10px', color: '#f0f6fc' }}>⚡ Oncor Net Metering</h3>
          <p style={{ fontSize: 13, color: '#8b949e', lineHeight: 1.7, margin: 0 }}>
            Oncor provides the grid connection. Your retail electric provider (REP) — TXU, Reliant, Green Mountain, etc. — sets the buyback rate for excess power. Shop REPs specifically for solar buyback rates before signing an installation contract. Some REPs offer 1:1 buyback; others offer significantly less. This decision significantly affects your payback period.
          </p>
        </div>

        {/* TrustyPro CTA */}
        <div style={{ background: 'linear-gradient(135deg, #2d1f06 0%, #0a1628 100%)', borderRadius: 16, border: '1px solid #f59e0b', padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>☀️</div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', color: '#f0f6fc' }}>Document Your Solar Install in TrustyPro</h3>
          <p style={{ fontSize: 14, color: '#8b949e', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Add your solar system to your Home Health Vault — warranty docs, permit records, inverter specs, and installer contacts. When you sell, this documentation is worth thousands in buyer confidence.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#f59e0b', color: '#0d1117', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 15 }}
          >
            Add My Home to TrustyPro
          </a>
        </div>
      </div>
    </div>
  );
}
