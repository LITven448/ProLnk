import { useState } from 'react';

const masonryIssues = ['Mortar Joint Cracking', 'Spalling Brick', 'Efflorescence', 'Structural Separation'];
const areaSizes = ['Small (< 10 sq ft)', 'Medium (10–50 sq ft)', 'Large (50–150 sq ft)', 'Extensive (150+ sq ft)'];

function getRepairPlan(issue: string, area: string) {
  const methods: Record<string, string> = {
    'Mortar Joint Cracking': 'Tuckpointing',
    'Spalling Brick': 'Brick Replacement + Tuckpointing',
    'Efflorescence': 'Chemical Treatment + Sealing',
    'Structural Separation': 'Mason Evaluation Required',
  };
  const urgency: Record<string, string> = {
    'Mortar Joint Cracking': 'Medium',
    'Spalling Brick': 'High',
    'Efflorescence': 'Low',
    'Structural Separation': 'Critical',
  };
  const baseCosts: Record<string, number> = {
    'Small (< 10 sq ft)': 350,
    'Medium (10–50 sq ft)': 900,
    'Large (50–150 sq ft)': 2500,
    'Extensive (150+ sq ft)': 6000,
  };
  const issueMultiplier: Record<string, number> = {
    'Mortar Joint Cracking': 1,
    'Spalling Brick': 1.5,
    'Efflorescence': 0.7,
    'Structural Separation': 2.2,
  };
  const diy = issue === 'Efflorescence' || (issue === 'Mortar Joint Cracking' && area === 'Small (< 10 sq ft)');
  return {
    method: methods[issue],
    urgency: urgency[issue],
    cost: Math.round(baseCosts[area] * issueMultiplier[issue]),
    diy,
  };
}

export default function DFWMasonryRepairGuide() {
  const [issue, setIssue] = useState('');
  const [area, setArea] = useState('');
  const result = issue && area ? getRepairPlan(issue, area) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🧱 DFW Masonry Repair Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's expansive clay soil shifts seasonally — causing mortar joints and brick to crack even on well-built homes. Annual inspection catches problems early.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌍 Why DFW Clay Soil Is Unique</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Dallas-Fort Worth sits on one of the largest expansive clay deposits in the US. Known locally as "black gumbo," this soil swells up to 10% when wet and shrinks dramatically in drought. The resulting movement creates recurring masonry stress — particularly on pier-and-beam and slab foundations. Even structurally sound homes see cosmetic mortar damage every 5–10 years.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔧', title: 'Tuckpointing', desc: 'Removing deteriorated mortar to a depth of ¾" and packing in fresh mortar. Most common DFW masonry repair — extends brick life 20+ years when done correctly.' },
            { icon: '🧱', title: 'Spalling Brick Replacement', desc: 'Spalling is when brick faces flake or pop off — caused by moisture freeze-thaw or DFW summer heat cycling. Individual bricks must be cut out and replaced with matching units.' },
            { icon: '⚗️', title: 'Efflorescence Treatment', desc: 'White mineral deposits on brick indicate moisture movement through masonry. Clean with muriatic acid solution, then seal — a DIY-accessible repair that prevents long-term damage.' },
            { icon: '⚠️', title: 'Structural Separation', desc: 'Diagonal cracks, step cracks following mortar joints, or brick pulling away from foundation indicate foundation movement. Always get a structural engineer or foundation specialist first.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🧰 DIY vs. Hire a Mason</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 4 }}>✅ DIY OK</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
                <li>Efflorescence cleaning</li>
                <li>Small crack tuckpointing (&lt;5 ft)</li>
                <li>Applying masonry sealant</li>
              </ul>
            </div>
            <div>
              <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 4 }}>🔴 Hire a Mason</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
                <li>Any structural crack pattern</li>
                <li>Brick replacement</li>
                <li>Large-area tuckpointing</li>
                <li>Post-foundation repair work</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Repair Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Masonry Issue</label>
              <select value={issue} onChange={e => setIssue(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select issue</option>
                {masonryIssues.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Affected Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select area</option>
                {areaSizes.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Method</div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700 }}>{result.method}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Est. Cost</div>
                <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700 }}>${result.cost.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Urgency</div>
                <div style={{ color: result.urgency === 'Critical' ? '#f87171' : result.urgency === 'High' ? '#fb923c' : result.urgency === 'Medium' ? '#facc15' : '#4ade80', fontSize: '1rem', fontWeight: 700 }}>{result.urgency}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DIY?</div>
                <div style={{ color: result.diy ? '#4ade80' : '#f87171', fontSize: '1rem', fontWeight: 700 }}>{result.diy ? 'Possible' : 'Hire Pro'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
