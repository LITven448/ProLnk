import { useState } from 'react';

const locations = [
  { city: 'Dallas', type: 'Standard drip / spray', sensor: 'Mechanical Freeze Sensor (37°F)', controller: 'Any standard controller with sensor bypass port', smart: 'Optional — Rachio 3 has built-in freeze skip', cost: '$20–$45 sensor only' },
  { city: 'Fort Worth', type: 'Standard drip / spray', sensor: 'Mechanical Freeze Sensor (37°F)', controller: 'Compatible with Hunter, Rain Bird, Toro controllers', smart: 'Optional — Hunter HC Smart Controller', cost: '$20–$45 sensor only' },
  { city: 'Plano', type: 'Smart controller system', sensor: 'Smart Controller Built-in Freeze Skip', controller: 'Rachio 3, Hunter HC, RainBird ST8I', smart: 'Built-in — no add-on sensor needed', cost: '$150–$280 controller upgrade' },
  { city: 'Frisco', type: 'Smart controller system', sensor: 'Smart Controller Built-in Freeze Skip', controller: 'Rachio 3 accepted for Frisco code compliance', smart: 'Built-in weather intelligence', cost: '$150–$280 controller upgrade' },
  { city: 'McKinney', type: 'Standard drip / spray', sensor: 'Wireless Freeze Sensor', controller: 'Any McKinney Water-approved controller', smart: 'Wireless pairs with most controllers', cost: '$35–$75 wireless sensor' },
  { city: 'Arlington', type: 'Standard drip / spray', sensor: 'Mechanical or Wireless Freeze Sensor', controller: 'Arlington rebates available for smart controller upgrades', smart: 'Strongly recommended for 2026 rebate eligibility', cost: '$20–$280 depending on approach' },
];

export default function DFWFreezeSensorGuide() {
  const [selCity, setSelCity] = useState<string | null>(null);
  const [selType, setSelType] = useState<string | null>(null);
  const match = locations.find(l => l.city === selCity);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW Freeze Sensor Guide for Irrigation
          </h1>
          <p style={{ color: '#94a3b8' }}>
            DFW freeze sensors shut off irrigation when temperatures drop below 37°F — preventing icy walkways, pipe bursts, and wasted water in winter storms.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Your DFW Location</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
            {locations.map(l => (
              <button
                key={l.city}
                onClick={() => setSelCity(l.city === selCity ? null : l.city)}
                style={{
                  background: selCity === l.city ? '#F5E642' : '#1e3a5f',
                  color: selCity === l.city ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s'
                }}
              >
                {l.city}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Freeze Sensor Recommendation — {match.city}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Sensor Type', value: match.sensor },
                { label: 'Controller Compatibility', value: match.controller },
                { label: 'Smart Integration', value: match.smart },
                { label: 'Estimated Cost', value: match.cost },
              ].map(item => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>How DFW Freeze Sensors Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌡️', title: '37°F Trigger', desc: 'Sensor bimetallic disc snaps open at 37°F, cutting signal to controller valve circuit' },
              { icon: '🔄', title: 'Auto-Reset', desc: 'Sensor automatically resets when temperature rises above freeze threshold — no manual action needed' },
              { icon: '📱', title: 'Smart Skip', desc: 'Smart controllers use NWS forecast data to skip runs before freeze events, not just during' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>February 2021 Uri Lesson</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>DFW freeze sensors would not have prevented Uri pipe bursts (temps hit single digits) but they prevent the far more common 28–36°F events that crack emitter heads, freeze above-ground backflow preventers, and create ice on sidewalks from overnight irrigation runs.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
