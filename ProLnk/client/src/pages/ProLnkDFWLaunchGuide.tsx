import { useState } from 'react';

const tradeVolume: Record<string, number> = {
  Plumber: 2800, Electrician: 3200, HVAC: 4100, Roofer: 1800, Painter: 2200, Handyman: 3600, Landscaper: 2900,
};

export default function ProLnkDFWLaunchGuide() {
  const [trade, setTrade] = useState('HVAC');
  const population = 6500000;
  const homes = 2300000;
  const targetHomeowners = 10000;
  const penetration = (targetHomeowners / homes * 100).toFixed(2);
  const tradeJobs = tradeVolume[trade] || 3000;
  const marketShare = 0.12;
  const projectedMatches = Math.round(tradeJobs * marketShare);
  const avgJobValue = 1050;
  const projectedRevenue = Math.round(projectedMatches * avgJobValue);
  const yourShare = Math.round(projectedRevenue * 0.35);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          DFW LAUNCH — 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>DFW Launch Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>
          ProLnk launches first in the Dallas-Fort Worth Metroplex. Here is what first-mover advantage means for you.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: '7-County Area', value: '7', sub: 'Dallas, Tarrant, Collin, Denton, Rockwall, Kaufman, Ellis' },
            { label: 'Population', value: '6.5M', sub: 'One of fastest growing metros in the US' },
            { label: 'Total Homes', value: '2.3M', sub: 'Target: 10K homeowners in Year 1′ },
          ].map(s => (
            <div key={s.label} style={{ background: '#111d2e', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 11 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>Year 1 Match Volume by Trade</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Your trade</label>
            <select value={trade} onChange={e => setTrade(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {Object.keys(tradeVolume).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>DFW {trade} jobs/yr on platform</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#F5E642′ }}>{tradeJobs.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Your projected matches (12% share)</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#4ade80′ }}>{projectedMatches}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Projected job revenue (yr 1)</div>
              <div style={{ fontSize: 32, fontWeight: 900 }}>${projectedRevenue.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>At Tier 3 (35% keep)</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#F5E642′ }}>${yourShare.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111d2e', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642′ }}>First-Mover Advantage</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              'Zero competition for Charter spots in DFW',
              'Territory presence before market saturation',
              'Build your recruit network before Founding tier opens',
              'Origination rights on 2.3M homes available now',
              'Lock highest commission tier permanently',
              'Early adopter homeowners = highest-quality leads',
            ].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 6, padding: 12, fontSize: 13, color: '#94a3b8′ }}>
                + {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 8, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>DFW pros who join now own this market. Join the Charter waitlist.</div>
        </div>
      </div>
    </div>
  );
}