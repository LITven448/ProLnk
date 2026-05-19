import { useState } from 'react';

const SHADE_LEVELS = ['Full sun (6+ hrs)', 'Partial shade (3–6 hrs)', 'Heavy shade (<3 hrs)'];
const SITUATIONS = ['Installing new lawn', 'Replacing dead Bermuda', 'Bare spots in shade', 'Current St. Aug struggling', 'Comparing grass types'];

const RESULTS: Record<string, Record<string, { feasibility: string; requirements: string[]; alternatives: string[] }>> = {
  'Installing new lawn': {
    'Full sun (6+ hrs)': { feasibility: '⚠️ Consider Bermuda instead', requirements: ['St. Aug will grow but Bermuda performs better in full DFW sun', 'Requires 1.5″–2″ water per week in summer', 'Sod-only installation — seed not reliable', 'Cost: $0.80–$1.50/sq ft installed'], alternatives: ['Bermuda: cheaper, more drought-tolerant', 'Zoysia: slower but lower maintenance'] },
    'Partial shade (3–6 hrs)': { feasibility: '✅ St. Augustine is your best option', requirements: ['Ideal shade tolerance for DFW conditions', 'Install sod April–June for best root establishment', 'Water daily for first 2 weeks, then 1.5″/week', 'Fertilize 60 days after installation', 'Cost: $0.80–$1.50/sq ft installed'], alternatives: ['Zoysia: works but slower fill-in', 'Bermuda will fail in this shade level'] },
    'Heavy shade (<3 hrs)': { feasibility: '❌ No grass thrives here', requirements: ['Even St. Aug struggles below 3 hrs direct sun', 'Consider shade-tolerant groundcovers instead', 'Asian jasmine, mondograss, or mulch are DFW-proven options'], alternatives: ['Mondograss: best shade groundcover for DFW', 'Asian jasmine: fast-spreading shade cover', 'Mulch + shade plants: most sustainable option'] },
  },
  'Replacing dead Bermuda': {
    'Full sun (6+ hrs)': { feasibility: '⚠️ Bermuda likely died from disease or grubs', requirements: ['Diagnose cause before replanting anything', 'If compaction/poor drainage: address soil first', 'Bermuda is still the better full-sun choice for DFW', 'If tree shade increased: St. Aug may work now'], alternatives: ['Re-sod Bermuda if cause was treatable', 'St. Aug if canopy has grown and shading more'] },
    'Partial shade (3–6 hrs)': { feasibility: '✅ Switch to St. Augustine', requirements: ['Bermuda thinned because of shade — St. Aug is the fix', 'Remove dead Bermuda via sod cutter or herbicide', 'Wait 2 weeks after herbicide before sodding', 'Install St. Aug sod May–June for best results', 'Cost: $800–$2,000 for typical DFW backyard'], alternatives: ['Zoysia Palisades variety: shade tolerant alternative'] },
    'Heavy shade (<3 hrs)': { feasibility: '❌ Neither grass type will succeed', requirements: ['Bermuda died because of shade — St. Aug will too', 'Tree pruning to increase light is first step', 'Groundcover is the right long-term solution'], alternatives: ['Prune trees to get to 3+ hrs sun', 'Mondograss or Asian jasmine as groundcover'] },
  },
};

export default function DFWSaintAugustineGuide() {
  const [situation, setSituation] = useState('');
  const [shade, setShade] = useState('');
  const [result, setResult] = useState<{ feasibility: string; requirements: string[]; alternatives: string[] } | null>(null);

  function generate() {
    const lookup = RESULTS[situation]?.[shade];
    if (lookup) setResult(lookup);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🍃</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW St. Augustine Grass Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          St. Augustine is the shade-tolerant alternative to Bermuda in DFW — but it comes with trade-offs. Higher water demands, chinch bug vulnerability, and no drought resistance make it the right choice only for specific DFW conditions.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ St. Augustine vs Bermuda in DFW</h2>
          {[
            ['🌤️ Shade tolerance', 'St. Aug wins — handles 3–6 hrs sun; Bermuda needs 6+'],
            ['💧 Water needs', 'Bermuda wins — St. Aug needs 1.5–2″/week vs Bermuda\’s 1″'],
            ['🌡️ Drought resistance', 'Bermuda wins — St. Aug will brown and die without water'],
            ['🐛 Pest vulnerability', 'Bermuda wins — chinch bugs devastate DFW St. Aug in July–Aug'],
            ['💵 Installation cost', 'Similar — both require sod at $0.80–$1.50/sq ft'],
            ['🔧 Maintenance', 'Bermuda wins — St. Aug needs more frequent watering and pest monitoring'],
          ].map(([cat, detail], i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{cat}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 St. Augustine Feasibility Check</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {SITUATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Shade Level</label>
            <select value={shade} onChange={e => setShade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select shade level...</option>
              {SHADE_LEVELS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Check St. Augustine Feasibility →
          </button>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 8 }}>📊 Feasibility: {result.feasibility}</h2>
            <div style={{ marginBottom: 16 }}>
              {result.requirements.map((r, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{r}</div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🔄 Alternatives to Consider</div>
              {result.alternatives.map((a, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>• {a}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🐛 Chinch Bug Warning for DFW</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            Chinch bugs are the #1 St. Augustine killer in DFW. They peak July–August in hot, dry conditions. Look for irregular brown patches expanding from sunny edges. Treat immediately with bifenthrin — a 2-week delay can mean full lawn replacement at $3,000+.
          </p>
        </div>
      </div>
    </div>
  );
}
