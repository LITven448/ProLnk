import { useState } from 'react';

const promises = [
  {
    id: 'certified',
    icon: '🎓',
    title: 'Only NATE-Certified or Equivalent Technicians',
    commitment: 'Every HVAC professional ProLnk matches you with in DFW holds NATE certification, TACL license, or equivalent verified credential — no exceptions.',
    howToHold: 'Request the technician’s NATE certificate number before work begins. ProLnk’s match profile includes credential verification date. If credentials can’t be verified, you pay nothing.',
    concern: 'certification',
  },
  {
    id: 'pricing',
    icon: '💰',
    title: 'Transparent Pricing — No Surprise Charges',
    commitment: 'Your matched DFW HVAC pro provides a written estimate before any work begins. Final invoice cannot exceed estimate by more than 10% without your written approval.',
    howToHold: 'All estimates are documented in ProLnk’s platform. If your invoice exceeds the estimate without approval, ProLnk’s dispute process triggers a mandatory review within 24 hours.',
    concern: 'pricing',
  },
  {
    id: 'upsell',
    icon: '🚫',
    title: 'No Upsell Pressure Policy',
    commitment: 'ProLnk vetted pros in DFW are prohibited from commission-based upselling. Recommendations must be documented with evidence (photos, measurements, test readings).',
    howToHold: 'If a technician recommends additional work, ask for written documentation of why. You can request a second opinion match from ProLnk at no cost. Upsell complaints trigger pro review.',
    concern: 'upsell',
  },
  {
    id: 'vault',
    icon: '🏠',
    title: 'HVAC History Stored in Home Health Vault',
    commitment: 'Every service visit, part replaced, refrigerant charge, and system reading is stored in your home’s permanent record in the ProLnk Home Health Vault.',
    howToHold: 'Your Home Health Vault is yours — portable, exportable, and survives any pro relationship. If a tech claims they "did the work" without logging it, that service has no record in your Vault.',
    concern: 'records',
  },
  {
    id: 'emergency',
    icon: '🚨',
    title: 'Emergency Matching Priority in DFW Heat',
    commitment: 'When outdoor temps exceed 100°F, ProLnk escalates your request to Emergency status — guaranteeing a matched technician response within 4 hours or ProLnk credits your account $50.',
    howToHold: 'Mark your request as Emergency when submitting during extreme heat events. ProLnk monitors DFW NWS alerts and auto-escalates requests during heat advisories.',
    concern: 'emergency',
  },
  {
    id: 'followup',
    icon: '📋',
    title: '30-Day Work Guarantee',
    commitment: 'All HVAC work matched through ProLnk in DFW is covered by a 30-day workmanship guarantee. If the same issue recurs, your matched pro returns at no additional labor cost.',
    howToHold: 'Report recurring issues through ProLnk within 30 days. The original tech is dispatched first. If unavailable, a new match is dispatched and ProLnk covers the diagnostic fee.',
    concern: 'guarantee',
  },
];

export default function DFWHVACProLnkPromise() {
  const [active, setActive] = useState<string | null>(null);
  const [concern, setConcern] = useState('');

  const customResponse = () => {
    const kw = concern.toLowerCase();
    if (kw.includes('price') || kw.includes('cost') || kw.includes('expensive')) return promises.find(p => p.id === 'pricing');
    if (kw.includes('certif') || kw.includes('license') || kw.includes('qualified')) return promises.find(p => p.id === 'certified');
    if (kw.includes('upsell') || kw.includes('push') || kw.includes('pressure')) return promises.find(p => p.id === 'upsell');
    if (kw.includes('record') || kw.includes('history') || kw.includes('track')) return promises.find(p => p.id === 'vault');
    if (kw.includes('emerg') || kw.includes('urgent') || kw.includes('heat') || kw.includes('hot')) return promises.find(p => p.id === 'emergency');
    if (kw.includes('guarantee') || kw.includes('warranty') || kw.includes('return')) return promises.find(p => p.id === 'followup');
    return null;
  };

  const matched = concern.length > 2 ? customResponse() : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk in DFW</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>The ProLnk HVAC Promise for DFW</h1>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>ProLnk isn't just a matching service — it's a set of binding commitments to every DFW homeowner. Here's exactly what we promise and how you can hold us to every one of them.</p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#CBD5E1' }}>What's your HVAC concern?</label>
          <input
            value={concern}
            onChange={e => setConcern(e.target.value)}
            placeholder="e.g. I'm worried about pricing, I need emergency help, I want records..."
            style={{ width: '100%', background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 8, padding: '0.75rem 1rem', color: '#E8EDF5', fontSize: '0.95rem', boxSizing: 'border-box' }}
          />
          {matched && (
            <div style={{ marginTop: '1rem', background: '#0F2140', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{matched.icon} ProLnk's Promise for "{concern}"</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 1rem' }}>{matched.commitment}</p>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>✅ HOW TO HOLD US TO IT</div>
                <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.6 }}>{matched.howToHold}</p>
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>All Six ProLnk DFW Promises</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {promises.map(p => (
            <div key={p.id} onClick={() => setActive(active === p.id ? null : p.id)}
              style={{ background: '#0F2140', border: `1px solid ${active === p.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                <span style={{ fontWeight: 600, color: active === p.id ? '#F5E642' : '#E8EDF5' }}>{p.title}</span>
              </div>
              {active === p.id && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 1rem', fontSize: '0.92rem' }}>{p.commitment}</p>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.9rem' }}>
                    <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>✅ HOW TO HOLD US TO IT</div>
                    <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6 }}>{p.howToHold}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <div style={{ fontWeight: 800, color: '#0A1628', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ready to Experience the ProLnk Difference?</div>
          <p style={{ color: '#1E3A5F', fontSize: '0.9rem', margin: '0 0 1rem' }}>Join thousands of DFW homeowners getting matched with certified, accountable HVAC professionals — with every promise documented in your Home Health Vault.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Matched Now — Free
          </button>
        </div>
      </div>
    </div>
  );
}
