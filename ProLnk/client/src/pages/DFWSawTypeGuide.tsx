import { useState } from 'react';

const saws = [
  {
    type: 'Circular Saw',
    projects: ['Plywood decking', 'Fence boards', 'Subfloor replacement', 'Deck boards'],
    blade: '7-1/4″ carbide-tipped 24T for framing, 60T for finish cuts',
    dfwApp: 'Ideal for cedar fence replacement — very common in DFW',
    rentVsBuy: 'Buy — used on nearly every project. $80–140 at Home Depot',
    cuts: 'Straight cuts in sheet goods and dimensional lumber',
  },
  {
    type: 'Jigsaw',
    projects: ['Countertop sink cutout', 'Curved deck shapes', 'Notching around obstacles', 'Cabinet toe-kick cuts'],
    blade: 'T-shank bi-metal for wood; fine-tooth for laminates',
    dfwApp: 'Countertop cutouts for granite-look laminate (popular DFW kitchen update)',
    rentVsBuy: 'Buy — $60–100. Used for precision cuts that circular saw cannot do',
    cuts: 'Curves, interior cutouts, irregular shapes',
  },
  {
    type: 'Reciprocating Saw',
    projects: ['Demolition', 'Root cutting', 'Old pipe removal', 'Window frame removal'],
    blade: 'Demo blade (9″) for general demo; pruning blade for roots',
    dfwApp: 'Tree root encroachment into structures is common in DFW — pruning blade removes roots',
    rentVsBuy: 'Buy if doing any demo — $80–120. Rent for one-time demo job ($25/day)',
    cuts: 'Rough, aggressive cuts — demo work only',
  },
  {
    type: 'Miter Saw',
    projects: ['Baseboard installation', 'Crown molding', 'Door casing', 'Deck framing', 'Fence post trimming'],
    blade: '10″ or 12″ 60–80T for trim, 24T for framing',
    dfwApp: 'Baseboard and door casing replacement after foundation repair is extremely common in DFW',
    rentVsBuy: 'Rent for single projects ($40/day). Buy ($300–500) if doing full house trim work',
    cuts: 'Precise cross-cuts and angle cuts in trim and framing lumber',
  },
  {
    type: 'Table Saw',
    projects: ['Ripping lumber', 'Cabinet builds', 'Custom shelving', 'Deck board ripping to width'],
    blade: '10″ 40T combo blade standard; 80T for fine woodworking',
    dfwApp: 'Custom garage shelving and storage — popular DFW project with large garages',
    rentVsBuy: 'Rent for single ripping jobs ($60/day). Buy ($400–800) for ongoing woodworking',
    cuts: 'Long rip cuts parallel to grain; requires stationary setup',
  },
  {
    type: 'Oscillating Multi-Tool',
    projects: ['Undercutting door casings', 'Tile removal', 'Grout removal', 'Flush-cutting pipes'],
    blade: 'Bi-metal plunge blade; carbide grout blade for tile work',
    dfwApp: 'Installing new flooring over old — DFW homes frequently get hardwood or LVP over slab',
    rentVsBuy: 'Buy — $60–120. Irreplaceable for finish carpentry and tile work',
    cuts: 'Tight spaces, flush cuts, oscillating grinding and scraping',
  },
];

export default function DFWSawTypeGuide() {
  const [project, setProject] = useState('');
  const [result, setResult] = useState<typeof saws[0] | null>(null);

  function lookup() {
    const match = saws.find(s =>
      s.type.toLowerCase().includes(project.toLowerCase()) ||
      s.projects.some(p => p.toLowerCase().includes(project.toLowerCase())) ||
      s.cuts.toLowerCase().includes(project.toLowerCase())
    );
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪚 Saw Type Guide for DFW Projects</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>Which saw for which project — plus blade selection, DFW application, and rent vs. buy guidance.</p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F5E642′ }}>
          🔑 DFW's most common projects: cedar fence replacement, baseboard repair after foundation work, and garage shelving. Know which saw before you start.
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Saw</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter project (e.g. fence, baseboard, demo, tile...)"
              value={project}
              onChange={e => setProject(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Recommend
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{result.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>Cuts: {result.cuts}</div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 6 }}>🪚 Blade: {result.blade}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>🏠 DFW Application: {result.dfwApp}</div>
              <div style={{ color: '#34D399', fontSize: 13 }}>🛒 {result.rentVsBuy}</div>
            </div>
          )}
          {project && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>Try "fence", "baseboard", "demo", "countertop", "flooring", or "curve".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Saw Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {saws.map((s, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{s.type}</span>
                <span style={{ background: '#F5E64220', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 13 }}>{s.cuts}</span>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 4 }}>Projects: {s.projects.join(', ')}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>🪚 {s.blade}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>🏠 {s.dfwApp}</div>
              <div style={{ color: '#34D399', fontSize: 13 }}>🛒 {s.rentVsBuy}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · Find a vetted carpenter or handyman on ProLnk
        </div>
      </div>
    </div>
  );
}
