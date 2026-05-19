import { useState } from 'react';

const planoStats = [
  { label: 'Termite Activity (DFW)', value: 'High Zone' },
  { label: 'Mosquito Season Length', value: '7+ months' },
  { label: 'Fire Ant Colonies / Acre', value: 'Up to 300′ },
  { label: 'Avg Annual Pest Control', value: '$400–$900′ },
];

type PestKey = 'mosquitoes' | 'termites' | 'fireAnts' | 'roaches' | 'rodents' | 'spiders' | 'bedbugs' | 'wasps';

const pestOptions: { key: PestKey; label: string; icon: string }[] = [
  { key: 'mosquitoes', label: 'Mosquitoes', icon: '🦟' },
  { key: 'termites', label: 'Termites', icon: '🪲' },
  { key: 'fireAnts', label: 'Fire Ants', icon: '🐜' },
  { key: 'roaches', label: 'Cockroaches', icon: '🪳' },
  { key: 'rodents', label: 'Rodents', icon: '🐭' },
  { key: 'spiders', label: 'Spiders', icon: '🕷️' },
  { key: 'bedbugs', label: 'Bed Bugs', icon: '🛏️' },
  { key: 'wasps', label: 'Wasps / Hornets', icon: '🐝' },
];

const pestData: Record<PestKey, { treatment: string; frequency: string; cost: string; urgency: string; urgencyColor: string; notes: string }> = {
  mosquitoes: {
    treatment: 'Barrier spray (pyrethrin-based) + larvicide treatments for standing water',
    frequency: 'Monthly May–October',
    cost: '$75–$150/treatment or $500–$800/season',
    urgency: 'Seasonal',
    urgencyColor: '#F5E642',
    notes: 'Plano\’s mature tree coverage creates ideal mosquito habitat. Peak season is June–September. Barrier sprays last 21–30 days.',
  },
  termites: {
    treatment: 'Bait station system (Sentricon) or liquid barrier (Termidor)',
    frequency: 'Annual inspection + 10-year warranty program',
    cost: '$800–$2,500 for treatment + $200/yr monitoring',
    urgency: 'High Priority',
    urgencyColor: '#FF6B35',
    notes: 'DFW is in USDA Termite Zone A (highest activity). Subterranean termites cause $5B+ in US damage annually. Active infestations require immediate treatment.',
  },
  fireAnts: {
    treatment: 'Two-step method: broadcast bait + individual mound treatment',
    frequency: 'Spring and fall application (2x/year)',
    cost: '$120–$250/treatment',
    urgency: 'Moderate',
    urgencyColor: '#F5E642',
    notes: 'Plano\’s suburban lawns are prime fire ant territory. Imported fire ants are extremely aggressive and harmful to children and pets. Two-step method is most effective.',
  },
  roaches: {
    treatment: 'Gel bait placement + perimeter exclusion spray',
    frequency: 'Quarterly interior + monthly perimeter',
    cost: '$150–$300/quarter',
    urgency: 'High Priority',
    urgencyColor: '#FF6B35',
    notes: 'American cockroaches thrive in DFW\’s heat. German cockroaches require intensive treatment. Exclusion (sealing entry points) is critical for lasting control.',
  },
  rodents: {
    treatment: 'Exclusion + trap placement + bait stations (exterior only)',
    frequency: 'Initial treatment + 30-day follow-up',
    cost: '$250–$600 initial + $100–$200/visit',
    urgency: 'Urgent',
    urgencyColor: '#E53935',
    notes: 'Mice and rats can enter through a hole the size of a dime. Fall season drives rodents indoors. Exclusion work (sealing gaps) is the only long-term solution.',
  },
  spiders: {
    treatment: 'Web removal + residual perimeter spray + sticky traps',
    frequency: 'Quarterly',
    cost: '$100–$200/treatment',
    urgency: 'Low–Moderate',
    urgencyColor: '#8BC34A',
    notes: 'Brown recluse spiders are present in Plano and can be dangerous. Black widows common in garages and sheds. Quarterly perimeter treatment reduces risk significantly.',
  },
  bedbugs: {
    treatment: 'Heat treatment (whole-room) or chemical treatment (2–3 visits)',
    frequency: '2–3 treatments over 4 weeks',
    cost: '$500–$2,500 depending on infestation size',
    urgency: 'Emergency',
    urgencyColor: '#B71C1C',
    notes: 'Bed bugs require professional treatment — DIY rarely works. Heat treatment is most effective but costly. Start treatment immediately to prevent spread to other rooms.',
  },
  wasps: {
    treatment: 'Nest removal + residual spray at active sites',
    frequency: 'As needed (spring–fall)',
    cost: '$100–$300 per nest/area',
    urgency: 'Moderate–High',
    urgencyColor: '#FF6B35',
    notes: 'Paper wasps and yellow jackets are common in Plano eaves and attics. Multiple stings can be life-threatening for allergic individuals. Never disturb nests without protection.',
  },
};

const planOptions = [
  { id: 'quarterly', label: 'Quarterly Plan', icon: '📅', freq: 'Every 3 months', price: '$100–$180/quarter', desc: 'Best for: general prevention, moderate pest pressure, most Plano homes', included: ['Perimeter spray', 'Interior spot treatment', 'Cobweb removal', 'Fire ant mounds', 'Wasp nest removal'] },
  { id: 'monthly', label: 'Monthly Plan', icon: '📆', freq: 'Every month', price: '$60–$100/month', desc: 'Best for: active infestations, wooded lots, homes near creeks or greenbelt', included: ['Everything in quarterly', 'Mosquito barrier spray', 'Granular fire ant bait', 'Rodent monitoring', 'Priority scheduling'] },
];

export default function DFWPestControlPlano() {
  const [selectedPests, setSelectedPests] = useState<Set<PestKey>>(new Set());
  const [showResults, setShowResults] = useState(false);

  function toggle(key: PestKey) {
    setSelectedPests(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
    setShowResults(false);
  }

  const selectedList = Array.from(selectedPests);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🐜🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Plano TX Pest Control
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            Year-Round Protection — Mosquito, Termite, Fire Ant & More
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Why Plano Homes Need Year-Round Pest Defense</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            Plano's mature suburban landscape — with its tree-lined streets, HOA greenbelts, and manicured
            lawns — creates ideal habitat for nearly every DFW pest species. Mosquitoes breed in any standing
            water, fire ants thrive in maintained turf, and termites are active year-round in DFW's climate.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Unlike rural areas, Plano's density means pests move easily between properties — a neighbor’s
            untreated yard becomes your problem. Local pest specialists understand Plano's specific pest
            pressure by neighborhood, season, and property type.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {planoStats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🔍 Pest Treatment Recommender</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>
            Select all pests you've detected or suspect. Get recommended treatments and cost estimates.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
            {pestOptions.map(p => (
              <div
                key={p.key}
                onClick={() => toggle(p.key)}
                style={{
                  padding: '14px 10px',
                  backgroundColor: selectedPests.has(p.key) ? '#1a2535′ : '#0A1628',
                  border: `2px solid ${selectedPests.has(p.key) ? '#F5E642' : '#334155'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ color: selectedPests.has(p.key) ? '#F5E642′ : '#CBD5E1', fontSize: 13, fontWeight: selectedPests.has(p.key) ? 700 : 400 }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => selectedList.length > 0 && setShowResults(true)}
            style={{
              backgroundColor: selectedList.length > 0 ? '#F5E642′ : '#334155',
              color: selectedList.length > 0 ? '#0A1628′ : '#64748B',
              fontWeight: 700,
              fontSize: 16,
              padding: '14px 28px',
              border: 'none',
              borderRadius: 8,
              cursor: selectedList.length > 0 ? 'pointer' : 'not-allowed',
              width: '100%',
              marginBottom: 20,
            }}
          >
            {selectedList.length > 0 ? `Get Treatment Plan for ${selectedList.length} Pest${selectedList.length > 1 ? 's' : ''} →` : 'Select at least one pest'}
          </button>

          {showResults && selectedList.length > 0 && (
            <div style={{ display: 'grid', gap: 16 }}>
              {selectedList.map(key => {
                const data = pestData[key];
                const pest = pestOptions.find(p => p.key === key)!;
                return (
                  <div key={key} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${data.urgencyColor}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 24 }}>{pest.icon}</span>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>{pest.label}</span>
                      <span style={{ marginLeft: 'auto', color: data.urgencyColor, fontSize: 13, fontWeight: 600 }}>{data.urgency}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                      <div>
                        <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>Treatment</div>
                        <div style={{ color: '#CBD5E1', fontSize: 13 }}>{data.treatment}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>Estimated Cost</div>
                        <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>{data.cost}</div>
                      </div>
                    </div>
                    <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{data.notes}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 Quarterly vs Monthly Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {planOptions.map(plan => (
              <div key={plan.id} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{plan.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{plan.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>{plan.freq} · {plan.price}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 12 }}>{plan.desc}</div>
                <div style={{ color: '#64748B', fontSize: 12, marginBottom: 6 }}>Includes:</div>
                {plan.included.map(item => (
                  <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: '#F5E642', fontSize: 12 }}>✓</span>
                    <span style={{ color: '#CBD5E1', fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🐜</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Get a Free Plano Pest Control Quote
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk matches you with licensed Plano pest control specialists — same-week service available.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Request Free Inspection
          </button>
        </div>

      </div>
    </div>
  );
}
