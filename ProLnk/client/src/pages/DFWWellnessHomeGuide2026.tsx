import { useState } from 'react';

const plans = [
  { priority: 'air', label: 'Air Quality', steps: [
    '🌬️ HEPA filtration: IQAir HealthPro+ or Dyson HEPA — critical for DFW cedar season (Dec–Mar)',
    '🌿 Change MERV-13 air filters monthly during cedar season vs quarterly in summer',
    '💨 Whole-home ERV (energy recovery ventilator) — brings fresh air without heat exchange loss',
    '🌡️ Keep indoor humidity 40–50% — below 30% worsens allergies, above 60% grows mold',
    '🚭 No VOC paints and low-VOC flooring — DFW new builds trap off-gassing in tight envelopes',
  ]},
  { priority: 'water', label: 'Water Quality', steps: [
    '💧 Reverse osmosis under-sink filter — removes DFW hard water minerals (avg 300 ppm TDS)',
    '🚿 Whole-home carbon filter — removes chloramine that DFW Water uses instead of chlorine',
    '🔬 Annual water test — DFW ground water has naturally occurring arsenic in some areas',
    '🪣 Water softener — DFW hardness averages 15 gpg (very hard) — protects appliances',
    '🧊 Refrigerator filter replacement every 6 months — most DFW homeowners skip this',
  ]},
  { priority: 'noise', label: 'Noise Reduction', steps: [
    '🔇 Area rugs on hard tile — DFW new builds use tile throughout for durability vs heat',
    '🛋️ Upholstered furniture absorbs conversation noise — leather reflects it',
    '🌿 Dense exterior landscaping — oleander hedges cut street noise 5–8 dB',
    '🪟 Window inserts on single-pane — many DFW homes built before 2000 have single-pane',
    '🚪 Solid-core interior doors for bedrooms — essential in open floor plan DFW homes',
  ]},
  { priority: 'thermal', label: 'Thermal Comfort', steps: [
    '🌡️ Target: 74°F at 50% relative humidity — optimal for human comfort per ASHRAE',
    '❄️ Two-stage or variable speed HVAC — DFW summer demands 3,000+ hours of runtime',
    '🏠 Attic insulation R-49+ — DFW attic temps hit 160°F in summer; standard R-30 is insufficient',
    '🪟 Low-E window film on west and south glass — blocks 40% of solar heat gain',
    '💨 Whole-home dehumidifier — DFW shoulder seasons (Oct, Apr) have high humidity with mild temps',
  ]},
];

export default function DFWWellnessHomeGuide2026() {
  const [priority, setPriority] = useState('');
  const plan = plans.find(p => p.priority === priority);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🏠 DFW Wellness-Focused Home Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          DFW homeowners face a unique wellness challenge: 100°F summers push us indoors for months, cedar season triggers 40% of the population, and hard water at 15 gpg is double the national average. A well-designed DFW home is a health asset.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[{ e: '🌬️', k: 'Air Quality', v: 'HEPA + MERV-13 + ERV' },{ e: '💧', k: 'Water Quality', v: 'RO + whole-home carbon' },{ e: '🔇', k: 'Acoustics', v: 'Rugs + solid doors + hedges' },{ e: '🌡️', k: 'Thermal', v: '74°F / 50% RH target' },{ e: '☀️', k: 'Natural Light', v: 'Solar film + tubular skylights' },{ e: '🌿', k: 'Biophilic', v: 'Living walls + natural materials' }].map(i => (
            <div key={i.k} style={{ background: '#111E33', borderRadius: 12, padding: 18, border: '1px solid #1C2D4A' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{i.e}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{i.k}</div>
              <div style={{ color: '#9BA3B2', fontSize: 12, marginTop: 2 }}>{i.v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Wellness Priority</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {plans.map(p => (
              <button key={p.priority} onClick={() => setPriority(priority === p.priority ? '' : p.priority)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: priority === p.priority ? '#F5E642' : '#1C2D4A', color: priority === p.priority ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        {plan && (
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 14 }}>🏠 {plan.label} Improvement Plan</div>
            {plan.steps.map(s => (
              <div key={s} style={{ color: '#CBD1DC', fontSize: 14, marginBottom: 10 }}>{s}</div>
            ))}
          </div>
        )}
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🌡️ The DFW Comfort Standard</h2>
          <p style={{ color: '#9BA3B2', fontSize: 14, lineHeight: 1.7 }}>ASHRAE 55 defines optimal thermal comfort at 74°F and 50% relative humidity for sedentary occupants. DFW summer forces homes to maintain this artificially — every degree above 74 adds 3% to HVAC runtime and 2% to energy costs.</p>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>ProLnk Connects DFW Homeowners with Wellness Contractors</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>HVAC, water filtration, insulation, acoustic treatment — find vetted DFW pros through ProLnk.</div>
        </div>
      </div>
    </div>
  );
}