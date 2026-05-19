import { useState } from 'react';

const homeTypes = [
  { id: 'single', label: '🏠 Single Family', shutoffs: ['Main at meter (street, wrench required)', 'Main inside house (garage or utility closet)', 'Under kitchen sink', 'Under bathroom sinks', 'Behind toilets', 'Behind washing machine', 'Water heater cold-supply shutoff'] },
  { id: 'condo', label: '🏢 Condo / Townhome', shutoffs: ['Unit main shutoff (inside unit near entry or utility)', 'Building main (contact HOA — do not touch alone)', 'Under kitchen sink', 'Under bathroom sinks', 'Behind toilets', 'Water heater shutoff (shared or in-unit)'] },
  { id: 'older', label: '🏚 Pre-1980 Home', shutoffs: ['Meter box at curb (city key may be needed)', 'Ball valve near water entry (check crawl space or basement)', 'Gate valves under sinks (turn clockwise to close)', 'Behind toilets (older supply valves — replace if corroded)', 'Water heater drain valve (brass, near base)'] },
];

export default function DFWValveLocatorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = homeTypes.find(h => h.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW Water Shutoff Valve Locator Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Find every water shutoff in your DFW home before an emergency strikes. Select your home type for a tailored shutoff map.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>🗺 Universal Shutoff Locations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['💧 Main at meter: street level, requires meter key or wrench', '🏠 Main inside: garage, utility closet, or near water heater', '🚰 Supply stops: under every sink and behind every toilet', '🧺 Washing machine: two valves (hot + cold) on wall behind unit', '🔥 Water heater: cold-supply ball valve on inlet pipe at top', '🗓 Best practice: label each shutoff with a laminated tag'].map((tip, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5′ }}>{tip}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Your Home Type → Get a Shutoff Guide</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setSelected(h.id === selected ? null : h.id)}
                style={{ background: selected === h.id ? '#F5E642′ : '#1a3a5c', color: selected === h.id ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0′ }}>Shutoff Checklist — {match.label}</h3>
            <ul style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.shutoffs.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6′ }}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Need a licensed DFW plumber?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with vetted pros in your zip code — free quotes, no pressure.</div>
        </div>
      </div>
    </div>
  );
}