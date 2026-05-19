import { useState } from 'react';

const damageTypes = [
  {
    id: 'roof',
    label: '🏠 Roof',
    emergency: ['Place tarps over any exposed decking immediately', 'Call your insurance company before any permanent repairs', 'Document everything with photos and video before tarping'],
    urgency: 'IMMEDIATE — within 24 hours to prevent interior water damage',
    costRange: '$500 – $15,000+',
    callWho: 'Licensed roofing contractor + your insurance company',
    scamAlert: 'Storm chasers offer free tarp then demand $2K+ — get your own tarp from Home Depot for $40.',
  },
  {
    id: 'siding',
    label: '🧱 Siding',
    emergency: ['Inspect for gaps where water or pests can enter', 'Cover large openings with plastic sheeting and tape', 'Avoid power washing damaged areas — can worsen infiltration'],
    urgency: 'WITHIN 72 HOURS — moisture intrusion leads to mold in TX heat',
    costRange: '$800 – $8,000',
    callWho: 'Siding contractor or general contractor experienced in storm repair',
    scamAlert: 'Door-to-door siding replacement offers are almost always overpriced by 40-80% post-storm.',
  },
  {
    id: 'fence',
    label: '🚧 Fence',
    emergency: ['Check for downed sections with sharp edges — safety hazard', 'Secure or flag unstable posts immediately if pets or children present', 'Photograph from multiple angles showing direction of fall'],
    urgency: 'LOW — within 1-2 weeks unless safety risk present',
    costRange: '$300 – $5,000',
    callWho: 'Fence contractor — get 3 bids, this is most over-quoted post-storm',
    scamAlert: 'Fences are #1 post-storm scam target in DFW. Average over-charge is $1,200. Always get 3 bids.',
  },
  {
    id: 'window',
    label: '🪟 Windows',
    emergency: ['Board up broken windows with plywood immediately', 'Place buckets to catch rain, remove wet materials to prevent mold', 'Turn off nearby electrical outlets if water entered'],
    urgency: 'IMMEDIATE — broken windows allow rain and security breach',
    costRange: '$400 – $3,000 per window',
    callWho: 'Window company for replacement, glazier for emergency board-up',
    scamAlert: 'Some contractors board up windows then claim they own the right to replace them — they do not.',
  },
  {
    id: 'tree',
    label: '🌳 Tree / Debris',
    emergency: ['Do NOT attempt to remove a tree from your roof yourself', 'Turn off electricity to the area if power lines are involved', 'Call your utility company if lines are down — do not touch'],
    urgency: 'IMMEDIATE if on structure; within 1 week if yard debris only',
    costRange: '$500 – $10,000+ depending on size and access',
    callWho: 'Certified arborist for removal; structural engineer if on home',
    scamAlert: 'Unlicensed tree crews with chainsaws swarm DFW post-storm. Always check for insurance and license.',
  },
];

export default function DFWWindDamageGuide() {
  const [selected, setSelected] = useState<string>('roof');

  const type = damageTypes.find(d => d.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW STORM GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          DFW Wind Damage Home Repair Guide
        </h1>
        <p style={{ color: '#9AA3B4', fontSize: 16, marginBottom: 16 }}>
          North Texas sits at the southern edge of Tornado Alley. DFW sees 30–70 mph straight-line winds multiple times per year — plus tornado events. Know what to do before the next storm.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {['🌪️ Avg 45 wind events/year', '🏚️ $2.1B storm damage in DFW (2023)', '⚡ #1 cause: straight-line winds'].map(tag => (
            <span key={tag} style={{ background: '#111E33', borderRadius: 20, padding: '6px 14px', fontSize: 13, color: '#9AA3B4' }}>{tag}</span>
          ))}
        </div>

        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>Select Your Damage Type</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {damageTypes.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)} style={{
              padding: '10px 18px', borderRadius: 10, border: selected === d.id ? '2px solid #F5E642' : '2px solid #1E2D45',
              background: selected === d.id ? '#F5E642' : '#111E33',
              color: selected === d.id ? '#0A1628' : '#9AA3B4', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>{d.label}</button>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{type.label} Damage</h3>
          <div style={{ background: '#2A0D0D', border: '1px solid #7C1A1A', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <span style={{ color: '#F87171', fontWeight: 700 }}>⏰ Urgency: </span>
            <span style={{ color: '#C5CAD8' }}>{type.urgency}</span>
          </div>

          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 10 }}>🚨 Emergency Action Steps</h4>
          <div style={{ marginBottom: 20 }}>
            {type.emergency.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ color: '#C5CAD8', lineHeight: 1.5 }}>{step}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: '#6B7A99', marginBottom: 4 }}>💰 Typical Cost Range</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{type.costRange}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: '#6B7A99', marginBottom: 4 }}>📞 Who to Call</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{type.callWho}</div>
            </div>
          </div>

          <div style={{ background: '#1A1A0D', border: '1px solid #5C5A1A', borderRadius: 10, padding: '12px 16px' }}>
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>🚩 DFW Scam Alert: </span>
            <span style={{ color: '#C5CAD8' }}>{type.scamAlert}</span>
          </div>
        </div>

        <div style={{ padding: '16px 20px', background: '#111E33', borderRadius: 12, borderLeft: '4px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>Texas Assignment of Benefits Warning:</strong>
          <span style={{ color: '#9AA3B4', marginLeft: 8 }}>
            Never sign an "Assignment of Benefits" form. This transfers your insurance rights to the contractor and removes your ability to negotiate your own claim.
          </span>
        </div>
      </div>
    </div>
  );
}
