import { useState } from 'react';

const ISP_DATA: Record<string, { isps: string[]; speed: string; cost: string }> = {
  'inner-suburb': {
    isps: ['AT&T Fiber (up to 5 Gbps)', 'Frontier Fiber (up to 2 Gbps)', 'Spectrum Cable (up to 1 Gbps)'],
    speed: '500 Mbps–1 Gbps fiber',
    cost: '$55–$80/mo',
  },
  'outer-suburb': {
    isps: ["AT&T Fiber (select areas)", 'T-Mobile Home Internet 5G', 'Spectrum Cable'],
    speed: '300–500 Mbps fiber or 5G',
    cost: '$50–$75/mo',
  },
  exurb: {
    isps: ['T-Mobile Home Internet 5G', 'Verizon Home Internet 5G', 'AT&T Fixed Wireless'],
    speed: '100–300 Mbps 5G fixed wireless',
    cost: '$50–$70/mo',
  },
  rural: {
    isps: ['Verizon Home Internet 5G (limited)', 'AT&T Fixed Wireless', 'HughesNet/Starlink'],
    speed: 'Starlink 100–200 Mbps recommended',
    cost: '$65–$120/mo (Starlink $120)',
  },
};

export default function DFWFiberInternetGuide() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { isps: string[]; speed: string; cost: string }>(null);

  function handleCheck() {
    if (location && ISP_DATA[location]) setResult(ISP_DATA[location]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🌐 DFW Internet Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Fiber Internet in the DFW Metroplex — 2026 Guide
        </h1>
        <p style={{ color: '#9BA3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          The DFW area is one of the fastest-growing fiber markets in the U.S. AT&T Fiber now passes millions of DFW homes, Frontier Fiber continues expanding, and 5G home internet fills gaps in outer suburbs and exurbs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '⚡', title: 'Symmetrical Speeds', desc: 'Fiber gives equal upload and download — critical for DFW remote workers on video calls and large file transfers.' },
            { icon: '🎮', title: 'Low Latency Gaming', desc: 'Fiber latency in DFW averages 5–12ms vs 30–80ms on cable, a meaningful edge in competitive gaming.' },
            { icon: '📡', title: '5G as Alternative', desc: 'T-Mobile and Verizon Home Internet bring 100–300 Mbps to outer DFW areas where fiber has not reached yet.' },
            { icon: '🏠', title: 'Remote Work Ready', desc: 'DFW fiber expansion supports the region\’s massive remote-work population with enterprise-grade residential service.' },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 8 }}>{card.title}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🗺️ ISP Options by DFW Location Type</h2>
          <p style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 24 }}>Select your location to see available providers and recommended speed tiers.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            {[
              { value: 'inner-suburb', label: 'Inner Suburb (Plano, Irving, Garland)' },
              { value: 'outer-suburb', label: 'Outer Suburb (Rockwall, Mansfield, Lewisville)' },
              { value: 'exurb', label: 'Exurb (Fate, Celina, Midlothian)' },
              { value: 'rural', label: 'Rural (Parker, Lavon, Combine)' },
            ].map((opt) => (
              <button key={opt.value} onClick={() => setLocation(opt.value)}
                style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${location === opt.value ? '#F5E642' : '#1E2D4A'}`,
                  backgroundColor: location === opt.value ? '#F5E642' : 'transparent',
                  color: location === opt.value ? '#0A1628' : '#9BA3B8', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Show My ISP Options
          </button>
          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Available Providers</div>
              {result.isps.map((isp) => (
                <div key={isp} style={{ color: '#E8EAF0', fontSize: 14, marginBottom: 6 }}>✅ {isp}</div>
              ))}
              <div style={{ marginTop: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div><span style={{ color: '#9BA3B8', fontSize: 13 }}>Recommended Speed</span><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.speed}</div></div>
                <div><span style={{ color: '#9BA3B8', fontSize: 13 }}>Typical Monthly Cost</span><div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.cost}</div></div>
              </div>
            </div>
          )}
        </div>
        <div style={{ backgroundColor: '#111D35', border: '1px solid #1E2D4A', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 Fiber vs Cable vs 5G in DFW</h2>
          {[
            { type: 'AT&T Fiber', speed: 'Up to 5 Gbps', latency: '5–10ms', symmetrical: 'Yes', notes: 'Best availability in DFW core' },
            { type: 'Frontier Fiber', speed: 'Up to 2 Gbps', latency: '8–15ms', symmetrical: 'Yes', notes: 'Expanding rapidly in DFW suburbs' },
            { type: 'Spectrum Cable', speed: 'Up to 1 Gbps', latency: '15–30ms', symmetrical: 'No', notes: 'Wide coverage, asymmetric uploads' },
            { type: 'T-Mobile 5G Home', speed: '100–300 Mbps', latency: '20–40ms', symmetrical: 'Mostly', notes: 'Good for outer DFW, variable speeds' },
          ].map((row) => (
            <div key={row.type} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, padding: '14px 0', borderBottom: '1px solid #1E2D4A' }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', minWidth: 140 }}>{row.type}</div>
              <div style={{ color: '#9BA3B8', fontSize: 13 }}>⚡ {row.speed}</div>
              <div style={{ color: '#9BA3B8', fontSize: 13 }}>📶 {row.latency}</div>
              <div style={{ color: row.symmetrical === 'Yes' ? '#4ADE80' : '#F87171', fontSize: 13 }}>⬆️ Sym: {row.symmetrical}</div>
              <div style={{ color: '#9BA3B8', fontSize: 13, maxWidth: 200 }}>{row.notes}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 24, backgroundColor: '#0D1E3A', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#9BA3B8', fontSize: 14 }}>Need help choosing or installing your DFW internet setup?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Connect with a local DFW tech pro on ProLnk →</div>
        </div>
      </div>
    </div>
  );
}
