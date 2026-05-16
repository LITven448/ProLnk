import { useState } from 'react';

const credentials = [
  {
    name: 'GAF Master Elite',
    type: 'Manufacturer',
    difficulty: 'Hard',
    pct: '2% of roofers qualify',
    icon: '🥇',
    income: '+18–25% per job',
    steps: ['Proven track record of quality installs', 'GAF inspector audit of 3+ recent jobs', 'Insurance and licensing verified', 'Annual renewal with continuing ed'],
  },
  {
    name: 'Owens Corning Platinum',
    type: 'Manufacturer',
    difficulty: 'Medium',
    pct: '~8% of roofers qualify',
    icon: '🥈',
    income: '+10–15% per job',
    steps: ['Minimum volume of OC shingles sold', 'Customer satisfaction requirement', 'Licensing and insurance on file', 'Online portal registration'],
  },
  {
    name: 'Dallas City Registration',
    type: 'Municipal',
    difficulty: 'Easy',
    pct: 'Required to pull permits',
    icon: '🏙️',
    income: 'Access to permitted work',
    steps: ['Submit application to Dallas Development Services', 'Proof of general liability ($500K min)', 'Proof of workers comp', '$50 annual fee'],
  },
  {
    name: 'Fort Worth City Registration',
    type: 'Municipal',
    difficulty: 'Easy',
    pct: 'Required to pull permits',
    icon: '🏙️',
    income: 'Access to permitted work',
    steps: ['Fort Worth Development permit office', 'Insurance certificates', 'Business entity docs', '$35 annual fee'],
  },
  {
    name: 'BBB Accreditation',
    type: 'Trust',
    difficulty: 'Medium',
    pct: '~15% of roofers hold',
    icon: '✅',
    income: '+8% close rate on DFW leads',
    steps: ['Apply at bbb.org/accreditation', 'Background check on owner', 'Review of complaints and resolutions', '$400–800/yr fee depending on size'],
  },
];

export default function DFWRoofingCertificationDFWGuide() {
  const [stage, setStage] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [recommendations, setRecommendations] = useState<typeof credentials>([]);

  function getRecommendations() {
    let list: typeof credentials = [];
    list.push(credentials[2]);
    list.push(credentials[3]);
    if (stage === 'Established' || stage === 'Growing') {
      list.push(credentials[4]);
    }
    if (manufacturer === 'GAF' && stage === 'Established') {
      list.unshift(credentials[0]);
    } else if (manufacturer === 'Owens Corning') {
      list.unshift(credentials[1]);
    }
    setRecommendations(list.slice(0, 4));
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            DFW Roofing Credentials Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 640, margin: '0 auto' }}>
            Texas doesn't require a roofing license — but in DFW, credentials are everything.
            The right certifications separate you from the storm-chaser competition and unlock premium pricing.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 40 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>⚠️ The Texas Roofing Reality</div>
          <p style={{ color: '#9BB0CC', margin: 0, lineHeight: 1.7 }}>
            Texas is one of the only states with no statewide roofing license requirement. After every hail storm, DFW is flooded
            with out-of-state roofers with zero credentials. Earning verified credentials is how you prove to homeowners that
            you're not one of them—and command the premium your quality deserves.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {credentials.map(c => (
            <div key={c.name} style={{ background: '#0F2040', borderRadius: 12, padding: 22, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#9BB0CC', fontSize: 13, marginBottom: 4 }}>{c.type} · {c.difficulty}</div>
              <div style={{ color: '#9BB0CC', fontSize: 13, marginBottom: 8 }}>{c.pct}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '8px 12px', color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
                📈 {c.income}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Build Your Credential Roadmap</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Business Stage</label>
              <select
                value={stage}
                onChange={e => setStage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select stage</option>
                <option value="New">New (0–2 years)</option>
                <option value="Growing">Growing (2–5 years)</option>
                <option value="Established">Established (5+ years)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Primary Manufacturer</label>
              <select
                value={manufacturer}
                onChange={e => setManufacturer(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select or skip</option>
                <option value="GAF">GAF</option>
                <option value="Owens Corning">Owens Corning</option>
                <option value="CertainTeed">CertainTeed</option>
                <option value="Other">Other / Mixed</option>
              </select>
            </div>
          </div>
          <button
            onClick={getRecommendations}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Get My Credential Plan →
          </button>
          {recommendations.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 12 }}>✅ Credential Priority List</div>
              {recommendations.map((r, i) => (
                <div key={r.name} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10, border: '1px solid #1E3A5F' }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>{i + 1}. {r.icon} {r.name}</div>
                  <div style={{ color: '#9BB0CC', fontSize: 13, lineHeight: 1.6 }}>
                    {r.steps.map((s, j) => <div key={j}>• {s}</div>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk Verified Roofer Badge</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            ProLnk displays your credentials on your public profile—GAF Master Elite, Owens Corning Platinum, and city
            registration status are all verified and shown to homeowners before they request a quote. Credentialed roofers on
            ProLnk see 2.3x higher quote acceptance rates than non-credentialed peers in the same DFW zip code.
          </p>
        </div>

      </div>
    </div>
  );
}
