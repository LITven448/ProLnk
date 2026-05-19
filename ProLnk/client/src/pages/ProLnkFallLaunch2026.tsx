import { useState } from 'react';

const projects = [
  { project: '🎨 Exterior Painting', detail: 'Fall temps 55–75°F are ideal for paint adhesion. ProLnk connects you to pre-vetted DFW painters. Expect quotes within 24 hours from Charter pros.' },
  { project: '🏠 Roof Replacement', detail: 'No summer heat, no spring hail. Fall is the optimal roofing window in DFW. ProLnk Charter roofers are available and prioritize ProLnk homeowners.' },
  { project: '🌿 Landscape Redesign', detail: 'Fall planting establishes roots before winter. ProLnk matches landscapers who know DFW soil. Every project logged in Home Health Vault.' },
  { project: '🔲 Fence Installation', detail: 'Ground not frozen, crews available. ProLnk connects you to licensed fence contractors with material pricing locked in before holiday demand.' },
  { project: '🪟 Window Replacement', detail: 'Fall installs seal heat in before winter. ProLnk Charter pros provide binding quotes same day. Home Health Vault stores warranty and specs.' },
];

export default function ProLnkFallLaunch2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a1408 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🍂</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk Fall 2026 Preview
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          Fall is DFW's best window for exterior work. ProLnk Charter pros are ready for your project.
        </p>
        <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', fontSize: '14px', padding: '8px 20px', borderRadius: '999px' }}>
          🍁 Charter pros available now — limited slots remain
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What's your fall project?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select a project to see how ProLnk helps this fall in DFW.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642′ : '#111f35',
                color: selected === i ? '#0A1628′ : '#ffffff',
                border: '1px solid',
                borderColor: selected === i ? '#F5E642′ : '#1e3050',
                borderRadius: '10px',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {p.project}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628′ }}>
                  {p.detail}
                </p>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {['🔍 Verified Pros', '⚡ 1-Hour Response', '🏦 Vault Records'].map((item, i) => (
            <div key={i} style={{ background: '#111f35', borderRadius: '10px', padding: '18px 12px', textAlign: 'center', border: '1px solid #1e3050′ }}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.split(' ')[0]}</div>
              <div style={{ fontSize: '12px', color: '#a0b4cc', fontWeight: '600′ }}>{item.split(' ').slice(1).join(' ')}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050′ }}>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Get Your Fall Project Matched</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.6 }}>
            Join the ProLnk waitlist. Homeowner signups connect to Charter pros in your DFW zip code.
          </p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
            Start Your Fall Project →
          </a>
        </div>
      </div>
    </div>
  );
}