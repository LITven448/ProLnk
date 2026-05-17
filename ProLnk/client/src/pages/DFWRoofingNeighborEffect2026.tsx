import { useState } from 'react';

const neighborScenarios = [
  { id: 'neighbors-class4', label: '🏘️ My neighbors have Class 4 roofs, mine doesn\'t', advice: 'If neighbors have Class 4 impact-resistant shingles and you don\'t, you\'re paying a premium without the savings. Most DFW insurers (State Farm, Allstate, USAA) offer 15–30% premium discounts for Class 4 roofing. Upgrade to recoup the cost within 4–6 years through premium savings.' },
  { id: 'hail-event', label: '⛈️ Hail storm just hit our neighborhood', advice: 'After a DFW hail event, the entire neighborhood is in the insurer\'s risk pool for claims. File your inspection request quickly — adjusters get overwhelmed. Coordinate with neighbors: shared storm event = stronger claim documentation. ProLnk can dispatch a roofing inspector to your block.' },
  { id: 'old-neighborhood', label: '🏚️ Older DFW neighborhood, original roofs', advice: 'A neighborhood with many aging original roofs creates cluster risk for insurers. Your premiums may rise even if your roof is in good condition. Being the first on your block to upgrade to Class 4 is a competitive advantage for resale and insurance cost.' },
  { id: 'insurance-increase', label: '📈 Insurance premium increased without claims', advice: 'DFW insurers increasingly price by neighborhood zip code and census block claims history. If neighbors had hail claims, your premium rises even without your own claim. Installing Class 4 roofing is the best individual counter-action — it removes you from the standard risk pool.' },
  { id: 'coordinate', label: '🤝 Want to coordinate neighborhood roofing project', advice: 'Neighborhood group roofing projects save money — contractors offer 10–20% discounts for multiple adjacent homes. HOA can facilitate. ProLnk specializes in coordinating multi-home roofing assessments in DFW subdivisions. Submit your neighborhood and we\'ll organize a block assessment event.' },
];

export default function DFWRoofingNeighborEffect2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = neighborScenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🏘️ DFW Neighbor's Roof Effect on Insurance Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          In DFW, your roofing decisions don't happen in isolation. Neighbor claims, neighborhood roof age, and Class 4 adoption rates on your block directly affect your insurance premiums.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642' : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '🎯 My Situation'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '📊', title: 'Neighborhood Risk Pooling', body: 'DFW insurers increasingly use neighborhood-level claims data when pricing individual policies. A cluster of hail claims in your zip code or subdivision raises rates for everyone — even homeowners who never filed a claim. Your neighbor\'s roof affects your wallet.' },
              { icon: '🏅', title: 'Class 4 Roofing Advantage', body: 'Class 4 impact-resistant shingles (UL 2218 rated) earn 15–30% premium discounts from major DFW insurers. If your neighbors have Class 4 and you don\'t, you\'re paying more while they pay less — and your home has lower storm resilience during DFW hail season.' },
              { icon: '⛈️', title: 'Coordinated Storm Claims', body: 'DFW hail storms affect entire neighborhoods simultaneously. Coordinating inspection scheduling with neighbors after a storm event improves claim outcomes — shared weather data, shared adjuster visit dates, and consistent documentation strengthen individual claims.' },
              { icon: '📉', title: 'How Neighbor Claims Raise Your Rates', body: 'If 15%+ of homes in your census block file hail claims in a given year, insurers revise their actuarial tables for that block. Next renewal, your rate increases reflect neighborhood risk — not just your personal loss history. The only counter is Class 4 designation.' },
              { icon: '🤝', title: 'ProLnk Neighborhood Assessments', body: 'ProLnk coordinates roofing assessments for entire DFW subdivisions — one scheduling event, one contractor team, economies of scale for all. Neighborhood projects complete faster, cost less per home, and allow HOAs to negotiate collective pricing.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your DFW neighborhood roofing situation:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {neighborScenarios.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{
                  background: selected === s.id ? '#1e3a5f' : '#132240', border: selected === s.id ? '2px solid #F5E642' : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>{s.label}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🏘️ Insurance Strategy</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.advice}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  📞 ProLnk can coordinate a neighborhood roofing assessment — connect with a DFW roofing specialist today.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted roofing professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}