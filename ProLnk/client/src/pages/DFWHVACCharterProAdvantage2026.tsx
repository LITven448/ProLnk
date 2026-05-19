import { useState } from 'react';

export default function DFWHVACCharterProAdvantage2026() {
  const [stage, setStage] = useState('');
  const [result, setResult] = useState('');

  const stages = [
    { id: 'new', label: '🆕 New HVAC Tech (0-2 yrs)' },
    { id: 'mid', label: '⚙️ Established Tech (3-7 yrs)' },
    { id: 'veteran', label: '🏆 Veteran / Own Crew (8+ yrs)' },
    { id: 'owner', label: '🏢 HVAC Business Owner' },
  ];

  const results: Record<string, string> = {
    new: 'Charter locks your $149/mo rate before you hit 10 jobs. Your 12% commission on a $6K HVAC install = $720. Build your network now — every tech you recruit earns you overrides for life.',
    mid: 'At your stage, priority matching is everything. Charter pros get first pick of DFW summer emergency calls — the $8K-$15K jobs others miss. 12% on $10K = $1,200/job.',
    veteran: 'Your crew is your multiplier. Each tech you recruit into ProLnk earns you 7% network override on their jobs. 5 techs × $5K/mo = $1,750/mo passive.',
    owner: 'Charter gives your business compound advantage: locked rate, priority queue, 12% commission, and network overrides. At 500 Charter spots, the door closes permanently.',
  };

  function calculate() {
    if (stage) setResult(results[stage]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK CHARTER — DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Charter HVAC Pro Advantage Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Why Charter HVAC pros dominate Dallas-Fort Worth before the waitlist closes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⚡', label: 'Priority Match Queue', desc: 'First call on every summer emergency in DFW — 110°F days drive $8K+ jobs' },
            { icon: '🔒', label: '$149/mo Locked Forever', desc: 'Rate never increases regardless of platform growth or tier changes' },
            { icon: '💰', label: '12% Commission Rate', desc: 'vs 7% Founding tier — $10K install = $1,200 vs $700 difference' },
            { icon: '🌐', label: 'Network Override Income', desc: '7% on every HVAC tech you recruit — passive income that compounds' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚙️ Charter Value Calculator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>Select your career stage:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => { setStage(s.id); setResult(''); }}
                style={{ background: stage === s.id ? '#F5E642′ : '#1e3a5f', color: stage === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={calculate} disabled={!stage}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: stage ? 'pointer' : 'not-allowed', opacity: stage ? 1 : 0.5 }}>
            Show My Charter Advantage →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>🚨 Charter Closes at 500 Applications</div>
          <div style={{ fontSize: 14 }}>DFW HVAC pros — secure your spot before Founding tier opens at higher rates.</div>
        </div>
      </div>
    </div>
  );
}
