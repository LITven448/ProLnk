import { useState } from 'react';

const rainfallZones: Record<string, { annualIn: number; label: string }> = {
  northDFW: { annualIn: 35, label: 'North DFW (Denton, Collin counties)' },
  centralDFW: { annualIn: 37, label: 'Central DFW (Dallas, Tarrant counties)' },
  southDFW: { annualIn: 40, label: 'South DFW (Ellis, Johnson counties)' },
  eastDFW: { annualIn: 42, label: 'East DFW (Kaufman, Rockwall counties)' },
};

function calcCollection(roofSqFt: number, annualIn: number) {
  const collectionFactor = 0.85;
  const gallonsPerInchPerSqFt = 0.623;
  const annualGallons = Math.round(roofSqFt * gallonsPerInchPerSqFt * annualIn * collectionFactor);
  const tankSize = Math.round(annualGallons / 12);
  const irrigationSavings = Math.round(annualGallons * 0.004);
  return { annualGallons, tankSize, irrigationSavings };
}

export default function DFWRainwaterCollectionSystem() {
  const [roofArea, setRoofArea] = useState('');
  const [zone, setZone] = useState('');
  const result = roofArea && zone && Number(roofArea) > 0 ? calcCollection(Number(roofArea), rainfallZones[zone].annualIn) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Rainwater Collection Systems — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Texas Senate Bill 769 explicitly permits rainwater harvesting. With DFW averaging 37 inches of rain annually, a properly sized collection system can dramatically reduce irrigation water bills — especially during Stage 2+ water restrictions.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 What Texas Law Allows</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { emoji: '✅', label: 'Outdoor Irrigation', desc: 'Fully permitted for landscape and garden irrigation. No treatment required.' },
              { emoji: '✅', label: 'Toilet Flushing', desc: 'Allowed with proper plumbing separation from potable water system.' },
              { emoji: '⚠️', label: 'Potable Use', desc: 'Requires filtration + UV/chlorination treatment. Must meet Texas DSHS standards.' },
              { emoji: '❌', label: 'HOA Restrictions', desc: 'Some DFW HOAs restrict visible tanks. Check CC&Rs — Texas law limits HOA prohibition of rain barrels.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Collection Capacity Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Collection Area (sq ft)</label>
              <input type="number" value={roofArea} onChange={e => setRoofArea(e.target.value)} placeholder="e.g. 2000″ style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14, boxSizing: 'border-box' }} />
              <div style={{ color: '#555F7A', fontSize: 12, marginTop: 4 }}>Tip: use ~80% of total roof area for collection</div>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Rainfall Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select zone...</option>
                {Object.entries(rainfallZones).map(([val, z]) => <option key={val} value={val}>{z.label} (~{z.annualIn}")</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { label: 'ANNUAL COLLECTION', val: `${result.annualGallons.toLocaleString()} gallons`, sub: 'Based on 85% collection efficiency' },
                  { label: 'RECOMMENDED STORAGE', val: `${result.tankSize.toLocaleString()} gallons`, sub: '~1 month of collection capacity' },
                  { label: 'EST. ANNUAL SAVINGS', val: `$${result.irrigationSavings}`, sub: 'At ~$0.004/gal DFW average' },
                ].map(stat => (
                  <div key={stat.label} style={{ textAlign: 'center' }}>
                    <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{stat.label}</div>
                    <div style={{ color: '#E8EAF0', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{stat.val}</div>
                    <div style={{ color: '#555F7A', fontSize: 11 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 System Components</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'First Flush Diverter', desc: 'Discards first 1/8″ of rain per 100 sq ft to remove roof debris. Required for any potable or toilet-flush use.' },
              { label: 'Collection Tank', desc: '250–10,000 gal polyethylene tanks. Slimline tanks available for HOA-restricted properties. Must be opaque to prevent algae.' },
              { label: 'Overflow Management', desc: 'Overflow must discharge away from foundation. Size overflow outlet for max DFW rainfall intensity (5–7 in/hr storm events).' },
              { label: 'Pump + Distribution', desc: '12V DC pump for gravity-fed systems. 120V submersible for pressurized systems. Backflow preventer required.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>🔩 {item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
