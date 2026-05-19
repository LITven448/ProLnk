import { useState } from 'react';

const concerns = [
  { id: 'hail', label: '🌨️ Recent Hail Event', action: 'Document everything with timestamped photos within 24 hours. Check gutters, downspouts, AC unit fins, and window screens for damage — these confirm hail size. File insurance claim before the 30-day window closes.' },
  { id: 'inspection', label: '🔍 Roof Inspection Timing', action: 'NEVER walk your roof between noon and 7 PM in June through August. Shingles reach 160–180°F and will compress underfoot, voiding manufacturer warranty. Schedule inspections before 9 AM only.' },
  { id: 'boots', label: '🔩 Pipe Boot Replacement', action: 'Rubber pipe boots (around plumbing vents) degrade in DFW heat. If yours are 10+ years old, replace before July. Failed boots are the #1 cause of hidden attic leaks in summer storms.' },
  { id: 'bookings', label: '📅 Pro Availability', action: 'ProLnk Charter roofers book up fast after hail events. June is the single busiest month. If you suspect damage, request a ProLnk inspection today — waitlist fills within 48 hours of major storms.' },
  { id: 'attic', label: '🌡️ Attic Heat Check', action: 'Attic temps in June can exceed 150°F. Ensure you have proper ridge and soffit ventilation. Inadequate ventilation accelerates shingle aging by 3–5 years. Add attic fan if temp exceeds 130°F.' },
];

export default function DFWRoofingJuneSafetyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW ROOFING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW June Roofing Safety Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          June in DFW combines peak hail season with extreme heat — a dangerous mix for roofs. Know when to inspect, when to call a pro, and what to document.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🌨️', label: 'Hail Season', val: 'Active' },
            { icon: '🌡️', label: 'Shingle Temp', val: '160–180°F' },
            { icon: '⏰', label: 'Safe Inspection', val: 'Before 9 AM' },
            { icon: '🔩', label: 'Boot Replace If', val: '10+ years' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Select Your June Roofing Concern</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642′ : '#111f38',
                color: selected === c.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>ACTION GUIDE</div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{concerns.find(c => c.id === selected)?.action}</p>
          </div>
        )}

        <div style={{ background: '#111f38', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>⚠️ JUNE SAFETY RULE</div>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
            Walking a hot roof in June is a safety and warranty risk. If you suspect damage after a storm, call a ProLnk Charter roofer for a free visual inspection from the ground using binoculars and a drone.
          </p>
        </div>
      </div>
    </div>
  );
}