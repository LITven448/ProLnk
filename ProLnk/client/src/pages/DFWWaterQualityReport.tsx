import { useState } from 'react';

const cities = [
  {
    name: 'Dallas',
    utility: 'Dallas Water Utilities',
    hardness: 114,
    hardnessLabel: 'Hard (114 mg/L)',
    ph: 7.9,
    chloramine: 'Yes',
    lead: 'Below Action Level (avg 3 ppb)',
    fluoride: '0.7 mg/L',
    notes: 'Trinity River source. High mineral content. Calcium buildup common in pipes, water heaters.',
    actions: ['Install water softener if > 150 mg/L causes scale', 'Replace water heater anode rod every 3 years (hard water accelerates corrosion)', 'Use NSF-certified filter for lead if pre-1986 home'],
    concerns: 'TTHM byproducts from chloramination — run cold tap 30 sec before drinking.',
  },
  {
    name: 'Fort Worth',
    utility: 'Fort Worth Water',
    hardness: 142,
    hardnessLabel: 'Hard (142 mg/L)',
    ph: 7.8,
    chloramine: 'Yes',
    lead: 'Below Action Level (avg 2 ppb)',
    fluoride: '0.7 mg/L',
    notes: 'Benbrook Lake + Eagle Mountain Lake source. High hardness causes significant appliance scale.',
    actions: ['Water softener strongly recommended', 'Descale tankless water heaters annually', 'Check dishwasher filter monthly for scale buildup'],
    concerns: 'Hardness causes white scale on fixtures — cosmetic, not a health issue.',
  },
  {
    name: 'Plano',
    utility: 'North Texas Municipal Water District',
    hardness: 189,
    hardnessLabel: 'Very Hard (189 mg/L)',
    ph: 7.7,
    chloramine: 'Yes',
    lead: 'Below Action Level (avg 1.5 ppb)',
    fluoride: '0.7 mg/L',
    notes: 'NTMWD blended surface water. Among hardest water in DFW metro. Major appliance concern.',
    actions: ['Water softener essentially required', 'Replace water heater every 6 years vs. 10 (hard water)', 'Scale inhibitor for irrigation systems'],
    concerns: 'Very high mineral load shortens appliance lifespan significantly.',
  },
  {
    name: 'Arlington',
    utility: 'Arlington Water Utilities',
    hardness: 128,
    hardnessLabel: 'Hard (128 mg/L)',
    ph: 7.8,
    chloramine: 'Yes',
    lead: 'Below Action Level',
    fluoride: '0.7 mg/L',
    notes: 'Tarrant Regional Water District source. Consistent hard water, moderate mineral content.',
    actions: ['Water softener recommended for appliance longevity', 'Annual water heater flush', 'Low-flow aerators on faucets to manage scale'],
    concerns: 'Chloramine requires specific filter type — standard carbon filters not always sufficient.',
  },
  {
    name: 'McKinney',
    utility: 'North Texas Municipal Water District',
    hardness: 195,
    hardnessLabel: 'Very Hard (195 mg/L)',
    ph: 7.7,
    chloramine: 'Yes',
    lead: 'Below Action Level',
    fluoride: '0.7 mg/L',
    notes: 'NTMWD source. One of the hardest supplies in DFW. Scale deposits visible within months.',
    actions: ['Water softener critical', 'Reverse osmosis for drinking water', 'Annual descaling of all water-contact appliances'],
    concerns: 'Spot staining on fixtures and glass is immediate and persistent without treatment.',
  },
];

const getHardnessColor = (h: number) => {
  if (h < 75) return '#00e400';
  if (h < 150) return '#ffff00';
  if (h < 200) return '#ff7e00';
  return '#ff0000';
};

const getHardnessLabel = (h: number) => {
  if (h < 75) return 'Soft';
  if (h < 150) return 'Hard';
  if (h < 200) return 'Very Hard';
  return 'Extremely Hard';
};

export default function DFWWaterQualityReport() {
  const [cityIdx, setCityIdx] = useState(0);
  const city = cities[cityIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>💧 Water Quality Report Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            Every DFW utility publishes an annual Consumer Confidence Report (CCR). DFW water is safe to drink but
            very hard — high mineral content that damages appliances, shortens pipe life, and leaves visible scale.
            Here's how to read your report and what to do about it.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>📖 How to Read Your CCR</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {[
              { term: 'Hardness (mg/L or GPG)', desc: 'Mineral content. DFW average: 140 mg/L (very hard). Above 120 = scale buildup in pipes, heaters, appliances.' },
              { term: 'pH', desc: 'Ideal range 7.5–8.5. DFW typically 7.7–7.9. High pH + high hardness = faster scale formation.' },
              { term: 'Chloramine', desc: 'DFW uses chloramine (not chlorine) for disinfection. Requires catalytic carbon filter — standard Brita not enough.' },
              { term: 'Lead (ppb)', desc: 'Action Level = 15 ppb. DFW utilities test well below. Pre-1986 homes: internal plumbing may contribute lead.' },
              { term: 'TTHM / HAA5', desc: 'Disinfection byproducts. MCL = 80/60 ppb. DFW generally compliant but worth checking your CCR.' },
            ].map(r => (
              <div key={r.term} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginBottom: 3 }}>{r.term}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>🏙️ Select Your DFW City</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {cities.map((c, i) => (
              <button key={c.name} onClick={() => setCityIdx(i)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: i === cityIdx ? '2px solid #F5E642' : '2px solid #2d4a7a', background: i === cityIdx ? '#F5E642' : 'transparent', color: i === cityIdx ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
                {c.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>{city.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{city.utility}</div>
              </div>
              <div style={{ background: getHardnessColor(city.hardness), borderRadius: 8, padding: '0.4rem 0.8rem', color: '#000', fontWeight: 800, fontSize: '0.85rem' }}>
                {getHardnessLabel(city.hardness)}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
              {[
                { label: 'Hardness', val: city.hardnessLabel },
                { label: 'pH', val: city.ph.toString() },
                { label: 'Chloramine', val: city.chloramine ? 'Yes' : 'No' },
                { label: 'Lead', val: city.lead },
                { label: 'Fluoride', val: city.fluoride },
              ].map(m => (
                <div key={m.label} style={{ background: '#0f1f3d', borderRadius: 6, padding: '0.5rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>{m.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{m.val}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>{city.notes}</div>
            <div style={{ borderTop: '1px solid #2d4a7a', paddingTop: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 Recommended Actions</div>
              {city.actions.map(a => <div key={a} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>• {a}</div>)}
              {city.concerns && <div style={{ color: '#ff7e00', fontSize: '0.85rem', marginTop: 8 }}>⚠️ {city.concerns}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
