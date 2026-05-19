import { useState } from 'react';

const taskTypes = [
  { id: 'licensed', label: '⚡ Licensed Trade Work', desc: 'Electrical, plumbing, HVAC' },
  { id: 'safety', label: '🦺 Safety-Critical', desc: 'Structural, gas, roof' },
  { id: 'permit', label: '🏗️ Needs a Permit', desc: 'Additions, major renovations' },
  { id: 'cosmetic', label: '🎨 Cosmetic / Simple', desc: 'Painting, caulking, filters' },
];

const recs: Record<string, { verdict: 'prolnk' | 'diy'; title: string; reasons: string[]; examples: string[]; warning?: string }> = {
  licensed: {
    verdict: 'prolnk',
    title: 'Always Use ProLnk — License Required',
    reasons: [
      'Licensed work requires a TDLR-licensed contractor in Texas',
      'Unlicensed work voids homeowner insurance coverage',
      'DIY electrical/plumbing fails fail inspections and kill resale',
      'Charter Pros carry liability — you are protected',
    ],
    examples: ['Electrical panel upgrade', 'HVAC replacement', 'Water heater install', 'Gas line work'],
    warning: 'DIY on licensed work = uninsured, unpermitted, unsellable home',
  },
  safety: {
    verdict: 'prolnk',
    title: 'Always Use ProLnk — Safety Risk',
    reasons: [
      'One mistake on structural work can cost $50,000+ to fix',
      'Gas leaks and roof failures are life-safety issues',
      'Charter Pros carry $1M+ liability insurance',
      'ProLnk Vault documents the repair for future buyers',
    ],
    examples: ['Foundation repair', 'Roof replacement', 'Load-bearing wall removal', 'Gas appliance install'],
    warning: 'No amount of YouTube tutorials replaces professional safety training',
  },
  permit: {
    verdict: 'prolnk',
    title: 'Always Use ProLnk — Permit Required',
    reasons: [
      'DFW cities require permits for additions, fences over 6ft, decks',
      'Unpermitted work must be disclosed at sale — kills deals',
      'Charter Pros know local permit requirements for your city',
      'ProLnk Vault stores permit records automatically',
    ],
    examples: ['Room addition', 'Deck or patio cover', 'Fence over 6ft', 'Pool installation'],
    warning: 'Dallas, Fort Worth, Frisco all have different permit thresholds — know yours',
  },
  cosmetic: {
    verdict: 'diy',
    title: 'DIY is Fine — Low Risk, Low Stakes',
    reasons: [
      'No license required, no permit needed',
      'Mistakes are easily reversible and low cost',
      'Great way to learn your home and save money',
      'ProLnk is always available when a DIY goes sideways',
    ],
    examples: ['Interior painting', 'Caulking windows/tubs', 'HVAC filter changes', 'Minor landscaping', 'Cabinet hardware'],
  },
};

export default function DFWProLnkVsDoItYourself2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui,sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: 0 }}>ProLnk vs DIY for DFW Homeowners 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>Know when to call a pro and when to grab the caulk gun yourself.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>🔧 Always ProLnk</div>
            {['Licensed trades (elec, plumbing, HVAC)','Anything gas-related','Structural or roof work','Anything requiring a permit'].map((i,x)=><div key={x} style={{color:'#cbd5e1',fontSize:'.85rem',marginBottom:'.25rem'}}>• {i}</div>)}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '.75rem' }}>🪣 DIY OK</div>
            {['Painting and touch-ups','Caulking windows and baths','Filter changes','Minor landscaping'].map((i,x)=><div key={x} style={{color:'#cbd5e1',fontSize:'.85rem',marginBottom:'.25rem'}}>• {i}</div>)}
          </div>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>What type of task are you looking at?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {taskTypes.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)} style={{ background: selected === t.id ? '#F5E642′ : '#1e3a5f', color: selected === t.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{t.label}</div>
              <div style={{ fontSize: '.85rem', opacity: .8, marginTop: '.25rem' }}>{t.desc}</div>
            </button>
          ))}
        </div>

        {rec && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{rec.verdict==='prolnk'?'🔧':'🪣'}</span>
              <h2 style={{ color: '#F5E642', margin: 0 }}>{rec.title}</h2>
            </div>
            {rec.reasons.map((r,i)=><div key={i} style={{display:'flex',gap:'.75rem',marginBottom:'.5rem'}}><span style={{color:'#F5E642'}}>✓</span><span style={{color:'#cbd5e1'}}>{r}</span></div>)}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '.75rem', marginTop: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '.85rem', marginBottom: '.5rem' }}>Examples:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>{rec.examples.map((e,i)=><span key={i} style={{background:'#1e3a5f',color:'#F5E642',padding:'.25rem .75rem',borderRadius:20,fontSize:'.8rem'}}>{e}</span>)}</div>
            </div>
            {rec.warning && <div style={{ background: '#7f1d1d', borderRadius: 8, padding: '.75rem', marginTop: '.75rem', color: '#fca5a5', fontSize: '.85rem' }}>⚠️ {rec.warning}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
