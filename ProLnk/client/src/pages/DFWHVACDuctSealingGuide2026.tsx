import { useState } from 'react';

export default function DFWHVACDuctSealingGuide2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');

  const methods = [
    { name: 'Mastic Sealant', icon: '🟠', cost: '$200–$500 DIY', life: 'Permanent', detail: 'Best for DFW. Flexible paste brushed onto seams and joints. Handles DFW temperature swings (-5F to 115F). Never dries brittle.' },
    { name: 'Foil Tape (UL 181B)', icon: '🪙', cost: '$30–$80 DIY', life: '5–10 years', detail: 'Good for accessible duct sections in attics or crawlspaces. Must use UL 181B-rated foil tape — standard duct tape fails in DFW heat.' },
    { name: 'Aeroseal (Professional)', icon: '💨', cost: '$1,500–$3,500', life: '10–20 years', detail: 'Sprays polymer particles inside pressurized ducts — seals all leaks from the inside. Best for inaccessible DFW attic ductwork. Provides before/after leakage report.' },
  ];

  const guides: Record<string, string> = {
    attic: '🔥 ATTIC DUCTS: DFW attics reach 150F+ in summer — foil tape degrades fast. Use mastic on all joints. Consider Aeroseal for flex duct connections you cannot reach. Priority: seal near air handler first where pressure is highest. Expected savings: $300–$700 per year in DFW.',
    crawl: '🕳️ CRAWLSPACE DUCTS: Moisture risk in DFW. Use mastic + foil tape combo. Check insulation wrap for gaps (cold air loss). Add vapor barrier to crawlspace floor. DIY-accessible — budget a weekend and $150–$300 in materials.',
    walls: '🧱 IN-WALL/CEILING DUCTS: Not DIY-accessible. Aeroseal is the only option without opening drywall. Get a duct leakage test first ($150) to confirm leakage before spending on Aeroseal. If leakage is under 15%, may not justify cost.',
    garage: '🚗 GARAGE DUCTS: Code violation in most DFW cities — ducts should not pass through garage (CO risk). If they do, seal every joint with mastic and add CO detector. Consider rerouting with HVAC contractor.',
  };

  const assess = () => {
    if (!location) { setResult('Please select a duct location.'); return; }
    setResult(guides[location] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💨 Duct Sealing Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>
          Average DFW home loses <strong style={{ color: '#F5E642′ }}>20–30% of conditioned air</strong> through leaky ducts — paying to air condition your attic. Sealing ducts is the highest-ROI HVAC upgrade in DFW.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 8, padding: '12px 16px', marginBottom: 28, color: '#94a3b8', fontSize: 13 }}>
          📊 DFW average duct leakage: 25% | Average annual waste: $400–$900 | Payback period after sealing: 1–3 years
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛠️ Sealing Methods</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {methods.map(m => (
            <div key={m.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{m.icon} {m.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>💰 {m.cost} &nbsp;|&nbsp; ⏳ {m.life}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{m.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Duct Location to Sealing Approach</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Duct Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select location...</option>
              <option value="attic">Attic (most common in DFW)</option>
              <option value="crawl">Crawlspace</option>
              <option value="walls">Inside walls / ceiling (inaccessible)</option>
              <option value="garage">Garage</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Sealing Guide
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 13, lineHeight: 1.7 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          💡 <strong style={{ color: '#F5E642′ }}>Pro tip:</strong> Get a blower door + duct leakage test before sealing to baseline your numbers. Most DFW HVAC pros include this in a full tune-up. ProLnk connects you with certified duct sealing specialists.
        </div>
      </div>
    </div>
  );
}
