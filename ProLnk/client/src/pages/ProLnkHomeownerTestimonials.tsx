import { useState } from 'react';

const testimonials = {
  hvac: {
    name: 'Sarah Mitchell',
    location: 'Frisco, TX',
    icon: '❄️',
    trade: 'HVAC Emergency',
    story: 'It was 104°F in July and my AC went out at 9pm with two kids under 5. I submitted a request on ProLnk at 9:15pm and by 11:30pm a certified HVAC tech named Marcus was at my door. The Home Health Vault captured every detail of the repair so I have a permanent record.',
    outcome: 'AC restored same night. Full repair documented in Home Health Vault. Marcus is now my go-to HVAC pro.',
    stars: 5,
    date: 'July 2025',
  },
  foundation: {
    name: 'Mike Torres',
    location: 'McKinney, TX',
    icon: '🏠',
    trade: 'Foundation Repair',
    story: 'I noticed cracks in my sheetrock and was terrified. Three contractors I called from other apps never showed. ProLnk matched me with Cornerstone Foundation within a day. They diagnosed a pier issue, fixed it properly, and ProLnk stored all the engineering docs in my Home Health Vault.',
    outcome: 'Foundation stabilized. Engineering report in Vault. Home value protected for resale.',
    stars: 5,
    date: 'March 2025',
  },
  plumbing: {
    name: 'Linda Chavez',
    location: 'Allen, TX',
    icon: '🔧',
    trade: 'Plumbing Leak',
    story: 'I had a slab leak causing my water bill to triple. ProLnk matched me with a master plumber who specializes in slab detection. No wasted visits, no upsells. The work was completed in one day and documented perfectly for my insurance claim.',
    outcome: 'Leak repaired in 6 hours. Insurance documentation automatically generated.',
    stars: 5,
    date: 'November 2025',
  },
  electrical: {
    name: 'James Okafor',
    location: 'Plano, TX',
    icon: '⚡',
    trade: 'Electrical Panel Upgrade',
    story: 'I was adding an EV charger and needed a panel upgrade. ProLnk matched me with a licensed electrician who knew the Plano permit process cold. Permit pulled, inspection passed first time, all docs in Vault.',
    outcome: 'Panel upgraded to 200A. EV charger installed. Permit docs saved in Vault.',
    stars: 5,
    date: 'January 2026',
  },
};

type TradeKey = keyof typeof testimonials;

export default function ProLnkHomeownerTestimonials() {
  const [active, setActive] = useState<TradeKey>('hvac');
  const t = testimonials[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⭐</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>DFW Homeowner Stories</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Real outcomes from real homeowners across the Dallas-Fort Worth metroplex.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {(Object.keys(testimonials) as TradeKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642' : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {testimonials[k].icon} {testimonials[k].trade}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 16, padding: 32, border: '1px solid #2d4a7a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{t.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>{t.name}</div>
              <div style={{ color: '#F5E642', fontSize: 14 }}>📍 {t.location} · {t.date}</div>
              <div style={{ color: '#F5E642', fontSize: 16, marginTop: 2 }}>{'★'.repeat(t.stars)}</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 16, marginBottom: 20 }}>{t.story}</p>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ OUTCOME</div>
            <div style={{ color: '#94a3b8', fontSize: 15 }}>{t.outcome}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 32 }}>
          {[['2 hrs', 'Avg match time in DFW'], ['98%', 'Homeowner satisfaction'], ['100%', 'Vault-documented repairs']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}