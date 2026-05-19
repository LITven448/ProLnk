import { useState } from 'react';

export default function DFWHomeInspectorProGuide2026() {
  const [volume, setVolume] = useState(5);

  const avgFee = 450;
  const weeks = 50;
  const annual = volume * weeks * avgFee;
  const monthly = Math.round(annual / 12);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔍</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Home Inspector Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>TX TREC-licensed inspectors — connect with buyers and sellers in the DFW market.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📋', label: 'TX License Required', value: 'TREC' },
            { icon: '💵', label: 'DFW Avg Inspection', value: '$450' },
            { icon: '📅', label: 'Inspections / Week', value: '5–7' },
            { icon: '💰', label: 'Annual Potential', value: '$130K+' },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 16px' }}>📊 Annual Revenue Projector</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>Inspections per week</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{volume}</span>
            </div>
            <input type="range" min={1} max={12} value={volume} onChange={(e) => setVolume(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ color: '#475569', fontSize: 11 }}>1/wk</span>
              <span style={{ color: '#475569', fontSize: 11 }}>12/wk</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Avg Fee</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>$450</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${monthly.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Annual Revenue</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${annual.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>🏛️ TX TREC Licensing Requirements</h2>
          {['Must hold active TREC Real Estate Inspector license', 'Standard Inspector or Professional Inspector designation', 'Background check + approved education hours required', 'E&O insurance required to operate in TX', 'License verified before ProLnk profile goes live'].map((b) => (
            <div key={b} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>📍 DFW Market Intel</h2>
          {['DFW real estate market: 150K+ transactions/yr — inspectors in constant demand', 'ProLnk connects buyers, sellers, and agents to inspectors in their zip code', 'Same-day and next-day booking capability increases close rates', 'Pre-listing inspections growing — add-on revenue stream', 'New construction inspections command premium fees: $500–900'].map((n) => (
            <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}