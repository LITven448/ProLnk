import { useState } from 'react';

const poolGuides: Record<string, Record<string, { setup: string[]; etiquette: string[]; safety: string[]; social: string }>> = {
  Inground: {
    'HOA Neighborhood': {
      setup: ['Pool fence required — HOA + DFW code both mandate it', 'Pool house or outdoor bathroom — neighbors expect it at this level', 'Outdoor kitchen adjacent to pool — DFW entertaining standard', 'LED lighting — evening pool parties run late in DFW summers', 'Pool heater for shoulder season — extends to 9 months of use'],
      etiquette: ['Post pool hours on fence — respect neighbors even in HOA', 'Kids swim by invitation only — this is Texas, fences matter', 'Keep decibel level reasonable after 9pm — HOA will enforce', 'Maintain pool weekly — green pools tank neighborhood values'],
      safety: ['Fence with self-latching gate — Texas law requires it', 'Life ring with rope visible poolside', 'No diving board without 9ft depth — depth matters', 'Pool alarm if children in household — DFW insurance requires it'],
      social: 'HOA pool home = neighborhood social hub. You\’re now responsible for summer fun.'
    },
    'No HOA / Rural Lot': {
      setup: ['More design freedom — no HOA restrictions', 'Outdoor speaker system — pool + music + Texas = perfect', 'Fire pit adjacent to pool — cool nights in DFW still happen', 'Outdoor shower — Texas clay doesn\’t belong in your house', 'Dive board or slide possible if depth allows'],
      etiquette: ['No HOA = personal responsibility — set your own rules clearly', 'Neighbor relations matter more — no HOA to mediate', 'Gates and fencing are your insurance requirement, not HOA mandate', 'Pool = neighborhood kids wanting to come over — decide your policy early'],
      safety: ['Texas law: residential pool fence required regardless of HOA', 'Pool alarm — DFW has drowning prevention law for homes with children', 'First aid kit visible poolside — DFW fire code recommends it', 'Clear depth markers — guests in Texas drink beer and swim simultaneously'],
      social: 'No HOA pool = freedom to entertain large. DFW is a party culture — own it.'
    }
  },
  'Above Ground': {
    'HOA Neighborhood': {
      setup: ['Check HOA rules first — many DFW HOAs ban above-ground pools', 'Deck build-out to make it look permanent and integrated', 'Privacy screening if HOA allows — required in many DFW covenants', 'Quality pump and filter — DFW summer heat breeds algae fast'],
      etiquette: ['HOA visibility rules are strict — check before building deck', 'No visibility from street in most DFW HOA communities', 'Keep it maintained — HOA will cite you for green water', 'Invite neighbors before they complain — be proactive'],
      safety: ['Ladder lock when unattended — children are resourceful', 'Above-ground pool still requires fence if children in home', 'Weight limit enforcement — Texas summer parties get crowded', 'Level ground — DFW clay shifts and levels don\’t stay true'],
      social: 'Modest setup, still social. DFW kids don\’t care if it\’s above ground — they just want to swim.'
    },
    'No HOA / Rural Lot': {
      setup: ['Full freedom — go bigger than you think', '18ft round minimum for adult entertaining', 'Deck build-out with built-in seating', 'Portable outdoor bar adjacent — DFW pool culture requires drinks'],
      etiquette: ['No restrictions — set your own rules', 'Be the fun neighbor — DFW rewards it', 'Communicate pool party days to close neighbors — good faith gesture', 'Clean it before guests — algae is not Texas hospitality'],
      safety: ['Ladder lock mandatory when unattended', 'Level pad — inspect seasonally as DFW clay shifts', 'Night lighting — Texas nights don\’t stop the pool party', 'Clear rules posted: no diving, weight limits'],
      social: 'No HOA freedom = biggest social asset in DFW. Use it.'
    }
  }
};

export default function DFWTexasPoolCultureGuide() {
  const [poolType, setPoolType] = useState<'Inground' | 'Above Ground' | ''>('');
  const [neighborhood, setNeighborhood] = useState<'HOA Neighborhood' | 'No HOA / Rural Lot' | ''>('');
  const result = poolType && neighborhood ? poolGuides[poolType]?.[neighborhood] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏊 DFW Texas Pool Culture Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: 8, fontSize: 16 }}>
          A pool in DFW isn't just a pool — it’s your social infrastructure for 7+ months of Texas summer.
        </p>
        <p style={{ color: '#F5E642', fontSize: 13, marginBottom: 32 }}>You are now the neighborhood hub. Here's how to own it responsibly. 🤠</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 10 }}>Pool type</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['Inground', 'Above Ground'] as const).map(p => (
                <button key={p} onClick={() => setPoolType(p)} style={{ flex: 1, background: poolType === p ? '#F5E642′ : '#0A1628', color: poolType === p ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px', fontWeight: 600, cursor: ’pointer' }}>
                  {p === 'Inground' ? '🏊 In-Ground Pool' : '🛁 Above-Ground Pool'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 10 }}>Neighborhood type</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['HOA Neighborhood', 'No HOA / Rural Lot'] as const).map(n => (
                <button key={n} onClick={() => setNeighborhood(n)} style={{ flex: 1, background: neighborhood === n ? '#F5E642′ : '#0A1628', color: neighborhood === n ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                  {n === 'HOA Neighborhood' ? '🏘️ HOA Community' : '🌾 No HOA / Rural'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🔧 Your Setup</div>
              <div style={{ color: '#64748b', fontSize: 13, marginBottom: 14, fontStyle: 'italic' }}>{result.social}</div>
              {result.setup.map((s, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8, paddingLeft: 16, borderLeft: '2px solid #F5E642′ }}>{s}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🤝 Etiquette</div>
                {result.etiquette.map((e, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{e}</div>)}
              </div>
              <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>⚠️ Safety</div>
                {result.safety.map((s, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{s}</div>)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
