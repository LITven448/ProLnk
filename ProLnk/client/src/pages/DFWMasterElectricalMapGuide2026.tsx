import { useState } from 'react';

const steps = [
  { id: 'panel', label: '⚡ Breaker Panel', desc: 'Find your panel — usually garage, utility room, or hallway. Most DFW panels are unlabeled. Start mapping now.' },
  { id: 'circuit', label: '💡 Circuit Testing', desc: 'Plug a lamp into outlets, flip breakers one at a time, label immediately. Takes 30 min per floor.' },
  { id: 'gfci', label: '🔌 GFCI Outlets', desc: 'Required in kitchens, bathrooms, garages, outdoors. Test monthly with the button. Know which GFCI controls others.' },
  { id: 'main', label: '🔴 Main Shutoff', desc: 'Large breaker at top of panel. Know its location before any electrical emergency or work.' },
  { id: 'outdoor', label: '🏠 Outdoor Disconnect', desc: 'AC units have a dedicated outdoor disconnect box. Know its location for HVAC service calls.' },
];

const ageGuides: Record<string, string[]> = {
  pre1980: ['Check for aluminum wiring — fire hazard, requires licensed electrician', 'Federal Pacific or Zinsco panels must be replaced', 'Ungrounded outlets common — no ground = no surge protection', 'Map every 2-prong outlet location for contractor priority list'],
  '1980s': ['Arc-fault breakers likely missing — consider upgrade', 'GFCI coverage may be incomplete', 'Panel capacity may need expansion for modern loads', 'Check for double-tapped breakers — common code violation'],
  modern: ['AFCI breakers should cover bedrooms', 'GFCI required in all wet areas', 'Panel likely 200-amp — verify for EV charger additions', 'Smart breakers available for load monitoring'],
};

export default function DFWMasterElectricalMapGuide2026() {
  const [activeStep, setActiveStep] = useState('panel');
  const [homeAge, setHomeAge] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const guide = homeAge ? ageGuides[homeAge] : null;
  const active = steps.find(s => s.id === activeStep);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master Electrical Map Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>An unlabeled breaker panel is an emergency waiting to happen. Build your DFW home electrical map today.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {steps.map(s => (
            <button key={s.id} onClick={() => setActiveStep(s.id)}
              style={{ background: activeStep === s.id ? '#F5E642′ : '#1e2d4a', color: activeStep === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{active.label}</div>
            <p style={{ color: '#94a3b8', margin: 0 }}>{active.desc}</p>
          </div>
        )}

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Home Age → Electrical Mapping Guide</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['pre1980', '1980s', 'modern'].map(t => (
              <button key={t} onClick={() => setHomeAge(t)}
                style={{ background: homeAge === t ? '#F5E642′ : '#0A1628', color: homeAge === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 16px', cursor: ’pointer', fontWeight: 600 }}>
                {t === 'pre1980′ ? ’Pre-1980′ : t === '1980s' ? '1980s–2000s' : '2000s–Present'}
              </button>
            ))}
          </div>
          {guide && guide.map((tip, i) => (
            <div key={i} onClick={() => toggle(`tip-${i}`)}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ fontSize: 18 }}>{checked.includes(`tip-${i}`) ? '✅' : '⬜'}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Need an electrician to label your panel?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>ProLnk connects DFW homeowners with licensed electricians — free quotes, vetted pros.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Electrical Quotes →</a>
        </div>
      </div>
    </div>
  );
}
