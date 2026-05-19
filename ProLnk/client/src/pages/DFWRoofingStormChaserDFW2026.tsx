import { useState } from 'react';

export default function DFWRoofingStormChaserDFW2026() {
  const [flags, setFlags] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const redFlags = [
    { id: 'oos', label: 'Out-of-state vehicle registration', weight: 25 },
    { id: 'card', label: 'Business card appears freshly printed', weight: 15 },
    { id: 'sign', label: 'Pressuring you to sign immediately', weight: 25 },
    { id: 'adj', label: 'Claims adjuster hasn’t been out yet', weight: 20 },
    { id: 'ded', label: 'Offering to waive your deductible (illegal in TX)', weight: 30 },
    { id: 'same', label: 'Offering free inspection AND same-day repair', weight: 20 },
    { id: 'door', label: 'Going door-to-door right after storm', weight: 15 },
  ];

  const toggle = (id: string, weight: number) => {
    setScore(null);
    setFlags(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const calculate = () => {
    const total = flags.reduce((sum, id) => {
      const f = redFlags.find(r => r.id === id);
      return sum + (f ? f.weight : 0);
    }, 0);
    setScore(Math.min(total, 100));
  };

  const risk = score === null ? null : score >= 60 ? { label: 'HIGH RISK — Storm Chaser', color: '#ef4444', advice: 'Do not sign anything. Call ProLnk to connect with a licensed DFW roofer.' } : score >= 30 ? { label: 'MODERATE RISK — Proceed with Caution', color: '#f59e0b', advice: 'Verify license at TDLR.texas.gov before any agreement.' } : { label: 'LOWER RISK', color: '#4ade80', advice: 'Still verify their Texas roofing license and check reviews.' };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌪️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Storm Chaser ID Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>The definitive red flag checklist — protect your home after every DFW storm</p>
        </div>

        <div style={{ background: '#3D0F0F', borderRadius: 12, padding: 20, border: '1px solid #7f1d1d', marginBottom: 28 }}>
          <p style={{ color: '#fca5a5', margin: 0, fontWeight: 600 }}>⚠️ Texas Law: Waiving a deductible is insurance fraud. Any contractor who offers this is breaking the law — and putting YOU at legal risk.</p>
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🚩 Check Every Red Flag You Observe</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {redFlags.map(f => (
              <button key={f.id} onClick={() => toggle(f.id, f.weight)} style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${flags.includes(f.id) ? '#ef4444' : '#1e3a5f'}`, background: flags.includes(f.id) ? '#3D0F0F' : '#0A1628', color: flags.includes(f.id) ? '#fca5a5′ : '#fff', cursor: ’pointer', textAlign: 'left', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>{flags.includes(f.id) ? '🚩 ' : '⬜ '}{f.label}</span>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>+{f.weight}pts</span>
              </button>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Calculate Storm Chaser Risk Score</button>
        </div>

        {risk && score !== null && (
          <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: `2px solid ${risk.color}` }}>
            <h3 style={{ color: risk.color, marginTop: 0, fontSize: 24 }}>Risk Score: {score}/100</h3>
            <p style={{ color: risk.color, fontWeight: 700, fontSize: 18 }}>{risk.label}</p>
            <p style={{ color: '#94a3b8′ }}>{risk.advice}</p>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 16 }}>ProLnk only works with licensed, verified Texas roofing contractors — zero storm chasers, guaranteed.</p>
          </div>
        )}
      </div>
    </div>
  );
}