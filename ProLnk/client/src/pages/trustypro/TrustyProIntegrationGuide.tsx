import { useState } from 'react';

const serviceTypes = [
  {
    id: 'roofing',
    label: 'Roofing',
    emoji: '🏠',
    matchImprovement: 'TrustyPro scan identifies shingle type, estimated age, and slope — contractor receives this before first contact and arrives with the right materials and ladder size',
    contractorSees: 'Roof zone condition score (0–100), shingle brand/type if detectable, ridge length estimate, chimney and flashing photos, and any visible structural concerns at soffit or fascia',
    timeSaved: 'Eliminates the "site visit to quote" step — contractor quotes remotely in 12 minutes vs 2.5 hours of drive + inspection time',
  },
  {
    id: 'hvac',
    label: 'HVAC',
    emoji: '❄️',
    matchImprovement: 'Scan captures unit model and serial number — contractor pre-orders likely parts before arriving, reducing return trip rate by 60%',
    contractorSees: 'Unit age, brand, condenser and air handler model, visible duct condition in attic or crawl, filter access photos, and any refrigerant line concerns',
    timeSaved: 'Remote diagnosis before site visit cuts average HVAC job time by 45 minutes and eliminates most diagnostic return trips',
  },
  {
    id: 'foundation',
    label: 'Foundation',
    emoji: '🧱',
    matchImprovement: 'AI crack mapping classifies severity before contractor engagement — only foundation specialists matched to jobs that actually need piers vs. cosmetic repair',
    contractorSees: 'Crack width range, propagation pattern, elevation delta estimate, soil exposure at base, and TrustyPro severity classification (monitoring / repair / urgent)',
    timeSaved: 'Homeowner avoids 2–3 "free inspection" visits from foundation companies. Contractor arrives knowing scope — quotes close 40% faster',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    emoji: '🔧',
    matchImprovement: 'Water stain mapping and moisture zone scoring helps route leaks to the right specialty — slab leak specialists vs. supply line vs. drain plumbers',
    contractorSees: 'Moisture zone map, stain age estimate, visible fixture conditions, water heater model and age, accessible pipe material (copper, PVC, galvanized)',
    timeSaved: 'Eliminates the misrouted call — homeowner stops getting the wrong plumber type showing up first. Match accuracy goes from 62% to 89% on first assignment',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    emoji: '⚡',
    matchImprovement: 'Panel identification flags Zinsco, Federal Pacific, or Pushmatic panels — contractor knows before arriving whether they need a panel replacement specialist or general electrician',
    contractorSees: 'Panel brand and model, visible wiring condition in garage and attic access points, outlet age indicators, any flagged safety concerns in AI report',
    timeSaved: 'Panel ID before dispatch alone saves 1 truck roll per flagged job — significant in DFW market where drive time averages 35 minutes per call',
  },
];

export default function TrustyProIntegrationGuide() {
  const [service, setService] = useState(serviceTypes[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>TrustyPro + ProLnk Integration</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 640, margin: '0 auto' }}>
            TrustyPro scan data feeds directly into ProLnk's matching engine — giving contractors the information they need to quote accurately before the first site visit.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '📊', title: 'Scan → Match', desc: 'TrustyPro condition data is structured for ProLnk routing — service type, zone score, urgency, and equipment details all inform who gets the lead' },
            { emoji: '💬', title: 'Quote Without Site Visit', desc: 'Contractors receive scan data before accepting a lead — remote quote accuracy goes from 54% to 83% when visual data is included' },
            { emoji: '📈', title: 'Better Outcome', desc: 'Jobs with pre-scan data close faster, have fewer disputes, and generate higher contractor ratings — improving their ProLnk tier' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.emoji}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>How the Data Flow Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['1', 'Homeowner completes TrustyPro scan for their service zone'],
              ['2', 'AI generates condition report with zone scores and equipment identification'],
              ['3', 'ProLnk matching engine receives structured scan data alongside homeowner request'],
              ['4', 'Match algorithm routes to contractors whose specialty, territory, and availability fit the scan profile'],
              ['5', 'Contractor receives scan data in their ProLnk lead card before accepting — quotes remotely with confidence'],
              ['6', 'On-site work is faster, scoped correctly, and generates higher satisfaction scores — improving future match priority'],
            ].map(([num, step]) => (
              <div key={num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: '#050d1a', borderRadius: 10, padding: 16 }}>
                <div style={{ background: '#4F46E5', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{num}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Select a Service Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {serviceTypes.map(s => (
              <button key={s.id} onClick={() => setService(s)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: service.id === s.id ? '#4F46E5′ : '#1e3a5f', color: '#fff' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#050d1a', borderRadius: 12, padding: 20, borderLeft: '4px solid #4F46E5′ }}>
              <div style={{ color: '#4F46E5', fontWeight: 700, marginBottom: 8 }}>📊 How Scan Data Improves the Match — {service.label}</div>
              <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{service.matchImprovement}</p>
            </div>
            <div style={{ background: '#050d1a', borderRadius: 12, padding: 20, borderLeft: '4px solid #FACC15′ }}>
              <div style={{ color: '#FACC15', fontWeight: 700, marginBottom: 8 }}>👷 What the Contractor Sees in Their Lead Card</div>
              <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{service.contractorSees}</p>
            </div>
            <div style={{ background: '#050d1a', borderRadius: 12, padding: 20, borderLeft: '4px solid #22c55e' }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>⏱️ Time Saved vs Traditional Quote Process</div>
              <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{service.timeSaved}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
