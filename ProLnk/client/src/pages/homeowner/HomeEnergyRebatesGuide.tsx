import { useState } from 'react';

const rebates = [
  { id: 'solar', label: 'Solar panels', federal: 30, utility: 0, note: '30% federal tax credit through 2032′ },
  { id: 'battery', label: 'Battery storage', federal: 30, utility: 0, note: '30% federal tax credit' },
  { id: 'heatpump', label: 'Heat pump HVAC', federal: 30, utility: 500, note: 'Federal credit + Oncor rebate' },
  { id: 'geothermal', label: 'Geothermal heat pump', federal: 30, utility: 0, note: '30% federal tax credit' },
  { id: 'insulation', label: 'Insulation upgrade', federal: 30, utility: 0, note: '30% federal credit (up to $1,200)' },
  { id: 'thermostat', label: 'Smart thermostat', federal: 0, utility: 100, note: 'Oncor: $100 rebate' },
  { id: 'evcharger', label: 'EV charger (Level 2)', federal: 30, utility: 250, note: 'Federal 30% + Oncor $250′ },
  { id: 'irrigation', label: 'Smart irrigation (Frisco)', federal: 0, utility: 75, note: 'Frisco water conservation rebate' },
];

export default function HomeEnergyRebatesGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [jobCost, setJobCost] = useState<Record<string, number>>({});

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const totalFederal = selected.reduce((sum, id) => {
    const r = rebates.find(x => x.id === id);
    const cost = jobCost[id] || 0;
    return sum + (r ? (cost * r.federal / 100) : 0);
  }, 0);

  const totalUtility = selected.reduce((sum, id) => {
    const r = rebates.find(x => x.id === id);
    return sum + (r ? r.utility : 0);
  }, 0);

  const totalSavings = totalFederal + totalUtility;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#1a3a1a', color: '#4ade80', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            💰 2026 REBATE GUIDE
          </span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 8, color: '#ffffff' }}>
          DFW Home Energy Rebates 2026
        </h1>
        <p style={{ fontSize: 20, color: '#4ade80', fontWeight: 700, marginBottom: 16 }}>
          Free Money You're Missing
        </p>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 48, lineHeight: 1.7 }}>
          Texas homeowners have access to thousands of dollars in federal tax credits and utility rebates for energy improvements. Most go unclaimed because homeowners don't know they exist.
        </p>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#ffffff' }}>🏛️ Federal Tax Credits (Through 2032)</h2>
        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#94a3b8', marginBottom: 16, lineHeight: 1.7 }}>
            The Inflation Reduction Act provides a <strong style={{ color: '#4ade80′ }}>30% federal tax credit</strong> on qualifying home energy improvements. This is a dollar-for-dollar reduction in your tax bill — not a deduction.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {['Solar panels', 'Geothermal heat pump', 'Battery storage', 'Qualifying heat pump HVAC', 'Insulation & air sealing (up to $1,200)', 'Energy-efficient windows (up to $600)'].map(item => (
              <div key={item} style={{ background: '#0d1f0d', border: '1px solid #1a3a1a', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#4ade80', marginRight: 8 }}>✓</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 16 }}>
            File IRS Form 5695 with your tax return. Keep all receipts and contractor invoices.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#ffffff' }}>⚡ Utility Rebates (DFW)</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { utility: 'Oncor Electric', color: '#1e3a5f', accent: '#60a5fa', rebates: ['Smart thermostat: $100 rebate', 'EV charger (Level 2): $250 rebate', 'HVAC high-efficiency upgrade: varies by unit', 'Pool pump variable speed: $100-$150'] },
            { utility: 'AEP Texas', color: '#1a1a3a', accent: '#a78bfa', rebates: ['Smart thermostat: $50-$100', 'HVAC efficiency upgrade: varies', 'Weatherization assistance for qualifying households', 'Commercial programs for home office equipment'] },
            { utility: 'City of Dallas (PACE)', color: '#1a2a1a', accent: '#4ade80', rebates: ['PACE financing: 0% interest for energy improvements', 'Repaid through property tax bill', 'No upfront cost option for solar, HVAC, windows', 'Transfers with the property if you sell'] },
            { utility: 'Frisco Water Conservation', color: '#1a2030', accent: '#38bdf8', rebates: ['Smart irrigation controller: $75', 'High-efficiency toilet replacement: $100', 'Rain barrel: $25', 'Drip irrigation conversion: $50'] },
          ].map(u => (
            <div key={u.utility} style={{ background: u.color, borderRadius: 16, padding: 24 }}>
              <h3 style={{ color: u.accent, fontWeight: 700, marginBottom: 12, fontSize: 18 }}>{u.utility}</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {u.rebates.map(item => (
                  <li key={item} style={{ color: '#e2e8f0', fontSize: 14, padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: u.accent, marginRight: 8 }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#ffffff' }}>🧮 Rebate Calculator</h2>
        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Select the improvements you're planning and enter your estimated project cost to see total rebates.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {rebates.map(r => (
              <div key={r.id} style={{ background: selected.includes(r.id) ? '#0d1f0d' : '#1e293b', border: `1px solid ${selected.includes(r.id) ? '#4ade80' : '#334155'}`, borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: selected.includes(r.id) ? 12 : 0 }}>
                  <input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggle(r.id)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{r.label}</span>
                    <span style={{ color: '#64748b', fontSize: 13, marginLeft: 12 }}>{r.note}</span>
                  </div>
                </div>
                {selected.includes(r.id) && r.federal > 0 && (
                  <div style={{ marginLeft: 30, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <label style={{ color: '#94a3b8', fontSize: 14 }}>Project cost: $</label>
                    <input
                      type="number"
                      value={jobCost[r.id] || ''}
                      onChange={e => setJobCost(prev => ({ ...prev, [r.id]: Number(e.target.value) }))}
                      placeholder="e.g. 15000″
                      style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 6, padding: '6px 10px', color: '#f0f0f0', width: 140, fontSize: 14 }}
                    />
                    {jobCost[r.id] > 0 && (
                      <span style={{ color: '#4ade80', fontWeight: 600 }}>
                        → Federal credit: ${Math.round(jobCost[r.id] * r.federal / 100).toLocaleString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div style={{ marginTop: 24, background: '#0d1f0d', border: '1px solid #4ade80', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#4ade80', marginBottom: 12, fontSize: 18 }}>Your Estimated Rebates</h3>
              {totalFederal > 0 && <p style={{ color: '#e2e8f0′ }}>Federal tax credits: <strong style={{ color: '#4ade80' }}>${Math.round(totalFederal).toLocaleString()}</strong></p>}
              {totalUtility > 0 && <p style={{ color: '#e2e8f0′ }}>Utility rebates: <strong style={{ color: '#4ade80' }}>${totalUtility.toLocaleString()}</strong></p>}
              <p style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, marginTop: 8 }}>Total estimated savings: <span style={{ color: '#4ade80′ }}>${Math.round(totalSavings).toLocaleString()}</span></p>
              <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Federal credits applied when you file your 2026 tax return. Utility rebates typically paid within 6-8 weeks of application.</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#0d1f0d', border: '1px solid #166534', borderRadius: 16, padding: 40 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>Find a Contractor Who Handles Rebate Paperwork</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            Not all contractors know rebate programs. ProLnk matches you with pros who handle the paperwork — so you actually get the money.
          </p>
          <a href="/waitlist/homeowner" style={{ background: '#16a34a', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16, display: 'inline-block' }}>
            Find a Rebate-Ready Contractor →
          </a>
        </div>

      </div>
    </div>
  );
}
