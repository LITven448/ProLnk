import { useState } from 'react';

const ENTRY_POINTS = [
  { icon: '🔩', label: 'Pipe Boots', desc: 'Most common DFW leak source — rubber boots around plumbing vents crack in TX heat (100°F+ summers)' },
  { icon: '📐', label: 'Valley Flashing', desc: 'Water concentrates in roof valleys — improper overlap or corroded metal causes leaks' },
  { icon: '🪜', label: 'Step Flashing', desc: 'Where roof meets a wall or chimney — individual step flashing pieces can slip or corrode' },
  { icon: '🌬️', label: 'Ridge Cap Shingles', desc: 'Wind uplift from DFW storms can lift ridge caps — exposed ridge deck leaks under rain' },
  { icon: '🌀', label: 'HVAC Curb/Flashing', desc: 'Flat or low-pitch sections with rooftop units — sealant around curbs degrades in DFW UV' },
  { icon: '🪟', label: 'Skylight Seals', desc: 'Thermal expansion cycles in DFW crack skylight flashing sealant within 5-7 years' },
];

const SYMPTOMS = [
  { id: 'stain', label: 'Ceiling Stain Location', options: ['Center of ceiling', 'Near exterior wall', 'Near chimney / fireplace', 'Near HVAC vent', 'Along ridge line'] },
  { id: 'timing', label: 'When Does Leak Appear', options: ['During heavy rain only', 'After any rain', 'Wind-driven rain only', 'Days after rain stops', 'No obvious trigger'] },
];

const DIAGNOSES: Record<string, string> = {
  'Center of ceiling_During heavy rain only': 'Likely pipe boot failure — inspect all pipe penetrations on roof directly above this area',
  'Center of ceiling_After any rain': 'Could be valley flashing or compromised field shingles — inspect from attic with flashlight',
  'Near exterior wall_During heavy rain only': 'Step flashing most likely — check where roof meets siding or chimney',
  'Near exterior wall_After any rain': 'Step flashing or siding-to-roof transition — may need siding contractor + roofer',
  'Near chimney / fireplace_During heavy rain only': 'Counter flashing failure — mortar joints on chimney flashing may need re-pointing',
  'Near chimney / fireplace_After any rain': 'Chimney cap or cricket (saddle) may be missing — water pools behind chimney',
  'Near HVAC vent_During heavy rain only': 'HVAC curb flashing or collar — have roofer inspect unit flashing and sealant',
  'Near HVAC vent_After any rain': 'Condensate line backup or HVAC drain pan — check both roof flashing and mechanical unit',
  'Along ridge line_Wind-driven rain only': 'Ridge cap shingles lifted by wind — inspect for raised or missing ridge caps after storm',
  'Along ridge line_After any rain': 'Ridge cap nailing or sealant failure — full ridge cap replacement may be needed',
  'Days after rain stops': 'Water is traveling far from entry point along rafters or decking — attic inspection with flashlight required',
  'No obvious trigger': 'May be condensation, not a leak — check attic ventilation and insulation before calling a roofer',
};

export default function DFWRoofingLeakDiagnosis2026() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [diagnosis, setDiagnosis] = useState<null | string>(null);

  function diagnose() {
    const stain = answers['stain'] || '';
    const timing = answers['timing'] || '';
    const key1 = `${stain}_${timing}`;
    const key2 = timing;
    const result = DIAGNOSES[key1] || DIAGNOSES[key2] || 'Have a professional roofer perform a full inspection — multiple factors may be at play in your DFW home.';
    setDiagnosis(result);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌧️</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roof Leak Diagnosis Guide 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Finding roof leak sources in DFW homes — water travels along rafters and decking before dripping, making the visible stain often far from the actual entry point.</p>

        <div style={{ background: '#EF444411', border: '1px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 6 }}>⚠️ Critical DFW Roof Leak Fact</div>
          <div style={{ color: '#E8EDF5', fontSize: 14 }}>The ceiling stain is rarely directly under the leak. Water enters, runs down rafters, travels along the decking, and drips at the lowest point — sometimes 10–15 feet from entry. Always trace from the attic, not the ceiling.</div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Common DFW Roof Leak Entry Points</h2>
          {ENTRY_POINTS.map(e => (
            <div key={e.label} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{e.icon}</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{e.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔬 Leak Source Diagnosis Tool</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SYMPTOMS.map(s => (
              <div key={s.id}>
                <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>{s.label}</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.options.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '8px 12px', background: answers[s.id] === opt ? '#F5E64211' : '#0A1628', border: `1px solid ${answers[s.id] === opt ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8 }}>
                      <input type="radio" name={s.id} value={opt} checked={answers[s.id] === opt} onChange={() => setAnswers(a => ({ ...a, [s.id]: opt }))} style={{ accentColor: '#F5E642' }} />
                      <span style={{ fontSize: 14 }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={diagnose}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 4 }}>
              Diagnose My DFW Roof Leak
            </button>
          </div>
          {diagnosis && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔎 Diagnosis Result</div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 14, color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{diagnosis}</div>
              <div style={{ marginTop: 14, padding: '12px 14px', background: '#1E3A5F', borderRadius: 8, fontSize: 13, color: '#94A3B8' }}>
                🛠️ DIY tip: Before calling a roofer, go into the attic with a flashlight after rain and look for water stains on rafters — trace them uphill toward the peak to find the actual entry point.
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW Roofing Contractors · Get matched with a licensed DFW roofer today</div>
      </div>
    </div>
  );
}