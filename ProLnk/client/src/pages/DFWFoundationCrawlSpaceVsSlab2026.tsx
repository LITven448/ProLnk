import { useState } from 'react';

export default function DFWFoundationCrawlSpaceVsSlab2026() {
  const [foundationType, setFoundationType] = useState('');

  const getGuide = () => {
    if (!foundationType) return null;
    if (foundationType === 'slab') return {
      title: 'Your Slab Foundation in DFW', pros: ['Most common DFW choice — contractors deeply familiar with repair techniques', 'Less moisture intrusion from below than crawl space', 'Lower construction cost — no crawl space framing or venting required', 'No pest entry from below that a crawl space can allow'], cons: ['All plumbing runs through slab — leaks require tunneling or slab penetration', 'DFW clay expansion directly contacts slab — seasonal movement guaranteed', 'No access to plumbing, electrical, or HVAC runs without cutting', 'Slab-on-grade means any soil moisture change directly affects foundation'], tip: 'Install a leak detection system and maintain soil moisture with soaker hoses year-round.'
    };
    if (foundationType === 'pier-and-beam') return {
      title: 'Your Pier & Beam Foundation in DFW', pros: ['Easy plumbing access — repair without tunneling or excavation', 'Crawl space allows inspection of structural members and utilities', 'Older Dallas neighborhoods preserve more of these — good for character homes', 'Adjustable piers allow leveling without full replacement'], cons: ['Crawl space humidity in DFW summers creates mold and rot risk', 'Pest entry (termites, rodents) more likely through crawl space vents', 'Annual inspection required — wood beams deteriorate in DFW humidity', 'Vapor barrier maintenance is critical and often neglected'], tip: 'Encapsulate your crawl space and install a dehumidifier. This single improvement prevents most pier & beam failures in DFW.'
    };
    if (foundationType === 'unknown') return {
      title: 'How to Identify Your DFW Foundation Type', pros: ['Walk your exterior perimeter — slab has no gap between home and ground', 'Look for crawl space vents (screened openings near grade) = pier & beam', 'Check your utility bills — pier & beam homes often have accessible cleanouts', 'Ask your home inspector report — foundation type is always documented'], cons: ['Mixing up foundation types leads to wrong maintenance approach', 'Applying slab moisture management to pier & beam can cause vapor issues', 'Incorrect foundation type on insurance claims causes delays'], tip: '90%+ of DFW homes built after 1970 are slab. Pre-1960 Dallas homes are more likely pier & beam.'
    };
    return {
      title: 'DFW Foundation Type Comparison Overview', pros: ['Slab dominates DFW: 90%+ of homes built since 1970', 'DFW chose slab because it performs better in expansive clay than wood framing', 'Pier & beam survives in older Dallas, Oak Cliff, and pre-war neighborhoods', 'Neither is inherently superior — maintenance and drainage matter most'], cons: ['Both types require soil moisture management in DFW clay', 'Both require professional inspection every 3–5 years in DFW conditions', 'Both are vulnerable to plumbing leaks under or within foundation'], tip: 'The #1 predictor of foundation health in DFW is drainage and consistent soil moisture — not foundation type.'
    };
  };

  const guide = getGuide();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.2 }}>🏗️ DFW Crawl Space vs. Slab Foundation Guide 2026</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem' }}>DFW is overwhelmingly a slab market, but pier & beam homes persist in older neighborhoods. Each has specific advantages and challenges in North Texas clay soil.</p>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>📊 DFW Foundation Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[{type:'Slab',pct:'90%+',note:'Post-1970 DFW standard',icon:'🟦'},{type:'Pier & Beam',pct:'<10%',note:'Pre-1960 Dallas neighborhoods',icon:'🟫'}].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{item.type}</div>
                <div style={{ color: '#E8EAF0', fontSize: '1.4rem', fontWeight: 700 }}>{item.pct}</div>
                <div style={{ color: '#9BA3B2', fontSize: '0.8rem' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Foundation Guide</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', color: '#9BA3B2', fontSize: '0.9rem' }}>Your foundation type</label>
          <select value={foundationType} onChange={e => setFoundationType(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EAF0', fontSize: '0.95rem' }}>
            <option value="">Select foundation type...</option>
            <option value="slab">Slab-on-grade (most DFW homes)</option>
            <option value="pier-and-beam">Pier & beam / crawl space</option>
            <option value="unknown">Not sure — help me identify it</option>
            <option value="comparing">Just comparing options</option>
          </select>
        </div>

        {guide && (
          <div style={{ background: '#0F2744', border: '2px solid #F5E642', borderRadius: '12px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>✅ {guide.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#4CAF50', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>✅ Advantages</div>
                {guide.pros.map((p, i) => <div key={i} style={{ color: '#CBD2DC', fontSize: '0.85rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #4CAF50′ }}>{p}</div>)}
              </div>
              <div>
                <div style={{ color: '#FF6B6B', fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>⚠️ Considerations</div>
                {guide.cons.map((c, i) => <div key={i} style={{ color: '#CBD2DC', fontSize: '0.85rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #FF6B6B' }}>{c}</div>)}
              </div>
            </div>
            <div style={{ background: '#1A2F4A', borderRadius: '8px', padding: '0.75rem 1rem', color: '#9BA3B2', fontSize: '0.88rem', fontStyle: 'italic' }}>💡 {guide.tip}</div>
          </div>
        )}
      </div>
    </div>
  );
}