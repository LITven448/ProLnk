import { useState } from 'react';

const brands = [
  { id: 'trane', name: 'Trane', icon: '🥇', heat: 95, service: 90, warranty: 88, efficiency: 92, price: 'Premium', dfwRank: 1, verdict: 'Best overall for DFW heat reliability. Trane’s Comfort systems are field-proven in Texas extremes.' },
  { id: 'carrier', name: 'Carrier', icon: '🥈', heat: 92, service: 88, warranty: 90, efficiency: 94, price: 'Premium', dfwRank: 2, verdict: 'Excellent efficiency and warranty. Carrier Infinity series handles DFW peaks with minimal efficiency loss.' },
  { id: 'lennox', name: 'Lennox', icon: '🥉', heat: 88, service: 82, warranty: 85, efficiency: 96, price: 'Premium', dfwRank: 3, verdict: 'Highest SEER2 ratings but dealer network thinner in DFW suburbs. Best for efficiency-first buyers.' },
  { id: 'rheem', name: 'Rheem / Ruud', icon: '4️⃣', heat: 85, service: 92, warranty: 82, efficiency: 88, price: 'Mid-range', dfwRank: 4, verdict: 'Widest service availability in DFW — great for maintenance access. Slightly lower efficiency ceiling.' },
  { id: 'york', name: 'York', icon: '5️⃣', heat: 83, service: 85, warranty: 80, efficiency: 86, price: 'Mid-range', dfwRank: 5, verdict: 'Solid value in DFW mid-market. Good for budget replacements in moderate-use DFW applications.' },
  { id: 'goodman', name: 'Goodman / Amana', icon: '6️⃣', heat: 78, service: 88, warranty: 92, efficiency: 82, price: 'Budget', dfwRank: 6, verdict: 'Longest warranty (lifetime compressor on some models). Budget-friendly but more frequent DFW service calls.' },
];

const priorities = [
  { id: 'heat', label: '🔥 Extreme Heat Reliability' },
  { id: 'service', label: '🔧 Local DFW Service Availability' },
  { id: 'warranty', label: '📋 Best Warranty Coverage' },
  { id: 'efficiency', label: '⚡ Energy Efficiency (SEER2)' },
];

export default function DFWHVACBrandRankingDFW() {
  const [priority, setPriority] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = priority
    ? [...brands].sort((a, b) => (b as any)[priority] - (a as any)[priority])
    : brands;

  const topBrand = sorted[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC Brand Rankings</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How top brands perform on what matters most in DFW — heat reliability, service, warranty, and efficiency</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Rank by What Matters Most to You</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {priorities.map(p => (
              <button key={p.id} onClick={() => setPriority(priority === p.id ? null : p.id)} style={{ background: priority === p.id ? '#F5E642' : '#1e3a5f', color: priority === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{p.label}</button>
            ))}
          </div>
          {priority && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <strong style={{ color: '#F5E642' }}>Top Pick: </strong>
              <span style={{ color: '#fff' }}>{topBrand.name} (Score: {(topBrand as any)[priority]}/100) — {topBrand.verdict}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sorted.map((brand, i) => (
            <div key={brand.id} onClick={() => setExpanded(expanded === brand.id ? null : brand.id)} style={{ background: '#111f3a', border: `2px solid ${i === 0 && priority ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 18, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{brand.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: i === 0 && priority ? '#F5E642' : '#fff' }}>{brand.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{brand.price} • DFW Rank #{priority ? i + 1 : brand.dfwRank}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {(['heat', 'service', 'warranty', 'efficiency'] as const).map(cat => (
                    <div key={cat} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: priority === cat ? '#F5E642' : '#94a3b8' }}>{(brand as any)[cat]}</div>
                      <div style={{ fontSize: 10, color: '#475569' }}>{cat}</div>
                    </div>
                  ))}
                </div>
              </div>
              {expanded === brand.id && (
                <div style={{ marginTop: 14, padding: '12px 0 0', borderTop: '1px solid #1e3a5f', color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                  {brand.verdict}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>🌡️ DFW Heat Reliability Note</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 14 }}>DFW regularly hits 105–110°F in July/August. Brands with the highest heat reliability scores (Trane, Carrier) use heavier-gauge compressors and better thermal protection than budget alternatives. This matters most during DFW heat waves when demand peaks and service wait times grow.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
