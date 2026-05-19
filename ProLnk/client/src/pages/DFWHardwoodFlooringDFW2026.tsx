import { useState } from 'react';

const issues = [
  { label: 'Cupping / Crowning', icon: '🌊', guide: 'DFW humidity swings (20% winter to 80% summer) cause significant hardwood movement. Cupping (edges higher than center) = moisture imbalance, usually from below. Check crawlspace or slab moisture barrier. Crowning (center higher) = top surface got wet after previous cupping fix. Run whole-home dehumidifier in DFW summers. Allow 3-6 months for planks to re-acclimate before sanding.' },
  { label: 'Gaps Between Planks', icon: '↔️', guide: 'Seasonal gaps are normal in DFW real hardwood — wood shrinks in low winter humidity. Gaps over 1/16″ in summer indicate improper acclimation before install. Acclimate hardwood 5-7 days in the room it will be installed. Maintain 35-55% RH year-round with humidifier/dehumidifier system. Never fill seasonal gaps with caulk — they must be able to close in summer.' },
  { label: 'Squeaking Floors', icon: '🔊', guide: 'DFW slab foundations cause hardwood squeaks differently than crawlspace homes. On slab: squeaks usually from plank-to-plank rubbing, not subfloor. Inject construction adhesive (Squeak-Ender method) at squeaking joint. For floating hardwood on slab: squeaks at joints indicate expansion gap too tight or underlayment bunching. On wood subfloor: screw through subfloor into joist from below at squeak point.' },
  { label: 'Engineered vs Solid', icon: '⚖️', guide: 'Engineered hardwood outperforms solid in DFW climate. DFW humidity swings cause solid hardwood to move 1/8″ per foot of width — significant for wide planks. Engineered hardwood (5-ply or better) moves 60-70% less. On DFW concrete slabs, solid hardwood must be nailed to sleepers or use floating engineered. Engineered can be glued directly to slab. 5″ and wider planks: engineered only for DFW.' },
  { label: 'Refinishing', icon: '✨', guide: 'Solid hardwood can be refinished 4-6 times (3/4″ thick). Engineered: 1-3 times depending on wear layer (2mm+ allows 2 sands). DFW best refinishing window: Sept-Nov when humidity stabilizes. Avoid refinishing in July-August (high humidity causes finish bubbling). Water-based poly dries faster and off-gases less than oil-based — better for DFW heat. Add anti-UV topcoat — DFW sun fades hardwood rapidly near windows.' },
];

export default function DFWHardwoodFlooringDFW2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌳</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Hardwood Flooring Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>DFW humidity swings of 60 points seasonally make hardwood flooring a serious commitment. Select your issue.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {issues.map((issue, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#F5E642′ : '#0f2040', color: selected === i ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '18px 14px', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{issue.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{issue.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: '#0f2040', border: '1px solid #F5E642', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{issues[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700′ }}>{issues[selected].label}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{issues[selected].guide}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🌡️ DFW Hardwood Climate Requirements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Target RH','35-55% year-round — requires humidifier in winter, dehumidifier in summer'],['Acclimation','5-7 days minimum in installation room before laying'],['Best Species','White oak, hickory, and Brazilian cherry handle DFW humidity best'],['Avoid','Wide-plank solid over 5″ in DFW — movement causes serious issues']].map(([k,v],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a hardwood flooring expert in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}