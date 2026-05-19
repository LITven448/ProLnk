import { useState } from 'react';

const materials = [
  {
    id: 'asphalt3tab',
    name: 'Asphalt 3-Tab',
    costPerSq: 150,
    lifespan: '15-20 yrs',
    hailRating: '2/5',
    energyEff: 'Low',
    insuranceDiscount: '0%',
    description: 'Entry-level option. Thin single layer, less durable in DFW hail storms. Meets code but not ideal for storm-prone areas.',
  },
  {
    id: 'architectural',
    name: 'Architectural / Dimensional',
    costPerSq: 220,
    lifespan: '25-30 yrs',
    hailRating: '3/5',
    energyEff: 'Moderate',
    insuranceDiscount: '5-10%',
    description: 'Most popular in DFW. Multi-layer construction adds wind and hail resistance. Good value for the region.',
  },
  {
    id: 'impactresistant',
    name: 'Impact-Resistant Shingle',
    costPerSq: 300,
    lifespan: '30-40 yrs',
    hailRating: '5/5',
    energyEff: 'Moderate-High',
    insuranceDiscount: '15-30%',
    description: 'Class 4 IR rating. Best protection against DFW hail. Many insurers offer significant discounts. Pays for itself over time.',
  },
  {
    id: 'metal',
    name: 'Metal (Standing Seam)',
    costPerSq: 700,
    lifespan: '50+ yrs',
    hailRating: '4/5',
    energyEff: 'High',
    insuranceDiscount: '15-25%',
    description: 'Reflects heat — major advantage in DFW summers. Low maintenance. Higher upfront cost but longest lifespan.',
  },
  {
    id: 'tile',
    name: 'Concrete / Clay Tile',
    costPerSq: 500,
    lifespan: '50+ yrs',
    hailRating: '3/5',
    energyEff: 'High',
    insuranceDiscount: '5-15%',
    description: 'Durable and beautiful. Heavier — requires structural review. Tiles can crack under direct hail impact.',
  },
  {
    id: 'tpo',
    name: 'Flat / TPO (Low-Slope)',
    costPerSq: 350,
    lifespan: '20-25 yrs',
    hailRating: '3/5',
    energyEff: 'High (white membrane)',
    insuranceDiscount: '0-5%',
    description: 'Required for flat or low-slope roofs. Common in DFW additions and commercial. White TPO cuts cooling costs.',
  },
];

const DFW_HOME_SQ = 22; // 2,200 sq ft = 22 roofing squares

export default function DFWRoofingMaterialsGuide2026() {
  const [selected, setSelected] = useState<string>('architectural');

  const mat = materials.find(m => m.id === selected)!;
  const baseCost = mat.costPerSq * DFW_HOME_SQ;
  const laborCost = Math.round(baseCost * 0.45);
  const totalCost = baseCost + laborCost;
  const discountLow = mat.insuranceDiscount === '0%' ? 0 : parseInt(mat.insuranceDiscount.split('-')[0] ?? '0');
  const discountHigh = mat.insuranceDiscount === '0%' ? 0 : parseInt((mat.insuranceDiscount.split('-')[1] ?? mat.insuranceDiscount).replace('%', ''));
  const annualPremium = 2200;
  const savingsLow = Math.round(annualPremium * discountLow / 100);
  const savingsHigh = Math.round(annualPremium * discountHigh / 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>
          DFW Roofing Materials Comparison 2026
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 32 }}>
          Every major roofing material rated for DFW's hail, heat, and wind. Find the right fit for your home and budget.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {materials.map(m => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: selected === m.id ? '2px solid #F5E642′ : '2px solid #1E2D45',
                background: selected === m.id ? '#F5E642′ : '#111E33',
                color: selected === m.id ? '#0A1628′ : '#9AA3B4',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{mat.name}</h2>
          <p style={{ color: '#C5CAD8', marginBottom: 20 }}>{mat.description}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: '💰 Cost / Square', value: `$${mat.costPerSq}` },
              { label: '📅 Lifespan', value: mat.lifespan },
              { label: '🌨️ Hail Rating', value: mat.hailRating },
              { label: '🌡️ Energy Efficiency', value: mat.energyEff },
              { label: '🏷️ Insurance Discount', value: mat.insuranceDiscount },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: '#6B7A99', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 28 }}>
          <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
            📊 Estimated Cost — Average DFW Home (2,200 sq ft)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Materials', value: `$${baseCost.toLocaleString()}` },
              { label: 'Labor (est.)', value: `$${laborCost.toLocaleString()}` },
              { label: 'Total Installed', value: `$${totalCost.toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: '#6B7A99', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{value}</div>
              </div>
            ))}
          </div>
          {savingsHigh > 0 && (
            <div style={{ background: '#0D2A1A', border: '1px solid #1A5C35', borderRadius: 10, padding: '14px 18px' }}>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>💚 Insurance Savings: </span>
              <span style={{ color: '#C5CAD8′ }}>
                {savingsLow === savingsHigh
                  ? `~$${savingsHigh}/year`
                  : `$${savingsLow}–$${savingsHigh}/year`} off your premium
              </span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, padding: '16px 20px', background: '#111E33', borderRadius: 12, borderLeft: '4px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>Pro Tip:</strong>
          <span style={{ color: '#9AA3B4', marginLeft: 8 }}>
            DFW homeowners filing hail claims save most by upgrading to Class 4 impact-resistant shingles at replacement time — insurers often cover the upgrade cost difference.
          </span>
        </div>
      </div>
    </div>
  );
}
