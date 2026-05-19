import { useState } from 'react';

const heights = [
  { label: '8 ft (Pre-2000 DFW)', value: '8ft', era: 'Pre-2000', desc: 'Standard in older DFW ranch and traditional homes. Common in Garland, Mesquite, Irving builds before 2000.', hvac: 'Lower volume = easier to cool. Central AC units sized for 8ft standard. Less strain in DFW summers.', cost: 'Lowest cooling cost tier — approx $180–$240/mo in peak summer.' },
  { label: '9 ft (2000s–2010s Standard)', value: '9ft', era: '2000–2014', desc: 'Became the DFW builder standard. Found in most Allen, McKinney, Frisco tract homes from this era.', hvac: '12.5% more volume than 8ft. HVAC must compensate — factor in load calc.', cost: 'Approx $210–$270/mo peak summer in DFW.'},
  { label: '10 ft (2015+ Premium DFW)', value: '10ft', era: '2015–Present', desc: 'Now standard in Prosper, Celina, and premium Frisco/Southlake builds. Adds perceived luxury.', hvac: '25% more volume than 8ft. HVAC sizing critical — undersized units run constantly in DFW heat.', cost: 'Approx $240–$310/mo peak summer. Zoning system recommended.' },
  { label: 'Vaulted / Cathedral', value: 'vaulted', era: 'Specialty', desc: 'Great rooms and master suites in DFW luxury builds. Dramatic effect, especially in Southlake and Westlake homes.', hvac: 'Most complex. Dead air at peak can reach 110°F+. Ceiling fans critical. Often needs supplemental mini-split.', cost: 'Highest cooling cost — $290–$400+/mo in DFW peak season.'},
];

const concerns = [
  { label: 'Cooling Cost', value: 'cost', icon: '💰' },
  { label: 'HVAC Sizing', value: 'hvac', icon: '🌡️' },
  { label: 'Home Era Context', value: 'era', icon: '🏠' },
  { label: 'General Info', value: 'desc', icon: '📋' },
];

export default function DFWCeilingHeightGuide2026() {
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedConcern, setSelectedConcern] = useState('desc');

  const result = selectedHeight
    ? heights.find((h) => h.value === selectedHeight)
    : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Ceiling Height Guide 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>How ceiling height affects comfort and cooling costs across DFW homes</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Select Ceiling Height</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {heights.map((h) => (
              <button key={h.value} onClick={() => setSelectedHeight(h.value)}
                style={{ background: selectedHeight === h.value ? '#F5E642' : '#162035', color: selectedHeight === h.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>What Are You Most Concerned About?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {concerns.map((c) => (
              <button key={c.value} onClick={() => setSelectedConcern(c.value)}
                style={{ background: selectedConcern === c.value ? '#F5E642' : '#162035', color: selectedConcern === c.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600 }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{result.label}</h2>
            <p style={{ lineHeight: 1.7, color: '#ddd' }}>{result[selectedConcern]}</p>
          </div>
        )}

        {!result && (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888' }}>
            Select a ceiling height above to see DFW-specific guidance.
          </div>
        )}

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>
          ProLnk DFW Home Intelligence • prolnk.io
        </p>
      </div>
    </div>
  );
}
