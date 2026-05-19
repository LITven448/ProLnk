import { useState } from 'react';

const styles = {
  wrap: { background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' },
  card: { background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 20 },
  h1: { color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 8 },
  h2: { color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 },
  badge: { background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontWeight: 700, fontSize: 13, display: 'inline-block', marginBottom: 16 },
  label: { fontSize: 13, color: '#aac', marginBottom: 6, display: 'block' },
  select: { width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', fontSize: 15, marginBottom: 16 },
  btn: { background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' },
  result: { background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 16 },
  stat: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' },
  statVal: { color: '#F5E642', fontWeight: 700, fontSize: 17 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  tip: { background: '#0d2040', borderLeft: '4px solid #F5E642', padding: '12px 16px', borderRadius: 4, fontSize: 14, lineHeight: 1.6 },
};

type ScopeData = {
  low: number;
  high: number;
  roi: Record<string, number>;
};

const bathroomData: Record<string, Record<string, ScopeData>> = {
  master: {
    cosmetic: { low: 3500, high: 7000, roi: { entry: 70, mid: 80, luxury: 85 } },
    midrange: { low: 8000, high: 18000, roi: { entry: 65, mid: 75, luxury: 82 } },
    full: { low: 20000, high: 45000, roi: { entry: 55, mid: 68, luxury: 78 } },
  },
  guest: {
    cosmetic: { low: 2000, high: 4500, roi: { entry: 80, mid: 85, luxury: 80 } },
    midrange: { low: 5000, high: 10000, roi: { entry: 72, mid: 78, luxury: 75 } },
    full: { low: 11000, high: 22000, roi: { entry: 60, mid: 68, luxury: 70 } },
  },
  powder: {
    cosmetic: { low: 800, high: 2000, roi: { entry: 100, mid: 110, luxury: 95 } },
    midrange: { low: 2500, high: 5000, roi: { entry: 90, mid: 100, luxury: 90 } },
    full: { low: 6000, high: 12000, roi: { entry: 75, mid: 85, luxury: 80 } },
  },
};

const needleMovers: Record<string, string[]> = {
  master: ['Walk-in shower (frameless glass)', 'Double vanity with quartz countertop', 'Large format tile (24x24 or larger)', 'Freestanding tub (visual anchor)', 'Heated floors in luxury tier'],
  guest: ['New vanity + mirror + light fixture', 'Re-tile shower surround', 'Replace toilet (comfort height)', 'Fresh grout and caulk'],
  powder: ['Statement vanity or vessel sink', 'Bold wallpaper or designer tile accent', 'Upgraded fixtures (matte black or brushed gold)', 'High-end mirror and sconce lighting'],
};

export default function DFWBathroomUpdateROIGuide() {
  const [bathType, setBathType] = useState('master');
  const [scope, setScope] = useState('midrange');
  const [tier, setTier] = useState('mid');
  const [result, setResult] = useState<null | { cost: number; valueAdd: number; roi: number; movers: string[] }>(null);

  function calculate() {
    const data = bathroomData[bathType]?.[scope];
    if (!data) return;
    const avgCost = Math.round((data.low + data.high) / 2);
    const roiPct = data.roi[tier] ?? 70;
    const valueAdd = Math.round(avgCost * (roiPct / 100));
    setResult({ cost: avgCost, valueAdd, roi: roiPct, movers: needleMovers[bathType] ?? [] });
  }

  return (
    <div style={styles.wrap}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={styles.badge}>🏠 DFW Renovation ROI Guide</div>
        <h1 style={styles.h1}>Bathroom Update ROI in DFW</h1>
        <p style={{ color: '#aac', marginBottom: 24, lineHeight: 1.7 }}>
          Bathrooms are the second most scrutinized space after kitchens in DFW home sales. The master bath carries the most weight, but the powder room — updated at low cost — delivers the highest ROI relative to investment. Know your buyer tier before you spend.
        </p>

        <div style={styles.card}>
          <h2 style={styles.h2}>📊 ROI by Bathroom Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { type: 'Master Bath', icon: '🛁', roi: '55–85%', note: 'Highest absolute value; buyer priority #1', cost: '$3.5K–$45K' },
              { type: 'Guest Bath', icon: '🚿', roi: '60–85%', note: 'Must-pass inspection; update to modern standard', cost: '$2K–$22K' },
              { type: 'Powder Room', icon: '🚽', roi: '75–110%', note: 'Highest ROI relative to spend; statement piece', cost: '$800–$12K' },
            ].map(item => (
              <div key={item.type} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' as const }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.type}</div>
                <div style={{ color: '#3ddc84', fontSize: 13, fontWeight: 700 }}>{item.roi} ROI</div>
                <div style={{ color: '#aac', fontSize: 11, marginTop: 4 }}>{item.cost}</div>
                <div style={{ color: '#7cf', fontSize: 11, marginTop: 4 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>🧮 Calculate Your Bathroom ROI</h2>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Bathroom Type</label>
              <select style={styles.select} value={bathType} onChange={e => setBathType(e.target.value)}>
                <option value="master">Master Bath</option>
                <option value="guest">Guest Bath</option>
                <option value="powder">Powder Room</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Update Scope</label>
              <select style={styles.select} value={scope} onChange={e => setScope(e.target.value)}>
                <option value="cosmetic">Cosmetic (fixtures, paint, accessories)</option>
                <option value="midrange">Mid-Range (vanity, tile, shower rework)</option>
                <option value="full">Full Gut + Redesign</option>
              </select>
            </div>
          </div>
          <label style={styles.label}>DFW Home Value Tier</label>
          <select style={styles.select} value={tier} onChange={e => setTier(e.target.value)}>
            <option value="entry">Entry ($200K–$350K)</option>
            <option value="mid">Mid-Range ($350K–$600K)</option>
            <option value="luxury">Luxury ($600K+)</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Calculate Bathroom ROI →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.stat}><span>Estimated Project Cost</span><span style={styles.statVal}>${result.cost.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Expected Value Increase</span><span style={styles.statVal}>${result.valueAdd.toLocaleString()}</span></div>
              <div style={styles.stat}><span>Estimated ROI</span><span style={styles.statVal}>{result.roi}%</span></div>
              <div style={{ marginTop: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🎯 What Moves the Needle Most</div>
                {result.movers.map((m, i) => (
                  <div key={i} style={{ color: '#aac', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>✓ {m}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>💡 DFW Buyer Expectations by Tier</h2>
          <div style={styles.tip}>
            <strong style={{ color: '#F5E642' }}>Entry ($200K–$350K):</strong> Clean, functional, no outdated fixtures. Buyers forgive cosmetics if nothing is broken.{'\n\n'}
            <strong style={{ color: '#F5E642' }}>Mid-Range ($350K–$600K):</strong> Updated vanity, quartz or granite counters, frameless or semi-frameless shower expected. Dated tile is a negotiation point.{'\n\n'}
            <strong style={{ color: '#F5E642' }}>Luxury ($600K+):</strong> Spa experience expected. Frameless glass shower, soaking tub, large format tile, heated floors, designer fixtures. Buyers in this tier walk for dated bathrooms.
          </div>
        </div>
      </div>
    </div>
  );
}
