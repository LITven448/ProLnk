import { useState } from 'react';

const urgencyOptions: Record<string, { label: string; timeline: string; phases: { step: string; duration: string; note: string }[]; tips: string[] }> = {
  emergency: {
    label: '🚨 Emergency (AC/Heat Failed)',
    timeline: '1–3 days if equipment available',
    phases: [
      { step: 'Diagnostic Call', duration: 'Same day', note: 'DFW HVAC companies prioritize no-AC calls June–Sept. Expect 4–8 hour windows.' },
      { step: 'Equipment Check', duration: 'Hours to 1 day', note: 'Carrier, Trane, Lennox stock varies. Mini-splits often available same day from DFW distributors.' },
      { step: 'Permit Pull', duration: '1–2 days', note: 'Most DFW cities allow same-day emergency permits. Confirm with your contractor.' },
      { step: 'Installation', duration: '4–8 hours', note: 'Full system swap by a 2-person crew. Requires city inspection after.' },
      { step: 'City Inspection', duration: '1–3 days', note: 'Dallas/Fort Worth: often next-day. Suburbs may take 2–3 days.' },
    ],
    tips: ['Ask for a temporary window unit while parts are ordered', 'DFW summer (June–Sept) adds 3–7 days to any timeline', 'Get a load calculation even in emergencies — wrong-sized units fail faster'],
  },
  planned: {
    label: '📅 Planned Replacement',
    timeline: '1–2 weeks from first call',
    phases: [
      { step: 'Load Calculation (Manual J)', duration: '1–2 hours', note: 'REQUIRED in DFW before sizing a new system. Skipping this causes oversized units that short-cycle.' },
      { step: 'Quote & Equipment Selection', duration: '2–5 days', note: 'Get quotes from 3 contractors. DFW brands: Trane (local distributor in Irving), Carrier, Daikin.' },
      { step: 'Equipment Order', duration: '3–7 days', note: 'Standard efficiency units typically in stock. High-efficiency or variable speed: 5–14 days.' },
      { step: 'Installation Day', duration: '4–8 hours', note: 'Planned replacement is cleaner — full duct inspection included. Request attic insulation check.' },
      { step: 'City Inspection', duration: '1–3 days', note: 'Permit inspection required. Most DFW HVAC companies handle permit filing for you.' },
    ],
    tips: ['Spring (March–May) is the best time to replace — shortest wait, best contractor attention', 'Ask for duct leakage test — DFW homes often lose 20–30% of air to leaky ducts', 'SEER2 ratings now required in Texas — 14 SEER2 minimum for new installs'],
  },
};

export default function DFWHVACReplacementTimeline() {
  const [urgency, setUrgency] = useState('');
  const selected = urgency ? urgencyOptions[urgency] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>❄️ DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW HVAC Replacement Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>Emergency vs planned replacement timelines, DFW equipment availability, and how to speed things up in a Texas summer.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🌡️ What's Your Situation?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {Object.entries(urgencyOptions).map(([key, val]) => (
              <button key={key} onClick={() => setUrgency(key)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${urgency === key ? '#F5E642' : '#1E3050'}`, background: urgency === key ? '#F5E642' : 'transparent', color: urgency === key ? '#0A1628' : '#9BAEC8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>{val.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Expected Timeline: </span>
              <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{selected.timeline}</span>
            </div>
          )}
        </div>

        {selected && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {selected.phases.map((p, i) => (
                <div key={i} style={{ background: '#111E35', borderRadius: 10, padding: 18, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{p.duration}</span>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.step}</span>
                  </div>
                  <p style={{ margin: 0, color: '#9BAEC8', fontSize: 14 }}>{p.note}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>💡 DFW Pro Tips</h3>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
                {selected.tips.map((t, i) => <li key={i} style={{ marginBottom: 8 }}>{t}</li>)}
              </ul>
            </div>
          </>
        )}

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with a vetted DFW HVAC contractor — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
