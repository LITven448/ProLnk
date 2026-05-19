import { useState } from 'react';

type CommitLevel = 'Weekend Warrior' | 'Serious Smoker' | 'Competition Ready';

const bbqSetups: Record<string, Record<CommitLevel, { setup: string[]; cost: string; note: string }>> = {
  Small: {
    'Weekend Warrior': {
      setup: ['22″ kettle grill — charcoal for that Texas flavor', 'Side table for prep work', 'Covered area 8x10 min — DFW afternoon sun is brutal', 'Outdoor fan for smoke direction control'],
      cost: '$800–2,500',
      note: 'Starter setup — you\’ll outgrow it fast'
    },
    'Serious Smoker': {
      setup: ['Offset smoker 20″ x 36″ — real Texas BBQ starts here', '3ft clearance from structure — fire code required', 'Wood storage rack with cover — 1/2 cord minimum', 'Sealed concrete or stone pad under smoker'],
      cost: '$3,000–7,000',
      note: 'Right choice for serious backyard BBQ in DFW'
    },
    'Competition Ready': {
      setup: ['Offset smoker 24″x48″ trailer-mounted — judge ready', 'Separate covered wood storage structure', 'Outdoor refrigerator for overnight brisket prep', 'Work table 8ft stainless — prep like the pros'],
      cost: '$8,000–18,000',
      note: 'DFW BBQ circuit is real — this gets you there'
    }
  },
  Medium: {
    'Weekend Warrior': {
      setup: ['Pellet grill 700+ sq in — set and forget for game days', 'Built-in side burner for beans and sides', 'Outdoor kitchen counter space 6ft+', 'String lights — evening BBQs are a DFW staple'],
      cost: '$2,500–6,000',
      note: 'Perfect for DFW entertainment lifestyle'
    },
    'Serious Smoker': {
      setup: ['Offset smoker + pellet backup — two weapon system', 'Outdoor refrigerator 24″ — keep brisket cold until go time', 'Built-in countertop 10ft — prep and serve', 'Outdoor speaker system — BBQ needs music'],
      cost: '$9,000–18,000',
      note: 'Your backyard becomes the neighborhood destination'
    },
    'Competition Ready': {
      setup: ['Two offset smokers — one for backup one for variety', 'Full outdoor kitchen with sink', 'Walk-in cooler or large outdoor refrigerator', 'Covered workspace 12x20 — weather protection for 12-hour cooks'],
      cost: '$20,000–40,000',
      note: 'This is a BBQ compound. DFW respects it.'
    }
  },
  Large: {
    'Weekend Warrior': {
      setup: ['Built-in gas grill 42″ + charcoal side — flexibility', 'Full outdoor kitchen island', 'Covered patio 20x20+ with ceiling fans', 'Outdoor bar with mini fridge and ice maker'],
      cost: '$15,000–35,000',
      note: 'Large lot = full outdoor living room build-out'
    },
    'Serious Smoker': {
      setup: ['Commercial offset smoker on concrete pad', 'Covered smoker area separate from main patio', 'Dedicated wood shed with roof', 'Full outdoor kitchen + smoker station dual setup'],
      cost: '$35,000–65,000',
      note: 'Legendary status in any DFW neighborhood'
    },
    'Competition Ready': {
      setup: ['Competition trailer + permanent smoker setup', 'Commercial refrigeration — walk-in or large chest', 'Outdoor kitchen with full commercial appliances', 'Event lighting + sound — host 50+ person BBQs'],
      cost: '$60,000–120,000',
      note: 'This is a venue. Congrats on becoming DFW BBQ royalty.'
    }
  }
};

export default function DFWTexasBBQCultureGuide() {
  const [space, setSpace] = useState<'Small' | 'Medium' | 'Large' | ''>('');
  const [commit, setCommit] = useState<CommitLevel | ''>('');
  const result = space && commit ? bbqSetups[space][commit] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔥 DFW Texas BBQ Culture Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: 8, fontSize: 16 }}>
          In Texas, the outdoor kitchen isn't an upgrade — it’s infrastructure. Let’s build yours right.
        </p>
        <p style={{ color: '#F5E642', fontSize: 13, marginBottom: 32 }}>⚠️ Smoker clearance from structures is required by DFW fire code. We've got you covered.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 10 }}>Your outdoor space size?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['Small', 'Medium', 'Large'] as const).map(s => (
                <button key={s} onClick={() => setSpace(s)} style={{ flex: 1, background: space === s ? '#F5E642′ : '#0A1628', color: space === s ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>
                  {s === 'Small' ? '🏡 Small (<500 sq ft)' : s === 'Medium' ? '🏠 Medium (500-1500)' : '🏰 Large (1500+)'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 10 }}>BBQ commitment level?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['Weekend Warrior', 'Serious Smoker', 'Competition Ready'] as const).map(c => (
                <button key={c} onClick={() => setCommit(c)} style={{ flex: 1, background: commit === c ? '#F5E642′ : '#0A1628', color: commit === c ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                  {c === 'Weekend Warrior' ? '😄 Weekend Warrior' : c === 'Serious Smoker' ? '💪 Serious Smoker' : '🏆 Competition Ready'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>🔥 Your DFW BBQ Setup</div>
            <div style={{ color: '#64748b', fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>{result.note}</div>
            {result.setup.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642′ }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 15 }}>{item}</span>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Estimated Investment: </span>
              <span style={{ color: '#e2e8f0′ }}>{result.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🤠 DFW BBQ Culture Rules</div>
          {['Gas is acceptable. Charcoal is preferred. Offset wood smoker is religion.', 'Brisket is the benchmark — master it or respect those who have', 'Evening BBQs run until 10pm — outdoor lighting is not optional', 'Your smoker setup tells DFW neighbors who you are'].map((r, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 16, borderLeft: '2px solid #F5E642′ }}>{r}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
