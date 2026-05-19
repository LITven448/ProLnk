import { useState } from 'react';

const issueTypes = ['Cracks', 'Efflorescence', 'Spalling', 'Mortar Deterioration', 'Water Staining'];
const ageRanges = ['Pre-1980', '1980-1995', '1996-2010', '2011-Present'];

const assessments: Record<string, Record<string, { assessment: string; repair: string; cost: string }>> = {
  'Cracks': {
    'Pre-1980': { assessment: 'Significant foundation settlement likely — structural eval needed', repair: 'Tuckpointing + foundation inspection', cost: '$800–$3,500′ },
    '1980-1995': { assessment: 'Common in clay soil DFW — likely seasonal movement cracks', repair: 'Tuckpointing + flexible sealant', cost: '$400–$1,200′ },
    '1996-2010': { assessment: 'Foundation movement or thermal expansion — monitor width', repair: 'Crack injection + repointing', cost: '$300–$900′ },
    '2011-Present': { assessment: 'Early-stage movement — likely cosmetic if hairline', repair: 'Flexible sealant + monitoring', cost: '$150–$500′ },
  },
  'Efflorescence': {
    'Pre-1980': { assessment: 'Deep mineral migration — long-term moisture intrusion', repair: 'Efflorescence remover + waterproof sealer', cost: '$500–$1,500′ },
    '1980-1995': { assessment: 'Moderate salt deposit — drainage issue likely', repair: 'Dry brush + masonry cleaner + drainage fix', cost: '$300–$800′ },
    '1996-2010': { assessment: 'Recent moisture event — check flashing and grading', repair: 'Surface treatment + source correction', cost: '$200–$600′ },
    '2011-Present': { assessment: 'New construction bleed — often self-resolving', repair: 'Dry brush + monitor 1 season', cost: '$100–$300′ },
  },
  'Spalling': {
    'Pre-1980': { assessment: 'Freeze-thaw and age damage — replacement likely needed', repair: 'Brick replacement + repointing', cost: '$1,200–$4,000′ },
    '1980-1995': { assessment: 'Moisture cycling damage — targeted replacement', repair: 'Selective brick replacement', cost: '$600–$2,000′ },
    '1996-2010': { assessment: 'Poor quality brick or coating failure', repair: 'Replace affected units + reseal', cost: '$400–$1,400′ },
    '2011-Present': { assessment: 'Manufacturing defect or impact damage', repair: 'Warranty claim + targeted replacement', cost: '$200–$800′ },
  },
  'Mortar Deterioration': {
    'Pre-1980': { assessment: 'Full repointing likely needed — mortar life is 25-30 years', repair: 'Full tuckpointing', cost: '$1,500–$6,000′ },
    '1980-1995': { assessment: 'Partial repointing needed on weathered sections', repair: 'Selective tuckpointing', cost: '$800–$2,500′ },
    '1996-2010': { assessment: 'Spot repointing — check south and west faces first', repair: 'Spot repointing', cost: '$300–$900′ },
    '2011-Present': { assessment: 'Premature failure — check mortar mix and drainage', repair: 'Spot repair + root cause fix', cost: '$150–$500′ },
  },
  'Water Staining': {
    'Pre-1980': { assessment: 'Deep penetration — cleaning may not fully resolve', repair: 'Masonry cleaner + sealer application', cost: '$400–$1,200′ },
    '1980-1995': { assessment: 'Iron or rust leaching — treat with oxalic acid', repair: 'Specialized masonry cleaner', cost: '$300–$800′ },
    '1996-2010': { assessment: 'Surface staining — likely cleanable', repair: 'Pressure wash + masonry cleaner', cost: '$200–$500′ },
    '2011-Present': { assessment: 'Fresh staining — address source and clean', repair: 'Source fix + surface clean', cost: '$100–$300′ },
  },
};

export default function DFWBrickHouseGuide() {
  const [issue, setIssue] = useState('');
  const [age, setAge] = useState('');
  const result = issue && age ? assessments[issue]?.[age] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME MATERIALS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧱 Brick House Guide — DFW</h1>
        <p style={{ color: '#9BA3B5', fontSize: 15, marginBottom: 32 }}>DFW is one of the most brick-intensive housing markets in Texas. Over 65% of suburban homes built 1980–2005 feature full or partial brick exteriors.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', label: 'Thermal Mass', text: 'Brick absorbs DFW heat and releases it slowly, reducing AC load by 10–15%' },
            { icon: '🌧️', label: 'Hail Resistance', text: 'Solid brick shrugs off DFW hail storms — no denting, no replacement after storms' },
            { icon: '⚠️', label: 'Clay Soil Risk', text: 'DFW\’s expansive clay soil causes foundation movement that cracks brick veneer' },
            { icon: '💧', label: 'Efflorescence', text: 'Mineral salts migrate through brick in DFW humidity — white staining is common' },
          ].map(card => (
            <div key={card.label} style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: 13 }}>{card.text}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Brick Issue Assessor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>ISSUE TYPE</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select issue...</option>
                {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B5', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>HOME AGE</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select age range...</option>
                {ageRanges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>ASSESSMENT</div>
              <p style={{ marginBottom: 12, fontSize: 14 }}>{result.assessment}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>RECOMMENDED REPAIR</div><div style={{ fontSize: 14 }}>{result.repair}</div></div>
                <div><div style={{ color: '#9BA3B5', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>ESTIMATED COST</div><div style={{ fontSize: 14, color: '#F5E642′ }}>{result.cost}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🛡️ Annual DFW Brick Maintenance Checklist</div>
          {['Inspect mortar joints after each freeze-thaw cycle (Dec–Feb)', 'Check weep holes for mud dauber nests each spring', 'Re-apply masonry sealer every 3–5 years', 'Monitor foundation movement after drought summers', 'Clear vegetation within 12 inches of brick base'].map(item => (
            <div key={item} style={{ color: '#9BA3B5', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1E3A5F' }}>✓ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
