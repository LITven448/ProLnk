import { useState } from 'react';

export default function DFWVolatileOrganicCompounds2026() {
  const [source, setSource] = useState<string | null>(null);

  const sources = [
    { id: 'carpet', label: '🏠 New Carpet', tip: 'New carpet off-gasses most intensely in first 3–6 months. Ventilate aggressively on installation day and following week. DFW humidity accelerates VOC release — keep AC running to lower RH.' },
    { id: 'paint', label: '🎨 Fresh Paint', tip: 'Traditional paints release VOCs for weeks. Zero-VOC and low-VOC paints eliminate most emissions. Ventilate for 72 hours minimum after painting any room.' },
    { id: 'furniture', label: '🛋️ New Furniture', tip: 'Pressed wood furniture (MDF, particleboard) off-gasses formaldehyde for months. Look for CARB Phase 2 certified products. Air out new pieces in garage 2–3 days before bringing inside.' },
    { id: 'cleaning', label: '🧹 Cleaning Products', tip: 'Many cleaners contain high-VOC solvents. Switch to plant-based or fragrance-free products. Never mix bleach with ammonia — creates toxic chloramine gas.' },
  ];

  const facts = [
    { icon: '🧪', stat: '3–6 mo', label: 'Peak off-gassing period for new carpet in DFW humidity conditions' },
    { icon: '🌡️', stat: '2–5x', label: 'Higher VOC concentration indoors vs outdoors (EPA finding)' },
    { icon: '💧', stat: 'High RH', label: 'DFW humidity accelerates VOC release from building materials' },
    { icon: '🌿', stat: 'Zero-VOC', label: 'Paint category that eliminates formaldehyde and benzene emissions' },
  ];

  const mitigations = [
    { icon: '💨', title: 'Ventilate Aggressively', desc: 'Open windows and run fans on installation day — source-period ventilation removes the most VOCs fastest' },
    { icon: '❄️', title: 'Run AC / Lower Humidity', desc: 'DFW summer humidity spikes VOC release — keep indoor RH below 55% to slow off-gassing rates' },
    { icon: '🌿', title: 'Choose Low-VOC Materials', desc: 'CARB Phase 2 certified pressed wood, zero-VOC paints, and natural fiber carpet dramatically reduce source loading' },
    { icon: '🔬', title: 'HEPA + Activated Carbon', desc: 'Standard HEPA does not capture VOCs — you need activated carbon filter media to adsorb formaldehyde and benzene' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧪</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW VOC Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Volatile organic compounds from carpet, paint, and furniture — and how DFW humidity makes it worse</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.stat} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{f.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>{f.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Select Your VOC Source</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {sources.map(s => (
              <button key={s.id} onClick={() => setSource(s.id === source ? null : s.id)}
                style={{ background: source === s.id ? '#F5E642' : '#1e3a5f', color: source === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {source && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{sources.find(s => s.id === source)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {mitigations.map(m => (
            <div key={m.title} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', margin: '8px 0 6px', fontSize: 15 }}>{m.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>⚠️ DFW-Specific VOC Risks</h2>
          {['DFW summer heat (100°F+) dramatically accelerates off-gassing rates from all sources','High humidity causes pressed wood to absorb moisture and release formaldehyde faster','Renovating in summer? Do major work in fall when cooler temps slow off-gassing','New construction homes in DFW suburbs often have all sources simultaneously — ventilate heavily for 6 months'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>→</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
