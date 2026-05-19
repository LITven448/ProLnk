import { useState } from 'react';

const problems = ['Water pooling against foundation', 'Standing water in yard after rain', 'Water entering garage or crawlspace', 'Soggy lawn that never dries', 'Neighbor runoff onto my property', 'Basement or slab water intrusion'];
const soilTypes = ['Expansive Black Clay (most of DFW)', 'Sandy Loam (East DFW)', 'Caliche / Limestone (West DFW)', 'Mixed Clay-Sandy (North DFW suburbs)'];

type SolutionData = { recommendation: string; who: string; cost: string; timeline: string; steps: string[] };
const solutions: Record<string, Record<string, SolutionData>> = {
  'Water pooling against foundation': {
    'Expansive Black Clay (most of DFW)': { recommendation: 'Re-grade soil away from foundation + install French drain', who: 'Landscape contractor + foundation company review', cost: '$2,500-$6,000', timeline: '2-4 days', steps: ['Get foundation company to confirm no active movement', 'Hire landscape contractor for re-grade (6″ drop over 10 feet)', 'Install French drain to move water to street or detention', 'Add downspout extensions to push roof water 6 feet from foundation'] },
    'Sandy Loam (East DFW)': { recommendation: 'Re-grade and add drainage swale', who: 'Landscape contractor', cost: '$1,500-$3,500', timeline: '1-2 days', steps: ['Re-grade soil 6″ drop over 10 feet', 'Install drainage swale along property edge', 'Add gravel or sod to stabilize graded area', 'Extend downspouts and check quarterly'] },
  },
  'Standing water in yard after rain': {
    'Expansive Black Clay (most of DFW)': { recommendation: 'French drain system with pop-up emitter or dry creek bed', who: 'Landscape contractor (no engineer needed under 1 acre)', cost: '$3,000-$8,000', timeline: '2-3 days', steps: ['Map water flow pattern after rain event', 'Design French drain from low point to street or easement', 'Install perforated pipe 18-24″ deep in gravel bed', 'Add pop-up emitters at street — check city permit requirements'] },
    'Mixed Clay-Sandy (North DFW suburbs)': { recommendation: 'Dry creek bed or detention basin', who: 'Landscape contractor', cost: '$2,500-$7,000', timeline: '2-4 days', steps: ['Install dry creek bed to direct water flow', 'Add river rock for erosion control', 'Create shallow detention area in low corner if space permits', 'Verify HOA allows visible drainage features'] },
  },
  'Water entering garage or crawlspace': {
    'Expansive Black Clay (most of DFW)': { recommendation: 'Interior drainage system + sump pump + exterior re-grade', who: 'Foundation waterproofing specialist + civil engineer for large lots', cost: '$5,000-$15,000', timeline: '3-7 days', steps: ['Hire foundation waterproofing specialist for interior assessment', 'Install interior French drain system with sump pump', 'Re-grade exterior to direct water away', 'Consider vapor barrier if crawlspace is involved'] },
    'Caliche / Limestone (West DFW)': { recommendation: 'Surface drainage only — underground drainage does not work in caliche', who: 'Landscape contractor + civil engineer', cost: '$4,000-$12,000', timeline: '3-5 days', steps: ['Engineer must design surface drainage for hard caliche soil', 'Install channel drains at garage apron', 'Create surface swales to move water to street', 'No underground French drain — caliche blocks percolation'] },
  },
};

const DEFAULT_SOLUTION: SolutionData = { recommendation: 'Site assessment required before specific solution', who: 'Landscape contractor for initial assessment, civil engineer if complex', cost: '$1,500-$8,000 depending on scope', timeline: '2-5 days', steps: ['Hire a landscape contractor for drainage assessment ($100-200)', 'Document water behavior during next rain event with video', 'Get 3 contractor bids before committing', 'Verify city permit requirements before any drainage work'] };

export default function DFWGradeAndDrainageGuide() {
  const [problem, setProblem] = useState('');
  const [soil, setSoil] = useState('');
  const [showResults, setShowResults] = useState(false);

  const result: SolutionData = showResults && problem && soil ? (solutions[problem]?.[soil] ?? DEFAULT_SOLUTION) : DEFAULT_SOLUTION;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🌧️ DFW Property Health</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Grading and Drainage Guide for DFW</h1>
        <p style={{ color: '#9BA3B4', fontSize: 16, marginBottom: 32 }}>DFW clay soil and flat topography make drainage the single biggest threat to foundation health. Proper grading is not cosmetic — it is structural protection.</p>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🧱 Why DFW Drainage Is Critical</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 12 }}>DFW expansive clay soil absorbs water and swells — pushing foundations up. Then it dries in summer and shrinks — dropping foundations down. This cycle repeated over years without proper drainage causes differential settling and costly foundation repair averaging $8,000-$25,000 per DFW home.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>Proper lot grading requires 6 inches of fall over the first 10 feet from your foundation. Most DFW homes settle below this standard within 10-15 years.</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Get Your Drainage Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Your Drainage Problem</label>
              <select value={problem} onChange={e => { setProblem(e.target.value); setShowResults(false); }} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select problem...</option>
                {problems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B4', fontSize: 13, marginBottom: 8 }}>Your DFW Soil Type</label>
              <select value={soil} onChange={e => setSoil(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select soil type...</option>
                {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!problem || !soil} style={{ backgroundColor: problem && soil ? '#F5E642′ : '#1E3A5F', color: problem && soil ? '#0A1628' : '#4A5568', padding: '12px 28px', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: problem && soil ? 'pointer' : 'default' }}>
            Get My Solution →
          </button>
        </div>

        {showResults && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 16 }}>✅ Recommended Solution</div>
              <div style={{ color: '#10B981', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{result.recommendation}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#9BA3B4', fontSize: 12 }}>Who to Hire</div>
                  <div style={{ color: '#CBD5E1', fontSize: 13, marginTop: 4 }}>{result.who}</div>
                </div>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#9BA3B4', fontSize: 12 }}>Estimated Cost</div>
                  <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginTop: 4 }}>{result.cost}</div>
                </div>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#9BA3B4', fontSize: 12 }}>Project Timeline</div>
                  <div style={{ color: '#CBD5E1', fontSize: 13, marginTop: 4 }}>{result.timeline}</div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 Implementation Steps</div>
              <ol style={{ padding: '0 0 0 20px', margin: 0 }}>
                {result.steps.map((step, i) => <li key={i} style={{ color: '#CBD5E1', fontSize: 14, padding: '6px 0′ }}>{step}</li>)}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
