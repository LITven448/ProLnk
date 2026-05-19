import { useState } from 'react';

const friscoStats = [
  { label: 'New Homes (Built 2010+)', value: '55%' },
  { label: 'Avg Clay Soil Shrink/Expand', value: '4–6 in' },
  { label: 'Pier Installation Cost', value: '$300–$600 ea' },
  { label: 'Avg Repair Project Cost', value: '$5K–$18K' },
];

const symptoms = [
  { id: 'cracks_interior', label: 'Interior drywall cracks (diagonal from door corners)', severity: 3 },
  { id: 'cracks_exterior', label: 'Exterior brick cracks (stair-step pattern in mortar)', severity: 4 },
  { id: 'doors_sticking', label: 'Doors or windows sticking or not closing properly', severity: 3 },
  { id: 'floors_uneven', label: 'Noticeably uneven or sloping floors', severity: 4 },
  { id: 'gaps_walls', label: 'Gaps between walls and ceiling or baseboards', severity: 3 },
  { id: 'chimney_leaning', label: 'Chimney appears to be pulling away from house', severity: 5 },
  { id: 'cracks_foundation', label: 'Visible cracks in exposed foundation or slab', severity: 5 },
  { id: 'water_pooling', label: 'Water pooling against foundation after rain', severity: 2 },
];

function estimateSeverity(score: number, foundationType: string): { label: string; color: string; cost: string; description: string } {
  const base = score;
  if (base === 0) return { label: 'No Signs Detected', color: '#4CAF50', cost: '$0–$500', description: 'No settlement symptoms present. Schedule a preventive inspection every 3 years.' };
  if (base <= 4) return {
    label: 'Minor Settlement',
    color: '#8BC34A',
    cost: foundationType === 'pier' ? '$800–$2,500' : '$1,500–$4,000',
    description: 'Early-stage movement. Drainage improvements and monitoring may be sufficient. Get a foundation engineer assessment.',
  };
  if (base <= 9) return {
    label: 'Moderate Settlement',
    color: '#F5E642',
    cost: foundationType === 'pier' ? '$3,000–$8,000' : '$5,000–$12,000',
    description: 'Visible structural movement underway. Professional repair recommended within 3–6 months before worsening.',
  };
  if (base <= 15) return {
    label: 'Significant Settlement',
    color: '#FF6B35',
    cost: foundationType === 'pier' ? '$8,000–$15,000' : '$10,000–$20,000',
    description: 'Multiple serious symptoms. Foundation engineer evaluation needed this month. Repair costs increase with delay.',
  };
  return {
    label: 'Severe Settlement',
    color: '#E53935',
    cost: foundationType === 'pier' ? '$15,000–$30,000+' : '$18,000–$40,000+',
    description: 'Critical structural situation. Contact a licensed structural engineer immediately. Do not delay.',
  };
}

export default function DFWFoundationRepairFrisco() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [foundationType, setFoundationType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
    setSubmitted(false);
  }

  const score = symptoms.reduce((sum, s) => sum + (selected[s.id] ? s.severity : 0), 0);
  const result = submitted && foundationType ? estimateSeverity(score, foundationType) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️🔩</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Frisco TX Foundation Repair
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            New & Established Homes — Clay Soil Settlement Specialists
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Frisco's Dual Foundation Challenge</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            Frisco is unique: it's one of the fastest-growing cities in America, meaning it has both brand-new
            construction and 20-year-old established neighborhoods — and both face foundation challenges from
            North Texas's expansive clay soil.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🆕 New Construction (built 2015+)</div>
              <ul style={{ color: '#94A3B8', fontSize: 14, margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>Builder warranty (typically 10 years structural)</li>
                <li>Settlement in first 3–5 years is common</li>
                <li>Improper soil prep or drainage design</li>
                <li>HOA drainage easements complicate repairs</li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Established Homes (2005–2015)</div>
              <ul style={{ color: '#94A3B8', fontSize: 14, margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                <li>Clay soil has fully compressed and shifted</li>
                <li>Tree roots affecting perimeter moisture</li>
                <li>Post-drought soil shrinkage common</li>
                <li>Exterior grade changes causing erosion</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {friscoStats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🏚️ Settlement Symptom Checker</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>
            Select all symptoms you've noticed, choose your foundation type, and get a severity estimate.
          </p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>Foundation Type</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {['slab', 'pier'].map(type => (
                <button
                  key={type}
                  onClick={() => { setFoundationType(type); setSubmitted(false); }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: foundationType === type ? '#F5E642' : '#0A1628',
                    color: foundationType === type ? '#0A1628' : '#CBD5E1',
                    border: '1px solid #334155',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: foundationType === type ? 700 : 400,
                    fontSize: 14,
                  }}
                >
                  {type === 'slab' ? '🪨 Slab Foundation' : '🔩 Pier & Beam'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {symptoms.map(s => (
              <div
                key={s.id}
                onClick={() => toggle(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  backgroundColor: selected[s.id] ? '#1a1a2e' : '#0A1628',
                  border: `1px solid ${selected[s.id] ? '#FF6B35' : '#334155'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 4,
                  backgroundColor: selected[s.id] ? '#FF6B35' : 'transparent',
                  border: `2px solid ${selected[s.id] ? '#FF6B35' : '#334155'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 13,
                }}>
                  {selected[s.id] ? '✓' : ''}
                </div>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{s.label}</span>
                <span style={{ marginLeft: 'auto', color: '#64748B', fontSize: 11 }}>severity {s.severity}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => foundationType && setSubmitted(true)}
            style={{
              backgroundColor: foundationType ? '#F5E642' : '#334155',
              color: foundationType ? '#0A1628' : '#64748B',
              fontWeight: 700,
              fontSize: 16,
              padding: '14px 28px',
              border: 'none',
              borderRadius: 8,
              cursor: foundationType ? 'pointer' : 'not-allowed',
              width: '100%',
            }}
          >
            {foundationType ? 'Estimate My Severity & Cost →' : 'Select foundation type first'}
          </button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: result.color }} />
                <span style={{ color: result.color, fontWeight: 800, fontSize: 18 }}>{result.label}</span>
              </div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Est. {result.cost}</div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15 }}>{result.description}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏗️</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Get a Frisco Foundation Evaluation
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk connects Frisco homeowners with licensed foundation engineers and repair specialists.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Schedule Foundation Inspection
          </button>
        </div>

      </div>
    </div>
  );
}
