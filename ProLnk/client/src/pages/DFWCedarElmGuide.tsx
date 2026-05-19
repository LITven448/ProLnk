import { useState } from 'react';

const situations = ['Dropping branches after storm', 'Large overhanging limbs near house', 'Trunk showing signs of decay or hollow', 'Roots lifting driveway or sidewalk', 'Tree leaning noticeably', 'Annual pruning / maintenance', 'Just moved in, unfamiliar with tree'];
const yards = ['Urban lot (50-80 ft wide)', 'Suburban lot (80-150 ft wide)', 'Large lot / acreage', 'Commercial property'];

const advice: Record<string, string> = {
  'Dropping branches after storm|Urban lot (50-80 ft wide)': 'Cedar elms drop branches readily in DFW ice storms and straight-line winds — brittle wood is their signature weakness. After any storm, inspect for hanging branches (widow-makers) before walking under the canopy. On urban lots, dropped limbs near structures or utility lines require a licensed ISA arborist, not DIY. Call within 48 hours if over power lines.',
  'Large overhanging limbs near house|Urban lot (50-80 ft wide)': 'Urban cedar elms with limbs over your DFW home are a storm liability. Get a licensed ISA arborist to evaluate and prune 6-8 feet clearance from roofline. Prune in late winter (January-February in DFW) when dormant — avoid April-May (Dutch elm disease beetle active). Budget $400-900 for professional canopy reduction.',
  'Trunk showing signs of decay or hollow|Urban lot (50-80 ft wide)': 'Hollowing in cedar elms is common in DFW trees over 40 years old. Hollow trunks can survive for decades if less than 30% compromised, but a certified arborist must assess. In urban DFW, hollow trees near structures are a liability — get a written risk assessment before deciding to keep or remove.',
  'Roots lifting driveway or sidewalk|Suburban lot (80-150 ft wide)': 'Cedar elm roots aggressively seek moisture in DFW clay — especially near irrigation lines and sewer laterals. Root lifting concrete within 8 feet of a structure risks slab and foundation contact. Options: root pruning with a root barrier ($300-600), concrete grinding (cosmetic), or tree removal if root conflict is structural. Consult an arborist before cutting large surface roots.',
  'Annual pruning / maintenance|Urban lot (50-80 ft wide)': 'Cedar elm maintenance schedule for DFW: prune dead wood in January-February (dormant), never in spring (elm bark beetle peak April-May). Clear canopy 10 feet from any structure. Deep water monthly September-March when DFW soil is dry. Mulch 3-4 inches from trunk to drip line to retain moisture and protect roots from DFW summer heat.',
  'Tree leaning noticeably|Urban lot (50-80 ft wide)': 'A leaning cedar elm in DFW needs immediate arborist evaluation. DFW clay soil heaving can shift root plates in wet winters. Lean toward a structure requires emergency assessment. Lean away from structures may be natural growth toward light. Do not cable or stake without professional guidance — improper correction can accelerate failure.',
  'Just moved in, unfamiliar with tree|Suburban lot (80-150 ft wide)': 'Cedar elm identification: small, rough-textured leaves, corky ridged bark, strong upright form. Common throughout DFW neighborhoods — one of the most drought-tolerant native trees. New homeowner checklist: photograph canopy from all sides, note any dead wood or structural branches, schedule ISA arborist assessment ($150-250) in first year. Cedar elms over 30 inches diameter are heritage trees in many DFW cities.',
};

const fallback = (s: string, y: string) =>
  `For ${s.toLowerCase()} on a ${y.toLowerCase()}: Cedar elms are DFW's most common street tree — drought-tolerant, native, and long-lived but prone to storm breakage due to brittle wood. Hire an ISA-certified arborist (not a tree trimmer) for any work near structures. Annual dormant pruning in January-February is the most cost-effective maintenance.`;

const calendar = [
  { month: 'Jan-Feb', action: 'Dormant pruning — safest time, beetle inactive' },
  { month: 'Mar', action: 'Watch for spring leaf out — assess canopy health' },
  { month: 'Apr-May', action: 'DO NOT PRUNE — elm bark beetle peak in DFW' },
  { month: 'Jun-Aug', action: 'Deep water monthly, mulch to retain moisture' },
  { month: 'Sep-Oct', action: 'Check for storm damage after fall storms' },
  { month: 'Nov-Dec', action: 'Final deep watering before dormancy' },
];

export default function DFWCedarElmGuide() {
  const [situation, setSituation] = useState('');
  const [yard, setYard] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!situation || !yard) return;
    setResult(advice[`${situation}|${yard}`] || fallback(situation, yard));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🌳 DFW Cedar Elm Guide</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Care, risk, and maintenance for DFW's most common street tree</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>Why Cedar Elms Drop Branches</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            Cedar elms are the most drought-tolerant native tree for DFW's Blackland Prairie but carry a structural weakness: relatively brittle wood.
            DFW ice storms, straight-line winds (50+ mph in spring storms), and long drought cycles weaken branch connections.
            Trees growing in compacted urban clay soil have shallower root systems, making them more susceptible to windthrow.
            Annual ISA-certified arborist inspections and dormant pruning are the most cost-effective protection strategy.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📅 DFW Cedar Elm Calendar</div>
          {calendar.map(c => (
            <div key={c.month} style={{ display: 'flex', gap: '1rem', padding: '0.4rem 0', borderBottom: '1px solid #1A2F4F' }}>
              <div style={{ color: '#F5E642', minWidth: 90, fontWeight: 600 }}>{c.month}</div>
              <div style={{ color: '#CBD5E8' }}>{c.action}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🌿 Get Your Care Recommendation</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Current Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Yard / Lot Type</label>
          <select value={yard} onChange={e => setYard(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select yard type...</option>
            {yards.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          Look for ISA Certified Arborist credentials (not just "tree trimmer"). Many DFW municipalities offer free tree risk assessments for street trees.
        </p>
      </div>
    </div>
  );
}
