import { useState } from 'react';

const FINISH_LEVELS = {
  production: { label: 'Production (Entry-Level)', costMin: 150, costMax: 200, lotMin: 30000, lotMax: 80000 },
  semiCustom: { label: 'Semi-Custom (Mid-Range)', costMin: 200, costMax: 275, lotMin: 60000, lotMax: 150000 },
  custom: { label: 'Custom (High-End)', costMin: 275, costMax: 350, lotMin: 100000, lotMax: 400000 },
};

const LOCATION_TYPES = {
  exurb: { label: 'DFW Exurbs (Outer Counties)', impactFee: 8000, utilityExtra: 15000, area: 'Kaufman/Ellis/Johnson/Wise' },
  suburban: { label: 'Established Suburbs', impactFee: 5000, utilityExtra: 4000, area: 'Plano/Frisco/McKinney' },
  urban: { label: 'Urban Infill (Inner DFW)', impactFee: 3000, utilityExtra: 2000, area: 'Dallas/Fort Worth proper' },
};

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function DFWNewConstructionCostGuide() {
  const [sqft, setSqft] = useState(2200);
  const [finish, setFinish] = useState('semiCustom');
  const [location, setLocation] = useState('suburban');

  const fl = FINISH_LEVELS[finish as keyof typeof FINISH_LEVELS];
  const loc = LOCATION_TYPES[location as keyof typeof LOCATION_TYPES];

  const buildMin = sqft * fl.costMin;
  const buildMax = sqft * fl.costMax;
  const hiddenCosts = loc.impactFee + loc.utilityExtra + 12000 + 8000;
  const totalMin = buildMin + fl.lotMin + hiddenCosts;
  const totalMax = buildMax + fl.lotMax + hiddenCosts;
  const monthlyMin = Math.round(totalMin * 0.8 * 0.0065);
  const monthlyMax = Math.round(totalMax * 0.8 * 0.0065);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>New Construction Cost Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          Real cost breakdowns for building in Dallas-Fort Worth — production to fully custom.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
          {Object.entries(FINISH_LEVELS).map(([key, val]) => (
            <div key={key} onClick={() => setFinish(key)}
              style={{ background: finish === key ? '#1a2a4a' : '#0d1f38', border: `2px solid ${finish === key ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20, cursor: 'pointer' }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>
                {key === 'production' ? '🏗️' : key === 'semiCustom' ? '🏡' : '🏛️'} {val.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{fmt(val.costMin)}&ndash;{fmt(val.costMax)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>per sq ft</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>&#x1F4D0; Estimate Your Build</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Square Footage</label>
              <input type="number" value={sqft} onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Location Type</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                {Object.entries(LOCATION_TYPES).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 20 }}>&#x1F4CD; Example areas: {loc.area}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { label: '&#x1F3D7;&#xFE0F; Build Cost', val: `${fmt(buildMin)} – ${fmt(buildMax)}` },
              { label: '&#x1FAA8; Lot Cost', val: `${fmt(fl.lotMin)} – ${fmt(fl.lotMax)}` },
              { label: '&#x26A1; Hidden Costs', val: fmt(hiddenCosts) },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2a4a', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }} dangerouslySetInnerHTML={{ __html: item.label }} />
                <div style={{ fontSize: 17, fontWeight: 700, marginTop: 4 }}>{item.val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 24, textAlign: 'center' as const }}>
            <div style={{ color: '#0A1628', fontSize: 14, fontWeight: 700 }}>TOTAL PROJECT COST</div>
            <div style={{ color: '#0A1628', fontSize: 32, fontWeight: 900 }}>{fmt(totalMin)} &ndash; {fmt(totalMax)}</div>
            <div style={{ color: '#1a2a4a', fontSize: 14, marginTop: 4 }}>Est. monthly payment: {fmt(monthlyMin)} &ndash; {fmt(monthlyMax)} (20% down, 6.5%)</div>
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>&#x26A0;&#xFE0F; Hidden Cost Breakdown</h3>
          {[
            { label: 'Impact Fees', val: fmt(loc.impactFee), note: 'City/county development charges' },
            { label: 'Utility Connections', val: fmt(loc.utilityExtra), note: 'Higher cost in outer DFW counties' },
            { label: 'Landscaping', val: '$8,000–$25,000', note: 'Not included by most builders' },
            { label: 'Window Treatments', val: '$3,000–$10,000', note: 'Blinds, curtains always extra' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{item.note}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
