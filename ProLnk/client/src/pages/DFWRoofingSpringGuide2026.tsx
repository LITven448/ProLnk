import { useState } from 'react';

const situations = [
  { id: 'post-hail', label: '⛈️ After a Hail Event', priority: 'Urgent', steps: ['Inspect from ground with binoculars first — bruised shingles show dark spots', 'Check gutters and downspouts for granule accumulation', 'Look for dented metal ridge caps or flashing', 'File insurance claim within 30 days of event — DFW adjusters are swamped April-June'] },
  { id: 'cottonwood', label: '🌿 Cottonwood Season (May)', priority: 'Weekly', steps: ['Clear cottonwood fluff from gutters every 7-10 days in May', 'Check that downspout screens are not clogged', 'Inspect HVAC condenser coils — cottonwood blocks airflow rapidly', 'Remove fluff from roof valleys where it holds moisture'] },
  { id: 'spring-rain', label: '🌧️ After Spring Rain Streak', priority: 'Moderate', steps: ['Inspect all flashings (chimney, skylights, pipe boots) for lifted edges', 'Check attic for daylight penetration or moisture stains', 'Look for shingle lifting at eaves — spring winds curl edges', 'Ensure ridge vents are clear and unobstructed'] },
  { id: 'winter-damage', label: '❄️ Check Winter Moisture', priority: 'Seasonal', steps: ['Enter attic and look for black mold staining on decking or rafters', 'Check insulation for compression or wet spots', 'Inspect gable vents — January ice storms sometimes crack them', 'Ensure attic ventilation ratio is adequate: 1 sq ft per 150 sq ft'] },
];

export default function DFWRoofingSpringGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = situations.find(s => s.id === selected);
  const pColor = (p: string) => ({ Urgent: '#e74c3c', Weekly: '#F5E642', Moderate: '#3498db', Seasonal: '#27ae60′ }[p] || '#fff');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          🏠 DFW SPRING ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Spring Roofing Priorities</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          April–June is DFW's peak hail season. Cottonwood clogs gutters weekly in May. Spring rains stress every flashing and seam. Here’s your seasonal playbook.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⛈️', label: 'Hail Season', val: 'April – June' },
            { icon: '🌿', label: 'Cottonwood Peak', val: 'May (weekly clogs)' },
            { icon: '💨', label: 'Wind Gusts', val: 'Up to 70 mph spring storms' },
            { icon: '🔍', label: 'Avg Claims Filed', val: '40K+ DFW per spring' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔎 Select Your Spring Situation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left', fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${pColor(result.priority)}` }}>
              <div style={{ fontWeight: 700, color: pColor(result.priority), marginBottom: 10 }}>Priority: {result.priority}</div>
              {result.steps.map(step => (
                <div key={step} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cbd5e1′ }}>
                  <span>→</span><span>{step}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628′ }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 Document Every Roof Inspection in Your Home Health Vault</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>ProLnk logs hail events, contractor visits, and inspection dates — making your insurance claims and future home sales dramatically easier.</div>
        </div>
      </div>
    </div>
  );
}