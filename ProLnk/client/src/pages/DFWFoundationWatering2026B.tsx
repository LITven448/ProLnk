import { useState } from 'react';

export default function DFWFoundationWatering2026B() {
  const [soilCondition, setSoilCondition] = useState('dry');
  const [season, setSeason] = useState('summer');
  const [guide, setGuide] = useState('');

  const soilOptions = ['dry', 'moist', 'saturated', 'cracked'];
  const seasonOptions = ['spring', 'summer', 'fall', 'winter'];

  const getGuide = () => {
    const key = `${soilCondition}-${season}`;
    const guides: Record<string, string> = {
      'dry-summer': '🚨 Critical: Water 45–60 min/zone daily. Clay at max shrink risk. Focus perimeter every 18 inches. Target 6-inch soil moisture depth.',
      'dry-spring': '⚠️ Moderate: Water 30–40 min/zone every 2 days. Spring rains may assist — monitor before each session.',
      'dry-fall': '⚠️ Moderate: Water 25–35 min/zone every 3 days. Clay begins recharging — avoid overwatering as temps drop.',
      'dry-winter': '✅ Light: Water 15–20 min/zone weekly. DFW winters are mild — clay holds moisture longer in cold.',
      'moist-summer': '✅ Good: Maintain every 2–3 days at 30 min/zone. Monitor for hot dry spells that rapidly pull moisture.',
      'moist-spring': '✅ Ideal: Water 20 min/zone every 3 days. Adjust for rain. Uniformity across all sides is critical.',
      'moist-fall': '✅ Good: Reduce to 20 min/zone every 4 days. Clay charging for winter.',
      'moist-winter': '✅ Minimal: Water 10 min/zone bi-weekly. Natural precipitation usually sufficient.',
      'saturated-summer': '🛑 Stop: Delay watering 48 hours. Over-wet clay heaves — asymmetric swelling cracks slabs.',
      'saturated-spring': '🛑 Stop: Hold watering during rain events. DFW spring saturation is common — wait for drainage.',
      'saturated-fall': '🛑 Stop: No watering needed. Fall rains often fully recharge DFW Blackland Prairie clay.',
      'saturated-winter': '🛑 Stop: Zero supplemental watering. Ground saturation risk — poor drainage compounds slab stress.',
      'cracked-summer': '🚨 Emergency: Slow-soak cracked clay 60–90 min at LOW pressure. Fast water causes runoff, not absorption. Repeat daily for 3 days then assess.',
      'cracked-spring': '⚠️ Urgent: Soak cracked zones at low flow 45 min/day. Cracks indicate severe moisture loss — rehydrate slowly.',
      'cracked-fall': '⚠️ Urgent: 30–45 min slow soak daily until cracks close. Do not let clay dry-cycle more than once per season.',
      'cracked-winter': '⚠️ Moderate: 20 min slow soak bi-weekly. Cracks in winter mean summer damage was severe — begin spring prep early.',
    };
    setGuide(guides[key] || 'Select soil condition and season above.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Foundation Watering Science 2026 (Part 2)</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Blackland Prairie Clay Physics — Montmorillonite Expansion &amp; Uniformity</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '🔬', title: 'Montmorillonite Clay', body: 'DFW sits on Blackland Prairie — montmorillonite clay expands up to 30% by volume when wet. This is among the highest expansion rates of any soil type. Uniform moisture across ALL sides of your foundation is critical.' },
            { icon: '💧', title: 'Asymmetric Swelling Risk', body: 'Watering one side more than another creates differential pressure under your slab. Over time, one corner heaves while another settles — a $15,000–$80,000 repair. Water 360° perimeter equally.' },
            { icon: '⚠️', title: 'Irreversible Shrinkage', body: 'Some DFW clays experience irreversible shrinkage after extreme dry cycles. Once certain inter-particle bonds break, rehydration only partially restores volume — gaps under the slab remain.' },
            { icon: '📏', title: '6-Inch Depth Target', body: 'Effective foundation watering must reach 6 inches below grade. Shallow watering only wets surface clay, which dries again in hours. Use a soil probe or moisture meter to verify depth.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Advanced Watering Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Soil Condition</label>
              <select value={soilCondition} onChange={e => setSoilCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {soilOptions.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Season</label>
              <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {seasonOptions.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Advanced Guide</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642' }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Foundation Watering Science 2026 Part 2</p>
      </div>
    </div>
  );
}
