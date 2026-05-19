import { useState } from 'react';

const roofVintages = ['Pre-2000', '2000-2010', '2010-2020', '2020+'];
const stormEvents = ['None in 3 years', 'Minor (< 1″ hail)', 'Moderate (1-2″ hail)', 'Severe (2″+ hail / high winds)'];

function getUrgency(vintage: string, storm: string) {
  const vintageScore = roofVintages.indexOf(vintage);
  const stormScore = stormEvents.indexOf(storm);
  const total = vintageScore + stormScore;
  if (total >= 5) return { level: 'CRITICAL', action: 'Emergency inspection within 48 hours. File insurance claim immediately.', color: '#FF4444′ };
  if (total >= 3) return { level: 'HIGH', action: 'Schedule professional inspection within 2 weeks. Document visible damage.', color: '#FF8C00′ };
  if (total >= 1) return { level: 'MODERATE', action: 'Annual inspection recommended. Monitor for granule loss and soft spots.', color: '#F5E642′ };
  return { level: 'LOW', action: 'Standard 3-year inspection cycle. Keep gutters clear after storms.', color: '#44FF88′ };
}

export default function DFWRooferWylie() {
  const [vintage, setVintage] = useState('');
  const [storm, setStorm] = useState('');
  const result = vintage && storm ? getUrgency(vintage, storm) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          🏠 ProLnk — East Collin County
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          Wylie TX Roofers<br />
          <span style={{ color: '#F5E642′ }}>East Collin County Storm Specialists</span>
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, lineHeight: 1.7, marginBottom: 40 }}>
          Wylie sits directly in the storm corridor tracking northeast out of DFW. With thousands of homes built between 2000 and 2020, many roofs are hitting peak vulnerability just as storm intensity increases. Our vetted Wylie roofers know east Collin County codes, HOA requirements, and insurance documentation standards.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { emoji: '⛈️', label: 'Storm Corridor Experts', desc: 'Specialized in NE DFW storm damage assessment and documentation' },
            { emoji: '🏘️', label: 'HOA Compliant', desc: 'All Wylie and east Collin County HOA color and material requirements' },
            { emoji: '📋', label: 'Insurance Savvy', desc: 'Experienced with all major carriers operating in Collin County' },
            { emoji: '⚡', label: 'Fast Mobilization', desc: '24-48 hour post-storm inspection scheduling available' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>{card.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, border: '1px solid #F5E642', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>
            🔍 Storm Inspection Urgency Calculator
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Enter your roof details to get a personalized urgency rating and recommended next step.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Roof Vintage
              </label>
              <select
                value={vintage}
                onChange={e => setVintage(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select vintage...</option>
                {roofVintages.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Recent Storm Activity
              </label>
              <select
                value={storm}
                onChange={e => setStorm(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}
              >
                <option value="">Select storm event...</option>
                {stormEvents.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ background: result.color, color: '#000', fontWeight: 800, fontSize: 13, padding: '4px 12px', borderRadius: 20 }}>
                  {result.level} PRIORITY
                </span>
              </div>
              <p style={{ color: '#E2E8F0', fontSize: 16, lineHeight: 1.6, marginBottom: 0 }}>{result.action}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 16, padding: 32, marginBottom: 40, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Why Wylie Homeowners Trust ProLnk</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { num: '48hr', label: 'Average Match Time' },
              { num: '3', label: 'Quotes Guaranteed' },
              { num: '$0', label: 'Cost to Homeowners' },
              { num: '100%', label: 'Licensed & Insured Pros' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>{s.num}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 18, padding: '16px 48px', borderRadius: 50, border: 'none', cursor: 'pointer' }}
            onClick={() => alert('Redirecting to ProLnk homeowner signup...')}
          >
            Get Free Roof Quotes — Wylie TX
          </button>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>No obligation · 3 local roofers compete for your business</p>
        </div>
      </div>
    </div>
  );
}
