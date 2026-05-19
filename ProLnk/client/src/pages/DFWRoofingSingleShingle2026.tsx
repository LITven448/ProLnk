import { useState } from 'react';

export default function DFWRoofingSingleShingle2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!situation) { setResult('Please select a situation.'); return; }
    if (situation === 'isolated-hail') {
      setResult('✅ SINGLE REPLACEMENT OK — An isolated hail bruise with intact surrounding shingles is a good candidate for spot repair. Best done when temps are 60-80°F. Use matching shingle, roofing nails, and seal with roofing caulk.');
    } else if (situation === 'blow-off') {
      setResult('✅ SINGLE REPLACEMENT OK — A wind blow-off is textbook single shingle repair. Slide flat bar under overlapping shingles, remove old nails, slide new shingle in, nail and seal edges.');
    } else if (situation === 'widespread') {
      setResult('🚨 FULL SECTION REPAIR NEEDED — Widespread damage means underlying decking or multiple shingles are affected. Single replacement won’t address the root cause. Get a ProLnk roofer assessment.');
    } else if (situation === 'old-roof') {
      setResult('⚠️ REPLACEMENT MAY BE BETTER — If the roof is 15+ years old, matching shingles is difficult and patching prolongs an aging system. A ProLnk roofer can give you a patch vs. replace cost comparison.');
    } else if (situation === 'cold') {
      setResult('⚠️ TIMING ISSUE — DFW shingles become brittle below 40°F and crack during installation. Wait for a 60°F+ day or have a pro handle it with proper technique.');
    } else {
      setResult('Assess the scope of damage first. If fewer than 3 adjacent shingles are affected and the decking is intact, single replacement is usually viable.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>🏚️ Single Shingle Replacement in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Sometimes one shingle is all that needs replacing. Here's when that’s true — and when it’s not enough.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌡️ DFW Temperature Factor</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { temp: 'Below 40°F', status: '🚫 Too Cold', note: 'Shingles crack and won’t seal. Wait for warmer weather.' },
              { temp: '60–80°F', status: '✅ Ideal', note: 'Shingles are pliable, seal correctly, easiest installation.' },
              { temp: 'Above 90°F', status: '⚠️ Challenging', note: 'Shingles are sticky and soft — walk carefully. Early morning only.' },
            ].map(item => (
              <div key={item.temp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#1a2f4a', borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.temp}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.note}</div>
                </div>
                <span style={{ fontWeight: 700 }}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔨 Repair Decision Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Your DFW Shingle Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select situation...</option>
              <option value="isolated-hail">Isolated hail bruise (1-2 shingles)</option>
              <option value="blow-off">Wind blow-off (shingle missing)</option>
              <option value="widespread">Widespread damage across multiple areas</option>
              <option value="old-roof">Roof is 15+ years old</option>
              <option value="cold">Cold weather — below 50°F right now</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get Repair Decision
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk DFW Roofing Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Licensed, local, no storm chasers. Fast match during hail season.</div>
        </div>
      </div>
    </div>
  );
}