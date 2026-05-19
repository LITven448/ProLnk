import { useState } from 'react';

const monthData: Record<string, { avgNight: number; recTemp: number; savings: number; note: string }> = {
  June: { avgNight: 78, recTemp: 76, savings: 4, note: 'Nights still warm — keep setback under 3°F.' },
  July: { avgNight: 82, recTemp: 78, savings: 3, note: 'Hottest nights of the year. Minimal setback recommended.' },
  August: { avgNight: 81, recTemp: 77, savings: 3, note: 'Similar to July. Drift no more than 3°F overnight.' },
  September: { avgNight: 74, recTemp: 75, savings: 6, note: 'Nights start to cool. Slightly more setback is viable.' },
  October: { avgNight: 63, recTemp: 72, savings: 11, note: 'Cooler nights — larger setback now saves real money.' },
  May: { avgNight: 69, recTemp: 74, savings: 8, note: 'Transitional month — moderate setback is effective.' },
};

const homeAdjust: Record<string, number> = {
  '< 1,500 sq ft': -1,
  '1,500–2,500 sq ft': 0,
  '2,500–3,500 sq ft': 1,
  '3,500+ sq ft': 2,
};

export default function DFWHVACNightOperation() {
  const [month, setMonth] = useState('July');
  const [homeSize, setHomeSize] = useState('1,500–2,500 sq ft');

  const data = monthData[month] ?? monthData['July'];
  const adjust = homeAdjust[homeSize] ?? 0;
  const optimalTemp = data.recTemp + adjust;
  const estimatedSavings = Math.max(1, data.savings - adjust);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          🌙 ProLnk · DFW HVAC Guide
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Night HVAC Operation
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Unlike most of the US, DFW summer nights stay warm — often 78–82°F. That changes
          the math on overnight setbacks. Setting back more than 4°F can actually cost you
          more the next morning when your AC struggles to recover.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>
            🌡️ DFW Night Strategy Calculator
          </h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Month</label>
            <select
              value={month}
              onChange={e => setMonth(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(monthData).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Home Size</label>
            <select
              value={homeSize}
              onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(homeAdjust).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#F5E642′ }}>{optimalTemp}°F</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Optimal Night Setpoint</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#4ade80′ }}>{estimatedSavings}%</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>Est. Overnight Savings</div>
            </div>
          </div>
          <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 10, padding: 16, fontSize: 14, color: '#CBD5E1', lineHeight: 1.6 }}>
            ℹ️ Avg DFW night: <strong style={{ color: '#F5E642′ }}>{data.avgNight}°F</strong> — {data.note}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 DFW Night Rules</h2>
          {[
            ['The 4°F Rule', 'In DFW summers, never setback more than 4°F overnight. Recovery costs more than savings.'],
            ['Why DFW is Different', 'Most setback advice assumes 65°F nights. DFW nights at 80°F mean your AC never truly rests.'],
            ['Humidity is the Hidden Cost', 'Warmer overnight temps mean more moisture stays in the air — your AC removes both heat and humidity.'],
            ['Best Strategy: Consistent Overnight', 'Pick one overnight temp and hold it. Let the thermostat manage small variations automatically.'],
          ].map(([title, body]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 6 }}>
            🔧 Get a DFW-specific HVAC tune-up
          </div>
          <div style={{ color: '#1E3A5F', fontSize: 14 }}>
            ProLnk matches you with local HVAC pros who understand North Texas night conditions.
          </div>
        </div>
      </div>
    </div>
  );
}
