import { useState } from 'react';

const heatIndexData: Record<number, { capacity: number; message: string }> = {
  95: { capacity: 98, message: 'Minimal impact — your AC runs near rated efficiency.' },
  100: { capacity: 94, message: 'Slight drop — AC works harder but manages well.' },
  105: { capacity: 89, message: 'Noticeable strain — runtime increases significantly.' },
  110: { capacity: 83, message: 'High stress — expect 2-4 extra hours of runtime daily.' },
  115: { capacity: 76, message: 'Critical load — undersized units will fall behind.' },
  120: { capacity: 68, message: 'Extreme overload — cooling capacity may be insufficient.' },
};

const sizeMultiplier: Record<string, number> = {
  '< 1,500 sq ft': 1.05,
  '1,500–2,500 sq ft': 1.0,
  '2,500–3,500 sq ft': 0.96,
  '3,500+ sq ft': 0.91,
};

export default function DFWHVACHeatIndexEffect() {
  const [heatIndex, setHeatIndex] = useState(110);
  const [homeSize, setHomeSize] = useState('1,500–2,500 sq ft');

  const base = heatIndexData[heatIndex] ?? heatIndexData[110];
  const multiplier = sizeMultiplier[homeSize] ?? 1.0;
  const effectiveCapacity = Math.round(base.capacity * multiplier);

  const capacityColor =
    effectiveCapacity >= 90 ? '#4ade80' : effectiveCapacity >= 80 ? '#facc15' : '#f87171';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          🌡️ ProLnk · DFW HVAC Guide
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Heat Index Effect on Your AC
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          DFW summer heat indexes routinely hit 110–115°F. At those temperatures, your AC's
          rated cooling capacity shrinks — sometimes dramatically. Here's what that means for
          your home and your bill.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>
            🔢 DFW Capacity Calculator
          </h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>
              Heat Index (°F)
            </label>
            <select
              value={heatIndex}
              onChange={e => setHeatIndex(Number(e.target.value))}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(heatIndexData).map(v => (
                <option key={v} value={v}>{v}°F heat index</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>
              Home Size
            </label>
            <select
              value={homeSize}
              onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(sizeMultiplier).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: capacityColor }}>{effectiveCapacity}%</div>
            <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>Effective AC Capacity</div>
            <div style={{ fontSize: 15, color: '#CBD5E1', marginTop: 12, lineHeight: 1.6 }}>{base.message}</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Why This Matters in DFW</h2>
          {[
            ['Rated capacity is tested at 95°F', 'Most AC units are rated at 95°F outdoor temp. DFW routinely exceeds that.'],
            ['Every 10°F above 95°F ≈ 5–7% capacity loss', 'Heat index compounds this — humid air requires more refrigerant work.'],
            ['Undersized units fall behind after 2pm', 'Peak heat index in DFW is 3–5pm. Homes can rise 2–4°F before cooling resumes.'],
            ['Oversizing doesn\’t always help', 'Short-cycling in high humidity causes its own problems — moisture stays in the air.'],
          ].map(([title, body]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 6 }}>
            🔧 Is your AC sized for DFW heat?
          </div>
          <div style={{ color: '#1E3A5F', fontSize: 14 }}>
            ProLnk connects DFW homeowners with licensed HVAC pros who know local conditions.
          </div>
        </div>
      </div>
    </div>
  );
}
