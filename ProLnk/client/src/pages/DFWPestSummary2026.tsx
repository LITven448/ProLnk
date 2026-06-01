import { useState } from 'react';

const PEST_PROFILES: Record<string, { pests: string; risk: string; plan: string }> = {
  'North Dallas/Frisco/McKinney': { pests: 'Subterranean termites, fire ants, mosquitoes (May–Oct), occasional invaders (roaches, mice in winter)', risk: 'New construction corridors have heavy fire ant pressure from disturbed soil. Termite pressure moderate but rising with slab crack frequency.', plan: 'Quarterly service: termite bait stations + perimeter spray + fire ant treatment. Add monthly May–Oct for mosquito.' },
  'South Dallas/Oak Cliff': { pests: 'German cockroaches (indoor), subterranean termites, rats (year-round), mosquitoes', risk: 'Older housing stock with more entry points. Rat pressure significant — mature tree canopy provides harborage. German roach infestation spreads fast in multi-unit proximity.', plan: 'Monthly service essential. IPM (Integrated Pest Mgmt) approach — seal entry points before chemical treatment.' },
  'Fort Worth/Tarrant County': { pests: 'Fire ants, subterranean + Formosan termites, scorpions (west side), mosquitoes', risk: 'Formosan termites — more aggressive than subterranean — present in older west FW neighborhoods. Scorpions in Aledo/Weatherford corridor expanding eastward.', plan: 'Quarterly service + Formosan-specific bait system if home pre-2000. Scorpion blacklight inspection annually.' },
  'Arlington/Grand Prairie/Irving': { pests: 'Fire ants, subterranean termites, mosquitoes, occasional bed bugs (rental density)', risk: 'High rental density increases bed bug transmission risk. Older commercial zones adjacent to residential bring rodent pressure.', plan: 'Quarterly service + annual bed bug inspection if rental neighbors present. Termite bond essential.' },
};

const HOME_TYPES = ['Single family owned', 'Townhome/condo', 'Rental property', 'Commercial-adjacent home'];

export default function DFWPestSummary2026() {
  const [location, setLocation] = useState('');
  const [homeType, setHomeType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const profile = location ? PEST_PROFILES[location] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 28 }}>🐜</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Pest Control Knowledge Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>Termite risk zones, fire ant pressure, mosquito seasons, and the right service plan for your DFW home.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🐛', title: 'Termite Risk', body: 'DFW sits in USDA Termite Zone 1 — highest infestation probability in the US. Subterranean termites are present in virtually every DFW zip code. Formosan termites expanding from FW/Arlington westward. A termite bond is not optional — it is standard homeownership cost in DFW.' },
            { icon: '🔥', title: 'Fire Ant Omnipresence', body: 'Fire ants are in every DFW lawn. Mounds appear 3–5 days after rain events. Broadcast bait + mound treatment twice per year is the gold standard. Never disturb a mound without treatment — they scatter and reform elsewhere.' },
            { icon: '🦟', title: 'Mosquito Season', body: 'DFW mosquito season: April through October. Standing water in clay soils (birdbaths, gutters, AC drip) breeds larvae in 7 days. Monthly barrier spray treatments plus source elimination = 85% reduction. West Nile cases reported annually in Dallas County.' },
            { icon: '🐭', title: 'Winter Rodent Pressure', body: 'Mice and rats seek warmth in DFW homes Oct–Feb. Entry points as small as 1/4 inch. Roof rats use tree limbs overhanging rooflines. Exclusion (sealing entries) is the only permanent solution — bait stations alone fail.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Personalized Pest Management Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ flex: 1, minWidth: 200, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select DFW location</option>
              {Object.keys(PEST_PROFILES).map(l => <option key={l}>{l}</option>)}
            </select>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ flex: 1, minWidth: 180, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Home type</option>
              {HOME_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Generate</button>
          </div>
          {submitted && profile && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>Priority pests: {profile.pests}</div>
              <div style={{ color: '#FF8C69', marginBottom: 6, fontSize: 14 }}>⚠️ {profile.risk}</div>
              <div style={{ color: '#6EE7B7', fontSize: 14 }}>✅ {profile.plan}</div>
              {homeType && <div style={{ marginTop: 10, color: '#8B9BB4', fontSize: 13 }}>🏘️ {homeType === 'Rental property' ? 'Rental properties: consider monthly service — tenant complaints and legal liability increase with deferred pest control. Document every service visit.' : homeType === 'Townhome/condo' ? 'Check HOA pest control scope — exterior treatment may be covered. Interior is always your responsibility.' : 'Single-family homes benefit most from bundled quarterly plans — termite bond + general pest + mosquito in one contract for best pricing.'}</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🤝 ProLnk Pest Partners</div>
          <p style={{ color: '#8B9BB4', fontSize: 14, margin: 0 }}>All ProLnk pest partners are Texas Structural Pest Control Board licensed. We verify insurance, check complaint history, and require IPM-certified technicians. No national franchise pressure tactics.</p>
        </div>
      </div>
    </div>
  );
}
