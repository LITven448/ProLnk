import { useState } from 'react';

export default function DFWWaterMeterGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!homeAge) { setResult('Please select your home age.'); return; }
    const age = parseInt(homeAge);
    if (age <= 15) setResult('✅ LOW RISK (Built after 2010): Modern homes use HDPE or PVC main lines. Smart meter likely installed by your city. Locate your main shutoff — it should be a ball valve on the inside of the home near where the line enters. Test it annually to make sure it turns freely.');
    else if (age <= 30) setResult('⚠️ MODERATE RISK (Built 1995–2010): Some 1990s DFW builds used polybutylene (gray plastic) pipe — subject to a national class-action recall. Check your main line where it enters the home. Gray flexible pipe = polybutylene = needs replacement ($3,000–6,000). PVC or copper is fine.');
    else if (age <= 45) setResult('⚠️ ELEVATED RISK (Built 1980–1995): High probability of polybutylene if built 1985–1995. Also check for an older, non-ball-style main shutoff (gate valve or wheel valve) — these seize and fail. Upgrade to a ball valve shutoff for $200–350. Get a leak detection inspection.');
    else setResult('🚨 HIGH RISK (Built before 1980): Cast iron or galvanized steel main lines are likely. These corrode from the inside, reducing flow and causing discoloration. A leak detection plumber can camera-inspect your main line ($300–500). Full main line replacement from street to home: $4,000–8,000. Many DFW water utilities will replace up to the meter for free — call your city.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💧 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Water Meter & Main Line Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>From smart meters to polybutylene recalls, your water main is the most overlooked plumbing risk in DFW. Know what you have before it fails.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{icon:'📡',label:'Smart meters in DFW',val:'Expanding'},{icon:'🏘️',label:'Poly recall era',val:'1985–1995'},{icon:'💰',label:'Main line replace',val:'$4,000–8,000'}].map(c=>(
            <div key={c.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem' }}>{c.val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Water Main Risk Assessment</h2>
          <select value={homeAge} onChange={e=>setHomeAge(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Select home age...</option>
            <option value="10″>Built after 2010 (under 15 years)</option>
            <option value="20″>Built 1995–2010 (15–30 years)</option>
            <option value="38″>Built 1980–1995 (30–45 years)</option>
            <option value="50″>Built before 1980 (45+ years)</option>
          </select>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Assess My Risk</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 What to Know About Your Main Line</h3>
          {['Main shutoff should be a ball valve inside the home — locate it before an emergency','City of Dallas replaces the main up to the meter at no cost in some cases — ask','Polybutylene (gray plastic, 1985–1995) is under class-action recall — replace it','Smart meters let cities detect leaks before your bill spikes — many DFW cities upgrading now','Underground main line leak signs: wet spots in yard, high water bills, low pressure'].map((s,i)=>(
            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#F5E642′ }}>›</span>
              <span style={{ color: '#cbd5e1′ }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
