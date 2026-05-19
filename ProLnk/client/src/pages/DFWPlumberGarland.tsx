import { useState } from 'react';

const garlandFacts = [
  { label: 'Homes Built Before 1985', value: '65%' },
  { label: 'Avg Galvanized Pipe Age', value: '45 yrs' },
  { label: 'Pipe Replacement Cost', value: '$4K–$12K' },
  { label: 'Foundation Shift Events / Yr', value: '2–4′ },
];

function estimateReplacement(age: number): { probability: string; cost: string; color: string; notes: string } {
  if (age < 20) return { probability: '5%', cost: '$500–$1,500', color: '#4CAF50', notes: 'Low risk. Schedule a standard inspection every 3 years.' };
  if (age < 35) return { probability: '25%', cost: '$1,500–$4,000', color: '#F5E642', notes: 'Moderate risk. Watch for discolored water or reduced pressure.' };
  if (age < 50) return { probability: '60%', cost: '$4,000–$8,000', color: '#FF6B35', notes: 'High risk. Galvanized pipes likely corroding internally. Get a camera inspection.' };
  return { probability: '85%+', cost: '$8,000–$15,000', color: '#E53935', notes: 'Critical. Full repiping strongly recommended before a failure occurs.' };
}

export default function DFWPlumberGarland() {
  const [pipeAge, setPipeAge] = useState('');
  const [result, setResult] = useState<null | ReturnType<typeof estimateReplacement>>(null);

  function evaluate() {
    const age = parseInt(pipeAge, 10);
    if (!pipeAge || isNaN(age) || age < 0) return;
    setResult(estimateReplacement(age));
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧🏘️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Garland TX Plumbers
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            Aging Home Specialists — Galvanized Pipe & Foundation Movement Experts
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Garland's Plumbing Challenge: Old Pipes + Moving Ground</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            Garland was built primarily in the 1960s through 1980s — a era when galvanized steel pipes were
            standard. Those pipes have a useful life of 40–60 years. Today, tens of thousands of Garland homes
            are reaching or past that threshold, with pipes that corrode from the inside out.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Compounding the problem: North Texas expansive clay soil shifts 2–4 times per year with rainfall cycles,
            stressing pipe joints and causing cracks that can go undetected for months. Garland plumbers who
            specialize in older homes know how to diagnose both issues simultaneously.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {garlandFacts.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>💧 Pipe Replacement Probability Calculator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Enter the estimated age of your home's plumbing system to get replacement probability and cost estimate.
          </p>

          <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>
                Pipe System Age (years)
              </label>
              <input
                type="number"
                min="0″
                max="100″
                placeholder="e.g. 45″
                value={pipeAge}
                onChange={e => { setPipeAge(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <button
              onClick={evaluate}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Estimate Risk →
            </button>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Replacement Probability</div>
                  <div style={{ color: result.color, fontSize: 28, fontWeight: 800 }}>{result.probability}</div>
                </div>
                <div>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Estimated Cost Range</div>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{result.cost}</div>
                </div>
              </div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14 }}>{result.notes}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔬 Warning Signs in Garland Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { icon: '🟤', sign: 'Rusty or brown water', cause: 'Internal galvanized pipe corrosion' },
              { icon: '💧', sign: 'Low water pressure', cause: 'Mineral buildup narrowing pipe interior' },
              { icon: '🪣', sign: 'Wet spots under slab', cause: 'Foundation shift cracking supply lines' },
              { icon: '📉', sign: 'High water bill spike', cause: 'Hidden leak in wall or under foundation' },
              { icon: '🦟', sign: 'Mold near walls', cause: 'Slow leak from corroded pipe joint' },
              { icon: '🔊', sign: 'Banging pipes', cause: 'Water hammer from failing galvanized elbows' },
            ].map(item => (
              <div key={item.sign} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.sign}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{item.cause}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚙️ Services Garland Specialists Provide</h2>
          {[
            { title: 'Video Camera Inspection', desc: 'Snake a camera through your system to see corrosion, cracks, and root intrusion without digging.' },
            { title: 'Whole-Home Repiping (PEX)', desc: 'Replace galvanized with modern cross-linked polyethylene — faster install, longer life, no corrosion.' },
            { title: 'Slab Leak Detection & Repair', desc: 'Electronic leak detection pinpoints under-slab breaks so tunneling or rerouting is minimally invasive.' },
            { title: 'Foundation-Aware Rerouting', desc: 'When clay soil movement damages lines, we reroute above-slab where possible to avoid future breaks.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontSize: 20, marginTop: 2 }}>✓</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Connect With a Garland Plumbing Specialist
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk matches you with licensed Garland plumbers who specialize in aging home systems.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get Free Quote
          </button>
        </div>

      </div>
    </div>
  );
}
