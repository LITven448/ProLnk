import { useState } from 'react';

const coSources = [
  { id: 'furnace', icon: '🔥', label: 'Gas Furnace', risk: 'High', detail: 'Cracked heat exchanger leaks CO into living space. DFW homes run furnaces hard Nov–Feb.', detect: 'Annual HVAC tune-up, combustion analysis, CO detector near furnace.', prevent: 'Replace heat exchanger if cracked. Never skip annual inspection.' },
  { id: 'waterheater', icon: '💧', label: 'Gas Water Heater', risk: 'High', detail: 'Backdrafting flue pulls CO back inside. Common in tight DFW homes post-weatherization.', detect: 'CO detector within 10 ft. Check flue pipe annually for blockages.', prevent: 'Power-vent or tankless unit eliminates backdraft risk entirely.' },
  { id: 'garage', icon: '🚗', label: 'Attached Garage', risk: 'Medium', detail: 'Idling vehicle in attached garage seeps CO through door gaps. Common DFW issue with cold mornings.', detect: 'CO detector inside door to garage. Weather-strip door gaps.', prevent: 'Never idle vehicle in garage. Install CO detector on first floor near garage wall.' },
  { id: 'generator', icon: '⚡', label: 'Portable Generator', risk: 'Critical', detail: '#1 CO killer in DFW during ice storms (Uri 2021). Generators inside garage = deadly.', detect: 'CO detector indoors. Generator must be 20+ ft from any opening.', prevent: 'Run generator outside only, downwind. Never in garage, porch, or breezeway.' },
  { id: 'grill', icon: '🍖', label: 'Gas Grill / Outdoor Cooker', risk: 'Low', detail: 'DFW outdoor cooking culture creates risk when grills are moved inside during cold snaps.', detect: 'Never bring gas/charcoal grill indoors — no detection substitutes for prevention.', prevent: 'Outdoor-only rule. Provide covered patio for cold-weather use.' },
];

export default function DFWCarbonMonoxide2Guide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'detect' | 'prevent'>('detect');

  const src = coSources.find(s => s.id === selected);
  const riskColor = (r: string) => r === 'Critical' ? '#FF4444′ : r === ’High' ? '#FF8800′ : r === ’Medium' ? '#F5E642′ : '#44BB44';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🟡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Carbon Monoxide Deep Dive 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>Part 2 — CO Sources in North Texas Homes</p>
        </div>

        <p style={{ background: '#1A2840', borderRadius: 10, padding: '14px 18px', lineHeight: 1.6, marginBottom: 24, fontSize: 15 }}>
          DFW homes face unique CO risks: high furnace reliance, attached garages, and generator use during ERCOT outages.
          Tap any source below to get a detection and prevention guide.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
          {coSources.map(s => (
            <button key={s.id} onClick={() => { setSelected(s.id); setTab('detect'); }}
              style={{ background: selected === s.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#E8F4FD', margin: '6px 0 4px' }}>{s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: riskColor(s.risk) }}>Risk: {s.risk}</div>
              <div style={{ fontSize: 12, color: '#8BA5C4', marginTop: 6, lineHeight: 1.4 }}>{s.detail}</div>
            </button>
          ))}
        </div>

        {src && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              {(['detect', 'prevent'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                    background: tab === t ? '#F5E642′ : '#1E3A5F', color: tab === t ? '#0A1628' : '#E8F4FD' }}>
                  {t === 'detect' ? '🔍 Detection' : '🛡️ Prevention'}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{src.icon}</div>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px' }}>{src.label}</h3>
            <p style={{ color: '#B8D4EA', lineHeight: 1.7, margin: 0 }}>{tab === 'detect' ? src.detect : src.prevent}</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 32, padding: '16px', background: '#0F2040', borderRadius: 10, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 22 }}>⚠️</div>
          <p style={{ color: '#8BA5C4', fontSize: 13, margin: '8px 0 0′ }}>CO is odorless and colorless. Install detectors on every level. Test monthly. Replace every 5–7 years.</p>
        </div>
      </div>
    </div>
  );
}

