import { useState } from 'react';

export default function DFWPoolCopingGuide2026() {
  const [copingType, setCopingType] = useState('');
  const [concern, setConcern] = useState('');

  const types = [
    { id: 'cantilever', label: '🏗️ Cantilever (Standard)' },
    { id: 'brick', label: '🧱 Brick/Coping Pavers' },
    { id: 'travertine', label: '🪨 Travertine' },
    { id: 'tile', label: '🔷 Bullnose Tile' },
  ];

  const concerns = [
    { id: 'crack', label: '😰 Cracking/Heaving' },
    { id: 'loose', label: '🔧 Loose/Shifting' },
    { id: 'upgrade', label: '✨ Upgrade Appearance' },
    { id: 'hot', label: '🌡️ Too Hot in Sun' },
  ];

  const guides: Record<string, Record<string, { action: string; detail: string; cost: string }>> = {
    cantilever: {
      crack: { action: 'Evaluate Crack Severity', detail: 'DFW clay soil causes coping movement. Hairline cracks (<1/4 inch): seal with polyurethane caulk, monitor. Wide cracks or heaving: full coping replacement needed. Get 2 quotes before committing.', cost: 'Seal: $200-500 | Replace: $3,000-6,000' },
      loose: { action: 'Re-Mortar or Replace', detail: 'DFW freeze-thaw cycles loosen cantilever bond. Re-mortaring works if the concrete substrate is intact. If 30%+ is loose, full replacement is more cost-effective.', cost: 'Re-mortar: $800-2,000 | Replace: $3,000-6,000' },
      upgrade: { action: 'Overlay with Travertine or Pavers', detail: 'Overlay cantilever with travertine or paver cap — avoids full demolition. Popular DFW upgrade 2024-2026. Adds $8-15K but lasts 30+ years and looks premium.', cost: '$8,000-15,000 overlay' },
      hot: { action: 'Apply Kool Deck or Upgrade to Travertine', detail: 'Standard gray cantilever reaches 130-160°F in DFW summer. Kool Deck coating cuts surface temp 30-40°F. Travertine stays naturally cool. Both are popular DFW solutions.', cost: 'Kool Deck: $1,500-3,000 | Travertine: $8,000-15,000' },
    },
    travertine: {
      crack: { action: 'Individual Piece Replacement', detail: 'Travertine cracks from DFW clay shift are usually isolated. Replace individual pieces — exact match is possible with standard travertine stock. Full replacement rarely needed.', cost: '$50-200/piece repair' },
      loose: { action: 'Re-Set with Polymer Mortar', detail: 'Travertine over DFW clay should use polymer-modified mortar. Standard mortar fails in 5-10 years. Re-setting loose pieces with polymer mortar is a permanent fix.', cost: '$500-2,000' },
      upgrade: { action: 'You Already Have the Premium Choice', detail: 'Travertine is the #1 premium coping choice in DFW. If upgrading, consider adding LED lighting strips under the coping lip for nighttime ambiance.', cost: 'LED addition: $2,000-5,000' },
      hot: { action: 'Light Color Travertine Stays Cool', detail: 'Travertine is naturally one of the coolest coping materials. Ensure you have light-colored (ivory/beige) travertine — dark colors absorb heat. Hosing down before swim helps.', cost: 'Already optimal material' },
    },
    brick: {
      crack: { action: 'Repoint Mortar Joints', detail: 'DFW brick coping cracks are usually in the mortar joints, not the brick. Repointing (tuckpointing) restores watertight seal and structural integrity. Full replacement rarely needed.', cost: 'Repoint: $800-2,500' },
      loose: { action: 'Reset Brick with Polymer Mortar', detail: 'Loose DFW brick coping is typically a mortar bond failure due to clay movement. Reset with polymer-modified Type S mortar. Check and fix substrate if needed.', cost: '$1,000-3,000' },
      upgrade: { action: 'Overlay with Travertine Caps', detail: 'Cap existing brick with travertine or flagstone overlay. More economical than full removal and gives a modern look. Popular DFW pool renovation 2024-2026.', cost: '$4,000-8,000' },
      hot: { action: 'Paint or Overlay', detail: 'Brick absorbs heat similarly to concrete. Light-colored brick paint reduces heat. Travertine overlay is a permanent cool-to-touch upgrade.', cost: 'Paint: $400-800 | Overlay: $4,000-8,000' },
    },
    tile: {
      crack: { action: 'Replace Cracked Tiles', detail: 'Bullnose tile cracks from DFW freeze events (yes, DFW gets freezes). Replace individual tiles. Keep 10-15% extra tiles from original install for future repairs.', cost: '$20-80/tile + labor' },
      loose: { action: 'Re-Bond with Epoxy Grout', detail: 'Loose tile coping = failed grout or adhesive. Chip out old grout, re-set with pool-grade epoxy mortar and grout. Do NOT use regular ceramic tile adhesive in DFW heat.', cost: '$600-2,000' },
      upgrade: { action: 'Iridescent or Glass Tile Upgrade', detail: 'Upgrade to 6x6 iridescent glass tile or 3D mosaic coping. DFW luxury trend 2025-2026. Pairs beautifully with LED lighting and Pebble Fina plaster.', cost: '$6,000-12,000' },
      hot: { action: 'Ceramic/Porcelain Tile Stays Cooler', detail: 'Tile coping is already one of the cooler options. Ensure light color. Hose tile before walking on hot DFW summer days — evaporative cooling helps immediately.', cost: 'No change needed' },
    },
  };

  const rec = copingType && concern ? guides[copingType]?.[concern] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪨 DFW Pool Coping Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW clay soil causes more coping damage than any other factor. Cantilever coping is standard in most DFW pools. Travertine is the premium upgrade. Select your coping type and concern for a tailored guide.</p>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Coping Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
          {types.map(t => (
            <button key={t.id} onClick={() => setCopingType(t.id)} style={{ background: copingType === t.id ? '#F5E642' : '#1e2d45', color: copingType === t.id ? '#0A1628' : '#fff', border: '2px solid' + (copingType === t.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>{t.label}</button>
          ))}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642' }}>Your Concern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setConcern(c.id)} style={{ background: concern === c.id ? '#F5E642' : '#1e2d45', color: concern === c.id ? '#0A1628' : '#fff', border: '2px solid' + (concern === c.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>{c.label}</button>
          ))}
        </div>
        {rec && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED ACTION</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>✅ {rec.action}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>{rec.detail}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', display: 'inline-block', color: '#F5E642', fontWeight: 700 }}>💰 {rec.cost}</div>
          </div>
        )}
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
