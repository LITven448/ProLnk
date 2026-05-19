import { useState } from 'react';

export default function DFWWaterLineReplacement2026() {
  const [pipeType, setPipeType] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!pipeType || !symptom) { setResult('Please select both pipe type and symptom.'); return; }
    const map: Record<string, Record<string, string>> = {
      galvanized: {
        rust: '🔴 Galvanized steel + rust = active corrosion. DFW soil acidity and moisture accelerates galvanized decay. Replace now — trenchless boring is fastest and least disruptive. Budget $4,000–$7,000 for main line.',
        low: '🔴 Galvanized + low pressure = internal corrosion narrowing the pipe. Scale buildup is irreversible. Replace with HDPE or copper. Trenchless option available if no major bends.',
        none: '🟡 Galvanized with no symptoms — inspect age. If 40+ years, DFW clay soil movement likely accelerating decay. Get a camera inspection ($150–250) before it fails.',
      },
      poly: {
        rust: '🟡 Polyethylene (black poly) main lines don’t rust, but UV degradation can cause brittleness near surface. Check for cracking where pipe exits ground.',
        low: '🟠 Low pressure with poly main — check for root intrusion near trees (DFW live oaks have aggressive roots) or fitting failures. Camera inspect before assuming pipe failure.',
        none: '✅ Poly main with no symptoms — check age. Pre-1985 poly uses a different formulation that degrades faster. If 30+ years, plan for replacement within 5 years.',
      },
      copper: {
        rust: '🟡 Copper mains don’t rust. Red/brown water = sediment from city main or water heater, not your copper line. Flush cold water 2+ minutes and test again.',
        low: '🟡 Low pressure in copper main — check meter valve (partially closed), pressure regulator (DFW PRV typically set 60–80 psi), or scale buildup at fixtures.',
        none: '✅ Copper main in good condition — typically lasts 50+ years. DFW clay soil can stress joints over time. No immediate action needed.',
      },
    };
    setResult(map[pipeType]?.[symptom] || 'Assessment unavailable for this combination.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚰 DFW Water Line Replacement Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>The main water line from street to house is often the most neglected pipe in DFW homes — until it fails at 2am.</p>

        {[
          { icon: '⚙️', title: 'Galvanized Steel Main Lines', body: 'Common in DFW homes built before 1970. Corrodes from inside out — rust narrows the pipe, reduces pressure, and eventually causes pinhole leaks or full breaks. DFW clay soil movement accelerates joint stress. Lifespan: 40–70 years depending on soil and water chemistry.' },
          { icon: '🖤', title: 'Polyethylene (Black Poly) Main Lines', body: 'Used 1970s–1990s. UV-sensitive — degrades where exposed above ground. Root intrusion common near DFW live oaks and water oaks (roots chase moisture). Fittings use insert+clamp design that can loosen over decades.' },
          { icon: '🔄', title: 'Trenchless vs Open Cut', body: 'Trenchless pipe bursting: new HDPE pipe pulled through while splitting old pipe — minimal yard disruption, 1-day job, $3,500–$6,000. Open cut: trench from meter to house, required when path has major bends or obstacles. Adds 1–2 days and $1,500–$3,000 in restoration cost.' },
          { icon: '💰', title: '2026 DFW Cost Ranges', body: 'Main line replacement (meter to house, 50–100 ft): $3,000–$8,000. Trenchless adds ~20% premium over open cut but saves landscape restoration. Whole-home repipe (internal pipes only): $4,000–$9,000 separately. Get 3 quotes — DFW pricing varies widely by neighborhood and access.' },
          { icon: '🌳', title: 'DFW-Specific Risks', body: 'Clay soil shrink-swell cycles (DFW has some of the most expansive clay in the US) stress buried pipes every year. Live oak and cedar elm roots are aggressive. Main line breaks most common in Feb–Mar after freeze cycles stress joints.' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Water Line Replacement Timing Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 6 }}>Main line pipe material:</label>
            <select value={pipeType} onChange={e => setPipeType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff' }}>
              <option value="">-- Select --</option>
              <option value="galvanized">Galvanized steel</option>
              <option value="poly">Black polyethylene</option>
              <option value="copper">Copper</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 6 }}>Current symptom:</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff' }}>
              <option value="">-- Select --</option>
              <option value="rust">Rust or discolored water</option>
              <option value="low">Low water pressure</option>
              <option value="none">No symptoms (proactive check)</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Get Timing Guidance
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ marginTop: 32, padding: '20px', background: '#132035', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get DFW water line replacement quotes today</div>
          <div style={{ color: '#94A3B8' }}>ProLnk connects you with licensed plumbers who specialize in main line work — free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}