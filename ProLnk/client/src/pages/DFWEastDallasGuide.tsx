import { useState } from 'react';

const homeDecades = [
  { label: '1920s-1940s (Craftsman / Bungalow)', value: 'pre1950′ },
  { label: '1950s-1960s (Mid-Century)', value: '1950s' },
  { label: '1970s-1980s (Transition Era)', value: '1970s' },
];
const renovationStatuses = [
  { label: 'Original / Minimally Updated', value: 'original' },
  { label: 'Partially Renovated', value: 'partial' },
  { label: 'Fully Renovated', value: 'full' },
];

const data: Record<string, Record<string, { issues: string[]; approaches: string[] }>> = {
  pre1950: {
    original: { issues: ['Original knob-and-tube or early wiring — insurance risk', 'Cast iron sewer lines — root intrusion common', 'Lead paint on all surfaces (disclosure required)', 'Balloon framing — no fire stops between floors', 'White Rock Lake proximity: basement moisture possible'], approaches: ['Lakewood Craftsman originals: high preservation value', 'Targeted update: $120-180K for systems only', 'Full gut: $200-350K — Lakewood area supports $700K+ post-reno', 'Historic character (built-ins, hardwoods, trim) is your asset'] },
    partial: { issues: ['Verify electrical was fully replaced — not just panel', 'Mixed plumbing materials at transition joints', 'Check for hidden moisture damage in walls'], approaches: ['Finish the systems work before cosmetics', 'Kitchen opens to living: most popular East Dallas reno', 'Retain original hardwoods — refinish rather than replace'] },
    full: { issues: ['Verify all permits pulled for structural changes', 'Confirm lead abatement documentation exists'], approaches: ['Fully renovated Craftsman in Lakewood: best ROI in Dallas', 'Outdoor/deck additions common — White Rock Lake lifestyle'] },
  },
  '1950s': {
    original: { issues: ['Galvanized supply lines (low pressure, corrosion)', 'Original 60A electrical (undersized for modern loads)', 'Asbestos floor tiles, duct insulation, roof shingles', 'Single-pane aluminum windows — heat gain', 'Flat or low-pitch roof sections common'], approaches: ['MCM aesthetic is premium right now — preserve if possible', 'Priority order: electrical → plumbing → HVAC → cosmetics', 'Terrazzo floors: restore, never replace ($8-15K value add)'] },
    partial: { issues: ['Check asbestos in all untouched areas before proceeding', 'Flat roof patches are temporary — full replacement likely needed'], approaches: ['MCM buyers pay premium for integrity — finish authentically', 'Clerestory windows, carports, open plans: emphasize these'] },
    full: { issues: ['Ensure flat roof replacement complete with proper drainage', 'Confirm asbestos abatement fully documented'], approaches: ['East Dallas MCM fully renovated: strong appreciation trajectory', 'Short-term rental near White Rock Lake: high demand'] },
  },
  '1970s': {
    original: { issues: ['Polybutylene plumbing (recall product — must replace)', 'Aluminum wiring in some homes (pigtailing required)', 'Original HVAC: well past service life', 'Textured ceilings may contain asbestos (pre-1979)', 'Builder-grade everything — deferred maintenance common'], approaches: ['These homes need full systems update: $80-140K budget', 'Open floor plan conversion is high ROI here', 'East Dallas location supports $350-500K post-reno values'] },
    partial: { issues: ['Verify polybutylene was fully removed, not just capped', 'Aluminum wiring remediation must cover entire home'], approaches: ['HVAC and electrical first — then cosmetics', 'Primary suite addition or conversion common in this era'] },
    full: { issues: ['Confirm polybutylene fully replaced throughout', 'Check permits for any structural wall removal'], approaches: ['Solid bones, fully updated: good price-per-sqft in East Dallas', 'EV charging and solar addition: growing buyer demand here'] },
  },
};

export default function DFWEastDallasGuide() {
  const [decade, setDecade] = useState('');
  const [status, setStatus] = useState('');
  const result = decade && status ? data[decade]?.[status] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌊 East Dallas Homeowner Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Lakewood, White Rock Lake, Junius Heights, and the M Streets — East Dallas is where Dallas's architectural character lives. Craftsman bungalows, mid-century moderns, and established urban lots define this area.</p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏠 Home Decade</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeDecades.map(d => (
              <button key={d.value} onClick={() => setDecade(d.value)} style={{ background: decade === d.value ? '#F5E642′ : '#1E2D45', color: decade === d.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{d.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔨 Renovation Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {renovationStatuses.map(r => (
              <button key={r.value} onClick={() => setStatus(r.value)} style={{ background: status === r.value ? '#F5E642′ : '#1E2D45', color: status === r.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{r.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚠️ Era-Specific Issues</div>
              {result.issues.map((item, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #F97316′ }}>{item}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏆 Popular Renovation Approaches</div>
              {result.approaches.map((item, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #22D3EE' }}>{item}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#111D30', borderRadius: 12, padding: 18, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>East Dallas contractors familiar with historic districts know how to protect original character. Ask for portfolio photos of comparable homes before hiring.
        </div>
      </div>
    </div>
  );
}
