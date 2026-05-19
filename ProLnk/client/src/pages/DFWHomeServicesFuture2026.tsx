import { useState } from 'react';

const features = [
  {
    type: 'HVAC System',
    now: 'Annual tune-up, reactive repairs, technician diagnosis',
    future: 'AI monitors refrigerant, predicts compressor failure 30 days out, auto-schedules service via ProLnk',
    timeline: '2026-2027',
    impact: '🔥 High',
  },
  {
    type: 'Roof Inspection',
    now: 'Manual climb, binoculars, post-storm visual',
    future: 'Drone with thermal imaging detects moisture intrusion, AI flags insurance-worthy damage in minutes',
    timeline: '2026',
    impact: '🔥 High',
  },
  {
    type: 'Plumbing',
    now: 'Leak discovery after water damage, manual camera inspection',
    future: 'Smart sensors in walls detect pipe stress. AI diagnosis before pipes burst.',
    timeline: '2027-2028',
    impact: '🌊 Medium',
  },
  {
    type: 'Remodeling & Design',
    now: 'Mood boards, contractor estimates, 2D blueprints',
    future: 'AR overlays show your kitchen remodel live in your space before demolition begins',
    timeline: '2026',
    impact: '🔥 High',
  },
  {
    type: 'Electrical',
    now: 'Panel inspection, load testing, manual circuit tracing',
    future: 'Smart panels track real-time loads, flag overloaded circuits, alert before breakers fail',
    timeline: '2027',
    impact: '⚡ Medium',
  },
  {
    type: 'Foundation',
    now: 'Annual inspection, crack monitoring by eye',
    future: 'IoT sensors in slab detect settlement in millimeters. AI correlates to DFW clay soil moisture data.',
    timeline: '2028',
    impact: '🌍 High',
  },
];

export default function DFWHomeServicesFuture2026() {
  const [selectedFeature, setSelectedFeature] = useState('');
  const [detail, setDetail] = useState<null | typeof features[0]>(null);

  function explore() {
    const found = features.find(f => f.type === selectedFeature);
    setDetail(found || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FUTURE OUTLOOK</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>The Future of Home Services in DFW — 2026 and Beyond</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          DFW is one of the fastest-adopting tech metros in America. Smart home diagnostics, AI-powered contractor matching, drone inspection, and augmented reality are changing how homes are maintained, improved, and bought. Here's what’s already here and what’s coming.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🤖', label: 'AI Matching', value: 'Live in DFW', sub: 'ProLnk matches homeowners to vetted pros in minutes' },
            { icon: '🚁', label: 'Drone Roofing', value: '2026 Standard', sub: '40% faster inspection, thermal damage detection' },
            { icon: '🥽', label: 'AR Remodeling', value: 'Early Adopter', sub: 'See your renovation before demo day' },
            { icon: '📡', label: 'Smart Diagnostics', value: '2027 Mainstream', sub: 'HVAC, plumbing, electrical self-report failures' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📅 DFW Innovation Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { year: '2026', items: ['AI contractor matching (ProLnk live)', 'Drone roof inspections mainstream', 'AR remodel previews in apps'] },
              { year: '2027', items: ['Smart HVAC self-diagnosis', 'Electrical panel AI monitoring', 'Plumbing leak prediction sensors'] },
              { year: '2028', items: ['Foundation IoT clay-soil integration', 'Full home health dashboards', 'Autonomous contractor dispatch'] },
              { year: '2030+', items: ['Robotic exterior maintenance', 'Digital twin home replicas', 'Self-scheduling preventive ecosystems'] },
            ].map(row => (
              <div key={row.year} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 56, backgroundColor: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontWeight: 800, fontSize: 13, textAlign: 'center' }}>{row.year}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>{row.items.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🔭 Explore by Home Feature</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>See how technology will transform a specific area of your home in DFW.</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            <select value={selectedFeature} onChange={e => setSelectedFeature(e.target.value)}
              style={{ flex: 1, minWidth: 200, backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15 }}>
              <option value=''>Select home feature...</option>
              {features.map(f => <option key={f.type} value={f.type}>{f.type}</option>)}
            </select>
            <button onClick={explore}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Explore
            </button>
          </div>
          {detail && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px' }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>TODAY</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{detail.now}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px', border: '1px solid #F5E642′ }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>FUTURE ({detail.timeline})</div>
                <div style={{ fontSize: 15, lineHeight: 1.6 }}>{detail.future}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <div><span style={{ color: '#64748b', fontSize: 13 }}>Impact Level: </span><span style={{ fontWeight: 700 }}>{detail.impact}</span></div>
                <div><span style={{ color: '#64748b', fontSize: 13 }}>Arriving: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{detail.timeline}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
