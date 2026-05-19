import { useState } from 'react';

const DAMAGE_TYPES = ['Kitchen/cooking fire smoke', 'Electrical fire (wall/wiring)', 'Wildland smoke (outdoor event)', 'Candle/small fire smoke', 'HVAC smoke distribution (whole house)', 'Garage fire smoke'];
const EXTENTS = ['Single room — visible soot', 'Multiple rooms — odor only', 'Whole house — visible soot + heavy odor', 'Structural damage visible', 'HVAC system affected'];

const guide: Record<string, { assessment: string; diy: string; professional: string; whoFirst: string; cost: string; dfwNote: string }> = {
  'Kitchen/cooking fire smoke': {
    assessment: 'Check ceiling, cabinets, and HVAC return vents for soot. Test smoke odor in adjacent rooms — smoke travels through HVAC fast in DFW\’s continuously running systems.',
    diy: 'Wipe soot with dry chemical sponge (never wet first). Clean hard surfaces with TSP substitute. Replace HVAC filters immediately. Run air purifier with HEPA + activated carbon.',
    professional: 'If HVAC ducts show soot or odor persists after 48 hours of ventilation — call certified smoke remediation. Ozone treatment needed for protein smoke from cooking fires.',
    whoFirst: '1. HVAC company to inspect and clean ductwork 2. Smoke remediation specialist for ozone treatment 3. General contractor for any structural damage',
    cost: '$500–$3,500 for kitchen smoke remediation in DFW',
    dfwNote: 'DFW heat causes smoke odor compounds to off-gas continuously in summer. Do not wait — treat within 72 hours.'
  },
  'Electrical fire (wall/wiring)': {
    assessment: 'Do NOT re-enter until fire marshal clears the structure. Electrical smoke contains toxic copper compounds. HVAC must be shut off to prevent whole-house distribution.',
    diy: 'Zero DIY for electrical fire smoke — chemical composition is hazardous. Air out with all windows and HVAC off before assessing.',
    professional: 'Certified electrician must inspect wiring before any remediation. Licensed smoke remediation company required. DFW has many IICRC-certified firms (call 3–4 for quotes).',
    whoFirst: '1. Electrician FIRST — ensure no re-ignition risk 2. IICRC-certified smoke remediation company 3. Insurance adjuster — document everything before cleanup',
    cost: '$3,000–$25,000+ depending on extent. DFW average electrical fire remediation: $8,500',
    dfwNote: 'Call your DFW homeowner insurance immediately. Most policies cover smoke damage. Do not clean before adjuster documents damage.'
  },
  'Wildland smoke (outdoor event)': {
    assessment: 'Wildland smoke penetrates through weatherstripping and HVAC systems. Check HVAC filter first — black filter confirms smoke penetration. Test indoor air quality with $30 air quality monitor.',
    diy: 'Replace HVAC filters (MERV 13+ recommended). Run air purifiers. Wipe hard surfaces. Wash soft furnishings. Most wildland smoke in DFW clears within days with ventilation.',
    professional: 'Professional treatment rarely needed for outdoor smoke events unless exposure was prolonged (3+ days). Ozone treatment available from DFW restoration companies if odor persists.',
    whoFirst: '1. HVAC filter replacement immediately 2. Air purifier rental from DFW home improvement stores 3. Smoke remediation only if odor persists 2+ weeks',
    cost: '$150–$800 DIY. Professional ozone treatment: $400–$1,200',
    dfwNote: 'DFW wildfires (Post Oak Savanna, Cross Timbers) can produce multi-day smoke events. MERV 13 filters are your best defense.'
  },
  'Candle/small fire smoke': {
    assessment: 'Usually confined to one room. Check ceiling and upper walls for soot. Candle smoke is primarily carbon black — easier to remediate than protein smoke.',
    diy: 'Ventilate immediately. Dry chemical sponge on walls before any wet cleaning. Repaint with odor-blocking primer (Kilz) if soot is embedded. Replace HVAC filter.',
    professional: 'Professional rarely needed unless HVAC distributed odor or ceiling has heavy soot. Check if drywall needs spot-priming.',
    whoFirst: '1. DIY cleanup first 2. Painter for primer/repaint if needed 3. Remediation only if odor persists after repainting',
    cost: '$50–$400 DIY. Professional spot remediation: $300–$1,500',
    dfwNote: 'Candle fires are the most common DFW residential smoke call. Usually very manageable with prompt action.'
  },
  'HVAC smoke distribution (whole house)': {
    assessment: 'Smoke in HVAC ducts is the most complex DFW scenario — smoke coats every surface of every duct run. Whole-house odor after any fire is a strong indicator.',
    diy: 'Replace all filters. Change air purifier pre-filters. Surface wipe-down. But duct cleaning and treatment requires professionals.',
    professional: 'IICRC-certified duct cleaning + ozone treatment required. DFW has several firms specializing in this. Ozone machines placed at HVAC air handler for whole-house treatment.',
    whoFirst: '1. HVAC company for duct inspection and cleaning 2. Ozone treatment specialists 3. Surface remediation team for visible soot',
    cost: '$2,500–$12,000 for full HVAC smoke remediation in DFW homes',
    dfwNote: 'DFW homes run HVAC 10+ months per year — any smoke reaching the air handler distributes throughout the home within hours.'
  },
  'Garage fire smoke': {
    assessment: 'Garage-to-house smoke migration through door gaps and shared wall penetrations is common. Check laundry room wall (shared garage wall) and HVAC if located in garage.',
    diy: 'Seal garage door weatherstripping. Treat visible soot on garage walls with TSP solution. If smoke entered living space, treat those areas per extent of penetration.',
    professional: 'If HVAC unit is in garage and shows smoke contamination — mandatory professional cleaning. If structural damage to shared wall — contractor + remediation team.',
    whoFirst: '1. Assess HVAC contamination first 2. Smoke remediation for living areas if affected 3. Contractor for any structural garage damage',
    cost: '$800–$6,000 depending on migration into living space',
    dfwNote: 'Many DFW homes have HVAC in garage. If your air handler was running during the garage fire, assume duct contamination.'
  },
};

export default function DFWSmokeDamageGuide() {
  const [damageType, setDamageType] = useState('');
  const [extent, setExtent] = useState('');
  const [result, setResult] = useState<null | typeof guide['Kitchen/cooking fire smoke']>(null);

  function handleAnalyze() {
    if (!damageType) return;
    setResult(guide[damageType]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>🔥 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Smoke Damage Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: 1.6 }}>
          After any fire event in a DFW home, smoke damage assessment must happen within 72 hours. DFW heat accelerates odor compound off-gassing.
          Know what you can handle yourself — and when to call certified remediation.
        </p>
        <div style={{ background: '#1a0808', border: '1px solid #7f1d1d', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <span style={{ color: '#fca5a5', fontWeight: 700 }}>⚠️ Safety First: </span>
          <span style={{ color: '#fca5a5', fontSize: '0.9rem' }}>For electrical fires or structural damage — do not re-enter until cleared by fire marshal. Call 214-670-4357 (Dallas Fire) or 817-392-6800 (Fort Worth Fire) for clearance.</span>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🔥 Smoke Damage Type', value: damageType, setter: setDamageType, options: DAMAGE_TYPES },
            { label: '📏 Extent of Damage', value: extent, setter: setExtent, options: EXTENTS },
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

        <button onClick={handleAnalyze} disabled={!damageType}
          style={{ background: damageType ? '#F5E642' : '#1e3a5f', color: damageType ? '#0A1628' : '#475569',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: damageType ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Get Assessment Guide →
        </button>

        {result && (
          <div style={{ background: '#111c30', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', display: 'grid', gap: '1rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>📋 Smoke Damage Assessment</div>
            {[
              { label: '🔍 ASSESSMENT STEPS', value: result.assessment },
              { label: '🧹 WHAT YOU CAN DIY', value: result.diy },
              { label: '👷 WHAT NEEDS PROFESSIONAL', value: result.professional },
              { label: '📞 WHO TO CALL FIRST', value: result.whoFirst },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>{value}</div>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>💰 DFW COST RANGE</div>
                <div style={{ fontWeight: 700, color: '#F5E642' }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>🌡️ DFW-SPECIFIC NOTE</div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{result.dfwNote}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
