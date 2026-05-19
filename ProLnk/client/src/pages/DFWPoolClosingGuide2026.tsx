import { useState } from 'react';

export default function DFWPoolClosingGuide2026() {
  const [poolType, setPoolType] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  const checklists: Record<string, string[]> = {
    inground: [
      '🌡️ Monitor forecast — close when overnight low drops below 35°F',
      '🧪 Balance chemistry: pH 7.4–7.6, alkalinity 80–120 ppm',
      '💥 Shock pool 48 hours before closing',
      '🦠 Add winter algaecide — DFW algae stays active in mild winters',
      '💧 Lower water 4–6 inches below skimmer if hard freeze expected',
      '💨 Blow out lines with air compressor (freeze protection)',
      '🔌 Drain pump, filter, heater, and chlorinator to prevent freeze damage',
      '🏊 Add pool antifreeze in lines as needed',
      '🪤 Install Gizzmo in skimmer to absorb freeze expansion',
      '🛡️ Install safety cover or winter cover',
    ],
    aboveground: [
      '🌡️ DFW above-ground pools can usually run year-round',
      '💧 Keep pump running during freeze events (moving water resists freezing)',
      '🧪 Balance chemistry monthly through winter',
      '💥 Shock monthly if cover is not in use',
      '🛡️ Install winter cover to reduce evaporation and debris',
      '🔌 Protect filter system from hard freezes with insulation wrap',
      '🔁 Run pump at night if temps drop below 32°F',
    ],
    fiberglass: [
      '✅ Fiberglass is freeze-resistant — full closing rarely needed in DFW',
      '🧪 Keep water balanced all winter (pH critical for gel coat)',
      '🏊 Keep water level full — fiberglass needs water pressure',
      '🔌 Winterize equipment lines on hard freeze warnings',
      '💨 Blow out returns and skimmer lines before freezes',
      '💥 Shock and add algaecide before any extended downtime',
      '🛡️ Optional: solar cover reduces heating costs year-round',
    ],
  };

  const dfwFreezeEvents = [
    { year: '2021 (URI)', temps: '-2°F', damage: 'Catastrophic — thousands of burst lines' },
    { year: '2023', temps: '14°F', damage: 'Moderate — equipment failures common' },
    { year: '2024', temps: '22°F', damage: 'Mild — unprotected equipment at risk' },
    { year: '2025', temps: '18°F', damage: 'Moderate — multi-day event, high claims' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Closing Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW pools rarely fully close — but freeze prep is critical every winter</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🌨️ Recent DFW Freeze Events</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 0 }}>Learn why winterization matters even in mild DFW winters</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {dfwFreezeEvents.map((e) => (
              <div key={e.year} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{e.year}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#60a5fa' }}>{e.temps}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{e.damage}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>⚙️ Build Your Winterization Checklist</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Type</label>
            <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
              <option value=''>Select your pool type</option>
              <option value='inground'>Inground (Plaster/Gunite)</option>
              <option value='aboveground'>Above Ground</option>
              <option value='fiberglass'>Fiberglass</option>
            </select>
          </div>
          <button onClick={() => setShowChecklist(true)} disabled={!poolType} style={{ background: poolType ? '#F5E642′ : '#334155', color: '#0A1628', fontWeight: 700, border: ’none', borderRadius: 8, padding: '12px 28px', cursor: poolType ? 'pointer' : 'not-allowed' }}>
            Get My Winterization Steps →
          </button>
        </div>

        {showChecklist && poolType && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>✅ Your Winterization Checklist</h2>
            {checklists[poolType].map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #0A1628', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>⚡ DFW Pro Tip</h2>
          <p style={{ color: '#e2e8f0', fontSize: 14, margin: 0 }}>
            🌡️ Set a weather alert for 35°F. When a freeze is forecast, run your pump continuously overnight — moving water freezes at a lower temp. Never turn off a pool pump during a freeze event.
          </p>
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
