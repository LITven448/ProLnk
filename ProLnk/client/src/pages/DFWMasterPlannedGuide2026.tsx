import { useState } from 'react';

const lifestyles = [
  {
    id: 'family',
    label: '👨‍👩‍👧 Family-Focused',
    communities: ['Frisco - Phillips Creek Ranch', 'Prosper - Lakes of La Cima', 'Celina - Light Farms'],
    note: 'Top-rated schools, massive amenity centers, safe streets, sports fields — these master-planned communities are built for families.',
  },
  {
    id: 'active',
    label: '🚴 Active Lifestyle',
    communities: ['McKinney - Trinity Falls', 'Flower Mound - Lakeside DFW', 'Frisco - Hollyhock'],
    note: 'Miles of trails, resort pools, fitness centers, kayak lakes, and community sports leagues define these communities.',
  },
  {
    id: 'luxury',
    label: '🏆 Luxury Living',
    communities: ['Southlake - Timarron', 'Colleyville - Oakmont', 'Westlake - Vaquero'],
    note: 'Guard-gated, custom homes, private golf, and some of DFW\’s highest home values. HOA dues $200–600/mo.',
  },
  {
    id: 'value',
    label: '💲 Best Value',
    communities: ['Celina - Sutton Fields', 'Aubrey - ArrowBrooke', 'Princeton - Bridgewater'],
    note: 'North of Frisco and Prosper, newer master-planned communities in Celina and Aubrey offer amenities at lower price points.',
  },
];

export default function DFWMasterPlannedGuide2026() {
  const [selected, setSelected] = useState('family');
  const active = lifestyles.find((l) => l.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🏡 ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master-Planned Community Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Find the right master-planned community based on your lifestyle priorities.</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🎯 What Defines Your Lifestyle?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {lifestyles.map((l) => (
              <button key={l.id} onClick={() => setSelected(l.id)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === l.id ? '#F5E642′ : '#1e2e4a', color: selected === l.id ? '#0A1628' : '#94a3b8' }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Top Picks for You</div>
            {active.communities.map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ color: '#F5E642', fontSize: 14 }}>★</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{c}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', borderTop: '1px solid #1e2e4a', paddingTop: 12 }}>{active.note}</div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>📊 What Makes DFW Master-Planned Communities Unique</div>
          {[
            { icon: '🏊', title: 'Resort Amenities', note: 'Competition pools, lazy rivers, clubhouses, and fitness centers — often costing $50M+ to build — are standard in top-tier DFW MPCs.' },
            { icon: '📋', title: 'Active HOA Governance', note: 'MPCs have strict CC&Rs: lawn standards, paint colors, fence types, parking rules. HOA fees range $100–400/mo depending on amenity level.' },
            { icon: '🏗️', title: 'Builder Variety', note: 'Most MPCs offer multiple builders (Toll Brothers, David Weekley, Shaddock) across price ranges within the same community.' },
            { icon: '📈', title: 'Growth Corridor', note: 'Frisco, Prosper, and Celina are among the fastest-growing cities in the US — land values and appreciation trends are strong through 2027.' },
          ].map((row) => (
            <div key={row.title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{row.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Inspect Before You Close</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects new construction buyers with independent inspectors and HOA document review specialists across DFW MPCs.</div>
        </div>
      </div>
    </div>
  );
}
