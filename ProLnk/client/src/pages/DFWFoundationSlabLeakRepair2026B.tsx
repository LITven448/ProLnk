import { useState } from 'react';

export default function DFWFoundationSlabLeakRepair2026B() {
  const [age, setAge] = useState('pre1985');
  const [severity, setSeverity] = useState('single');

  const matrix: Record<string, Record<string, { method: string; cost: string; why: string; color: string }>> = {
    pre1985: {
      single: { method: 'Spot Repair', cost: '$1,500-2,500', why: 'Cast iron pipe — single repair is cost-effective if isolated', color: '#22c55e' },
      multiple: { method: 'Full Reroute', cost: '$7,000-10,000', why: '40+ yr cast iron failing systemically — reroute now', color: '#ef4444' },
    },
    eighties: {
      single: { method: 'Spot Repair', cost: '$1,800-3,000', why: 'Galvanized or early copper — spot repair if one break', color: '#22c55e' },
      multiple: { method: 'Epoxy or Reroute', cost: '$5,000-9,000', why: 'Multiple pinhole leaks often mean full pipe degradation', color: '#f59e0b' },
    },
    nineties: {
      single: { method: 'Spot Repair', cost: '$1,500-2,500', why: 'Copper pipe, one break is manageable', color: '#22c55e' },
      multiple: { method: 'Epoxy Coating', cost: '$4,000-7,000', why: 'Pinhole pattern in DFW hard water — epoxy lines pipe interior', color: '#f59e0b' },
    },
    post2000: {
      single: { method: 'Spot Repair', cost: '$1,500-2,000', why: 'PEX or newer copper — isolated failure is common', color: '#22c55e' },
      multiple: { method: 'Spot Repair x2 + Monitor', cost: '$3,000-5,000', why: 'Modern materials rarely fail systemically — repair each break', color: '#22c55e' },
    },
  };

  const result = matrix[age]?.[severity] || matrix.nineties.single;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Slab Leak Repair Cost vs Reroute Guide 2026 (Part 2)</h1>
          <p style={{ color: '#94a3b8' }}>The economics of spot repair vs full reroute in DFW homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🏠 Home Age</h3>
            {[{k:'pre1985',l:'Pre-1985'},{k:'eighties',l:'1980s'},{k:'nineties',l:'1990s'},{k:'post2000',l:'2000+'}].map(v => (
              <button key={v.k} onClick={() => setAge(v.k)}
                style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.4rem', borderRadius: '6px',
                  border: age === v.k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                  backgroundColor: age === v.k ? '#1e3a5f' : '#0A1628',
                  color: age === v.k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.l}</button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🔍 Leak Severity</h3>
            {[{k:'single',l:'Single break detected'},{k:'multiple',l:'Multiple leaks / pinholes'}].map(v => (
              <button key={v.k} onClick={() => setSeverity(v.k)}
                style={{ display: 'block', width: '100%', padding: '0.5rem', marginBottom: '0.4rem', borderRadius: '6px',
                  border: severity === v.k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                  backgroundColor: severity === v.k ? '#1e3a5f' : '#0A1628',
                  color: severity === v.k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.l}</button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><span style={{ color: '#94a3b8' }}>Recommended Method</span><div style={{ fontSize: '1.4rem', color: result.color }}>{result.method}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Estimated Cost</span><div style={{ fontSize: '1.4rem', color: '#F5E642' }}>{result.cost}</div></div>
          </div>
          <div style={{ backgroundColor: '#0A1628', padding: '0.75rem', borderRadius: '8px', color: '#94a3b8' }}>💡 {result.why}</div>
        </div>
      </div>
    </div>
  );
}
