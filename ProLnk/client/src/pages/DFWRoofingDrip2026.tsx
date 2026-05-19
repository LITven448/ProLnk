import { useState } from 'react';

export default function DFWRoofingDrip2026() {
  const [situation, setSituation] = useState('');

  const getGuide = () => {
    if (!situation) return null;
    if (situation === 'no-drip') return { title: 'Install Drip Edge — Do Not Delay', urgent: true, steps: ['Steel drip edge is required at both eaves and rakes in most DFW city codes', 'At eaves: drip edge goes UNDER the underlayment (ice & water shield or felt)', 'At rakes: drip edge goes OVER the underlayment', 'Use galvanized steel or aluminum — never plastic in DFW heat', 'After next hail storm, inspect drip edge for dents and lifting'], note: 'Without drip edge, water wicks under shingles and rots fascia boards. DFW hail accelerates this damage.' };
    if (situation === 'hail-damage') return { title: 'Post-Hail Drip Edge Inspection Guide', urgent: false, steps: ['Walk entire perimeter and look for bent, lifted, or cracked drip edge sections', 'Photograph all damage before contacting insurance', 'Hail damage to drip edge is a covered peril under most DFW homeowner policies', 'Do not let roofer replace shingles only — drip edge must be inspected too', 'Ask installer to use 3\" wide drip edge minimum for better protection'], note: 'DFW averages 5–7 significant hail events per year. Drip edge inspection should follow every event.' };
    if (situation === 're-roof') return { title: 'Re-Roof Drip Edge Checklist', urgent: false, steps: ['Require new drip edge on every re-roof — reusing old drip edge is a red flag', 'Eave installation: remove old drip edge, install new before underlayment', 'Rake installation: install after underlayment, nail every 12 inches', 'Request galvanized steel minimum 26-gauge for DFW wind/hail exposure', 'Verify in writing that drip edge is included in your contract scope'], note: 'Some DFW roofers skip drip edge to cut costs. Specify it by name in your contract.' };
    return { title: 'Annual Drip Edge Inspection Guide', urgent: false, steps: ['Inspect drip edge each spring before storm season begins', 'Look for rust streaks below roofline (sign of failing drip edge)', 'Check for lifted or separated sections at corners and transitions', 'Ensure downspouts and gutters direct water past drip edge to ground', 'Minor rust spots can be treated with rust-inhibiting primer + paint'], note: 'Proper drip edge extends roof life by 5–10 years in DFW climate conditions.' };
  };

  const guide = getGuide();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>🏗️ DFW Drip Edge Roofing Guide 2026</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem' }}>Drip edge is one of the most overlooked yet critical components of a DFW roof. It prevents water from wicking under shingles and is required by most DFW city codes.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>🔩 Drip Edge Fundamentals for DFW</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[{icon:'📏',text:'Steel drip edge installed at all eaves (horizontal edges) and rakes (sloped edges)'},{icon:'🌧️',text:'Prevents water from wicking under shingles and rotting fascia/decking'},{icon:'🏛️',text:'Required by code in Dallas, Fort Worth, Plano, Frisco, and most DFW cities'},{icon:'⛈️',text:'DFW hail (5–7 events/year) dents and lifts drip edge — inspect after every storm'},{icon:'🔧',text:'Eave: under underlayment | Rake: over underlayment (critical installation order)'}].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>📋 Get Your Drip Edge Guide</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Your current drip edge situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
            <option value="">Select your situation...</option>
            <option value="no-drip">I may not have drip edge (older home)</option>
            <option value="hail-damage">Recent hail storm — need to inspect</option>
            <option value="re-roof">Planning a full re-roof soon</option>
            <option value="maintenance">Routine inspection / maintenance</option>
          </select>
        </div>

        {guide && (
          <div style={{ background: '#0F2744', border: `2px solid ${guide.urgent ? '#FF4444' : '#F5E642'}`, borderRadius: '12px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', color: guide.urgent ? '#FF4444′ : '#F5E642', marginBottom: '1rem' }}>{guide.urgent ? '🚨' : '✅'} {guide.title}</h2>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD2DC', fontSize: '0.95rem' }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2F4A', borderRadius: '8px', padding: '0.75rem 1rem', color: '#9BA3B2', fontSize: '0.88rem', fontStyle: 'italic' }}>💡 {guide.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}