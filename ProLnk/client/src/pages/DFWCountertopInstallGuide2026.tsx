import { useState } from 'react';

const timeline = [
  { phase: 'Measure & Template', duration: 'Day 1', detail: 'Fabricator visits your DFW home, templates your cabinets. Takes 30-60 minutes. Cabinets must be level and fully installed before this step.' },
  { phase: 'Fabrication', duration: '1-3 weeks', detail: 'Your slab is cut, edged, and polished at the fabrication shop. Quartz and granite typically take 1-2 weeks in DFW. Marble may take longer if special edge profiles are ordered.' },
  { phase: 'Installation Day', duration: 'Half to Full Day', detail: 'Installers bring templated pieces. Undermount sinks are installed same day. Old countertops are removed. Expect water to be off for 2-4 hours.' },
  { phase: 'Seam & Caulk Cure', duration: '24-48 hours', detail: 'Silicone caulk at sink and backsplash takes 24-48 hours to fully cure in DFW conditions. Avoid water contact with those areas until cured.' },
];

const installGuide: Record<string, { steps: string[]; tip: string }> = {
  Quartz: {
    steps: [
      'Clear cabinets completely 48 hours before install day',
      'Confirm cabinets are level (fabricator will check on template day)',
      'Plan for half-day water shutoff during sink reconnection',
      'Keep room between 65-80F for proper adhesive and silicone cure',
    ],
    tip: 'DFW summer heat can accelerate adhesive cure — if installing in July or August, ask your fabricator about temperature-sensitive adhesives used in high-heat conditions.',
  },
  Granite: {
    steps: [
      'Select your exact slab in person at a DFW showroom before scheduling',
      'Clear cabinets and remove backsplash tile if it is being replaced at the same time',
      'Plan seam placement before install day — review the seam map with your fabricator',
      'Budget for grout or caulk color match at the backsplash transition',
    ],
    tip: 'DFW granite is heavy — a typical kitchen install requires a 2-3 person crew. Confirm crew size when booking to avoid delays on install day.',
  },
  Marble: {
    steps: [
      'Request initial sealant application at the fabrication shop before delivery',
      'Protect your flooring with padding on install day — marble chips on impact',
      'Schedule your plumber for same-day undermount sink hookup',
      'Avoid placing anything on the countertop for 48 hours after install',
    ],
    tip: 'The first sealing should happen before marble leaves the fabrication shop. Ask your DFW fabricator to seal on-site during the final polishing step.',
  },
  'Butcher Block': {
    steps: [
      'Apply first coat of food-grade mineral oil 24 hours before install',
      'Confirm base cabinets can structurally support the added weight of solid wood',
      'Leave a small expansion gap at walls — wood expands with DFW summer humidity',
      'Do not caulk rigidly to the wall — use flexible silicone or leave a gap for movement',
    ],
    tip: 'DFW summer humidity causes wood to swell measurably. A rigid caulk bead against the wall will crack within a few months. Flexible silicone or a small expansion gap prevents this.',
  },
};

export default function DFWCountertopInstallGuide2026() {
  const [material, setMaterial] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏡 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>DFW Countertop Installation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          From template day to final caulk — here is exactly what to expect during a countertop installation in your DFW home.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: '1.25rem', marginBottom: '1rem' }}>DFW Installation Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {timeline.map((t, i) => (
            <div key={i} style={{ background: '#1a2744', borderRadius: 10, padding: '1.25rem', display: 'flex', gap: '1.25rem' }}>
              <div style={{ minWidth: 48, height: 48, borderRadius: '50%', background: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                  {t.phase} <span style={{ color: '#F5E642', fontWeight: 400, fontSize: '0.9rem' }}>({t.duration})</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{t.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📦', title: 'Clear Your Cabinets', body: 'Remove everything from cabinets below the countertop and the first shelf of upper cabinets. Vibration from the install can knock loose items off shelves.' },
            { icon: '🚿', title: 'Plan for Water Off', body: 'Water will be shut off for 2-4 hours during sink disconnection and reconnection. Coordinate with your DFW plumber in advance if a complex sink setup is involved.' },
            { icon: '📏', title: 'Backsplash Comes After', body: 'Install backsplash tile AFTER the countertop is in place. Tiling before countertop install is one of the most common DFW remodel sequencing mistakes.' },
            { icon: '🌡️', title: 'DFW Temperature Matters', body: 'Silicone and stone adhesives cure differently in extreme DFW summer heat. Keep the kitchen climate-controlled on install day for proper adhesion.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#1a2744', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.25rem', marginBottom: '1rem' }}>🎯 Your DFW Installation Day Checklist</h2>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>SELECT YOUR COUNTERTOP MATERIAL</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: '0.5rem', padding: '0.75rem', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d3f6b', fontSize: '1rem', marginBottom: '1rem' }}
          >
            <option value=''>— Select your material —</option>
            {Object.keys(installGuide).map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          {material && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Prep Checklist for {material} Install:</div>
              {installGuide[material].steps.map((s, i) => (
                <div key={i} style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.4rem' }}>☑️ {s}</div>
              ))}
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginTop: '0.75rem', fontWeight: 600 }}>
                DFW Pro Tip:{' '}
                <span style={{ color: '#94a3b8', fontWeight: 400 }}>{installGuide[material].tip}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem', background: '#1a2744', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>🔑 DFW Pro Tip: Grout Sealing on Tile Counters</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Tile countertops require grout sealing along all exposed edges after installation. In DFW hard water conditions, unsealed grout lines trap mineral deposits and discolor within weeks. Apply penetrating grout sealer within 48 hours of install completion.
          </div>
        </div>
      </div>
    </div>
  );
}
