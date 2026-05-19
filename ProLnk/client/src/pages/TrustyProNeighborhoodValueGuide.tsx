import { useState } from 'react';

const DATA_COLLECTED = [
  { emoji: '❤️', label: 'Average Health Scores by ZIP', desc: 'Anonymized aggregate scores — see how your neighborhood trends over time.' },
  { emoji: '⚠️', label: 'Most Common Issues by Neighborhood', desc: 'e.g. "75034 has high HVAC aging rate" — proactive alerts before problems escalate.' },
  { emoji: '⛈️', label: 'Storm Damage Patterns', desc: 'Which neighborhoods have unaddressed damage affecting home values.' },
  { emoji: '📈', label: 'Maintenance Trends', desc: 'Improving vs. declining neighborhoods — critical for resale value protection.' },
];

const VALUE_PROTECTIONS = [
  { title: 'Early Warning', desc: 'If your neighbors aren’t maintaining their homes, it affects your value. TrustyPro alerts you to neighborhood trends before they show up in Zillow.' },
  { title: 'Insurance', desc: 'Areas with high water damage rates see insurance premium increases. Proactive maintenance helps keep your rates competitive.' },
  { title: 'Resale Positioning', desc: 'When you list, TrustyPro data lets you differentiate: "Our home health score: 87 vs. neighborhood average 71."' },
];

const MOCK_ZIPS: Record<string, { score: number; topIssue: string; trend: string; unaddressed: string }> = {
  '75034': { score: 71, topIssue: 'HVAC aging (avg 14.2 years)', trend: 'Declining (-3pts YoY)', unaddressed: '22%' },
  '75035': { score: 79, topIssue: 'Roof age (avg 12.8 years)', trend: 'Stable (+1pt YoY)', unaddressed: '14%' },
  '75024': { score: 83, topIssue: 'Foundation movement (minor)', trend: 'Improving (+4pts YoY)', unaddressed: '9%' },
  '75025': { score: 68, topIssue: 'Water heater age (avg 11.1 years)', trend: 'Declining (-5pts YoY)', unaddressed: '28%' },
  '76262': { score: 77, topIssue: 'Electrical panel age (avg 22 years)', trend: 'Stable (0pts YoY)', unaddressed: '17%' },
  '75056': { score: 85, topIssue: 'Minor plumbing (faucets/fixtures)', trend: 'Improving (+6pts YoY)', unaddressed: '8%' },
};

export default function TrustyProNeighborhoodValueGuide() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<typeof MOCK_ZIPS[string] | null>(null);
  const [notFound, setNotFound] = useState(false);

  function lookup() {
    const data = MOCK_ZIPS[zip.trim()];
    if (data) { setResult(data); setNotFound(false); }
    else { setResult(null); setNotFound(true); }
  }

  const scoreColor = (score: number) => score >= 80 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{ background: '#fafaf9', minHeight: '100vh', color: '#1a1a1a', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f2a47 0%, #1e3a5f 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏘️</div>
        <h1 style={{ fontSize: 'clamp(20px, 5vw, 36px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
          TrustyPro Neighborhood Intelligence
        </h1>
        <p style={{ fontSize: 18, color: '#93c5fd', maxWidth: 600, margin: '0 auto' }}>How Local Data Protects Your Home's Value</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Data Collected */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: '40px 0 20px' }}>What Neighborhood-Level Data We Collect</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {DATA_COLLECTED.map(d => (
            <div key={d.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{d.emoji}</div>
              <div style={{ fontWeight: 700, color: '#1e3a5f', marginBottom: 8, fontSize: 14 }}>{d.label}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{d.desc}</div>
            </div>
          ))}
        </div>

        {/* How This Protects Value */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: '48px 0 20px' }}>How This Protects Your Home's Value</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {VALUE_PROTECTIONS.map((v, i) => (
            <div key={v.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, display: 'flex', gap: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ background: '#1e3a5f', color: '#fff', borderRadius: 999, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1e3a5f', marginBottom: 8 }}>{v.title}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Network Effect */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: 28, margin: '40px 0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', margin: '0 0 12px' }}>🔗 The Neighborhood Network Effect</h2>
          <p style={{ color: '#374151', lineHeight: 1.8, margin: 0 }}>
            When <strong>5+ homes on your block</strong> join TrustyPro, group deals become available.
            When <strong>20+ join</strong>, our AI has enough data to provide block-level predictive maintenance — telling you what's likely to fail next before it fails.
          </p>
        </div>

        {/* Recruiting Neighbors */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 28, margin: '0 0 40px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#166534', margin: '0 0 16px' }}>💰 Earn by Recruiting Neighbors</h2>
          <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
            <li style={{ color: '#374151', lineHeight: 1.8, marginBottom: 8 }}>Each homeowner you refer earns you <strong>$25–100</strong> when they book their first service</li>
            <li style={{ color: '#374151', lineHeight: 1.8, marginBottom: 8 }}>As a ProLnk partner, you earn <strong>origination rights</strong> on maintenance jobs at homes you bring in</li>
            <li style={{ color: '#374151', lineHeight: 1.8 }}>Share your homeowner referral link with neighbors after every job</li>
          </ul>
        </div>

        {/* Neighborhood Visualizer */}
        <div style={{ background: '#fff', border: '2px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', margin: '0 0 8px' }}>🗺️ Neighborhood Health Visualizer</h2>
          <p style={{ color: '#666', margin: '0 0 24px', fontSize: 14 }}>Enter your DFW ZIP code to see neighborhood health metrics (demo data).</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && lookup()}
              placeholder="e.g. 75034"
              maxLength={5}
              style={{ flex: 1, background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 8, padding: '10px 14px', fontSize: 15, color: '#1a1a1a' }}
            />
            <button onClick={lookup} style={{ background: '#1e3a5f', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Look Up
            </button>
          </div>
          {notFound && <div style={{ color: '#ef4444', fontSize: 14 }}>ZIP code not in demo dataset. Try: 75034, 75035, 75024, 75025, 76262, or 75056.</div>}
          {result && (
            <div style={{ background: '#f8faff', border: '1px solid #e0e9ff', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>NEIGHBORHOOD HEALTH SCORE — {zip}</div>
              <div style={{ fontSize: 52, fontWeight: 900, color: scoreColor(result.score), marginBottom: 16, lineHeight: 1 }}>{result.score}<span style={{ fontSize: 20 }}>/100</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
                <div><div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>TOP ISSUE</div><div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{result.topIssue}</div></div>
                <div><div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>TREND</div><div style={{ fontSize: 14, fontWeight: 600, color: result.trend.includes('Improving') ? '#22c55e' : result.trend.includes('Declining') ? '#ef4444' : '#f59e0b' }}>{result.trend}</div></div>
                <div><div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>UNADDRESSED ISSUES</div><div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{result.unaddressed} of homes</div></div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/waitlist/homeowner" style={{ background: '#1e3a5f', color: '#fff', textDecoration: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700 }}>
            Join TrustyPro Waitlist
          </a>
        </div>
      </div>
    </div>
  );
}
