import { useState } from 'react';

const situations = [
  { id: 'high', label: '🌡️ Humidity feels high (stuffy, muggy)', rec: 'Set humidistat to 45–50% in summer. Run dehumidifier mode. Check that your HVAC drain pan and condensate line are clear — DFW summers overwhelm clogged drains fast.' },
  { id: 'low', label: '🏜️ Air feels too dry (static, cracked lips)', rec: 'Set humidistat to 35–40% in winter. A standalone or thermostat-integrated humidifier on the supply side is ideal for DFW\'s dry cold snaps.' },
  { id: 'mold', label: '🍄 Worried about mold or condensation', rec: 'Keep indoor humidity below 50% year-round. A whole-home humidistat wired to your air handler is the most reliable fix. Inspect attic and crawl spaces in spring.' },
  { id: 'choosing', label: '🛒 Choosing between standalone vs integrated', rec: 'Thermostat-integrated (like Ecobee or Honeywell T6 Pro) is preferred for DFW — one device controls temp AND humidity. Standalone humidistats work but require manual coordination.' },
];

export default function DFWHVACHumidistatsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Humidistat Control for DFW Homes</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>DFW's humidity swings from swamp-level summer to bone-dry winter cold snaps. A whole-home humidistat keeps your HVAC system — and your home — in balance year-round.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 DFW Optimal Humidity Ranges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['Summer (May–Sep)', '45–50%', '🌞'], ['Winter (Nov–Feb)', '35–45%', '❄️'], ['Spring (Mar–Apr)', '40–50%', '🌧️'], ['Fall (Oct)', '40–48%', '🍂']].map(([season, range, icon]) => (
              <div key={season} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: '1.5rem' }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.25rem' }}>{season}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>{range}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 How Humidistats Integrate with Your HVAC</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.9, color: '#C5CAD8' }}>
            <li>Humidistat reads indoor RH% continuously</li>
            <li>Signals air handler to run dehumidification or humidification cycle</li>
            <li>Thermostat-integrated models coordinate with temp setpoints automatically</li>
            <li>Standalone units wire into the dehumidifier relay on your air handler</li>
            <li>DFW pros recommend pairing with a variable-speed air handler for best results</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Your Humidity Situation → Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s' }}>{s.label}</button>
            ))}
          </div>
          {rec && <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642', color: '#E8EAF0', lineHeight: 1.7 }}>{rec.rec}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Connecting DFW homeowners with trusted HVAC pros
        </div>
      </div>
    </div>
  );
}