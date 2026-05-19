import { useState } from 'react';

const symptoms = [
  { id: 'active_leak', label: 'Active leak — water inside home right now', urgency: 'emergency', advice: 'Do NOT wait. Tarp the roof today or call an emergency roofer. Interior water damage compounds hourly.' },
  { id: 'hail_documented', label: 'Hail damage — storm just passed', urgency: 'urgent', advice: 'File your insurance claim within 30 days of the storm. Most DFW policies have a 1-year window but adjusters book up fast after major events.' },
  { id: 'missing_shingles', label: 'Visually missing or lifted shingles', urgency: 'urgent', advice: 'Book within 2 weeks. Exposed decking in DFW summer heat degrades fast and will leak on the next rain.' },
  { id: 'aging_no_damage', label: 'Aging shingles (15+ years), no visible damage', urgency: 'low', advice: 'Schedule a spring inspection. No emergency, but plan replacement within 1–2 seasons before the next hail cycle.' },
  { id: 'granule_loss', label: 'Heavy granule loss in gutters', urgency: 'moderate', advice: 'Book within 30 days. Granule loss accelerates UV degradation. Get a roof health assessment.' },
  { id: 'sagging', label: 'Sagging or soft spots on roof deck', urgency: 'urgent', advice: 'Call this week. Soft spots indicate decking rot or structural damage. High collapse risk in DFW high-wind events.' },
  { id: 'flashing_gaps', label: 'Visible flashing gaps around chimney or vents', urgency: 'moderate', advice: 'Schedule within 30 days. Flashing failures are the #1 source of DFW attic leaks. Low cost to fix early.' },
];

const colors: Record<string, string> = { emergency: '#ef4444', urgent: '#f97316', moderate: '#eab308', low: '#22c55e' };
const labels: Record<string, string> = { emergency: '🚨 Emergency — Act Now', urgent: '⚠️ Urgent — Within 2 Weeks', moderate: '📅 Moderate — Within 30 Days', low: '✅ Low — Plan Next Season' };

export default function DFWRoofingOkToWait2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏚️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW Roofing: Is It OK to Wait? — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW's hail corridor and extreme heat make roofing timing decisions uniquely critical.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌩️ Why DFW Roofing Urgency Is Different</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            DFW sits in one of the nation's highest hail frequency corridors. After a hail event,
            insurance adjusters are booked solid within days. Temperatures above 95°F bake exposed
            decking within weeks. What might be a minor repair elsewhere becomes a full replacement
            if you wait one DFW summer.
          </p>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Select Your Symptom</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 8,
                  border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
                  background: selected === s.id ? '#0A1628′ : ’transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `4px solid ${colors[match.urgency]}` }}>
            <div style={{ color: colors[match.urgency], fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{labels[match.urgency]}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{match.advice}</p>
          </div>
        )}

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Roofing Rules at a Glance</h2>
          {[
            ['Never wait', 'Active leak, sagging deck, missing shingles before rain'],
            ['File within 30 days', 'Documented hail damage — claim window closes'],
            ['Book within 30 days', 'Granule loss, flashing gaps, visible damage'],
            ['Plan next season', 'Aging roof with no active damage or leaks'],
          ].map(([timing, desc]) => (
            <div key={timing} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 160 }}>{timing}</span>
              <span style={{ color: '#94a3b8′ }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Get a DFW Roof Inspection</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>ProLnk connects you with HAAG-certified Charter roofers who document everything for your insurance file.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Book Inspection →
          </a>
        </div>
      </div>
    </div>
  );
}