import { useState } from 'react';

export default function DFWRoofingCottonwoodGuide2026() {
  const [impact, setImpact] = useState('');
  const [result, setResult] = useState('');

  const impacts = [
    { value: 'ac-clogged', label: 'AC Condenser Clogged' },
    { value: 'gutters-full', label: 'Gutters Full of Seeds' },
    { value: 'roof-debris', label: 'Roof Debris Accumulation' },
    { value: 'interior-entry', label: 'Seeds Entering Home' },
  ];

  const guides: Record<string, string> = {
    'ac-clogged': 'IMMEDIATE ACTION: Turn off AC. Rinse condenser fins with garden hose (gentle, top-down). Never use pressure washer — bends fins. Clean weekly during May cottonwood season. A clogged condenser runs 15–25% less efficiently and trips high-pressure safeties.',
    'gutters-full': 'URGENT (within 48 hrs): Cottonwood seeds compress and hold moisture like sponge. Clean gutters immediately, check downspout flow. Seeds accumulate faster than any other debris in DFW — a full gutter in 3 days during peak is common.',
    'roof-debris': 'SCHEDULE WITHIN 1 WEEK: Seeds lodge in valleys and low-slope areas. They hold moisture against shingles and can cause granule loss in 1–2 seasons if left. Use leaf blower from peak down (never upward) or hire a pro.',
    'interior-entry': 'INSPECT & SEAL: Entry points include attic vents without screens, soffit gaps, and whole-house fan openings. Add fine-mesh screens to all attic vents. Check dryer exhaust flap — often left open and becomes a seed entry point.',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          🌨️ Cottonwood Season Roof Guide
        </h1>
        <p style={{ color: '#9BAEC8', marginBottom: '28px', lineHeight: 1.6 }}>
          Every May, DFW looks like a <strong style={{ color: '#F5E642' }}>snowstorm in Texas</strong>. Cottonwood seeds blanket roofs, clog AC condensers, and fill gutters in days. This is a uniquely DFW maintenance window.
        </p>

        {[
          { icon: '❄️', title: 'May Cottonwood Blizzard', desc: 'Eastern cottonwood trees (common in DFW creek corridors and older neighborhoods) release seeds for 2–4 weeks in May. Wind carries them miles — you don't need a cottonwood tree to be affected.' },
          { icon: '❄️', title: 'AC Condenser Vulnerability', desc: 'Seeds enter condenser fins within hours of peak release. A clogged condenser causes compressor stress and efficiency loss — check every 3–4 days during peak season.' },
          { icon: '🍂', title: 'Gutter Fill Speed', desc: 'Unlike leaves, cottonwood seeds are light and fluffy but compress into a dense mat when wet. A single DFW May rain event can fully clog previously clean gutters.' },
          { icon: '🏠', title: 'Home Entry Points', desc: 'Unsealed attic vents, soffit gaps, and open whole-house fan openings allow seeds inside. Once in the attic, seeds become fire fuel and moisture traps.' },
        ].map((item) => (
          <div key={item.title} style={{ backgroundColor: '#111D35', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642' }}>
            <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.title}</div>
            <div style={{ color: '#9BAEC8', fontSize: '14px' }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ backgroundColor: '#111D35', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
          <div style={{ fontWeight: 700, marginBottom: '16px', color: '#F5E642' }}>🌨️ Cottonwood Impact → Maintenance Guide</div>
          <select
            value={impact}
            onChange={(e) => { setImpact(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #2A3F6F', marginBottom: '12px', fontSize: '15px' }}
          >
            <option value="">Select your cottonwood impact...</option>
            {impacts.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
          <button
            onClick={() => impact && setResult(guides[impact])}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '15px' }}
          >
            Get Maintenance Guide
          </button>
          {result && (
            <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#E8EDF5', lineHeight: 1.6, fontSize: '14px' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

