import { useState } from 'react';

const situations = ['Nuts dropping November-December', 'Tree not producing nuts', 'Yellowing leaves mid-summer', 'Root concerns near foundation or sewer', 'Disease or pest damage on leaves', 'Annual care / maintenance', 'Considering planting a new pecan'];
const yardTypes = ['Small suburban lot (under 8000 sq ft)', 'Medium lot (8000-15000 sq ft)', 'Large lot / half-acre+', 'Commercial or HOA property'];

const advice: Record<string, string> = {
  'Nuts dropping November-December|Small suburban lot (under 8000 sq ft)': 'Peak pecan drop in DFW runs mid-November through December. On small lots, this creates significant cleanup burden — 50-150 lbs of nuts and shucks per mature tree. Rake shucks quickly (they stain concrete and attract squirrels). Nuts can be harvested and sold or gifted. Many DFW homebuyers underestimate this annual cleanup commitment when purchasing homes with mature pecans.',
  'Tree not producing nuts|Medium lot (8000-15000 sq ft)': 'Pecans require cross-pollination — two different varieties nearby improve production. Young trees under 10 years rarely produce well. Most common DFW problem: zinc deficiency from alkaline Blackland clay. Look for rosette-patterned small leaves. Solution: zinc sulfate spray in April when leaves emerge ($40-80 DIY). Also check for overcrowded canopy blocking sunlight to interior branches.',
  'Yellowing leaves mid-summer|Small suburban lot (under 8000 sq ft)': 'Mid-summer yellow leaves in DFW are a classic zinc deficiency symptom — extremely common in Blackland Prairie alkaline clay. Zinc becomes unavailable at high pH. Apply zinc sulfate foliar spray in April (not now — it must be preventive). Also check for pecan scab (brown blotches on leaves and shucks) which is the most serious pecan disease in wet DFW spring years.',
  'Root concerns near foundation or sewer|Small suburban lot (under 8000 sq ft)': 'Mature pecans develop deep taproots and wide lateral roots. On small DFW lots with older trees, roots commonly reach 30-40 feet from trunk — well beyond canopy drip line. Roots seeking moisture will enter old clay sewer laterals (common in pre-1970 DFW homes). Camera-inspect your sewer lateral if you have a mature pecan within 25 feet of your sewer line. Consider a root barrier if roots are heading toward foundation.',
  'Disease or pest damage on leaves|Medium lot (8000-15000 sq ft)': 'DFW pecans face three major issues: pecan scab (fungal, brown lesions in wet springs — treat with fungicide at bud break), pecan nut casebearer (worm inside developing nuts June-July — spray carbaryl at first shell hardening), and aphids/honeydew (sticky substance on surfaces below tree — beneficial insects control naturally, rarely need spray). A licensed Texas arborist can create an annual spray calendar.',
  'Annual care / maintenance|Medium lot (8000-15000 sq ft)': 'Annual DFW pecan spray program: April — zinc sulfate foliar spray at leaf emergence; May-June — fungicide if wet spring; June — nut casebearer spray if prior year had worm damage; August — deep water monthly during drought; October — reduce irrigation as nuts mature. Most DFW homeowners benefit from a professional spray service ($200-400/year) vs. trying to time and apply themselves.',
  'Considering planting a new pecan|Large lot / half-acre+': 'Pecans need space: 40-60 feet spacing at maturity. Best DFW varieties: Pawnee (early season, good DFW production), Caddo (scab-resistant, important in wet-spring years), Cheyenne (productive, adapts to DFW clay). Plant two different varieties for cross-pollination. Amend planting hole with sulfur to lower pH in alkaline DFW clay. Water weekly for first 3 years — patience required, first significant crop typically 7-10 years.',
};

const fallback = (s: string, y: string) =>
  `For ${s.toLowerCase()} on a ${y.toLowerCase()}: DFW pecans face three universal challenges — zinc deficiency in alkaline clay, pecan scab in wet springs, and heavy nut drop cleanup. Core annual program: zinc sulfate spray every April, scab fungicide in wet years, deep watering August-October to size nuts. Contact a Texas licensed arborist or your county AgriLife Extension office for site-specific advice.`;

const nutCalendar = [
  { month: 'Apr', note: 'Zinc sulfate foliar spray at leaf emergence' },
  { month: 'Jun', note: 'Nut casebearer spray window opens' },
  { month: 'Aug-Sep', note: 'Deep water monthly — critical for nut sizing' },
  { month: 'Oct', note: 'Reduce water, let nuts harden and mature' },
  { month: 'Nov-Dec', note: 'Harvest window — peak drop in DFW' },
  { month: 'Jan-Feb', note: 'Dormant pruning, clean up shucks and debris' },
];

export default function DFWPecanTreeGuide() {
  const [situation, setSituation] = useState('');
  const [yardType, setYardType] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!situation || !yardType) return;
    setResult(advice[`${situation}|${yardType}`] || fallback(situation, yardType));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🌰 DFW Pecan Tree Guide</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Texas state tree — care, nut management, and root concerns for DFW homeowners</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>The DFW Pecan Reality</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            The pecan is Texas's state tree and a beloved fixture in DFW neighborhoods — but homeowners frequently struggle with them.
            DFW's alkaline Blackland clay blocks zinc uptake, causing poor production. Wet DFW springs bring pecan scab. November-December
            nut drop creates weeks of cleanup on small lots. And root systems that spread 40+ feet can conflict with foundations, driveways,
            and aging sewer lines. With a consistent annual spray program, pecans are rewarding trees. Without it, they become a frustration.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📅 Annual DFW Pecan Calendar</div>
          {nutCalendar.map(c => (
            <div key={c.month} style={{ display: 'flex', gap: '1rem', padding: '0.4rem 0', borderBottom: '1px solid #1A2F4F' }}>
              <div style={{ color: '#F5E642', minWidth: 80, fontWeight: 600 }}>{c.month}</div>
              <div style={{ color: '#CBD5E8' }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🌰 Get Your Care Recommendation</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Current Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Yard / Lot Type</label>
          <select value={yardType} onChange={e => setYardType(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select yard type...</option>
            {yardTypes.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          Texas A&amp;M AgriLife Extension offers free pecan variety and care guides specific to DFW county soil conditions.
        </p>
      </div>
    </div>
  );
}
