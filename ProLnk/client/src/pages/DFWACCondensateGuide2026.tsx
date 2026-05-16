import { useState } from 'react';

export default function DFWACCondensateGuide2026() {
  const [acType, setAcType] = useState('central');
  const [symptom, setSymptom] = useState('none');

  const getDiagnosis = () => {
    if (acType === 'minisplit') return { icon: 'ℹ️', title: 'Mini-Split Info', detail: 'Most mini-splits gravity drain or use a condensate pump — check pump operation and drain path quarterly', color: '#1e3a5f' };
    if (symptom === 'shutdown') return { icon: '🔴', title: 'Float Switch Triggered', detail: 'AC shut off to prevent overflow — your primary drain is clogged. Flush with vinegar + water immediately, check secondary pan', color: '#7f1d1d' };
    if (symptom === 'water') return { icon: '🔴', title: 'Active Overflow', detail: 'Water in secondary pan = emergency. Turn off AC, clear primary drain with wet vac at outdoor termination point', color: '#7f1d1d' };
    if (symptom === 'smell') return { icon: '⚠️', title: 'Algae Growth', detail: 'Musty smell = algae in drain line. Flush with 1 cup white vinegar quarterly — DFW humidity accelerates algae growth', color: '#92400e' };
    return { icon: '✅', title: 'No Issues Detected', detail: 'Maintain with quarterly vinegar flush — DFW humidity runs condensate systems hard year-round', color: '#14532d' };
  };

  const dx = getDiagnosis();

  const tips = [
    { icon: '🧪', title: 'Quarterly Vinegar Flush', detail: 'Pour 1 cup distilled white vinegar into the condensate pan — kills algae before it clogs the line' },
    { icon: '🔌', title: 'Float Switch Check', detail: 'The float switch shuts the system off before overflow — test annually by pouring water in the secondary pan' },
    { icon: '🚿', title: 'Wet Vac Clearing', detail: 'Attach wet vac to outdoor drain termination — pull clogs from the far end for maximum clearing force' },
    { icon: '💧', title: 'Secondary Drain Pan', detail: 'Required by DFW code — if water appears here, your primary is clogged and system is at risk' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>💧 ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Condensate System Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW humidity generates 15-25 gallons of condensate per day — drain maintenance is critical.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {tips.map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🩺 Condensate Symptom Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>AC Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{id: 'central', label: '🏠 Central AC'}, {id: 'minisplit', label: '💨 Mini-Split'}].map(t => (
                <button key={t.id} onClick={() => { setAcType(t.id); setSymptom('none'); }}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                    backgroundColor: acType === t.id ? '#F5E642' : '#0A1628', color: acType === t.id ? '#0A1628' : '#fff' }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {acType === 'central' && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Current Symptom</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  {id: 'none', label: '✅ No Issues'},
                  {id: 'smell', label: '👃 Musty Smell'},
                  {id: 'water', label: '💧 Water in Pan'},
                  {id: 'shutdown', label: '🔴 AC Shut Off'},
                ].map(s => (
                  <button key={s.id} onClick={() => setSymptom(s.id)}
                    style={{ padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                      backgroundColor: symptom === s.id ? '#F5E642' : '#0A1628', color: symptom === s.id ? '#0A1628' : '#fff' }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ backgroundColor: dx.color, borderRadius: 8, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ fontSize: 32 }}>{dx.icon}</div>
              <div><div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{dx.title}</div><div style={{ fontSize: 14, color: '#e2e8f0' }}>{dx.detail}</div></div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Get DFW AC Drain Service</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>Clogged condensate drains are the #1 DFW summer AC call — get it cleared before it overflows</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get Drain Cleared Today →
          </button>
        </div>
      </div>
    </div>
  );
}