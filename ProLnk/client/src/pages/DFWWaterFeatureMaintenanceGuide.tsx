import { useState } from 'react';

const featureTypes = ['Fountain (no fish)', 'Koi Pond', 'Pondless Waterfall', 'Bird Bath', 'Small Container Pond'];
const issueTypes = ['Green Algae Bloom', 'Mosquitoes', 'Hard Water Scale', 'Pump Clogging', 'Fish Stress/Death'];

const schedules: Record<string, string[]> = {
  'Fountain (no fish)': ['Weekly: Check and top off water level (DFW evaporation is extreme in summer)', 'Weekly: Wipe algae from basin surface if visible', 'Monthly: Clean pump impeller and intake screen', 'Monthly: Add algaecide (safe for birds)', 'Quarterly: Full drain and scrub basin', 'Annually: Inspect pump seals and power cord'],
  'Koi Pond': ['Daily: Check fish behavior and feeding (fish off food = water quality issue)', 'Weekly: Test pH (6.8–7.4), ammonia, nitrites', 'Weekly: 10–15% partial water change', 'Monthly: Clean filter media (don\’t over-clean — beneficial bacteria live there)', 'Seasonally: Increase feeding in spring, reduce in fall as DFW temps drop', 'Annually: Full pond cleanout in early spring'],
  'Pondless Waterfall': ['Monthly: Check water level in reservoir basin', 'Monthly: Clean pump vault and intake', 'Quarterly: Flush stream and waterfall with fresh water', 'Annually: Inspect all fittings and tubing for UV damage (DFW sun is harsh)'],
  'Bird Bath': ['Twice weekly: Dump and refill (standing water = DFW mosquito breeding)', 'Weekly: Scrub bowl with stiff brush (no soap — harmful to birds)', 'Monthly: Check for cracks (DFW freeze-thaw can crack stone baths)', 'Winter: Bring indoors or cover if expecting hard freeze'],
  'Small Container Pond': ['Weekly: Top off water level', 'Weekly: Remove algae by hand or with algaecide', 'Monthly: Clean pump (if equipped)', 'Mosquito prevention: Add Bti dunks — kills larvae without harming plants or animals'],
};

const issueGuide: Record<string, { cause: string; fix: string; product: string }> = {
  'Green Algae Bloom': { cause: 'DFW intense sun + warm water temps accelerate algae growth rapidly in summer', fix: 'Reduce sun exposure with shade plants or umbrella. Add barley straw extract. Use UV clarifier for ponds. Reduce nutrients by removing fish waste and debris.', product: 'API AlgaeFix (fountains), TetraPond AlgaeControl (koi ponds), barley straw extract (all)' },
  'Mosquitoes': { cause: "DFW mosquito season runs March–November. Any standing water breeds mosquitoes in 7–10 days.", fix: 'Add mosquito dunks (Bti) monthly. Ensure water moves constantly — mosquitoes won\’t lay eggs in moving water. Stock mosquitofish in larger ponds (DFW area feed stores carry them).', product: 'Summit Mosquito Dunks, Gambusia (mosquitofish) from DFW feed stores' },
  'Hard Water Scale': { cause: 'DFW water is notoriously hard (high mineral content). Scale builds rapidly on pumps, stones, and fountain bowls.', fix: 'Clean scale with white vinegar or citric acid solution. Soak pump components in diluted vinegar overnight. Use scale inhibitor tablets in fountain basins.', product: 'Fountec Scale Inhibitor, white vinegar (safe for all features)' },
  'Pump Clogging': { cause: 'DFW clay particles and tree pollen clog pump intakes frequently, especially after storms.', fix: 'Install pre-filter foam over pump intake. Clean intake weekly during spring/summer. Run pump continuously — cycling off allows debris to settle inside.', product: 'Pre-filter sponge (any pump brand), check manufacturer intake screen size' },
  'Fish Stress/Death': { cause: 'DFW summer heat: water temps above 85°F stress koi severely. Oxygen depletes as water warms.', fix: 'Add aeration (waterfall or air pump). Shade pond with floating plants (water hyacinth). Do not overstock fish. Test water chemistry immediately.', product: 'Pond aerator kit, API Pond Salt, water test kit' },
};

export default function DFWWaterFeatureMaintenanceGuide() {
  const [feature, setFeature] = useState('');
  const [issue, setIssue] = useState('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [showIssue, setShowIssue] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>💧 DFW WATER FEATURE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Water Feature Maintenance for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW's heat, hard water, and mosquito pressure make water feature maintenance more demanding than most climates. Here’s the DFW-specific schedule and solutions.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ DFW-Specific Challenges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['🌞 Summer Heat', 'Evaporation: up to 1″ per week. Algae blooms in days. Koi stress above 85°F.'], ['🦟 Mosquitoes', 'Season runs March–November. Treat every 30 days or stock mosquitofish.'], ['💧 Hard Water', 'DFW water leaves heavy scale on pumps, stones, and bowls.'], ['❄️ Winterization', 'DFW rarely freezes hard — most features run year-round. Protect fish in hard freezes only.']].map(([t, d]) => (
              <div key={t} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 Get Your Maintenance Schedule</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Your water feature type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {featureTypes.map(f => (
                <button key={f} onClick={() => setFeature(f)} style={{ background: feature === f ? '#F5E642′ : '#1e3a5f', color: feature === f ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{f}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowSchedule(true)} disabled={!feature} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: !feature ? 0.5 : 1 }}>Show Schedule</button>
        </div>

        {showSchedule && feature && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 {feature} Maintenance Schedule</div>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {schedules[feature].map((item, i) => (
                <li key={i} style={{ color: '#cbd5e1', marginBottom: 8, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Diagnose a Problem</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {issueTypes.map(i => (
              <button key={i} onClick={() => setIssue(i)} style={{ background: issue === i ? '#F5E642′ : '#1e3a5f', color: issue === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{i}</button>
            ))}
          </div>
          <button onClick={() => setShowIssue(true)} disabled={!issue} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: !issue ? 0.5 : 1 }}>Diagnose</button>
        </div>

        {showIssue && issue && issueGuide[issue] && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚡ {issue}</div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#64748b' }}>Cause:</span> <span style={{ color: '#cbd5e1′ }}>{issueGuide[issue].cause}</span></div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#64748b' }}>Fix:</span> <span style={{ color: '#cbd5e1′ }}>{issueGuide[issue].fix}</span></div>
            <div><span style={{ color: '#64748b' }}>Products:</span> <span style={{ color: '#F5E642′ }}>{issueGuide[issue].product}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
