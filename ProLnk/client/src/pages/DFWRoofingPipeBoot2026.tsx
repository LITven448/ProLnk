import { useState } from 'react';

export default function DFWRoofingPipeBoot2026() {
  const [situation, setSituation] = useState('');
  const [penetrations, setPenetrations] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, string> = {
    cracked: 'Cracked rubber pipe boots are the leading single-point DFW roof leak source. Rubber degrades from UV in 10–15 years — DFW intense sun accelerates this. Replacement options: (1) Standard rubber boot ($10–15 material, $75–100 installed per penetration) — will need replacement again in 10-15 years. (2) Three-piece metal flashing ($25–40 material, $100–150 installed) — aluminum or galvalume sleeve with separate base and cap — lasts 30+ years in DFW sun. Always choose metal for DFW re-roofing projects.',
    leaking: 'If you have an active DFW roof leak traced to a pipe penetration: confirm by running water over each boot while someone watches the attic. Once confirmed, temporary fix: apply self-fusing silicone tape over cracks (lasts 1-2 seasons). Permanent fix: replace with three-piece metal flashing — rubber replacement is a short-term solution in DFW UV conditions. Cost: $75–150 per penetration. Most DFW homes have 5–8 penetrations.',
    aging: 'Proactive replacement before failure: if your roof is 12+ years old in DFW, inspect all pipe boots from ground level with binoculars. Look for separated base, cracked collar, or missing rubber around pipe. At re-roofing time, request three-piece metal flashing on all penetrations — it adds $50–100 per penetration but eliminates the most common DFW re-leak call. For a typical DFW home (6 penetrations), budget $600–900 additional.',
    new_construction: 'For new DFW construction or complete re-roof: specify three-piece metal pipe flashing in your scope of work before signing. Most DFW roofers default to rubber boots — they are faster to install and cheaper. Get it in writing. Stainless or galvalume flashing is ideal for the DFW climate. Inspect before final payment by pulling attic hatch and checking each penetration for daylight gaps.',
  };

  function getGuide() {
    if (!situation) { setGuide('Please select your pipe boot situation.'); return; }
    const base = guides[situation] || 'Contact a DFW roofing specialist for your situation.';
    const penNote = penetrations ? ` Estimated cost for your ${penetrations} penetrations: $${parseInt(penetrations) * 100}–$${parseInt(penetrations) * 150} for three-piece metal flashing replacement.` : '';
    setGuide(base + penNote);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Pipe Boot Replacement Guide 2026</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>The most common single-point roof leak source in DFW homes — rubber boot failure, replacement options, and cost guide.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 DFW Pipe Boot Fast Facts</h2>
          {['#1 single-point leak source on DFW roofs — more common than missing shingles or flashing','Rubber pipe boots fail in 10–15 years from DFW UV exposure — shorter than shingle lifespan','Typical DFW home has 5–8 roof penetrations (plumbing vents, HVAC flues, bath fans)','Three-piece metal flashing lasts 30+ years — the correct long-term solution for DFW sun','Cost: $75–100 (rubber) or $100–150 (metal) per penetration fully installed','Ask for metal flashing during any DFW re-roofing project — most roofers default to rubber'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#c8d8ec', fontSize: 14 }}><span style={{ color: '#F5E642′ }}>🔩</span>{f}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛠️ Get Your Replacement Guide</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pipe Boot Situation</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select situation...</option>
            <option value="cracked">Visible cracked or split rubber boot</option>
            <option value="leaking">Active leak traced to pipe penetration</option>
            <option value="aging">Aging roof — proactive inspection/replacement</option>
            <option value="new_construction">New construction or complete re-roof</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Number of Roof Penetrations (optional)</label>
          <select value={penetrations} onChange={e => setPenetrations(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Not sure / skip cost estimate</option>
            {[3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} penetrations</option>)}
          </select>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Get Replacement Guide 🔧</button>
          {guide && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.6, borderLeft: '3px solid #F5E642′ }}>{guide}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Pipe Boot Replacement Guide 2026</div>
      </div>
    </div>
  );
}
