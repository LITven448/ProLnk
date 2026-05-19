import { useState } from 'react';

const tiers = [
  { range: '1–5 acres', label: 'Small Acreage', premium: '10–25%', notes: 'May still have city water/sewer. HOA restrictions common. Ag exemption rare.' },
  { range: '5–20 acres', label: 'Mid Acreage', premium: '25–50%', notes: 'Well and septic typical. Ag exemption possible with documented use. Propane standard.' },
  { range: '20+ acres', label: 'Large Ranch Parcel', premium: '50–100%+', notes: 'Ag exemption almost always attainable. Fencing, water infrastructure critical. Mineral rights may be severed.' },
];

const distanceData: Record<string, { commute: string; priceAcre: string; infrastructure: string }> = {
  '0-30': { commute: '30–45 min drive typical', priceAcre: '$15K–$30K/acre', infrastructure: 'Often city water available, HOA more likely' },
  '30-60': { commute: '45–75 min drive typical', priceAcre: '$8K–$18K/acre', infrastructure: 'Well/septic common, propane standard, internet varies' },
  '60+': { commute: '75–120+ min drive', priceAcre: '$4K–$10K/acre', infrastructure: 'Well/septic standard, limited internet, lower school ratings' },
};

export default function DFWAcreageHomeGuide() {
  const [acreage, setAcreage] = useState(10);
  const [distance, setDistance] = useState('30-60');
  const [showResults, setShowResults] = useState(false);

  const tier = acreage < 5 ? tiers[0] : acreage < 20 ? tiers[1] : tiers[2];
  const dist = distanceData[distance];
  const agEligible = acreage >= 10;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌾 DFW Acreage Home Guide</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 32 }}>From 1-acre ranchettes to 50-acre working ranches — what DFW buyers need to know before leaving the suburbs.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {tiers.map(t => (
            <div key={t.range} style={{ background: '#111E35', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>📐 {t.range} — {t.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>+{t.premium} cost premium</span>
              </div>
              <div style={{ color: '#8A9BB5', fontSize: 14 }}>{t.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🗺️ Personalize Your Acreage Search</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Acreage Target: {acreage} acres</label>
            <input type="range" min={1} max={100} value={acreage} onChange={e => setAcreage(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Distance from DFW Core (Dallas/Fort Worth):</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {[['0-30', 'Under 30 mi'], ['30-60', '30–60 mi'], ['60+', '60+ mi']].map(([val, label]) => (
                <button key={val} onClick={() => setDistance(val)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
                    background: distance === val ? '#F5E642′ : '#1E2F4A', color: distance === val ? '#0A1628' : '#8A9BB5' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            See What to Expect →
          </button>
        </div>

        {showResults && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📊 Your Acreage Profile</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                ['🏷️ Expected Land Price', dist.priceAcre],
                ['🚗 Commute Reality', dist.commute],
                ['🔧 Infrastructure', dist.infrastructure],
                ['💰 Cost Premium vs Suburban', tier.premium],
                ['🌿 Ag Exemption Potential', agEligible ? '✅ Likely eligible — reduces property taxes significantly' : '⚠️ Possible but requires documented qualifying use'],
              ].map(([label, value]) => (
                <div key={label as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#8A9BB5', fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ Key Due Diligence Items</div>
              <ul style={{ color: '#8A9BB5', fontSize: 14, paddingLeft: 20, margin: 0 }}>
                <li>Confirm well output (GPM) and water quality test</li>
                <li>Verify septic system age and inspection history</li>
                <li>Check for deed restrictions and easements</li>
                <li>Ask county appraisal district about current ag valuation</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
