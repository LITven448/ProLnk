import { useState } from 'react';

const conditions = [
  { label: 'Squeaks When Walking', value: 'squeak' },
  { label: 'Soft / Spongy Spots', value: 'soft' },
  { label: 'Visible Waviness / Humps', value: 'wave' },
  { label: 'New Flooring Install Planned', value: 'newfloor' },
];
const projects = [
  { label: 'Hardwood or LVP Installation', value: 'hardwood' },
  { label: 'Tile Installation', value: 'tile' },
  { label: 'Carpet Replacement', value: 'carpet' },
  { label: 'General Repair / No New Flooring', value: 'repair' },
];

const matrix: Record<string, Record<string, { verdict: string; action: string; cost: string; first: string }>> = {
  squeak: {
    hardwood: { verdict: 'Repair Before Installing', action: 'Screw subfloor to joists every 6"", add construction adhesive; squeaks will telegraph through hardwood', cost: '$300–$900 repair + flooring', first: 'Fix squeaks first — hardwood amplifies them' },
    tile: { verdict: 'Repair Required', action: 'Tile grout cracks if subfloor flexes; screw + add 1/4" cement board overlay', cost: '$500–$1,400', first: 'Subfloor must be rock solid for tile — no flex allowed' },
    carpet: { verdict: 'Repair Optional', action: 'Carpet and pad absorb minor squeaks; screw from above if bothersome', cost: '$150–$500', first: 'Carpet can go over minor squeaks; fix major ones first' },
    repair: { verdict: 'Targeted Repair', action: 'Locate joist, drive 2.5" screws at angle to pull subfloor tight', cost: '$200–$600', first: 'Fix squeak source before moisture makes it worse' },
  },
  soft: {
    hardwood: { verdict: 'Replace Section', action: 'Soft = moisture damage; replace affected OSB/plywood panels before installing hardwood', cost: '$600–$2,200', first: 'Find and fix moisture source before replacement' },
    tile: { verdict: 'Full Replacement Required', action: 'Soft subfloor will crack tile; replace panels + dry out structure', cost: '$800–$2,800', first: 'Moisture remediation must happen before any work' },
    carpet: { verdict: 'Replace Section', action: 'Soft spots indicate rot risk; replace panels before new carpet', cost: '$500–$1,800', first: 'Check joists below for rot while subfloor is open' },
    repair: { verdict: 'Replace Affected Panels', action: 'Cut out and replace damaged OSB; treat joists below if wet', cost: '$400–$1,500', first: 'Stop the moisture source or it will return' },
  },
  wave: {
    hardwood: { verdict: 'Level First', action: 'Float with floor leveler compound or sand high spots; waves show through hardwood', cost: '$400–$1,200 + flooring', first: 'Measure flatness with 6ft straightedge — 3/16" tolerance' },
    tile: { verdict: 'Level Required', action: 'Self-leveling compound over entire area; tile is unforgiving of subfloor variation', cost: '$600–$1,800', first: 'Achieve <1/8" variance per 10ft before tile' },
    carpet: { verdict: 'Repair Optional', action: 'Carpet hides minor waves; fill major dips with floor patch compound', cost: '$150–$600', first: 'Waves under carpet cause premature wear at peaks' },
    repair: { verdict: 'Sand or Fill', action: 'Sand high spots, fill low spots with patching compound', cost: '$300–$900', first: 'Find cause — likely joist crown or pier settlement' },
  },
  newfloor: {
    hardwood: { verdict: 'Assess and Repair', action: 'Walk every square foot; mark squeaks and soft spots; repair all before installation day', cost: '$300–$1,500', first: 'Subfloor condition determines flooring success' },
    tile: { verdict: 'Strict Inspection Required', action: 'Deflection test: tile fails if floor deflects >L/360 of span', cost: '$500–$2,000', first: 'Structural engineer opinion if questionable' },
    carpet: { verdict: 'Minor Repairs Only', action: 'Patch obvious damage; carpet tolerates most subfloor imperfections', cost: '$100–$500', first: 'Fix wet or rotted areas regardless of flooring type' },
    repair: { verdict: 'Document Condition', action: 'Photo every issue before closing up walls or flooring', cost: '$200–$800', first: 'Repair moisture damage before cosmetic repairs' },
  },
};

export default function DFWSubfloorGuide() {
  const [condition, setCondition] = useState('');
  const [project, setProject] = useState('');
  const result = condition && project ? matrix[condition]?.[project] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Subfloor Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>DFW's humidity swings — from 30% in summer drought to 80% during spring storms — put subfloor materials under constant stress. Know when to repair and when to replace before spending money on new flooring.</p>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🪵 OSB vs Plywood in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0F2040', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>OSB (Oriented Strand Board)</div>
              <ul style={{ color: '#C5CAD8', fontSize: 14, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Used in most DFW homes post-1990</li>
                <li>Swells at edges when wet — "telegraphs" at seams</li>
                <li>Cannot be sanded flat once swollen</li>
                <li>Lower cost to replace</li>
              </ul>
            </div>
            <div style={{ background: '#0F2040', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Plywood</div>
              <ul style={{ color: '#C5CAD8', fontSize: 14, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Standard in pre-1990 DFW homes</li>
                <li>Handles moisture cycles better</li>
                <li>Can be sanded and re-fastened</li>
                <li>Preferred under tile and hardwood</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>💧 How DFW Humidity Causes Subfloor Squeak</h2>
          <p style={{ color: '#C5CAD8', lineHeight: 1.7 }}>When humidity rises, subfloor panels expand slightly and lift off the joists. When it drops, they contract. The nails holding the subfloor loosen over repeated cycles. The result: subfloor panels rub against joist edges or nail shanks — creating squeaks that appear seasonally and move around the room.</p>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Repair vs Replace Advisor</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Current subfloor condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select condition…</option>
              {conditions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW project type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select project…</option>
              {projects.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Verdict: </span><span style={{ color: '#4ADE80', fontWeight: 600 }}>{result.verdict}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Action: </span><span style={{ color: '#C5CAD8' }}>{result.action}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Cost: </span><span style={{ color: '#4ADE80' }}>{result.cost}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Do This First: </span><span style={{ color: '#FACC15' }}>{result.first}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ This guide is educational. Subfloor replacement near load-bearing walls or in bathrooms should be inspected by a licensed contractor. Moisture source identification is critical before any subfloor repair in DFW.</p>
        </div>
      </div>
    </div>
  );
}
