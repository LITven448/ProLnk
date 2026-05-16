import { useState } from 'react';

const safetyData = [
  {
    tool: 'Circular Saw',
    season: 'Summer (Jun–Sep)',
    risks: ['Motor overheating in 100°F+ heat', 'Blade expansion causing bind', 'Dehydration-related loss of focus'],
    checklist: ['Work max 45 min then rest in AC', 'Use carbide blade — stays sharp longer in heat', 'Keep motor vents clear of sawdust', 'Hydrate before and during use'],
    protection: 'Safety glasses, ear protection, cut-resistant gloves, work boots',
  },
  {
    tool: 'Angle Grinder',
    season: 'Any season',
    risks: ['Metal sparks ignite dry DFW grass (fire risk Apr–Oct)', 'Disc failure at high RPM', 'Flying debris in TX wind'],
    checklist: ['Clear 10 ft radius of dry vegetation before grinding', 'Inspect disc for cracks before mounting', 'Never exceed disc RPM rating', 'Use water nearby for grass fire control'],
    protection: 'Full face shield, leather gloves, long sleeves, leather apron',
  },
  {
    tool: 'Router',
    season: 'Summer',
    risks: ['Collet expansion from heat causes bit slip', 'Dust collection bags clog faster in heat', 'Kickback risk increases with fatigue in heat'],
    checklist: ['Tighten collet extra 1/4 turn in summer', 'Empty dust bag every 20 min in heat', 'Work in garage with door open early morning', 'Take breaks every 30 min'],
    protection: 'Safety glasses, dust mask (N95 minimum), hearing protection',
  },
  {
    tool: 'Any Power Tool (Outdoor)',
    season: 'Spring (Apr–May)',
    risks: ['DFW electrical storms develop rapidly', 'Lightning strike risk when working on roof or elevated', 'Ground current from nearby strikes'],
    checklist: ['Check weather before outdoor work', 'Stop work at first thunder — do not wait for rain', 'Never use corded tools on roof during storm risk', 'Have plan to secure tools quickly'],
    protection: 'Rubber-soled boots, monitor weather app, never work elevated in storm risk',
  },
  {
    tool: 'Belt Sander',
    season: 'Summer',
    risks: ['Fine wood dust + DFW heat = fire risk near dust collection', 'Overheating motor in sustained use', 'Heat exhaustion during extended outdoor sanding'],
    checklist: ['Metal dust collection bin — not plastic — in summer', 'Sand in 20-min intervals in heat', 'Empty and inspect dust bag between sessions', 'Keep fire extinguisher nearby when dust collecting in heat'],
    protection: 'N95 dust mask, safety glasses, hearing protection',
  },
];

export default function DFWPowerToolSafetyDFW() {
  const [tool, setTool] = useState('');
  const [result, setResult] = useState<typeof safetyData[0] | null>(null);

  function lookup() {
    const match = safetyData.find(s =>
      s.tool.toLowerCase().includes(tool.toLowerCase()) ||
      s.season.toLowerCase().includes(tool.toLowerCase())
    );
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚡ Power Tool Safety in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>DFW-specific hazards: extreme heat, rapid storms, and fire-risk conditions change how you use power tools.</p>

        <div style={{ background: '#F87171' + '22', border: '1px solid #F87171' + '55', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F87171' }}>
          🚨 DFW summer temps regularly hit 105°F. Power tool motors overheat, batteries fail, and operator fatigue creates serious injury risk. Plan your work early morning.
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Safety Checklist</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter tool or season (e.g. circular saw, summer, storm...)"
              value={tool}
              onChange={e => setTool(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Checklist
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F87171' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.tool}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>Season: {result.season}</div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600, color: '#F87171' }}>DFW Risks:</span>
                <ul style={{ margin: '6px 0 0 18px', color: '#F87171', lineHeight: 1.8, fontSize: 13 }}>
                  {result.risks.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontWeight: 600, color: '#34D399' }}>Safety Checklist:</span>
                <ul style={{ margin: '6px 0 0 18px', color: '#34D399', lineHeight: 1.8, fontSize: 13 }}>
                  {result.checklist.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>🦺 PPE: {result.protection}</div>
            </div>
          )}
          {tool && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>Try "circular saw", "grinder", "router", "belt sander", or "storm".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Safety Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {safetyData.map((s, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{s.tool}</span>
                <span style={{ background: '#F87171' + '22', color: '#F87171', borderRadius: 6, padding: '2px 10px', fontSize: 13 }}>{s.season}</span>
              </div>
              <div style={{ color: '#F87171', fontSize: 13, marginBottom: 6 }}>⚠️ {s.risks.join(' · ')}</div>
              <div style={{ color: '#34D399', fontSize: 13, marginBottom: 4 }}>✅ {s.checklist.slice(0, 2).join(' · ')}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>🦺 {s.protection}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · When in doubt, hire a vetted pro through ProLnk
        </div>
      </div>
    </div>
  );
}
