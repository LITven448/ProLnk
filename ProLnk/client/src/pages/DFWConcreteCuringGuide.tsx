import { useState } from 'react';

const seasons = ['Summer (Jun-Sep)', 'Spring/Fall (Mar-May, Oct-Nov)', 'Winter (Dec-Feb)'];
const projectTypes = ['Driveway', 'Patio / Pool Deck', 'Foundation', 'Sidewalk', 'Garage Floor', 'Steps'];

const data: Record<string, Record<string, { method: string; duration: string; materials: string; skip: string; cost: string; schedule: string }>> = {
  'Driveway': {
    'Summer (Jun-Sep)': { method: 'Wet Cure (Burlap + Water)', duration: '7 days minimum — 28 days for full strength. DFW heat accelerates surface cure but core stays weak without moisture', materials: 'Burlap blankets + soaker hose or garden hose. Wet burlap 3x daily in peak DFW heat', skip: 'Concrete cures 40-50% weaker if you skip. In DFW summer, surface dusting and cracking within 1-2 years', cost: '$25-60 for burlap. Time: 20 min/day for 7 days', schedule: 'Day 1-3: Wet every 4 hrs. Day 4-7: Wet twice daily. Day 8-28: Traffic OK at 70%, full load at 28 days' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Curing Compound (Spray-On)', duration: '5-7 days to foot traffic. 28 days for full vehicle load', materials: 'White-pigmented curing compound, pump sprayer. Apply within 20 min of final finish', skip: 'Surface will dust within 6 months in DFW UV — skipping is the most common DFW driveway mistake', cost: '$35-65 per gallon (covers 200-300 sq ft)', schedule: 'Apply immediately after finishing. Reapply if rained on within 4 hrs. No traffic 24-48 hrs' },
    'Winter (Dec-Feb)': { method: 'Insulating Blanket Cure', duration: '5-7 days to traffic. Protect for 48 hrs minimum from freeze', materials: 'Concrete curing blankets or straw bales + plastic sheeting. Keep slab above 40°F', skip: 'Freezing concrete before cure = destroyed slab. Ice crystal formation ruins the matrix permanently', cost: '$50-120 for blankets (reusable). Worth every penny in DFW winter', schedule: 'Cover immediately after pour. Check temp under blanket every 12 hrs. Remove after 5 days if no freeze forecast' },
  },
  'Patio / Pool Deck': {
    'Summer (Jun-Sep)': { method: 'Curing Compound + Wet Cure Combo', duration: '5-7 days minimum. Pool deck traffic at 7 days. Full load 28 days', materials: 'Apply curing compound immediately. Then cover with plastic sheeting misted underneath', skip: 'DFW summer sun will crack the surface within 12-18 months without curing. Pool chemicals make it worse', cost: '$35-65 for compound + $15-25 for plastic sheeting', schedule: 'Day 1: Compound. Day 2-5: Plastic + mist. Day 7: Remove plastic and allow to breathe to 28 days' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Curing Compound', duration: '5 days to foot traffic. 21-28 days for full strength', materials: 'Clear or white curing compound. Apply in 2 coats perpendicular to each other', skip: 'Patio concrete without curing compound in DFW degrades 2-3x faster from UV and thermal cycling', cost: '$35-65 per gallon', schedule: 'Apply coat 1 immediately after finishing. Coat 2 after 2 hrs. No traffic 24 hrs.' },
    'Winter (Dec-Feb)': { method: 'Insulating Blanket + Compound', duration: '7 days for foot traffic in DFW cold', materials: 'Compound first, then blankets. Use heated blankets if below 25°F forecast', skip: 'Single DFW freeze during cure week = pitted, spalled surface requiring full replacement', cost: '$50-150 depending on heated blanket need', schedule: 'Cover within 1 hr of pour. Monitor nightly. Remove after 7 days if above 40°F sustained.' },
  },
  'Foundation': {
    'Summer (Jun-Sep)': { method: 'Wet Cure (Soaker Hose)', duration: '28 days mandatory — foundation structural strength depends on full cure', materials: 'Soaker hose wrapped around foundation forms or burlap strips on exposed sections', skip: 'Foundation concrete cured too fast = micro-cracking throughout. DFW clay will exploit every crack', cost: '$30-80 for soaker hose setup', schedule: 'Wet continuously for 7 days, then 3x daily for 21 more days. Critical: never let surface dry in DFW summer' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Wet Cure + Compound', duration: '21-28 days. Foundation requires extended cure regardless of season', materials: 'Compound on accessible surfaces. Wet cure on buried sections', skip: 'Foundation strength is not optional — short curing means reduced load capacity. DFW soil demands maximum strength', cost: '$50-100 for materials', schedule: 'Apply compound to exposed areas day 1. Wet cure buried sections for 14 days minimum' },
    'Winter (Dec-Feb)': { method: 'Heated Enclosure or Insulated Forms', duration: '28 days minimum. Foundation cannot be rushed', materials: 'Heated enclosures + insulating blankets. Keep concrete above 50°F for full cure period', skip: 'A freeze-damaged foundation is a structural failure — not cosmetic', cost: '$100-300+ for heated enclosure setup. Non-negotiable investment', schedule: 'Monitor concrete temperature every 6 hrs for first 72 hrs. Maintain 50°F+ through 7 days minimum' },
  },
  'Sidewalk': {
    'Summer (Jun-Sep)': { method: 'Curing Compound', duration: '3-5 days to foot traffic. 14 days for bicycle/cart traffic', materials: 'Apply compound within 20 min of final broom finish. Cover with burlap if adjacent to street and DFW traffic vibration is an issue', skip: 'Sidewalk surfaces in DFW summer will show surface dusting and fine cracking within 1 year without curing', cost: '$35-65 per gallon (covers 200 sq ft)', schedule: 'Day 1: Apply compound. Day 3: Light foot traffic OK. Day 14: Full use' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Curing Compound', duration: '3 days to foot traffic. 14 days full use', materials: 'Standard compound in pump sprayer. One coat sufficient in moderate DFW temps', skip: 'Skipping in spring/fall is low risk but still reduces surface hardness — compound is cheap insurance', cost: '$35-65 per gallon', schedule: 'Apply immediately after finishing. Keep foot traffic off 24 hrs to be safe' },
    'Winter (Dec-Feb)': { method: 'Compound + Blanket (if freeze risk)', duration: '5 days to foot traffic in DFW winter temps', materials: 'Compound + old carpet or straw for insulation if DFW freeze expected within 48 hrs', skip: 'Single freeze event heaves freshly poured sidewalk. DFW has had freezes as late as March and as early as November', cost: '$35-65 for compound + $20-40 for insulation materials', schedule: 'Apply compound. Cover immediately if freeze in 48-hr forecast. Check nightly.' },
  },
  'Garage Floor': {
    'Summer (Jun-Sep)': { method: 'Curing Compound', duration: '7 days to light foot traffic. 28 days before epoxy coating or heavy vehicle traffic', materials: 'White-pigmented compound (reflects DFW heat). Keep garage doors partially closed for 48 hrs', skip: 'Garage floors without curing in DFW summer will dust — you\’ll sweep concrete powder for years', cost: '$35-65 per gallon', schedule: 'Day 1: Compound. Keep cars out 7 days. Wait 28 days before epoxy (off-gassing must complete)' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Curing Compound', duration: '5-7 days before vehicles. 28 days before epoxy', materials: 'Standard compound. Good DFW season for garage pour — moderate humidity helps', skip: 'Epoxy applied before 28-day cure will bubble and delaminate — very common DFW mistake', cost: '$35-65 per gallon', schedule: 'Day 1: Compound. Day 7: Vehicles OK. Day 28: Epoxy application ready' },
    'Winter (Dec-Feb)': { method: 'Compound + Heater', duration: '7-10 days in DFW winter to ensure adequate cure', materials: 'Compound + propane or electric construction heater to maintain 50°F+ in garage', skip: 'Cold garage floor cures weak — hard to tell until you try to epoxy coat it 6 months later and it fails adhesion', cost: '$35-65 compound + heater rental $30-80', schedule: 'Apply compound. Run heater 48 hrs minimum. Keep garage closed for 7 days.' },
  },
  'Steps': {
    'Summer (Jun-Sep)': { method: 'Wet Cure (Burlap)', duration: '5-7 days before foot traffic. Shape and edges vulnerable', materials: 'Wet burlap draped over all exposed surfaces. Mist 3-4x daily in DFW peak heat', skip: 'Step edges will chip and crumble in first DFW freeze season if cured too fast', cost: '$20-40 for burlap — cover all exposed surfaces', schedule: 'Day 1-3: Burlap wet every 4 hrs. Day 4-7: Twice daily. Day 7: Foot traffic OK' },
    'Spring/Fall (Mar-May, Oct-Nov)': { method: 'Curing Compound', duration: '5 days to foot traffic', materials: 'Apply compound to all faces — risers, treads, and edges. Use brush or roller for complex geometry', skip: 'Steps without curing in DFW lose edge integrity within 2-3 winters of freeze-thaw cycling', cost: '$35-65 per gallon', schedule: 'Apply compound within 20 min of finishing. Do not walk on for 24 hrs.' },
    'Winter (Dec-Feb)': { method: 'Insulating Blanket Cure', duration: '7 days minimum. Steps are more exposed than slabs in DFW cold', materials: 'Cut blankets to fit step profile. Secure with weights or tape. Remove after 7 days if 40°F+ sustained', skip: 'Steps freeze before slabs — smallest mass, most exposure. Single DFW freeze ruins uncured steps', cost: '$50-80 for blanket material', schedule: 'Cover all exposed surfaces within 30 min of pour. Check daily for freeze risk. Remove at 7 days.' },
  },
};

export default function DFWConcreteCuringGuide() {
  const [season, setSeason] = useState('');
  const [project, setProject] = useState('');
  const result = season && project ? data[project]?.[season] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>💧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Concrete Curing Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            Concrete doesn't dry — it cures through a chemical reaction that requires moisture. In DFW's 105°F summers, the surface dries out in hours while the core stays weak for weeks. Skip curing and you get concrete that dusts, cracks, and fails in 3-5 years instead of 30+.
          </p>
        </div>
        <div style={{ backgroundColor: '#7f1d1d', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#fca5a5' }}>⚠️ DFW Fact:</strong>
          <span style={{ color: '#fff' }}> Uncured concrete in DFW summer reaches only 60% of its designed strength. That 4000 PSI driveway becomes 2400 PSI. Your truck is rated for 4000.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select project...</option>
              {projectTypes.map(p => <option key={p} value={p}>{p}</option>)}
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
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Curing Plan for DFW</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Curing Method</div>
                <div style={{ color: '#F5E642', fontWeight: 'bold' }}>{result.method}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 Material Cost</div>
                <div style={{ color: '#fff' }}>{result.cost}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏱️ Duration</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.duration}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🛒 Materials Needed</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.materials}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>📅 DFW Schedule</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.schedule}</div>
            </div>
            <div style={{ backgroundColor: '#7f1d1d', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#fca5a5', fontSize: '0.85rem' }}>❌ What Happens If You Skip</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.skip}</div>
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📈 Concrete Strength Over Time in DFW</h3>
          {[['1 day', '16%', 'Forms can be removed'], ['3 days', '40%', 'Light foot traffic only'], ['7 days', '65%', 'Residential vehicle traffic OK'], ['14 days', '90%', 'Most applications ready'], ['28 days', '100%', 'Full design strength — epoxy, heavy loads']].map(([day, pct, note]) => (
            <div key={day} style={{ display: 'grid', gridTemplateColumns: '80px 60px 1fr', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #334155', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>{day}</span>
              <span style={{ color: '#F5E642', fontWeight: 'bold' }}>{pct}</span>
              <span style={{ color: '#fff', fontSize: '0.9rem' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
