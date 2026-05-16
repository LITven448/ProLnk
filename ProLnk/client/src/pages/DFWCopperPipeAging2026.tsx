import { useState } from 'react';

export default function DFWCopperPipeAging2026() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    const yr = parseInt(age);
    if (!age || isNaN(yr)) { setResult('Please enter a valid pipe age.'); return; }
    let msg = '';
    if (yr < 15) msg = '✅ Young copper — DFW hard water scale buildup just starting. Flush aerators annually. No action needed yet.';
    else if (yr < 30) {
      if (symptom === 'pinhole') msg = '⚠️ Pinholes at 15–30 years suggest Type M (thin-wall) copper or aggressive water chemistry. Test pH and chloramine levels. Localized repair ok but monitor closely.';
      else if (symptom === 'low') msg = '🔧 Low pressure at 15–30 years = scale buildup inside pipes (DFW 300+ ppm hardness). Descale or consider PEX re-route for worst sections.';
      else msg = '🟡 Mid-age copper in DFW — inspect visible joints for green corrosion (verdigris). Whole-home softener can extend life another 15 years.';
    } else {
      if (symptom === 'pinhole') msg = '🚨 30+ yr copper with pinholes = active failure mode. Budget for whole-home repipe (PEX recommended). DFW average cost: $4,000–$9,000 for 2,000 sq ft home.';
      else if (symptom === 'electrolysis') msg = '⚡ Electrolysis pitting — check for mixed aluminum fittings or stray electrical current. Requires plumber + electrician inspection.';
      else msg = '🔴 30+ year copper in DFW: start planning repipe. Type L copper survives longer; Type M often fails by this age. Get an inspection before selling or refinancing.';
    }
    setResult(msg);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔶 DFW Aging Copper Pipe Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW hard water doesn't corrode copper — but it does leave scale inside and create other long-term failure modes.</p>

        {[
          { icon: '💧', title: 'DFW Hard Water (300+ ppm)', body: 'Dallas-Fort Worth has some of the hardest water in the US. Calcium and magnesium deposits build up inside copper pipes over decades, restricting flow and increasing pressure on joints. Doesn't corrode copper but does reduce lifespan of fixtures and water heaters.' },
          { icon: '🕳️', title: 'Pinhole Leaks in Copper', body: 'Caused by: aggressive chloramine chemistry (DFW switched from chlorine ~2005), Type M thin-wall copper used in budget builds 1985–2000, or turbulent flow from high pressure. Pinholes appear mid-pipe, not at joints.' },
          { icon: '⚡', title: 'Electrolysis (Pipe to Pipe)', body: 'Copper + aluminum fittings in the same system create galvanic corrosion. DFW homes built during aluminum wiring era (1965–1973) may have mixed metals. Results in pitting corrosion at connection points.' },
          { icon: '🏠', title: 'Copper Grades in DFW', body: 'Type K (thick wall, outdoor/underground), Type L (residential standard — most DFW homes), Type M (thin wall — used to cut costs, more common in tract homes). Type M fails sooner in hard water.' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔍 Copper Pipe Assessment Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 6 }}>Approximate pipe age (years):</label>
            <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="e.g. 25" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 6 }}>Primary symptom:</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff' }}>
              <option value="">-- Select --</option>
              <option value="pinhole">Pinhole leaks found</option>
              <option value="low">Low water pressure</option>
              <option value="electrolysis">Pitting at fittings</option>
              <option value="none">No symptoms yet</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Assess My Pipes
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}