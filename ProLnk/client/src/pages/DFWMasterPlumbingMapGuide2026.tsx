import { useState } from 'react';

const sections = [
  { id: 'shutoff', label: '🚰 Main Shutoff', desc: 'Usually at street meter or where main line enters home. Turn clockwise to shut off all water.' },
  { id: 'supply', label: '🪠 Supply Shutoffs', desc: 'Under every sink and behind every toilet. Angle stops — turn clockwise to isolate.' },
  { id: 'waterheater', label: '🔥 Water Heater', desc: 'Cold supply shutoff on top. Label it. Know if gas or electric — both have emergency shutoffs.' },
  { id: 'gas', label: '⛽ Gas Shutoff', desc: 'At meter outside with a wrench. Requires Atmos to restore — only shut in emergency.' },
  { id: 'hosebib', label: '🌿 Hose Bibs', desc: 'Exterior spigots. Most DFW homes have 2-4. Shut off in freeze events from interior valve.' },
];

const homeTypeGuides: Record<string, string[]> = {
  slab: ['Main shutoff near garage or front hose bib', 'All supply lines run under slab — map any known access points', 'Water heater typically in garage or closet', 'No crawlspace — leak detection critical'],
  twostory: ['Main shutoff in garage or utility room', 'Second floor supply lines in walls — shutoffs under each fixture', 'Water heater may be upstairs closet (common DFW builder practice)', 'Map both floors separately'],
  pier: ['Main shutoff near foundation access', 'Supply lines often accessible under home', 'Inspect shutoff valves for corrosion annually', 'Crawlspace entry is your emergency access point'],
};

export default function DFWMasterPlumbingMapGuide2026() {
  const [activeSection, setActiveSection] = useState('shutoff');
  const [homeType, setHomeType] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const guide = homeType ? homeTypeGuides[homeType] : null;
  const active = sections.find(s => s.id === activeSection);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master Plumbing Map Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Every DFW homeowner should have a written plumbing map before any emergency. Here is how to build yours.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ background: activeSection === s.id ? '#F5E642′ : '#1e2d4a', color: activeSection === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
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
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Home Type → Plumbing Map Guide</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {['slab', 'twostory', 'pier'].map(t => (
              <button key={t} onClick={() => setHomeType(t)}
                style={{ background: homeType === t ? '#F5E642′ : '#0A1628', color: homeType === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 16px', cursor: ’pointer', fontWeight: 600, textTransform: 'capitalize' }}>
                {t === 'twostory' ? 'Two-Story' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {guide && guide.map((tip, i) => (
            <div key={i} onClick={() => toggle(`guide-${i}`)}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ color: checked.includes(`guide-${i}`) ? '#F5E642′ : '#2d4a6e', fontSize: 18 }}>
                {checked.includes(`guide-${i}`) ? '✅' : '⬜'}
              </span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Need a plumber to help map your system?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>ProLnk connects DFW homeowners with vetted plumbers — free quotes, no pressure.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Free Plumbing Quotes →</a>
        </div>
      </div>
    </div>
  );
}
