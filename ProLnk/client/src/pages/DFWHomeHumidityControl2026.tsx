import { useState } from 'react';

export default function DFWHomeHumidityControl2026() {
  const [season, setSeason] = useState('');
  const [reading, setReading] = useState('');
  const [action, setAction] = useState('');

  const getAction = (s: string, r: string) => {
    if (!s || !r) return '';
    if (s === 'summer' && r === 'high') return 'RH above 50% in DFW summer = mold risk in 48-72 hours. Run AC on AUTO not ON (fan cycling dries coil). Add portable dehumidifier to worst room (50-pint, $200-300). Seal crawl space if present. Check for hidden leaks with moisture meter.';
    if (s === 'summer' && r === 'normal') return '45-50% RH is the DFW summer sweet spot. Maintain by keeping AC set consistently. Wildly varying thermostat temps cause humidity spikes. Consider whole-home dehumidifier bypass ($700-1,200 installed) for rock-solid control.';
    if (s === 'summer' && r === 'low') return 'Below 35% RH in DFW summer is unusual — check hygrometer calibration. If accurate, AC may be over-conditioning (running too long). Check for refrigerant issues causing coil to freeze then thaw rapidly. Not typically a DFW problem.';
    if (s === 'winter' && r === 'high') return 'Above 50% RH in DFW winter = air sealing problem or humidifier overcorrecting. DFW winters are naturally dry — high winter RH means moisture source. Check for crawl space moisture, plumbing leaks, or humidifier malfunction.';
    if (s === 'winter' && r === 'normal') return '35-45% RH in DFW winter is ideal. Tight, well-sealed homes hold humidity without supplemental humidification. Keep monitoring — DFW winters fluctuate. A good hygrometer ($20-50) in each main zone is worth having.';
    if (s === 'winter' && r === 'low') return 'Below 35% RH in DFW winter causes static electricity, wood shrinkage, respiratory irritation. Add bypass humidifier to furnace ($400-800 installed) targeting 40% RH. Steam humidifiers ($1,200-2,000) are most precise. Seal major air leaks first for best results.';
    return '';
  };

  const handleSubmit = () => {
    setAction(getAction(season, reading));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>💨 DFW Home Humidity Control Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Year-round humidity management for North Texas — two completely different challenges by season.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>☀️ Summer Goal</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>45–50% RH</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>Dehumidify + AC + crawl seal</div>
          </div>
          <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>❄️ Winter Goal</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>35–45% RH</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>Humidify + tight air sealing</div>
          </div>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>🔍 Get Your Action Plan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8, display: 'block' }}>Current Season</label>
            {['summer', 'winter'].map(s => (
              <button key={s} onClick={() => setSeason(s)} style={{ display: 'block', width: '100%', marginBottom: 8, background: season === s ? '#F5E642' : '#1e2d4a', color: season === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize' }}>{s}</button>
            ))}
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8, display: 'block' }}>Current Humidity Reading</label>
            {[{ val: 'high', label: 'High (>50%)' }, { val: 'normal', label: 'Normal (35-50%)' }, { val: 'low', label: 'Low (<35%)' }].map(r => (
              <button key={r.val} onClick={() => setReading(r.val)} style={{ display: 'block', width: '100%', marginBottom: 8, background: reading === r.val ? '#F5E642' : '#1e2d4a', color: reading === r.val ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', fontWeight: 600 }}>{r.label}</button>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit} disabled={!season || !reading} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: !season || !reading ? 0.5 : 1 }}>Get My Action Plan →</button>
        {action && (
          <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 20, marginTop: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Your Humidity Action Plan</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{action}</p>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Humidity Control · 2026 Edition</div>
      </div>
    </div>
  );
}