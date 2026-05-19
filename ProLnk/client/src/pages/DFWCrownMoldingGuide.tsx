import { useState } from 'react';

const roomTypes = ['Living Room / Great Room', 'Master Bedroom', 'Kitchen / Dining', 'Home Office', 'Hallway'];
const dfwConcerns = ['Seasonal gaps at seams', 'Humidity swelling', 'Paint adhesion issues', 'Corners cracking', 'New installation planning'];

function getCrownAssessment(room: string, concern: string) {
  if (concern.includes('gaps at seams')) return {
    cause: 'DFW Winter Dry Season (10–25% humidity)',
    fix: 'Paintable latex caulk in gaps — do NOT use silicone (won\’t take paint)',
    prevention: 'Install in fall when humidity is stable; leave 1/16″ gap at coped joints',
    finish: 'Satin or semi-gloss — wipes clean, shows gaps less than flat',
    color: '#F5A623'
  };
  if (concern.includes('Humidity swelling')) return {
    cause: 'MDF crown absorbing DFW summer humidity (70–85% RH)',
    fix: 'Prime all 6 sides of MDF before installation — unprimed MDF swells irreversibly',
    prevention: 'Use solid wood or finger-jointed pine in high-humidity DFW rooms',
    finish: 'Oil-based primer + latex topcoat — creates moisture barrier',
    color: '#F5A623'
  };
  if (concern.includes('New installation')) return {
    cause: 'Planning phase',
    fix: 'For DFW open floor plans: use 3.5″–5.5″ crown. Larger rooms need taller profile.',
    prevention: 'Glue + nail gun combo — DFW humidity causes nail-only crown to loosen',
    finish: 'Satin finish standard for DFW open floor plans — elegant without glare',
    color: '#22C55E'
  };
  return {
    cause: 'General wear or settling',
    fix: 'Inspect joints at corners — DFW thermal expansion causes miter gaps over time',
    prevention: 'Annual caulk touch-up before winter dry season prevents major splits',
    finish: 'Match existing finish — spot prime before touch-up painting',
    color: '#22C55E'
  };
}

export default function DFWCrownMoldingGuide() {
  const [room, setRoom] = useState('');
  const [concern, setConcern] = useState('');
  const result = room && concern ? getCrownAssessment(room, concern) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>
          🏠 DFW INTERIOR GUIDE
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          Crown Molding Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
          Crown molding elevates DFW open floor plans — but DFW's climate swings from 10% winter humidity
          to 85% summer humidity, making gaps at seams the most common complaint. Know how to install and maintain it right.
        </p>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>❄️ DFW Climate Impact on Crown Molding</h2>
          <ul style={{ color: '#CBD5E1', fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', margin: 0 }}>
            <li>DFW winter: 10–25% relative humidity — wood and MDF shrink, gaps open at corners</li>
            <li>DFW summer: 70–85% RH — MDF swells, paint peels if not properly primed</li>
            <li>Gap at coped joints in winter is NORMAL in DFW — not a sign of bad installation</li>
            <li>Open floor plans with 10+ ft ceilings need 4.5"–6″ crown to look proportional</li>
            <li>Finger-jointed pine is most stable for DFW humidity cycles — knot-free and takes paint well</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>🔧 Installation Tips for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: '📐', label: 'Spring or Fall Install', desc: 'Install when DFW humidity is 40–55% — reduces seasonal movement at joints' },
              { icon: '🔫', label: 'Glue + Nail Combo', desc: 'Construction adhesive + 15-gauge nails — DFW humidity makes nail-only joints fail' },
              { icon: '✂️', label: 'Cope Inside Corners', desc: 'Coped joints handle DFW expansion better than miters — miter only outside corners' },
              { icon: '🎨', label: 'Prime Before Paint', desc: 'All 6 sides primed — especially back face against wall for MDF in DFW rooms' },
            ].map(({ icon, label, desc }) => (
              <div key={label} style={{ background: '#162035', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🛠️ DFW Crown Molding Assessment Tool</h2>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Room Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {roomTypes.map(r => (
                <button key={r} onClick={() => setRoom(r)} style={{
                  background: room === r ? '#F5E642′ : '#162035', color: room === r ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: room === r ? 700 : 400
                }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ color: '#CBD5E1', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Concern</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {dfwConcerns.map(c => (
                <button key={c} onClick={() => setConcern(c)} style={{
                  background: concern === c ? '#F5E642′ : '#162035', color: concern === c ? '#0A1628' : '#CBD5E1',
                  border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '13px', cursor: 'pointer', fontWeight: concern === c ? 700 : 400
                }}>{c}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '10px', padding: '18px', borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: '#CBD5E1', fontSize: '13px', marginBottom: '6px' }}>Root cause: <span style={{ color: '#F5E642′ }}>{result.cause}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Fix: <span style={{ color: '#FFFFFF' }}>{result.fix}</span></div>
              <div style={{ color: '#CBD5E1', fontSize: '14px', marginBottom: '6px' }}>Prevention: <span style={{ color: '#FFFFFF' }}>{result.prevention}</span></div>
              <div style={{ color: '#94A3B8', fontSize: '13px' }}>Recommended finish: <span style={{ color: '#F5E642′ }}>{result.finish}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#162035', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
          ProLnk • DFW Home Intelligence • Connecting homeowners with vetted local pros
        </div>
      </div>
    </div>
  );
}
