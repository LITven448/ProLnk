import { useState } from 'react';

export default function ProLnkProIncomeProjector() {
  const [trade, setTrade] = useState('HVAC');
  const [experience, setExperience] = useState(5);
  const [avgTicket, setAvgTicket] = useState(800);
  const [networkSize, setNetworkSize] = useState(10);

  const trades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Painting', 'Landscaping'];
  const tradeMultiplier: Record<string, number> = {
    HVAC: 1.4, Plumbing: 1.3, Electrical: 1.25, Roofing: 1.2, Painting: 1.0, Landscaping: 0.9,
  };

  const tier = experience < 2 ? 0.12 : experience < 5 ? 0.20 : experience < 10 ? 0.35 : 0.50;
  const mult = tradeMultiplier[trade] || 1.0;
  const matchesPerMonth = Math.round((experience * 2 + 8) * mult);
  const directCommission = Math.round(matchesPerMonth * avgTicket * tier);
  const networkOverride = Math.round(networkSize * avgTicket * 0.07 * 0.01 * 20);
  const subOverride = Math.round(networkSize * 149 * 0.12);
  const totalMonthly = directCommission + networkOverride + subOverride;

  const tierLabel = experience < 2 ? 'New (12%)' : experience < 5 ? 'Growing (20%)' : experience < 10 ? 'Established (35%)' : 'Elite (50%)';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Pro Income Projector</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>DFW Market · ProLnk Network Income</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>YOUR TRADE</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {trades.map(t => (
              <button key={t} onClick={() => setTrade(t)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: trade === t ? '#F5E642′ : '#1A2E4A', color: trade === t ? '#0A1628' : '#fff',
                  fontWeight: trade === t ? 700 : 400 }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            YEARS EXPERIENCE: <span style={{ color: '#F5E642′ }}>{experience} yrs</span>
          </label>
          <input type="range" min={1} max={20} value={experience} onChange={e => setExperience(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ color: '#8899AA', fontSize: 11, marginTop: 4 }}>Tier: {tierLabel}</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            AVG JOB TICKET: <span style={{ color: '#F5E642′ }}>${avgTicket.toLocaleString()}</span>
          </label>
          <input type="range" min={200} max={5000} step={100} value={avgTicket}
            onChange={e => setAvgTicket(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 8 }}>
            NETWORK SIZE (PROS YOU RECRUITED): <span style={{ color: '#F5E642′ }}>{networkSize}</span>
          </label>
          <input type="range" min={0} max={100} value={networkSize}
            onChange={e => setNetworkSize(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
        </div>

        <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 16 }}>📊 Monthly Income Projection</h3>
          {[
            ['🔨 Direct Commissions', `$${directCommission.toLocaleString()}`, `${matchesPerMonth} matches × $${avgTicket} × ${Math.round(tier * 100)}%`],
            ['🌐 Network Override', `$${networkOverride.toLocaleString()}`, `${networkSize} recruited pros × job overrides`],
            ['📦 Subscription Override', `$${subOverride.toLocaleString()}`, `${networkSize} × $149/mo × 12%`],
          ].map(([label, val, sub]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #2A3E5A' }}>
              <div>
                <div style={{ fontSize: 14 }}>{label}</div>
                <div style={{ color: '#8899AA', fontSize: 11 }}>{sub}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{val}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Total Monthly</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 28 }}>${totalMonthly.toLocaleString()}</span>
          </div>
          <div style={{ color: '#8899AA', fontSize: 11, marginTop: 8, textAlign: 'right' }}>
            ${Math.round(totalMonthly * 12).toLocaleString()}/yr projected
          </div>
        </div>
      </div>
    </div>
  );
}
