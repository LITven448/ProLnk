import { useState } from 'react';

export default function DFWHVACCOPRating2026() {
  const [temp, setTemp] = useState(45);
  const [system, setSystem] = useState('standard');

  function calcCOP(t: number, sys: string): number {
    const base = sys === 'premium' ? 3.8 : 3.0;
    if (t >= 50) return base;
    if (t >= 40) return base - 0.4;
    if (t >= 32) return base - 0.9;
    return base - 1.5;
  }

  const cop = calcCOP(temp, system);

  const efficiency =
    cop >= 3.5 ? '🟢 Excellent' : cop >= 2.5 ? '🟡 Good' : cop >= 1.8 ? '🟠 Fair' : '🔴 Poor';

  const sections = [
    { icon: '⚡', title: 'What COP Means', body: 'COP (Coefficient of Performance) measures how much heat energy your system delivers per unit of electricity consumed. A COP of 3 means you get 3x more heat than the electricity you pay for — impossible with gas, standard for heat pumps.' },
    { icon: '🌤️', title: 'DFW Mild Winters = High COP', body: 'DFW winter temps typically range 35–60°F. In this range, heat pumps achieve COP of 3–4, meaning they are 3–4x more efficient than resistance heating and often beat gas economics at current Texas energy rates.' },
    { icon: '❄️', title: 'Below 35°F: COP Drops', body: 'When DFW dips below 35°F (rare but possible), heat pump COP falls to 1.5–2.0. Emergency heat strips may activate, using straight resistance. A cold-climate heat pump handles this better with variable-speed compressors.' },
    { icon: '💰', title: 'Heat Pumps Beat Gas in DFW', body: 'At COP 3.0 and Texas electricity rates (~$0.12/kWh), effective cost is $0.04/kWh equivalent. Natural gas at $1.50/therm delivers ~$0.044/kWh equivalent. Heat pumps win on heating economics in DFW most of the year.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Heat Pump COP Rating Guide 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Coefficient of Performance for North Texas Heat Pumps</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ DFW COP Calculator</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Outdoor Temperature: <strong>{temp}°F</strong></label>
          <input type="range" min={20} max={70} value={temp} onChange={e => setTemp(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 16 }} />
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>System Type</label>
          <select value={system} onChange={e => setSystem(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="standard">Standard Heat Pump</option>
            <option value="premium">Cold-Climate / Variable Speed</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>COP {cop.toFixed(1)}</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>{efficiency} Efficiency at {temp}°F</div>
          </div>
        </div>

        {sections.map((s, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{s.icon} {s.title}</h3>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Need a DFW HVAC specialist to evaluate your heat pump?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Free Quote via ProLnk
          </button>
        </div>
      </div>
    </div>
  );
}