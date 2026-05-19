import { useState } from 'react';

export default function DFWPoolPumpSizing2026() {
  const [gallons, setGallons] = useState('');
  const [pipeSize, setPipeSize] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    const gal = parseFloat(gallons);
    if (isNaN(gal) || gal <= 0 || !pipeSize) {
      setResult(['Please enter your pool gallons and select pipe size.']);
      return;
    }
    const tips: string[] = [];
    const turnovers = 2;
    const hoursPerDay = 8;
    const requiredGPM = Math.ceil((gal * turnovers) / (hoursPerDay * 60));

    tips.push(`🔢 Your pool: ${gal.toLocaleString()} gallons`);
    tips.push(`⏱️ Turnover target: Full volume ${turnovers}x per day in 8 hrs = ${requiredGPM} GPM minimum flow rate.`);

    if (pipeSize === '1.5') {
      const maxGPM = 42;
      tips.push(`🔩 1.5" pipe maximum flow: ~42 GPM. ${requiredGPM > maxGPM ? `⚠️ Your pool needs ${requiredGPM} GPM — 1.5" pipe is undersized. Upgrade to 2″ pipe recommended.` : '✅ 1.5″ pipe can handle your flow requirements.'}`);
    } else if (pipeSize === '2') {
      const maxGPM = 73;
      tips.push(`🔩 2" pipe maximum flow: ~73 GPM. ${requiredGPM > maxGPM ? `⚠️ Your pool needs ${requiredGPM} GPM — consider 2.5" pipe.` : '✅ 2″ pipe handles your flow requirements comfortably.'}`);
    } else if (pipeSize === '2.5') {
      tips.push('🔩 2.5″ pipe maximum flow: ~110 GPM. ✅ Sufficient for almost all residential DFW pools.');
    }

    const hpEstimate = requiredGPM <= 40 ? '1.0 HP' : requiredGPM <= 65 ? '1.5 HP' : '2.0 HP';
    tips.push(`⚡ Recommended motor size: ${hpEstimate} (single-speed baseline)`);

    tips.push('💡 Variable Speed Pump Advantage for DFW:');
    tips.push('💰 ERCOT time-of-use rates: Run pump at low speed 10pm-6am (off-peak) — saves 50-70% on electricity vs. single speed.');
    tips.push('🌀 VS pump tip: Run at low RPM (1,750 RPM) for 12-14 hrs/day vs. high RPM (3,450) for 6-8 hrs — same turnover, 30-40% energy savings.');
    tips.push('📊 DFW electricity: Average $0.12/kWh. A 1.5HP single-speed pump costs ~$80/mo in summer. VS equivalent: ~$25-35/mo.');
    setResult(tips);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>⚙️ DFW Pool Pump Sizing Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 8 }}>Right-sizing your pool pump matters: too small and water goes green, too large and you waste energy and money. DFW ERCOT time-of-use rates make variable speed pumps especially valuable.</p>
        <p style={{ color: '#F5E642', fontSize: 13, marginBottom: 24 }}>💡 Rule of thumb: Turn over entire pool volume twice in 8 hours.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 6, fontSize: 14 }}>Pool Volume (gallons)</label>
            <input value={gallons} onChange={e => setGallons(e.target.value)} placeholder='e.g. 18000'
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #F5E642', backgroundColor: '#0d1e36', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: 6, fontSize: 14 }}>Main Pipe Diameter</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{v:'1.5',l:'1.5″'},{v:'2',l:'2″'},{v:'2.5',l:'2.5″'}].map(({v,l}) => (
                <button key={v} onClick={() => setPipeSize(v)}
                  style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: `2px solid ${pipeSize===v?'#F5E642':'#1e3a5f'}`, backgroundColor: pipeSize===v?'#F5E642':'#0d1e36', color: pipeSize===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Calculate Pump Sizing
        </button>

        {result.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>📐 Pump Sizing Results</h2>
            {result.map((r, i) => <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{r}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
