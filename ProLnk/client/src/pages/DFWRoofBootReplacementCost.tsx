import { useState } from 'react';

const boots = [
  { type: 'Neoprene', cost: '$75–120', life: '15–20 yrs', note: 'Standard, most common in DFW' },
  { type: 'EPDM', cost: '$90–150', life: '20–30 yrs', note: 'Better UV resistance for DFW sun' },
  { type: 'Lead', cost: '$120–200', life: '30–50 yrs', note: 'Premium, used on older DFW homes' },
];

export default function DFWRoofBootReplacementCost() {
  const [sqft, setSqft] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState<null | { count: number; low: number; high: number; strategy: string }>(null);

  function calculate() {
    const s = parseInt(sqft) || 0;
    const a = parseInt(age) || 0;
    if (!s) return;
    const count = Math.round(s / 500);
    const low = count * 75;
    const high = count * 200;
    const strategy = a >= 15
      ? 'Replace all boots at once — at this roof age it is cost-effective to do them together and avoid repeat labor charges.'
      : 'Replace only failed boots now. Your roof is newer so boots still have service life remaining.';
    setResult({ count, low, high, strategy });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ROOF GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Pipe Boot Replacement Cost in DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: 32 }}>
          Roof pipe boots seal where plumbing vents exit your roof. In DFW's heat and UV exposure, neoprene boots degrade faster than most markets — making this one of the most common roof repairs in the Metroplex.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 32, fontWeight: 700 }}>
          📌 Average DFW cost: $75–$200 per boot · Most homes have 4–8 boots
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Boot Types Compared</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {boots.map(b => (
            <div key={b.type} style={{ background: '#111F3A', borderRadius: 8, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{b.type} Boot</div>
                <div style={{ color: '#8A9BB5', fontSize: 13 }}>{b.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.cost}</div>
                <div style={{ color: '#8A9BB5', fontSize: 12 }}>lifespan: {b.life}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔧 Estimate Your Boot Replacement Cost</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Home Size (sq ft)</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2200″ style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Roof Age (years)</label>
              <input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 12″ style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Calculate Boot Estimate</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Estimated {result.count} boots · \${result.low.toLocaleString()}–\${result.high.toLocaleString()} total</div>
              <div style={{ color: '#8A9BB5', fontSize: 14 }}>{result.strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111F3A', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Warning Signs</div>
          <ul style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Cracked or peeling neoprene collar around vent pipe</li>
            <li>Water stains on ceiling near bathrooms or kitchen</li>
            <li>Boots over 15 years old — DFW UV accelerates aging</li>
            <li>Any boots that look shrunk away from the pipe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
