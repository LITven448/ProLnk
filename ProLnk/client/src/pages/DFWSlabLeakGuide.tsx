import { useState } from 'react';

const SYMPTOMS = [
  { id: 'hotspot', label: '🌡️ Hot or warm spots on floor', weight: 3, location: 'Hot water line under slab (likely kitchen or bathroom area)' },
  { id: 'highbill', label: '💸 Sudden water bill spike (>20%)', weight: 2, location: 'Active leak — could be anywhere under slab' },
  { id: 'sound', label: '🔊 Hear running water with all off', weight: 3, location: 'Pressurized line actively leaking' },
  { id: 'crack', label: '🏠 New cracks in walls or floors', weight: 2, location: 'Soil saturation causing foundation shift' },
  { id: 'mold', label: '🍄 Mold or mildew smell', weight: 2, location: 'Moisture wicking up through slab — chronic leak' },
  { id: 'wet', label: '💧 Wet or damp flooring', weight: 3, location: 'Leak directly below affected area' },
  { id: 'lowpressure', label: '📉 Low water pressure throughout', weight: 1, location: 'Main supply line under slab losing pressure' },
];

function getEstimate(score: number) {
  if (score >= 8) return { urgency: 'CRITICAL', color: '#FF4444', range: '$4,000–$12,000', repair: 'Full reroute or epoxy lining likely needed. Stop using water immediately.' };
  if (score >= 5) return { urgency: 'HIGH', color: '#FF8800', range: '$2,500–$7,000', repair: 'Spot repair possible if single leak confirmed by detection. Schedule detection this week.' };
  if (score >= 3) return { urgency: 'MODERATE', color: '#F5E642', range: '$800–$3,000', repair: 'Detection recommended. May be a single isolated leak suitable for spot repair.' };
  return { urgency: 'MONITOR', color: '#4ECDC4', range: '$300–$1,500', repair: 'Run leak detection as a precaution. Could be slab movement without active leak.' };
}

export default function DFWSlabLeakGuide() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
    setShowResult(false);
  };

  const score = [...selected].reduce((acc, id) => acc + (SYMPTOMS.find(s => s.id === id)?.weight ?? 0), 0);
  const locations = [...selected].map(id => SYMPTOMS.find(s => s.id === id)?.location).filter(Boolean);
  const est = getEstimate(score);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🏗️ DFW FOUNDATION PLUMBING</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Slab Leak Detection & Repair<br /><span style={{ color: '#F5E642' }}>Guide for DFW Homeowners</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>DFW's expansive clay soil shifts with every rain and drought cycle — putting constant stress on pipes embedded in your foundation. Slab leaks are more common here than anywhere else in the country.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🪨 Why DFW Clay Soil Destroys Pipes</h2>
          <p style={{ color: '#C0D0E8', lineHeight: 1.7, marginBottom: 16 }}>DFW sits on expansive Blackland Prairie clay — the same soil that makes farmland fertile but makes foundations move. In dry summers, clay shrinks and pulls away from your slab. In wet winters, it swells and pushes up. This cycle repeats 20–30 times per year, flexing copper and galvanized pipes until they crack at joints and elbows.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {[
              { icon: '☀️', stat: '40+ days', desc: '100°F+ per summer — extreme clay shrinkage' },
              { icon: '🌧️', stat: '37"', desc: 'Annual rainfall — clay swells repeatedly' },
              { icon: '📊', stat: '3–5%', desc: 'Volume change in DFW Blackland clay' },
              { icon: '🏠', stat: '60%', desc: 'DFW homes on slab foundations' },
            ].map(item => (
              <div key={item.stat} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#F5E642', margin: '6px 0 4px' }}>{item.stat}</div>
                <div style={{ color: '#8BA3C7', fontSize: 13 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🔍 Detection Methods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🎧', method: 'Acoustic Detection', how: 'Sensitive microphones detect sound frequency changes of escaping water through slab.', accuracy: '85%', cost: '$250–450', best: 'Active pressurized leaks' },
              { icon: '⚡', method: 'Electronic Detection', how: 'Electromagnetic pulse traces pipe routes; disruptions indicate leaks.', accuracy: '90%', cost: '$300–550', best: 'Locating pipe paths before cutting' },
              { icon: '🌡️', method: 'Infrared Thermal', how: 'Thermal camera maps temperature anomalies on slab surface.', accuracy: '80%', cost: '$350–600', best: 'Hot water line leaks' },
            ].map(item => (
              <div key={item.method} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, color: '#E8EDF5', marginBottom: 8 }}>{item.method}</div>
                <div style={{ color: '#8BA3C7', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{item.how}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#4ECDC4' }}>✓ {item.accuracy} accuracy</span>
                  <span style={{ color: '#F5E642' }}>{item.cost}</span>
                </div>
                <div style={{ color: '#8BA3C7', fontSize: 12, marginTop: 6 }}>Best for: {item.best}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🔧 Repair Options & Costs</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F5E642', color: '#0A1628' }}>
                  {['Repair Method', 'Description', 'When To Use', 'Cost Range', 'Disruption'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Spot Repair', 'Cut slab, access pipe, patch leak', 'Single leak, accessible location', '$1,500–3,500', 'Low — 1–2 day repair'],
                  ['Pipe Reroute', 'Abandon old pipe, run new through walls', 'Multiple leaks or corroded pipe', '$4,000–8,000', 'Moderate — drywall work'],
                  ['Epoxy Lining', 'Coat interior of existing pipe', 'Pinhole leaks throughout line', '$3,000–6,000', 'Low — no cutting'],
                  ['Full Repipe', 'Replace all slab plumbing', 'Systemic failure, old galvanized', '$8,000–15,000', 'High — 3–5 days'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#0E1E35' : '#112240' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#F5E642' : '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🩺 Symptom Checker — Slab Leak Estimator</h2>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>Check all symptoms you're experiencing. We'll estimate urgency and likely leak location.</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {SYMPTOMS.map(s => (
              <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: selected.has(s.id) ? '#0D2B4E' : '#0A1628', border: `1px solid ${selected.has(s.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '12px 16px' }}>
                <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: selected.has(s.id) ? '#E8EDF5' : '#8BA3C7', fontSize: 15 }}>{s.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} disabled={selected.size === 0} style={{ background: selected.size > 0 ? '#F5E642' : '#1E3A5F', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: selected.size > 0 ? 'pointer' : 'not-allowed', width: '100%', marginBottom: 20 }}>
            Analyze My Symptoms
          </button>
          {showResult && selected.size > 0 && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${est.color}`, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#8BA3C7', marginBottom: 4 }}>URGENCY LEVEL</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: est.color, marginBottom: 8 }}>{est.urgency}</div>
                <div style={{ color: '#C0D0E8', marginBottom: 8 }}>Estimated Repair Range: <strong style={{ color: '#F5E642' }}>{est.range}</strong></div>
                <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.6 }}>{est.repair}</div>
              </div>
              {locations.length > 0 && (
                <div style={{ background: '#0D1B2E', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>LIKELY LEAK LOCATIONS</div>
                  {locations.map((loc, i) => <div key={i} style={{ color: '#C0D0E8', fontSize: 14, marginBottom: 6 }}>• {loc}</div>)}
                </div>
              )}
            </div>
          )}
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get a Licensed Slab Leak Specialist</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>DFW plumbers experienced with clay soil and slab construction. Detection + estimate often free or applied to repair.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Slab Leak Inspection →</div>
        </div>
      </div>
    </div>
  );
}
