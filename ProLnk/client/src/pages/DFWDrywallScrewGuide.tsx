import { useState } from 'react';

const screwData: Record<string, Record<string, { type: string; length: string; technique: string }>> = {
  '1/2': {
    'Single layer to wood stud': { type: 'Coarse thread #6', length: '1-1/4"', technique: 'Drive until dimpled — paper intact. DFW humidity causes wood movement; check for pops after first summer.' },
    'Single layer to metal stud': { type: 'Fine thread #6', length: '1"', technique: 'Fine thread bites metal without stripping. Set flush-to-dimpled only.' },
    'Double layer': { type: 'Coarse thread #6', length: '1-5/8"', technique: 'Must penetrate base layer. DFW AC cycling causes expansion — expect minor pops year 1.' },
  },
  '5/8': {
    'Single layer to wood stud': { type: 'Coarse thread #6', length: '1-5/8"', technique: 'Standard for ceilings and fire-rated walls. Dimple carefully — 5/8 paper tears easier.' },
    'Single layer to metal stud': { type: 'Fine thread #6', length: '1-1/4"', technique: 'Fine thread required for metal. DFW commercial builds use 5/8 + metal almost exclusively.' },
    'Double layer': { type: 'Coarse thread #6', length: '2"', technique: 'Two full layers — screw must reach stud. Check torque: DFW humidity swells wood, don\’t over-drive.' },
  },
};

export default function DFWDrywallScrewGuide() {
  const [thickness, setThickness] = useState('');
  const [application, setApplication] = useState('');
  const result = thickness && application ? screwData[thickness]?.[application] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔩 DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Drywall Screw Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Coarse vs fine thread, correct length by application, and how DFW humidity affects screw performance.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚙️ Coarse Thread</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>Wood studs and joists</li>
              <li>Better grip in soft wood</li>
              <li>Wider thread spacing</li>
              <li>Most common for residential DFW</li>
            </ul>
          </div>
          <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>🔧 Fine Thread</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.7 }}>
              <li>Metal studs and tracks</li>
              <li>Prevents stripping in steel</li>
              <li>Tighter thread spacing</li>
              <li>Required for DFW commercial builds</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>☀️ DFW Climate Note: Screw Pops</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            DFW's extreme humidity swings — 90%+ summers, dry winters — cause wood studs to expand and contract. 
            Screw pops in year 1–2 are normal. Drive screws to a dimple (paper intact, not torn). Over-driven screws lose 
            holding power and pop faster. Re-set pops with a second screw 2" away, then skim coat.
          </p>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642' }}>🎯 DFW Screw Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Drywall Thickness</label>
              <select value={thickness} onChange={e => setThickness(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select thickness</option>
                <option value="1/2">1/2" (standard)</option>
                <option value="5/8">5/8" (fire-rated / ceiling)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select application</option>
                <option value="Single layer to wood stud">Single layer to wood stud</option>
                <option value="Single layer to metal stud">Single layer to metal stud</option>
                <option value="Double layer">Double layer</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>Screw Type:</span> <span style={{ color: '#fff' }}>{result.type}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>Length:</span> <span style={{ color: '#fff' }}>{result.length}</span></div>
              <div><span style={{ color: '#F5E642' }}>DFW Technique:</span> <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.technique}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📋 Setting Technique</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Use a dimpler bit. Drive until the screw head creates a slight dimple in the drywall surface — the paper must stay intact. 
            Breaking the paper removes 60% of holding strength. Space screws 12" on ceilings, 16" on walls. 
            DFW pros: pre-drive a test screw to dial in your drill clutch before a full sheet.
          </p>
        </div>
      </div>
    </div>
  );
}
