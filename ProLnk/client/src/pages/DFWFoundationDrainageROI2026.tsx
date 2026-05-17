import { useState } from 'react';

export default function DFWFoundationDrainageROI2026() {
  const [consideration, setConsideration] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!consideration) { setResult('Please select your situation.'); return; }
    if (consideration === 'active-issues') {
      setResult('🚨 HIGH ROI — You already have foundation movement indicators. Drainage investment now costs $3K-8K and prevents $8K-25K repairs. Every month of delay increases repair scope. Get a ProLnk drainage assessment immediately.');
    } else if (consideration === 'pooling') {
      setResult('⚠️ STRONG ROI — Standing water near your foundation is a slow-moving threat. DFW clay expands when wet and can push your slab. A French drain ($3K-6K) eliminates this risk and adds resale value.');
    } else if (consideration === 'selling') {
      setResult('✅ INVESTMENT POSITIVE — DFW buyers and inspectors know foundation drainage. Documented drainage system adds $5K-15K to perceived value and eliminates the #1 buyer concern in clay-soil markets.');
    } else if (consideration === 'new-home') {
      setResult('✅ PROACTIVE WIN — New DFW homes without drainage are at risk the moment heavy rain hits. Installing before problems emerge is $2K-4K cheaper than reactive installation after damage.');
    } else if (consideration === 'no-issues') {
      setResult('📊 LONG-TERM VALUE — No current issues is the best time to install. Drainage on healthy DFW foundations maintains that health. Consider it insurance: $4K now vs $15K+ repair + disruption later.');
    } else {
      setResult('DFW clay soil makes drainage the highest-ROI home investment available. French drains prevent the most common and expensive DFW home repair: foundation issues.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>💰 Drainage ROI for DFW Foundations</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW clay soil makes foundation drainage one of the highest-return home investments available.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 DFW Drainage Cost vs. Repair Cost</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { label: 'French Drain Installation', cost: '$3,000 – $8,000', type: 'investment' },
              { label: 'Foundation Pier Repair (avg DFW)', cost: '$8,000 – $25,000', type: 'repair' },
              { label: 'Foundation Replacement', cost: '$30,000 – $80,000', type: 'repair' },
              { label: 'Home Value Impact (drainage documented)', cost: '+$5,000 – $15,000', type: 'gain' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#1a2f4a', borderRadius: 8 }}>
                <span style={{ fontSize: 14 }}>{item.label}</span>
                <span style={{ color: item.type === 'investment' ? '#F5E642' : item.type === 'gain' ? '#4ade80' : '#f87171', fontWeight: 700, fontSize: 14 }}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 ROI Assessment for Your Situation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Your DFW Foundation Situation</label>
            <select value={consideration} onChange={e => setConsideration(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select your situation...</option>
              <option value="active-issues">Already seeing foundation cracks or door issues</option>
              <option value="pooling">Water pools near foundation after rain</option>
              <option value="selling">Planning to sell in 1-3 years</option>
              <option value="new-home">Bought in last 2 years, no drainage installed</option>
              <option value="no-issues">No current issues, thinking proactively</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Calculate My ROI Case
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk DFW Drainage & Foundation Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Get matched with vetted local drainage specialists. Free estimates.</div>
        </div>
      </div>
    </div>
  );
}