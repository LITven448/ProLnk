import { useState } from 'react';

const platforms = [
  {
    name: 'Angi / HomeAdvisor',
    model: 'Pay Per Lead',
    avgCostPerLead: '$20–80/lead',
    exclusivity: 'Non-exclusive (sold to 4+ pros)',
    incomeStreams: 'Zero',
    networkIncome: '❌',
    subscriptionFee: 'Variable (unpredictable)',
    charterTier: '❌',
  },
  {
    name: 'ProLnk',
    model: 'Monthly Subscription',
    avgCostPerLead: '$149/mo flat',
    exclusivity: 'Exclusive match window',
    incomeStreams: '5 income streams',
    networkIncome: '✅ Up to 7% network job override',
    subscriptionFee: '$149/mo locked (Charter)',
    charterTier: '✅ Charter tier — closes at 500 pros',
  },
];

const tradeData: Record<string, { angi: number; prolnk: number }> = {
  Plumber: { angi: 1200, prolnk: 420 },
  Electrician: { angi: 1100, prolnk: 420 },
  HVAC: { angi: 1400, prolnk: 420 },
  Roofer: { angi: 1600, prolnk: 420 },
  Painter: { angi: 900, prolnk: 420 },
  General: { angi: 1000, prolnk: 420 },
};

export default function DFWAngiVsProLnkGuide2026() {
  const [trade, setTrade] = useState('Plumber');
  const data = tradeData[trade];
  const savings = data.angi - data.prolnk;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>⚔️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>ProLnk vs Angi / HomeAdvisor — DFW 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            The definitive comparison for DFW service professionals choosing the right lead platform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {platforms.map((p) => (
            <div key={p.name} style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: p.name === 'ProLnk' ? '2px solid #F5E642′ : '1px solid #334155' }}>
              <h2 style={{ color: p.name === 'ProLnk' ? '#F5E642′ : '#f1f5f9', fontSize: '1.1rem', marginTop: 0 }}>{p.name}</h2>
              {Object.entries(p).filter(([k]) => k !== 'name').map(([k, v]) => (
                <div key={k} style={{ marginBottom: '0.6rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                  <div style={{ color: '#f1f5f9', fontSize: '0.9rem' }}>{v}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', border: '1px solid #334155′ }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💰 Annual Cost Calculator by Trade</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select your trade to see estimated annual platform spend:</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {Object.keys(tradeData).map((t) => (
              <button key={t} onClick={() => setTrade(t)}
                style={{ background: trade === t ? '#F5E642′ : '#0f172a', color: trade === t ? '#0A1628' : '#f1f5f9', border: '1px solid #334155', borderRadius: 8, padding: '0.4rem 0.9rem', cursor: ’pointer', fontWeight: 600 }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[['Angi / HomeAdvisor', data.angi, '#ef4444'], ['ProLnk', data.prolnk, '#22c55e'], ['You Keep', savings, '#F5E642']].map(([label, val, color]) => (
              <div key={String(label)} style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ color: String(color), fontSize: '1.6rem', fontWeight: 700 }}>${val.toLocaleString()}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{label}/yr</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginTop: '2rem', fontSize: '0.9rem' }}>
          🏆 Charter Tier closes at 500 DFW Pros — lock your $149/mo rate today at prolnk.io
        </p>
      </div>
    </div>
  );
}