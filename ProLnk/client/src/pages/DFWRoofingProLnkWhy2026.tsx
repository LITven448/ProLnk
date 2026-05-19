import { useState } from 'react';

export default function DFWRoofingProLnkWhy2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!concern) { setResult('Please select a concern.'); return; }
    if (concern === 'storm-chasers') {
      setResult('✅ PROLNK SCREENS EVERY CONTRACTOR — No storm chaser passes our verification. Every ProLnk roofer must have a local DFW address, active license, and insurance. We check before they can accept a single job.');
    } else if (concern === 'unlicensed') {
      setResult('✅ LICENSE + INSURANCE VERIFIED — ProLnk requires current Texas roofing license and general liability insurance before activation. We re-verify annually. You see the license number before booking.');
    } else if (concern === 'cant-find-anyone') {
      setResult('⚡ FAST MATCH DURING HAIL SEASON — This is ProLnk’s biggest advantage. Our Charter pros stay on platform year-round. During hail season when everyone else is overloaded, ProLnk matches you within hours — not weeks.');
    } else if (concern === 'up-front-payment') {
      setResult('✅ NO UP-FRONT PAYMENT PRESSURE — ProLnk pros are prohibited from requiring full payment before work starts. Standard: 0% up front, 50% at start, 50% at completion. Any pro asking for full payment up front is flagged.');
    } else if (concern === 'quality') {
      setResult('⭐ PERFORMANCE SCORE RATED — Every ProLnk roofer has a public performance score based on real job ratings. Low-rated pros are removed from the platform. You see the score before you match.');
    } else {
      setResult('ProLnk’s DFW roofing network combines local verification, licensing checks, performance ratings, and fast matching — the combination that storm-chaser directories can’t offer.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>🛡️ Why DFW Homeowners Choose ProLnk Roofers</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          After a DFW hailstorm, finding a trustworthy roofer is harder than the repair itself. Here's how ProLnk solves that.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>✅ The ProLnk Roofing Standard</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { icon: '📍', label: 'Local Address Required', desc: 'Every pro must have a DFW-area business address. No out-of-state storm chasers.' },
              { icon: '📋', label: 'License & Insurance Verified', desc: 'Texas license and liability insurance checked before activation and annually.' },
              { icon: '⭐', label: 'Performance Score System', desc: 'Real job ratings drive ranking. Low performers are removed, not buried.' },
              { icon: '💳', label: 'No Up-Front Payment Pressure', desc: 'ProLnk payment terms protect homeowners. 0% required before work starts.' },
              { icon: '⚡', label: 'Fast Match During Hail Season', desc: 'Charter pros stay active year-round. Get matched in hours, not weeks.' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, padding: '12px', background: '#1a2f4a', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Your Roofing Concern</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>What worries you most about hiring a DFW roofer?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select concern...</option>
              <option value="storm-chasers">Getting scammed by storm chasers</option>
              <option value="unlicensed">Hiring someone unlicensed or uninsured</option>
              <option value="cant-find-anyone">Can't find anyone available after hail</option>
              <option value="up-front-payment">Being pressured for up-front full payment</option>
              <option value="quality">Not knowing if work quality is good</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            See How ProLnk Helps
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get Matched with a ProLnk DFW Roofer</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Local, licensed, performance-rated. Fast match during hail season.</div>
        </div>
      </div>
    </div>
  );
}