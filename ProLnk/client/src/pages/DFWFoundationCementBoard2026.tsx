import { useState } from 'react';

export default function DFWFoundationCementBoard2026() {
  const [concern, setConcern] = useState('');
  const [guide, setGuide] = useState('');

  const guides: { [key: string]: string } = {
    forms: 'Board Forms and Modern Forming:\n\nTraditional DFW slab construction uses lumber board forms to contain concrete during the pour. These are removed after cure.\n\nModern stay-in-place forms such as insulated concrete forms remain embedded in the slab perimeter, providing thermal insulation and form function.\n\nIn DFW: most residential slabs use traditional removable forms. ICF is common in high-end custom builds.',
    gradebeam: 'Grade Beam Excavation in DFW Clay:\n\nDFW slabs require deeper grade beams than most US markets due to expansive clay. Standard grade beam depth: 18 to 24 inches in Tarrant and Dallas counties.\n\nDrilled piers extend 8 to 15 feet below grade in high-PI clay zones. This anchors the slab to stable soil below the active zone where clay movement occurs.\n\nRed flag: grade beams shallower than 18 inches in DFW clay — inadequate for local soil conditions.',
    vapor: 'Vapor Barrier Installation:\n\nA 6 to 10 mil polyethylene vapor barrier is installed directly on compacted soil before the concrete pour in DFW.\n\nPurpose: Prevents moisture migration up through slab from DFW clay, which retains significant moisture.\n\nInspect during construction: barrier should be continuous, overlapped at seams by 12 inches minimum, and free of punctures before concrete is poured.\n\nDFW building code requires vapor barrier for all new slab construction.',
    cure: 'Concrete Cure Time in DFW Heat:\n\nDFW summer heat over 100 degrees accelerates initial concrete set — but rapid cure reduces final strength.\n\nProper curing: Keep concrete moist for 7 days minimum after pour. In DFW summer, this means wet burlap, curing compound, or misting several times per day.\n\nRed flag: Contractor skips curing process in summer heat — surface cracking and reduced slab strength result.\n\nOptimal pour temperature: 50 to 85 degrees F. DFW foundation pours should be scheduled early morning in summer to avoid peak heat.',
  };

  function getGuide() {
    if (!concern) { setGuide('Select a concern to view construction guidance.'); return; }
    setGuide(guides[concern] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏗️ DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Slab Board Form and Construction Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW slab construction has unique requirements driven by expansive clay soil and extreme summer heat. Understanding board forms, grade beams, vapor barriers, and cure requirements helps homeowners and contractors build slabs that last.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔨 DFW Slab Construction Sequence</h2>
          {[
            ['1', 'Grade beam excavation', 'Dig grade beam trenches to proper depth for DFW clay conditions — 18 to 24 inches minimum'],
            ['2', 'Drilled piers', 'Install drilled piers if soil PI exceeds 40 — extends 8 to 15 feet to stable soil'],
            ['3', 'Compacted fill', 'Grade and compact fill soil to uniform density — prevents differential settlement'],
            ['4', 'Vapor barrier', '6 to 10 mil polyethylene sheet, continuous, overlapped 12 inches at seams'],
            ['5', 'Rebar or post-tension cables', 'Steel reinforcement per engineer spec — post-tension cable is common in DFW since 1980s'],
            ['6', 'Board forms set', 'Lumber forms or stay-in-place forms hold concrete at perimeter during pour'],
            ['7', 'Pour and finish', 'Early morning pour in DFW summer — curing begins immediately after finishing'],
          ].map(([n, title, desc]) => (
            <div key={n} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{n}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📖 Get Construction Guidance</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Foundation Construction Concern</label>
              <select
                value={concern}
                onChange={e => setConcern(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}
              >
                <option value="">Select topic...</option>
                <option value="forms">Board forms and modern forming systems</option>
                <option value="gradebeam">Grade beam excavation in DFW clay</option>
                <option value="vapor">Vapor barrier installation requirements</option>
                <option value="cure">Concrete cure time in DFW summer heat</option>
              </select>
            </div>
            <button
              onClick={getGuide}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Get Guidance
            </button>
            {guide && (
              <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {guide}
              </div>
            )}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' as const }}>
          ProLnk DFW Foundation Resource 2026
        </div>
      </div>
    </div>
  );
}
