import { useState } from 'react';

export default function DFWDustMiteGuide2026() {
  const [severity, setSeverity] = useState<string | null>(null);

  const severities = [
    { id: 'mild', label: '😐 Mild Symptoms', tip: 'Wash bedding weekly at 130°F, encase mattress. Run HEPA purifier in bedroom. DFW spring humidity spikes fuel dust mite populations.' },
    { id: 'moderate', label: '😮 Moderate Allergies', tip: 'Add pillow encasements, remove bedroom carpet (dust mites nest deep in pile). Target indoor humidity below 50% with your HVAC.' },
    { id: 'severe', label: '😰 Severe / Asthmatic', tip: 'Full encasement system (mattress + pillow + box spring), HEPA with CADR >200, dehumidifier to keep RH at 45%. Allergen levels drop 80% below 50% RH.' },
    { id: 'prevention', label: '🛡️ Prevention Only', tip: 'Keep humidity below 50% year-round — DFW spring averages 65% RH which is prime dust mite territory. Monthly HVAC filter checks.' },
  ];

  const facts = [
    { icon: '💧', stat: '>50% RH', label: 'Humidity threshold where dust mites thrive — DFW spring regularly exceeds this' },
    { icon: '🛏️', stat: '1–2M', label: 'Dust mites per mattress in humid climates like DFW' },
    { icon: '🌡️', stat: '130°F', label: 'Water temperature required to kill dust mites in bedding' },
    { icon: '🔬', stat: '0.3mm', label: 'Dust mite size — too small to see, too large for HVAC filters' },
  ];

  const controls = [
    { icon: '🛏️', title: 'Mattress Encasements', desc: 'Allergen-proof zipper encasements block mite access and trap existing populations — most impactful single action' },
    { icon: '🔥', title: 'Hot Wash Bedding', desc: 'Wash sheets, pillowcases, and duvet covers weekly at 130°F minimum — kills mites and removes allergen proteins' },
    { icon: '💨', title: 'Humidity Control', desc: 'Target 45–50% indoor RH — dust mite populations collapse below 50% within 2–3 weeks' },
    { icon: '🌬️', title: 'HEPA Air Purifier', desc: 'Captures airborne mite fecal particles (the actual allergen) — run in bedroom where 1/3 of life is spent' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔬</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Dust Mite Control Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW spring humidity creates ideal dust mite conditions — here is how to fight back</p>
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
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🤧 Select Your Allergy Severity</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {severities.map(s => (
              <button key={s.id} onClick={() => setSeverity(s.id === severity ? null : s.id)}
                style={{ background: severity === s.id ? '#F5E642′ : '#1e3a5f', color: severity === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {severity && (
            <div style={{ background: '#1e3a5f', borderLeft: '4px solid #F5E642', borderRadius: '0 10px 10px 0', padding: 20, marginTop: 16 }}>
              <p style={{ margin: 0, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{severities.find(s => s.id === severity)?.tip}</p>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {controls.map(c => (
            <div key={c.title} style={{ background: '#122040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', margin: '8px 0 6px', fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#122040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>📅 DFW Seasonal Warning</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>March–May and October–November are peak DFW humidity months — dust mite populations spike</p>
          {['Monitor indoor humidity with a $15 hygrometer — keep below 50%','Run HVAC dehumidification mode during high-humidity spring weeks','Vacuum with HEPA-filter vacuum weekly (standard vacuums exhaust mite allergens)','Replace carpet with hard flooring in bedroom for 10x reduction in mite habitat'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>⚠</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
