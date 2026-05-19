import { useState } from 'react';

export default function DFWHVACHeatRecovery2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { label: 'New tight construction home', value: 'new' },
    { label: 'Humid summers, dry winters', value: 'both' },
    { label: 'High indoor humidity only', value: 'humid' },
    { label: 'Dry air only (rare in DFW)', value: 'dry' },
    { label: 'Poor indoor air quality', value: 'iaq' },
  ];

  const results: Record<string, { unit: string; reason: string; savings: string }> = {
    new: { unit: 'ERV', reason: 'Tight construction traps stale air — ERV delivers fresh air while recapturing 70-80% of conditioned energy', savings: 'Save 25-40% vs running fresh air without recovery' },
    both: { unit: 'ERV', reason: 'ERV transfers both heat AND moisture — perfect for DFW which swings from 90% humidity in summer to 30% in winter', savings: 'Handles both seasons without adjustment' },
    humid: { unit: 'ERV', reason: 'ERV manages moisture transfer, preventing indoor humidity from spiking when bringing in summer DFW air', savings: 'Reduces AC load by managing latent heat' },
    dry: { unit: 'HRV', reason: 'HRV transfers heat only — works in climates where extra moisture is never wanted, rare for DFW but valid in specific cases', savings: 'Lower cost when moisture management not needed' },
    iaq: { unit: 'ERV', reason: 'ERV brings in continuous fresh outside air, diluting VOCs, CO2, and allergens without wasting energy', savings: 'IAQ improvement with minimal operating cost' },
  };

  const handleCheck = () => {
    if (situation && results[situation]) setResult(situation);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Heat Recovery Ventilator Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>ERV vs HRV — which ventilator is right for your DFW home?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '♻️', label: 'Energy Recovery', value: '70-80% captured' },
            { icon: '💧', label: 'ERV Moisture Transfer', value: 'Yes — critical for DFW' },
            { icon: '🌡️', label: 'HRV Moisture Transfer', value: 'No — heat only' },
            { icon: '🏠', label: 'DFW Winner', value: 'ERV in almost all cases' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🔍 DFW Situation → ERV vs HRV Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Select your DFW home situation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.value} onClick={() => setSituation(s.value)} style={{ padding: '12px 16px', borderRadius: 8, border: , background: situation === s.value ? '#F5E642' : '#0A1628', color: situation === s.value ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{s.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My Recommendation</button>
        </div>

        {result && results[result] && (
          <div style={{ background: '#0F3D1F', borderRadius: 16, padding: 28, border: '1px solid #22543d' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>✅ Recommended: {results[result].unit}</h3>
            <p style={{ color: '#86efac', marginBottom: 8 }}>{results[result].reason}</p>
            <p style={{ color: '#4ade80', fontWeight: 700 }}>💰 {results[result].savings}</p>
            <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 16 }}>ProLnk connects you with DFW HVAC pros who specialize in ventilation systems — get 3 quotes, compare, decide.</p>
          </div>
        )}
      </div>
    </div>
  );
}