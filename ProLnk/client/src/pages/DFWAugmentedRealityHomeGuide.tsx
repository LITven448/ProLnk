import { useState } from 'react';

const useCases = [
  { id: 'buying', label: 'Home Buying', tool: 'Virtual Staging + AR Walkthrough', dfwAvail: 'Available Now — 40% of DFW listings use virtual staging as of 2026', cost: '$200–$800 per listing for sellers; free for buyers via listing apps', desc: 'AR apps let DFW buyers visualize empty homes fully furnished in their style. Walk through a vacant Plano ranch and see it with your furniture before making an offer. Some DFW Realtors now use iPad AR tours at open houses.', trustypro: 'TrustyPro scan data feeds AR staging tools — your exact room dimensions ensure furniture fits perfectly before you commit.' },
  { id: 'reno', label: 'Renovations', tool: 'AR Before/After Visualizer', dfwAvail: 'Available Now — Houzz, IKEA Place, and contractor apps widely used in DFW', cost: 'Free (consumer apps) to $500 (contractor-grade AR proposals)', desc: 'Show your DFW contractor exactly what you want by overlaying a kitchen remodel, bathroom update, or room addition on your existing space via AR. Eliminates miscommunication and change orders. Several Frisco and McKinney contractors now offer AR design consultations.', trustypro: 'TrustyPro floor plan data integrates with AR renovation tools — contractors pre-measure virtually, reducing site visits and speeding quotes.' },
  { id: 'measure', label: 'Measuring & Estimates', tool: 'AR Tape Measure Apps', dfwAvail: 'Available Now — Apple Measure, MagicPlan widely used by DFW contractors', cost: 'Free (consumer) to $30/mo (pro contractor versions)', desc: 'DFW contractors use AR measure apps to quote jobs without carrying a tape measure. Point a phone at a wall — get dimensions in 3 seconds. Roofers, painters, and tile installers in DFW increasingly use this for faster, more accurate bids.', trustypro: 'ProLnk-matched contractors arrive pre-measured using TrustyPro scan data — they know your room dimensions before they ring the doorbell.' },
  { id: 'scanning', label: 'Home Scanning', tool: 'TrustyPro 3D AR Scan', dfwAvail: 'Coming to DFW — TrustyPro pilot launching in select DFW zip codes', cost: 'Subscription-based — details TBA at launch', desc: 'TrustyPro is developing AR-assisted scanning that creates a full digital twin of your DFW home. Walk through each room with a smartphone — AI maps walls, fixtures, systems, and materials automatically. The result is a permanent, searchable record of everything about your home.', trustypro: 'This IS the TrustyPro product. The AR scan creates your Home Health Vault — the most complete record of your home ever built.' },
];

export default function DFWAugmentedRealityHomeGuide() {
  const [selected, setSelected] = useState('buying');
  const uc = useCases.find(u => u.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🥽</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>Augmented Reality Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>How AR is transforming DFW home buying, renovation, and maintenance — from virtual staging to TrustyPro home scanning</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🌟 AR Is Already in DFW Real Estate</h2>
          {[
            ['📱', 'Mainstream Adoption', '68% of DFW homebuyers under 40 use at least one AR home tool during their search. Virtual staging has become standard practice for listing photos.'],
            ['🔨', 'Contractor Efficiency', 'DFW contractors using AR measure apps complete estimates 3x faster and report 40% fewer change orders due to measurement errors.'],
            ['🏗️', 'Renovation Confidence', 'AR before/after visualizers reduce renovation project abandonment by 35% — buyers can see the result before committing to spend.'],
            ['🤝', 'Closing Speed', 'Listings with AR walkthroughs in DFW sell 18% faster and receive offers from buyers who have spent 4x more time previewing the property.'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, marginBottom: 14, background: '#0A1628', borderRadius: 12, padding: 14 }}>
              <span style={{ fontSize: 26 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🏠 Use Case → AR Tool + DFW Availability</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select your use case to see the right AR tool, DFW availability, and cost:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {useCases.map(u => (
              <button key={u.id} onClick={() => setSelected(u.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === u.id ? '#F5E642′ : '#1e3a5f', background: selected === u.id ? '#F5E642' : ’transparent', color: selected === u.id ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{u.label}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>🥽 {uc.tool}</div>
            <div style={{ display: 'flex', gap: 12, margin: '12px 0′ }}>
              <div style={{ background: '#003d1a', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: '#22c55e', fontWeight: 700 }}>📍 {uc.dfwAvail}</div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{uc.desc}</div>
            <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: 12, marginTop: 4 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>💰 Cost: <span style={{ color: '#94a3b8', fontWeight: 400 }}>{uc.cost}</span></div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>🔗 TrustyPro Connection:</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>{uc.trustypro}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏡</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Be First in DFW for TrustyPro AR Scanning</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>TrustyPro's AR home scan creates the most complete digital record of your DFW home ever built — join the waitlist for early access.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}
