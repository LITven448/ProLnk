import { useState } from 'react';

const slateConditions = ['Excellent', 'Good', 'Fair', 'Poor'];
const homeTypes = ['Historic Pre-1950', 'Mid-Century 1950-1980', 'Modern Post-1980', 'Commercial'];

const slateAdvice: Record<string, Record<string, { action: string; cost: string; specialist: string }>> = {
  'Historic Pre-1950': {
    Excellent: { action: 'Annual inspection only — slate likely original and solid', cost: 'Inspection: $200-$300', specialist: 'Historic masonry roofer required' },
    Good: { action: 'Replace cracked or slipped individual slates — repair is always first choice', cost: '$50-$150 per slate replaced', specialist: 'Slate-certified DFW roofer' },
    Fair: { action: 'Full assessment needed — may need partial re-roofing with salvaged slate', cost: '$8,000-$18,000 partial re-roof', specialist: 'National Slate Association certified contractor' },
    Poor: { action: 'Full replacement — consider synthetic slate to match historic look', cost: '$25,000-$55,000 for full replacement', specialist: 'Historic preservation roofer + City of Dallas permit' },
  },
  'Mid-Century 1950-1980': {
    Excellent: { action: 'Slate in great shape — inspect flashings and underlayment annually', cost: 'Inspection: $200-$400', specialist: 'General roofer with slate experience' },
    Good: { action: 'Spot repairs to slipped or cracked slates — cost-effective at this stage', cost: '$400-$800 per repair area', specialist: 'DFW slate-certified contractor' },
    Fair: { action: 'Structural load assessment first — DFW homes may not support slate weight', cost: '$800-$1,200 structural review + $10K-$15K repairs', specialist: 'Structural engineer + slate roofer' },
    Poor: { action: 'Replace with lighter alternative — most DFW mid-century homes not built for slate weight', cost: '$20,000-$30,000 full replacement', specialist: 'Licensed DFW roofing contractor' },
  },
  'Modern Post-1980': {
    Excellent: { action: 'Rare — verify it is true slate, not concrete tile. If genuine, inspect annually.', cost: '$300-$500 inspection', specialist: 'Slate expert to verify material' },
    Good: { action: 'Monitor closely — modern DFW construction rarely designed for slate load', cost: '$500-$900 repairs', specialist: 'Structural review recommended' },
    Fair: { action: 'Strongly consider replacement — modern framing typically not rated for natural slate', cost: '$25,000-$35,000 replacement', specialist: 'Structural engineer + licensed roofer' },
    Poor: { action: 'Immediate replacement — safety risk. Modern structures cannot support failing slate', cost: '$30,000-$40,000 emergency replacement', specialist: 'Emergency DFW roofing contractor' },
  },
  'Commercial': {
    Excellent: { action: 'Maintain with annual inspections — commercial slate in DFW extremely rare', cost: '$400-$600 inspection', specialist: 'Commercial roofing specialist' },
    Good: { action: 'Targeted repairs — document all work for insurance and property records', cost: '$2,000-$5,000 repairs', specialist: 'Commercial slate contractor' },
    Fair: { action: 'Assess full replacement cost vs repair — commercial ROI calculation needed', cost: '$40,000-$80,000 depending on size', specialist: 'Commercial roofing consultant' },
    Poor: { action: 'Replace immediately — commercial liability exposure on failing slate', cost: '$80,000-$150,000+ for full commercial re-roof', specialist: 'Commercial roofing firm + structural engineer' },
  },
};

export default function DFWRoofSlateGuide() {
  const [homeType, setHomeType] = useState('');
  const [condition, setCondition] = useState('');
  const result = homeType && condition ? slateAdvice[homeType]?.[condition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Slate Roofing Guide — Dallas/Fort Worth</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6' }}>
          Slate roofing is rare in DFW but found in historic Dallas neighborhoods like Lakewood, Swiss Avenue, and Preston Hollow estates.
          Natural slate lasts 100+ years but requires skilled repair and structural support. Single slate replacements are feasible and always preferred over full replacement.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '⏳ Lifespan', val: '100-150+ years' }, { label: '💰 Cost Range', val: '-55/sq ft installed' }, { label: '⚖️ Weight', val: '800-1,500 lbs per square' }, { label: '🌨️ Hail Rating', val: 'Class 4 — Highest rated' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600 }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔍 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select home type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Slate Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select condition...</option>
                {slateConditions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '20px', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: '12px' }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Recommended Action: </span>{result.action}</div>
              <div style={{ marginBottom: '12px' }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Estimated Cost: </span>{result.cost}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 600 }}>Specialist: </span>{result.specialist}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>⚠️ DFW Structural Note</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>Most DFW homes built after 1980 are not structurally designed to support natural slate weight. Always get a structural engineer assessment before any slate installation or replacement. Synthetic slate alternatives weigh 40% less and are increasingly popular in DFW.</p>
        </div>
      </div>
    </div>
  );
}
