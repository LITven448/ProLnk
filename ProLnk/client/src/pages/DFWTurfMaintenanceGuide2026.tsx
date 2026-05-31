import { useState } from 'react';

export default function DFWTurfMaintenanceGuide2026() {
  const [grassType, setGrassType] = useState('');
  const [result, setResult] = useState('');

  const getSchedule = () => {
    if (!grassType) { setResult('Please select your grass type.'); return; }
    const schedules: Record<string, string> = {
      bermuda: `🟡 Bermuda Monthly DFW Schedule:

• Jan–Feb: Dormant. No mowing. Spot-treat winter weeds.
• March: Pre-emergent crabgrass (when soil hits 55°F). First mow at 1.5 inches.
• April: Fertilize 32-0-10. Mow every 7 days at 1.5 inches.
• May–Aug: Mow every 5–7 days at 1–1.5 inches. Fertilize monthly 32-0-10. Water 1 inch/week.
• September: Potassium boost (0-0-50). Slow mowing to every 10 days.
• Oct–Nov: Last fertilizer before dormancy. Raise mow height to 2 inches.
• December: Dormant. Optional overseeding with ryegrass for winter color.`,
      staugustine: `🟣 St. Augustine Monthly DFW Schedule:

• Jan–Feb: Dormant. No fertilizer. Spot-treat broadleaf weeds carefully.
• March: First mow 3.5 inches. Apply pre-emergent (avoid simazine near trees).
• April: Fertilize 15-5-10 slow-release. Mow every 10 days.
• May–Aug: Mow every 7–10 days at 3.5–4 inches. Watch for chinch bugs weekly. Water 1–1.5 inches.
• September: Reduce nitrogen. Apply potassium 0-0-50 for root strength.
• Oct–Nov: Raise mow height to 4 inches. Last feed before dormancy.
• December: Dormant. Inspect for gray leaf spot or brown patch.`,
      zoysia: `🟢 Zoysia Monthly DFW Schedule:

• Jan–Feb: Dormant. No action needed. Best grass for DFW winter dormancy.
• March: Pre-emergent application. First mow at 1.5 inches when actively growing.
• April–May: Fertilize 15-5-10. Mow every 12–14 days at 1.5–2 inches.
• June–Aug: Mow every 10–14 days. Fertilize once mid-summer. Water 0.5–0.75 inches/week.
• September: Zoysia stays green longer than Bermuda — maintain mowing through October.
• Oct–Nov: Final mow at 1.5 inches. Light potassium feed for winter hardiness.
• December: Semi-dormant. May hold some green until first hard freeze.`,
    };
    setResult(schedules[grassType] || 'Select a valid grass type.');
  };

  const mowingData = [
    { grass: '🟡 Bermuda', height: '1–2 inches', freq: 'Every 5–7 days', season: 'Apr–Oct' },
    { grass: '🟣 St. Augustine', height: '3–4 inches', freq: 'Every 7–10 days', season: 'Apr–Nov' },
    { grass: '🟢 Zoysia', height: '1.5–2 inches', freq: 'Every 10–14 days', season: 'Apr–Nov' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE - DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Turf Management Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Professional-level turf care for DFW homeowners. Month-by-month schedules by grass type.</p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 13 }}>MOWING QUICK REFERENCE - DFW</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr style={{ background: '#0d1f3c' }}>
              {['Grass', 'Mow Height', 'Frequency', 'Active Season'].map(h => <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>)}
            </tr></thead>
            <tbody>{mowingData.map((r, i) => (
              <tr key={r.grass} style={{ background: i % 2 === 0 ? '#0d1f3c' : '#0A1628' }}>
                <td style={{ padding: '8px 12px', fontWeight: 700 }}>{r.grass}</td>
                <td style={{ padding: '8px 12px', color: '#F5E642' }}>{r.height}</td>
                <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.freq}</td>
                <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.season}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Get your monthly DFW turf schedule:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[['🟡 Bermuda', 'bermuda'], ['🟣 St. Augustine', 'staugustine'], ['🟢 Zoysia', 'zoysia']].map(([label, val]) => (
            <button key={val} onClick={() => setGrassType(val)} style={{ padding: '16px 12px', border: grassType === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: grassType === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>{label}</button>
          ))}
        </div>

        <button onClick={getSchedule} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get My Monthly Turf Schedule ➜</button>
        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.9, whiteSpace: 'pre-line', fontSize: 14 }}>{result}</div>}

        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['🧪 NPK for DFW Clay', 'Spring: 32-0-10 (Bermuda). Summer: 15-5-10 (all types). Fall: 0-0-50 potassium for winter hardiness. Avoid high-P in DFW — clay retains phosphorus.'],['💧 Watering Rule', '1 inch/week for Bermuda & St. Augustine. 0.5–0.75 for Zoysia. Water 2x deep sessions vs 7x shallow. DFW clay needs slow absorption — avoid runoff.']].map(([title, desc]) => (
            <div key={title as string} style={{ padding: 14, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Hire a DFW Turf Pro</div>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}