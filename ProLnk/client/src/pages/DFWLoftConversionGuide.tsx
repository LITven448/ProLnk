import { useState } from 'react';

const CURRENT_USES = ['Open bonus room (unused)', 'Kids playroom', 'Home gym', 'Craft / hobby room', 'Already a bedroom'];
const TARGET_USES = ['Media / home theater', 'Additional bedroom', 'Home office', 'Teen suite / hangout', 'Dual-purpose flex room'];
const ROOM_SIZES = ['Under 200 sqft', '200–350 sqft', '350–500 sqft', '500+ sqft'];

const EGRESS_REQUIRED: Record<string, boolean> = {
  'Media / home theater': false,
  'Additional bedroom': true,
  'Home office': false,
  'Teen suite / hangout': false,
  'Dual-purpose flex room': false,
};

const HVAC_NOTES: Record<string, string> = {
  'Under 200 sqft': 'Mini-split (1-ton) typically sufficient. DFW bonus rooms run 10–15°F hotter in summer.',
  '200–350 sqft': 'Mini-split (1.5–2 ton) or dedicated zone from main system. Spray foam insulation on roof deck critical.',
  '350–500 sqft': '2-ton mini-split or full zone addition. Duct extension often inadequate — standalone unit preferred.',
  '500+ sqft': 'Dedicated 2.5–3 ton system. Consider dual-zone with separate thermostat control.',
};

const COST_BY_TARGET: Record<string, string> = {
  'Media / home theater': '$15K–$45K depending on AV level, acoustic treatment, and HVAC upgrade',
  'Additional bedroom': '$12K–$30K — egress window $2K–$5K, closet build-out, HVAC, and permit',
  'Home office': '$8K–$20K — ethernet, dedicated circuit, HVAC, and lighting upgrade',
  'Teen suite / hangout': '$10K–$25K — flooring, lighting, HVAC, and entertainment rough-in',
  'Dual-purpose flex room': '$12K–$28K — modular approach, HVAC primary cost driver',
};

const PERMIT_ITEMS: Record<string, string[]> = {
  'Media / home theater': ['Electrical for dedicated AV circuits', 'No structural permit if no walls added'],
  'Additional bedroom': ['Egress window permit', 'Closet addition', 'Electrical', 'HVAC permit'],
  'Home office': ['Electrical for circuits', 'No permit if cosmetic only'],
  'Teen suite / hangout': ['Electrical if adding circuits', 'No structural if cosmetic'],
  'Dual-purpose flex room': ['Depends on scope — electrical minimum'],
};

export default function DFWLoftConversionGuide() {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [size, setSize] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = current && target && size;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW REMODEL GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Bonus Room & Loft Conversion Guide 🏠</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW homes often have large bonus rooms above the garage. The biggest challenge isn't the conversion — it’s the heat.</p>

        <div style={{ background: '#2a1a0a', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '2rem', fontSize: '0.88rem', color: '#fbbf24′ }}>
          🌡️ <strong>DFW Heat Warning:</strong> Bonus rooms above garages can reach 110°F+ in July. HVAC upgrade is always part of the budget — plan for it first.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '🎬', title: 'Media Room', desc: 'Most popular DFW bonus conversion. Acoustic panels, blackout shades, 4K projector or large TV.' },
            { icon: '🛏️', title: 'Bedroom', desc: 'Egress window required by code. Must have closet for legal bedroom status. Adds resale value.' },
            { icon: '💻', title: 'Home Office', desc: 'Post-2020 demand surge. Ethernet, dedicated circuit, good lighting, and sound isolation.' },
            { icon: '🎮', title: 'Teen Suite', desc: 'Game room + lounge. Easy conversion, lower cost, high family value.' }].map(c => (
            <div key={c.title} style={{ background: '#132035', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Plan Your Conversion</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ label: 'Current Use', val: current, set: setCurrent, opts: CURRENT_USES },
              { label: 'Target Use', val: target, set: setTarget, opts: TARGET_USES },
              { label: 'Room Size', val: size, set: setSize, opts: ROOM_SIZES }].map(({ label, val, set, opts }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {opts.map(o => (
                    <button key={o} onClick={() => { set(o); setShowPlan(false); }}
                      style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: `1px solid ${val === o ? '#F5E642' : '#2a3a55'}`, background: val === o ? '#F5E642′ : ’transparent', color: val === o ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.82rem', fontWeight: val === o ? 700 : 400 }}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!canGenerate}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: canGenerate ? '#F5E642′ : '#2a3a55', color: canGenerate ? '#0A1628' : '#64748b', borderRadius: 8, border: ’none', fontWeight: 800, cursor: canGenerate ? 'pointer' : 'not-allowed', fontSize: '1rem' }}>
            Generate My Conversion Plan →
          </button>
        </div>

        {showPlan && current && target && size && (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Bonus Room Conversion Plan</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {EGRESS_REQUIRED[target] && (
                <div style={{ background: '#2a1a0a', padding: '1rem', borderRadius: 8, border: '1px solid #f97316′ }}>
                  <div style={{ color: '#f97316', fontWeight: 700, marginBottom: '0.3rem' }}>⚠️ Egress Window Required</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Converting to a legal bedroom requires a code-compliant egress window. Budget $2K–$5K for window installation and framing.</div>
                </div>
              )}
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>🌡️ HVAC Needs for {size}</div>
                <div style={{ color: '#94a3b8′ }}>{HVAC_NOTES[size]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>Estimated Cost</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{COST_BY_TARGET[target]}</div>
              </div>
              <div style={{ background: '#0A1628', padding: '1rem', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Permit Requirements</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: 1.8 }}>
                  {PERMIT_ITEMS[target]?.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
