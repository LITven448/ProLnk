import { useState } from 'react';

const LOCATIONS = ['Living room / Great room', 'Master bedroom', 'Kitchen / Breakfast nook', 'Home office', 'Bathroom', 'Hallway / Corridor'];
const EXPOSURES = ['South roof (maximum heat gain)', 'West roof (brutal afternoon)', 'East roof (morning light)', 'North roof (minimal sun)', 'Flat roof'];
const GLAZING = ['Single pane (old)', 'Dual pane standard', 'Dual pane Low-E', 'Triple pane', 'Not sure'];

const recs: Record<string, { type: string; glazing: string; heatMitigation: string; cost: string; veluxNote: string }> = {
  'South roof (maximum heat gain)': {
    type: 'VELUX Solar-Powered FCM (fixed) + VSS (solar venting)',
    glazing: 'Triple-pane Low-E with argon fill — non-negotiable for south-facing DFW skylights',
    heatMitigation: 'Add VELUX solar-powered blackout blind. Closes blind during peak 2–6pm DFW heat window automatically.',
    cost: '$2,800–$6,500 installed depending on size',
    veluxNote: 'VELUX solar venting models auto-close when DFW rain sensor triggers — critical for pop-up summer storms.'
  },
  'West roof (brutal afternoon)': {
    type: 'VELUX VSS Solar Venting Skylight — venting releases trapped heat before it enters living space',
    glazing: 'Dual-pane Low-E at minimum. Triple-pane preferred for west-facing.',
    heatMitigation: 'Solar shade blind + consider solar tube (Solatube) as alternative — captures morning light, diffuses afternoon heat.',
    cost: '$2,200–$5,800 installed',
    veluxNote: 'West-facing skylights in DFW can add 3–5° to room temp without proper glazing. Do not skip Low-E.'
  },
  'East roof (morning light)': {
    type: 'VELUX FCM Fixed or VSS Venting — east-facing is the best DFW skylight orientation',
    glazing: 'Dual-pane Low-E sufficient for east exposure. Less heat gain risk.',
    heatMitigation: 'Standard shade blind optional. East skylights in DFW are the most energy-neutral option.',
    cost: '$1,800–$4,500 installed',
    veluxNote: 'East-facing is DFW\’s sweet spot — beautiful morning light, minimal afternoon heat load.'
  },
  'North roof (minimal sun)': {
    type: 'Any VELUX model — north skylights in DFW are virtually heat-neutral',
    glazing: 'Standard dual-pane Low-E. No triple-pane needed for north.',
    heatMitigation: 'Minimal intervention needed. Focus budget on quality flashing to prevent DFW storm leaks.',
    cost: '$1,600–$4,000 installed',
    veluxNote: 'North DFW skylights primarily gather diffuse light. Watch flashing quality — DFW wind-driven rain is severe.'
  },
  'Flat roof': {
    type: 'VELUX Flat Roof Skylight (CVP / CFP series) — designed specifically for low-slope applications',
    glazing: 'Dual-pane Low-E with condensation drainage. Flat roof models have built-in drainage channels.',
    heatMitigation: 'Solar-powered shade blind. Flat roofs in DFW accumulate heat — venting model strongly recommended.',
    cost: '$3,200–$7,500 installed (flat requires more complex flashing)',
    veluxNote: 'Flat roof skylights in DFW need annual inspection — debris and standing water compromise seals faster.'
  },
};

export default function DFWSkylightGuide() {
  const [location, setLocation] = useState('');
  const [exposure, setExposure] = useState('');
  const [glazing, setGlazing] = useState('');
  const [result, setResult] = useState<null | typeof recs['South roof (maximum heat gain)']>(null);

  function handleAnalyze() {
    if (!exposure) return;
    setResult(recs[exposure]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>🌤️ DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Skylight Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.6 }}>
          DFW skylights bring incredible natural light — but also enormous heat gain. A south-facing skylight without proper Low-E glazing can
          add 400+ BTUs per hour to your cooling load. Get it right the first time.
        </p>
        <div style={{ background: '#111c30', borderRadius: 8, padding: '1rem', marginBottom: '2rem', borderLeft: '3px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>VELUX Solar Rain Sensor: </span>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW summer storms pop up in minutes. VELUX solar-powered venting skylights auto-close when rain is detected — no electrical wiring needed.</span>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🏠 Skylight Location in Home', value: location, setter: setLocation, options: LOCATIONS },
            { label: '☀️ Roof Exposure / Orientation', value: exposure, setter: setExposure, options: EXPOSURES },
            { label: '🪟 Current Glazing (if existing)', value: glazing, setter: setGlazing, options: GLAZING },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {options.map(o => (
                  <button key={o} onClick={() => setter(o)}
                    style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: '1.5px solid', cursor: 'pointer', fontSize: '0.85rem',
                      borderColor: value === o ? '#F5E642' : '#1e3a5f', background: value === o ? '#F5E642' : '#111c30',
                      color: value === o ? '#0A1628' : '#cbd5e1', fontWeight: value === o ? 700 : 400 }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleAnalyze} disabled={!exposure}
          style={{ background: exposure ? '#F5E642' : '#1e3a5f', color: exposure ? '#0A1628' : '#475569',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: exposure ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Get Skylight Recommendation →
        </button>

        {result && (
          <div style={{ background: '#111c30', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', display: 'grid', gap: '1rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>✅ DFW Skylight Recommendation</div>
            {[
              { label: 'RECOMMENDED TYPE', value: result.type },
              { label: 'GLAZING SPEC FOR DFW', value: result.glazing },
              { label: 'HEAT GAIN MITIGATION', value: result.heatMitigation },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{value}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>💰 ESTIMATED COST</div>
                <div style={{ fontWeight: 700, color: '#F5E642' }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>🌧️ VELUX RAIN NOTE</div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{result.veluxNote}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#111c30', borderRadius: 10, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>⚡ DFW Energy Code Note</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Texas energy code (IECC 2021) requires skylights to meet U-factor 0.55 and SHGC 0.25 max in climate zone 2 (most of DFW).
            VELUX Low-E models are pre-certified. Verify with your installer before permit submission.
          </div>
        </div>
      </div>
    </div>
  );
}
