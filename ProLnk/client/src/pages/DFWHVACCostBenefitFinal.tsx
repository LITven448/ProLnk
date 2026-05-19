import { useState } from 'react';

const decisions = [
  {
    id: 'tune',
    label: 'Tune-up vs Skip It',
    cost: '$89–$149',
    benefit: 'Prevents 60% of breakdowns, adds 2–3 years life',
    dfwRec: 'Do it every spring before DFW summer hits 100°F+',
    verdict: '✅ Always worth it in DFW',
    roi: '8:1 ROI when it catches a refrigerant issue early',
  },
  {
    id: 'repair',
    label: 'Repair vs Replace',
    cost: 'Repair: $300–$2,000 | Replace: $6,000–$14,000',
    benefit: 'Replace if system >12 yrs or repair >50% of unit cost',
    dfwRec: "DFW heat load means old systems run 3x harder — replace sooner",
    verdict: '⚠️ Use the 5,000 Rule: Age × Repair Cost > $5,000 = Replace',
    roi: 'New system saves $800–$1,400/yr in DFW energy bills',
  },
  {
    id: 'seer',
    label: 'SEER2 16+ vs Standard 14',
    cost: '+$1,500–$3,000 upfront for high-SEER unit',
    benefit: 'Saves $200–$400/yr in DFW; payback in 5–8 years',
    dfwRec: 'With 3,500+ cooling hours/yr, high SEER pays off faster here',
    verdict: '✅ Choose 16–18 SEER2 in DFW — ROI beats most investments',
    roi: '$2,000 extra cost → $3,200 saved over 8 years',
  },
  {
    id: 'heatpump',
    label: 'Heat Pump vs Gas Furnace',
    cost: 'Heat pump: +$1,000–$2,500 vs gas system',
    benefit: 'DFW winters mild — heat pump handles 90% of heating days',
    dfwRec: "Ideal for DFW: mild winters, hot summers — dual-fuel is the DFW sweet spot",
    verdict: '✅ Dual-fuel heat pump wins in DFW if you have gas service',
    roi: 'Federal tax credit up to $2,000 + lower monthly costs',
  },
];

export default function DFWHVACCostBenefitFinal() {
  const [selected, setSelected] = useState(decisions[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>⚖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            DFW HVAC Cost-Benefit Final Analysis
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            The definitive framework for every major DFW HVAC decision
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {decisions.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: selected.id === d.id ? '#F5E642′ : '#1e3a5f',
                background: selected.id === d.id ? '#F5E642′ : '#112240',
                color: selected.id === d.id ? '#0A1628′ : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 28, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>{selected.label}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>💰 COST RANGE</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{selected.cost}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>📈 ROI ESTIMATE</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{selected.roi}</div>
            </div>
          </div>
          <div style={{ background: '#0d2137', borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>✅ BENEFIT</div>
            <div style={{ fontSize: 15 }}>{selected.benefit}</div>
          </div>
          <div style={{ background: '#0d2137', borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>🌡️ DFW-SPECIFIC RECOMMENDATION</div>
            <div style={{ fontSize: 15 }}>{selected.dfwRec}</div>
          </div>
          <div style={{ background: '#1a3a1a', border: '1px solid #22c55e', borderRadius: 10, padding: 16 }}>
            <div style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>{selected.verdict}</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>
            🏠 Get a free DFW HVAC analysis from a TrustyPro-verified contractor
          </p>
          <div style={{ marginTop: 12, display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            Get My DFW HVAC Analysis
          </div>
        </div>
      </div>
    </div>
  );
}
