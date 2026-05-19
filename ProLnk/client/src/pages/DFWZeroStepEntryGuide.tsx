import { useState } from 'react';

const SOLUTIONS = [
  { name: 'Threshold Ramp (Temporary)', cost: '$50–$400', time: 'Hours', desc: 'Rubber or aluminum ramp over existing threshold. Portable. Good for single step of 1″–4″.' },
  { name: 'Concrete Grading (Permanent)', cost: '$2,000–$6,000', time: '3–5 days', desc: 'Grade soil and pour new concrete approach. DFW clay soil requires compaction work. Most durable option.' },
  { name: 'New Covered Platform Entry', cost: '$4,000–$12,000', time: '1–2 weeks', desc: 'Zero-step covered platform with roof overhang. Ideal for DFW rain and 110°F summer heat. Adds resale value.' },
  { name: 'Pavers + Grading', cost: '$3,000–$8,000', time: '4–7 days', desc: 'Gradually slope existing approach with permeable pavers. HOA-friendly aesthetics, DFW weather-resistant.' },
];

function getRecommendation(config: string, mobility: string) {
  const temp = config === 'One step (2″–7″)';
  const moderate = mobility === 'Walker / Rollator';
  const severe = mobility === 'Wheelchair / Scooter';
  if (temp && !severe) return { rec: 'Threshold Ramp', cost: '$50–$400', permit: 'No permit required', hoa: 'Pre-approve with HOA before installing', note: 'Meets ADA slope of 1:12 for steps up to 6″' };
  if (severe) return { rec: 'Concrete Grading + Covered Platform', cost: '$5,000–$14,000', permit: 'Building permit required', hoa: 'Structural addition — HOA approval likely required', note: 'DFW clay soil: specify compacted fill and grade-beam footer' };
  if (moderate) return { rec: 'Pavers + Grading or Concrete Grading', cost: '$3,000–$8,000', permit: 'Permit typically required for concrete work', hoa: 'Consult HOA for paver type approval', note: 'Ensure max 1:12 slope per ADA; 1:20 preferred for walkers' };
  return { rec: 'Covered Platform Entry', cost: '$4,000–$12,000', permit: 'Building permit required', hoa: 'HOA approval required for structural additions', note: 'Cover provides shade and rain protection critical in DFW climate' };
}

export default function DFWZeroStepEntryGuide() {
  const [config, setConfig] = useState('One step (2″–7″)');
  const [mobility, setMobility] = useState('Walker / Rollator');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🏡 Zero-Step Entry Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>DFW's expansive clay soil makes regrading more complex than most markets. Covered entries are especially valuable given 110°F summers and afternoon storms. Know your options before starting.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '🌱 DFW Soil', val: 'Heavy clay — requires compaction & engineered grade' },
            { label: '🌡️ Weather Factor', val: 'Covered entries essential for DFW heat and rain' },
            { label: '🏘️ HOA Impact', val: 'Most DFW HOAs require approval for structural entries' },
            { label: '📐 ADA Slope', val: '1:12 max (1″ rise per 12″ run), 1:20 preferred' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0F2035', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 13, color: '#8A9BB5', marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔧 Solution Options</h2>
          {SOLUTIONS.map(s => (
            <div key={s.name} style={{ background: '#0F2035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5′ }}>{s.name}</span>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{s.cost}</span>
              </div>
              <div style={{ color: '#8A9BB5', fontSize: 13 }}>{s.desc}</div>
              <div style={{ color: '#6B8FBF', fontSize: 12, marginTop: 4 }}>⏱ Install: {s.time}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Current Entry Configuration</label>
              <select value={config} onChange={e => setConfig(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>One step (2"–7″)</option><option>Two or more steps</option><option>Sloped but not zero-step</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Primary Mobility Need</label>
              <select value={mobility} onChange={e => setMobility(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Walker / Rollator</option><option>Wheelchair / Scooter</option><option>Balance / General Safety</option><option>Aging in Place</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(getRecommendation(config, mobility))} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended: {result.rec}</h3>
            {[['Estimated Cost', result.cost], ['Permit Required', result.permit], ['HOA Consideration', result.hoa], ['DFW Note', result.note]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#8A9BB5', fontSize: 13, minWidth: 130 }}>{k}</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
