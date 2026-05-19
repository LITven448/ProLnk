import { useState } from 'react';

const assetTypes = [
  { label: 'Roof', icon: '🏠', tips: ['Install Class 4 impact-resistant shingles (saves 20-30% on premium)', 'Document current shingle condition before storm season', 'Check attic ventilation — heat + hail damage compounds quickly', 'File insurance claim within 12 months of storm event'] },
  { label: 'AC Unit', icon: '❄️', tips: ['Install hail guards/cages over condenser fins', 'Turn off AC during active hail — power surge risk', 'Check condenser fins post-storm with flashlight', 'Straighten bent fins with a fin comb ($15 tool)'] },
  { label: 'Vehicle', icon: '🚗', tips: ['Park in garage or covered carport April–June', 'Use padded car cover if no covered parking available', 'Comprehensive auto insurance covers hail — check deductible', 'Document pre-season vehicle condition with dated photos'] },
  { label: 'Windows', icon: '🪟', tips: ['Impact-resistant film reduces breakage risk by 60%', 'Storm shutters for frequent exposure areas', 'Check window seals after any hail event', 'Skylights: most vulnerable — consider polycarbonate upgrade'] },
  { label: 'Gutters', icon: '🌧️', tips: ['Install gutter guards — hail debris clogs gutters fast', 'Aluminum gutters dent; steel or copper hold up better', 'Inspect downspout connections post-storm', 'Clogged gutters from hail debris → foundation water damage'] },
];

export default function DFWHailSeasonPrepGuide2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⛈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Hail Season Prep Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Part 2: Advanced Protection for DFW's Most Destructive Weather Threat</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>⚡ Why Class 4 Shingles Are the #1 DFW Upgrade</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            DFW averages 6–9 significant hail events per year. Class 4 impact-resistant shingles can earn you a <strong style={{ color: '#F5E642′ }}>20–30% insurance discount</strong> in Texas, while lasting 40+ years vs. 20 for standard shingles. The ROI is typically under 4 years when insurance savings are factored in.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 8 }}>📋 Before/After Documentation Process</h2>
          <ol style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Photograph every exterior surface in April before storm season</li>
            <li>Geotag photos and store in a dated cloud folder</li>
            <li>After each storm: re-photograph same angles within 48 hours</li>
            <li>Submit to insurer with weather report from that date</li>
            <li>Get 2 contractor estimates before accepting insurer's number</li>
          </ol>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Select Your Asset for Protection Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {assetTypes.map((a, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {a.icon} {a.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{assetTypes[selected].icon} {assetTypes[selected].label} Hail Protection</h3>
              <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 18 }}>
                {assetTypes[selected].tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🛡️ ProLnk Hail-Ready Contractors</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Find Class 4 roofing specialists and AC protection installers pre-vetted for DFW hail work. Join the waitlist today.</p>
        </div>
      </div>
    </div>
  );
}