import { useState } from 'react';

export default function DFWRepipiingGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [pipeType, setPipeType] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!homeAge || !pipeType) { setResult('Please select both options.'); return; }
    const age = parseInt(homeAge);
    if (pipeType === 'galvanized') setResult('🚨 HIGH RISK: Galvanized steel corrodes from inside out. Budget $10,000-15,000 for full PEX repipe. Schedule inspection immediately.');
    else if (pipeType === 'copper' && age >= 40) setResult('⚠️ MODERATE RISK: Copper pipes 40+ years old develop pinhole leaks in DFW hard water. Get a plumber inspection. Repipe cost: $8,000-12,000.');
    else if (pipeType === 'copper' && age < 40) setResult('✅ LOW RISK: Copper pipes under 40 years typically have 10-20 more years. Monitor for discoloration or low pressure.');
    else if (pipeType === 'pex') setResult('✅ GOOD SHAPE: PEX is flexible, freeze-resistant, and handles DFW hard water well. No repipe needed unless damaged.');
    else setResult('⚠️ UNKNOWN PIPE: Polybutylene (gray plastic) was recalled — repipe immediately. Other materials need professional assessment.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Whole-Home Repipe Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Copper pipes in 1960s–1990s DFW homes are aging out. Galvanized steel corrodes from the inside. Here is what you need to know.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{icon:'🏠',label:'Avg DFW repipe',val:'$11,500'},{icon:'📅',label:'Days to complete',val:'2–4 days'},{icon:'✅',label:'Live in home',val:'Yes, mostly'}].map(c => (
            <div key={c.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem' }}>{c.val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Repipe Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <select value={homeAge} onChange={e=>setHomeAge(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem' }}>
              <option value="">Home age...</option>
              <option value="10">Under 20 years</option>
              <option value="25">20–35 years</option>
              <option value="40">36–50 years</option>
              <option value="60">50+ years</option>
            </select>
            <select value={pipeType} onChange={e=>setPipeType(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem' }}>
              <option value="">Pipe type...</option>
              <option value="copper">Copper</option>
              <option value="galvanized">Galvanized Steel</option>
              <option value="pex">PEX</option>
              <option value="other">Unknown / Other</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Assess My Home</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 What the Repipe Process Looks Like</h3>
          {['Day 1: Plumber maps all supply lines, protects floors and furniture','Day 1-2: New PEX lines run through walls via small access holes','Day 2-3: Old pipes capped, new lines pressurized and tested','Day 3-4: Drywall patched, water restored, final inspection'].map((s,i) => (
            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{i+1}.</span>
              <span style={{ color: '#cbd5e1' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
