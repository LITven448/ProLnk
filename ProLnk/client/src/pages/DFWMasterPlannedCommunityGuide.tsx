import { useState } from 'react';

const COMMUNITIES = [
  { name: 'Westlake', city: 'Westlake', hoaFee: '$400-800/mo', school: 'Westlake Academy (IB)', amenities: ['No municipal tax', 'Gated estates', 'Top-rated private charter'], type: 'Ultra-luxury', medianPrice: '$2.8M', note: 'Residents vote on town governance; zero property tax in exchange for HOA' },
  { name: 'Windsong Ranch', city: 'Prosper', hoaFee: '$160-200/mo', school: 'Prosper ISD', amenities: ['Lagoon-style pool', '10mi trails', 'Canoe launch', 'Dog park'], type: 'Premium family', medianPrice: '$650K', note: 'Award-winning amenity package; Prosper ISD rated among top 10 in Texas' },
  { name: 'Hollyhock', city: 'Frisco', hoaFee: '$120-160/mo', school: 'Frisco ISD', amenities: ['Lazy river', 'Splash pad', 'Event lawn', 'Fitness club'], type: 'Family community', medianPrice: '$520K', note: 'Near PGA of America HQ; Frisco ISD consistently rated among best in state' },
  { name: 'Artavia', city: 'Conroe/N. DFW', hoaFee: '$95-130/mo', school: 'Conroe ISD', amenities: ['Activity center', 'Community pond', 'Nature trails', 'Yoga lawn'], type: 'Value-oriented MPC', medianPrice: '$380K', note: 'Newer entrant; MUD district taxes add $150-250/mo to effective cost' },
  { name: 'Light Farms', city: 'Celina', hoaFee: '$135-175/mo', school: 'Prosper ISD', amenities: ['5 pools', 'Restaurant on-site', '13mi trails', 'Tennis'], type: 'Lifestyle-focused', medianPrice: '$480K', note: 'One of DFW largest MPCs; retail and dining built in from day 1' },
];

const RESALE_COMPARISON = [
  { metric: '5-year appreciation', mpc: '28-42%', nonMpc: '18-28%' },
  { metric: 'Days on market', mpc: '18-28 days', nonMpc: '32-55 days' },
  { metric: 'HOA-related buyer pool', mpc: 'Larger (family buyers seek amenities)', nonMpc: 'Broader (HOA-free appeals to some)' },
  { metric: 'School district premium', mpc: 'Built in (location chosen for schools)', nonMpc: 'Variable' },
  { metric: 'Maintenance of common areas', mpc: 'Professionally managed and funded', nonMpc: 'City-dependent' },
];

type Priority = 'amenities' | 'schools' | 'price' | 'size';

function getRecommendations(priorities: Priority[]): { name: string; why: string }[] {
  const top = priorities[0];
  if (top === 'amenities') return [
    { name: 'Windsong Ranch (Prosper)', why: 'Award-winning lagoon pool system, 10mi of trails, canoe launch' },
    { name: 'Light Farms (Celina)', why: '5 pools, tennis courts, on-site restaurant and retail' },
    { name: 'Hollyhock (Frisco)', why: 'Lazy river, splash pad, event lawn, fitness club' },
    { name: 'Westlake', why: 'Ultra-premium amenities for luxury buyers; lowest tax burden in Texas' },
    { name: 'Artavia', why: 'Best value entry-level MPC amenities; good for first-time MPC buyers' },
  ];
  if (top === 'schools') return [
    { name: 'Hollyhock (Frisco ISD)', why: 'Frisco ISD consistently top 5 in Texas; near Frisco RoughRiders and PGA HQ' },
    { name: 'Windsong Ranch (Prosper ISD)', why: 'Prosper ISD top 10 in Texas; smaller district means more personal attention' },
    { name: 'Light Farms (Prosper ISD)', why: 'Same elite district as Windsong at slightly lower price point' },
    { name: 'Westlake Academy', why: 'IB charter school inside the community; unique private-quality public option' },
    { name: 'Artavia (Conroe ISD)', why: 'Solid district; better value but lower ranking than Frisco/Prosper' },
  ];
  if (top === 'price') return [
    { name: 'Artavia (~$380K median)', why: 'Lowest entry point among major DFW MPCs; MUD tax offset by lower base price' },
    { name: 'Light Farms (~$480K median)', why: 'Premium amenities at mid-range price; Celina pricing below Frisco/Prosper comps' },
    { name: 'Hollyhock (~$520K median)', why: 'Best value inside Frisco; premium school district at lower $/sqft than Windsong' },
    { name: 'Windsong Ranch (~$650K median)', why: 'Higher entry but strong appreciation track record in Prosper' },
    { name: 'Westlake ($2.8M+ median)', why: 'Ultra-luxury but zero municipal tax; effective cost lower than it appears' },
  ];
  return [
    { name: 'Windsong Ranch', why: 'Largest lot sizes among premium Prosper communities; room to grow' },
    { name: 'Westlake', why: 'Large estate lots with natural buffer zones; most privacy in DFW MPCs' },
    { name: 'Artavia', why: 'Newer phase developments offer larger lots than established MPCs' },
    { name: 'Light Farms', why: 'Phase 3 and 4 lots trending larger; good mix of density levels' },
    { name: 'Hollyhock', why: 'Mid-size lots typical for Frisco; trade off size for school district quality' },
  ];
}

export default function DFWMasterPlannedCommunityGuide() {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [result, setResult] = useState<{ name: string; why: string }[] | null>(null);

  const priorityOptions: { value: Priority; label: string }[] = [
    { value: 'amenities', label: '🏊 Amenities' },
    { value: 'schools', label: '📚 Schools' },
    { value: 'price', label: '💰 Price' },
    { value: 'size', label: '📐 Lot Size' },
  ];

  const togglePriority = (p: Priority) => {
    setPriorities(prev => {
      if (prev.includes(p)) return prev.filter(x => x !== p);
      if (prev.length >= 2) return [prev[1], p];
      return [...prev, p];
    });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', color: '#F5E642', letterSpacing: '2px', marginBottom: '12px' }}>🏙️ DFW COMMUNITY GUIDE</div>
          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px' }}>Master-Planned Communities in DFW</h1>
          <p style={{ fontSize: '16px', color: '#94A3B8', margin: '0', maxWidth: '640px' }}>
            Top MPCs compared - amenities, schools, resale value, and how to pick the right one for your priorities.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>🏘️ Top DFW Master-Planned Communities</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {COMMUNITIES.map((c, i) => (
              <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '24px', border: '1px solid #1E3A5F' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>{c.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>{c.city} • {c.type}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#F5E642' }}>{c.medianPrice}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>median price</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>HOA FEE</div>
                    <div style={{ fontSize: '14px', color: '#CBD5E1', fontWeight: '600' }}>{c.hoaFee}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '2px' }}>SCHOOL DISTRICT</div>
                    <div style={{ fontSize: '14px', color: '#CBD5E1', fontWeight: '600' }}>{c.school}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                  {c.amenities.map((a, j) => (
                    <span key={j} style={{ background: '#1E3A5F', color: '#94A3B8', padding: '3px 10px', borderRadius: '12px', fontSize: '12px' }}>{a}</span>
                  ))}
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', borderTop: '1px solid #1E3A5F', paddingTop: '10px' }}>{c.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '20px' }}>📈 MPC vs Non-MPC Resale Comparison</h2>
          <div style={{ background: '#112240', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#0A1628', padding: '12px 20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Metric</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#F5E642' }}>Master-Planned</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>Standard Subdivision</span>
            </div>
            {RESALE_COMPARISON.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 20px', borderBottom: '1px solid #0A1628' }}>
                <span style={{ fontSize: '13px', color: '#94A3B8' }}>{row.metric}</span>
                <span style={{ fontSize: '13px', color: '#CBD5E1', fontWeight: '600' }}>{row.mpc}</span>
                <span style={{ fontSize: '13px', color: '#64748B' }}>{row.nonMpc}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '40px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>🎯 Find Your Best MPC Match</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px' }}>Select your top 1-2 priorities to get personalized community recommendations.</p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {priorityOptions.map(p => (
              <button key={p.value} onClick={() => togglePriority(p.value)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '2px solid', fontSize: '14px', cursor: 'pointer',
                  background: priorities.includes(p.value) ? '#F5E642' : 'transparent',
                  color: priorities.includes(p.value) ? '#0A1628' : '#94A3B8',
                  borderColor: priorities.includes(p.value) ? '#F5E642' : '#334155' }}>
                {p.label}
              </button>
            ))}
          </div>

          <button onClick={() => priorities.length > 0 && setResult(getRecommendations(priorities))}
            disabled={priorities.length === 0}
            style={{ background: priorities.length > 0 ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: priorities.length > 0 ? 'pointer' : 'not-allowed' }}>
            Get My Top 5 Recommendations
          </button>

          {result && (
            <div style={{ marginTop: '24px' }}>
              {result.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', padding: '14px', background: '#0A1628', borderRadius: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>{r.name}</div>
                    <div style={{ fontSize: '13px', color: '#94A3B8' }}>{r.why}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div style={{ background: '#112240', borderRadius: '10px', padding: '20px', fontSize: '13px', color: '#64748B' }}>
          📋 MUD district taxes can add $150-400/mo to effective costs in newer DFW developments. Always request the MUD tax rate disclosure before making an offer.
        </div>
      </div>
    </div>
  );
}
