import { useState } from 'react';

const applications = ['Driveway', 'Patio', 'Pool Deck', 'Sidewalk', 'Garage Floor', 'Entryway'];
const seasons = ['Summer (Jun-Sep)', 'Spring/Fall (Mar-May, Oct-Nov)', 'Winter (Dec-Feb)'];

const data: Record<string, Record<string, { finish: string; timing: string; avoid: string; heatTip: string; slip: string }>> = {
  'Driveway': {
    'Summer (Jun-Sep)': { finish: 'Broom Finish (Medium Texture)', timing: 'Begin floating 20-25 min after pour. Broom immediately after float — surface skins fast', avoid: 'Trowel finish — too slick when wet, impossible timing in DFW heat', heatTip: 'Work in sections max 10 ft. Keep hose nearby to mist surface (not water it down)', slip: '⭐⭐⭐⭐ Traction' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Broom Finish (Medium Texture)', timing: 'Begin floating 35-45 min after pour. Broom while surface is still green', avoid: 'Skipping curing compound — surface will dust without it', heatTip: 'Ideal DFW window — start early morning to finish before afternoon heat', slip: '⭐⭐⭐⭐ Traction' },
    'Winter (Dec-Feb)': { finish: 'Broom or Exposed Aggregate', timing: 'Float 45-60 min after pour. Slower set gives more working time', avoid: 'Finishing if temp drops below 40°F — protect with blankets overnight', heatTip: 'Warm water helps in DFW cold snaps — do not use hot water', slip: '⭐⭐⭐⭐⭐ Traction' },
  },
  'Patio': {
    'Summer (Jun-Sep)': { finish: 'Exposed Aggregate or Stamped', timing: 'Expose aggregate or stamp within 25-35 min — DFW heat accelerates set dramatically', avoid: 'Smooth trowel — radiates heat and becomes blinding in DFW sun', heatTip: 'Erect shade canopy over pour area. Schedule pour at 6-7am', slip: '⭐⭐⭐⭐ Traction' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Stamped Concrete', timing: 'Stamp 40-60 min after pour — ideal DFW window for detailed work', avoid: 'Working alone — stamping requires team in any DFW weather', heatTip: 'Perfect DFW season for decorative finishes — lower risk of premature hardening', slip: '⭐⭐⭐ Moderate' },
    'Winter (Dec-Feb)': { finish: 'Broom or Light Trowel', timing: 'Float 50-70 min after pour. Finish before temps drop in evening', avoid: 'Stamping in below-40°F temps — color hardener won\’t cure properly', heatTip: 'Warm sub-base before pouring on cold DFW days', slip: '⭐⭐⭐⭐ Traction' },
  },
  'Pool Deck': {
    'Summer (Jun-Sep)': { finish: 'Kool Deck / Broom (Fine Texture)', timing: 'Apply Kool Deck overlay 24-48 hrs after base. Base broom within 25 min', avoid: 'Dark stamped concrete — absorbs DFW heat, burns bare feet at 140°F+', heatTip: 'Kool Deck or cool-tone exposed aggregate mandatory for DFW pool decks', slip: '⭐⭐⭐⭐⭐ Maximum' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Exposed Aggregate or Kool Deck', timing: 'Expose aggregate 35-50 min after pour using surface retarder', avoid: 'Smooth trowel near pool — lethal slip hazard when wet', heatTip: 'Best DFW window for pool deck work — temps allow longer working time', slip: '⭐⭐⭐⭐⭐ Maximum' },
    'Winter (Dec-Feb)': { finish: 'Broom Finish (Fine)', timing: 'Float 45-65 min after pour. Light broom pass for texture', avoid: 'Pouring if freeze expected within 48 hrs of pour', heatTip: 'Cover with insulating blankets overnight for first 3 DFW winter nights', slip: '⭐⭐⭐⭐⭐ Maximum' },
  },
  'Sidewalk': {
    'Summer (Jun-Sep)': { finish: 'Medium Broom Finish', timing: 'Begin edges 15-20 min after pour. Broom 25-30 min — works quickly', avoid: 'Overworking surface — brings water up and weakens top layer', heatTip: 'Dampen sub-base and forms before pouring in DFW summer', slip: '⭐⭐⭐⭐ Traction' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Medium Broom Finish', timing: 'Begin edges 25-35 min. Broom 35-45 min after pour', avoid: 'Skipping expansion joints — DFW temp swings will crack unsjointed sidewalks', heatTip: 'Ideal conditions — standard DFW sidewalk timing applies', slip: '⭐⭐⭐⭐ Traction' },
    'Winter (Dec-Feb)': { finish: 'Coarse Broom Finish', timing: 'Begin edges 35-45 min. Broom 50-60 min after pour', avoid: 'Watering to slow set — dilutes mix and weakens slab', heatTip: 'Coarser broom provides traction on DFW icy sidewalks', slip: '⭐⭐⭐⭐⭐ Maximum' },
  },
  'Garage Floor': {
    'Summer (Jun-Sep)': { finish: 'Power Trowel (Smooth)', timing: 'First trowel pass 30-40 min. Final burnish 60-80 min — tight window in DFW heat', avoid: 'Working alone — power trowel requires experience and speed', heatTip: 'Keep garage doors closed to slow surface dry. Mist air (not slab)', slip: '⭐⭐ Smooth — seal after for protection' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Power Trowel with Light Broom', timing: 'First trowel 40-55 min. Final pass 80-100 min after pour', avoid: 'Skipping epoxy seal — DFW garage floors deteriorate without it', heatTip: 'Best DFW window for a quality garage floor — ample working time', slip: '⭐⭐⭐ Moderate with sealer' },
    'Winter (Dec-Feb)': { finish: 'Hand Trowel or Light Broom', timing: 'First trowel 50-70 min. Final 100-120 min after pour', avoid: 'Applying epoxy within 30 days of pour in DFW winter — concrete off-gases', heatTip: 'Heat garage to 50°F+ during pour and cure period', slip: '⭐⭐⭐ Moderate' },
  },
  'Entryway': {
    'Summer (Jun-Sep)': { finish: 'Exposed Aggregate or Stamp', timing: 'Stamp or expose 25-35 min — DFW heat is unforgiving on decorative work', avoid: 'Smooth trowel — slick when DFW storms hit', heatTip: 'Schedule at sunrise. Have team ready before mixing', slip: '⭐⭐⭐⭐ Traction' },
    'Spring/Fall (Mar-May, Oct-Nov)': { finish: 'Stamped with Antiquing Release', timing: 'Stamp 45-65 min after pour — ideal decorative window', avoid: 'Skipping sealer — DFW rain and traffic destroy unsealed stamped concrete', heatTip: 'Perfect DFW conditions for premium finishes and color work', slip: '⭐⭐⭐ Moderate with texture' },
    'Winter (Dec-Feb)': { finish: 'Broom Finish', timing: 'Float 50-70 min. Broom 65-85 min after pour', avoid: 'Stamping when color hardener won\’t cure in cold DFW temps', heatTip: 'Protect with blankets 48 hrs — DFW nights drop fast in winter', slip: '⭐⭐⭐⭐ Traction' },
  },
};

export default function DFWConcreteFinishingGuide() {
  const [app, setApp] = useState('');
  const [season, setSeason] = useState('');
  const result = app && season ? data[app]?.[season] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🪣</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Concrete Finishing Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            At 105°F, concrete surface temperature can hit 140°F — your working window shrinks from 60 min to under 25 min. Finishing too late in DFW summer means torn, rough surfaces. The right finish chosen at the right time is the difference between a showroom slab and a redo.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Application</label>
            <select value={app} onChange={e => setApp(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select application...</option>
              {applications.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>DFW Season</label>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select season...</option>
              {seasons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Finishing Recommendation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Finish Type</div>
                <div style={{ color: '#F5E642', fontWeight: 'bold' }}>{result.finish}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Slip Rating</div>
                <div style={{ color: '#fff' }}>{result.slip}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏱️ DFW Timing</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.timing}</div>
            </div>
            <div style={{ backgroundColor: '#7f1d1d', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>🚫 Avoid in DFW</div>
              <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.avoid}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🌡️ DFW Heat Tip</div>
              <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.heatTip}</div>
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🌡️ DFW Temperature Impact on Working Time</h3>
          {[['70°F', '60-90 min', 'Ideal — full working window'], ['85°F', '40-55 min', 'Warm — plan your crew count'], ['95°F', '25-35 min', 'Hot — pour in sections'], ['105°F+', '15-25 min', 'Extreme — pro crew only, pre-wet everything']].map(([temp, time, note]) => (
            <div key={temp} style={{ display: 'grid', gridTemplateColumns: '70px 100px 1fr', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #334155' }}>
              <span style={{ color: '#F5E642', fontWeight: 'bold' }}>{temp}</span>
              <span style={{ color: '#fff' }}>{time}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
