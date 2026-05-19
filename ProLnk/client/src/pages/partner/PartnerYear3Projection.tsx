import { useState } from 'react';

export default function PartnerYear3Projection() {
  const [y1Matches, setY1Matches] = useState(120);
  const [y1NetworkSize, setY1NetworkSize] = useState(8);
  const [y1Homes, setY1Homes] = useState(20);

  const streams = [
    {
      label: 'Direct Match Income',
      icon: '🔨',
      y1: y1Matches * 85,
      y2: Math.round(y1Matches * 85 * 1.35),
      y3: Math.round(y1Matches * 85 * 1.8),
      color: '#059669',
    },
    {
      label: 'Network Override Income',
      icon: '🌐',
      y1: y1NetworkSize * 149 * 0.07 * 12,
      y2: Math.round(y1NetworkSize * 149 * 0.07 * 12 * 2.2),
      y3: Math.round(y1NetworkSize * 149 * 0.07 * 12 * 4.5),
      color: '#3B82F6',
    },
    {
      label: 'Origination Rights Income',
      icon: '🏠',
      y1: y1Homes * 18,
      y2: Math.round(y1Homes * 18 * 1.6 + y1Homes * 0.8 * 18),
      y3: Math.round(y1Homes * 18 * 2.4 + y1Homes * 1.8 * 18),
      color: '#F59E0B',
    },
    {
      label: 'Subscription Overrides',
      icon: '🔁',
      y1: y1NetworkSize * 149 * 0.12 * 12,
      y2: Math.round(y1NetworkSize * 149 * 0.12 * 12 * 1.9),
      y3: Math.round(y1NetworkSize * 149 * 0.12 * 12 * 3.4),
      color: '#8B5CF6',
    },
  ];

  const totals = [1, 2, 3].map(yr =>
    streams.reduce((sum, s) => sum + (yr === 1 ? s.y1 : yr === 2 ? s.y2 : s.y3), 0)
  );

  const growth2 = totals[0] > 0 ? Math.round(((totals[1] - totals[0]) / totals[0]) * 100) : 0;
  const growth3 = totals[0] > 0 ? Math.round(((totals[2] - totals[0]) / totals[0]) * 100) : 0;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24, color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚀 Year 3 Compound Projection</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>See how the network compound effect transforms your income by Year 3</div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>📊 Enter Your Year 1 Performance</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Y1 Total Matches: {y1Matches}</label>
              <input type="range" min={10} max={400} value={y1Matches} onChange={e => setY1Matches(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Y1 Network Size: {y1NetworkSize}</label>
              <input type="range" min={0} max={50} value={y1NetworkSize} onChange={e => setY1NetworkSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Y1 Homes Added: {y1Homes}</label>
              <input type="range" min={0} max={100} value={y1Homes} onChange={e => setY1Homes(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>💰 Income by Stream — Year 1 vs Year 3</div>
          {streams.map((s, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: '#0A1628', fontSize: 14 }}>{s.icon} {s.label}</span>
                <span style={{ fontSize: 13, color: '#6B7280′ }}>Y3: <strong style={{ color: s.color }}>${s.y3.toLocaleString()}</strong></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {['Y1', 'Y2', 'Y3'].map((yr, yi) => {
                  const val = yi === 0 ? s.y1 : yi === 1 ? s.y2 : s.y3;
                  const maxVal = s.y3 || 1;
                  const pct = Math.round((val / maxVal) * 100);
                  return (
                    <div key={yr}>
                      <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{yr}</div>
                      <div style={{ background: '#F3F4F6', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: 4 }} />
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginTop: 3 }}>${val.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {['Year 1', 'Year 2', 'Year 3'].map((yr, i) => (
            <div key={yr} style={{ background: i === 2 ? '#0A1628′ : ’white', borderRadius: 12, padding: 20, border: i === 2 ? 'none' : '1px solid #E5E7EB', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: i === 2 ? '#94A3B8′ : '#6B7280', marginBottom: 6 }}>{yr} Total</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: i === 2 ? '#F5E642′ : '#0A1628' }}>${totals[i].toLocaleString()}</div>
              {i > 0 && (
                <div style={{ fontSize: 12, color: '#059669', marginTop: 4 }}>+{i === 1 ? growth2 : growth3}% vs Y1</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: '#065F46', marginBottom: 10 }}>🔑 Why Year 3 Is the Inflection Point</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 13, color: '#047857′ }}>
            {['Your network partners have built their own networks', 'Origination rights accumulate across 3 years of homes', 'Match fees compound as pros earn more on the platform', 'Subscription overrides grow as your downline retains'].map((pt, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}><span>✅</span><span>{pt}</span></div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #F5E642', borderRadius: 12, padding: 16, fontSize: 13, color: '#78350F' }}>
          💡 Projections assume consistent partner activity and normal DFW market growth. Network compounding effect varies by recruitment and retention rates.
        </div>
      </div>
    </div>
  );
}
