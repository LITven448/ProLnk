import { useState } from 'react';

const securityLevels = [
  {
    id: 'guard',
    label: '💂 Guard-Gated',
    hoaPremium: '+$200–400/mo',
    features: ['24/7 staffed security gate', 'Visitor log and ID check', 'Patrol within community', 'Package and delivery screening'],
    examples: ['Stonebriar Frisco', 'Vaquero Westlake', 'Montalvo Irving'],
    note: 'Full-time guard gates provide the highest security and privacy. Common in DFW luxury neighborhoods $700K+.',
  },
  {
    id: 'card',
    label: '🔑 Card/App Access',
    hoaPremium: '+$100–200/mo',
    features: ['Electronic gate access', 'Resident app or fob entry', 'Camera-monitored entry', 'No staffed booth'],
    examples: ['Las Colinas communities', 'Frisco mid-tier MPCs', 'Allen newer builds'],
    note: 'Electronic access gates are the most common in DFW — provides security feel at a lower HOA premium.',
  },
  {
    id: 'perimeter',
    label: '🏰 Perimeter-Only',
    hoaPremium: '+$50–150/mo',
    features: ['Fenced or walled perimeter', 'Single entry/exit point', 'No gatehouse or staff', 'Slower traffic flow'],
    examples: ['Various Plano subdivisions', 'Southlake older neighborhoods', 'Coppell communities'],
    note: 'Physical perimeter with unguarded gate — reduces through-traffic and provides a sense of enclosure without ongoing staffing cost.',
  },
];

export default function DFWGatedCommunityGuide2026() {
  const [selected, setSelected] = useState('guard');
  const active = securityLevels.find((s) => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🔐 ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Gated Community Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Guard-gated vs. card-access vs. perimeter — what level of security do you need in DFW?</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🔒 Select Your Security Priority</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {securityLevels.map((s) => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === s.id ? '#F5E642′ : '#1e2e4a', color: selected === s.id ? '#0A1628' : '#94a3b8' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{active.label}</div>
            <div style={{ fontSize: 13, color: '#f59e0b', marginBottom: 12 }}>💰 HOA Premium: <span style={{ color: '#fff' }}>{active.hoaPremium}</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Security Features</div>
                {active.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 6, marginBottom: 4, fontSize: 12 }}>
                    <span style={{ color: '#22c55e' }}>✓</span><span style={{ color: '#cbd5e1′ }}>{f}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>DFW Examples</div>
                {active.examples.map((e) => (
                  <div key={e} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>📍 {e}</div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', borderTop: '1px solid #1e2e4a', paddingTop: 10 }}>{active.note}</div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🏠 Living Gated in DFW</div>
          {[
            { icon: '🚗', title: 'Delivery & Guest Access', note: 'Amazon, food delivery, and contractors need gate codes or resident approval. Guard-gated communities have visitor management apps.' },
            { icon: '📉', title: 'Does It Lower Insurance?', note: 'Some DFW home insurers offer 5–10% discounts for guard-gated communities. Ask your agent — savings can offset HOA premium.' },
            { icon: '🔄', title: 'Resale Market', note: 'Gated communities in DFW command 5–15% premium over comparable non-gated homes and hold value better in downturns.' },
            { icon: '📊', title: 'HOA Budget Scrutiny', note: 'Gate staffing and maintenance costs are a major HOA line item — always review the HOA reserve fund before purchasing.' },
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
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Get a Gated Community Specialist</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects DFW buyers with agents and HOA attorneys who specialize in gated community transactions and document review.</div>
        </div>
      </div>
    </div>
  );
}
