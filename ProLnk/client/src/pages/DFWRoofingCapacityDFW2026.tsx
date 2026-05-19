import { useState } from 'react';

export default function DFWRoofingCapacityDFW2026() {
  const [timing, setTiming] = useState('');
  const [result, setResult] = useState('');

  const check = () => {
    if (!timing) { setResult('Please select when your storm occurred.'); return; }
    if (timing === 'immediate') { setResult('0-2 weeks post-storm: Most quality contractors already booked. Expect 4-8 week wait. Beware storm-chaser crews without local reputation.'); return; }
    if (timing === 'two_four') { setResult('2-4 weeks post-storm: Backlog at peak. Charter ProLnk roofers have priority scheduling commitments. Call today to get in queue.'); return; }
    if (timing === 'month') { setResult('1+ month post-storm: Backlog starting to ease. Better contractor availability. Document all damage now — adjuster timelines matter.'); return; }
    setResult('Pre-storm planning: Excellent time to vet and select a contractor. Charter ProLnk roofers offer pre-storm inspections and priority service agreements.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏚️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Roofing Contractor Capacity Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Understanding post-storm contractor availability in DFW</p>
        </div>

        {[{ icon: '🏢', title: '18,000+ DFW Roofing Companies', desc: 'Most are very small — 2-5 crew operations. Quality licensed companies with real crews number in the hundreds, not thousands.' },
          { icon: '⏰', title: 'Post-Storm Booking Reality', desc: 'Quality DFW roofers book 2-8 weeks out after major hail or wind events. The best ones go fast — often within 48 hours.' },
          { icon: '⚠️', title: 'Storm Chasers', desc: 'Out-of-state crews flood DFW after storms. No local license, no local reputation. Avoid door-knockers post-storm.' },
          { icon: '✅', title: 'Charter ProLnk Roofers', desc: 'Committed to faster scheduling for ProLnk homeowners. Pre-vetted, licensed, DFW-based crews only.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>📅 Contractor Availability Check</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>When was your storm?</label>
            <select value={timing} onChange={e => setTiming(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="immediate">0-2 weeks ago</option>
              <option value="two_four">2-4 weeks ago</option>
              <option value="month">1+ month ago</option>
              <option value="pre">No storm yet (planning)</option>
            </select>
          </div>
          <button onClick={check} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Check Availability</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6' }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — Connecting DFW Homeowners with Vetted Roofers 2026</p>
      </div>
    </div>
  );
}
