import { useState } from 'react';

const situations = [
  { id: 'heavy-rain', label: '🌧️ Just Had Heavy Rain', advice: 'Walk your perimeter within 24 hrs. Check all downspout exits — water pooling within 6ft of foundation = immediate action. Clay soil absorbs slowly; surface water lingers 12-36 hrs.', risk: 'High' },
  { id: 'new-crack', label: '🔍 Noticed a New Crack', advice: 'Mark crack ends with pencil and date. Upward movement or horizontal cracks = call engineer. Hairline vertical cracks from settlement are common — monitor for 30 days.', risk: 'Medium' },
  { id: 'door-sticking', label: '🚪 Door Won\’t Close Fully', advice: 'Doors sticking or gaps appearing at corners during wet season = foundation heave from clay saturation. Stop ALL foundation watering immediately. Let soil stabilize before calling a contractor.', risk: 'High' },
  { id: 'watering', label: '💧 Should I Still Water?', advice: 'April-May in DFW: skip watering when weekly rainfall exceeds 1 inch. Clay is likely saturated. Resume light watering only if 2+ weeks dry. Goal: consistent soil moisture, not maximum moisture.', risk: 'Low' },
];

export default function DFWFoundationWetSeason2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = situations.find(s => s.id === selected);
  const riskColor = (r: string) => r === 'High' ? '#e74c3c' : r === 'Medium' ? '#F5E642′ : '#27ae60';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
          🌧️ DFW FOUNDATION WET SEASON 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Spring Wet Season Foundation Care</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          April–May heavy rains saturate DFW's expansive clay soils — creating heave risk that damages slabs from below. Most homeowners water too much in spring.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📅', label: 'Peak Risk Window', val: 'April 15 – May 31′ },
            { icon: '🧱', label: 'DFW Soil Type', val: 'Expansive Black Clay' },
            { icon: '📏', label: 'Max Heave Seen', val: 'Up to 3 inches' },
            { icon: '💧', label: 'Skip Watering When', val: 'Weekly rain > 1 inch' },
          ].map(c => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 2 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔎 What’s Your Situation?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, textAlign: 'left', fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${riskColor(result.risk)}` }}>
              <div style={{ fontWeight: 700, color: riskColor(result.risk), marginBottom: 6 }}>Risk Level: {result.risk}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{result.advice}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📋 After-Rain Inspection Checklist</div>
          {['Check all downspout extensions discharge 6ft+ from foundation', 'Inspect window wells for standing water', 'Look for new cracks on interior walls or tile grout', 'Note any doors or windows that now stick or bind', 'Check crawlspace vents are clear and unblocked'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cbd5e1′ }}>
              <span>✅</span><span>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628′ }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>🏠 Log Foundation Events in Your Home Health Vault</div>
          <div style={{ fontSize: 14, marginTop: 6 }}>ProLnk stores your inspection dates, crack measurements, and contractor visits — giving every future buyer proof your home was maintained right.</div>
        </div>
      </div>
    </div>
  );
}