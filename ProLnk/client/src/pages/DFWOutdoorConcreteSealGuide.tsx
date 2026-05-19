import { useState } from 'react';

const applications = ['Driveway', 'Patio / Pool Deck', 'Garage Floor', 'Sidewalk / Walkway', 'Stamped / Decorative Concrete'];
const exposures = ['Full DFW Sun (South or West)', 'Shade / Covered Area', 'High Traffic', 'Near Pool or Sprinklers', 'New Concrete (Under 1 Year Old)'];

type Result = { sealerType: string; frequency: string; cost: string; notes: string };
type ResultMap = Record<string, Record<string, Result>>;

const results: ResultMap = {
  'Driveway': {
    'Full DFW Sun (South or West)': { sealerType: 'Penetrating Silane-Siloxane Sealer', frequency: 'Every 3–5 years', cost: '$0.15–$0.30/sq ft (DIY); $0.40–$0.70/sq ft (professional)', notes: 'DFW UV degrades surface sealers rapidly on driveways. Penetrating sealers absorb into the concrete and won\’t peel or cloud. No sheen change — protects from within against DFW UV and thermal cycling.' },
    'Shade / Covered Area': { sealerType: 'Acrylic Surface Sealer or Penetrating Sealer', frequency: 'Every 3–5 years (acrylic); 5–7 years (penetrating)', cost: '$0.10–$0.25/sq ft (DIY)', notes: 'Shaded driveways can tolerate acrylic surface sealers without rapid UV breakdown. Provides slight sheen and adds wet-look finish if desired.' },
    'High Traffic': { sealerType: 'Penetrating Epoxy-Modified Sealer or Silane-Siloxane', frequency: 'Every 3–5 years', cost: '$0.20–$0.40/sq ft (DIY)', notes: 'High-traffic DFW driveways need abrasion-resistant penetrating protection. Surface sealers peel under tire traffic in DFW heat — stay away from film-forming products on driveways.' },
    'Near Pool or Sprinklers': { sealerType: 'Penetrating Silane-Siloxane (water/salt-resistant)', frequency: 'Every 3–5 years', cost: '$0.20–$0.35/sq ft (DIY)', notes: 'Pool chemicals and irrigation water accelerate DFW concrete degradation. Silane-siloxane blocks water and chloride penetration that cause spalling.' },
    'New Concrete (Under 1 Year Old)': { sealerType: 'Wait 28 days minimum; then penetrating sealer', frequency: 'Initial seal at 28–90 days; reapply every 3–5 years', cost: '$0.15–$0.30/sq ft', notes: 'New DFW driveways must cure fully before sealing. Sealing too early traps moisture and causes surface damage. After 28 days, a penetrating sealer protects against DFW\’s first freeze cycle.' },
  },
  'Patio / Pool Deck': {
    'Full DFW Sun (South or West)': { sealerType: 'Penetrating Silane-Siloxane + UV-Stable Acrylic Top Coat (optional)', frequency: 'Penetrating: every 5–7 years; Acrylic: every 2–3 years', cost: '$0.25–$0.60/sq ft (professional recommended for patios)', notes: 'DFW patio concrete bakes in summer sun. Penetrating sealer is the foundation; a UV-stable acrylic top coat enhances appearance but requires more frequent reapplication in DFW UV.' },
    'Shade / Covered Area': { sealerType: 'Acrylic Concrete Sealer (wet-look or matte)', frequency: 'Every 2–3 years', cost: '$0.15–$0.30/sq ft (DIY)', notes: 'Covered DFW patios are ideal for acrylic sealers — lower UV exposure prevents rapid breakdown. Provides attractive finish and easy maintenance.' },
    'High Traffic': { sealerType: 'Penetrating Sealer + Polyurethane or Epoxy Top Coat', frequency: 'Top coat every 1–3 years; penetrating every 5–7 years', cost: '$0.40–$1.00/sq ft (professional)', notes: 'Heavily-used DFW patios need abrasion protection. Two-system approach: penetrating base protects structure, top coat handles wear. Anti-slip additive recommended for DFW pool decks.' },
    'Near Pool or Sprinklers': { sealerType: 'Penetrating Silane-Siloxane (water and chloride resistant)', frequency: 'Every 3–5 years', cost: '$0.20–$0.40/sq ft (DIY)', notes: 'Pool water and DFW irrigation combined create aggressive concrete deterioration. Penetrating sealer is essential — anti-slip texture is also important for safety around pools.' },
    'New Concrete (Under 1 Year Old)': { sealerType: 'Curing compound at pour; penetrating sealer at 28–90 days', frequency: 'Penetrating reapplied every 3–5 years after initial seal', cost: '$0.20–$0.35/sq ft', notes: 'Apply curing compound immediately after finishing new patio concrete. Wait full 28-day cure before sealing. DFW summer heat dries new concrete too fast without curing compound.' },
  },
  'Garage Floor': {
    'Full DFW Sun (South or West)': { sealerType: 'Epoxy Floor Coating or Polyurea/Polyaspartic', frequency: 'Every 5–10 years (epoxy); 10–15 years (polyurea)', cost: '$3.00–$7.00/sq ft (professional, 2-car garage)', notes: 'Garage floors in DFW benefit most from epoxy or polyurea coatings — sealer alone doesn\’t address oil, tire marks, and DFW\’s frequent temperature swings. Polyurea withstands DFW heat better than standard epoxy.' },
    'Shade / Covered Area': { sealerType: 'Epoxy Coating or Acrylic Sealer', frequency: 'Acrylic: every 2–3 years; Epoxy: every 5–10 years', cost: '$1.00–$5.00/sq ft depending on system', notes: 'Shaded garages see less thermal stress. Acrylic sealers are a cost-effective option; epoxy provides superior durability and appearance.' },
    'High Traffic': { sealerType: 'Polyurea or High-Build Epoxy (100% solids)', frequency: 'Every 8–15 years', cost: '$4.00–$8.00/sq ft (professional)', notes: 'High-traffic DFW garages — especially with heavy vehicles or frequent use — need polyurea or 100% solids epoxy. Standard paint-on epoxy kits fail quickly under DFW\’s temperature-driven expansion.' },
    'Near Pool or Sprinklers': { sealerType: 'Penetrating Sealer + Slip-Resistant Epoxy', frequency: 'Penetrating every 3–5 years; Epoxy every 5–10 years', cost: '$2.00–$5.00/sq ft', notes: 'If garage is adjacent to pool equipment or irrigation, penetrating sealer protects against water intrusion before epoxy coating is applied.' },
    'New Concrete (Under 1 Year Old)': { sealerType: 'Wait 60–90 days minimum before epoxy coating', frequency: 'Initial coating at 60–90 days', cost: '$3.00–$7.00/sq ft', notes: 'New garage slabs in DFW release moisture for 60–90 days. Applying epoxy too early causes bubbling and delamination. Test moisture emission rate before coating.' },
  },
  'Sidewalk / Walkway': {
    'Full DFW Sun (South or West)': { sealerType: 'Penetrating Silane-Siloxane', frequency: 'Every 3–5 years', cost: '$0.10–$0.25/sq ft (DIY)', notes: 'Simple penetrating sealer is the right choice for DFW sidewalks. UV breaks down surface sealers quickly on horizontal exposed concrete. Penetrating sealer keeps concrete looking natural and protected.' },
    'Shade / Covered Area': { sealerType: 'Penetrating Sealer or Low-Sheen Acrylic', frequency: 'Every 3–5 years', cost: '$0.10–$0.25/sq ft (DIY)', notes: 'Shaded walkways can use either penetrating or low-sheen acrylic sealer. Acrylic provides some moisture resistance and a clean appearance.' },
    'High Traffic': { sealerType: 'Penetrating Silane-Siloxane', frequency: 'Every 3–4 years', cost: '$0.15–$0.30/sq ft (DIY)', notes: 'Film-forming sealers on DFW sidewalks peel under foot traffic and UV. Penetrating sealers are invisible and require no reapplication other than periodic refreshes.' },
    'Near Pool or Sprinklers': { sealerType: 'Penetrating Silane-Siloxane', frequency: 'Every 3–5 years', cost: '$0.15–$0.30/sq ft (DIY)', notes: 'Irrigation overspray on DFW walkways causes surface erosion and spalling over time. Penetrating sealer significantly extends concrete life in these conditions.' },
    'New Concrete (Under 1 Year Old)': { sealerType: 'Wait 28 days; apply penetrating sealer', frequency: 'Reapply every 3–5 years', cost: '$0.10–$0.25/sq ft', notes: 'New DFW sidewalks should receive a penetrating sealer 28–60 days after pour to protect against first DFW freeze cycle cracking and surface dusting.' },
  },
  'Stamped / Decorative Concrete': {
    'Full DFW Sun (South or West)': { sealerType: 'UV-Stable Acrylic Sealer (solvent-based for color enhancement)', frequency: 'Every 1–3 years', cost: '$0.30–$0.60/sq ft (DIY); $0.60–$1.20/sq ft (professional)', notes: 'Stamped concrete color fades rapidly in DFW UV without UV-stable acrylic sealer. Solvent-based acrylic enhances color depth. Reapplication frequency is higher than standard concrete due to foot traffic and UV.' },
    'Shade / Covered Area': { sealerType: 'Water-Based Acrylic Sealer', frequency: 'Every 2–3 years', cost: '$0.20–$0.50/sq ft', notes: 'Shaded stamped concrete lasts longer between reseals. Water-based acrylics are easier to apply and have lower VOCs than solvent-based options.' },
    'High Traffic': { sealerType: 'Solvent-Based Acrylic + Anti-Slip Additive', frequency: 'Every 1–2 years', cost: '$0.40–$0.80/sq ft (professional)', notes: 'High-traffic stamped areas in DFW need anti-slip additive to prevent falls when wet. Solvent-based sealer resists abrasion better than water-based on busy surfaces.' },
    'Near Pool or Sprinklers': { sealerType: 'Penetrating Sealer Base + UV-Stable Acrylic Top', frequency: 'Penetrating every 5 years; acrylic every 1–2 years', cost: '$0.40–$0.80/sq ft total system', notes: 'Two-system approach for pool-adjacent stamped concrete: penetrating base protects from chloride, acrylic enhances appearance and protects color. Critical to use anti-slip additive near pools.' },
    'New Concrete (Under 1 Year Old)': { sealerType: 'Curing/sealing compound at pour; UV-stable acrylic at 28–60 days', frequency: 'Reapply acrylic every 1–3 years', cost: '$0.30–$0.60/sq ft for initial decorative seal', notes: 'Stamped concrete must be sealed at time of installation to protect color release and surface detail. Reapply UV-stable acrylic on a regular schedule to maintain DFW stamped concrete appearance.' },
  },
};

export default function DFWOutdoorConcreteSealGuide() {
  const [application, setApplication] = useState('');
  const [exposure, setExposure] = useState('');

  const result = application && exposure ? results[application]?.[exposure] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🏗️ DFW Concrete Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Outdoor Concrete Sealing Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          DFW concrete faces brutal UV, freeze-thaw cycles, and chloride exposure from pools and irrigation. Unsealed concrete spalls, cracks, and stains faster here than most U.S. markets. New concrete must wait 28 days to cure before sealing. The right sealer type depends on your application and DFW exposure conditions.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Concrete Sealer Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Concrete Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select application...</option>
                {applications.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>DFW Exposure</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select exposure...</option>
                {exposures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Sealer Recommendation</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '6px' }}>{result.sealerType}</div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: '#F5E642′ }}>🔄 {result.frequency}</span>
              <span style={{ fontSize: '13px', color: '#94A3B8′ }}>💰 {result.cost}</span>
            </div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px', margin: 0 }}>{result.notes}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '⏱️', title: 'The 28-Day Rule for New DFW Concrete', body: 'New concrete must cure for at least 28 days before sealing. DFW\’s summer heat accelerates surface drying but not full cure. Sealing early traps moisture and causes surface damage, bubbling, or delamination.' },
            { icon: '☀️', title: 'DFW UV Destroys Surface Sealers Fast', body: 'Acrylic and epoxy surface sealers break down 2–3x faster in DFW UV than in northern climates. Penetrating silane-siloxane sealers absorb into concrete and don\’t peel, cloud, or require annual reapplication — the right choice for most DFW horizontal surfaces.' },
            { icon: '❄️', title: 'Freeze-Thaw Cycles and DFW Spalling', body: 'DFW averages 15–25 freeze events per year. Unsealed concrete absorbs water, which expands when frozen, causing surface spalling and cracking. Sealing is the most cost-effective way to extend DFW driveway and patio life by 10–20 years.' },
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
