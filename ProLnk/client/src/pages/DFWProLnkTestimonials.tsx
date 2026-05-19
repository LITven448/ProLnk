import { useState } from 'react';

const testimonials = [
  { id: 1, type: 'first-time', name: 'Marcus T.', location: 'Frisco, TX', title: 'First-Time Buyer', quote: 'I had no idea who to call when my AC died in July. ProLnk matched me with an HVAC pro the same afternoon. The transparency around pricing was unlike anything I expected. I didn’t feel taken advantage of for once.', stars: 5, detail: '🌡️ HVAC emergency in 103°F Frisco summer' },
  { id: 2, type: 'first-time', name: 'Keisha M.', location: 'McKinney, TX', title: 'New Homeowner', quote: 'Moving from an apartment, I literally didn’t know what "check your P-trap" meant. ProLnk helped me find a plumber who explained everything. I felt educated, not just served. Worth every penny of the $40 service fee.', stars: 5, detail: '🔧 First real home maintenance experience' },
  { id: 3, type: 'long-time', name: 'Bob & Linda R.', location: 'Southlake, TX', title: 'Longtime Homeowners', quote: 'We’ve owned this house 22 years. Finding a good electrician used to mean calling everyone we knew. ProLnk gave us three options with verified reviews in 20 minutes. Our neighbor recommended it and she was right.', stars: 5, detail: '⚡ Panel upgrade after adding EV charger' },
  { id: 4, type: 'long-time', name: 'James H.', location: 'Plano, TX', title: 'Homeowner (18 years)', quote: 'I’ve used every app out there. Most give you whoever is paying them to be at the top. ProLnk felt different — the matches actually made sense for my situation. The foundation quote I got was $2,200 less than my neighbor paid.', stars: 5, detail: '🏗️ Slab foundation pier work, older DFW home' },
  { id: 5, type: 'hvac-contractor', name: 'Diego V.', location: 'Arlington, TX', title: 'HVAC Contractor', quote: 'I was skeptical — I’ve tried three lead services and they were all garbage. ProLnk leads are different. I’m getting homeowners who have already verified their address and know roughly what they’re asking for. My close rate went from 20% to 51%.', stars: 5, detail: '🔧 Owner, DVStar HVAC Solutions' },
  { id: 6, type: 'hvac-contractor', name: 'Priya S.', location: 'Garland, TX', title: 'Licensed Electrician', quote: 'The platform pays me back what I invest in marketing — and I don’t have to spend my Sundays on Angi disputes. ProLnk handles the matching, I handle the work. First month on the platform I covered my subscription 8x over.', stars: 5, detail: '⚡ Residential + light commercial, licensed TX' },
  { id: 7, type: 'networker', name: 'Andre L.', location: 'Denton, TX', title: 'Partner Networker', quote: 'I brought in 6 HVAC contractors in my first 30 days just by sharing the opportunity with guys I used to work with. The override commissions are real — I got my first payout before I even expected it. This model makes sense.', stars: 5, detail: '💼 Former project manager, now full-time network builder' },
  { id: 8, type: 'networker', name: 'Carmen W.', location: 'Flower Mound, TX', title: 'HOA Community Leader', quote: 'I shared ProLnk with my HOA newsletter and within two weeks, 14 homeowners in our neighborhood had signed up. Three of them found contractors I would have recommended anyway. It’s just a better way to do what neighbors already do.', stars: 5, detail: '🏘️ HOA board member, 340-home community' }
];

const typeLabels: Record<string, string> = {
  all: '⭐ All Stories',
  'first-time': '🏠 First-Time Buyers',
  'long-time': '🏡 Longtime Homeowners',
  'hvac-contractor': '🔧 Contractors',
  'networker': '💼 Partner Networkers'
};

export default function DFWProLnkTestimonials() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? testimonials : testimonials.filter(t => t.type === filter);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#DC2626', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK SUCCESS STORIES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>🌟 Real DFW Homeowners & Partners</h1>
        <p style={{ color: '#64748B', marginBottom: 32 }}>From first-time buyers to veteran contractors — here's what the ProLnk community is saying across North Texas.</p>

        <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
            {[['4.9★','Average Rating'],['1,200+','DFW Reviews'],['94%','Would Recommend']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#DC2626' }}>{num}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Filter by situation like yours:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.entries(typeLabels).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600, borderColor: filter === key ? '#DC2626' : '#E2E8F0', background: filter === key ? '#FFF1F2' : '#FFFFFF', color: filter === key ? '#DC2626' : '#64748B' }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {visible.map(t => (
            <div key={t.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{t.title} · {t.location}</div>
                </div>
                <div style={{ fontSize: 16, color: '#F59E0B' }}>{'★'.repeat(t.stars)}</div>
              </div>
              <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>"{t.quote}"</div>
              <div style={{ background: '#F8FAFC', borderRadius: 8, padding: '8px 14px', fontSize: 12, color: '#64748B' }}>{t.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
