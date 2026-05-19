import { useState } from 'react';

export default function DFWWeedControlGuide2026() {
  const [weedType, setWeedType] = useState('');
  const [result, setResult] = useState('');

  const getTreatment = () => {
    if (!weedType) { setResult('Please select a weed type.'); return; }
    const treatments: Record<string, string> = {
      crabgrass: '🌱 Crabgrass in DFW:

Pre-emergent is your only real weapon. Apply when soil hits 55°F — typically mid-February in DFW (watch soil thermometers, not the calendar).

✅ Pre-emergent: Prodiamine or Pendimethalin in February. Apply before forsythia blooms.
⚠️ Post-emergent: Quinclorac (Drive XLR8) works on young crabgrass. Ineffective once it has 4+ tillers.
📅 DFW Timing: Apply Feb 1–15 for north DFW, Feb 15–March 1 for south DFW.
💡 Do not aerate within 8 weeks of pre-emergent application.',
      dallisgrass: '🌿 Dallisgrass in DFW:

Hardest-to-kill weed in DFW. It\'s a perennial that returns from rhizomes every year.

✅ Bermuda lawns only: MSMA (organic arsenical) is most effective — 2–3 applications 2 weeks apart in summer.
⚠️ St. Augustine/Zoysia: No selective option. Spot-treat with glyphosate, resod bare spot.
🔁 Repeat required: Even with MSMA, 2-year treatment programs typical for heavy infestations.
💡 Identify by coarse, boat-shaped leaves in clumps near fence lines and driveways.',
      nutsedge: '🟡 Nutsedge (Yellow/Purple) in DFW:

Nutsedge thrives in wet, compacted DFW clay. Looks like grass but grows faster and lighter green.

✅ Herbicide: Sedgehammer (halosulfuron-methyl) — safest across all DFW grass types.
✅ Alternative: Dismiss (sulfentrazone) for faster knockdown.
⚠️ Multiple apps needed: 2 applications 6–8 weeks apart. Nutsedge regrows from nutlets underground.
📅 Treat May–September when actively growing.
💡 Fix drainage — nutsedge is a symptom of overwatering or poor DFW clay drainage.',
      dandelion: '🌼 Dandelions in DFW:

Less common in warm-season lawns but pop up in dormant Bermuda Jan–March.

✅ Broadleaf herbicide: 2,4-D + MCPP + dicamba (TZone or Weed-B-Gon) in early spring.
📅 Apply when temps are 50–85°F — works poorly in DFW summer heat above 90°F.
⚠️ Avoid on St. Augustine — use labeled rates only.
💡 DFW dormant season (Jan–Feb) is best time to spray before Bermuda greens up. Deep taproot means one application rarely eliminates.',
      goathead: '⚠️ Goathead / Sticker Burrs in DFW:

Goathead (Tribulus terrestris) and field sandbur cause the painful stickers common in DFW.

✅ Pre-emergent: Apply in March before germination. Barricade (prodiamine) works for goathead.
✅ Post-emergent: MSMA on Bermuda for sandbur. Glyphosate spot-spray for goathead.
⚠️ Avoid walking area after goathead seeds — spreads via shoes, pets, mower wheels.
🔁 Annual commitment: Pre-emergent every March is essential in DFW — seeds persist 7+ years in soil.
💡 Remove by hand before seed set (May–June). Use thick gloves — spines penetrate skin.',
    };
    setResult(treatments[weedType] || 'Select a valid weed type.');
  };

  const weeds = [
    { name: 'Crabgrass', emoji: '🌱', timing: 'Feb pre-emergent', difficulty: '⭐⭐' },
    { name: 'Dallisgrass', emoji: '🌿', timing: 'Summer MSMA', difficulty: '⭐⭐⭐⭐⭐' },
    { name: 'Nutsedge', emoji: '🟡', timing: 'May–Sept', difficulty: '⭐⭐⭐⭐' },
    { name: 'Dandelion', emoji: '🌼', timing: 'Winter broadleaf', difficulty: '⭐⭐' },
    { name: 'Goathead/Stickers', emoji: '⚠️', timing: 'March pre-emergent', difficulty: '⭐⭐⭐' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 PROLNK LAWN GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Weed Control Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Identify and eliminate the top 5 DFW lawn weeds with targeted treatment plans.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 24 }}>
          {weeds.map(w => (
            <div key={w.name} style={{ padding: 12, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{w.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 4 }}>{w.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>{w.timing}</div>
              <div style={{ fontSize: 10, color: '#F5E642' }}>Difficulty: {w.difficulty}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>What weed do you have?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[['🌱 Crabgrass', 'crabgrass'], ['🌿 Dallisgrass', 'dallisgrass'], ['🟡 Nutsedge', 'nutsedge'], ['🌼 Dandelion', 'dandelion'], ['⚠️ Goathead/Stickers', 'goathead']].map(([label, val]) => (
            <button key={val} onClick={() => setWeedType(val)} style={{ padding: '12px', border: weedType === val ? '2px solid #F5E642' : '1px solid #1e3a5f', borderRadius: 8, background: weedType === val ? '#1e3a5f' : '#0d1f3c', color: '#fff', cursor: 'pointer', fontSize: 13 }}>{label}</button>
          ))}
        </div>

        <button onClick={getTreatment} style={{ width: '100%', padding: '16px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 20 }}>Get Treatment Guide ➜</button>
        {result && <div style={{ padding: 20, background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 8, lineHeight: 1.9, whiteSpace: 'pre-line', fontSize: 14 }}>{result}</div>}

        <div style={{ marginTop: 24, padding: 16, background: '#0d1f3c', borderRadius: 8, border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📅 DFW Weed Calendar</div>
          <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>Feb: Crabgrass pre-emergent • March: Goathead pre-emergent • May–Aug: Nutsedge treatment, dallisgrass MSMA • Sept–Oct: Broadleaf weeds • Nov–Dec: Winter annual weed prevention</div>
        </div>

        <div style={{ marginTop: 16, padding: 20, background: '#0d1f3c', borderRadius: 8, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Hire a DFW Weed Control Pro</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with licensed DFW lawn care companies. Weed programs from $45/visit.</p>
          <button style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}