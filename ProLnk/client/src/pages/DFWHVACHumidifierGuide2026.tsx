import { useState } from 'react';

const sizes = [
  { id: 'small', label: '🏠 Under 1,500 sq ft', rec: 'Aprilaire 400 Flow-Through (17 gal/day) — low maintenance, no standing water', cost: '$300–$500 installed' },
  { id: 'medium', label: '🏡 1,500–3,000 sq ft', rec: 'Aprilaire 600 Bypass (17 gal/day) or Honeywell HE360 — bypass type works best with 2-stage furnaces', cost: '$400–$700 installed' },
  { id: 'large', label: '🏰 3,000+ sq ft', rec: 'Aprilaire 800 Steam (34.6 gal/day) — steam humidifier heats water independently, works even when furnace is off', cost: '$700–$1,200 installed' },
  { id: 'wood', label: '🪵 Hardwood Floors / Wood Furniture', rec: 'Any whole-home unit — target 35–45% RH in winter to prevent hardwood gaps and cracking', cost: '$400–$900 installed' },
];

export default function DFWHVACHumidifierGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = sizes.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Whole-Home Humidifier Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW winters drop indoor humidity to 20–30% during heating season — damaging floors, skin, and sinuses.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>📊 DFW Winter Humidity Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Winter Avg Indoor RH', value: '20–30%' },
              { label: 'Comfort Target', value: '35–45% RH' },
              { label: 'Hardwood Safe Range', value: '35–50% RH' },
              { label: 'Feels Like Warmer At', value: '+4°F at 40% RH' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a2f4a', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>🔍 Select Your Home Size / Concern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sizes.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1a2f4a', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 16, background: '#1a2f4a', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{match.rec}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 Installed Cost: {match.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 12px' }}>⚙️ Humidifier Types Explained</h2>
          {[
            { type: 'Flow-Through', icon: '💧', desc: 'Water flows over a pad — simplest, lowest maintenance. No standing water. Requires drain line.' },
            { type: 'Bypass (Drum)', icon: '🔄', desc: 'Uses furnace fan to push air through water panel. Common in DFW installs. Cheap but needs annual pad changes.' },
            { type: 'Steam', icon: '♨️', desc: 'Boils water to create steam — most precise control, works without furnace running. Best for large homes.' },
          ].map(h => (
            <div key={h.type} style={{ background: '#1a2f4a', borderRadius: 8, padding: '12px 14px', marginBottom: 10, display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 24 }}>{h.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{h.type}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, marginTop: 4 }}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
