import { useState } from 'react';

export default function DFWHVACScrollCompressor2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { value: 'new', label: 'Shopping for a new DFW AC system' },
    { value: 'loud', label: 'Current unit is noisy/loud' },
    { value: 'fails', label: 'Compressor failing in DFW heat' },
    { value: 'eff', label: 'Want maximum efficiency for DFW summers' },
    { value: 'old', label: 'Have an older reciprocating compressor' },
  ];

  const outcomes: Record<string, { title: string; body: string; stat: string }> = {
    new: { title: 'Specify Scroll Compressor', body: 'All quality DFW residential systems now use scroll compressors. Two interlocking spirals compress refrigerant with zero reciprocating motion — fewer parts means fewer failures during DFW’s brutal summers.', stat: '70% fewer moving parts vs reciprocating' },
    loud: { title: 'Scroll is the Fix', body: 'Scroll compressors run at ~60-68 dB — significantly quieter than the 72-82 dB of older reciprocating units. If your DFW unit is loud, the compressor type is likely the cause.', stat: '8-14 dB quieter than reciprocating' },
    fails: { title: 'Scroll Runs Hotter, Longer', body: 'DFW routinely hits 105°F+ and runs AC for 6+ months. Scroll compressors have better heat tolerance and handle high-load continuous operation that kills reciprocating units.', stat: 'Designed for continuous high-heat operation' },
    eff: { title: 'Scroll Wins on SEER2', body: 'Scroll compression achieves higher SEER2 ratings because it compresses refrigerant more completely and with less energy waste. In DFW’s long cooling season, efficiency compounds fast.', stat: '15-20% more efficient at peak load' },
    old: { title: 'Upgrade is Worth It in DFW', body: 'If your reciprocating compressor is over 10 years old in DFW conditions, replacement with scroll technology pays back in 4-6 years via energy savings alone — faster if your unit runs 8+ hours/day.', stat: '4-6 year payback in DFW climate' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌀</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Scroll Compressor Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Why scroll compressors dominate DFW residential HVAC — and what it means for you</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🌀', label: 'How It Works', value: '2 interlocking spirals' },
            { icon: '🔇', label: 'Sound Level', value: '60-68 dB (very quiet)' },
            { icon: '📉', label: 'Moving Parts', value: '70% fewer than reciprocating' },
            { icon: '🌡️', label: 'DFW Heat Tolerance', value: 'Superior — built for it' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🔍 Your DFW Situation → Scroll Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => { setSituation(s.value); setResult(s.value); }} style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${situation === s.value ? '#F5E642' : '#1e3a5f'}`, background: situation === s.value ? '#F5E642' : '#0A1628', color: situation === s.value ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
        </div>

        {result && outcomes[result] && (
          <div style={{ background: '#0F3D1F', borderRadius: 16, padding: 28, border: '1px solid #22543d' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>✅ {outcomes[result].title}</h3>
            <p style={{ color: '#86efac', marginBottom: 12 }}>{outcomes[result].body}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>📊 Key stat: </span>
              <span style={{ color: '#4ade80' }}>{outcomes[result].stat}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, marginTop: 16 }}>ProLnk connects you with DFW HVAC pros who stock scroll-based systems from Carrier, Trane, Lennox, and Daikin.</p>
          </div>
        )}
      </div>
    </div>
  );
}