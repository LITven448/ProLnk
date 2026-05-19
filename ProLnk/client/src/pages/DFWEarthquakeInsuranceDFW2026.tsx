import { useState } from 'react';

const concernLevels = [
  { id: 'none', label: '😐 Low Concern', title: 'Low Earthquake Concern', desc: 'While North Texas has more seismic activity than most people realize, the risk of a major damaging earthquake remains low. Still, standard homeowners policies exclude earthquake damage entirely.', action: 'Review your policy exclusions. Even at low risk, a $150-250/yr earthquake rider provides complete protection.' },
  { id: 'moderate', label: '😟 Moderate Concern', title: 'Moderate Earthquake Concern', desc: 'DFW\’s increased seismic activity — largely linked to wastewater injection wells from Barnett Shale operations — has produced several felt earthquakes in recent years. Deductibles are typically 10-20% of dwelling value.', action: 'Get an earthquake insurance quote. On a $400K home, expect a 10-20% deductible ($40K-$80K). Factor that into your coverage decision.' },
  { id: 'high', label: '😰 High Concern', title: 'High Earthquake Concern', desc: 'If you live near known injection well activity (Azle, Reno, Cleburne corridors), your risk profile is elevated. Earthquake policies cover structural damage, foundation repairs, and loss of use — none of which standard HO-3 covers.', action: 'Purchase standalone earthquake coverage immediately. Include loss-of-use provisions and document your home\’s foundation condition now as baseline evidence.' },
  { id: 'claim', label: '📋 Filing a Claim', title: 'Earthquake Claim Process', desc: 'Earthquake claims require proof the damage is seismic — not settling, not construction defect. Insurers often dispute cause. Documentation before an event is critical. Photos, engineering reports, and a policy in place are all required.', action: 'Document your foundation with photos and measurements today. If cracks appear after a seismic event, report immediately — do not repair before adjuster inspection.' },
];

export default function DFWEarthquakeInsuranceDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concernLevels.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW INSURANCE GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🌍 DFW Earthquake Insurance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>Most DFW homeowners do not realize North Texas has measurable seismic activity — or that earthquake damage is completely excluded from standard homeowners policies. Here is what you need to know.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 DFW Earthquake Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['🔬 Cause', 'Barnett Shale wastewater injection wells'],['📵 Standard Coverage', 'NOT covered by HO-3'],['💲 Annual Rider Cost', '$150-250/yr for most DFW homes'],['⚠️ Deductible', '10-20% of dwelling value']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>⚠️ <strong style={{ color: '#F5E642' }}>Important:</strong> High-risk corridors include Azle, Reno, Cleburne, and Irving — areas closest to historic injection well activity. Check your city\'s USGS seismic history before deciding.</p>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>Select your concern level:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {concernLevels.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)} style={{ background: selected === c.id ? '#F5E642' : '#112240', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s' }}>{c.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{active.title}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 Action: </span>
              <span style={{ color: '#94a3b8' }}>{active.action}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🔧 Foundation Issues After a Quake?</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>ProLnk connects DFW homeowners with licensed foundation specialists and structural engineers. Only vetted, insured professionals — never unqualified storm chasers.</p>
        </div>
      </div>
    </div>
  );
}