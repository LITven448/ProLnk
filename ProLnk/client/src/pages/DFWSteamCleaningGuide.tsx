import { useState } from 'react';

const HOME_SIZES = ['Small (<1,500 sqft)', 'Medium (1,500–2,500 sqft)', 'Large (2,500–4,000 sqft)', 'Very Large (4,000+ sqft)'];
const SURFACES = ['Carpet Only', 'Tile + Grout Only', 'Carpet + Tile', 'Upholstery + Carpet', 'Full Home (All Surfaces) + Mattress'];
const ALLERGY_LEVELS = ['None / Low', 'Moderate (seasonal)', 'High (year-round)', 'Severe (medical need)'];

type RecKey = string;
const RECS: Record<RecKey, { frequency: string; cost: string; mode: string; note: string }> = {
  'Small (<1,500 sqft)|Carpet Only|None / Low': { frequency: 'Every 18–24 months', cost: '$120–200', mode: 'Professional recommended', note: 'DFW dust and cedar pollen load is higher than national average — even low-allergy households benefit from professional extraction annually.' },
  'Small (<1,500 sqft)|Carpet Only|High (year-round)': { frequency: 'Every 6 months', cost: '$120–200/visit', mode: 'Professional hot water extraction', note: 'DFW is in the top 10 worst allergy cities in the US. For year-round allergy sufferers, 6-month carpet cleaning is a clinical recommendation, not a luxury.' },
  'Medium (1,500–2,500 sqft)|Carpet + Tile|Moderate (seasonal)': { frequency: 'Carpet: annually; Tile: every 18 months', cost: '$350–600 combined', mode: 'Professional for both', note: 'DFW hard water leaves calcium and mineral scale in tile grout that rental machines can’t break down. Professional tile cleaning uses steam + chemical pre-treatment.' },
  'Medium (1,500–2,500 sqft)|Full Home (All Surfaces) + Mattress|High (year-round)': { frequency: 'Every 6 months (full service)', cost: '$600–1,000/visit', mode: 'Professional full-home package', note: 'Many DFW cleaning companies offer whole-home packages at 20–30% discount vs individual surfaces. Schedule around DFW cedar season (Dec–Feb) and spring pollen peak.' },
  'Large (2,500–4,000 sqft)|Tile + Grout Only|None / Low': { frequency: 'Every 2 years', cost: '$400–700', mode: 'Professional — rental machines insufficient', note: 'DFW municipal water hardness (200–400 ppm) deposits calcium in grout lines. At this scale, professional truck-mounted steam extraction is the only effective solution.' },
  'Large (2,500–4,000 sqft)|Carpet Only|Severe (medical need)': { frequency: 'Every 3–4 months', cost: '$250–450/visit', mode: 'IICRC-certified professional only', note: 'For medical-grade cleaning, look for IICRC S100 certified technicians in DFW. Ask for truck-mounted extraction (not portable) and confirm no residue/perfume additives.' },
  'Very Large (4,000+ sqft)|Full Home (All Surfaces) + Mattress|Moderate (seasonal)': { frequency: 'Carpet annually; Tile every 18 months; Mattress annually', cost: '$1,200–2,000/year', mode: 'Professional — schedule seasonal blocks', note: 'At this size, negotiating a recurring annual contract with a DFW company typically saves 15–25% vs on-demand booking. Ask for cedar season and spring cleaning blocks.' },
  'Small (<1,500 sqft)|Tile + Grout Only|None / Low': { frequency: 'Every 2–3 years', cost: '$150–280', mode: 'Professional or quality rental', note: 'Smaller tile areas are a rare case where a high-quality rental machine (Rug Doctor Pro or similar) can be effective. Still use a chemical pre-treatment for DFW hard water scale.' },
};

const DEFAULT_REC = { frequency: 'Carpets: annually; Tile: every 18 months; Mattress: annually', cost: '$200–600 depending on scope', mode: 'Professional recommended for DFW', note: 'DFW ranks as one of the highest allergy-burden metros in the US. Professional hot-water extraction removes allergens that rental machines leave behind — the water temperature matters.' };

export default function DFWSteamCleaningGuide() {
  const [size, setSize] = useState('');
  const [surfaces, setSurfaces] = useState('');
  const [allergy, setAllergy] = useState('');

  const key = [size, surfaces, allergy].join('|');
  const rec = RECS[key] || (size && surfaces && allergy ? DEFAULT_REC : null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🧹 DFW Steam Cleaning Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW homes carry a higher allergen load than most US metros: cedar fever (Dec–Feb), spring oak and grass pollen (March–May), and summer dust accumulation. Add hard municipal water that scales tile grout, and regular professional cleaning pays dividends in air quality and surface lifespan.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ label: '🌿 Carpet Steam', desc: 'Hot water extraction — the only method that reaches the base of carpet fibers. DFW dust requires it annually.' },
            { label: '🧱 Tile + Grout', desc: 'DFW hard water (200–400 ppm) scales grout. Steam + chemical pre-treatment restores original color.' },
            { label: '🛋️ Upholstery', desc: 'DFW spring pollen embeds in upholstery — professional low-moisture cleaning protects fabric integrity.' },
            { label: '🛏️ Mattress', desc: 'DFW allergy season = dust mite and pollen accumulation. Annual mattress extraction makes a measurable difference.' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>🔬 Professional vs Rental: The DFW Case</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ title: 'Water Temperature', body: 'Professional truck-mounted machines reach 200–250°F. Rental machines: 120–150°F. Temperature is the primary variable that kills dust mites and breaks down DFW clay-soil dirt.' },
              { title: 'Suction Power', body: 'Truck-mounted extractors remove 95%+ of moisture in one pass — carpets dry in 4–6 hours. Rentals leave carpets wet for 24+ hours in DFW humidity, promoting mold.' },
              { title: 'Hard Water Solutions', body: 'Professional DFW companies use water softeners and pre-treatments matched to DFW water hardness. Rental machines use tap water — deposits scale back into grout lines immediately.' },
            ].map(item => (
              <div key={item.title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Service Frequency Recommender</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            {[['Home Size', HOME_SIZES, size, setSize], ['Surfaces to Clean', SURFACES, surfaces, setSurfaces], ['Allergy Sensitivity', ALLERGY_LEVELS, allergy, setAllergy]].map(([label, opts, val, setter]: any) => (
              <div key={label}>
                <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                  <option value=''>Select...</option>
                  {opts.map((o: string) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended Frequency: {rec.frequency}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 4 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginBottom: 8 }}>Service Mode: {rec.mode}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 Hiring a DFW Cleaning Company</h2>
          {['Look for IICRC certification — Institute of Inspection, Cleaning and Restoration Certification',
            'Confirm truck-mounted equipment (not portable machines) for carpet and tile extraction',
            'Ask if they pre-treat for DFW hard water before tile cleaning — non-negotiable for results',
            'Avoid companies offering "whole-house carpet cleaning" for under $99 — bait-and-switch is common in DFW',
            'For allergy needs, request a written list of cleaning agents used — some are VOC-heavy and worsen air quality',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span><span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
