import { useState } from 'react';

export default function DFWHVACEvapCoilDrain2026() {
  const [concern, setConcern] = useState('');
  const [guide, setGuide] = useState('');

  const guides: { [key: string]: string } = {
    backup: 'Primary Drain Backup Protection:\n\n1. Locate your primary condensate drain line — PVC pipe exiting near air handler, typically routed to utility sink or exterior\n2. Inspect for algae buildup — DFW humidity breeds algae in condensate lines every 30 to 60 days\n3. Flush monthly: pour 1/4 cup diluted bleach into the drain access port near the air handler\n4. Check that the drain exits freely and is not blocked by mud, insects, or debris\n5. If backing up, use a wet-vac on the exterior drain outlet to clear the clog',
    float: 'Float Switch Testing:\n\n1. Locate float switch — typically mounted in the secondary condensate pan under the air handler\n2. Float switch shuts off HVAC if primary drain fails and pan begins filling\n3. Test by pouring 1 cup of water into the secondary pan — HVAC should shut off within 30 seconds\n4. If HVAC does not shut off, float switch has failed — replace immediately\n5. Float switch failure in DFW summer means water damage risk within hours if primary drain clogs\n6. Cost to replace float switch: $75 to $150. Far less than water damage remediation.',
    pan: 'Secondary Pan Inspection:\n\n1. Inspect the secondary drain pan under air handler for standing water\n2. Standing water means primary drain is already clogged — address immediately\n3. Check for rust, cracks, or deterioration in pan — replace if compromised\n4. Ensure secondary pan drain line is clear — this is your last line of defense\n5. In DFW attic installs, confirm secondary drain exits through a visible drip spot on exterior so you can detect overflow early',
    routine: 'Monthly Condensate Maintenance:\n\n1. Flush primary drain with 1/4 cup diluted bleach solution monthly during cooling season\n2. Inspect drain line access port cap — ensure it seals properly between flushes\n3. Check secondary pan visually for any water accumulation\n4. Confirm float switch test quarterly — pour water in pan, verify HVAC shutoff\n5. DFW HVAC units run 2,000 or more hours per summer — monthly maintenance prevents thousands in water damage',
  };

  function getGuide() {
    if (!concern) { setGuide('Select a concern to view your protection guide.'); return; }
    setGuide(guides[concern] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💧 DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Evaporator Coil Drain Safety Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW HVAC systems remove enormous amounts of humidity in summer. A clogged condensate drain line can cause water damage within hours. This guide covers primary drain inspection, secondary pan safety, and float switch protection.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔄 How the Condensate System Works</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['❄️', 'Evaporator coil cools air by absorbing heat', 'Warm humid DFW air condenses on cold coil — up to 5 gallons of water per day in peak summer'],
              ['📦', 'Primary drain pan collects condensate', 'Water flows into primary PVC drain line routed to exterior or utility drain'],
              ['⚠️', 'Secondary pan catches overflow', 'If primary drain clogs water fills secondary pan — float switch should cut off HVAC'],
              ['🔌', 'Float switch is the safety shutoff', 'Cuts power to HVAC when secondary pan fills — prevents ceiling and drywall water damage'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🛡️ Get Your Protection Guide</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Select Your Condensate Safety Concern</label>
              <select
                value={concern}
                onChange={e => setConcern(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}
              >
                <option value="">Select concern...</option>
                <option value="backup">Primary drain line backing up</option>
                <option value="float">Float switch — want to test it</option>
                <option value="pan">Water in secondary drain pan</option>
                <option value="routine">Routine monthly maintenance</option>
              </select>
            </div>
            <button
              onClick={getGuide}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Get Protection Guide
            </button>
            {guide && (
              <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {guide}
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>⚡ DFW Rule of Thumb</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>DFW HVAC units run more hours per year than almost any US market. Flush your condensate line every 30 days during cooling season — a $5 bottle of bleach prevents thousands in water damage.</div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' as const }}>
          ProLnk DFW HVAC Resource 2026
        </div>
      </div>
    </div>
  );
}
