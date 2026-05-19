import { useState } from 'react';

const situations = [
  { id: 'addition', label: '🏠 Room addition without existing ducts' },
  { id: 'garage', label: '🚗 Garage or workshop that needs cooling' },
  { id: 'hotroom', label: '🌡️ One room that never cools properly' },
  { id: 'oldHome', label: '🏚️ Older home with radiators or no ductwork' },
  { id: 'newBuild', label: '🏗️ New construction with full ductwork planned' },
];

const challenges = [
  { id: 'extreme', label: '🔥 Extreme heat (above 105°F days)' },
  { id: 'humidity', label: '💧 High humidity / mold concerns' },
  { id: 'noise', label: '🔇 Noise-sensitive room (bedroom/office)' },
  { id: 'bills', label: '💰 High electricity bills' },
];

function getResult(sit: string, challenge: string) {
  const isDucted = sit === 'newBuild';
  const zones = sit === 'oldHome' ? '2–4 zone' : sit === 'hotroom' ? 'Single zone' : '1–2 zone';
  const cost = sit === 'oldHome' ? '$5,000–$14,000' : sit === 'garage' ? '$2,500–$4,500' : '$3,000–$8,000';
  if (isDucted) return { rec: 'Traditional Ducted System', zones: 'Central', cost: '$8,000–$18,000', note: 'With full ducts planned, a central system is more cost-effective at scale. However, consider a hybrid with one mini-split for a bonus room or garage.' };
  return {
    rec: 'Ductless Mini-Split',
    zones,
    cost,
    note: `Mini-splits are ideal for DFW conditions. ${challenge === 'extreme' ? 'Units rated to 115°F+ handle DFW peak days without straining.' : ''} ${challenge === 'humidity' ? 'Mini-splits run longer at lower capacity — better dehumidification than oversized central systems.' : ''} ${challenge === 'noise' ? 'Indoor air handlers are whisper-quiet (19–22 dB). Far better than duct noise.' : ''} ${challenge === 'bills' ? 'Variable-speed compressors use only as much energy as needed — often 30–40% less than central AC.' : ''}`,
  };
}

export default function DFWDuctlessHVACGuide() {
  const [situation, setSituation] = useState('');
  const [challenge, setChallenge] = useState('');
  const result = situation && challenge ? getResult(situation, challenge) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>❄️ DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Ductless Mini-Split Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Mini-splits are no longer a niche product — they're often the smartest HVAC choice for DFW homes with additions, older construction, or specific cooling problems central systems can't solve efficiently.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚡', title: 'DFW Efficiency Win', desc: 'Variable-speed inverter compressors maintain set temp without cycling. Perfect for 95–108°F DFW days.' },
            { icon: '🔇', title: 'Quiet Operation', desc: 'No duct noise, no registers rattling. Air handlers run at 19–22 dB — quieter than a library.' },
            { icon: '🎯', title: 'Zone Control', desc: 'Multi-zone systems let each room set its own temp — no more freezing the living room to cool the master.' },
            { icon: '🏚️', title: 'No Ducts Needed', desc: 'Older DFW homes with hot water heat or no ductwork can get modern AC without expensive duct installation.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</p>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Ductless vs Ducted — Find Your Fit</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your room situation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)} style={{ background: situation === s.id ? '#F5E642' : '#1e3a5f', color: situation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your DFW cooling challenge:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {challenges.map(c => (
              <button key={c.id} onClick={() => setChallenge(c.id)} style={{ background: challenge === c.id ? '#F5E642' : '#1e3a5f', color: challenge === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{c.label}</button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Recommendation: {result.rec}</p>
              <p style={{ color: '#e2e8f0', marginBottom: 4 }}>🏠 Zone configuration: <strong>{result.zones}</strong></p>
              <p style={{ color: '#e2e8f0', marginBottom: 8 }}>💰 DFW installed cost: <strong>{result.cost}</strong></p>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
