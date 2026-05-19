import { useState } from 'react';

export default function DFWPropTaxExemptionCalc2026() {
  const [homeValue, setHomeValue] = useState('350000');
  const [ownerStatus, setOwnerStatus] = useState('standard');
  const [county, setCounty] = useState('dallas');

  const rates: Record<string, number> = { dallas: 0.0235, tarrant: 0.0228, collin: 0.0195, denton: 0.0212 };
  const rate = rates[county] || 0.023;
  const value = parseFloat(homeValue) || 0;

  const homesteadReduction = Math.min(value, 100000);
  const over65Extra = ownerStatus === 'over65′ || ownerStatus === ’disabled' ? 10000 : 0;
  const veteranReduction: Record<string, number> = { veteran10: value * 0.1, veteran30: value * 0.3, veteran50: value * 0.5, veteran70: value * 0.7, veteran100: value };
  const vetRed = ownerStatus.startsWith('veteran') ? (veteranReduction[ownerStatus] || 0) : 0;

  const totalReduction = homesteadReduction + over65Extra + vetRed;
  const taxableValue = Math.max(0, value - totalReduction);
  const savings = Math.round((value - taxableValue) * rate);
  const annualTax = Math.round(taxableValue * rate);

  const exemptions = [
    { icon: '🏠', title: 'Homestead Exemption', desc: '$100,000 off school district taxable value for primary residence. Must apply by April 30 in new homeowners first year.' },
    { icon: '👴', title: 'Over-65 Exemption', desc: 'Additional $10,000 exemption plus school district tax freeze — your school taxes cannot increase as long as you own the home.' },
    { icon: '♿', title: 'Disabled Person Exemption', desc: 'Same as over-65: $10,000 additional plus school tax freeze. Cannot stack with over-65 for school taxes.' },
    { icon: '🎖️', title: 'Disabled Veteran Exemptions', desc: '10% disability: $5K off. 30%: $7.5K. 50%: $10K. 70%: $12K. 100% disabled veterans: full exemption — pay $0 property tax.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW Resource Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Property Tax Exemption Calculator 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Calculate exactly how much DFW homeowners save with available exemptions — homestead, over-65, disabled veteran, and more.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8′ }}>🏠 Home Value ($)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)} style={{ display: 'block', marginTop: 6, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 15 }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8′ }}>👤 Owner Status</label>
              <select value={ownerStatus} onChange={e => setOwnerStatus(e.target.value)} style={{ display: 'block', marginTop: 6, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="standard">Standard Homeowner</option>
                <option value="over65″>Over 65</option>
                <option value="disabled">Disabled Person</option>
                <option value="veteran10″>Veteran 10% Disability</option>
                <option value="veteran30″>Veteran 30% Disability</option>
                <option value="veteran50″>Veteran 50% Disability</option>
                <option value="veteran70″>Veteran 70% Disability</option>
                <option value="veteran100″>Veteran 100% Disabled</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8′ }}>📍 DFW County</label>
              <select value={county} onChange={e => setCounty(e.target.value)} style={{ display: 'block', marginTop: 6, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="dallas">Dallas County (~2.35%)</option>
                <option value="tarrant">Tarrant County (~2.28%)</option>
                <option value="collin">Collin County (~1.95%)</option>
                <option value="denton">Denton County (~2.12%)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Total Exemption Reduction', value: `$${totalReduction.toLocaleString()}`, color: '#F5E642′ },
              { label: 'Annual Tax Savings', value: `$${savings.toLocaleString()}`, color: '#4ade80′ },
              { label: 'Est. Annual Tax Bill', value: `$${annualTax.toLocaleString()}`, color: '#fff' },
            ].map(m => (
              <div key={m.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>{m.label}</div>
                <div style={{ color: m.color, fontSize: 22, fontWeight: 800, marginTop: 4 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Available DFW Exemptions</h2>
        {exemptions.map((e, i) => (
          <div key={i} style={{ background: '#1e2d47', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', gap: 14 }}>
            <span style={{ fontSize: 24 }}>{e.icon}</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{e.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{e.desc}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 24, background: '#1e2d47', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📅 Apply Before April 30</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>New DFW homeowners must apply for homestead exemption by April 30 of the year after purchase. Apply at your county appraisal district website — free, takes 10 minutes, saves thousands per year.</div>
        </div>
      </div>
    </div>
  );
}

