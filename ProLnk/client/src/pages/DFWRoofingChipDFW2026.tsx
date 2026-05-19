import { useState } from 'react';

export default function DFWRoofingChipDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const damages = [
    {
      id: 'chipped',
      label: '🪨 Chipped Shingle Corners',
      title: 'DFW Hail Impact — Claim Potential: HIGH',
      body: 'Chipped corners on architectural shingles are the signature of DFW 1/2″–1″ hail. Adjusters look for matching damage pattern across the slope. If 10+ shingles show corner chips in the same hail impact zone, this qualifies as storm damage. Document within 30 days of storm. ProLnk Vault timestamps the damage event against NOAA storm data.',
    },
    {
      id: 'ridgecap',
      label: '🔝 Cracked Ridge Cap',
      title: 'Thermal Movement + Age — Claim Depends on Cause',
      body: 'Ridge cap cracks from two causes: (1) hail impact on raised ridge — claimable, (2) age + thermal cycling — not claimable. DFW 100°F summers and 20°F winters create extreme thermal stress. Caps over 8 years old crack regardless of storms. Your adjuster will look for bruising, not just cracking. ProLnk documents install date + crack pattern for accurate attribution.',
    },
    {
      id: 'pipeboot',
      label: '🔧 Small Pipe Boot Tears',
      title: 'UV Degradation — Silent DFW Water Entry Point',
      body: 'Pipe boot rubber degrades in DFW UV within 7–12 years — earlier on south-facing slopes. A 1/4″ tear channels rain directly into the attic. Not typically claimable unless storm-caused. ProLnk checklists include all pipe penetrations. Replacement runs $75–$150/boot — cheapest repair, highest leak-per-dollar prevention in DFW.',
    },
    {
      id: 'granule',
      label: '✨ Granule Loss in Specific Spots',
      title: 'Hail Bruising — The Invisible DFW Claim',
      body: 'Concentrated granule loss in 2″ circles is hail bruising — each impact strips 200–400 granules, exposing asphalt. Visible from attic as bright spots on underside. DFW adjusters require 8+ bruises per 10 sq ft for claim approval. This damage accelerates shingle aging by 3–5 years. ProLnk documents bruise density per slope for claim support.',
    },
    {
      id: 'vault',
      label: '🏠 ProLnk Vault Claim Documentation',
      title: 'Vault Records = Faster Claim Approval',
      body: 'ProLnk Vault stores: storm event date from NOAA, inspection photos with GPS coordinates, damage count per slope, and contractor findings. Texas Department of Insurance requires claims within 2 years of storm. Vault documentation eliminates dispute over event date and damage scope — average DFW roof claim: $8,000–$18,000.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ROOFING GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏠 DFW Roofing Chip and Crack Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW homeowners miss small roof damages that accumulate into big insurance claims. Learn which damage types are claimable, which are maintenance issues, and how ProLnk documents everything for maximum coverage.
        </p>

        <div style={{ backgroundColor: '#0f2240', borderRadius: 8, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚡ DFW Roof Damage Quick Reference</div>
          {['Chipped corners + granule loss in same storm = strong claim', 'File within 30 days of storm for fastest processing', 'Average DFW hail claim: $8,000–$18,000', 'Storm chasers void warranty — use ProLnk Charter roofers'].map((f, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{f}</div>
          ))}
        </div>

        <div style={{ color: '#94a3b8', marginBottom: 16 }}>Select damage type:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {damages.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ backgroundColor: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (() => {
          const s = damages.find(x => x.id === selected)!;
          return (
            <div style={{ backgroundColor: '#0f2240', border: '1px solid #F5E642', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{s.body}</div>
            </div>
          );
        })()}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>🏠 Get a DFW Roof Inspection</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk Charter roofers are licensed, no storm chasers. Inspection results + photos go straight into your Vault for claim documentation.</div>
        </div>
      </div>
    </div>
  );
}
