import { useState } from 'react';

const projectTypes = ['New Roof', 'Roof Replacement', 'Repair / Patch', 'Low-Slope Flat Roof'];
const exposureTypes = ['High Sun / South-Facing', 'Heavy Rain Exposure', 'Valley / Hip Area', 'Standard Pitch'];

const specs: Record<string, Record<string, { product: string; reason: string }>> = {
  'New Roof': {
    'High Sun / South-Facing': { product: 'Synthetic Underlayment (30# or heavier)', reason: 'DFW summers routinely exceed 100°F on roof surfaces. Synthetic resists UV degradation and heat cracking far better than felt.' },
    'Heavy Rain Exposure': { product: 'Synthetic + Self-Adhering Ice & Water Shield at Eaves', reason: 'DFW sees sudden intense storms. Ice & water shield at eaves creates a watertight secondary barrier where water backs up.' },
    'Valley / Hip Area': { product: 'Self-Adhering Ice & Water Shield (full valley coverage)', reason: 'Valleys concentrate runoff. In DFW storms self-adhering membrane prevents water infiltration at the most vulnerable seam.' },
    'Standard Pitch': { product: 'Synthetic Underlayment (15# equivalent)', reason: 'Synthetic holds up through DFW heat cycles and outperforms traditional #15 felt on longevity.' },
  },
  'Roof Replacement': {
    'High Sun / South-Facing': { product: 'Premium Synthetic Underlayment', reason: 'When replacing, upgrading to synthetic is cost-effective—DFW heat destroys felt underlayment before shingles fail.' },
    'Heavy Rain Exposure': { product: 'Synthetic + Ice & Water Shield at Eaves and Valleys', reason: 'Full protection for DFW storm severity; covers the full perimeter where leaks most often start.' },
    'Valley / Hip Area': { product: 'Self-Adhering Ice & Water Shield', reason: 'Critical zone for DFW roofs—concentrated runoff from heavy convective thunderstorms demands fully adhered membrane.' },
    'Standard Pitch': { product: 'Synthetic Underlayment', reason: 'Standard synthetic is ideal for DFW: lightweight, breathable, and stable across extreme temperature swings.' },
  },
  'Repair / Patch': {
    'High Sun / South-Facing': { product: 'Match Existing + Synthetic Patch', reason: 'Match existing system but use synthetic for any added underlayment—felt will degrade faster in DFW sun.' },
    'Heavy Rain Exposure': { product: 'Self-Adhering Patch Membrane', reason: 'For repairs in high-rain zones, peel-and-stick ensures no gaps that DFW storms can exploit.' },
    'Valley / Hip Area': { product: 'Self-Adhering Ice & Water Shield', reason: 'Always use fully adhered membrane for valley repairs in DFW—standard felt leaves seams vulnerable.' },
    'Standard Pitch': { product: 'Synthetic Underlayment Strip', reason: 'Easy to cut and fit; performs well in DFW temperature extremes unlike aged felt.' },
  },
  'Low-Slope Flat Roof': {
    'High Sun / South-Facing': { product: 'Modified Bitumen or TPO (not standard underlayment)', reason: 'Flat roofs in DFW need fully adhered membrane systems—traditional underlayment is insufficient for low slope.' },
    'Heavy Rain Exposure': { product: 'Self-Adhering Modified Bitumen Base Sheet', reason: 'Flat DFW roofs pond water in storms; fully adhered base sheet is the minimum standard.' },
    'Valley / Hip Area': { product: 'N/A — use fully adhered flat roof system', reason: 'Low-slope applications do not use valley underlayment; entire surface must be waterproof membrane.' },
    'Standard Pitch': { product: 'Self-Adhering Base Sheet + Cap Sheet', reason: 'Two-ply system handles DFW UV and ponding water on low-slope applications.' },
  },
};

export default function DFWRoofUnderlaymentGuide() {
  const [project, setProject] = useState('');
  const [exposure, setExposure] = useState('');

  const result = project && exposure ? specs[project]?.[exposure] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🏠 DFW Roofing Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Roof Underlayment Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          Underlayment is the critical secondary water barrier between your shingles and the roof deck. In DFW, extreme heat and sudden heavy storms make underlayment selection more important than in most U.S. markets. Synthetic underlayment dramatically outperforms traditional felt in DFW conditions.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Underlayment Specification</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Roof Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select project type...</option>
                {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>DFW Exposure Condition</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select exposure...</option>
                {exposureTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Recommended Specification</div>
            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{result.product}</div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px' }}>{result.reason}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '🌡️', title: 'Synthetic vs Felt in DFW Heat', body: 'DFW roof surfaces reach 160–180°F in summer. Traditional #15 felt becomes brittle and fails within a few years. Synthetic underlayment maintains flexibility and integrity across DFW temperature extremes.' },
            { icon: '🌧️', title: 'DFW Storm Protection', body: 'DFW receives intense convective thunderstorms with high wind-driven rain. Synthetic underlayment\’s overlapping design and superior adhesion prevent water infiltration during severe events.' },
            { icon: '❄️', title: 'Ice & Water Shield for Valleys', body: 'Even in DFW, valleys and eaves benefit from self-adhering ice and water shield. These zones concentrate runoff and are the first to leak when underlayment degrades.' },
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
