import { useState } from 'react';

const GRASS_TYPES = ['Bermuda', 'St. Augustine', 'Zoysia', 'Tall Fescue'];
const CONDITIONS = ['Compacted — water pools after rain', 'Thatch over 0.5" thick', 'Thin and struggling despite fertilization', 'Never aerated', 'Recovering from renovation'];

type AerationPlan = { timing: string; method: string; benefits: string[]; cost: string; schedule: string };

const PLANS: Record<string, Record<string, AerationPlan>> = {
  Bermuda: {
    'Compacted — water pools after rain': {
      timing: 'April–May (critical window)',
      method: 'Core aeration — pull 3" plugs from DFW clay',
      benefits: ['Water penetrates instead of running off', 'Roots reach deeper into soil profile', 'Fertilizer reaches root zone instead of sitting on surface', 'DFW clay loosens and allows gas exchange'],
      cost: '$75–$200 for typical DFW lot',
      schedule: 'Aerate annually in late April for best results in Bermuda',
    },
    'Thatch over 0.5" thick': {
      timing: 'May (after green-up, before heat)',
      method: 'Dethatch first, then core aerate same day',
      benefits: ['Removes thatch barrier blocking water and air', 'Cores create channels through remaining thatch', 'Allows fertilizer to reach soil directly', 'Bermuda rebounds aggressively after combined treatment'],
      cost: '$150–$350 for dethatch + aeration',
      schedule: 'Dethatch every 2–3 years; aerate annually',
    },
    'Thin and struggling despite fertilization': {
      timing: 'April–May before peak growing season',
      method: 'Core aeration + topdress with compost',
      benefits: ['Opens compacted DFW clay so fertilizer actually works', 'Compost improves soil structure long-term', 'Bermuda fills in aeration holes within 2–3 weeks', 'Addresses root cause vs. just adding more product'],
      cost: '$200–$400 with compost topdress',
      schedule: 'Aerate annually; topdress every 2 years',
    },
    'Never aerated': {
      timing: 'April–May — start this season',
      method: 'Core aeration, 2 passes in different directions',
      benefits: ['Break up years of compaction in DFW clay soil', 'Immediate improvement in water infiltration', 'Roots will double depth within one season', 'Sets up fertilization to actually work'],
      cost: '$75–$200 first treatment',
      schedule: 'Annual aeration from this point forward',
    },
    'Recovering from renovation': {
      timing: '6–8 weeks after renovation, when sod knits',
      method: 'Light core aeration only — do not dethatch',
      benefits: ['Helps new roots establish in compacted areas', 'Reduces transplant stress from sod installation', 'Opens soil for new root penetration'],
      cost: '$75–$150 light pass',
      schedule: 'One-time establishment treatment',
    },
  },
  'Tall Fescue': {
    'Compacted — water pools after rain': {
      timing: 'September–October (NOT spring for fescue)',
      method: 'Core aeration before fall overseeding',
      benefits: ['Fall aeration aligns with fescue growing season', 'Opens soil for overseed germination', 'Fescue root system establishes over winter', 'DO NOT aerate in spring — damages fescue in DFW heat stress'],
      cost: '$75–$200 for typical lot',
      schedule: 'Annual fall aeration before overseeding',
    },
    'Never aerated': {
      timing: 'September — critical fall window',
      method: 'Core aeration + immediate overseeding',
      benefits: ['Fall is the ONLY correct timing for DFW fescue', 'Cores create seed-to-soil contact for overseeding', 'Winter establishment before summer heat returns'],
      cost: '$150–$300 with overseeding',
      schedule: 'Annual fall treatment',
    },
    'Thatch over 0.5" thick': {
      timing: 'September only',
      method: 'Core aeration (avoid aggressive dethatching of fescue)',
      benefits: ['Fescue is bunch-type — dethatching can kill it', 'Cores alone break up thatch layer safely', 'Follow with overseeding'],
      cost: '$75–$200',
      schedule: 'Annual fall treatment',
    },
    'Thin and struggling despite fertilization': {
      timing: 'September',
      method: 'Core aerate + overseed + fertilize',
      benefits: ['Compaction is likely blocking fertilizer from working', 'Overseed bare areas after aeration', 'DFW summer heat may have thinned fescue — fall rebuilds it'],
      cost: '$200–$400 complete treatment',
      schedule: 'Annual fall restoration',
    },
    'Recovering from renovation': {
      timing: 'Consult pro — timing depends on install date',
      method: 'Varies based on establishment status',
      benefits: ['New fescue sod needs 60 days before aeration', 'Follow pro guidance based on rooting progress'],
      cost: 'Varies',
      schedule: 'One-time establishment treatment',
    },
  },
};

const FALLBACK: AerationPlan = {
  timing: 'Late April–May (warm-season grasses)',
  method: 'Core aeration — standard recommendation for DFW',
  benefits: ['Reduces compaction in DFW clay soil', 'Improves water infiltration and root depth', 'Makes fertilization more effective'],
  cost: '$75–$200 for typical DFW lot',
  schedule: 'Annual aeration recommended for all DFW lawns',
};

export default function DFWLawnAerationGuide() {
  const [grass, setGrass] = useState('');
  const [condition, setCondition] = useState('');
  const [plan, setPlan] = useState<AerationPlan | null>(null);

  function generate() {
    if (grass && condition) {
      setPlan(PLANS[grass]?.[condition] || FALLBACK);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Lawn Aeration Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW's clay-heavy soil compacts aggressively — aeration is the single highest-ROI lawn service you can do. But timing is different from northern lawns: warm-season grasses aerate in spring, NOT fall. Get this wrong and you stress the lawn instead of helping it.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 DFW Aeration Timing Rules</h2>
          {[
            ['🌿 Bermuda / St. Aug / Zoysia', 'April–May ONLY — aerate during active growth, never during dormancy'],
            ['🌾 Tall Fescue', 'September–October ONLY — fall is fescue\’s growing season in DFW'],
            ['❄️ Never aerate dormant grass', 'Aerating Bermuda in fall/winter causes unnecessary stress and slow recovery'],
            ['🏡 Core aeration vs spike', 'Core aeration (pulls plugs) is always better — spike aeration compacts surrounding clay more'],
            ['📏 Plug depth matters', 'Quality machines pull 2.5–3" plugs — shallow plugs don\’t help DFW clay'],
          ].map(([label, detail], i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Get Your Aeration Plan</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Grass Type</label>
            <select value={grass} onChange={e => setGrass(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select grass type...</option>
              {GRASS_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Lawn Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Aeration Schedule →
          </button>
        </div>

        {plan && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your Aeration Plan</h2>
            <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Best Timing</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{plan.timing}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Method</div>
                <div style={{ color: '#fff', fontWeight: 600 }}>{plan.method}</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Expected Benefits</div>
              {plan.benefits.map((b, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{b}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Estimated Cost</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{plan.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Ongoing Schedule</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>{plan.schedule}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
