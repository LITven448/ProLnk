import { useState } from 'react';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const HUMIDITY_SEASONS: Record<string, { label: string; risk: string; flushFreq: string }> = {
  high: { label: 'High (Jun–Sep)', risk: 'Very High — 3–5 gal/day condensate', flushFreq: 'Every 4 weeks' },
  moderate: { label: 'Moderate (Apr–May, Oct)', risk: 'Moderate — 1–3 gal/day', flushFreq: 'Every 6 weeks' },
  low: { label: 'Low (Nov–Mar)', risk: 'Low — under 1 gal/day', flushFreq: 'Every 8 weeks' },
};

const LOCATIONS = ['Attic', 'Closet', 'Garage', 'Basement'];

export default function DFWHVACDrainLineGuide() {
  const [location, setLocation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [showResult, setShowResult] = useState(false);

  const season = humidity ? HUMIDITY_SEASONS[humidity] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Condensate Drain Line Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          DFW's brutal humidity means your AC pulls 2–5 gallons of moisture from the air every single day. All of that water must flow out a drain line — and when it clogs, that water goes somewhere else. Usually your ceiling.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>💧 What Happens When the Drain Clogs</div>
          {[
            ['🚨','Overflow into drain pan','If the pan fills, water overflows onto ceiling drywall'],
            ['🏠','Ceiling & insulation damage','Attic units cause the worst damage — often $3K–$15K'],
            ['🦠','Mold growth','Standing water in a warm attic = mold within 24–48 hours'],
            ['⚡','System shutdown','Float switch (if installed) cuts power before overflow'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div><div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>📍 Your HVAC Setup</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>HVAC / Air Handler Location</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LOCATIONS.map(l => (
                <button key={l} onClick={() => setLocation(l)} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: location === l ? '#F5E642' : '#1E3A5F', background: location === l ? '#F5E64220' : 'transparent', color: location === l ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Current DFW Humidity Season</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(HUMIDITY_SEASONS).map(([key, val]) => (
                <button key={key} onClick={() => setHumidity(key)} style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid', borderColor: humidity === key ? '#F5E642' : '#1E3A5F', background: humidity === key ? '#F5E64220' : 'transparent', color: humidity === key ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{val.label}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!location || !humidity} style={{ background: location && humidity ? '#F5E642' : '#1E3A5F', color: location && humidity ? '#0A1628' : '#4A6080', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: location && humidity ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Maintenance Schedule
          </button>
        </div>

        {showResult && season && (
          <div style={{ background: '#0D2240', border: '1.5px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 12 }}>📋 Your Drain Line Plan — {location} Unit</div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#94A3B8' }}>Condensate Risk:</span> <span style={{ fontWeight: 600 }}>{season.risk}</span></div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#94A3B8' }}>Bleach Flush Frequency:</span> <span style={{ fontWeight: 600 }}>{season.flushFreq}</span></div>
            <div style={{ marginBottom: 8 }}><span style={{ color: '#94A3B8' }}>Float Switch:</span> <span style={{ fontWeight: 600, color: location === 'Attic' ? '#EF4444' : '#10B981' }}>{location === 'Attic' ? '🚨 STRONGLY RECOMMENDED — attic damage risk is extreme' : '✅ Recommended as insurance'}</span></div>
            <div style={{ marginTop: 16, background: '#111E35', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>🔧 How to Clear a Clog</div>
              {['Turn off your AC at thermostat.','Locate the PVC drain line exit (usually outside near condenser).','Pour 1 cup distilled white vinegar or diluted bleach into the access port.','Wait 30 min, then flush with water.','If clogged solid, use a wet/dry vac at the exterior drain end for 1–2 min.'].map((s, i) => (
                <div key={i} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>{i + 1}. {s}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📅 DFW Annual Drain Maintenance Calendar</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {MONTHS.map((m, i) => {
              const isBig = [3, 5, 8].includes(i);
              return (
                <div key={m} style={{ background: isBig ? '#F5E64215' : '#0A1628', border: `1px solid ${isBig ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isBig ? '#F5E642' : '#4A6080' }}>{m}</div>
                  {isBig && <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>Flush</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
