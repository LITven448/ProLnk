import { useState } from 'react';

export default function DFWRoofingPostStormCheck2026() {
  const [severity, setSeverity] = useState('');
  const [findings, setFindings] = useState('');
  const [action, setAction] = useState('');

  const guide: Record<string, Record<string, string>> = {
    light: {
      none: 'Light storm, no visible damage — document with dated photos anyway. Check gutters for granule accumulation. Even minor storms accelerate shingle aging in DFW heat.',
      granules: 'Granules in gutters after a light storm signal shingle aging, not storm damage. Note the volume — a cup or more per downspout means shingles are nearing end of life. Plan inspection in 6 months.',
      shingles: 'Lifted shingles after a light storm means poor fastening or aged shingles. Document with photos and timestamps. Call ProLnk — this qualifies for inspection and likely repair before next storm season.',
    },
    moderate: {
      none: 'No visible damage after moderate storm — still check attic for any light penetration. Confirm gutters are clear and draining. Document roof condition photos for insurance baseline.',
      granules: 'Handful+ of granules in gutters after moderate storm = insurance claim territory. Call ProLnk before calling insurance — get a professional damage assessment first. Document everything with timestamps.',
      shingles: 'Missing or lifted shingles after moderate storm is a claim-eligible event. Tarp any exposed areas immediately to prevent interior damage. Call ProLnk today for emergency inspection.',
    },
    severe: {
      none: 'Severe storm with no visible damage is possible — but check soft metals (gutters, AC condenser fins, vents). Hail dents metal even when shingles look intact. Soft metal damage = hail event = claim.',
      granules: 'Severe storm + granule loss = file a claim. Call ProLnk first for documented professional assessment — adjusters often undercount damage without contractor guidance. Act within 30 days of storm.',
      shingles: 'Severe storm + shingle damage = emergency situation. Document everything now. Tarp immediately. Call ProLnk for emergency board-up or tarp service. File insurance claim same day. Delay risks interior damage and claim denial.',
    },
  };

  function assess() {
    if (!severity || !findings) return;
    setAction(guide[severity]?.[findings] || 'Select both options for your post-storm action guide.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>⛈️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Post-Storm Inspection 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>What to check immediately after any DFW storm — and when to call ProLnk</p>

        {[
          { step: '1', emoji: '🔭', title: 'Drive-by roof check', detail: 'Binoculars from the street — look for lifted, missing, or creased shingles' },
          { step: '2', emoji: '🪣', title: 'Check gutters for granules', detail: 'A handful per downspout = shingle wear; claim territory after hail' },
          { step: '3', emoji: '🌬️', title: 'Inspect soft metals', detail: 'AC condenser fins, gutters, ridge vents — hail dents these even if shingles look fine' },
          { step: '4', emoji: '📸', title: 'Document with timestamps', detail: 'Photos must be taken same day for insurance claims — do not delay' },
          { step: '5', emoji: '📞', title: 'Call ProLnk if hail likely', detail: 'Professional assessment before calling insurer — contractors catch what adjusters miss' },
        ].map((item) => (
          <div key={item.step} style={{ background: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.step}</div>
            <div>
              <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 600 }}>{item.emoji} {item.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{item.detail}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🌩️ Storm Severity + Findings → Action Guide</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Storm severity</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select severity</option>
              <option value="light">Light (wind/rain only)</option>
              <option value="moderate">Moderate (hail possible)</option>
              <option value="severe">Severe (confirmed hail/high wind)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Primary finding</label>
            <select value={findings} onChange={(e) => setFindings(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select finding</option>
              <option value="none">No visible damage</option>
              <option value="granules">Granules in gutters</option>
              <option value="shingles">Missing or lifted shingles</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Action Guide
          </button>
          {action && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{action}</div>}
        </div>
      </div>
    </div>
  );
}