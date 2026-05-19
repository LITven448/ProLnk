import { useState } from 'react';

const patchSituations = [
  { id: 'hairline', label: '💉 Hairline Cracks', desc: 'Under 1/16 inch wide' },
  { id: 'wider', label: '🔩 Wider Cracks', desc: '1/16 inch or larger' },
  { id: 'spalling', label: '🪨 Surface Spalling', desc: 'Flaking or crumbling surface' },
  { id: 'donot', label: '⛔ Do NOT Patch', desc: 'Situations where patching fails' },
];

const guideMap: Record<string, { title: string; points: string[] }> = {
  hairline: {
    title: 'Hairline Crack Patching in DFW',
    points: [
      'Definition: cracks under 1/16″ — common after DFW dry summers',
      'Best product: polymer-modified concrete patching compound (flexible formula)',
      'Clean crack with wire brush, blow out dust, dampen surface before patching',
      'Apply with putty knife, feather edges — DFW heat cures patches fast',
      'Use flexible sealant if crack is at control joint or saw cut',
      'Monitor for 2 DFW wet/dry cycles before declaring stable',
      'Hairline cracks in DFW are common and usually cosmetic — not structural',
    ],
  },
  wider: {
    title: 'Wider Crack Patching in DFW',
    points: [
      'Cracks 1/16″ or larger warrant epoxy injection in DFW',
      'Epoxy injection restores structural integrity — polymer patch alone is insufficient',
      'Two-part epoxy systems are used by DFW foundation contractors',
      'Crack must be stable before injection — active movement will re-crack',
      'After injection: 48–72 hours cure time before loading in DFW summer heat',
      'Cost: $300–$800 per linear foot for professional epoxy injection',
      'DIY polyurethane foam injection kits work for non-structural DFW hairline cracks',
    ],
  },
  spalling: {
    title: 'Surface Spalling Repair in DFW',
    points: [
      'DFW freeze-thaw cycles (rare but real) can initiate spalling over time',
      'Surface skim coat: thin overlay of polymer-modified concrete — 1/4″ to 1/2″ thick',
      'Micro-topping overlay used for cosmetic spalling on garage slabs and patios',
      'Full overlay: bonding agent required — mechanical profile (grinding) first',
      'Spalling deeper than 1/2″ may indicate rebar corrosion — inspect DFW drainage',
      'Do not skim coat over active spalling — fix moisture source first',
      'DFW alkaline soil can attack concrete over time — test pH near foundation',
    ],
  },
  donot: {
    title: 'When NOT to Patch DFW Concrete',
    points: [
      'Active cracks (still moving with seasons) — patching will re-crack immediately',
      'Cracks with differential vertical movement — indicates settlement, not just shrinkage',
      'Cracks near plumbing penetrations before leak test — may indicate slab leak',
      'Wide cracks (1/4″+) without addressing underlying DFW soil movement',
      'Any crack that returns within 1 DFW wet season after patching',
      'Foundation perimeter cracks without drainage improvement first',
      'Rule: fix the cause, then patch — not patch first and hope',
    ],
  },
};

export default function DFWFoundationConcretePatch2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🪨 Foundation Concrete Patching in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW concrete cracks in summer heat and DFW clay movement. Know when patching works — and when it makes things worse.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ DFW Patching Reality</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            In DFW, patching active or moving cracks is a waste of money. <strong style={{ color: '#F5E642′ }}>The patch will fail within one seasonal cycle</strong> if the underlying clay movement hasn’t been stabilized.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>Your Patch Situation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {patchSituations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)}
              style={{ background: selected === s.id ? '#F5E642′ : '#1e293b', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW Foundation Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}