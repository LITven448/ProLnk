import { useState } from 'react';

const layouts = [
  { label: 'Open floor plan', value: 'open' },
  { label: 'Compartmentalized rooms', value: 'compartment' },
  { label: 'Long narrow layout', value: 'narrow' },
  { label: 'Two-story home', value: 'twostory' },
];

const seasons = [
  { label: 'Spring (March-April)', value: 'spring' },
  { label: 'Summer (May-September)', value: 'summer' },
  { label: 'Fall (October-November)', value: 'fall' },
  { label: 'Winter (December-February)', value: 'winter' },
];

const ventData: Record<string, Record<string, { works: boolean; methods: string[]; note: string }>> = {
  open: {
    spring: { works: true, methods: ['Open south and north windows for cross-ventilation', 'DFW southerly breeze flows through open plan well', 'Run whole-house fan at night (55F-72F ideal)', 'Turn off AC and let nature do the work 60% of spring days'], note: 'Open floor plans are best for natural ventilation -- DFW south breeze can reach 15+ mph in spring.' },
    summer: { works: false, methods: ['Close windows by 9am before heat builds', 'Whole-house fan only works below 78F outside (rare June-August)', 'Focus on ceiling fans + AC -- not natural ventilation', 'Pre-cool home at night if temps drop below 75F'], note: 'DFW summers overwhelm natural ventilation. Temps above 85F at night June-August make free cooling impractical.' },
    fall: { works: true, methods: ['October is prime natural ventilation month in DFW', 'Open south-facing windows in morning, north in afternoon', 'Whole-house fan is highly effective October-November', 'Can often delay heating until mid-November'], note: 'Fall is your second best season -- DFW sees many 60-75F days with light southerly breeze.' },
    winter: { works: false, methods: ['Close up tight -- ventilation is heat loss in winter', 'Use HRV or ERV if you need fresh air', 'Brief window opening on 65F+ days only', 'Focus on air sealing to retain heat'], note: 'DFW winters are mild but too cold for free cooling. Occasional warm fronts allow brief ventilation.' },
  },
  compartment: {
    spring: { works: true, methods: ['Open windows on opposite walls of each room', 'DFW south breeze: open south windows, exhaust north', 'Use interior fans to move air between rooms', 'Whole-house fan works well -- pulls from all rooms at once'], note: 'Compartmentalized homes need deliberate window strategy -- south in, north out, one room at a time.' },
    summer: { works: false, methods: ['Natural ventilation rarely effective -- use AC', 'Keep interior doors open to allow AC circulation', 'Ceiling fans in each room reduce perceived temp 4F', 'Night flush only on rare sub-75F nights'], note: 'DFW summer heat overwhelms compartmentalized homes quickly -- limited cross-ventilation makes it worse.' },
    fall: { works: true, methods: ['Open each room independently for cross-ventilation', 'Whole-house fan is especially valuable -- bypasses room barriers', 'DFW October-November: run fan 2-3 hours after sunset', 'Interior doors open maximizes whole-house fan effectiveness'], note: 'Whole-house fan solves the compartmentalization problem in fall shoulder season.' },
    winter: { works: false, methods: ['Seal all windows -- compartmentalized homes lose heat faster', 'Weatherstrip interior doors to reduce drafts', 'ERV provides fresh air without heat loss', 'Open briefly on 65F+ days for fresh air only'], note: 'Compartmentalized layout retains heat well when sealed -- use that to your advantage in winter.' },
  },
  narrow: {
    spring: { works: true, methods: ['Long axis oriented east-west? Open south wall windows', 'Long axis north-south? Each room gets south breeze directly', 'Whole-house fan at narrow end creates strong stack effect', 'DFW south breeze travels length of narrow home efficiently'], note: 'Narrow homes often excel at cross-ventilation -- the width is short enough for breeze to penetrate fully.' },
    summer: { works: false, methods: ['Morning ventilation only (before 8am) if temps allow', 'Long narrow layout heats quickly -- seal early', 'Run AC and ceiling fans -- do not fight DFW summer', 'Consider exterior shading on long south wall'], note: 'Narrow homes heat up fast in DFW summer -- small volume, large surface area. AC is essential.' },
    fall: { works: true, methods: ['Best natural ventilation season for narrow homes', 'DFW south breeze + narrow layout = excellent cross-ventilation', 'Whole-house fan at one end creates powerful draw', 'Run ventilation 8pm-6am, close up by mid-morning'], note: 'Fall is ideal -- narrow homes flush heat efficiently with whole-house fan in DFW October breeze.' },
    winter: { works: false, methods: ['Insulate narrow walls thoroughly -- high surface-to-volume ratio loses heat fast', 'Seal narrow ends where prevailing wind hits', 'Whole-house fan off-season -- seal the shutter', 'ERV or HRV for fresh air without heat loss'], note: 'Narrow homes lose heat faster than wide homes in winter -- prioritize air sealing on end walls.' },
  },
  twostory: {
    spring: { works: true, methods: ['Stack effect: open lower windows, let warm air exit upper floor', 'DFW south breeze enters ground floor, exits upper floor vents', 'Whole-house fan at upper level is highly effective', 'Night cooling: ground floor stays 5-8F cooler than upper floor naturally'], note: 'Two-story homes have natural stack effect -- warm air rises to second floor and exits. Use it in spring.' },
    summer: { works: false, methods: ['Upper floor will be 10-15F hotter than lower -- AC required', 'Seal upper floor tight and cool it harder', 'Ceiling fans essential on upper floor', 'Never rely on natural ventilation for upper floor June-September'], note: 'DFW summer makes upper floors brutal without AC -- 100F+ outside temp means 120F+ attic radiating heat down.' },
    fall: { works: true, methods: ['Open lower windows in evening, upper windows after sunset', 'Whole-house fan in upper ceiling or gable is prime for DFW fall', 'Stack effect + DFW south breeze = free cooling for 6-8 hours overnight', 'Close upper floor windows by 9am to trap cool air'], note: 'Two-story homes with whole-house fans perform excellently in DFW October-November shoulder season.' },
    winter: { works: false, methods: ['Stack effect works against you -- warm air escapes upper floor', 'Seal upper floor ceiling penetrations and stair openings', 'Zone heating: heat lower floor, let upper floor coast', 'Stairwell is a major heat loss point -- consider curtain or door'], note: 'Winter stack effect causes heat loss -- warm air rises and escapes. Air seal ceiling plane between floors.' },
  },
};

export default function DFWWindCatcherGuide() {
  const [layout, setLayout] = useState('open');
  const [season, setSeason] = useState('spring');
  const data = ventData[layout][season];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Natural Ventilation Guide for DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW has prevailing southerly breezes you can capture for free cooling -- but only during shoulder seasons. Know when to open up and when to seal tight.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🏗️ Home Layout</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {layouts.map(opt => (
              <button key={opt.value} onClick={() => setLayout(opt.value)} style={{
                background: layout === opt.value ? '#F5E642' : '#1E3A5F',
                color: layout === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📅 DFW Season</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {seasons.map(opt => (
              <button key={opt.value} onClick={() => setSeason(opt.value)} style={{
                background: season === opt.value ? '#F5E642' : '#1E3A5F',
                color: season === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: data.works ? '#0F2040' : '#1A0A0A', borderRadius: 12, padding: '1.5rem', border: , marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{data.works ? '✅' : '🚫'}</span>
            <div>
              <div style={{ fontWeight: 700, color: data.works ? '#6EE7B7' : '#FCA5A5', fontSize: '1rem' }}>{data.works ? 'Natural Ventilation Works This Season' : 'Natural Ventilation Limited This Season'}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '0.2rem' }}>{data.note}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.methods.map((m, i) => (
              <div key={i} style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', fontSize: '0.9rem', color: '#E2E8F0' }}>💨 {m}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>🌬️ DFW Whole-House Fan Rule</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>A whole-house fan is the highest-ROI ventilation upgrade for DFW. It flushes 4,000-6,000 CFM through your home in minutes, dropping indoor temp by 10F overnight during spring and fall shoulder seasons. Cost: -,500 installed. Payback: 2-3 years.</div>
        </div>
      </div>
    </div>
  );
}
