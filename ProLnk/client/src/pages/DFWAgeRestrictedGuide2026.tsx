import { useState } from 'react';

const communities = [
  {
    id: 'heritage',
    label: 'Heritage The Colony',
    hoa: '$250–350/mo',
    amenities: ['18-hole golf course', 'Resort pool & spa', 'Pickleball & tennis', 'Lifestyle director', 'Clubhouse dining'],
    note: 'One of DFW\’s most established 55+ communities. Sold-out sections regularly resell at $350K–600K.',
  },
  {
    id: 'delwebb',
    label: 'Del Webb McKinney',
    hoa: '$200–300/mo',
    amenities: ['Indoor/outdoor pools', 'Fitness center', 'Arts & crafts studio', 'Walking trails', '55+ social clubs'],
    note: 'National Del Webb brand brings resort-quality amenities with strong builder warranty and resale network.',
  },
  {
    id: 'robson',
    label: 'Robson Ranch Denton',
    hoa: '$300–450/mo',
    amenities: ['27-hole golf course', 'Tennis & pickleball complex', 'Crafts barn', 'Softball fields', 'Full restaurant'],
    note: 'Largest 55+ community in DFW at 6,500+ homes. Massive on-site amenities; feels like a small city.',
  },
  {
    id: 'windsong',
    label: 'Windsong Ranch 55+',
    hoa: '$180–250/mo',
    amenities: ['Lagoon pool access', 'Kayaking & paddleboarding', 'Fitness classes', 'Walking trails', 'Community garden'],
    note: 'Newer 55+ section within Windsong Ranch MPC in Prosper — access to full lagoon amenities at lower HOA cost.',
  },
];

export default function DFWAgeRestrictedGuide2026() {
  const [selected, setSelected] = useState('heritage');
  const active = communities.find((c) => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🌅 ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW 55+ Age-Restricted Community Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Compare active adult communities in DFW — amenities, HOA fees, and lifestyle fit.</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🏘️ Choose a DFW 55+ Community</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {communities.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === c.id ? '#F5E642′ : '#1e2e4a', color: selected === c.id ? '#0A1628' : '#94a3b8' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{active.label}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>💰 HOA: <span style={{ color: '#fff' }}>{active.hoa}</span></div>
            <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Key Amenities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {active.amenities.map((a) => (
                <span key={a} style={{ background: '#1e2e4a', color: '#cbd5e1', borderRadius: 6, padding: '3px 8px', fontSize: 11 }}>{a}</span>
              ))}
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', borderTop: '1px solid #1e2e4a', paddingTop: 10 }}>{active.note}</div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>📜 How 55+ Communities Work</div>
          {[
            { icon: '📋', title: 'The 80/20 Rule', note: 'Under the Housing for Older Persons Act (HOPA), at least 80% of occupied units must have one resident 55+. Spouses under 55 are allowed.' },
            { icon: '🔒', title: 'Permanent Residency Rule', note: 'Visitors and family can stay temporarily, but no permanent residents under 55. Violations can trigger HOA enforcement.' },
            { icon: '🏠', title: 'Resale to 55+ Only', note: 'You can only sell to a qualified 55+ buyer — this narrows your buyer pool but also stabilizes community demographics.' },
            { icon: '💊', title: 'No Medical Requirement', note: '"Age-restricted" is NOT the same as "assisted living." These are fully independent active adult communities.' },
          ].map((row) => (
            <div key={row.title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{row.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Find 55+ Community Experts</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects active adult buyers with agents and inspectors who specialize in DFW 55+ communities.</div>
        </div>
      </div>
    </div>
  );
}
