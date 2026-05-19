import { useState } from 'react';

export default function DFWPlumbingFoundationConnections2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { id: 'slab_leak', label: '💧 Slab leak + Foundation movement' },
    { id: 'sewer', label: '🚽 Broken sewer line + Settling floors' },
    { id: 'backflow', label: '🔄 Backflow preventer + Water pressure issues' },
    { id: 'both', label: '🏠 Want comprehensive plumbing + Foundation assessment' },
  ];

  const results: Record<string, string> = {
    slab_leak: 'A slab leak saturates the soil directly under the slab in one location. DFW clay responds with localized heave — the slab lifts unevenly. The longer the leak runs, the more severe the differential movement. Fix the leak first, wait 30-60 days for soil to stabilize, then level the foundation.',
    sewer: 'A broken sewer line under the slab washes soil away from beneath the concrete. Unlike heave from a water leak, sewer breaks cause settlement (slab drops). This produces stair-step cracks in brick, doors that drop open, and sloping floors. ProLnk connects licensed plumber + foundation inspector for sequential repair.',
    backflow: 'DFW water districts require backflow preventers on irrigation and pool systems. A failing backflow preventer can allow irrigation water to pool near the foundation — same result as a slab leak. A licensed plumber tests and replaces the device; a foundation pro assesses any resulting soil movement.',
    both: 'DFW slab-on-grade construction means every plumbing line runs through the foundation. ProLnk matches a licensed plumber (slab leak detection, camera inspection) and a foundation specialist simultaneously — saving weeks of sequential scheduling and giving you a complete picture before any repairs begin.',
  };

  function assess() {
    if (concern) setResult(results[concern]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HOME SYSTEMS — PLUMBING + FOUNDATION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Plumbing and Foundation Connection Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW plumbing and foundation systems are connected — and why both need assessment together.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏗️ DFW Slab-on-Grade: Every Pipe Runs Through the Foundation</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            95% of DFW homes are slab-on-grade construction. All water supply and drain lines are embedded in or run beneath the concrete slab. Any plumbing failure at or below the slab directly affects the soil condition that supports your foundation.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💧', title: 'Slab Leaks → Foundation Heave', body: 'Supply line leaks under the slab release pressurized water into the soil continuously. DFW clay absorbs moisture and expands — causing localized upward pressure on the slab. The slab lifts, cracks, and creates uneven floors that worsen daily until the leak is repaired.' },
            { icon: '🚽', title: 'Sewer Breaks → Foundation Settlement', body: 'Drain lines under the slab carry waste water away. When cast iron or PVC breaks, the constant flow of water erodes and washes away the supporting soil — creating voids beneath the slab. The slab then drops into those voids, causing rapid, severe settlement.' },
            { icon: '🔬', title: 'Detection Technology', body: 'Modern slab leak detection uses electronic listening devices, thermal imaging, and pressurized gas to locate leaks without cutting. ProLnk connects plumbers who use camera inspection to confirm sewer line integrity before foundation repair begins.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Connected System Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>What is your concern?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => { setConcern(c.id); setResult(''); }}
                style={{ background: concern === c.id ? '#F5E642′ : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={assess} disabled={!concern}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: concern ? 'pointer' : 'not-allowed', opacity: concern ? 1 : 0.5 }}>
            Show Connected System Guide →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#fff', lineHeight: 1.6 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🏠 ProLnk Coordinates Plumber + Foundation Inspector</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>One request → licensed plumber and foundation specialist dispatched together. Health Vault documents both systems for your home's permanent record.</div>
        </div>
      </div>
    </div>
  );
}
