import { useState } from 'react';

export default function DFWTreeRemovalGuide2026() {
  const [treeSituation, setTreeSituation] = useState('danger');

  const guide: Record<string, { urgency: string; cost: string; permit: string; next: string }> = {
    danger: {
      urgency: 'URGENT — Do not wait. Dead limbs over structure, trunk cracks, or severe lean toward a building are imminent failure risks. DFW storms in spring/summer create explosive failure conditions.',
      cost: '$800–5,000+ depending on size and crane requirements. Emergency removal (same-day) adds 25-50% premium. Get 3 quotes even urgently — prices vary widely.',
      permit: 'Dallas: Heritage Trees (24″+ trunk diameter) require permit even in emergency. Fort Worth, Plano, Irving: Check city ordinance — some require permits for any removal over specified size.',
      next: '1. Clear the danger zone now. 2. Call licensed arborist for assessment. 3. Check city Heritage Tree database. 4. Get 3 quotes. 5. Schedule removal — include stump grinding.',
    },
    dead: {
      urgency: 'MODERATE–HIGH — Dead trees lose structural integrity rapidly in DFW heat and humidity. A standing dead tree can fail without warning. Remove within 60-90 days maximum.',
      cost: '$500–3,500 depending on size, location, and access. Stump grinding adds $150-400. Dead trees are sometimes cheaper because no pruning needed — just fell and chip.',
      permit: 'Most DFW cities exempt dead trees from Heritage Tree protections IF tree is certified dead by licensed arborist. Get written confirmation before removal to protect yourself.',
      next: '1. Have arborist confirm death (not just stressed). 2. Check for oak wilt — if present, may need special disposal protocols. 3. Get permit if Heritage Tree. 4. Remove + grind stump.',
    },
    roots: {
      urgency: 'LOW–MODERATE — Root damage to infrastructure is frustrating but rarely requires immediate removal. Assess the infrastructure damage first, then decide on the tree.',
      cost: '$1,000–5,000 for large trees near infrastructure. Root trenching and pipe lining alternatives often cheaper than full removal. Always explore alternatives first.',
      permit: 'Heritage Tree permits required even when roots are causing damage. City may require independent arborist report documenting infrastructure threat level before approving removal.',
      next: '1. Camera-inspect pipes for actual root intrusion. 2. Get arborist root assessment. 3. Explore pipe lining + root barrier as alternative. 4. If removal necessary, get permit, then remove.',
    },
    diseased: {
      urgency: 'MODERATE — Oak wilt in Red Oaks requires rapid removal (fruiting bodies spread to neighbors). Other diseases may allow more time for treatment decisions.',
      cost: '$500–4,000 depending on tree size. Oak wilt removal may require disposal protocols (chipping and burying or burning). Add $200-500 for proper disposal.',
      permit: 'Oak wilt-infected trees may qualify for expedited permits in some DFW cities due to neighborhood spread risk. Contact urban forestry division of your city.',
      next: '1. Confirm diagnosis with ISA-certified arborist. 2. For oak wilt, act within 2 weeks of diagnosis. 3. Notify neighbors (they may have root-grafted trees). 4. Remove + dispose properly.',
    },
    aesthetic: {
      urgency: 'LOW — No immediate risk. Take time to make the right decision. Mature trees add $10,000-40,000 in appraised property value in DFW. Removal is permanent.',
      cost: '$500–4,000. Consider whether professional pruning ($300-800) could achieve the aesthetic goal without full removal.',
      permit: 'Heritage Trees require permit regardless of reason. Aesthetic reasons are the least likely to receive city approval for Heritage Tree removal — plan accordingly.',
      next: '1. Get a second opinion — pruning often solves aesthetic issues. 2. If removal confirmed, get permit. 3. Consider replacement planting plan before removal.',
    },
  };

  const data = guide[treeSituation];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🪓</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Tree Removal Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When trees must come down in DFW — danger signs, permit rules, real costs, and what to do next.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '💰', label: 'Cost Range', value: '$500–$5,000+' }, { icon: '🌳', label: 'Heritage Tree', value: '24″+ Trunk = Permit' }, { icon: '🪵', label: 'Stump Grind', value: '+$150–$400′ }, { icon: '📋', label: ’Always Get', value: '3 Quotes' }].map(s => (
            <div key={s.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌳 My Situation</h2>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[{ v: 'danger', l: '⚠️ Danger Risk' }, { v: 'dead', l: '💀 Dead Tree' }, { v: 'roots', l: '🌱 Root Damage' }, { v: 'diseased', l: '🦠 Diseased' }, { v: 'aesthetic', l: '✨ Aesthetic' }].map(t => (
              <button key={t.v} onClick={() => setTreeSituation(t.v)} style={{ padding: '.5rem .75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: treeSituation === t.v ? '#F5E642′ : '#334155', color: treeSituation === t.v ? '#0A1628' : '#fff', fontWeight: 600, fontSize: '.85rem' }}>{t.l}</button>
            ))}
          </div>

          {[{ label: '⚡ Urgency', value: data.urgency }, { label: '💰 Cost', value: data.cost }, { label: '📋 Permit', value: data.permit }, { label: '✅ Next Steps', value: data.next }].map(item => (
            <div key={item.label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>{item.label}</div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with licensed arborists and tree removal companies — vetted, insured, and DFW permit-aware.</p>
        </div>
      </div>
    </div>
  );
}
