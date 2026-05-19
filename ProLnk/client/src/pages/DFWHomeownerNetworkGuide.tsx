import { useState } from 'react';

const NETWORK_RESOURCES: Record<string, { priorities: string[]; resources: string[] }> = {
  new_suburb: {
    priorities: ['Join your HOA Facebook group immediately — contractor referrals flow constantly', 'Introduce yourself on Nextdoor and ask for a trusted HVAC and plumber', 'Find one reliable handyman in your neighborhood before you need one'],
    resources: ['HOA directory (usually emailed at closing)', 'Nextdoor app (neighborhood-specific)', 'Facebook neighborhood groups', 'Community pool schedule board for word-of-mouth', 'ProLnk for vetted, reviewed contractors'],
  },
  established_neighborhood: {
    priorities: ['Your neighbors have 10+ years of contractor history — ask before you search Google', 'Find a foundation specialist your neighbors already trust (critical in DFW)', 'Connect with the longtime residents who know who to call and who to avoid'],
    resources: ['Nextdoor neighborhood feed', 'HOA newsletters (older HOAs have vendor lists)', 'Block Facebook groups', 'Annual neighborhood garage sale (great networking)', 'ProLnk for pre-vetted professionals with verified reviews'],
  },
  rural_acreage: {
    priorities: ['Find a well/septic specialist before you need one — rural DFW has limited licensed options', 'Build a relationship with a local farm supply store — they know every rural contractor', 'Join a county Facebook group for rural property owners'],
    resources: ['Texas A&M AgriLife Extension (Collin, Tarrant, Dallas counties)', 'Local feed & farm stores for referrals', 'County Facebook groups for rural homeowners', 'ProLnk for general contractors serving rural DFW'],
  },
  hoa_community: {
    priorities: ['Understand what your HOA covers (roofing, fencing, exterior paint) before hiring anyone', 'Your HOA may have preferred vendors — check before paying out-of-pocket', 'Attend HOA board meetings — you\’ll meet the neighbors who know everything'],
    resources: ['HOA management portal', 'HOA board member contacts', 'Architectural review committee for approval before exterior work', 'ProLnk for contractors familiar with HOA approval processes'],
  },
};

export default function DFWHomeownerNetworkGuide() {
  const [neighborhood, setNeighborhood] = useState('new_suburb');
  const [homeAge, setHomeAge] = useState(10);
  const [submitted, setSubmitted] = useState(false);

  const result = NETWORK_RESOURCES[neighborhood];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          🤝 DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Building Your DFW Homeowner Network</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          Find trusted contractors before you need them. The best DFW homeowners have a plumber, HVAC tech, and handyman on speed dial — plus a platform like ProLnk as the backbone.
        </p>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🏘️ Your Community Type</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {[
              ['new_suburb', '🏗️ New suburb / master-planned community'],
              ['established_neighborhood', '🌳 Established neighborhood (10+ years old)'],
              ['rural_acreage', '🌾 Rural acreage / land outside city limits'],
              ['hoa_community', '🏠 HOA-governed community'],
            ].map(([val, label]) => (
              <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '0.75rem 1rem', borderRadius: 8, background: neighborhood === val ? '#1e3a5f' : '#162035', border: `2px solid ${neighborhood === val ? '#F5E642' : '#334155'}` }}>
                <input type="radio" name="neighborhood" value={val} checked={neighborhood === val} onChange={() => setNeighborhood(val)} style={{ accentColor: '#F5E642′ }} />
                <span style={{ fontWeight: neighborhood === val ? 700 : 400, fontSize: 14 }}>{label}</span>
              </label>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Age (years)</label>
            <input type="range" min={1} max={50} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge} years</div>
          </div>
          <button onClick={() => setSubmitted(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15, width: '100%' }}>
            🗺️ Build My Network Plan
          </button>
        </div>

        {submitted && result && (
          <div>
            {homeAge > 25 && (
              <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: 14, fontSize: 14, color: '#93c5fd' }}>
                🏚️ Older home tip: prioritize finding a structural engineer and foundation specialist — they are harder to find on short notice in DFW.
              </div>
            )}
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>🎯 Network-Building Priorities</div>
              {result.priorities.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.6 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', marginBottom: 14 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📱 Resources for Your Community</div>
              {result.resources.map((r, i) => (
                <div key={i} style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #1e293b' }}>
                  • {r}
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🏆 The Minimum Viable DFW Network</div>
              {['HVAC technician (book before May)', 'Plumber (find before a weekend emergency)', 'Foundation specialist (get an inspection first)', 'Electrician with permit history in your city', 'General handyman for small jobs'].map((item, i) => (
                <div key={i} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>✅ {item}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>ProLnk: your backbone for vetted DFW contractors</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Build your network before you need it — get quotes from background-checked pros in every trade.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Join ProLnk Free →
          </button>
        </div>
      </div>
    </div>
  );
}
