import { useState } from 'react';

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const scopes = ['1-5 piers', '6-15 piers', '16-30 piers', '30+ piers'];

function getLift(scope: string, season: string) {
  const base = scope === '1-5 piers' ? '0.5–1.5 inches' : scope === '6-15 piers' ? '1–2.5 inches' : scope === '16-30 piers' ? '1.5–3 inches' : '2–4+ inches';
  const note = season === 'Summer' ? 'Clay is dry — maximum lift expected at pier installation.' : season === 'Winter' ? 'Clay is moist — lift may be gradual over 30–90 days.' : season === 'Spring' ? 'Clay is hydrating — monitor for continued movement post-repair.' : 'Clay is transitioning — stable conditions, moderate lift response.';
  const schedule = scope === '1-5 piers' ? '30-day check-in' : scope === '6-15 piers' ? '30 and 90-day check-ins' : '30, 90, and 180-day check-ins';
  const watch = ['Doors/windows binding again', 'New cracks appearing', 'Floors re-sloping', 'Gaps returning at trim'];
  return { base, note, schedule, watch };
}

export default function DFWFoundationRaiseGuide() {
  const [scope, setScope] = useState('');
  const [season, setSeason] = useState('');
  const result = scope && season ? getLift(scope, season) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Raising &amp; Lift Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          When DFW foundations are repaired with pressed piers, the structure is lifted back toward level. Understanding expected lift, soil response, and monitoring keeps you informed after repair.
        </p>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏗️ How Lift Works in DFW Clay</h2>
          <ul style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Pressed concrete piers push down to bedrock or load-bearing strata 10–20 ft deep</li>
            <li>Hydraulic jacks at each pier simultaneously lift the slab</li>
            <li>DFW expansive clay may continue shifting after repair — especially after rain</li>
            <li>Lift targets are set by engineer; over-lifting causes new stress</li>
            <li>Post-repair movement of ±0.25 inches is considered normal settlement</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 Lift Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>REPAIR SCOPE</label>
              <select value={scope} onChange={e => setScope(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select scope</option>
                {scopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>DFW SEASON</label>
              <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select season</option>
                {seasons.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: 20 }}>
              <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>⬆️ Expected Lift Range</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{result.base}</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 12 }}>🌡️ {result.note}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>📅 Monitoring Schedule</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.schedule}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>👁️ Watch For</div>
                {result.watch.map((w, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 4 }}>• {w}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Post-Repair Essentials</h2>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            Get written warranty. Maintain soil moisture consistently. Document all door/window performance. Photograph any returning cracks. Most warranties cover re-lift at no cost within 12–24 months.
          </div>
        </div>
      </div>
    </div>
  );
}
