import { useState } from 'react';

const suburbs = ['Dallas','Plano','Frisco','McKinney','Allen','Richardson','Garland','Mesquite','Irving','Grand Prairie','Arlington','Fort Worth','Denton','Lewisville','Flower Mound','Carrollton','Addison','Rockwall','Rowlett','Wylie','Prosper','Celina','Little Elm','The Colony','Coppell','Southlake','Keller','Hurst','Euless','Bedford'];
const usageTypes = ['Work From Home (heavy usage)','Streaming & Smart Home','Gaming (low latency needed)','Basic browsing & email'];

function getRec(suburb: string, usage: string) {
  const outer = ['Celina','Prosper','Wylie','Rockwall','Little Elm','Coppell'].includes(suburb);
  const gaming = usage.includes('Gaming');
  const wfh = usage.includes('Work');
  const basic = usage.includes('Basic');
  if (outer && !wfh && !gaming) return { provider: 'T-Mobile 5G Home Internet', speed: '100–400 Mbps', cost: '~$50/mo', note: 'No contract, no data caps. Good for outer DFW where fiber is sparse. Latency ~30–60ms — fine for streaming, borderline for competitive gaming.' };
  if (gaming) return { provider: 'AT&T Fiber (if available) → Frontier Fiber → Spectrum', speed: '500 Mbps–2 Gbps fiber / 300–1000 Mbps cable', cost: '$55–80/mo fiber, $50–70/mo cable', note: 'Fiber wins on latency (5–15ms vs 15–30ms). Check AT&T availability first at att.com/internet, then Frontier. Spectrum is cable (higher latency but widely available).' };
  if (wfh) return { provider: 'AT&T Fiber or Frontier Fiber', speed: '1 Gbps symmetric recommended', cost: '$65–80/mo', note: 'Symmetric speeds matter for video calls and uploads. AT&T Fiber has the best reliability in DFW core. Frontier is expanding fast in 2025–2026 suburbs.' };
  if (basic) return { provider: 'Spectrum or T-Mobile 5G', speed: '100–300 Mbps is plenty', cost: '$40–55/mo', note: 'Don\’t overbuy speed for basic use. Spectrum\’s introductory rate is often lowest. T-Mobile has no-contract flexibility.' };
  return { provider: 'AT&T Fiber or Spectrum', speed: '300–500 Mbps', cost: '$55–70/mo', note: 'Good middle-ground for mixed household streaming. Fiber preferred for reliability during DFW thunderstorms.' };
}

export default function DFWInternetProviderGuide() {
  const [suburb, setSuburb] = useState('');
  const [usage, setUsage] = useState('');
  const rec = suburb && usage ? getRec(suburb, usage) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Internet Provider Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Find the right internet provider for your DFW suburb and lifestyle</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔵', name: 'AT&T Fiber', tag: 'Best where available', desc: 'True fiber to the door. Symmetric speeds, lowest latency. Check availability — not everywhere yet.', availability: 'Core DFW, many suburbs' },
            { icon: '🟠', name: 'Spectrum', tag: 'Widest coverage', desc: 'Cable internet (coax). Widely available across all of DFW. No data caps. Speeds asymmetric.', availability: 'Nearly all of DFW' },
            { icon: '🟢', name: 'Frontier Fiber', tag: 'Rapidly expanding', desc: 'Fiber network aggressively expanding in DFW suburbs 2024–2026. Competitive pricing.', availability: 'Growing — check frontier.com' },
            { icon: '⚪', name: 'T-Mobile 5G Home', tag: 'Outer DFW / no-contract', desc: 'Fixed wireless via cell towers. No install, no contract. Speeds vary by tower load.', availability: 'Outer suburbs, rural DFW' },
          ].map(p => (
            <div key={p.name} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
                <strong style={{ color: '#F5E642′ }}>{p.name}</strong>
                <span style={{ background: '#1e3a5f', color: '#94a3b8', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 4 }}>{p.tag}</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.25rem 0′ }}>{p.desc}</p>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>📍 {p.availability}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>📶 Speed Guide for DFW Households</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {[
              ['🎮 Gaming', '300+ Mbps, latency under 20ms'],
              ['💼 WFH Video Calls', '50+ Mbps upload symmetric'],
              ['📺 4K Streaming (4 TVs)', '100–200 Mbps'],
              ['📧 Basic browsing', '25–50 Mbps plenty'],
            ].map(([label, rec]) => (
              <div key={label as string} style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>{label as string}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{rec as string}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔍 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select suburb</option>
                {suburbs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Primary Usage</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select usage type</option>
                {usageTypes.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>✅ {rec.provider}</div>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>Speed</span><br /><strong style={{ color: '#e2e8f0′ }}>{rec.speed}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.8rem' }}>Est. Cost</span><br /><strong style={{ color: '#e2e8f0′ }}>{rec.cost}</strong></div>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{rec.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
