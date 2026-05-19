import { useState } from 'react';

type AllergyType = 'Mountain Cedar' | 'Oak / Tree Pollen' | 'Grass Pollen' | 'Ragweed / Mold' | 'Year-Round / Multiple';
type HomeFeature = 'Central HVAC' | 'Window Units' | 'No AC (rare)';

const allergySeasons = [
  { allergen: 'Mountain Cedar', months: 'Dec – Feb', severity: 'EXTREME', color: '#FF4444', tip: 'DFW\’s worst allergy event — "cedar fever" affects 80% of residents' },
  { allergen: 'Oak & Tree Pollen', months: 'Mar – Apr', severity: 'HIGH', color: '#FF8C00', tip: 'Spring peak — pollen counts frequently exceed 1,000 grains/m³ in DFW' },
  { allergen: 'Grass Pollen', months: 'May – Jul', severity: 'HIGH', color: '#FF8C00', tip: 'Bermuda grass dominates — mow lawns before 10am to reduce exposure' },
  { allergen: 'Ragweed & Mold', months: 'Aug – Nov', severity: 'MODERATE', color: '#F5E642', tip: 'Fall ragweed + mold from late-summer rains — peaks after first frost' },
];

const plans: Record<string, { filters: string[]; purifiers: string[]; sealing: string[]; cost: string }> = {
  'Mountain CedarCentral HVAC': {
    filters: ['MERV-13 filter (replace every 30 days during cedar season)', 'Add UV air purifier to air handler', 'Seal return air leaks with mastic tape'],
    purifiers: ['Coway Mighty AP-1512HH for bedrooms ($90)', 'IQAir HealthPro Plus for main living area ($800)', 'Levoit Core 300 for home office ($100)'],
    sealing: ['Weatherstrip all exterior doors before December', 'Seal window gaps with V-seal weatherstrip', 'Use recirculate mode on car AC during cedar season'],
    cost: '$300–$1,200 upfront + $30/mo filters',
  },
  'Oak / Tree PollenCentral HVAC': {
    filters: ['MERV-13 or MERV-15 filter', 'Change every 60 days (monthly during peak)', 'Check and seal attic hatch'],
    purifiers: ['Winix 5500-2 for living room ($180)', 'Austin Air Healthmate for bedroom ($700)', 'Blueair Blue Pure 211+ for large rooms ($300)'],
    sealing: ['Close windows when pollen count >500', 'Clean window sills weekly — pollen accumulates', 'Shower before bed — removes pollen from hair/skin'],
    cost: '$400–$1,500 upfront',
  },
  'Grass PollenCentral HVAC': {
    filters: ['MERV-13 filter — change monthly May-July', 'Whole-home air cleaner consideration', 'Inspect and clean ductwork if older than 7 years'],
    purifiers: ['Dyson Purifier Cool TP07 ($600) — doubles as fan', 'Rabbit Air MinusA2 ($600) for bedroom', 'Coway Airmega 400 for open floor plans ($400)'],
    sealing: ['Keep windows closed 10am–3pm when pollen peaks', 'Install door shoe sweeps on all exterior doors', 'HEPA vacuum carpets 2x/week during season'],
    cost: '$350–$1,100 upfront',
  },
  'Mountain CedarWindow Units': {
    filters: ['Replace window unit filters every 2 weeks during cedar season', 'Add external HEPA pre-filter to window units', 'Use portable air purifiers as primary defense'],
    purifiers: ['Winix 5500-2 per occupied room', 'Austin Air Healthmate+ for main bedroom', 'Keep 1 HEPA purifier per 300 sq ft occupied'],
    sealing: ['Foam seal all gaps around window unit frames', 'Plastic film window insulation kits for unused windows', 'Tape-seal window gaps with HVAC foil tape during cedar peak'],
    cost: '$250–$900 upfront — portable purifiers are key defense',
  },
  'Year-Round / MultipleCentral HVAC': {
    filters: ['MERV-15 filter — change every 45 days year-round', 'Whole-home air purifier (iWave-R electrostatic)', 'Consider HEPA filtration retrofit for air handler'],
    purifiers: ['IQAir HealthPro Plus as anchor unit ($800)', 'Rabbit Air MinusA2 per bedroom', 'Molekule Air Pro for severely allergic individuals ($800)'],
    sealing: ['Full weatherstrip audit — seal all exterior doors/windows', 'Positive air pressure: keep home slightly pressurized', 'Air quality monitor (Awair Element) to track real-time IAQ'],
    cost: '$1,200–$3,500 — multi-layer defense for year-round sufferers',
  },
};

export default function DFWAllergySeasonHomeGuide() {
  const [allergyType, setAllergyType] = useState<AllergyType>('Mountain Cedar');
  const [homeFeature, setHomeFeature] = useState<HomeFeature>('Central HVAC');
  const [showResults, setShowResults] = useState(false);

  const planKey = `${allergyType}${homeFeature}`;
  const plan = plans[planKey] || plans['Year-Round / MultipleCentral HVAC'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🤧 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Allergy Season Home Prep — DFW</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Dallas-Fort Worth is consistently ranked among the top 10 worst US cities for allergies. The home is your last line of defense — proper filtration and sealing can reduce indoor allergen levels by 80–90%.
        </p>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Allergy Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {allergySeasons.map(s => (
              <div key={s.allergen} style={{ background: '#0D1F35', borderRadius: 12, padding: 16, borderTop: `3px solid ${s.color}` }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.allergen}</div>
                <div style={{ color: s.color, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{s.severity} · {s.months}</div>
                <div style={{ color: '#8899AA', fontSize: 13 }}>{s.tip}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Get Your Allergy Reduction Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>PRIMARY ALLERGY TYPE</label>
              <select value={allergyType} onChange={e => setAllergyType(e.target.value as AllergyType)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                <option>Mountain Cedar</option><option>Oak / Tree Pollen</option><option>Grass Pollen</option><option>Ragweed / Mold</option><option>Year-Round / Multiple</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>HOME HVAC TYPE</label>
              <select value={homeFeature} onChange={e => setHomeFeature(e.target.value as HomeFeature)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                <option>Central HVAC</option><option>Window Units</option><option>No AC (rare)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Build My Allergy Plan
          </button>
        </div>

        {showResults && (
          <>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ color: '#F5E642′ }}>Your Allergy Reduction Plan</h3>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 13 }}>{plan.cost}</span>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🔄 HVAC Filters</div>
                {plan.filters.map(f => <div key={f} style={{ color: '#AAB8C2', padding: '4px 0', fontSize: 14 }}>✅ {f}</div>)}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>💨 Air Purifiers</div>
                {plan.purifiers.map(p => <div key={p} style={{ color: '#AAB8C2', padding: '4px 0', fontSize: 14 }}>✅ {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🔒 Sealing & Behavior</div>
                {plan.sealing.map(s => <div key={s} style={{ color: '#AAB8C2', padding: '4px 0', fontSize: 14 }}>✅ {s}</div>)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
