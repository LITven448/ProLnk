import { useState } from 'react';

const goals = [
  { id: 'security', label: '🔒 Security / Motion Lighting', guide: 'Motion-activated floodlights are the #1 deterrent in DFW neighborhoods. Place at garage, backyard gate, and side entries. LED PAR38 bulbs: 5,000 lumens, 5000K for white light. GFCI required on all outdoor circuits. Cost: $80–$250 per fixture installed.' },
  { id: 'landscape', label: '🌿 Landscape / Accent Lighting', guide: 'Low-voltage LED systems (12V) are safe and energy-efficient for DFW lawns. Kits start at $150 for 10-12 fixtures. Use warm white (2700–3000K) for landscape. Transformer with timer required. Bury cable 3" deep — protect from lawn equipment.' },
  { id: 'dusk', label: '🌙 Dusk-to-Dawn Fixtures', guide: 'Photocell dusk-to-dawn fixtures turn on automatically at sunset — ideal for DFW porch lights and garage lights. LED versions use 9–15W. Retrofit photocell adapters available for existing fixtures. Annual cost: ~$8–$12 per fixture.' },
  { id: 'gfci', label: '⚡ GFCI & Outdoor Outlet Requirements', guide: 'NEC requires GFCI protection for all outdoor outlets in DFW (and all of Texas). Test GFCI monthly — DFW humidity trips them. Add outdoor outlet covers rated for wet locations. Unlicensed electrical work is not permitted in Texas — hire licensed electrician.' },
  { id: 'holiday', label: '🎄 Holiday Lighting Safety', guide: 'DFW homes overload circuits with holiday lights. Standard 15A circuit handles 1,800W max. LED string lights draw 80-90% less power than incandescent. Use outdoor-rated extension cords (14 AWG minimum). Never daisy-chain more than 3 sets of incandescent strings.' },
];

export default function DFWExteriorLightingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = goals.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          💡 DFW Exterior Lighting Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          Outdoor lighting improves DFW home security, curb appeal, and safety. All outdoor electrical work requires GFCI protection under Texas code.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Exterior Lighting Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Code Requirement', value: 'GFCI on all outdoor outlets' },
              { label: 'Security Light Install', value: '$80–$250 per fixture' },
              { label: 'Landscape System', value: '$150–$600 for full install' },
              { label: 'Energy Savings (LED)', value: 'Up to 90% vs incandescent' },
            ].map(f => (
              <div key={f.label} style={{ background: '#162032', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 What is your lighting goal?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {goals.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#162032', color: selected === i.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
              {i.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{guide.label} — Lighting Guide</h3>
            <p style={{ lineHeight: 1.7, color: '#d0dce8' }}>{guide.guide}</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#162032', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Lighting Install Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk connects you with licensed DFW electricians and landscape lighting specialists.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
