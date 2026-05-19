import { useState } from 'react';

const homeAges = [
  { id: 'new', label: '🏠 Newer home (post-2010, tight construction)' },
  { id: 'mid', label: '🏡 Mid-age home (1990–2010)' },
  { id: 'old', label: '🏚️ Older home (pre-1990)' },
];

const concerns = [
  { id: 'mold', label: '🍄 Mold on coils or in ducts' },
  { id: 'sick', label: '🤧 Frequent illness / respiratory issues' },
  { id: 'odor', label: '👃 Persistent musty or chemical odors' },
  { id: 'allergy', label: '🌿 Allergies not resolved by MERV filters alone' },
];

function getResult(age: string, concern: string) {
  const highRisk = age === 'new' && (concern === 'mold' || concern === 'sick');
  const moldFocus = concern === 'mold';

  return {
    rec: moldFocus ? 'In-duct UVGI Coil System (germicidal UV-C)' : 'In-duct UV + PCO Air Purifier Combo',
    placement: moldFocus ? 'Mounted near evaporator coil (where mold grows in DFW humidity)' : 'Coil UV + second unit in main supply plenum',
    cost: age === 'new' ? '$600–$1,800 installed' : '$400–$1,200 installed',
    worth: concern === 'mold' || concern === 'sick' ? 'Yes — high ROI for DFW' : 'Moderate — good for air quality but not a silver bullet',
    note: `DFW's humid summers create near-perfect conditions for mold growth on evaporator coils. ${moldFocus ? 'UV-C light disrupts mold DNA on contact — continuous coil irradiation prevents buildup that degrades air quality and efficiency.' : 'PCO (photocatalytic oxidation) systems break down VOCs, odors, and pathogens beyond what UV alone achieves.'} ${highRisk ? 'Tight construction concentrates these issues — a UV system is particularly high-value here.' : ''} Effectiveness claim: UV kills 99.9% of surface mold. Airborne pathogen reduction depends on air speed past the bulb.`,
  };
}

export default function DFWUVAirPurifierGuide() {
  const [age, setAge] = useState('');
  const [concern, setConcern] = useState('');
  const result = age && concern ? getResult(age, concern) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>☀️ DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>UV Air Purifier Guide for DFW HVAC Systems</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          In Dallas-Fort Worth, your AC's evaporator coil runs wet for months at a time. That’s a mold incubator sitting inside your air handler. In-duct UV purifiers kill what filters miss — here’s what’s real and what’s marketing.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔬 How In-Duct UV Works</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            UV-C light (200–280 nm wavelength) disrupts DNA in microorganisms — killing or inactivating mold, bacteria, and some viruses on contact. When mounted near the evaporator coil, it irradiates the coil surface 24/7, preventing mold colonies from forming. Secondary "air sterilizer" lamps in the supply plenum treat passing air, though effectiveness varies with air speed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '✅', title: 'What UV Does Well', desc: 'Kills surface mold on coils and drain pans. Reduces odors from biological sources. Prevents coil fouling that reduces efficiency.' },
            { icon: '❌', title: 'What UV Won’t Fix', desc: 'Existing mold in walls or ducts. Particles (dust, pollen) — that’s a filter job. Chemical odors from off-gassing furniture or paint.' },
            { icon: '💡', title: 'UVGI vs PCO', desc: 'UVGI = germicidal UV only. PCO adds a catalyst that breaks down VOCs and odors at the molecular level. PCO combos cost more but tackle more problems.' },
            { icon: '⚠️', title: 'Ozone Warning', desc: 'Some UV systems produce ozone as a byproduct. In DFW\’s already-polluted air, ozone can irritate lungs. Look for "ozone-free" certification.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 20, marginBottom: 4 }}>{f.icon}</p>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Is UV Worth It for Your DFW Home?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your home age:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {homeAges.map(h => (
              <button key={h.id} onClick={() => setAge(h.id)} style={{ background: age === h.id ? '#F5E642′ : '#1e3a5f', color: age === h.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{h.label}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Primary air quality concern:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id)} style={{ background: concern === c.id ? '#F5E642′ : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{c.label}</button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Recommended: {result.rec}</p>
              <p style={{ color: '#e2e8f0', marginBottom: 4 }}>📍 Placement: <strong>{result.placement}</strong></p>
              <p style={{ color: '#e2e8f0', marginBottom: 4 }}>💰 DFW installed cost: <strong>{result.cost}</strong></p>
              <p style={{ color: '#e2e8f0', marginBottom: 8 }}>Worth it? <strong>{result.worth}</strong></p>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
