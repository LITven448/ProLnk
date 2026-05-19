import { useState } from 'react';

const repairs = [
  {
    type: 'Nail pop (small dent)',
    texture: 'Flat/smooth',
    tools: ['Putty knife (3")', 'Fine grit sanding sponge', 'Paint brush'],
    technique: 'Apply lightweight spackle in thin layers. Sand flush when dry. Prime before painting.',
    dfwTip: 'DFW humidity swings cause nail pops — drive nail 1/8" deeper before spackling.',
  },
  {
    type: 'Hairline crack',
    texture: 'Any',
    tools: ['6" drywall knife', 'Mesh tape', 'All-purpose joint compound', 'Mud pan', 'Sanding sponge'],
    technique: 'Embed mesh tape in first coat. Feather two more coats 8–12" wide. Sand smooth between coats.',
    dfwTip: 'DFW clay soil movement causes cracks — fix cause before cosmetic repair or cracks return.',
  },
  {
    type: 'Hole 1–4 inches',
    texture: 'Skip trowel (common in DFW)',
    tools: ['Patch kit or backer board', '6" & 10" drywall knives', 'Mud pan', 'Texture spray or skip trowel tool', 'Sanding block'],
    technique: 'Install backer, apply three coats of compound, feather wide. Replicate skip trowel with irregular stipple sponge or spray.',
    dfwTip: 'Skip trowel is the dominant DFW texture — practice the pattern on cardboard before applying to wall.',
  },
  {
    type: 'Corner bead damage',
    texture: 'Any',
    tools: ['Corner bead crimper or screws', '6" knife', 'All-purpose compound', 'Sanding sponge', 'Mud pan'],
    technique: 'Secure new bead flush and straight. Apply three coats of compound 6" out from bead on each side. Sand carefully — do not sand bead itself.',
    dfwTip: 'Use vinyl corner bead in DFW — paper bead absorbs humidity and can bubble in humid spring months.',
  },
  {
    type: 'Water-damaged section',
    texture: 'Popcorn or smooth',
    tools: ['Utility knife', 'Drywall saw', 'Backer boards', '12" knife', 'Mud pan', 'Popcorn texture spray'],
    technique: 'Cut out damaged section square. Fix water source first. Install new drywall with backer support. Three coats compound, feather wide.',
    dfwTip: 'DFW roof/plumbing leaks are common — verify dry for 72 hrs before any drywall repair.',
  },
];

export default function DFWSpackleToolGuide() {
  const [repairType, setRepairType] = useState('');
  const [result, setResult] = useState<typeof repairs[0] | null>(null);

  function lookup() {
    const match = repairs.find(r =>
      r.type.toLowerCase().includes(repairType.toLowerCase()) ||
      r.texture.toLowerCase().includes(repairType.toLowerCase())
    );
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪣 Spackle & Drywall Tool Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>Right tools for every drywall repair. Includes DFW-specific skip trowel matching techniques.</p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F5E642' }}>
          🏠 Skip trowel is the most common wall texture in DFW homes. Matching it requires practice — take your time.
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Tools</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter repair type (e.g. crack, hole, corner, water...)"
              value={repairType}
              onChange={e => setRepairType(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Tools
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>Texture: {result.texture}</div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontWeight: 600 }}>Tools needed:</span>
                <ul style={{ margin: '6px 0 0 18px', color: '#CBD5E1', lineHeight: 1.8 }}>
                  {result.tools.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>📐 Technique: {result.technique}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💡 DFW Tip: {result.dfwTip}</div>
            </div>
          )}
          {repairType && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>No match — try "crack", "hole", "corner", "skip trowel", or "water".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Repair Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {repairs.map((r, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{r.type}</span>
                <span style={{ background: '#F5E64220', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 13 }}>{r.texture}</span>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>🔧 {r.tools.join(' · ')}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>📐 {r.technique}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💡 {r.dfwTip}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · Need a pro? Connect with a vetted drywall specialist on ProLnk
        </div>
      </div>
    </div>
  );
}
