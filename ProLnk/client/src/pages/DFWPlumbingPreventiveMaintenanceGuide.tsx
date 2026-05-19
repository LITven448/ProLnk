import { useState } from 'react';

const homeAgeOptions = ['0–5 years', '5–15 years', '15–30 years', '30–50 years', '50+ years'];
const historyOptions = ['No known plumbing issues', 'Minor repairs (1–2 leaks)', 'Multiple repairs or replacements', 'Poly-B or galvanized pipes present'];

function getChecklist(age: string, history: string) {
  const old = age === '30–50 years' || age === '50+ years';
  const issues = history !== 'No known plumbing issues';
  const priority: string[] = [];
  const annual: string[] = [
    '✅ Test all shut-off valves (main, toilets, under sinks) — turn to ensure no seizure',
    '✅ Inspect all supply lines under sinks and behind toilets for bulging or corrosion',
    '✅ Check water pressure (DFW ideal: 40–60 psi) — high pressure damages fixtures',
    '✅ Run water in unused sinks/tubs to clear P-trap dry-out',
    '✅ Flush water heater sediment via drain valve — DFW hard water accumulates fast',
    '✅ Test pressure relief valve on water heater',
    '✅ Inspect caulking around tubs, showers, sinks — DFW clay soil causes subtle movement',
    '✅ Check all drain speeds — slow drains indicate early blockage',
  ];
  if (old) { priority.push('🔴 Inspect main sewer line via camera — DFW clay soil shifts and cracks older cast iron or clay tile pipes'); priority.push('🔴 Test all angle stops (shut-off valves) — may seize or weep on 30+ year homes'); }
  if (history.includes('Poly-B')) { priority.push('🚨 Get polybutylene pipe assessment — DFW chlorinated water accelerates fitting failure'); }
  if (issues) { priority.push('🟡 Document repair history — pattern of leaks may indicate systemic issue (main line, slab leak, or failing manifold)'); }
  const cost = old ? '$350–$700/yr (inspection + minor repairs)' : issues ? '$150–$400/yr (targeted checks)' : '$100–$250/yr (standard annual service)';
  return { priority, annual, cost };
}

export default function DFWPlumbingPreventiveMaintenanceGuide() {
  const [age, setAge] = useState('');
  const [history, setHistory] = useState('');
  const result = age && history ? getChecklist(age, history) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🔧 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Preventive Plumbing Maintenance — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>DFW's expansive clay soil shifts with moisture cycles — causing foundation movement that stresses plumbing joints over time. Combined with hard water and aging pipe materials, annual preventive maintenance is the highest-ROI plumbing investment you can make.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'DFW Clay Soil Impact', body: 'Expansive clay shrinks in drought and expands in rain — creating micro-movements that stress pipe joints under slab homes over decades.' },
            { icon: '📊', title: 'Water Pressure Check', body: 'DFW municipal pressure often runs high (65–80 psi). Ideal is 40–60 psi. High pressure damages supply lines, valves, and water heaters faster.' },
            { icon: '🔍', title: 'Annual Inspection Value', body: 'A $150–$300 plumbing inspection catches issues early — slab leaks found late cost $3,000–$10,000+; found early, $500–$2,000.' },
            { icon: '🌊', title: 'Sewer Line Risk', body: 'DFW homes 30+ years old with clay tile or cast iron sewer lines are at risk of root intrusion and soil-shift cracking. Camera inspection every 3–5 years recommended.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📋 Your Annual Maintenance Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Home Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select age</option>
                {homeAgeOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Plumbing History</label>
              <select value={history} onChange={e => setHistory(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select history</option>
                {historyOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {result.priority.length > 0 && (
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🔴 PRIORITY ITEMS FOR YOUR HOME</div>
                  {result.priority.map((p, i) => <div key={i} style={{ color: '#E8EDF5', fontSize: 14, marginBottom: 6 }}>{p}</div>)}
                </div>
              )}
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📋 STANDARD ANNUAL CHECKLIST</div>
                {result.annual.map((a, i) => <div key={i} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 5 }}>{a}</div>)}
              </div>
              <div style={{ background: '#1A2F50', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>💰 ESTIMATED ANNUAL MAINTENANCE COST</div>
                <div style={{ color: '#E8EDF5', fontSize: 14 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>📅 DFW Seasonal Timing</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8 }}>
            • <strong style={{ color: '#E8EDF5′ }}>Spring (March–April):</strong> Test irrigation, inspect after winter freeze events, flush water heater<br/>
            • <strong style={{ color: '#E8EDF5′ }}>Summer (June–Aug):</strong> Monitor pressure (DFW drought causes soil contraction, stress on pipes)<br/>
            • <strong style={{ color: '#E8EDF5′ }}>Fall (Oct–Nov):</strong> Inspect supply lines, test shut-offs before freeze season<br/>
            • <strong style={{ color: '#E8EDF5′ }}>Winter (Dec–Feb):</strong> Shut off irrigation, insulate exposed pipes, know your emergency numbers
          </div>
        </div>
      </div>
    </div>
  );
}
