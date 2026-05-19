import { useState } from 'react';

const phases = [
  {
    phase: 'Phase 1',
    label: '6 Months Out',
    tasks: [
      'Get foundation inspection + documentation (mandatory in DFW)',
      'Schedule HVAC service and tune-up',
      'Order pre-listing home inspection',
      'Deep clean exterior and address curb appeal',
      'Research comparable sales in your neighborhood',
    ],
  },
  {
    phase: 'Phase 2',
    label: '3–4 Months Out',
    tasks: [
      'Complete high-ROI repairs (kitchen hardware, fresh paint, fixtures)',
      'Skip low-ROI projects (pool addition, room additions)',
      'Declutter room by room — less is more for DFW buyers',
      'Schedule professional carpet cleaning or replacement',
      'Pressure wash driveway, sidewalks, and fence',
    ],
  },
  {
    phase: 'Phase 3',
    label: '1–2 Months Out',
    tasks: [
      'Stage key rooms: living room, master bedroom, kitchen',
      'Neutralize paint colors — greige sells in DFW',
      'Replace outdated light fixtures for modern look',
      'Deep clean windows inside and out',
      'Hire professional photographer (non-negotiable)',
    ],
  },
  {
    phase: 'Phase 4',
    label: 'Final 2 Weeks',
    tasks: [
      'Remove personal photos and excess furniture',
      'Add fresh mulch and seasonal color to landscaping',
      'Ensure all lights work and replace burned bulbs',
      'Touch up paint scuffs and trim',
      'Set HVAC to comfortable temp for all showings',
    ],
  },
];

const repairROI = [
  { repair: 'Fresh interior paint', roi: 'High ✅', note: 'Neutral tones only' },
  { repair: 'Kitchen cabinet hardware', roi: 'High ✅', note: 'Cheap, big impact' },
  { repair: 'HVAC tune-up', roi: 'High ✅', note: 'DFW buyers always ask' },
  { repair: 'Foundation documentation', roi: 'Required ⚠️', note: 'Must have in DFW' },
  { repair: 'Landscaping refresh', roi: 'High ✅', note: 'First impressions matter' },
  { repair: 'Full kitchen remodel', roi: 'Low ❌', note: 'Rarely recoup full cost' },
  { repair: 'Pool addition', roi: 'Low ❌', note: 'DFW buyers divided on pools' },
  { repair: 'Sunroom addition', roi: 'Low ❌', note: 'Expensive, low return' },
];

export default function DFWHomeSalePreparationGuide() {
  const [months, setMonths] = useState(6);

  const visiblePhases = months >= 6 ? 4 : months >= 3 ? 3 : months >= 1 ? 2 : 1;

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f9f7f4', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: '12px 0 8px' }}>
            DFW Home Sale Preparation Guide
          </h1>
          <p style={{ color: '#555', fontSize: 16 }}>
            The DFW market rewards prepared sellers. Here's exactly what to do — and when — to maximize your sale.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>📅 How many months until your target listing date?</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <input type="range" min={1} max={6} value={months} onChange={e => setMonths(Number(e.target.value))} style={{ flex: 1, accentColor: '#0A1628′ }} />
            <span style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', minWidth: 40 }}>{months}mo</span>
          </div>
          <p style={{ color: '#888', fontSize: 14, marginTop: 8 }}>Showing {visiblePhases} preparation phase{visiblePhases !== 1 ? 's' : ''} based on your timeline.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {phases.slice(0, visiblePhases).map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: '5px solid #0A1628′ }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#F5E642', background: '#0A1628', display: 'inline-block', padding: '3px 12px', borderRadius: 20, marginBottom: 10 }}>{p.phase} — {p.label}</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {p.tasks.map((t, j) => <li key={j} style={{ marginBottom: 6, color: '#333', fontSize: 15 }}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>💰 DFW Repair ROI Reference</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f0f0ee' }}>
                {['Repair', 'ROI', 'Note'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 13, color: '#555', fontWeight: 600 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {repairROI.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f0f0ee' }}>
                  <td style={{ padding: '10px 14px', fontSize: 14, fontWeight: 600 }}>{r.repair}</td>
                  <td style={{ padding: '10px 14px', fontSize: 14 }}>{r.roi}</td>
                  <td style={{ padding: '10px 14px', fontSize: 14, color: '#666′ }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 28, background: '#0A1628', borderRadius: 16 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: 0 }}>Ready to list your DFW home?</p>
          <p style={{ color: '#aaa', fontSize: 14, margin: '8px 0 0′ }}>Connect with top DFW agents who know exactly what buyers want.</p>
        </div>
      </div>
    </div>
  );
}
