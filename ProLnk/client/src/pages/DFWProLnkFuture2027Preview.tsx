import { useState } from 'react';

const featureTypes = [
  { id: 'predictive', label: '🤖 Predictive Maintenance', desc: 'AI failure alerts before breakdowns' },
  { id: 'visual', label: '📸 Visual Assessment', desc: 'Photo to AI diagnosis to Pro match' },
  { id: 'insurance', label: '🛡️ Insurance Integration', desc: 'Claim filing + contractor in one step' },
  { id: 'expansion', label: '🗺️ Geographic Expansion', desc: 'Houston, Austin, and beyond' },
];

const previews: Record<string, { title: string; launch: string; desc: string; features: string[]; impact: string }> = {
  predictive: {
    title: 'Predictive Maintenance Alerts',
    launch: 'Q2 2027',
    desc: 'ProLnk AI learns your home's equipment age, brand, and service history — then predicts failure windows before they happen.',
    features: [
      'HVAC failure prediction: 30-day warning before likely breakdown',
      'Water heater lifespan modeling based on age and water hardness',
      'Roof inspection triggers after major DFW hail events',
      'Seasonal pre-booking suggestions pushed to your app',
      'Integrated with ProLnk Vault history for accuracy',
    ],
    impact: 'Early adopters in beta saved an avg of $4,200 in emergency repair costs.',
  },
  visual: {
    title: 'Instant Video Assessment',
    launch: 'Q3 2027',
    desc: 'Take a photo or short video of any home issue — AI diagnoses the problem, estimates cost, and matches you with the right Charter Pro instantly.',
    features: [
      'Photo → AI diagnosis in under 10 seconds',
      'Cost estimate range before you even call a contractor',
      'Trade routing: auto-selects plumber vs electrician vs HVAC',
      'Vault auto-logs the assessment with photos attached',
      'Charter Pro reviews the AI diagnosis before responding',
    ],
    impact: 'Eliminates the "I don't know who to call" problem for 90% of home issues.',
  },
  insurance: {
    title: 'Insurance Integration',
    launch: 'Q4 2027',
    desc: 'File a claim and get a vetted contractor dispatched in a single ProLnk workflow — no more chasing adjusters and searching for contractors separately.',
    features: [
      'Direct integration with major DFW home insurers',
      'Adjuster-approved contractor dispatch in one step',
      'Vault documentation speeds claim approval by 60%',
      'Real-time claim status tracking in the ProLnk app',
      'Post-repair documentation auto-submitted to insurer',
    ],
    impact: 'DFW homeowners file 2.3x more claims than national avg — this saves weeks of coordination.',
  },
  expansion: {
    title: 'Houston & Austin Launch',
    launch: 'Q1–Q2 2027',
    desc: 'ProLnk expands beyond DFW to cover all major Texas metros — same verified Charter Pro model, same 5-income streams, same Vault protection.',
    features: [
      'Houston launch: Q1 2027 — 2.3M housing units',
      'Austin launch: Q2 2027 — fastest-growing market in Texas',
      'San Antonio in planning for Q3 2027',
      'Texas-wide Charter Pro network unlocks cross-city referrals',
      'DFW Charter members get early access + territory bonuses',
    ],
    impact: 'Texas expansion targets 6.5M additional homeowners by end of 2027.',
  },
};

export default function DFWProLnkFuture2027Preview() {
  const [selected, setSelected] = useState<string | null>(null);
  const preview = selected ? previews[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui,sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🚀</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: 0 }}>ProLnk 2027 Preview</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>What's coming to ProLnk — and why DFW homeowners should get in now.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>📅 2027 Roadmap at a Glance</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
            {[{q:'Q1',f:'Houston Launch'},{q:'Q2',f:'Predictive AI + Austin'},{q:'Q3',f:'Visual Assessment'},{q:'Q4',f:'Insurance Integration'}].map(i=>(
              <div key={i.q} style={{ background: '#0A1628', borderRadius: 8, padding: '.75rem', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 30 }}>{i.q}</span>
                <span style={{ color: '#cbd5e1', fontSize: '.9rem' }}>{i.f}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>Which 2027 feature are you most excited about?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {featureTypes.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)} style={{ background: selected === f.id ? '#F5E642' : '#1e3a5f', color: selected === f.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{f.label}</div>
              <div style={{ fontSize: '.85rem', opacity: .8, marginTop: '.25rem' }}>{f.desc}</div>
            </button>
          ))}
        </div>

        {preview && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0 }}>{preview.title}</h2>
              <span style={{ background: '#F5E642', color: '#0A1628', padding: '.25rem .75rem', borderRadius: 20, fontSize: '.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{preview.launch}</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '.9rem', marginBottom: '1rem' }}>{preview.desc}</p>
            {preview.features.map((f,i)=>(
              <div key={i} style={{ display: 'flex', gap: '.75rem', marginBottom: '.5rem' }}>
                <span style={{ color: '#F5E642' }}>→</span>
                <span style={{ color: '#cbd5e1', fontSize: '.9rem' }}>{f}</span>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '.75rem', marginTop: '1rem', color: '#4ade80', fontSize: '.9rem' }}>📈 {preview.impact}</div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#1e3a5f', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.5rem' }}>🏆 Charter Members Get Everything First</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '.9rem' }}>Join the waitlist now — Charter status is capped at 500 applicants. Lock in your territory, pricing, and 2027 early access.</p>
        </div>
      </div>
    </div>
  );
}
