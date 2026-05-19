import { useState } from 'react';

const locations = ['Exterior Window Frame (Outside)', 'Interior Window Frame (Inside)', 'Window-to-Siding Joint', 'Bathroom Window', 'Sound Reduction Priority'];
const conditions = ['Full DFW Sun / South or West Facing', 'Shaded / North Facing', 'High Humidity Area', 'New Window Installation', 'Recaulking Existing Window'];

type Result = { caulkType: string; product: string; tips: string; redoFrequency: string };
type ResultMap = Record<string, Record<string, Result>>;

const results: ResultMap = {
  'Exterior Window Frame (Outside)': {
    'Full DFW Sun / South or West Facing': { caulkType: '100% Silicone', product: 'Clear or color-matched 100% silicone (GE Supreme, Gorilla All-Conditions)', tips: 'Silicone handles DFW\’s extreme thermal expansion on south/west facades. Apply between 50–90°F. Tool within 5 minutes. Do not paint over silicone.', redoFrequency: 'Every 7–12 years (silicone outlasts latex 3:1 in DFW heat)' },
    'Shaded / North Facing': { caulkType: '100% Silicone or Siliconized Latex', product: 'Paintable siliconized latex is acceptable for shaded north-facing windows', tips: 'Lower UV exposure means latex-silicone blends perform adequately. Still prefer pure silicone for best longevity on DFW exteriors.', redoFrequency: 'Every 5–8 years' },
    'High Humidity Area': { caulkType: '100% Silicone (mold-resistant formula)', product: 'DAP Kwik Seal Plus or GE Sealants Kitchen & Bath silicone', tips: 'Mold-resistant silicone prevents black streaking on DFW exteriors near sprinkler zones or downspouts.', redoFrequency: 'Every 7–10 years' },
    'New Window Installation': { caulkType: '100% Silicone', product: 'Apply between window flange and house wrap / sheathing', tips: 'Caulk after flashing tape is installed. Do not rely on caulk alone for window-to-rough-opening sealing — flash first, then caulk exterior trim.', redoFrequency: 'Inspect at 5 years; redo at first sign of separation' },
    'Recaulking Existing Window': { caulkType: '100% Silicone', product: 'Remove all old caulk first — do not caulk over old caulk in DFW', tips: 'Old latex caulk must be removed with a 5-in-1 or caulk remover tool. DFW thermal cycling opens gaps under old caulk that traps moisture.', redoFrequency: 'After removal, new silicone lasts 7–12 years' },
  },
  'Interior Window Frame (Inside)': {
    'Full DFW Sun / South or West Facing': { caulkType: 'Paintable Latex Caulk', product: 'DAP Alex Plus or GE Paintable Latex', tips: 'Interior applications see far less thermal stress. Paintable latex is easy to apply and finish. Interior silicone is overkill and harder to paint.', redoFrequency: 'Every 5–8 years or when paint peels' },
    'Shaded / North Facing': { caulkType: 'Paintable Latex Caulk', product: 'Any quality paintable latex; match to interior paint color', tips: 'Standard interior latex caulk works well for all interior DFW window trim. Sand and prime trim before painting over caulk.', redoFrequency: 'Every 5–8 years' },
    'High Humidity Area': { caulkType: 'Mold-Resistant Paintable Latex or Silicone', product: 'GE Advanced Silicone for bathroom windows', tips: 'For windows in bathrooms or laundry rooms, use silicone or mold-resistant formula even on interior to prevent black mold growth.', redoFrequency: 'Every 4–6 years in high-humidity interior spaces' },
    'New Window Installation': { caulkType: 'Paintable Latex Caulk', product: 'Apply between window casing and drywall / wall surface', tips: 'Fill gap between trim and wall, tool smooth, prime before painting. Interior latex is fine — save silicone for the exterior.', redoFrequency: 'Inspect at 3 years; touch up as needed' },
    'Recaulking Existing Window': { caulkType: 'Paintable Latex Caulk', product: 'Remove cracked or separated caulk before applying fresh bead', tips: 'DFW interior temperature fluctuations cause latex to crack at trim joints over time. Re-caulking is a simple DIY repair.', redoFrequency: 'Touch up every 3–5 years; full redo every 7–10′ },
  },
  'Window-to-Siding Joint': {
    'Full DFW Sun / South or West Facing': { caulkType: '100% Silicone or Polyurethane', product: 'Quad Max or 100% silicone — polyurethane bonds well to masonry/brick', tips: 'Window-to-brick or window-to-stucco joints in DFW move significantly from thermal expansion. Polyurethane stays flexible better than latex on masonry.', redoFrequency: 'Every 5–8 years; inspect annually on south/west facades' },
    'Shaded / North Facing': { caulkType: 'Siliconized Latex or 100% Silicone', product: 'Lower thermal stress allows siliconized latex on shaded siding joints', tips: 'Still clean joint thoroughly before applying. Mask siding and window frame for clean bead lines.', redoFrequency: 'Every 6–10 years' },
    'High Humidity Area': { caulkType: '100% Silicone', product: 'Use silicone at any joint where water concentrates', tips: 'Window-to-siding joints at covered patios or near sprinkler heads need silicone — latex wicks moisture and fails faster.', redoFrequency: 'Every 5–8 years' },
    'New Window Installation': { caulkType: '100% Silicone', product: 'Seal between window casing and siding immediately after installation', tips: 'New construction DFW windows need exterior caulk before first rain season. Do not leave joint open.', redoFrequency: 'Inspect at 3 years; redo at first crack' },
    'Recaulking Existing Window': { caulkType: '100% Silicone or Polyurethane', product: 'Tool away all old caulk; clean surface with rubbing alcohol before applying', tips: 'DFW homes commonly lose caulk at siding joints after 5–7 years from thermal cycling. Check annually before storm season.', redoFrequency: 'After removal, new product lasts 5–8 years' },
  },
  'Bathroom Window': {
    'Full DFW Sun / South or West Facing': { caulkType: '100% Silicone (interior + exterior)', product: 'Use mold-resistant silicone inside; standard silicone outside', tips: 'Bathroom windows in DFW need silicone both inside and outside. Interior moisture + exterior heat make this the highest-demand window type.', redoFrequency: 'Exterior: every 7–10 years. Interior: every 5–7 years.' },
    'Shaded / North Facing': { caulkType: 'Mold-Resistant Silicone (interior)', product: 'GE Advanced or DAP Kitchen & Bath silicone for interior bathroom windows', tips: 'Even shaded bathroom windows need mold-resistant silicone inside due to shower moisture. Exterior can use siliconized latex.', redoFrequency: 'Interior every 5–7 years; exterior every 6–10 years' },
    'High Humidity Area': { caulkType: '100% Mold-Resistant Silicone', product: 'Apply to all joints — window to tile, window to drywall, window to trim', tips: 'DFW bathrooms without proper exhaust fans accumulate moisture rapidly. Silicone is mandatory for all surfaces near showers.', redoFrequency: 'Every 4–6 years; inspect annually for black mold spots' },
    'New Window Installation': { caulkType: 'Silicone (mold-resistant) for interior; 100% silicone for exterior', product: 'Two-product approach for new bathroom windows in DFW', tips: 'Spec mold-resistant interior caulk in the window contract. Many builders use standard latex — specify silicone upgrade.', redoFrequency: 'Inspect at 3 years; redo interior at first mold sign' },
    'Recaulking Existing Window': { caulkType: 'Mold-Resistant Silicone', product: 'Remove all old caulk and clean with mildew remover before new application', tips: 'Do not caulk over mold — clean with bleach solution first. DFW bath windows with black mold at caulk lines need full removal.', redoFrequency: 'After proper remediation, new silicone lasts 5–7 years' },
  },
  'Sound Reduction Priority': {
    'Full DFW Sun / South or West Facing': { caulkType: 'Acoustic Caulk (non-hardening) + Exterior Silicone', product: 'OSI QUAD or Tremco Acoustical Sealant for interior; silicone for exterior', tips: 'Two-layer approach: acoustic caulk seals interior gaps for sound, silicone handles exterior weathering. Acoustic caulk stays permanently flexible.', redoFrequency: 'Acoustic caulk: 10–15 years. Exterior silicone: 7–12 years.' },
    'Shaded / North Facing': { caulkType: 'Acoustic Caulk (interior) + Siliconized Latex (exterior)', product: 'OSI QUAD for interior sound sealing', tips: 'Acoustic caulk dramatically reduces traffic and HVAC noise transmission. Apply inside window rough opening gap and at trim-to-drywall joint.', redoFrequency: 'Acoustic caulk: 10–15 years. Exterior: 6–10 years.' },
    'High Humidity Area': { caulkType: 'Acoustic Caulk + Mold-Resistant Silicone', product: 'Use acoustic at interior rough opening; silicone at wet areas', tips: 'In humid DFW rooms, do not use acoustic caulk at surface joints near moisture — it can support mold. Reserve for concealed rough opening gaps.', redoFrequency: '10–15 years for acoustic in concealed locations' },
    'New Window Installation': { caulkType: 'Acoustic Caulk in Rough Opening Gap', product: 'Fill between rough opening framing and window frame before installing interior trim', tips: 'Best time to install acoustic caulk is during new window install before trim goes up. Fill the full perimeter of the rough opening.', redoFrequency: 'Should last the life of the window — concealed location' },
    'Recaulking Existing Window': { caulkType: 'Acoustic Caulk at Interior Trim Joint', product: 'Where trim meets drywall — most accessible acoustic seal location', tips: 'Remove old caulk at trim-to-drywall joint and apply acoustic sealant. This reduces flanking noise without major work.', redoFrequency: 'Every 8–12 years' },
  },
};

export default function DFWWindowCaulkTypes() {
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');

  const result = location && condition ? results[location]?.[condition] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🪟 DFW Window Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Window Caulk Types for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          DFW windows face extreme thermal cycling — hot summers, sudden cold snaps, and high UV. The wrong caulk fails within 2–3 years. Silicone dominates exterior applications; paintable latex works for interior trim; acoustic caulk adds sound control. Get the right caulk for your specific location and DFW conditions.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Caulk Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Caulking Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select location...</option>
                {locations.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>DFW Conditions</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select condition...</option>
                {conditions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Recommended Caulk</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{result.caulkType}</div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>📦 {result.product}</div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px', marginBottom: '10px' }}>{result.tips}</p>
            <div style={{ fontSize: '13px', color: '#F5E642′ }}>🔄 Redo frequency: {result.redoFrequency}</div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '☀️', title: 'Why DFW Heat Destroys Latex Caulk', body: 'Exterior latex caulk exposed to DFW summer heat becomes brittle and cracks within 2–3 years on south or west-facing facades. Silicone maintains elasticity through DFW\’s full temperature range of 20°F–110°F.' },
            { icon: '🖌️', title: 'Silicone Cannot Be Painted', body: 'Pure silicone is not paintable. Use it on exterior joints where appearance is secondary. For painted interior trim, use paintable latex or siliconized latex. Painting over silicone causes paint peeling.' },
            { icon: '📅', title: 'DFW Annual Caulk Inspection', body: 'Check all window caulk joints each spring before storm season. Look for cracks, gaps, or separation from the frame. Catching failures early prevents water intrusion that leads to framing rot.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111E35', borderRadius: '10px', padding: '20px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{card.icon}</div>
              <div style={{ fontWeight: '600', marginBottom: '6px' }}>{card.title}</div>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
