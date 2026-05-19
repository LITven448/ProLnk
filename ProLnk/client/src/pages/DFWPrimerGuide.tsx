import { useState } from 'react';

const primerData: Record<string, Record<string, { primerType: string; coats: string; notes: string }>> = {
  'New drywall': {
    'Interior': { primerType: 'Drywall PVA primer', coats: '1 coat required', notes: 'PVA seals drywall paper so finish paint absorbs evenly. Skipping primer causes "flashing" — uneven sheen visible in raking light. DFW: apply at <90°F, primer dries too fast in DFW summer heat.' },
    'DFW exterior': { primerType: 'Exterior acrylic primer + UV blocker', coats: '2 coats required', notes: 'DFW UV is intense — exterior surfaces degrade fast without UV-blocking primer. Apply in early morning, not midday. DFW summer temps can blister exterior primer applied above 95°F.' },
  },
  'Stain or smoke damage': {
    'Interior': { primerType: 'Oil-based stain-blocking primer (Zinsser BIN or Kilz)', coats: '2 coats', notes: 'Water-based primers don\’t block smoke and nicotine. Oil-based seals odors. DFW tip: ventilate well — fumes accumulate fast in tight DFW homes. Allow 48h dry before topcoat.' },
    'DFW exterior': { primerType: 'Shellac-based primer', coats: '1–2 coats', notes: 'For exterior stains (rust, wood tannin bleed). In DFW summer, shellac dries in 45 min — fast recoat. Follow with exterior topcoat same day if temps allow.' },
  },
  'Dark to light color': {
    'Interior': { primerType: 'Tinted gray primer (tinted to mid-point of final color)', coats: '1 coat primer + 2 finish', notes: 'Hiding dark colors requires more coats. DFW painters tint primer to 50% of final color — saves 1–2 finish coats. Skip tinting and you may need 4 finish coats.' },
    'DFW exterior': { primerType: 'Tinted exterior primer', coats: '2 coats primer + 2 finish', notes: 'DFW exterior color changes: dark reds and greens are hardest to cover. Tint primer heavily. DFW sun fades colors 30% faster than northern climates — choose fade-resistant topcoat.' },
  },
  'Previously painted surface': {
    'Interior': { primerType: 'Bonding primer (if glossy) or none (if flat)', coats: '1 coat if needed', notes: 'Glossy surfaces need bonding primer or light scuff sand. Flat-to-flat repaint can skip primer. DFW tip: test a patch — if new paint "crawls" on old surface, prime first.' },
    'DFW exterior': { primerType: 'Exterior bonding primer', coats: '1 coat minimum', notes: 'DFW exterior repaints always need primer — UV and heat chalking creates a weak surface. Clean chalking with TSP first, then prime. Skipping causes peeling within 1–2 DFW summers.' },
  },
};

export default function DFWPrimerGuide() {
  const [situation, setSituation] = useState('');
  const [conditions, setConditions] = useState('');
  const result = situation && conditions ? primerData[situation]?.[conditions] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🎨 DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Paint Primer Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>When to use primer, which type, and why DFW's UV and heat make primer even more critical than in other markets.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { rule: 'New drywall', note: 'Always prime — no exceptions', icon: '🏠' },
            { rule: 'Stain or smoke', note: 'Oil-based only — water-based fails', icon: '🚬' },
            { rule: 'Dark to light', note: 'Tint primer to mid-tone', icon: '🎨' },
            { rule: 'DFW exterior', note: 'UV primer required — intense sun', icon: '☀️' },
          ].map(r => (
            <div key={r.rule} style={{ background: '#0f2030', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{r.rule}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{r.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>☀️ DFW-Specific Primer Rules</div>
          <ul style={{ color: '#94a3b8', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
            <li>Never apply exterior primer when surface temp exceeds 95°F — blistering guaranteed</li>
            <li>Paint in early morning May–September; DFW surfaces hit 120°F+ by noon</li>
            <li>Drywall primer differs from wall paint — do not substitute regular paint as primer</li>
            <li>Interior primer still needed in DFW despite mild winters — humidity causes flash rusting on metal trim</li>
          </ul>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🎯 DFW Primer Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Painting Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select situation</option>
                <option value="New drywall">New drywall</option>
                <option value="Stain or smoke damage">Stain or smoke damage</option>
                <option value="Dark to light color">Dark to light color change</option>
                <option value="Previously painted surface">Previously painted surface</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Conditions</label>
              <select value={conditions} onChange={e => setConditions(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select location</option>
                <option value="Interior">Interior</option>
                <option value="DFW exterior">DFW exterior</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Primer Type:</span> <span style={{ color: '#fff' }}>{result.primerType}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642′ }}>Coats:</span> <span style={{ color: '#fff' }}>{result.coats}</span></div>
              <div><span style={{ color: '#F5E642′ }}>DFW Notes:</span> <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.notes}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏆 Pro Tip: Drywall Primer vs Wall Paint</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Many DFW homeowners skip drywall PVA primer and go straight to finish paint on new drywall. 
            Result: "flashing" — areas where joint compound and paper absorb paint differently, creating visible 
            sheen differences under natural light. Fix requires sanding and re-priming. Always use drywall PVA primer 
            on bare drywall — it costs $20 and saves a $300 repaint.
          </p>
        </div>
      </div>
    </div>
  );
}
