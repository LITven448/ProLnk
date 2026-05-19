import { useState } from 'react';

const RISK_DATA: Record<string, Record<string, { risk: string; urgency: string; notes: string }>> = {
  pre1980: {
    within1mile: { risk: 'Critical', urgency: 'Inspect within 30 days', notes: 'Aging materials + direct lake weather = highest damage risk' },
    within5miles: { risk: 'High', urgency: 'Inspect within 60 days', notes: 'Storm corridor exposure on older roof systems' },
    beyond5miles: { risk: 'Moderate-High', urgency: 'Inspect this season', notes: 'Age alone warrants professional assessment' },
  },
  '1980to2000': {
    within1mile: { risk: 'High', urgency: 'Inspect within 45 days', notes: 'Lake proximity accelerates wear on 25-45 year materials' },
    within5miles: { risk: 'Moderate-High', urgency: 'Inspect within 90 days', notes: 'Mid-life roof in active storm zone' },
    beyond5miles: { risk: 'Moderate', urgency: 'Annual inspection', notes: 'Standard maintenance schedule recommended' },
  },
  post2000: {
    within1mile: { risk: 'Moderate', urgency: 'Inspect after major storms', notes: 'Newer materials still face lake wind + moisture stress' },
    within5miles: { risk: 'Low-Moderate', urgency: 'Biennial inspection', notes: 'Monitor for hail impact and wind uplift' },
    beyond5miles: { risk: 'Low', urgency: 'Standard 5-year cycle', notes: 'Good shape — maintain gutters and flashing' },
  },
};

export default function DFWRooferRowlett() {
  const [homeAge, setHomeAge] = useState('');
  const [proximity, setProximity] = useState('');
  const [result, setResult] = useState<{ risk: string; urgency: string; notes: string } | null>(null);

  function assess() {
    if (homeAge && proximity) setResult(RISK_DATA[homeAge][proximity]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌊🏠</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Rowlett TX Roofers</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          Lake Ray Hubbard Storm Specialists — serving lakeside Rowlett since the community was built
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>⚠️ Why Rowlett Roofs Face Unique Risks</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🌊', label: 'Lake Ray Hubbard Exposure', desc: 'Open water amplifies wind speeds and moisture — roofs within 1-5 miles weather faster than inland DFW homes' },
              { icon: '⛈️', label: 'DFW Storm Corridor', desc: 'Rowlett sits in the northeastern storm path — hail, straight-line winds, and tornadic activity are seasonal realities' },
              { icon: '🏚️', label: '1980s–1990s Housing Stock', desc: 'Most Rowlett neighborhoods were built 35–45 years ago — original roofs are at or past end-of-life' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#E8EDF5', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#8898AA', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🔍 Storm Risk + Inspection Urgency Calculator</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Home Age</label>
              <select
                value={homeAge}
                onChange={(e) => { setHomeAge(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select era...</option>
                <option value="pre1980">Before 1980 (45+ years old)</option>
                <option value="1980to2000">1980–2000 (25–45 years old)</option>
                <option value="post2000">After 2000 (under 25 years old)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Distance from Lake Ray Hubbard</label>
              <select
                value={proximity}
                onChange={(e) => { setProximity(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select proximity...</option>
                <option value="within1mile">Within 1 mile of lake</option>
                <option value="within5miles">1–5 miles from lake</option>
                <option value="beyond5miles">5+ miles inland</option>
              </select>
            </div>
          </div>
          <button
            onClick={assess}
            disabled={!homeAge || !proximity}
            style={{ width: '100%', background: homeAge && proximity ? '#F5E642' : '#2A4080', color: homeAge && proximity ? '#0A1628' : '#4A6080', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeAge && proximity ? 'pointer' : 'not-allowed' }}
          >
            Assess My Storm Risk
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: `1px solid ${result.risk === 'Critical' ? '#FF4444' : result.risk === 'High' ? '#FF8C00' : '#F5E642'}` }}>
              <div style={{ fontWeight: '800', fontSize: '18px', color: result.risk === 'Critical' ? '#FF4444' : result.risk === 'High' ? '#FF8C00' : '#F5E642', marginBottom: '4px' }}>{result.risk} Risk</div>
              <div style={{ color: '#E8EDF5', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>🕐 {result.urgency}</div>
              <div style={{ color: '#8898AA', fontSize: '13px' }}>{result.notes}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📞</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Get a Free Rowlett Roof Inspection</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>Storm-certified inspectors. Insurance claim support. Same-week availability.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Rowlett Roofer →
          </a>
        </div>
      </div>
    </div>
  );
}
