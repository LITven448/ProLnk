import { useState } from 'react';

const YARD_SIZES = [
  { label: 'Small (<3,000 sqft)', base: 35 },
  { label: 'Medium (3-6k sqft)', base: 50 },
  { label: 'Large (6-10k sqft)', base: 70 },
  { label: 'XL (10k+ sqft)', base: 95 },
];
const FREQS = [
  { label: 'Weekly', visitsPerMonth: 4 },
  { label: 'Every 10 Days', visitsPerMonth: 3 },
  { label: 'Bi-Weekly', visitsPerMonth: 2 },
];
const LEVELS = [
  { label: 'Basic (mow + blow)', mult: 1 },
  { label: 'Standard (mow + edge + blow)', mult: 1.15 },
  { label: 'Full (mow + edge + blow + trim shrubs)', mult: 1.35 },
];

export default function DFWLawnMowingServiceGuide() {
  const [yi, setYi] = useState(1);
  const [fri, setFri] = useState(0);
  const [li, setLi] = useState(1);
  const perVisit = Math.round(YARD_SIZES[yi].base * LEVELS[li].mult);
  const monthly = Math.round(perVisit * FREQS[fri].visitsPerMonth);
  const season = FREQS[fri].visitsPerMonth >= 3 ? 'Apr-Oct weekly, Nov-Dec biweekly, Jan-Mar skip' : 'Apr-Nov biweekly sufficient, skip Jan-Mar';
  const btn = (active: boolean) => ({ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642' : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Lawn Mowing Service in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW grows Bermuda and St. Augustine grass that explodes April through October. Understanding the DFW mowing season prevents you from overpaying year-round or getting an overgrown lawn in July.</p>

        {[
          { icon: '📅', title: 'DFW Mowing Season', body: 'Active mowing: April through November. Weekly in summer (May-Sep) when Bermuda grows 1-2 inches per week. Bi-weekly in spring and fall. January through March: most DFW lawns are dormant — skip unless you have winter rye overseeded.' },
          { icon: '✅', title: 'What Should Always Be Included', body: 'A proper lawn service includes: mow at correct height for your grass type, edge along driveway and beds, blow clippings off hardscape, string trim around obstacles. Ask explicitly — some budget services mow only.' },
          { icon: '🏘️', title: 'Finding Reliable Service in Your DFW Suburb', body: 'Reliability varies dramatically by suburb. Frisco, McKinney, and Prosper have high crew turnover. Find a local owner-operator rather than a franchise for consistent service. Always get a contract locking your rate through October.' },
          { icon: '💡', title: 'Cost Factors in DFW', body: 'Bermuda lawns need sharper blades and more passes than St. Augustine. HOA-mandated edge lines add time. Corner lots and slopes cost more. Get 3 quotes and ask what is included before comparing prices.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🌿 Lawn Service Cost Estimator</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>YARD SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {YARD_SIZES.map((y, i) => <button key={i} onClick={() => setYi(i)} style={btn(yi === i)}>{y.label}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>MOWING FREQUENCY</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FREQS.map((f, i) => <button key={i} onClick={() => setFri(i)} style={btn(fri === i)}>{f.label}</button>)}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 8 }}>📆 Recommended schedule: {season}</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>SERVICE LEVEL</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {LEVELS.map((l, i) => <button key={i} onClick={() => setLi(i)} style={btn(li === i)}>{l.label}</button>)}
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Est. visits this month</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{FREQS[fri].visitsPerMonth} visits @ ${perVisit}/visit</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Monthly total</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${monthly}/mo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
