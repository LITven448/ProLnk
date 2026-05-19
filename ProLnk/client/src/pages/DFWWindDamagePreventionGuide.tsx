import { useState } from 'react';

const homeTypes = ['Single story brick veneer', 'Two story wood frame', 'Ranch style slab', 'Manufactured / mobile home', 'Home with detached garage', 'New construction (post-2000)'];
const treeCoverages = ['No trees on property', 'Small trees only (<20ft)', 'Large mature trees near home', 'Tree canopy over roof', 'Heavily wooded lot'];

const windPlans: Record<string, { risk: string; riskColor: string; measures: string[]; insuranceDiscount: string; cost: string }> = {
  'Two story wood frame|Large mature trees near home': {
    risk: 'Very High',
    riskColor: '#ef4444',
    measures: ['Hire arborist to assess all trees within 1.5x height distance of home', 'Remove dead, diseased, or structurally compromised trees', 'Crown raise trees — remove lower 1/3 of branches to reduce wind sail', 'Reinforce garage door with vertical bracing kit (most common wind failure point)', 'Install hurricane straps/clips on roof-to-wall connections if accessible'],
    insuranceDiscount: '5–15% with documented tree removal',
    cost: '$2,500–$9,000',
  },
  'Manufactured / mobile home|Large mature trees near home': {
    risk: 'Extreme',
    riskColor: '#7c3aed',
    measures: ['Identify nearest community storm shelter — never shelter in manufactured home during tornado warning', 'Install ground anchors if not already present (required by HUD code post-1994)', 'Remove or trim all trees within fall distance of home', 'Secure outdoor structures — sheds, porches, awnings', 'Have 72-hour emergency plan ready with meeting point'],
    insuranceDiscount: '0% — structure type limits options',
    cost: '$1,000–$4,000',
  },
  'Single story brick veneer|No trees on property': {
    risk: 'Low-Moderate',
    riskColor: '#eab308',
    measures: ['Reinforce garage door — single biggest vulnerability in 60-80mph winds', 'Secure HVAC unit with hurricane-rated straps', 'Inspect and replace any damaged roof shingles before storm season', 'Anchor outdoor furniture or store before storms', 'Install impact-resistant entry door if upgrading anyway'],
    insuranceDiscount: '3–8% with garage door reinforcement documentation',
    cost: '$800–$3,500',
  },
  'New construction (post-2000)|No trees on property': {
    risk: 'Low',
    riskColor: '#22c55e',
    measures: ['Verify garage door meets current wind load codes for your city', 'Confirm roof decking nailing pattern meets post-2009 IRC standards', 'Maintain roof and flashing inspections every 3 years', 'Anchor generator and HVAC units per manufacturer spec', 'Consider impact-resistant windows if renovating'],
    insuranceDiscount: '5–10% for verified modern construction standards',
    cost: '$300–$1,500',
  },
};

function getPlan(homeType: string, trees: string) {
  const key = `${homeType}|${trees}`;
  return windPlans[key] || {
    risk: 'Moderate',
    riskColor: '#f97316',
    measures: ['Reinforce garage door with vertical bracing kit', 'Have arborist assess trees within fall distance of home', 'Inspect roof fasteners and replace missing shingles', 'Secure all outdoor items before storm warnings', 'Verify HVAC unit is anchored — wind can topple unsecured units'],
    insuranceDiscount: '5–12% with documented upgrades',
    cost: '$1,500–$5,000',
  };
}

export default function DFWWindDamagePreventionGuide() {
  const [homeType, setHomeType] = useState('');
  const [trees, setTrees] = useState('');
  const [result, setResult] = useState<{ risk: string; riskColor: string; measures: string[]; insuranceDiscount: string; cost: string } | null>(null);

  function handleSubmit() {
    if (!homeType || !trees) return;
    setResult(getPlan(homeType, trees));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>💨 DFW Wind Damage Prevention Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          DFW gets dangerous wind from multiple sources: derechos, severe thunderstorm downbursts (60–90mph), and tornado risk. Knowing what you can reinforce — and what you can't — saves money and stress.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>⚡ DFW Wind Threat Breakdown</div>
          {[['💨 Derechos', 'Straight-line wind events — can hit 80–100mph over wide areas with little warning'],
            ['⛈️ Thunderstorm Downbursts', '60–80mph gusts are common in severe DFW storms — not tornadoes but equally destructive'],
            ['🌪️ Tornadoes', 'DFW is in Tornado Alley — average 3–5 significant tornadoes per year in the metroplex'],
            ['🌳 Tree Failure', 'Wind + saturated soil = falling trees — biggest insurance claim driver in DFW'],
            ['🏠 Garage Doors', '#1 residential failure point in high wind — acts as a sail, can collapse the home\’s structure'],
          ].map(([label, desc]) => (
            <div key={label} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
              <span style={{ whiteSpace: 'nowrap', color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Wind Risk Assessment</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select home type...</option>
              {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Tree Coverage Near Home</label>
            <select value={trees} onChange={e => setTrees(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select tree coverage...</option>
              {treeCoverages.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Get Wind Risk Assessment →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: `1px solid ${result.riskColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontWeight: 700, color: '#F5E642' }}>🎯 Wind Damage Risk Assessment</div>
              <div style={{ fontWeight: 800, color: result.riskColor, fontSize: '1.1rem' }}>⚠️ {result.risk} Risk</div>
            </div>
            {result.measures.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#F5E642' }}>▸</span>
                <span style={{ color: '#e2e8f0' }}>{m}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', flex: 1 }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Estimated Cost</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</div>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', flex: 1 }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Est. Insurance Discount</div>
                <div style={{ color: '#22c55e', fontWeight: 700 }}>{result.insuranceDiscount}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
