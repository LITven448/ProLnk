import { useState } from 'react';

const HOME_SIZES = [
  { label: 'Under 1,500 sqft', sqft: 1200, factor: 0.8 },
  { label: '1,500-2,500 sqft', sqft: 2000, factor: 1 },
  { label: '2,500-4,000 sqft', sqft: 3200, factor: 1.3 },
  { label: '4,000+ sqft', sqft: 5000, factor: 1.7 },
];
const HOME_AGES = [
  { label: 'New (<5 yrs)', ageMult: 0.6 },
  { label: 'Newer (5-15 yrs)', ageMult: 0.8 },
  { label: 'Mid-Age (15-30 yrs)', ageMult: 1.1 },
  { label: 'Older (30+ yrs)', ageMult: 1.5 },
];
const SYSTEMS = [
  { label: '❄️ HVAC (1 unit)', base: 280 },
  { label: '❄️ HVAC (2+ units)', base: 420 },
  { label: '🌡️ Water Heater', base: 80 },
  { label: '🔌 Electrical Panel', base: 60 },
  { label: '🏊 Pool / Spa', base: 350 },
  { label: '🌿 Irrigation System', base: 120 },
  { label: '🌳 Trees on Property', base: 90 },
];

export default function DFWHomeMaintenanceSubscriptionGuide() {
  const [hi, setHi] = useState(1);
  const [ai, setAi] = useState(1);
  const [sys, setSys] = useState<number[]>([0, 2]);
  const tog = (i: number) => setSys(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const sysTotal = sys.reduce((a, i) => a + SYSTEMS[i].base, 0);
  const factor = HOME_SIZES[hi].factor * HOME_AGES[ai].ageMult;
  const payAsYouGo = Math.round((sysTotal + 400) * factor);
  const subModel = Math.round(payAsYouGo * 0.72);
  const savings = payAsYouGo - subModel;
  const btn = (active: boolean) => ({ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642' : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Home Maintenance Subscriptions in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>The traditional model — hire someone when something breaks — is expensive and reactive. DFW homeowners are shifting to subscription-based home maintenance. Here is how to compare your options.</p>

        {[
          { icon: '🔄', title: 'Traditional vs Subscription Model', body: 'Traditional: hire as needed, pay market rate, no relationship, often wait 1-2 weeks for availability. Subscription: fixed monthly or annual fee, priority scheduling, proactive service, often 20-35% lower total annual cost.' },
          { icon: '🏠', title: 'What ProLnk Network Model Offers', body: 'ProLnk does not lock you into a single home warranty company. Instead, it connects you with a vetted network of specialists — HVAC, plumbing, electrical, pest, lawn, pool — each on their own subscription, coordinated through one platform.' },
          { icon: '📊', title: 'Comparing DFW Subscription Services', body: 'Home warranty companies (First American, American Home Shield) cover repair/replace but not maintenance. ProLnk network subscriptions cover proactive maintenance — preventing failures before they become expensive claims. Both have a place in a comprehensive plan.' },
          { icon: '📅', title: 'DFW-Specific Maintenance Calendar', body: 'April: HVAC tune-up before summer, irrigation start-up, pest control kickoff. July: check attic insulation, pool chemistry check. October: HVAC fall check, irrigation blow-out prep, gutter clean before leaf drop. December: winterization for pipes and irrigation.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>📈 Pay-As-You-Go vs Subscription Comparison</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HOME SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {HOME_SIZES.map((h, i) => <button key={i} onClick={() => setHi(i)} style={btn(hi === i)}>{h.label}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HOME AGE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {HOME_AGES.map((a, i) => <button key={i} onClick={() => setAi(i)} style={btn(ai === i)}>{a.label}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HOME SYSTEMS (select all that apply)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SYSTEMS.map((s, i) => (
                <button key={i} onClick={() => tog(i)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${sys.includes(i) ? '#F5E642' : '#1A2E4A'}`, cursor: 'pointer', fontSize: 13, background: sys.includes(i) ? '#1A2E4A' : '#0A1628', color: '#E8EDF5' }}>{s.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Pay-As-You-Go (est. annual)</div>
              <div style={{ color: '#E8EDF5', fontWeight: 800, fontSize: 24 }}>${payAsYouGo.toLocaleString()}/yr</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 6 }}>Reactive, no priority scheduling</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Subscription Model (est. annual)</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>${subModel.toLocaleString()}/yr</div>
              <div style={{ color: '#4ADE80', fontSize: 12, marginTop: 6 }}>Save ~${savings.toLocaleString()} + priority access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
